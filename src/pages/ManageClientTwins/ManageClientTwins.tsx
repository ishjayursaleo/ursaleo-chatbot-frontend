/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

import styles from './ManageClientTwins.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Grid,
  IconButton,
  Modal,
  Typography
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { type AppState } from '../../interfaces'
import { alertActions } from '../../redux/actions'
import { TwinList } from '../../components/Twins'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { ConfirmationDialogBox, ModalLayout } from '../../components'
import { twinAction } from '../../redux/actions/twinActions'
import { useNavigate, useParams } from 'react-router-dom'
import { type TwinDeletePathParams, type GetAllTwinListRequestParam, type TwinDetails } from '../../interfaces/twins'
import { ALERT_VARIANT, APP_TABLE_CONFIGS } from '../../utils/constants'
import { type TwinDetailsParams } from '../../components/Twins/TwinList/TwinList'
import { twinService } from '../../services/twinService'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'

const ManageClientTwins = () => {
  /* Start Delete Confirmation Popup Modal */

  const [openConfirmation, setOpenConfirmation] = React.useState(false)
  /* End Delete Confirmation Popup Modal */
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const userData = useSelector((state: AppState) => state.user.storeUser)

  const { clientId, clientName } = useParams()
  const [isTwinData, setIsTwinData] = useState<boolean>(false)
  /*
  When Click the Manage twin button it will fetch the twin list against the Client ID
  */
  const twinListResponse = useSelector((state: AppState) => state.twin.allTwinList.data)
  const twinListResponseStatus = useSelector((state: AppState) => state.twin.allTwinList)
  const pageCount = twinListResponse !== undefined ? twinListResponse.count : 10
  /*
  Pagination Related Data
  */
  const [page, setPage] = useState<number>(APP_TABLE_CONFIGS.DEFAULT_PAGE)

  /*
 Selected Clients Delete
  */
  const [selectedTwinsDeleteStatus, setSelectedTwinsDeleteStatus] = useState<boolean>(false)
  const [deleteResponse, setDeleteResponse] = useState<any>([])
  const [deletionCompletion, setDeletionCompletion] = useState<boolean>(false)
  const [twinList, setTwinList] = useState<TwinDetails[]>([])
  const [selectedTwinId, setSelectedTwinId] = useState('')

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Manage Client Twins', userData)
  }, [])

  const handleClose = () => {
    navigate('/')
  }

  const handleTwinDetails = ({ twinId, twinName, twinVersionDefaultId }: TwinDetailsParams) => {
    navigate(`/manage-ul-admin/client-admin/${clientId}/${clientName}/manage-client-twins/${twinId}/${twinName}/details/${twinVersionDefaultId}`)
  }

  const handleAddNewTwin = () => {
    // google analytic event trigger
    triggerCustomGoogleAnalyticsEvent('btn', 'add_new_twin', 'add_new_twin', userData)
    navigate(`/manage-ul-admin/client-admin/${clientId}/${clientName}/manage-client-twins/add-twin`)
  }

  const handlerEditTwin = (twinId: string, twinName: string) => {
    navigate(`/manage-ul-admin/client-admin/${clientId}/${clientName}/manage-client-twins/edit-twin/${twinId}/${twinName}`)
  }

  useEffect(() => {
    setTwinList([])
    setPage(APP_TABLE_CONFIGS.DEFAULT_PAGE)
    if (clientId !== undefined) {
      dispatch(twinAction.allTwinList({
        clientId,
        queryParams: {
          page: 1,
          pageSize: 1000,
          include: 'defaultVersion'
        }
      }))
    }
  }, [])
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    if (clientId !== undefined) {
      setPage(value)
      const allClientListParams: GetAllTwinListRequestParam = {
        clientId,
        queryParams: {
          page: value,
          pageSize: 1000,
          include: 'defaultVersion'
        }
      }
      dispatch(twinAction.allTwinList(allClientListParams))
    }
  }

  const handleDeleteSelected = (twinId: string) => {
    // google analytic event trigger
    triggerCustomGoogleAnalyticsEvent('btn', 'dlt_select_twin', 'dlt_select_twin', userData)
    setOpenConfirmation(true)
    setSelectedTwinId(twinId)
  }

  useEffect(() => {
    if (clientId !== undefined) {
      dispatch(twinAction.allTwinList({
        clientId,
        queryParams: {
          page: 1,
          pageSize: 1000,
          include: 'defaultVersion'
        }
      }))
    }
  }, [selectedTwinsDeleteStatus])

  useEffect(() => {
    if (twinListResponseStatus.status === 'success') {
      setIsTwinData(true)
      const twinData = twinListResponse.data
      if (twinData != null) {
        const data: TwinDetails[] = twinData.map((twin: TwinDetails) => ({
          ...twin,
          isSelected: false
        }))

        setTwinList(data)
      }
    }
  }, [twinListResponseStatus.status])
  useEffect(() => {
    deleteResponse.forEach((deleteRes: any) => {
      if (typeof deleteRes.message === 'string') {
        dispatch(alertActions.triggerAlert({
          message: deleteRes.message,
          options: {
            variant: ALERT_VARIANT.ERROR,
            autoHideDuration: 2000
          }
        }))
      } else if (typeof deleteRes.message === 'boolean') {
        dispatch(alertActions.triggerAlert({
          message: 'Twin deleted successfully',
          options: {
            variant: ALERT_VARIANT.SUCCESS,
            autoHideDuration: 2000
          }
        }))
      }
      setDeletionCompletion(true)
    })
  }, [deleteResponse])

  useEffect(() => {
    setPage(APP_TABLE_CONFIGS.DEFAULT_PAGE)
    if (clientId !== undefined) {
      dispatch(twinAction.allTwinList({
        clientId,
        queryParams: {
          page: 1,
          pageSize: 1000,
          include: 'defaultVersion'
        }
      }))
    }
  }, [deletionCompletion])

  const handleCloseConfirmBox = (agreed: boolean) => {
    if (agreed) {
      void (async () => {
        try {
          if (clientId !== undefined) {
            const params: TwinDeletePathParams = {
              bodyParams: {
                twinIds: [selectedTwinId]
              },
              pathParams: {
                clientId
              }
            }
            const deleteRes = await twinService.deleteTwin(params)
            setDeleteResponse(deleteRes.data)
            /*
          get the array then loop it and call the alert triggers one by one
          */

            if (deleteRes.data.message === true) {
              setSelectedTwinsDeleteStatus(true)
            } else {
              setSelectedTwinsDeleteStatus(false)
            }
          }
        } catch (error) {
          dispatch(alertActions.triggerAlert({ message: 'Cannot Delete Due to Relationship', options: { autoHideDuration: 2000, variant: ALERT_VARIANT.ERROR } }))
        }
      })()
      setOpenConfirmation(false)
    } else {
      setOpenConfirmation(false)
    }
  }

  const closeDialogBox = () => {
    setOpenConfirmation(false)
  }
  return (
    <>
      <ModalLayout
        routePath={clientName}
        activateBackArrow={true}
        headerText='Manage Twins'
        handleClose={handleClose}
        open={modalOpenStatus}
        contentLayout={<TwinList
          isLoading={twinListResponse.isLoading}
          isTwinData={isTwinData}
          deleteSelected={handleDeleteSelected}
          page={page}
          handleChangePage={handleChangePage}
          pageCount={pageCount}
          addNewTwin={handleAddNewTwin}
          viewTwinDetails={handleTwinDetails}
          twinList={twinList}
          handleTwinEdit={handlerEditTwin}
        />}
      />
      <ConfirmationDialogBox
            confirmationText='Do you want to remove selected twin(s)?'
            handleConfirmationBoxClose={closeDialogBox}
            handleConfirmationClose={handleCloseConfirmBox}
            openConfirmation={openConfirmation}
          />

    </>

  )
}

export default ManageClientTwins
