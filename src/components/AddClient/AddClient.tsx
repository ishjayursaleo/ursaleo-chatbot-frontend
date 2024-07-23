import { Button, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import styles from './AddClient.module.scss'

const AddClient: React.FC<{
  addClient: () => void
  handleClientName: (event: any) => void
  handleClientDescription: (event: any) => void
}> = ({
  addClient,
  handleClientName,
  handleClientDescription
}) => {
  return (
    <React.Fragment>
    <Grid container sm={12} className={styles.addNewTwinContainer}>
          <Grid item sm={2}></Grid>
          <Grid item sm={8}>
            <Grid sm={12} container
              display='flex'
              justifyContent='space-between'
              alignItems='center' marginBottom={6} gap={1}>
              <Grid
                item sm={3}
                display='flex'
                justifyContent='start'
                alignItems='end'>
                <Typography color='white' fontSize='1.25rem'>Client Name</Typography>
              </Grid>
              <Grid item sm={8}
                display='flex'
                justifyContent='end'
                alignItems='center'>
                <TextField
                  autoComplete='off'
                  id="outlined-basic"
                  placeholder='Type client name Here...'
                  variant="standard"
                  color='secondary'
                  onChange={handleClientName}
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    className: styles.textFieldStyle
                  }}
                />
              </Grid>
            </Grid>
            <Grid sm={12} container
              display='flex'
              justifyContent='space-between'
              alignItems='center' gap={1}>
              <Grid item sm={3}>
                <Typography color='white' fontSize='1.25rem'>Client Description</Typography>
              </Grid>
              <Grid item sm={8}>
                <TextField
                  autoComplete='off'
                  id="outlined-basic"
                  placeholder='Type client description Here..'
                  variant="standard"
                  color='secondary'
                  onChange={handleClientDescription}
                  fullWidth
                  InputProps={{
                    disableUnderline: true,
                    className: styles.textFieldStyle
                  }}
                />
              </Grid>
            </Grid>
            <Grid sm={12} container
              display='flex'
              justifyContent='end'
              alignItems='center'>
              <Grid
                item
                sm={12}
                margin='5rem 0 0 0'
                display='flex'
                justifyContent='end'
                alignItems='center'>
                <Button
                  onClick={addClient}
                  disabled={false}
                  className={styles.addNewBtn}
                  variant='outlined'
                  color='secondary'>
                  <Typography className={styles.btnInsideFontSize}
                    color='#fff'>Add Client</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={2}></Grid>
        </Grid>
    </React.Fragment>

  )
}

export default AddClient
