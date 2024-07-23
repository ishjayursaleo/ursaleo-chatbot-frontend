/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import styles from './AddEditTwin.module.scss'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded'
import TwinConfigTabsModal from '../TwinConfigTabsModal/TwinConfigTabsModal'
import { useDispatch, useSelector } from 'react-redux'
import { type AppState } from '../../interfaces'
import { type TwinConfigurationGetResponse } from '../../interfaces/twinConfiguration'
import { integrationSourceService } from '../../services/integrationSourceService'
import { type IntegrationSource } from '../../interfaces/integrationSource'
import { twinConfigurationService } from '../../services/twinConfigurationService'
import { twinConfigAction } from '../../redux/actions/twinConfigActions'
import editIcon from '../../assets/img/editIcon.svg'

const AddEditTwin: React.FC<{
  twinId?: string | undefined
  isEditMode?: boolean
  twinName?: string
  twinDescription?: string
  handleSave: () => void
  handleTwinName: (event: any) => void
  handleTwinDescription: (event: any) => void
}> = ({
  twinId,
  isEditMode = false,
  twinName,
  twinDescription,
  handleSave,
  handleTwinName,
  handleTwinDescription
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [integrationSources, setIntegrationSources] = useState<IntegrationSource[]>([])
  const [isCreateConfigOpen, setIsCreateConfigOpen] = useState(false)
  const dispatch = useDispatch()

  const getTwinConfigs = async () => {
    if (!isEditMode || twinId == null) return
    const twinConfigs = await twinConfigurationService.getConfigurations({ pathParams: { twinId } })
    if (twinConfigs?.data != null) {
      dispatch(twinConfigAction.clearConfigs())
      twinConfigs.data.forEach(config => {
        dispatch(twinConfigAction.addConfig(config))
      })
    }
  }

  useEffect(() => {
    void (async () => {
      await getTwinConfigs()
    })()
  }, [])
  const twinConfigs = useSelector((state: AppState) => state.twinConfigurations.twinConfigList)
    .configs as TwinConfigurationGetResponse[]

  const configsText = twinConfigs.map(config => {
    return integrationSources.find(source => source.id === config?.integrationSourceId)?.source
  }).filter(config => config != null).join(', ')

  useEffect(() => {
    void (async () => {
      try {
        setIsLoading(true)
        const integrationSourcesResponse = await integrationSourceService.getIntegrationSourcesList()
        if (integrationSourcesResponse.data != null) {
          setIntegrationSources(integrationSourcesResponse.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return (
      <>
        <div>
          <Grid container sm={12} className={styles.addNewTwinContainer}>
            <Grid item sm={2}></Grid>
            <Grid item sm={8}>
              <Grid sm={12} container
                display='flex'
                justifyContent='space-between'
                alignItems='center' marginBottom={6} gap={1}>
                <Grid
                  item sm={3}
                  display='flex'
                  justifyContent='start'
                  alignItems='end'>
                  <Typography color='white' fontSize='1.25rem'>Name</Typography>
                </Grid>
                <Grid item sm={8}
                  display='flex'
                  justifyContent='end'
                  alignItems='center'>
                  <TextField
                    value={twinName}
                    autoComplete='off'
                    id="outlined-basic"
                    placeholder='Type twin name Here...'
                    variant="standard"
                    color='secondary'
                    onChange={handleTwinName}
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      className: styles.textFieldStyle
                    }}
                  />
                </Grid>
              </Grid>
              <Grid sm={12} container
                display='flex'
                justifyContent='space-between'
                alignItems='center' marginBottom={6} gap={1}>
                <Grid item sm={3}>
                  <Typography color='white' fontSize='1.25rem'>Description</Typography>
                </Grid>
                <Grid item sm={8}>
                  <TextField
                    value={twinDescription}
                    autoComplete='off'
                    id="outlined-basic"
                    placeholder='Type twin description Here...'
                    variant="standard"
                    color='secondary'
                    onChange={handleTwinDescription}
                    fullWidth
                    InputProps={{
                      disableUnderline: true,
                      className: styles.textFieldStyle
                    }}
                  />
                </Grid>
              </Grid>
              <Grid sm={12} container
                display='flex'
                justifyContent='space-between'
                alignItems='center' gap={1}>
                <Grid item sm={3}>
                  <Typography color='white' fontSize='1.25rem'>Configuration</Typography>
                </Grid>
                <Grid item sm={8}>
                  <div style={{ display: 'flex' }}>
                    <TextField
                      value={configsText}
                      autoComplete='off'
                      id="outlined-basic"
                      placeholder='Add new configurations...'
                      variant="standard"
                      color='secondary'
                      onChange={handleTwinDescription}
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                        className: styles.textFieldStyle,
                        readOnly: true
                      }}
                      style={{ marginRight: '0.5rem' }}
                    />
                    <div
                      style={{
                        border: '3px solid #c4c4c4',
                        borderRadius: '0.5rem',
                        width: '2.6rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: '4px',
                        cursor: 'pointer'
                      }}
                      onClick={() => { setIsCreateConfigOpen(true) }}
                    >
                      {!isEditMode
                        ? <ArrowUpwardRoundedIcon style={{ color: '#c4c4c4', fontSize: '2rem' }} />
                        : <img
                          src={editIcon}
                          style={{ width: '36px', height: '33px', opacity: '0.8' }}
                          alt="Edit Icon"
                        />}
                    </div>
                  </div>
                </Grid>
              </Grid>
              <Grid sm={12} container
                display='flex'
                justifyContent='end'
                alignItems='center'>
                <Grid
                  item
                  sm={12}
                  margin='5rem 0 0 0'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'>
                  <Button
                    onClick={handleSave}
                    disabled={false}
                    className={styles.addNewBtn}
                    variant='outlined'
                    color='secondary'>
                    <Typography className={styles.btnInsideFontSize}
                      color='#fff'>{!isEditMode ? 'Add New Twin' : 'Save Changes'}</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={2}></Grid>
          </Grid>
        </div>
        {<TwinConfigTabsModal
          isEditMode={isEditMode}
          integrationSources={integrationSources}
          isLoading={isLoading}
          open={isCreateConfigOpen}
          closeModal={() => {
            setIsCreateConfigOpen(false)
            void (async () => {
              await getTwinConfigs()
            })()
          }}
        />}
      </>
  )
}

export default AddEditTwin
