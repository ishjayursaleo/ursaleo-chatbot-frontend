/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../components'
import { alertActions } from '../../redux/actions'
import { useSelector, useDispatch } from 'react-redux'
// import { profileActions } from '../../redux/actions'
import { type Twin, type AppState } from '../../interfaces'
import AddEditTwin from '../../components/AddEditTwin/AddEditTwin'
import { useNavigate, useParams } from 'react-router-dom'
import { type TwinUpdateRequestPayload } from '../../interfaces/twins'
import { twinService } from '../../services/twinService'
import * as yup from 'yup'
import { ALERT_VARIANT } from '../../utils/constants'
import { triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'
import { twinConfigAction } from '../../redux/actions/twinConfigActions'

const contactSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
})

const EditTwin = () => {
  const { clientId, twinId } = useParams()
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [twinDetails, setTwinDetails] = useState<Twin>()
  const [createTwinResponse, setCreateTwinResponse] = useState(0)

  useEffect(() => {
    if (clientId == null || twinId == null) return
    void (async () => {
      try {
        const twinDetailsParamPath = { clientId, twinId }
        const twinDetails = await twinService.getTwinById({ path: twinDetailsParamPath })
        if (twinDetails.data != null) {
          setTwinDetails(twinDetails.data)
        }
      } catch (error) {
        dispatch(alertActions.triggerAlert({
          message: 'Fetching Twin details failed',
          options: {
            autoHideDuration: 2000,
            variant: ALERT_VARIANT.ERROR
          }
        }))
      }
    })()
  }, [])

  const handleTwinName = (e: any) => {
    // setTwinName(e.target.value)
    setTwinDetails(prev => {
      if (prev == null) return
      return {
        ...prev,
        name: e.target.value
      }
    })
  }
  const handleTwinDescription = (e: any) => {
    // setTwinDescription(e.target.value)
    setTwinDetails(prev => {
      if (prev == null) return
      return {
        ...prev,
        description: e.target.value
      }
    })
  }

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Edit Twin', userData)
  }, [])

  const handleClose = () => {
    navigate('/')
  }

  const updateTwin = () => {
    if (twinDetails == null) return
    void (async () => {
      const payload: TwinUpdateRequestPayload = {
        bodyParams: {
          name: twinDetails?.name,
          description: twinDetails?.description,
          defaultVersionId: twinDetails.defaultVersionId
        },
        pathParams: {
          clientId,
          id: twinId
        }
      }
      await contactSchema.validate(payload.bodyParams).then((res) => {
        updateTwinAfterValidation(payload)
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

  const updateTwinAfterValidation = (payload: TwinUpdateRequestPayload) => {
    void (async () => {
      try {
        const twinCreateRes: any = await twinService.updateTwin(payload)
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
        errorMessage = errorMessage?.charAt(0).toUpperCase() + errorMessage.slice(1)
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
        headerText='Edit Twin'
        customCleanup={handleConfigCleanup}
        activateBackArrow={true}
        routePath='Twin List'
        contentLayout={<AddEditTwin
          twinId={twinId}
          isEditMode={true}
          twinName={twinDetails?.name}
          twinDescription={twinDetails?.description}
          handleTwinDescription={handleTwinDescription}
          handleTwinName={handleTwinName}
          handleSave={updateTwin}
        />}
        handleClose={handleClose}
        open={modalOpenStatus} />
    </div>
  )
}

export default EditTwin
