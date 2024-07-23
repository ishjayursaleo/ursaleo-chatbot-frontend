/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react'
import styles from './ManageTwins.module.scss'
import { Button, Grid, Typography, useMediaQuery } from '@mui/material'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { type AppState } from '../../interfaces'
import { ALERT_VARIANT, APP_CONFIGS } from '../../utils/constants'
import Frame from 'react-frame-component'
import { axiosPrivateAPI } from '../../services'
import { AnyARecord } from 'dns'
import { alertActions } from '../../redux/actions'
import { triggerCustomGoogleAnalyticsEvent, triggerGoogleAnalyticPageView } from '../../utils/helpers/googleAnalytics'

const ManageTwins = () => {
  const { clientId, twinId, twinVersionId } = useParams()
  const userDetails = useSelector((state: AppState) => state.entitlement.myEntitlements?.data)
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const userId = userDetails !== null && userDetails.length > 0 ? userDetails[0]?.userId : null
  const [deepLinkUrl, setDeepLinkUrl] = useState('')
  const dispatch = useDispatch()
  const { state } = useLocation()
  const isMobile = useMediaQuery('(max-width:430px)')

  /** side effect - triggering a google analytics pageview */
  useEffect(() => {
    triggerGoogleAnalyticPageView('/', 'Manage Twins', userData)
  }, [])

  const showDeepLink = () => {
    void (async () => {
      try {
        const deepLinkRes = await createDeepLink()
        setDeepLinkUrl(deepLinkRes?.deepLink)
        const url = deepLinkRes?.deepLink
        triggerCustomGoogleAnalyticsEvent('btn', 'launch_deepLink', url, userData)
        window.open(url, '_blank')
      } catch (error) {
        console.log(error)
      }
    })()
  }

  const createDeepLink = async () => {
    const payload = {
      userId,
      clientId,
      twinId,
      twinVersionId
    }
    try {
      const URL = `${APP_CONFIGS.API_BASE}/api/token/create-deep-link`
      const response: any = await axiosPrivateAPI.post(URL, payload)
      // Assuming the response contains a URL
      return response.data
    } catch (error) {
      dispatch(alertActions.triggerAlert({ message: 'Nonce token has already been created.', options: { autoHideDuration: 3000, variant: ALERT_VARIANT.WARNING } }))
      console.error('Error:', error)
    }
  }

  let mobileContent = null

  if (isMobile) {
    mobileContent = <div style={{ position: 'fixed', left: 0, width: '100vw' }}>
      <Typography noWrap align='center' fontSize='1.75rem' fontWeight={600} color='#fff'>{state.selectedClient}</Typography>
      <Typography noWrap align='center' fontSize='1.25rem' textAlign='center' fontWeight={500} color='#fff'>{state.selectedTwin}</Typography>
    </div>
  }

  return (
    <div>
    </div>
  )
}

export default ManageTwins
