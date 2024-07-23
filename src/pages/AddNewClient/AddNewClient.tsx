/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { ModalLayout } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { type AppState } from '../../interfaces'
import { alertActions, profileActions } from '../../redux/actions'
import AddClient from '../../components/AddClient/AddClient'
import { useNavigate } from 'react-router-dom'
import { clientActions } from '../../redux/actions/clientActions'
import * as yup from 'yup'
import { ALERT_VARIANT } from '../../utils/constants'
import { clientService } from '../../services'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'

const contactSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required()
})
const AddNewClient = () => {
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const createClientResponseObj = useSelector((state: AppState) => state.client.createClient)
  const createClientResponse = createClientResponseObj.error
  const userData = useSelector((state: AppState) => state.user.storeUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [clientName, setClientName] = useState('')
  const [clientDescription, setClientDescription] = useState('')

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Add New Client', userData)
  }, [])

  const handleClose = () => {
    navigate('/')
  }
  const changeClientName = (e: any) => {
    setClientName(e.target.value)
  }
  const changeClientDescription = (e: any) => {
    setClientDescription(e.target.value)
  }

  const addNewClient = () => {
    const payload = {
      name: clientName,
      description: clientDescription
    }
    triggerCustomGoogleAnalyticsEvent('btn', 'add_client', 'add_client', userData)
    contactSchema.validate(payload).then((res) => {
      dispatch(clientActions.addClient(payload))
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
  }

  useEffect(() => {
    if (createClientResponseObj.status === 'success') {
      navigate(-1)
    } else if (createClientResponseObj.status === 'error') {
      let errorMessage = createClientResponse?.response?.data?.error
      errorMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
      dispatch(alertActions.triggerAlert({
        message: errorMessage,
        options: {
          autoHideDuration: 2000,
          variant: ALERT_VARIANT.ERROR

        }
      }))
    }
  }, [createClientResponseObj.status])

  /*
    when redirect to Client List create client status should be clear otherwise next time can't come to add new client
  */
  useEffect(() => {
    return () => {
      dispatch(clientActions.clearCreateClient())
    }
  }, [])
  return (
    <div>
      <ModalLayout
        isHeaderTextDisabled={false}
        routePath='Admin Dashboard'
        activateBackArrow={true}
        contentLayout={<AddClient
          addClient={addNewClient}
          handleClientDescription={changeClientDescription}
          handleClientName={changeClientName} />}
        headerText='Add New Client'
        handleClose={handleClose}
        open={modalOpenStatus} />
    </div>
  )
}

export default AddNewClient
