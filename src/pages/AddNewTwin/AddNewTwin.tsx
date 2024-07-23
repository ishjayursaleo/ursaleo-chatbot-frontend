/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../components'
import { alertActions } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
// import { profileActions } from '../../redux/actions'
import { type AppState } from '../../interfaces'
import AddEditTwin from '../../components/AddEditTwin/AddEditTwin'
import { useNavigate, useParams } from 'react-router-dom'
import { type TwinCreateRequestPayload } from '../../interfaces/twins'
import { twinService } from '../../services/twinService'
import * as yup from 'yup'
import { ALERT_VARIANT } from '../../utils/constants'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'
import { type TwinConfigurationGetResponse } from '../../interfaces/twinConfiguration'
import { twinConfigurationService } from '../../services/twinConfigurationService'
import { twinConfigAction } from '../../redux/actions/twinConfigActions'

const contactSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
})

const AddNewTwin = () => {
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const twinConfigs = useSelector((state: AppState) => state.twinConfigurations.twinConfigList)
    .configs as TwinConfigurationGetResponse[]

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [twinName, setTwinName] = useState('')
  const [twinDescription, setTwinDescription] = useState('')
  const [createTwinResponse, setCreateTwinResponse] = useState(0)
  const { clientId } = useParams()
  const handleTwinName = (e: any) => {
    setTwinName(e.target.value)
  }
  const handleTwinDescription = (e: any) => {
    setTwinDescription(e.target.value)
  }

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Add New Twin', userData)
  }, [])

  const handleClose = () => {
    navigate('/')
  }

  const addNewTwin = () => {
    triggerCustomGoogleAnalyticsEvent('btn', 'add_twin', 'add_twin', userData)
    void (async () => {
      const payload: TwinCreateRequestPayload = {
        bodyParams: {
          name: twinName,
          description: twinDescription
        },
        pathParams: {
          clientId
        }
      }
      await contactSchema.validate(payload.bodyParams).then((res) => {
        addNewTwinAfterValidation(payload)
      }).catch((error: any) => {
        console.log(error)
        dispatch(alertActions.triggerAlert({
          message: 'Please fill the both details before proceed',
          options: {
            autoHideDuration: 2000,
            variant: ALERT_VARIANT.ERROR

          }
        }))
      })
    })()
  }

  useEffect(() => {
    if (createTwinResponse === 200) {
      navigate(-1)
    }
  }, [createTwinResponse])

  const addNewTwinAfterValidation = (payload: TwinCreateRequestPayload) => {
    void (async () => {
      try {
        const twinCreateRes: any = await twinService.createTwin(payload)
        if (twinCreateRes.status === 200) {
          twinConfigs.map(async (config) => {
            if (config == null) return
            const payload = {
              integrationSourceId: config.integrationSourceId,
              twinId: twinCreateRes.data.id,
              isSecret: config.isSecret,
              value: config.value
            }
            const configCreateRes = await twinConfigurationService.createConfiguration(twinCreateRes.data.id, payload)
            dispatch(alertActions.triggerAlert({
              message: configCreateRes.status === 200
                ? 'Twin Configuration created successfully'
                : 'Twin Configuration creation failed',
              options: {
                autoHideDuration: 2000,
                variant: configCreateRes.status === 200 ? ALERT_VARIANT.SUCCESS : ALERT_VARIANT.ERROR
              }
            }))
          })
        }
        setCreateTwinResponse(twinCreateRes.status)
        dispatch(alertActions.triggerAlert({
          message: 'Twin added successfully',
          options: {
            autoHideDuration: 2000,
            variant: ALERT_VARIANT.SUCCESS
          }
        }))
        dispatch(twinConfigAction.clearConfigs())
      } catch (error: any) {
        let errorMessage = error?.response?.data?.error
        errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
        dispatch(alertActions.triggerAlert({
          message: errorMessage,
          options: {
            autoHideDuration: 2000,
            variant: ALERT_VARIANT.ERROR

          }
        }))
      }
    })()
  }

  const handleConfigCleanup = () => {
    dispatch(twinConfigAction.clearConfigs())
  }

  return (
    <div>
      <ModalLayout
        customCleanup={handleConfigCleanup}
        activateBackArrow={true}
        routePath='Twin List'
        contentLayout={<AddEditTwin
          handleTwinDescription={handleTwinDescription}
          handleTwinName={handleTwinName}
          handleSave={addNewTwin}
        />}
        headerText='Add New Twin'
        handleClose={handleClose}
        open={modalOpenStatus} />
    </div>
  )
}

export default AddNewTwin
