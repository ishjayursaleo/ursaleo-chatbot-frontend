import React, { useEffect } from 'react'
import { ModalLayout } from '../../components'
import { useSelector } from 'react-redux'
import { type AppState } from '../../interfaces'
import { ULAdminUserInvite } from '../../components/ULAdminUserInvite'
import { useNavigate } from 'react-router-dom'
import { triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'

const AddNewAdminUser = () => {
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const navigate = useNavigate()

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Add New Admin User', userData)
  }, [])

  const handleClose = () => {
    navigate('/')
  }
  return (
    <>
     <ModalLayout
        activateBackArrow={true}
        routePath='UL Admins'
        contentLayout={<ULAdminUserInvite/>}
        headerText='Add New UL Admins'
        handleClose={handleClose}
        open={modalOpenStatus} />
    </>
  )
}

export default AddNewAdminUser
