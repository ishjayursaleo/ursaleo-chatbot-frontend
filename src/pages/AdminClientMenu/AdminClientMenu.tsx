/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useEffect } from 'react'

import { type ClientDetailsRequestParams, type AppState } from '../../interfaces'
import { useSelector, useDispatch } from 'react-redux'

import { ModalLayout, ULAdminClient } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { clientActions } from '../../redux/actions/clientActions'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'
const AdminClientMenu = () => {
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { clientId, clientName } = useParams()

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Admin Client Menu', userData)
  }, [])

  const handleClose = () => {
    navigate('/')
  }

  const manageUserEntitlements = () => {
    triggerCustomGoogleAnalyticsEvent('btn', 'manage_entitlement', 'manage_entitlement', userData)
    navigate(`/manage-ul-admin/client-admin/${clientId}/${clientName}/manage-entitlement`)
  }

  const getClientTwinsList = () => {
    triggerCustomGoogleAnalyticsEvent('btn', 'manage_twins', 'manage_twins', userData)
    navigate(`/manage-ul-admin/client-admin/${clientId}/${clientName}/manage-client-twins`)
  }

  const manageConfigurations = () => {
    navigate(`/manage-ul-admin/client-admin/${clientId}/${clientName}/manage-configurations`)
  }
  useEffect(() => {
    if (clientId !== undefined) {
      const param: ClientDetailsRequestParams = {
        clientId
      }
      dispatch(clientActions.clearSelectedClientDetails())
      dispatch(clientActions.selectedClientDetails(param))
    }
  }, [])

  return (
    <ModalLayout
      contentLayout={<ULAdminClient
        manageClientTwins={getClientTwinsList}
        manageUserEntitlements={manageUserEntitlements}
        manageConfigurations={manageConfigurations}
      />}
      roleFromLoggedUser='Admin'
      handleClose={handleClose}
      open={modalOpenStatus}
      activateBackArrow={true}
      headerText={`${clientName}`}
      isHeaderTextDisabled={false}
      routePath='Admin Dashboard'
    />
  )
}

export default AdminClientMenu
