import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import styles from './UploadNewTwinVersion.module.scss'

const UploadNewTwinVersion: React.FC<{
  handleNameValueChange: (event: any) => void
  handleDescriptionValueChange: (event: any) => void
  handleModelFileValueChange: (event: any) => void
  handleUploadBtnClick: () => void
}> = ({
  handleNameValueChange,
  handleDescriptionValueChange,
  handleModelFileValueChange,
  handleUploadBtnClick
}) => {
  return (
      <Box className={styles.uploadNewVersionContainer}>
        <Grid sm={12} container rowGap={4}>
          <Grid sm={12}
            container
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
                <Grid sm={2} item></Grid>
                <Grid sm={8} item>
                  <Grid sm={12} container justifyContent='space-between' alignItems='center'>
                    <Grid item sm={2}>
                      <Typography color='white' fontSize='1.125rem' fontWeight={400}>Name</Typography>
                    </Grid>
                    <Grid item sm={8}>
                      <TextField
                        fullWidth
                        autoComplete='off'
                        onChange={handleNameValueChange}
                        id="outlined-basic"
                        placeholder='Type name  Here...'
                        variant="standard"
                        color='secondary'
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: '#fff',
                            alignItems: 'center',
                            fontSize: '1.125rem',
                            backgroundColor: '#000',
                            padding: '0 3rem 0 1rem',
                            justifyContent: 'center',
                            borderRadius: '0.438rem',
                            height: '3.4375rem'
                          }

                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid sm={2} item></Grid>
          </Grid>
          <Grid sm={12}
            container
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
          >
              <Grid sm={2} item></Grid>
              <Grid sm={8} item>
                  <Grid sm={12} container justifyContent='space-between' alignItems='center'>
                    <Grid item sm={2}>
                      <Typography color='white' fontSize='1.125rem' fontWeight={400}>Description </Typography>
                    </Grid>
                    <Grid item sm={8}>
                      <TextField
                        fullWidth
                        autoComplete='off'
                        onChange={handleDescriptionValueChange}
                        id="outlined-basic"
                        placeholder='Type description   Here...'
                        variant="standard"
                        color='secondary'
                        InputProps={{
                          disableUnderline: true,
                          style: {
                            color: '#fff',
                            alignItems: 'center',
                            fontSize: '1.125rem',
                            backgroundColor: '#000',
                            padding: '0 3rem 0 1rem',
                            justifyContent: 'center',
                            borderRadius: '0.438rem',
                            height: '3.4375rem'
                          }
                        }}
                      />
                    </Grid>
                  </Grid>
              </Grid>
              <Grid sm={2} item></Grid>
          </Grid>
          <Grid sm={12}
            container
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
          >
              <Grid sm={2} item></Grid>
              <Grid sm={8} item>
                  <Grid sm={12} container justifyContent='space-between' alignItems='center'>
                      <Grid item sm={2}>
                        <Typography color='white' fontSize='1.125rem' fontWeight={400}>ModelFile</Typography>
                      </Grid>
                      <Grid item sm={8}>
                        <TextField
                          fullWidth
                          autoComplete='off'
                          type='file'
                          onChange={handleModelFileValueChange}
                          id="outlined-basic"
                          placeholder='Insert modelFile  Here...'
                          variant="standard"
                          color='secondary'
                          InputProps={{
                            disableUnderline: true,
                            style: {
                              color: '#fff',
                              alignItems: 'center',
                              fontSize: '1.125rem',
                              backgroundColor: '#000',
                              padding: '0 3rem 0 1rem',
                              justifyContent: 'center',
                              borderRadius: '0.438rem',
                              height: '3.4375rem'
                            }
                          }}
                        />
                      </Grid>
                  </Grid>
              </Grid>
              <Grid sm={2} item></Grid>
          </Grid>
          <Grid className={styles.uploadNewBtnContainer} sm={12}
            container
            display='flex'
            justifyContent='flex-start'
            alignItems='center'
          >
            <Grid item sm={4}></Grid>
            <Grid item sm={4} display='flex' justifyContent='center'>
               <Button
                  onClick={() => { handleUploadBtnClick() }}
                  disabled={false}
                  className={styles.addUserBtn}
                  variant='outlined'
                  color='secondary'>
                  <Typography className={styles.btnInsideFontSize}>Upload New Version</Typography>
              </Button>
            </Grid>
            <Grid item sm={4}></Grid>
          </Grid>
        </Grid>
      </Box>
  )
}

export default UploadNewTwinVersion
