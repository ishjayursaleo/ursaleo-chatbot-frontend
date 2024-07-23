import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { ERROR_MESSAGES } from '../../../utils/constants/errorMessages'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
const SomethingWentWrong: React.FC<{
  isShowDefault: boolean
  subNotification?: string
  refresh?: () => void
  height?: string
}> = ({
  height,
  isShowDefault,
  refresh,
  subNotification
}) => {
  return (
    <Grid
      container
      display='flex'
      justifyContent='center'
      alignItems='center'
      height={height !== undefined ? height : 'calc(100vh - 20rem)'}
    >
      <Box>
        <Typography variant="h1" fontWeight={600} display='flex' justifyContent='center' >
          <ErrorOutlineIcon sx={{ fontSize: '8rem' }} />
        </Typography>
        {isShowDefault &&
          <Typography variant="h5" fontWeight={600} display='flex' justifyContent='center' >
            {ERROR_MESSAGES.DEFAULT}
          </Typography>
        }
        {isShowDefault &&
          <Typography display='flex' justifyContent='center' >
            {subNotification}
          </Typography>
        }
        {!isShowDefault &&
          <Typography variant="h5" fontWeight={600} display='flex' justifyContent='center' >
            {subNotification}
          </Typography>
        }
        {refresh !== undefined &&
          <Box display='flex' justifyContent='center' mt={'1rem'}>
            <Button
                variant="outlined"
                onClick={refresh}
                color="primary"
              >
              <RefreshIcon sx={{ marginRight: '8px' }} />
              Try again
            </Button>
          </Box>
        }
      </Box>
    </Grid>
  )
}

export default SomethingWentWrong
