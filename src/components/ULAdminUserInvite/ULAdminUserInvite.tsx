/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import CancelIcon from '@mui/icons-material/Cancel'
import { Button, Grid, InputAdornment, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/system'
import { UrsaleoButton } from '../common'
import {
  type UserCreateRequestPayload,
  type addEntitlementBulkPayload,
  type AlertMessage,
  type AppState,
  type GetClientAdminListRequestParam,
  type AddEntitlementPayload
} from '../../interfaces'
import { entitlementAction, alertActions } from '../../redux/actions'
import { UserService } from '../../services/user.service'
import { ALERT_VARIANT } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import * as yup from 'yup'
import { userActions } from '../../redux/actions/userAction'
import { entitlementService } from '../../services'
import SearchIcon from '@mui/icons-material/Search'
import styles from './ULAdminUserInvite.module.scss'
import { triggerCustomGoogleAnalyticsEvent } from '../../utils/helpers/googleAnalytics'

const SearchExistingUser = styled(Autocomplete)({
  backgroundColor: 'transparent',
  '& .MuiInputBase-root': {
    backgroundColor: 'black'
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white' // Set border color
  },
  '& .MuiInputLabel-root': {
    color: 'white' // Set label (placeholder) color
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'gray' // Set border color when focused
  },
  '& .MuiInputBase-input': {
    color: 'white', // Set text color
    fontSize: '1.25rem',
    textAlign: 'start',
    backgroundColor: 'black'
  },
  '& .MuiAutocomplete-popupIndicator': {
    color: 'black'// Set dropdown icon color
  }
})
const contactSchema = yup.object().shape({
  emails: yup.array().of(yup.string().email('Invalid email')).required('Emails are required').min(1, 'At least one email is required')
})

const ULAdminUserInvite = () => {
  const bulkrequest = useSelector((state: AppState) => state.entitlement.addEntitlementBulk)
  const getClientAdminList = useSelector((state: AppState) => state.user.getClientAdminList)
  const userData = useSelector((state: AppState) => state.user.storeUser)

  const [value, setValue] = React.useState<any[]>([])
  const [selectedExistingUsers, setSelectedExistingUsers] = React.useState<any[]>([])
  const [inviteUser, setInviteUser] = React.useState<any[]>([])
  const [clearInviteUser, setClearInviteUser] = React.useState<string>('')
  const [clientAdminList, setClientAdminList] = React.useState<any[]>([])
  const [nonUlAdminUserList, setNonUlAdminUserList] = React.useState<any[]>([])
  const [createUsersIsLoading, setCreateUsersIsLoading] = React.useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const bulkCreateUserHandler = () => {
    triggerCustomGoogleAnalyticsEvent('btn', 'add_bulk_users', 'add_bulk_users', userData)
    setCreateUsersIsLoading(true)
    void (async () => {
      for (const user of selectedExistingUsers) {
        try {
          const payload: AddEntitlementPayload = {
            userId: user.id,
            role: 'ADMIN',
            clientId: null,
            twinId: null
          }
          const createdEntitlement = await entitlementService.addEntitlement(payload)
          dispatch(alertActions.triggerAlert({
            message: `The role of user ${user?.email} changed to UL Admin.`,
            options: {
              autoHideDuration: 3000,
              variant: ALERT_VARIANT.SUCCESS
            }
          }))
          setSelectedExistingUsers(prevState => prevState.filter(u => u.id !== user.id))
        } catch (error: any) {
          dispatch(alertActions.triggerAlert({
            message: `The role change of user ${user?.email} failed.`,
            options: {
              autoHideDuration: 3000,
              variant: ALERT_VARIANT.ERROR
            }
          }))
        }
      }
      getNonUlAdminList()
        .then(res => {
          setNonUlAdminUserList(res.data.data)
        })
        .catch(err => { console.log(err) })
    })()
    setCreateUsersIsLoading(false)
  }

  const handleRemoveTag = (index: any) => {
    const updatedValue = [...selectedExistingUsers]
    setNonUlAdminUserList(prev => [...prev, updatedValue[index]])
    updatedValue.splice(index, 1)
    setSelectedExistingUsers(updatedValue)
  }

  const getNonUlAdminList = React.useCallback(async () => await UserService.getAllNonULUsers({ searchText: '' }), [])
  useEffect(() => {
    getNonUlAdminList()
      .then(res => {
        setNonUlAdminUserList(res.data.data)
      })
      .catch(err => { console.log(err) })
  }, [])

  const handleRemoveInviteUser = (index: any) => {
    const updatedInviteUsers = [...inviteUser]
    updatedInviteUsers.splice(index, 1)
    setInviteUser(updatedInviteUsers)
  }

  const handleInviteUserName = (inviteUser: any) => {
    setInviteUser(inviteUser)
  }

  const getAllNonULUsers = async () => {
    const response = await UserService.getAllNonULUsers()
    console.log('[NON UL User]', response.data)
  }
  const handleSearchExistingUser = (event: any) => {
    const newValue = event.target.value
    void getAllNonULUsers()
  }

  useEffect(() => {
    if (getClientAdminList.status === 'success') {
      setClientAdminList(getClientAdminList.data.data)
    }
  }, [getClientAdminList.status])

  useEffect(() => {
    if (bulkrequest.status === 'success') {
      dispatch(entitlementAction.addEntitlementBulkClear())
      navigate(-1)
    }
  }, [bulkrequest.status])

  const handleNewUserInvite = async () => {
    triggerCustomGoogleAnalyticsEvent('btn', 'send_invites', 'send_invites', userData)
    await contactSchema.validate({ emails: inviteUser }).then(async (res) => {
      try {
        const successfulResponses: any[] = []
        const failedEmails: string[] = []

        for (const email of inviteUser) {
          const payload: UserCreateRequestPayload = {
            email,
            enabled: true
          }

          try {
            const response = await UserService.createUser(payload)
            successfulResponses.push(response)
          } catch (error) {
            failedEmails.push(email)
          }
        }

        // If all users are created successfully
        if (failedEmails.length === 0) {
          if (inviteUser !== null) {
            const entitlementPayload: addEntitlementBulkPayload = {
              emails: inviteUser,
              role: 'ADMIN',
              isUlAdmin: true
            }
            dispatch(entitlementAction.addEntitlementBulk(entitlementPayload))
          }
        } else {
          const alert: AlertMessage = {
            message: `Users creation failed for: ${failedEmails.join(', ')}`,
            options: {
              variant: ALERT_VARIANT.ERROR
            }
          }
          dispatch(alertActions.triggerAlert(alert))
        }
      } catch (error) {
        const alert: AlertMessage = {
          message: error as string,
          options: {
            variant: ALERT_VARIANT.ERROR
          }
        }
        dispatch(alertActions.triggerAlert(alert))
      }
    }).catch((error: any) => {
      dispatch(alertActions.triggerAlert({
        message: error.errors[0] as string,
        options: {
          autoHideDuration: 2000,
          variant: ALERT_VARIANT.ERROR

        }
      }))
    })
  }
  const handleOptionClick = (event: any, value: any) => {
    // Add the clicked option to the value state
    setSelectedExistingUsers(prev => [...prev, ...value])
    setNonUlAdminUserList(prev => prev.filter(u => u.id !== value[0].id))
  }
  const value2 = window.devicePixelRatio
  const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio)
  const [isScroll, setIsScroll] = useState('none')
  const [maxHeight, setMaxHeight] = useState('40rem')

  useEffect(() => {
    const handleResize = () => {
      setDevicePixelRatio(window.devicePixelRatio)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // setDevicePixelRatio(window.devicePixelRatio)
  }, [])

  useEffect(() => {
    // Update styles based on the device pixel ratio
    if (devicePixelRatio >= 1.5) {
      setMaxHeight('20rem')
      setIsScroll('scroll') // Replace with your styles
    } else {
      setMaxHeight('40rem')
      setIsScroll('none') // Replace with your styles
    }
  }, [devicePixelRatio])
  return (
    <div>
      <Box className={styles.mainOuterContainer} sx={{
        overflowY: isScroll,
        maxHeight,
        '&::-webkit-scrollbar': {
          width: '0.5rem'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'gray'// For WebKit browsers
        }
      }}>
          <Grid container sm={12}>
              <Grid item sm={2}></Grid>
              <Grid item sm={8}>
                  <Grid item sm={12}
                        display='flex'
                        justifyContent='start'>
                    <Box
                        display='flex'
                        justifyContent='start'>
                      <Typography fontSize='1.125rem' sx={{ color: '#fff' }}>Search Existing Users</Typography>
                    </Box>
                  </Grid>
                  <Grid sm={12} item
                    display='flex'
                    justifyContent='center'
                    alignItems='center'>
                    <SearchExistingUser
                      disabled={createUsersIsLoading}
                      multiple
                      id="fixed-tags-demo"
                      value={value}
                      options={nonUlAdminUserList}
                      getOptionLabel={(option: any) => option?.email}
                      style={{ width: '100%', color: '#fff' }}
                      renderInput={(params) => (
                        <TextField {...params}
                          placeholder="Search existing user..."
                          color='secondary'
                          variant='standard'
                          InputProps={{
                            disableUnderline: true,
                            ...params.InputProps,
                            className: styles.searchExistingTextFelid,
                            endAdornment: (
                              <InputAdornment position="start" sx={{ cursor: 'pointer' }}>
                                <SearchIcon sx={{ color: '#9B9B9B' }} fontSize='large' />
                              </InputAdornment>
                            )
                          }}
                        />
                      )}
                      filterSelectedOptions={true}
                      PaperComponent={({ children }) => (
                        <ul style={{
                          backgroundColor: 'black',
                          padding: 0,
                          listStyle: 'none',
                          color: 'white',
                          border: '1px solid #fff',
                          borderRadius: '0.875rem'
                        }}>
                          {children}
                        </ul>
                      )}
                      onChange={handleOptionClick}
                    />
                  </Grid>
                  <Grid item sm={12}
                    display='flex'
                    justifyContent='center'>
                    <Box className={styles.existingUserAreaContainer}
                    >
                      {selectedExistingUsers.map((item, index) => (
                        <Chip key={index}
                          disabled={createUsersIsLoading}
                          sx={{ margin: '0.2rem', color: '#fff', border: '1px solid #fff' }}
                          label={item?.email}
                          deleteIcon={<CancelIcon style={{ color: 'white' }} />}
                          onDelete={() => { handleRemoveTag(index) }}
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item sm={12} display='flex' justifyContent='end'>
                        <Button
                            onClick={bulkCreateUserHandler}
                            disabled={createUsersIsLoading}
                            className={styles.addNewBtn}
                            variant='outlined'
                            color='secondary'>
                            <Typography className={styles.btnInsideFontSize}
                              color='#fff'>Add User</Typography>
                        </Button>
                  </Grid>
              </Grid>
              <Grid item sm={2}></Grid>
          </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Divider sx={{
            backgroundColor: 'white',
            height: '0.1rem',
            width: '100%',
            marginBottom: '0.5rem'
          }} />
        </Box>
        <Grid container sm={12}>
              <Grid item sm={2}></Grid>
              <Grid item sm={8}>
              <Grid sm={12} item
                    display='flex'
                    justifyContent='start'>
               <Box display='flex' justifyContent='start'><Typography
              fontSize='1.125rem' sx={{ color: '#fff' }}>Invite new user</Typography></Box>
              </Grid>
              <Grid sm={12}
                item
                display='flex'
                justifyContent='center'
                margin='0rem 0 0rem 0'
                alignItems='center'>
                <Box display='flex' flexWrap='wrap' sx={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    id="outlined-basic"
                    placeholder='Type email and hit enter to add...'
                    variant="standard"
                    color='secondary'
                    onChange={(event) => { setClearInviteUser(event.target.value) }}
                    value={clearInviteUser}
                    InputProps={{
                      disableUnderline: true,
                      className: styles.newUserTextField
                    }}
                    onKeyDown={(ev) => {
                      const target = ev.target as HTMLInputElement
                      if (ev.key === 'Enter') {
                        setInviteUser([...inviteUser, target.value])
                        ev.preventDefault()
                        setClearInviteUser('')
                      }
                    }}
                  />
                </Box>
              </Grid>
              <Grid sm={12}
                item
                display='flex'
                justifyContent='center'>
                <Box className={styles.inviteUserChipArea}>
                  {inviteUser.map((item, index) => (
                    <Chip key={index}
                      sx={{ margin: '0.2rem', color: '#fff', border: '1px solid #fff' }}
                      label={item}
                      deleteIcon={<CancelIcon style={{ color: 'white' }} />}
                      onDelete={() => { handleRemoveInviteUser(index) }}
                    />
                  ))}
                </Box>
              </Grid>
          <Grid item sm={12} display='flex'
            justifyContent='end'>
            <Button
                onClick={() => { void handleNewUserInvite() }}
                disabled={false}
                className={styles.sendInviteBtn}
                variant='outlined'
                color='secondary'>
                <Typography className={styles.btnInsideFontSize}
                  color='#fff'>Send Invites</Typography>
            </Button>
          </Grid>
              </Grid>
              <Grid item sm={2}></Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default ULAdminUserInvite
