import React from 'react'
import styles from './ModalLayout.module.scss'
import { Box, Grid, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate } from 'react-router-dom'

const ModalLayout: React.FC<{
  isFixedModal?: boolean
  handleClose: () => void
  open: boolean
  headerText?: string
  contentLayout?: React.ReactNode
  activateBackArrow?: boolean
  routePath?: string
  isHeaderTextDisabled?: boolean
  roleFromLoggedUser?: string
  customCleanup?: any
}> = ({
  isFixedModal,
  handleClose,
  open,
  headerText,
  contentLayout,
  activateBackArrow,
  routePath,
  isHeaderTextDisabled,
  roleFromLoggedUser,
  customCleanup
}) => {
  const navigate = useNavigate()
  const handleBackClick = () => {
    if (customCleanup != null) customCleanup()
    navigate(-1)
  }

  return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{ backgroundColor: isFixedModal === true ? 'black' : '' }}
        >
          <div className={styles.modalBox}>
            {isFixedModal !== true &&
              <>
                <Grid container sm={12}>
                  <Grid item xs={1 / 4}>
                    <div className={styles.closeIcon} onClick={handleClose}>
                      <CloseIcon fontSize='large' style={{ color: '#c0c0c0' }} />
                    </div>
                  </Grid>
                </Grid>
                <Box sx={{ width: '100%' }}>
                  <React.Fragment>
                    {(activateBackArrow === false && isHeaderTextDisabled === false) && <div>
                      <Typography className={styles.modalTitle} id="modal-modal-title">
                        {headerText}
                      </Typography>
                    </div>}

                    {(activateBackArrow === true) &&
                      <>
                        <Grid container sm={12} sx={{ display: 'flex', alignItems: 'start' }}>
                          <Grid item sm={3} sx={{
                            display: 'flex',
                            justifyContent: 'end'
                          }}>
                            <Grid container sm={12}>
                              <Grid sm={6} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                <IconButton
                                  aria-label="go-back"
                                  onClick={handleBackClick}>
                                  <ArrowBackIosIcon color='secondary' fontSize='large' className={styles.backIcon} />
                                </IconButton>
                              </Grid>
                              <Grid sm={6} sx={{
                                display: 'flex',
                                justifyContent: 'start',
                                alignItems: 'center'
                              }}>
                                <Typography fontFamily='Noto Sans, Light' fontSize='18px' fontWeight={300} color='#F2F2F2' marginLeft={'-15px !important'}>{routePath}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item sm={6} sx={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                          }}>
                            <Box sx={{
                              display: 'flex',
                              flexDirection: 'column'
                            }}>
                              <>
                              <Typography fontSize='28px' color='#F7F7F7' lineHeight={'26px'} fontFamily={'Noto Sans, SemiBold'}>{headerText}</Typography>
                                {roleFromLoggedUser !== undefined &&
                                <Typography
                                fontSize='20px'
                                textAlign='center'
                                lineHeight={'26px'}
                                fontFamily={'Noto Sans, Regular'}
                                marginTop={'22px'}
                                color='#F2F2F2'>Admin
                                </Typography>}
                              </>
                            </Box>
                          </Grid>
                          <Grid item sm={3}></Grid>
                        </Grid>
                      </>
                    }
                  </React.Fragment>
                </Box>
              </>
            }
            <Box style={{ height: '100%' }}>
              {contentLayout}
            </Box>
          </div>
        </Modal>
      </div>
  )
}

export default ModalLayout
