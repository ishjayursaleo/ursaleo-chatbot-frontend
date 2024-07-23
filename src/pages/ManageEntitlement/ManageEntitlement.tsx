/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useEffect, useState } from 'react'
import styles from './ManageEntitlement.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Skeleton,
  TextField,
  Typography,
  Tooltip,
  Chip
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import type { GetAllUsersByClientRequestParam, AppState, DeleteUserEntitlementParams, UserEntitlementUpdate } from '../../interfaces'
import type { SelectedOptions } from '../../components'
import { alertActions } from '../../redux/actions'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SearchIcon from '@mui/icons-material/Search'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import CheckboxAutocomplete from '../../components/CheckboxAutocomplete/CheckboxAutocomplete'
import { useNavigate, useParams } from 'react-router-dom'
import { AppPagination, ModalLayout, UrsaleoButton } from '../../components'
import { entitlementService } from '../../services'
import { ALERT_VARIANT, APP_TABLE_CONFIGS, URSALEO_USER_ROLES } from '../../utils/constants'
import _debounce from 'lodash/debounce'
import ManageEntitlementList from '../../components/ManageEntitlementList/ManageEntitlementList'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'
import { twinService } from '../../services/twinService'

const ManageEntitlement = () => {
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { clientId, clientName } = useParams<any>()
  const [manageUserList, setManageUserList] = useState<any>([])
  // used to set the userDetails after fetch from API
  const [userDetailsByClientId, setUserDetailsByClientId] = useState<any>({})
  /*
    userSearchText: for when user type something in above search text input based on that API should call again
  */
  const [userSearchText, setUserSearchText] = useState<string | null>(null)

  const [pageCount, setPageCount] = useState<number>(0)
  const [page, setPage] = useState<number>(APP_TABLE_CONFIGS.DEFAULT_PAGE)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [triggerToUpdate, setTriggerToUpdate] = useState<boolean>(false)
  const [userRoles, setUserRoles] = useState<string[]>([])
  const [allTwinList, setAllTwinList] = useState<any>()
  const [selectedOptions, setSelectedOptions] = React.useState<any>()
  const userList = [{ label: 'Admin', value: 1 }, { label: 'Editor', value: 2 }, { label: 'Reader', value: 3 }]

  /*
  This state for manage the Manage User Entitlement from Manage user screen and handle the status after call the API
  */

  const [UserEntitlementDeleteStatus, setUserEntitlementDeleteStatus] = useState<boolean>(false)

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Manage Entitlement', userData)
  }, [])

  const handleClose = () => {
    navigate('/')
  }
  const editUserEntitlements = (userId: string, userRole: string, userFirstName: string, userTwins: any) => {
    triggerCustomGoogleAnalyticsEvent('btn', 'edit_user_entitlement', 'edit_user_entitlement', userData)
    const selectedTwinIDs = userTwins?.map((twin: any) => twin.value)
    if (clientId !== undefined && clientName !== undefined) {
      navigate(`/manage-ul-admin/client-admin/${clientId}/${clientName}/manage-entitlement/${userId}/${userRole}/${userFirstName}/edit`, { state: selectedTwinIDs })
    }
  }
  /**
   * @param userId
   * @param userRole
   * @param clientId
   * when executes it will remove the user from the Manage User Table in frontend
   */
  const deleteUserEntitlements = (userId: string, userRole: string, clientId: string) => {
    triggerCustomGoogleAnalyticsEvent('btn', 'dlt_user_entitlement', 'dlt_user_entitlement', userData)
    void (async () => {
      if (clientId !== undefined && userId !== undefined && userRole !== undefined) {
        const deleteUserEntitlementParams: DeleteUserEntitlementParams = {
          bodyParams: {
            clientId,
            role: userRole,
            userId
          }
        }
        const deleteRes = await entitlementService.deleteUserFromEntitlementList(deleteUserEntitlementParams)
        if (deleteRes.data) {
          dispatch(alertActions.triggerAlert({ message: 'User deleted successfully', options: { autoHideDuration: 1000, variant: ALERT_VARIANT.SUCCESS } }))
          setUserEntitlementDeleteStatus(true)
        }
      }
    })()
  }

  const debouncedHandleChange = _debounce(async (value) => {
    setUserSearchText(value)
    setTriggerToUpdate(true)
  }, 1000)

  const handleUserSearch = (e: any) => {
    void (async () => {
      await debouncedHandleChange(e.target.value)
    })()
  }

  /*
After change the status after delete API call hit the user List again to show the changes
*/
  useEffect(() => {
    getAllUserById()
  }, [UserEntitlementDeleteStatus])

  const handleAddUserToClient = () => {
    triggerCustomGoogleAnalyticsEvent('btn', 'add_new_entitlement', 'add_new_entitlement', userData)
    const baseRoute = '/manage-ul-admin/client-admin'
    const clientIdUrlPart = (clientId != null) ? `/${clientId}` : '/clientId-undefined'
    const formattedUrl = `${baseRoute}${clientIdUrlPart}/manage-entitlement/add-users`
    navigate(formattedUrl)
  }
  const handleBackClick = () => {
    navigate(-1)
  }

  /*
  When render the page initially this useEffect will run and fetch the data
  */

  const getAllUserById = (params?: any) => {
    void (async () => {
      try {
        if (clientId !== undefined) {
          if (params?.queryParams?.pageSize !== undefined) {
            const clientIdPathParam: GetAllUsersByClientRequestParam = {
              pathParam: {
                clientId
              },
              queryParams: {
                page: params.queryParams.page,
                pageSize: params.queryParams.pageSize,
                userSearchText
              }
            }
            const userByClientIDRes = await entitlementService.getAllUsersByClient(clientIdPathParam)
            if (userByClientIDRes.data !== undefined) {
              setUserDetailsByClientId(userByClientIDRes.data)
              setPageCount(Number(userByClientIDRes?.data?.count))
              setIsLoading(false)
            }
          } else if (params?.queryParams.userSearchText !== '' && params?.queryParams?.pageSize === undefined) {
            const clientIdPathParam: GetAllUsersByClientRequestParam = {
              pathParam: {
                clientId
              },
              queryParams: {
                userSearchText
              }
            }

            const userByClientIDRes = await entitlementService.getAllUsersByClient(clientIdPathParam)
            if (userByClientIDRes.data !== undefined) {
              setUserDetailsByClientId(userByClientIDRes.data)
              setPageCount(Number(userByClientIDRes?.data?.count))
              setIsLoading(false)
            }
          } else {
            const clientIdPathParam: GetAllUsersByClientRequestParam = {
              pathParam: {
                clientId
              }
            }

            const userByClientIDRes = await entitlementService.getAllUsersByClient(clientIdPathParam)
            if (userByClientIDRes.data !== undefined) {
              setUserDetailsByClientId(userByClientIDRes.data)
              setPageCount(Number(userByClientIDRes?.data?.count))
              setIsLoading(false)
            }
          }
        }
      } catch (error) {
        // Handle the error here, you can log it or update state accordingly
        dispatch(alertActions.triggerAlert({ message: 'Error fetching user details', options: { variant: ALERT_VARIANT.ERROR, autoHideDuration: 2000 } }))
        // You can update state to show an error message to the user
      }
    })()
  }
  useEffect(() => {
    getAllUserById()
  }, [])
  useEffect(() => {
    const manageUsersList = userDetailsByClientId?.data?.map((item: any) => {
      const { role, user, clients } = item
      const userEmail = user?.email
      const userRole = role
      const userFirstName = user?.firstName
      const userId = user?.id

      const twinsArray = clients.reduce((acc: any[], client: any) => {
        if (client.twins !== undefined) {
          client.twins?.forEach((twin: any) => {
            acc.push({
              label: twin.name,
              value: twin.id,
              description: twin.description
            })
          })
        }
        return acc
      }, [] as any[])

      return {
        userEmail,
        userRole,
        userFirstName,
        userId,
        twins: twinsArray,
        selectedOptions: twinsArray,
        disableButtons: userRoles.includes(URSALEO_USER_ROLES.ADMIN) &&
          userData?.data?.userId === item?.userId &&
          !userRoles.includes(URSALEO_USER_ROLES.ULADMIN)
      }
    })
    setManageUserList(manageUsersList)
  }, [userDetailsByClientId])

  useEffect(() => {
    setSelectedOptions(manageUserList?.map((user: any) => user.twins))
  }, [manageUserList])

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setIsLoading(true)
    const paginationAndSearchParams = {
      queryParams: {
        page: value,
        pageSize: 3,
        userSearchText
      }
    }
    getAllUserById(paginationAndSearchParams)
    setPage(value)
  }

  useEffect(() => {
    if (userSearchText === '') {
      getAllUserById()
    }
    const paginationAndSearchParams = {
      queryParams: {
        userSearchText
      }
    }
    getAllUserById(paginationAndSearchParams)
  }, [userSearchText, triggerToUpdate])

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

  const SkeltonTable = () => {
    return (
      <Card className={styles.tableHeaderSkelton}>
        <Grid container sm={12} display='flex' alignItems='center'>
          <Grid item sm={10}
            display='flex'
            flexDirection='row'
            alignItems='center'
            gap={3}>
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
              width='45%'
              height={30} />
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
              width='45%'
              height={30} />
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
              width='45%'
              height={30} />
          </Grid>
          <Grid item sm={2} sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center'
          }}>
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
              width='50%'
              height={30} />
          </Grid>
        </Grid>
      </Card>
    )
  }

  const MIN_LOADING_TIME = 3000
  let showSkeleton = true
  useEffect(() => {
    setTimeout(() => {
      showSkeleton = false
    }, MIN_LOADING_TIME)
  }, [])

  useEffect(() => {
    const userRolesString = localStorage.getItem('userRoles')
    if (userRolesString !== null) {
      setUserRoles(JSON.parse(userRolesString))
    } else {
      console.log('No userRoles found in localStorage')
    }
  }, [])

  const handleClientTwinsChange = (index: any, value: any) => {
    if (value.find((item: any) => item.label === 'Select All')) {
      // "Select All" was selected
      if (
        selectedOptions[index].length === allTwinList.length ||
        selectedOptions[index].includes('Select All')
      ) {
        // If everything was already selected, deselect all
        selectedOptions[index] = []
      } else {
        setSelectedOptions((prevSelectedOptions: any) => {
          const newSelectedOptions = [...prevSelectedOptions]
          newSelectedOptions[index] = allTwinList
          return newSelectedOptions
        })
      }
    } else {
      setSelectedOptions((prevSelectedOptions: any) => {
        const newSelectedOptions = [...prevSelectedOptions]
        newSelectedOptions[index] = value
        return newSelectedOptions
      })
    }
  }

  const renderTags = (value: any, getTagProps: any) => {
    return value.map((option: any, index: number) => {
      return <Chip
       sx={{ backgroundColor: 'black', color: 'white', margin: '0.25rem', alignSelf: 'flex-start' }}
        key={index}
        label={option.label}
        {...getTagProps({ index })}
        clearIcon={null}
      />
    })
  }

  const updateUserEntitlements = (userId: string, selectedTwins: any, clientId: string, userRole: string) => {
    // google analytics event click
    triggerCustomGoogleAnalyticsEvent('btn', 'update_user_entitlement', 'update_user_entitlement', userData)
    const twinIds = selectedTwins.map((twin: SelectedOptions) => twin.value)
    if (userId && twinIds.length > 0 && clientId && userRole) {
      const UpdateUserEntitlement: UserEntitlementUpdate = {
        userId,
        twinIds,
        clientId,
        role: userRole
      }

      void (async () => {
        try {
          const updateUserEntitlementResponse = await entitlementService.userEntitlementUpdate(UpdateUserEntitlement)
          // setUserUpdateEntitlementResponse(updateUserEntitlementResponse.data.message)
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

  return (
    <>
      <ModalLayout
        activateBackArrow={true}
        routePath='Admin Menu'
        contentLayout={
          clientId !== undefined
            ? (
            <ManageEntitlementList
                clientId={clientId}
                deleteUserEntitlements={deleteUserEntitlements}
                editUserEntitlements={editUserEntitlements}
                handleAddUserToClient={handleAddUserToClient}
                handleChangePage={handleChangePage}
                handleUserSearch={handleUserSearch}
                isLoading={isLoading}
                manageUserList={manageUserList}
                page={page}
                pageCount={pageCount}
                userRoles={userRoles}
                selectedOptions={selectedOptions}
                allTwins={allTwinList}
                handleClientTwinsChange={handleClientTwinsChange}
                renderTags={renderTags}
                updateUserEntitlements={updateUserEntitlements}
                userList={userList}
            />
              )
            : null
        }
        headerText='Manage Users'
        handleClose={handleClose}
        open={modalOpenStatus} />
    </>
  )
}

export default ManageEntitlement
