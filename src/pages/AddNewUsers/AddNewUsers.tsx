/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable object-shorthand */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  type AppState,
  type addEntitlementBulkPayload,
  type AlertMessage
} from '../../interfaces'
import { alertActions, entitlementAction } from '../../redux/actions'
import { useNavigate, useParams } from 'react-router-dom'
import SendInviteToAddUsers from '../../components/SendInviteToAddUsers/SendInviteToAddUsers'
import { ModalLayout } from '../../components'
import { Chip } from '@mui/material'
import { twinAction } from '../../redux/actions/twinActions'
import { type GetAllTwinListRequestParam } from '../../interfaces/twins'
import { ALERT_VARIANT } from '../../utils/constants'
import CloseIcon from '@mui/icons-material/Close'
import * as yup from 'yup'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'

const contactSchema = yup.object().shape({
  emails: yup.array().of(yup.string().email('Invalid email')).required('Emails are required').min(1, 'At least one email is required'),
  role: yup.string().required('Role is required'),
  twinIds: yup.array().of(yup.string()).required('Twin IDs are required').min(1, 'At least one Twin ID is required'),
  clientId: yup.string().required('Client ID is required')
})

const emailValidSchema = yup.object().shape({
  email: yup.string().email('Invalid email')
})
const AddNewUsers = () => {
  const modalOpenStatus = useSelector((state: AppState) => state.profile.openULAdminModal)
  const twinlist = useSelector((state: AppState) => state.twin.allTwinList)
  const bulkrequest = useSelector((state: AppState) => state.entitlement.addEntitlementBulk)
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { clientId } = useParams<{ clientId: string }>()
  const handleClose = () => {
    navigate('/')
  }

  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [selectedUserLevel, setSelectedUserLevel] = useState<string>('')
  // const [selectedClientTwins, setSelectedClientTwins] = useState<string[]>([])
  const [clientTwins, setClientTwins] = useState<any[]>([])

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Add New User', userData)
  }, [])

  useEffect(() => {
    if (bulkrequest.status === 'success') {
      dispatch(entitlementAction.addEntitlementBulkClear())
      navigate(-1)
    }
  }, [bulkrequest.status])

  useEffect(() => {
    if (clientId != null) {
      const parm: GetAllTwinListRequestParam = {
        clientId
      }
      dispatch(twinAction.GetallTwinList(parm))
    }
  }, [clientId, dispatch])

  useEffect(() => {
    if (twinlist.status === 'success' && twinlist.data !== null) {
      setClientTwins(twinlist.data.data)
    }
  }, [twinlist.status])
  const handleAutocompleteChange = async (event: any, value: any) => {
    const email: string = value[value.length - 1]
    if (event.code !== 'Enter') {
      if (value.length === 0) {
        setSelectedEmails([])
      } else {
        const commonValues = value.filter((option: string) => selectedEmails.includes(option))
        setSelectedEmails(commonValues)
      }
    } else {
      try {
        await emailValidSchema.validate({ email: email }).then((res) => {
          if (res.email !== undefined) {
            setSelectedEmails([...selectedEmails, res.email])
          }
        })
      } catch (error: any) {
        // Validation failed, handle the error
        const alert: AlertMessage = {
          message: `Invalid Email ${value[value.length - 1]}`,
          options: {
            variant: ALERT_VARIANT.ERROR
          }
        }
        dispatch(alertActions.triggerAlert(alert))

        // You can dispatch another alert or handle the error in a way that fits your application
      }
    }
  }
  const handleUserLevelChange = (event: any, value: any) => {
    if ((Boolean(value)) && (Boolean(value.label))) {
      setSelectedUserLevel(value.label)
    }
  }

  const handleClientTwinsChange = (event: any, value: any) => {
    if (value.find((item: any) => item.name === 'Select All')) {
      // "Select All" was selected
      if (
        selectedOptions.length === clientTwins.length ||
        selectedOptions.includes('Select All')
      ) {
        // If everything was already selected, deselect all
        setSelectedOptions([])
      } else {
        // Otherwise, select all
        setSelectedOptions(clientTwins)
      }
    } else {
      setSelectedOptions(value)
    }
  }

  const handleSendInvite = async () => {
    // google analytics event trigger
    triggerCustomGoogleAnalyticsEvent('btn', 'add_entitlement', 'add_entitlement', userData)
    const entitlementPayload: addEntitlementBulkPayload = {
      emails: selectedEmails,
      clientId: clientId,
      role: selectedUserLevel.toUpperCase(),
      twinIds: selectedOptions.map((option: any) => option.id),
      isUlAdmin: false
    }
    await contactSchema.validate(entitlementPayload).then(async (res) => {
      dispatch(entitlementAction.addEntitlementBulk(entitlementPayload))
    }).catch((err) => {
      const alert: AlertMessage = {
        message: err.errors[0],
        options: {
          variant: ALERT_VARIANT.ERROR
        }
      }
      dispatch(alertActions.triggerAlert(alert))
    })
  }

  const userList = [{ label: 'Admin', value: 1 }, { label: 'Editor', value: 2 }, { label: 'Reader', value: 3 }]

  const renderTags = (value: any, getTagProps: any) => {
    return value.map((option: any, index: number) => {
      return <Chip
       sx={{ backgroundColor: 'black', color: 'white', margin: '0.25rem', alignSelf: 'flex-start' }}
        key={index}
        label={option.name}
        {...getTagProps({ index })}
        clearIcon={null}
      />
    })
  }
  const renderTagEmail = (value: any, getTagProps: any) => {
    return selectedEmails.map((option: any, index: number) => {
      return <Chip
        key={index}
        color='secondary'
        label={option}
        deleteIcon={<CloseIcon />}
        {...getTagProps({ index })}
        sx={{
          backgroundColor: '#303030',
          color: 'black',
          border: '1px solid #fff',
          borderRadius: '6px',
          display: 'flex',
          marginRight: '4px',
          '& .MuiChip-label': {
            top: '0',
            fontSize: '18px',
            fontFamily: 'Noto Sans, Light',
            color: '#FFFFFF'
          },
          '& .MuiChip-deleteIcon': {
            color: 'gray',
            '&:hover': {
              color: 'gray'
            }
          }
        }}
      />
    })
  }
  return (
  <ModalLayout
    handleClose={handleClose}
    open={modalOpenStatus}
    activateBackArrow={true}
    headerText='Add New Users'
    isHeaderTextDisabled={false}
    routePath='Manage Users'
    contentLayout={<SendInviteToAddUsers
      clientTwins={clientTwins}
      handleAutocompleteChange={handleAutocompleteChange}
      renderTags={renderTags}
      userList={userList}
      renderTagEmail={renderTagEmail}
      selectedEmails={selectedEmails}
      handleSendInvite={handleSendInvite}
      handleUserLevelChange={handleUserLevelChange}
      handleClientTwinsChange={handleClientTwinsChange}
      selectedOptions={selectedOptions}

      />}
  />
  )
}

export default AddNewUsers
