import { Grid, Typography, TextField, Autocomplete, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import styles from './ManageTwinConfiguration.module.scss'
import FormTextField from '../common/Form/FormTextField/FormTextField'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { alertActions } from '../../redux/actions'
import { ALERT_VARIANT, CONFIGURATION_STORAGE_TYPES } from '../../utils/constants'
import { useParams } from 'react-router-dom'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { ConfirmationDialogBox } from '../common'
import {
  type TwinConfigurationCreateRequestPayload,
  type TwinConfigurationDetailedResponse,
  type TwinConfigurationGetResponse
} from '../../interfaces/twinConfiguration'
import { type IntegrationSource } from '../../interfaces/integrationSource'
import { twinConfigAction } from '../../redux/actions/twinConfigActions'

const internalInputValuesSchema = yup.object().shape({
  integrationSourceId: yup.string().required()
})
const inputValuesSchema = yup.object().shape({
  integrationSourceId: yup.string().required(),
  basePath: yup.string(),
  clientId: yup.string().required(),
  clientSecret: yup.string().required(),
  companyId: yup.string().required(),
  projectId: yup.string().required()
})

interface InputValues {
  integrationSourceId: string
  basePath?: string
  clientId?: string
  clientSecret?: string
  companyId?: string
  projectId?: string
}

interface ManageTwinConfigurationProps {
  isLoading: boolean
  config: TwinConfigurationGetResponse | null
  integrationSources: IntegrationSource[]
  closeModal: () => void
}

const ManageTwinConfiguration: React.FC<ManageTwinConfigurationProps> = ({
  isLoading,
  config,
  integrationSources,
  closeModal
}) => {
  const integrationSourceOptions = integrationSources.map(source => ({
    ...source,
    label: source.source,
    value: source.id
  }))
  const { twinId } = useParams()
  const [inputValues, setInputValues] = useState<InputValues>()
  const dispatch = useDispatch()
  const [selectedType, setSelectedType] =
    useState<(IntegrationSource & { label?: string, value?: string }) | undefined>(integrationSourceOptions
      .find(source => source.id === config?.integrationSourceId))
  const [existingConfData, setExistingConfData] = useState<TwinConfigurationDetailedResponse>()
  const [isEditMode, setIsEditMode] = useState(false)
  const disabled = !isEditMode && (existingConfData !== undefined)
  const [openWarning, setOpenWarning] = useState(false)

  useEffect(() => {
    if (existingConfData == null) return
    const existingSource = integrationSourceOptions.find(option => option.id === existingConfData.integrationSourceId)
    setSelectedType(existingSource)
    let values: InputValues = {
      integrationSourceId: existingConfData.integrationSourceId
    }
    if (existingConfData.value.type !== CONFIGURATION_STORAGE_TYPES.INTERNAL) {
      values = {
        ...values,
        basePath: existingConfData.value.basePath,
        clientId: existingConfData.value.config.client_id,
        clientSecret: existingConfData.value.config.client_secret,
        companyId: existingConfData.value.config.company_id,
        projectId: existingConfData.value.config.project_id
      }
    }
    setInputValues(values)
  }, [existingConfData])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!isLoading && (config != null)) {
      setExistingConfData(config)
    } else {
      setExistingConfData(undefined)
    }
  }, [isLoading])

  const saveConfigurationHandler = () => {
    let payload: TwinConfigurationCreateRequestPayload = {
      integrationSourceId: inputValues?.integrationSourceId as string,
      twinId,
      isSecret: true
    }
    if (selectedType?.source === CONFIGURATION_STORAGE_TYPES.INTERNAL) {
      internalInputValuesSchema.validate(inputValues).then(res => {
        const integrationSource = integrationSources.filter(source => source.id === res.integrationSourceId)[0]
        payload = {
          ...payload,
          integrationSourceId: res.integrationSourceId,
          value: {
            type: integrationSource.source
          }
        }
        if (isEditMode) {
          payload.id = config?.id
          dispatch(twinConfigAction.editConfig(payload))
        } else {
          payload.id = Math.random().toString(36).substring(2)
          dispatch(twinConfigAction.addConfig(payload))
        }
      }).catch(() => {
        dispatch(alertActions.triggerAlert({
          message: 'Please fill all the fields before proceed',
          options: {
            autoHideDuration: 2000,
            variant: ALERT_VARIANT.ERROR
          }
        }))
      }
      )
    } else {
      inputValuesSchema.validate(inputValues).then(res => {
        const integrationSource = integrationSources.filter(source => source.id === res.integrationSourceId)[0]
        payload = {
          ...payload,
          integrationSourceId: res.integrationSourceId,
          value: {
            type: integrationSource.source,
            basePath: (res.basePath != null)
              ? res.basePath.at(-1) !== '/'
                ? res.basePath + '/'
                : res.basePath
              : '/',
            config: {
              grant_type: 'client_credentials',
              client_id: res.clientId,
              client_secret: res.clientSecret,
              procore_base_url: 'https://sandbox.procore.com',
              project_id: res.projectId,
              company_id: res.companyId
            }
          }
        }
        if (isEditMode) {
          payload.id = config?.id
          dispatch(twinConfigAction.editConfig(payload))
        } else {
          payload.id = Math.random().toString(36).substring(2)
          dispatch(twinConfigAction.addConfig(payload))
        }
      }).catch(() => {
        dispatch(alertActions.triggerAlert({
          message: 'Please fill all the required fields before proceed',
          options: {
            autoHideDuration: 2000,
            variant: ALERT_VARIANT.ERROR
          }
        }))
      })
    }
    closeModal()
  }

  const editConfigurationHandler = () => {
    setIsEditMode(true)
  }

  const editConfigurationWarningHandler = () => {
    setOpenWarning(true)
  }

  const onFormDataChange = (
    field: string,
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputValues((prevValue: any) => ({
      ...prevValue,
      [field]: event.target.value
    }))
  }

  useEffect(() => {
    const integrationSource = integrationSourceOptions
      .filter(source => source.id === inputValues?.integrationSourceId)[0]
    setSelectedType(integrationSource)
  }, [inputValues?.integrationSourceId])
  // 570hx
  return (
    <div>
      <Grid
        container
        sm={12}
        rowGap={1}
        className={styles.tabFormContainer}
      >
        <Grid
          sm={12}
          container
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Grid sm={3}
            item
            flexDirection={'column'}
            display='flex'
            justifyContent='start'
            alignItems='end'
            style={{ paddingRight: '2rem' }}
          >
            <Typography display='inline' color='white' fontSize='1.125rem' fontWeight={400}>Storage Type
              <Typography
                display='inline'
                fontStyle={'italic'}
                color='gray'
                fontSize='1rem'
                fontWeight={400}>{' *'}</Typography>
            </Typography>
          </Grid>
          <Grid sm={9} style={{ paddingRight: '2.5rem' }}>
            <Autocomplete
              popupIcon={<ExpandMoreIcon />}
              fullWidth
              disableClearable
              readOnly={disabled}
              disablePortal
              id="combo-box-demo"
              value={selectedType}
              options={integrationSourceOptions}
              sx={{
                '&.MuiAutocomplete-root': {
                  borderRadius: '8px',
                  borderColor: 'white'// Set your desired border-radius here
                },
                '& .MuiInputBase-input': {
                  border: 'none',
                  color: 'white', // Set text color
                  fontSize: '1rem',
                  textAlign: 'start'
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& .MuiAutocomplete-popupIndicator': {
                  color: 'white', // Set dropdown icon color
                  borderRadius: '.875rem'
                }
              }}
              onChange={(_, value: IntegrationSource & { label?: string, value?: string }) => {
                setInputValues((prevValue: any) => ({
                  ...prevValue,
                  integrationSourceId: value.id
                }))
              }}
              PaperComponent={({ children }) => (
                <ul
                  className={styles.dropdownOption}
                >
                  {children}
                </ul>
              )}
              renderOption={(props, option: IntegrationSource & { label?: string, value?: string }) => (
                <li {...props} style={{ fontSize: '1rem' }}>
                  {option.label}
                </li>
              )}
              renderInput={(params) => <TextField {...params}
                placeholder="Select a storage type"
                value={selectedType?.label}
                InputProps={{
                  disableUnderline: true,
                  ...params.InputProps,
                  style: {
                    color: '#fff',
                    alignItems: 'center',
                    padding: '0 3rem 0 1rem',
                    justifyContent: 'center',
                    // border: '1px solid #fff',
                    borderRadius: '0.438rem',
                    height: '3.4375rem'
                  }
                }}
                color='secondary'
                variant='standard'
                sx={{ border: '1px solid #fff', borderRadius: '8px' }} />}
            />
          </Grid>
        </Grid>
        {(selectedType?.source === CONFIGURATION_STORAGE_TYPES.PROCORE) && <>
          <FormTextField
            disabled={disabled}
            value={inputValues?.basePath}
            label='Base Path'
            onChange={onFormDataChange.bind(this, 'basePath')}
          />
          <FormTextField
            disabled={disabled}
            value={inputValues?.clientId}
            label='Client Id'
            onChange={onFormDataChange.bind(this, 'clientId')}
            isRequired
          />
          <FormTextField
            disabled={disabled}
            value={inputValues?.clientSecret}
            label='Client Secret'
            onChange={onFormDataChange.bind(this, 'clientSecret')}
            isRequired
          />
          <FormTextField
            disabled={disabled}
            value={inputValues?.companyId}
            label='Company Id'
            onChange={onFormDataChange.bind(this, 'companyId')}
            isRequired
          />
          <FormTextField
            disabled={disabled}
            value={inputValues?.projectId}
            label='Project Id'
            onChange={onFormDataChange.bind(this, 'projectId')}
            isRequired
          />
        </>}
      </Grid>
      <Grid sm={12} container className={styles.editSaveBtnContainer}
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <Grid
          item
          sm={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Button
            onClick={closeModal}
            className={styles.editSaveBtn}
            variant='outlined'
            color='secondary'
          >
            <Typography
              className={styles.btnInsideFontSize}
              color='#fff'
            >
              Cancel
            </Typography>
          </Button>
        </Grid>
        <Grid
          item
          sm={6}
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Button
            onClick={disabled
              ? editConfigurationWarningHandler
              : saveConfigurationHandler}
            // disabled={isCreatePending || isEditPending || isLoading}
            className={styles.editSaveBtn}
            variant='outlined'
            color='secondary'>
            <Typography className={styles.btnInsideFontSize}
              color='#fff'>{disabled ? 'Edit' : 'Save'}</Typography>
          </Button>
        </Grid>
      </Grid>
      <ConfirmationDialogBox
        confirmationText='Do you want to edit the configuration details?'
        handleConfirmationBoxClose={() => { setOpenWarning(false) }}
        handleConfirmationClose={() => {
          setOpenWarning(false)
          editConfigurationHandler()
        }}
        openConfirmation={openWarning}
      />

    </div>
  )
}

export default ManageTwinConfiguration
