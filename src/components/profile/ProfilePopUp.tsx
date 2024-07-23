/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { type UserProfile } from '../../utils/models/userModel'
import { entitlementAction, profileActions } from '../../redux/actions'
import { triggerCustomGoogleAnalyticsEvent } from '../../utils/helpers/googleAnalytics'

import { type AppState } from '../../interfaces'

import styles from './ProfilePopUp.module.scss'

const ProfilePopUp: React.FC<{
  open: boolean
  handleSignOut: () => void
  handleEditProfile: () => void
  userRoles: string[]
  User: UserProfile | undefined
}> = ({
  open,
  handleSignOut,
  handleEditProfile,
  userRoles,
  User
}) => {
  // const userPrivilege = useSelector((state: AppState) => state.profile.profileUser)
  const userData = useSelector((state: AppState) => state.user.storeUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChangeUser = () => {
    dispatch(profileActions.openModal())
    dispatch(entitlementAction.allClientListClear())
    triggerCustomGoogleAnalyticsEvent('btn', 'navigate_admin_page', '/manage-ul-admin', userData)
    navigate('/manage-ul-admin')
  }
  const displayName = (User?.firstName && User?.lastName) ? `${User.firstName} ${User.lastName}` : User?.email

  return (
      <div>
        <Menu
          className={styles.profilePopUp}
          id="basic-menu"
          open={open}
          MenuListProps={{
            className: styles.menuListProps,
            'aria-labelledby': 'basic-button'
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <Box className={styles.usrDetails}>
            <Typography
              className={styles.usrName}
              color="#F7F7F7"
              gutterBottom
              fontFamily={'Noto Sans, Regular !important'}
            >
             {displayName}
            </Typography>
            <Typography
              className={styles.usrRole}
              color="#F7F7F7"
            >
              {
                ((userRoles.find((role: string) => role === 'ADMIN' || role === 'EDITOR')?.charAt(0).toUpperCase() ?? '') +
                (userRoles.find((role: string) => role === 'ADMIN' || role === 'EDITOR')?.slice(1).toLowerCase() ?? ''))
              }
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            { <Button
              className={styles.editProfile}
              variant="contained"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button> }
            {userRoles.some((role: string) => role === 'ADMIN' || role === 'EDITOR') && (
              <Button
                onClick={handleChangeUser}
                className={styles.adminButton}
                variant="contained"
              >
                Admin
                {/* <Typography>Admin</Typography> */}
              </Button>
            )}

            <Button
              className={styles.signoutButton}
              variant="contained"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </Box>
        </Menu>
      </div>
  )
}

export default ProfilePopUp
