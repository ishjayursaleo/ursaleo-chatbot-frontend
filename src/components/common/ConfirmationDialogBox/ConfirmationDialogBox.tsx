import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button
} from '@mui/material'
import styles from './ConfirmationDialogBox.module.scss'

const ConfirmationDialogBox: React.FC<{
  openConfirmation: boolean
  confirmationText: string
  handleConfirmationClose: (agreed: boolean) => void
  handleConfirmationBoxClose: () => void
}> = ({
  openConfirmation,
  handleConfirmationClose,
  handleConfirmationBoxClose,
  confirmationText
}) => {
  return (
    <Dialog
      open={openConfirmation}
      onClose={handleConfirmationBoxClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: styles.deleteDialog }}
    >
      <DialogContent className={styles.deleteDialogContent}>
        <DialogContentText className={styles.deleteDialogContent} id="alert-dialog-description">
          {confirmationText}
        </DialogContentText>
      </DialogContent>
      <DialogActions className={styles.deleteDialogContent}>
        <Button onClick={handleConfirmationBoxClose} className={styles.deleteDialogBtn}>
          Cancel
        </Button>
        <Button onClick={() => { handleConfirmationClose(true) }} className={styles.deleteDialogBtn} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialogBox
