import React from 'react'
import styles from './WarningModal.module.scss'
import { Box, Grid, Modal, Typography } from '@mui/material'
import UrsaleoButton from '../UrsaleoButton/UrsaleoButton'

const WarningModal: React.FC<{
  handleClose: () => void
  handleConfirm: () => void
  open: boolean
  headerText?: string
  textContent?: string
  confirmText?: string
  cancelText?: string
  contentLayout?: React.ReactNode
}> = ({
  handleConfirm,
  handleClose,
  open,
  headerText,
  contentLayout,
  confirmText,
  cancelText,
  textContent
}) => {
  return (
      <div>
        <Modal
          open={open}
          onClose={() => { }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className={styles.modalBox}>
            <Grid container sm={12}>

            <Box sx={{ width: '100%' }}>
              <React.Fragment>
                 <div>
                  <Typography className={styles.modalTitle} id="modal-modal-title">
                    {headerText}
                  </Typography>
                </div>
              </React.Fragment>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography className={styles.modalText}>{textContent}</Typography>
              <div className={styles.buttonContainer}>
                <UrsaleoButton
                buttonTitle={cancelText ?? 'Close'}
                width='6rem'
                borderRadius='0.875rem'
                buttonAction={handleClose}
                height='3.5rem'
                color='secondary'
                disabled={false}
                variant='outlined'
                textFontSize='1.25rem'
                />
                <UrsaleoButton
                buttonTitle={confirmText ?? 'Confirm'}
                width='6.5rem'
                borderRadius='0.875rem'
                buttonAction={handleConfirm}
                height='3.5rem'
                color='secondary'
                disabled={false}
                variant='outlined'
                textFontSize='1.25rem'
                />
              </div>
            </Box>
            </Grid>
          </div>
        </Modal>
      </div>
  )
}

export default WarningModal
