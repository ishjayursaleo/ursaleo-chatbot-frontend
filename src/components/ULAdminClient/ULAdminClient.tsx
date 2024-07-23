import React from 'react'
import styles from './ULAdminClient.module.scss'
import { Box, Button, Typography } from '@mui/material'
import { URSALEO_USER_ROLES } from '../../utils/constants'

const ULAdminClient: React.FC<{
  manageUserEntitlements: () => void
  manageClientTwins: () => void
  manageConfigurations: () => void
}> = ({
  manageUserEntitlements,
  manageClientTwins,
  manageConfigurations
}) => {
  const userRoles: string[] = JSON.parse(localStorage.getItem('userRoles') as string)
  return (
    <Box className={styles.adminMenuContainer}>
        {(userRoles
          ?.some((role: string) => role === URSALEO_USER_ROLES.ULADMIN || role === URSALEO_USER_ROLES.ADMIN)) &&
        <Button
            onClick={manageUserEntitlements}
            disabled={false}
            className={styles.userLevelButton}
            variant='outlined'
            color='secondary'>
            <Typography className={styles.btnInsideFontSize}>Manage Users</Typography>
          </Button>}
          <Button
            onClick={manageClientTwins}
            disabled={false}
            className={styles.userLevelButton}
            variant='outlined'
            color='secondary'>
            <Typography className={styles.btnInsideFontSize}>Manage Twins</Typography>
          </Button>
          <Button
            onClick={manageConfigurations}
            disabled={false}
            className={styles.userLevelButton}
            variant='outlined'
            color='secondary'>
            <Typography className={styles.btnInsideFontSize}>Manage Configurations</Typography>
          </Button>
      </Box>
  )
}

export default ULAdminClient
