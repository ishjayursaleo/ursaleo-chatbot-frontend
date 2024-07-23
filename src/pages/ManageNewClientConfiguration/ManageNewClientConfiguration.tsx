import React from 'react'
import { ModalLayout } from '../../components'
import { useSelector } from 'react-redux'
import { type AppState } from '../../interfaces'
// import ManageClientConfiguration from '../../components/ManageClientConfiguration/ManageClientConfiguration'
import { useNavigate, useParams } from 'react-router-dom'
import ClientConfigTabsModal from '../../components/ClientConfigTabsModal/ClientConfigTabsModal'

const ManageNewClientConfiguration = () => {
  const { clientName } = useParams()
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const navigate = useNavigate()
  const handleClose = () => {
    navigate('/')
  }
  return (
        <ModalLayout
            routePath={clientName}
            activateBackArrow={true}
            contentLayout={<ClientConfigTabsModal />}
            headerText='Manage Configuration'
            handleClose={handleClose}
            open={modalOpenStatus}
        />
  )
}

export default ManageNewClientConfiguration
