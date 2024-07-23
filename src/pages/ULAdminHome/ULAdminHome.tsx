/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { ConfirmationDialogBox, ModalLayout } from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { ClientDetail, type ClientListResponse, type AppState, type ClientListRequestParams } from '../../interfaces'
import { alertActions, entitlementAction, profileActions } from '../../redux/actions'
import { ULAdminHomeTable } from '../../components/ULAdminHomeTable'
import { useNavigate } from 'react-router-dom'
import { type GetAllClientListRequestParam } from '../../interfaces/entitlements'
import { ALERT_VARIANT, APP_TABLE_CONFIGS } from '../../utils/constants'
import { clientService } from '../../services'
import { type AxiosResponse } from 'axios'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'

export interface ClientListData {
  clientId: string
  clientName: string
  clientDescription: string
  createdAt: string // This could be a Date type if you parse it accordingly
  updatedAt: string // This could be a Date type if you parse it accordingly
  twinCount: string
  userCount: string
  isSelected: boolean
}
const ULAdminHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state: AppState) => state.user.storeUser)

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const myEntitlementList = useSelector((state: AppState) => state.entitlement.myEntitlements)
  const clientListResponse = useSelector((state: AppState) => state.entitlement.allClientList)
  const [mappedClintList, setMappedClintList] = useState([])
  const total = clientListResponse
  /*
  after integrate with /api/client/list
  */
  const [clintList, setClintList] = useState<any>([])
  const [hasMore, setHasMore] = useState(true)
  const [mappedClintListToArray, setMappedClintListToArray] = useState<ClientListData[]>([])
  const [openConfirmation, setOpenConfirmation] = React.useState(false)

  const [count, setCount] = useState(0)
  const [totalTwinUser, setTotalTwinUser] = useState<{ totalTwinCount: number
    totalUserCount: number }>({
    totalTwinCount: 0,
    totalUserCount: 0
  })

  /*
  Pagination Related Data
  */
  const [page, setPage] = useState<number>(APP_TABLE_CONFIGS.DEFAULT_PAGE)

  /*
 Selected Clients Delete
  */
  const [selectedClientsDeleteStatus, setSelectedClientsDeleteStatus] = useState<boolean>(false)
  const [deleteResponse, setDeleteResponse] = useState<any>([])
  const [deletionCompletion, setDeletionCompletion] = useState<boolean>(false)

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Admin Home', userData)
  }, [])

  const handleClose = () => {
    const allClientListParams: GetAllClientListRequestParam = {
      queryParam: { userId: myEntitlementList?.data?.[0].userId, include: 'client' }
    }// need to handle the null check here
    dispatch(entitlementAction.allClientList(allClientListParams))
    navigate('/')
  }
  const getClientAdminMenu = (clientId: string, clientName: string) => {
    navigate(`/manage-ul-admin/client-admin/${clientId}/${clientName}`)
  }
  const addNewClient = () => {
    triggerCustomGoogleAnalyticsEvent('btn', 'add_new_client', 'add_new_client', userData)
    navigate('/manage-ul-admin/add-client')
  }
  const handleULAdminList = () => {
    triggerCustomGoogleAnalyticsEvent('btn', 'manage_ul_admins', 'manage_ul_admins', userData)
    navigate('/manage-ul-admin/admin-list')
  }
  const handleSelected = (id: string, value: boolean) => {
    const ClientWithSelected = mappedClintListToArray.map((client) => {
      if (client.clientId === id) {
        return {
          ...client,
          isSelected: value
        }
      }
      return client
    })
    setMappedClintListToArray(ClientWithSelected)
  }

  const isIdSelected = (id: string): boolean => {
    return selectedIds.includes(id)
  }

  useEffect(() => {
    if (myEntitlementList.status === 'success') {
      const allClientListParams = {
        queryParam: { userId: myEntitlementList.data[0]?.userId, include: 'client', page: 1, pageSize: 3 }
      }

      dispatch(entitlementAction.allClientList(allClientListParams))
    }
  }, [myEntitlementList.status])

  const handleClientList = async (params?: ClientListRequestParams) => {
    const clientListResponse: AxiosResponse<ClientListResponse> = await clientService.getClientList(params)
    const clientListData = clientListResponse.data
    setTotalTwinUser({ totalTwinCount: clientListData.totalTwinCount, totalUserCount: clientListData.totalUserCount })
    setCount(clientListData.count)
    setClintList(clientListData.data)
    const mappedClientArray = mappedClientListToArray(clientListData.data)
    setMappedClintListToArray(mappedClientArray)
  }
  useEffect(() => {
    void handleClientList()
    if (clintList !== undefined) {
      const mappedClientArray = mappedClientListToArray(clintList)
      setMappedClintListToArray(mappedClientArray)
    }
  }, [])

  useEffect(() => {
    const mappedClientArray = mappedClientListToArray(clintList)
    setMappedClintListToArray(mappedClientArray)
  }, [clintList.length > 0])

  function mappedClientListToArray (clintList: any) {
    return clintList
      .map((client: any) => ({
        clientId: client.id,
        clientName: client.name,
        clientDescription: client.description,
        twinCount: client?.twinCount ?? 0,
        userCount: client?.userCount ?? 0,
        isSelected: false
      }))
  }
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    const allClientListParams: ClientListRequestParams = {
      queryParam: {
        page: value,
        pageSize: 10,
        isUlAdminScreen: false
      }
    }
    void handleClientList(allClientListParams)
    setPage(value)
  }

  const fetchMoreData = () => {
    const newPage = page + 1
    const allClientListParams: ClientListRequestParams = {
      queryParam: {
        page: newPage,
        pageSize: 10,
        isUlAdminScreen: false
      }
    }
    setPage(newPage)
    void handleClientList(allClientListParams)
  }
  const handleDeleteSelected = () => {
    triggerCustomGoogleAnalyticsEvent('btn', 'dlt_selected_admin', 'dlt_selected_admin', userData)
    // setDeletionCompletion(false)
    // void (async () => {
    //   const deleteRes = await clientService.deleteSelectedClients(selectedIds)
    //   setDeleteResponse(deleteRes.data)
    //   /*
    //   get the array then loop it and call the alert triggers one by one
    //   */

    //   if (deleteRes.data.message === true) {
    //     setSelectedClientsDeleteStatus(true)
    //   } else {
    //     setSelectedClientsDeleteStatus(false)
    //   }
    // })()

    // setSelectedIds([])
    setOpenConfirmation(true)
  }

  useEffect(() => {
    void handleClientList()
  }, [selectedClientsDeleteStatus])
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
          message: 'Client deleted successfully',
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
    void handleClientList()
  }, [deletionCompletion])

  const handleCloseConfirmBox = (agreed: boolean) => {
    setOpenConfirmation(false)

    if (agreed) {
      const selectedULAdmins = mappedClintListToArray.filter((client) => client.isSelected)
      const idArray = selectedULAdmins.map((client) => client.clientId.toString())

      void (async () => {
        const deleteRes = await clientService.deleteSelectedClients(idArray)
        setDeleteResponse(deleteRes.data)
        /*
      get the array then loop it and call the alert triggers one by one
      */
        if (deleteRes.data.message === true) {
          setSelectedClientsDeleteStatus(true)
        } else {
          setSelectedClientsDeleteStatus(false)
        }
      })()
    } else {
      setOpenConfirmation(false)
    }
  }
  const closeDialogBox = () => {
    setOpenConfirmation(false)
  }
  return (<>
        <ModalLayout
                activateBackArrow={false}
                isHeaderTextDisabled={false}
                contentLayout={
                  <ULAdminHomeTable
                    totalTwinUserCounts={totalTwinUser}
                    deleteSelected={handleDeleteSelected}
                    count={count}
                    page={page}
                    handleChangePage={handleChangePage}
                    fetchMoreData={fetchMoreData}
                    hasMore={hasMore}
                    clientList={mappedClintListToArray}
                    handleClientAdminMenu={getClientAdminMenu}
                    handleSelected={handleSelected}
                    isAdminSelected={(selectedIds.length === 0) && true }
                    isIdSelected={isIdSelected}
                    handleAddNewClient={addNewClient}
                    handleULAdminList={handleULAdminList}
                 />}
            headerText='Admin Dashboard'
            handleClose={handleClose}
            open={modalOpenStatus} />

            <ConfirmationDialogBox
              confirmationText='Do you want to remove selected client(s)?'
              handleConfirmationBoxClose={closeDialogBox}
              handleConfirmationClose={handleCloseConfirmBox}
              openConfirmation={openConfirmation}
            />
            </>
  )
}

export default ULAdminHome
