import * as React from 'react'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { Box, Button, Card, CardContent, Divider, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import styles from './ConfirmationPopup.module.scss'

const ConfirmationPopup: React.FC<{
  isOpenConfirmationDialog: boolean
  onCallback: (con: boolean) => void
  title: string
  content: string
  confirmButtonTitle?: string
  cancelButtonTitle?: string
}> = ({
  isOpenConfirmationDialog,
  onCallback,
  title,
  content,
  confirmButtonTitle,
  cancelButtonTitle

}) => {
  return (
      <Modal
        open={isOpenConfirmationDialog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={styles.sessionDeleteOuterCard}>
          <Box sx={{ padding: '1rem' }} display='flex' justifyContent='space-between'>
            <Typography id="modal-modal-title" fontWeight={600} fontSize='1rem'>
              {title}
            </Typography>
            <IconButton
              onClick={() => { onCallback(false) }}
              aria-label="delete" size="small">
              <CloseIcon style={{ color: '#c0c0c0' }} />
            </IconButton>
          </Box>
          <Divider variant="fullWidth" />
          <CardContent sx={{ padding: '2rem 5rem' }}>
            <Box
              display='flex'
              alignItems='center'
              border={'1px solid #EEA23E'}
              padding={'2rem'}
              sx={{
                backgroundColor: '#FFF8EB'
              }}
            >
              <Typography ml='0.5rem' id="modal-modal-title" variant="body1" component="h2">
                {content}
              </Typography>
            </Box>
          </CardContent>
          <Divider variant="fullWidth" />
          <Box sx={{ padding: '1rem' }} display='flex' justifyContent='end' gap={2}>
            <Button
              onClick={() => { onCallback(false) }}
              sx={{
                textTransform: 'none'
              }}
              color='secondary'
              variant="contained">{cancelButtonTitle}</Button>
            <Button
              onClick={() => { onCallback(true) }}

              sx={{
                textTransform: 'none'
              }}
              color='primary'
              variant="contained">{confirmButtonTitle}</Button>
          </Box>

        </Card>
      </Modal>
  )
}

export default ConfirmationPopup
