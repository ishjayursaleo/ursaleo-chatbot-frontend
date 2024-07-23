/* eslint-disable */
import { Avatar, Breadcrumbs, Grid, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppState, type BreadCrumb } from '../../interfaces'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import styles from './AppLayoutHeader.module.scss'
import { ProfilePopUp } from '../../components'
import { APP_ROUTES } from '../../utils/constants'
import KeyClockConfig from '../../configs/keycloak'
import { useEffect, useState } from 'react'
import { UserProfile } from '../../utils/models/userModel'
import { profileActions } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { triggerCustomGoogleAnalyticsEvent } from '../../utils/helpers/googleAnalytics'
import { useSelector } from 'react-redux'
import ursaleoLogo from '../../assets/img/ursaleoLogo.png'
import { useWebSocket } from '../../utils/helpers/useWebSocket'
import { userActions } from '../../redux/actions/userAction'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { subscriptionService } from '../../services/subscriptionService'

const AppLayoutHeader: React.FC<{
  breadCrumb: BreadCrumb[],
  isSidebarOpen: boolean
  disconnectWSHandler?: () => void
}> = ({ breadCrumb, isSidebarOpen, disconnectWSHandler }) => {
  const navigate = useNavigate()
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const [userRoles, setUserRoles] = useState<string[]>([])
  const [User, setUser] = useState<UserProfile>()
  const isMobile = useMediaQuery('(max-width:430px)')
  const { handleDisconnectClick } = useWebSocket()
  const browserRefId = localStorage.getItem('browserRefId')

  const navigateTo = (breadCrumb: BreadCrumb) => {
    switch (breadCrumb.title) {
      default:
        navigate(APP_ROUTES.ROOT)
        break
    }
  }
  const [profileOpen, setProfileOpen] = React.useState<boolean>(false)
  const location = useLocation()
  const dispatch = useDispatch()

  React.useEffect(() => {
    const isRootOrDashboard = location.pathname === '/' || location.pathname === '/dashboard'

    if (isRootOrDashboard) {
      dispatch(profileActions.openModal())
    }
  }, [location.pathname]) // This effect depends on the 'location' variable

  const handleClick = () => {
    setProfileOpen(!profileOpen)
    const userRolesString = localStorage.getItem('userRoles')
    if (userRolesString !== null) {
      setUserRoles(JSON.parse(userRolesString))
    }
  }
  const handleSignOut = async () => {
    const userId = userData?.data?.userId
    try {
      handleDisconnectClick()
      if (browserRefId != null && userId != null) {
        subscriptionService.unsubscribeAll({
          userId,
          browserRefId 
        })
      }
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      await KeyClockConfig.logout()
      triggerCustomGoogleAnalyticsEvent('btn', 'sign_out', '/', userData)

      // Perform any additional actions after logout if needed
    } catch (error) {
      // Handle errors from the logout operation
      console.error('Error during logout:', error)
      // Optionally perform error handling or display an error message
    }
  }

  const handleEditProfile = () => {
    console.log('Redirecting to Edit Profile Page')
    triggerCustomGoogleAnalyticsEvent('btn', 'edit_profile', '/', userData)
  }

  useEffect(() => {
    const userRolesString = localStorage.getItem('userRoles')
    if (userRolesString !== null) {
      setUserRoles(JSON.parse(userRolesString))
    } else {
      console.log('No userRoles found in localStorage')
    }
  }, [])

  useEffect(() => {
    if (KeyClockConfig.authenticated) {
      void KeyClockConfig.loadUserProfile().then((profile: any) => {
        const user: UserProfile = {
          id: profile.id?.toString() ?? '',
          username: profile.username ?? '',
          firstName: profile.firstName ?? '',
          lastName: profile.lastName ?? '',
          email: profile.email ?? ''
        }
        setUser(user)
        // dispatch userdata to storeUserData state which currently only use in googleAnalytics usecase
        dispatch(userActions.storeUserData(
          { userId: user?.id || '', userName: user?.username || '', email: user?.email || '' }
        ))
      })
    }
  }, [KeyClockConfig.authenticated])


  return (
    <React.Fragment>
      <div>
        <div className={styles.profileWrapper} onClick={handleClick}>
        <Avatar className={styles.avatarIcon} alt="Remy Sharp" src='/#'>
        {(User?.firstName || User?.lastName) ? (
          <span className={styles.avatarText}>
            {User?.firstName?.[0]}{User?.lastName?.[0]}
          </span>
        ) : (
          <span className={styles.avatarText}>
            <PersonOutlineIcon />
          </span>
        )}
        </Avatar>
          <div className={styles.profilePopup}>
            <ProfilePopUp
              User={User}
              userRoles={userRoles}
              handleEditProfile={handleEditProfile}
              handleSignOut={handleSignOut}
              open={profileOpen} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AppLayoutHeader
