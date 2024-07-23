/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { ConfirmationDialogBox, ModalLayout, ULAdminTable } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import {
  type GetAllULAdminParams,
  type AppState,
  type GetAllULAdminResponse,
  type AdminListTableTypes,
  type deleteUlAdminEntitlementBulkParams,
  type AlertMessage
} from '../../interfaces'
import { useNavigate } from 'react-router-dom'
import { UserService } from '../../services/user.service'
import { type AxiosResponse } from 'axios'
import { ALERT_VARIANT, APP_TABLE_CONFIGS } from '../../utils/constants'
import _debounce from 'lodash/debounce'
import { entitlementService } from '../../services'
import { alertActions } from '../../redux/actions'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'

const ULAdminList = () => {
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'UL Admin List', userData)
  }, [])

  const handleClose = () => {
    navigate('/')
  }
  const handleAddNewAdmin = () => {
    triggerCustomGoogleAnalyticsEvent('btn', 'add_new_user', 'add_new_user', userData)
    navigate('/manage-ul-admin/admin-list/add-admin')
  }

  /*
  API Integration for UL ADMIN List

  */
  const [ulAdminList, setULAdminList] = useState<AdminListTableTypes[]>([])
  const [userSearchText, setUserSearchText] = useState<string | null>('')
  const [openConfirmation, setOpenConfirmation] = React.useState(false)

  /*
  Pagination Related Data
  */
  const [page, setPage] = useState<number>(APP_TABLE_CONFIGS.DEFAULT_PAGE)
  const [pageCount, setPageCount] = useState<number>(0)
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
  /*
  Pagination Related Data
  */
  const [triggerToUpdate, setTriggerToUpdate] = useState<boolean>(false)

  const getAllULAdminList = async (params: GetAllULAdminParams) => {
    try {
      // eslint-disable-next-line max-len
      const ulAdminListRes: AxiosResponse<GetAllULAdminResponse> = await UserService.getAllULAdmins(params)
      const ulAdminDataWithDefault = ulAdminListRes.data.data.map((ulAdmin) => ({
        ...ulAdmin,
        isSelected: false
      }))
      setULAdminList(ulAdminDataWithDefault)
      setPageCount(ulAdminListRes.data.count)
      setIsLoadingData(false)
    } catch (error) {
      console.log('Error')
    }
  }

  useEffect(() => {
    initialDataLoad()
  }, [])

  const initialDataLoad = () => {
    setULAdminList([])
    const getUlAdminListParams: GetAllULAdminParams = {
      queryParams: {
        page: 1,
        pageSize: 1000
        // searchText: userSearchText
      }
    }
    void getAllULAdminList(getUlAdminListParams)
    setPage(APP_TABLE_CONFIGS.DEFAULT_PAGE)
  }
  /*
  Pagination
  */

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setULAdminList([])
    setIsLoadingData(true)
    const getUlAdminListParams: GetAllULAdminParams = {
      queryParams: {
        page: value,
        pageSize: 1000,
        searchText: userSearchText
      }
    }
    void getAllULAdminList(getUlAdminListParams)
    setPage(value)
  }

  /*
  Pagination End
  */

  /*
When search the user from search it will call the API for each
and every type event so event propagation is handle to prevent the unwanted API calls
  */

  const debouncedHandleChange = React.useCallback(_debounce(async (value) => {
    setUserSearchText(value)
    setTriggerToUpdate(true)
  }, 1000)
  , [])

  const handleUserSearch = (event: any) => {
    setIsLoadingData(true)
    setULAdminList([])
    void (async () => {
      await debouncedHandleChange(event.target.value)
    })()
  }
  useEffect(() => {
    setULAdminList([])
    setIsLoadingData(true)
    if (userSearchText === '') {
      const getUlAdminListParams: GetAllULAdminParams = {
        queryParams: {
          page: 1,
          pageSize: 1000
        }
      }
      void getAllULAdminList(getUlAdminListParams)
    } else {
      const getUlAdminListParams: GetAllULAdminParams = {
        queryParams: {
          page: 1,
          pageSize: 1000,
          searchText: userSearchText
        }
      }
      void getAllULAdminList(getUlAdminListParams)
    }
  }, [userSearchText, triggerToUpdate])

  /*
  API Integration for UL ADMIN List End

  */

  const handleSelected = (id: string, value: boolean) => {
    const ulAdminListWithSelected = ulAdminList.map((ulAdmin) => {
      if (ulAdmin.id === id) {
        return {
          ...ulAdmin,
          isSelected: value
        }
      }
      return ulAdmin
    })
    setULAdminList(ulAdminListWithSelected)
  }
  const handleDeleteSelected = () => {
    setOpenConfirmation(true)
    triggerCustomGoogleAnalyticsEvent('btn', 'dlt_selected_ul_admin', 'dlt_selected_ul_admin', userData)
  }

  const handleCloseConfirmBox = (agreed: boolean) => {
    setOpenConfirmation(false)

    if (agreed) {
      const selectedULAdmins = ulAdminList.filter((ulAdmin) => ulAdmin.isSelected)
      const idArray = selectedULAdmins.map((ulAdmin) => ulAdmin.id.toString())
      const payload: deleteUlAdminEntitlementBulkParams = {
        userIds: idArray
      }
      void entitlementService.deleteUlAdminUlAdminEntitlement(payload).then((res) => {
        if (res.data) {
          const alert: AlertMessage = {
            message: 'UL Admin deleted successfully',
            options: {
              variant: ALERT_VARIANT.SUCCESS
            }
          }
          dispatch(alertActions.triggerAlert(alert))
          initialDataLoad()
        }
      }).catch((error) => {
        const alert: AlertMessage = {
          message: error.errors[0],
          options: {
            variant: ALERT_VARIANT.ERROR
          }
        }
        dispatch(alertActions.triggerAlert(alert))
      })
    } else {
      setOpenConfirmation(false)
    }
  }
  const closeDialogBox = () => {
    setOpenConfirmation(false)
  }
  return (
    <div>
      <ModalLayout
        activateBackArrow={true}
        routePath='Admin Dashboard'
        contentLayout={<ULAdminTable
          isLoadingData={isLoadingData}
          handleUserSearch={handleUserSearch}
          page={page}
          pageCount={pageCount}
          addUserToList={handleAddNewAdmin}
          adminList={ulAdminList}
          handleChangePage={handleChangePage}
          handleSelected={handleSelected}
          handleDeleteSelected={handleDeleteSelected}
        />}
        headerText='UL Admins'
        handleClose={handleClose}
        open={modalOpenStatus} />
      <ConfirmationDialogBox
      confirmationText='Do you want to remove selected UL admin(s)?'
        handleConfirmationBoxClose={closeDialogBox}
        handleConfirmationClose={handleCloseConfirmBox}
        openConfirmation={openConfirmation}
      />
    </div>
  )
}

export default ULAdminList
