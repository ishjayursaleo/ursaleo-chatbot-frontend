/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react'
import AppLayoutHeader from '../AppLayoutHeader/AppLayoutHeader'
import { type AppState, type BreadCrumb } from '../../interfaces'
import { CssBaseline } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { entitlementAction } from '../../redux/actions'
import SideBar from '../SideBar/SideBar'
import KeyClockConfig from '../../configs/keycloak'
import { getAccessToken } from '../../services/index'

const AppLayout: React.FC<{
  children?: React.ReactNode
  breadCrumb: BreadCrumb[]
}> = ({ breadCrumb, children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    initializeKeyClock()
  }, [])

  function initializeKeyClock () {
    const redirectUri = window.location.origin + window.location.pathname
    // Initialize KeyClock only if necessary
    if (!(KeyClockConfig.authenticated ?? false)) {
      KeyClockConfig.init({
        checkLoginIframe: false,
        onLoad: 'login-required',
        redirectUri,
        pkceMethod: 'S256'
      }).then((auth: any) => {
        if (auth === null) {
          window.location.reload()
        } else {
          handleAuthentication()
        }
      }).catch((error: any) => {
        console.error('Authentication Failed', error)
      })
    } else {
      handleAuthentication()
    }
  }

  // handle sign out when the session is closed by another instance.
  useEffect(() => {
    const handleVisibilityChange = () => {
      void (async () => {
        if (document.visibilityState === 'visible') {
          const accessToken = getAccessToken()
          if (accessToken == null) {
            await KeyClockConfig.logout({
              redirectUri: window.location.origin
            })
          }
        }
      })()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  function handleAuthentication () {
    if (KeyClockConfig.token != null && KeyClockConfig.refreshToken != null) {
      localStorage.setItem('access_token', KeyClockConfig.token)
      localStorage.setItem('refresh_token', KeyClockConfig.refreshToken)
    }
    KeyClockConfig.onTokenExpired = () => {
      console.log('On token expired')
      KeyClockConfig.updateToken()
        .then((refreshed: any) => {
          if (Boolean(refreshed) && KeyClockConfig.token != null && KeyClockConfig.refreshToken != null) {
            localStorage.setItem('access_token', KeyClockConfig.token)
          } else {
            console.log('Token is still valid so can be used')
            // void KeyClockConfig.logout()
          }
        })
        .catch((error: any) => {
          console.error('Token refresh error', error)
          void KeyClockConfig.logout()
        })
    }
    // Schedule token refresh every 29.67 minutes (1780000 milliseconds)
    setInterval(() => {
      console.log('interval')
      KeyClockConfig.updateToken()
        .then((refreshed: any) => {
          if (Boolean(refreshed) && KeyClockConfig.token != null && KeyClockConfig.refreshToken != null) {
            localStorage.setItem('access_token', KeyClockConfig.token)
          } else {
            // void KeyClockConfig.logout()
            console.log('Still the token is Valid')
          }
        }).catch((error: any) => {
          console.log('Token refresh error', error)
          void KeyClockConfig.logout()
        })
    }, 28692000)
  }

  const accessTokenFromBrowser = localStorage.getItem('access_token')

  /** global state selectors */
  const selectAppState = (state: AppState) => ({
    userType: state.profile.profileUser,
    userData: state.user.storeUser,
    myEntitlementList: state.entitlement.myEntitlements,
    allClientList: state.entitlement.allClientList,
    AllTwinListByClientID: state.twin.allTwinList.data
  })

  const { userData, myEntitlementList } = useSelector(selectAppState)

  const [open, setOpen] = useState(false)

  /*
  side bar client list API
  */
  useEffect(() => {
    if (accessTokenFromBrowser !== null) {
      dispatch(entitlementAction.myEntitlementList())
    }
    /*
    In Key clock side to set the token and take very microseconds so need call the entitlement list
    */
    setTimeout(() => {
      dispatch(entitlementAction.myEntitlementList())
    }, 2000)
  }, [accessTokenFromBrowser])

  const memoizedSideBar = useMemo(() => (
    <SideBar
      open={open}
      setOpen={setOpen}
      userData={userData}
      myEntitlementList={myEntitlementList}
    />
  ), [open, setOpen, userData, myEntitlementList])

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={'layout-row authorizedContainer'}>
        {/* sideBar component */}
        <AppLayoutHeader isSidebarOpen={!open} breadCrumb={breadCrumb} />
        {memoizedSideBar}
        <aside className={'content'} style={{ backgroundColor: '#000' }}>
          {/* <aside className="content2">
            <AppLayoutHeader isSidebarOpen={!open} breadCrumb={breadCrumb} />
          </aside> */}
          <aside className='content3'>{children}</aside>
        </aside>
      </div>
    </React.Fragment>
  )
}

export default AppLayout
