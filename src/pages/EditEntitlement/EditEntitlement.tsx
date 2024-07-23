/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { type UserEntitlementUpdate, type AppState } from '../../interfaces'
import { ModalLayout, type SelectedOptions } from '../../components'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import EditUserEntitlements from '../../components/EditUserEntitlements/EditUserEntitlements'
import { twinService } from '../../services/twinService'
import { entitlementService } from '../../services'
import { alertActions } from '../../redux/actions'
import { ALERT_VARIANT } from '../../utils/constants'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'
const EditEntitlement = () => {
  const { clientId, clientName, userId, userRole, userFirstName } = useParams()
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const userData = useSelector((state: AppState) => state.user.storeUser)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  /**
   To passed selected Twin ID from Manage User Entitlement Page
   */
  const location = useLocation()
  const { state } = location
  const handleClose = () => {
    navigate('/')
  }

  /*
  Set the ALl Twin List
  */
  const [allTwinList, setAllTwinList] = useState<any>()
  const [selectedOptions, setSelectedOptions] = React.useState<any>()
  const [userUpdateEntitlementResponse, setUserUpdateEntitlementResponse] = useState<boolean | string>()

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Edit Entitlement', userData)
  }, [])

  useEffect(() => {
    getAllTwinsByClient()
  }, [])

  const getAllTwinsByClient = () => {
    void (async () => {
      if (clientId !== undefined) {
        const totalTwinList = await twinService.getAllTwinList({
          clientId,
          queryParams: {
            include: 'defaultVersion'
          }
        })
        const twinList = totalTwinList?.data.data
        const mappedTwinList = twinList.map((twin: any, index: number) => {
          return {
            label: twin.name,
            value: twin.id
          }
        })
        setAllTwinList(mappedTwinList)
      }
    })()
  }

  const handleSelectedOptions = (selectedOption: SelectedOptions[]) => {
    setSelectedOptions(selectedOption)
  }

  const updateUserEntitlements = () => {
    // google analytics event click
    triggerCustomGoogleAnalyticsEvent('btn', 'update_user_entitlement', 'update_user_entitlement', userData)
    const selectedTwins = selectedOptions.filter((twin: SelectedOptions) => twin.isSelected)
    const twinIds = selectedTwins.map((twin: SelectedOptions) => twin.value)
    if (userId !== undefined && twinIds.length > 0 && clientId !== undefined && userRole !== undefined) {
      const UpdateUserEntitlement: UserEntitlementUpdate = {
        userId,
        twinIds,
        clientId,
        role: userRole
      }

      void (async () => {
        try {
          const updateUserEntitlementResponse = await entitlementService.userEntitlementUpdate(UpdateUserEntitlement)
          setUserUpdateEntitlementResponse(updateUserEntitlementResponse.data.message)
          dispatch(alertActions.triggerAlert({
            message: 'Entitlements updated successfully',
            options: { autoHideDuration: 1000, variant: ALERT_VARIANT.SUCCESS }
          }))
        } catch (error) {
          dispatch(alertActions.triggerAlert({
            message: error as string,
            options: { autoHideDuration: 1000, variant: ALERT_VARIANT.ERROR }
          }))
        }
      })()
    }
  }

  useEffect(() => {
    if (userUpdateEntitlementResponse !== undefined) {
      navigate(-1)
    }
  }, [userUpdateEntitlementResponse])

  return (
    <>
      <ModalLayout
        contentLayout={<EditUserEntitlements
          handleUserEntitlementUpdate={updateUserEntitlements}
          entitledTwins={allTwinList || []}
          selectedTwinsFromManageTwin={state}
          selectedOptions={selectedOptions}
          handleSelectedOptions={handleSelectedOptions}
        />
        }
        handleClose={handleClose}
        open={modalOpenStatus}
        activateBackArrow={true}
        headerText={`Edit Entitlements of ${userFirstName !== undefined ? userFirstName : 'User'}`}
        isHeaderTextDisabled={false}
        routePath='Manage Users'
      />
    </>
  )
}

export default EditEntitlement
