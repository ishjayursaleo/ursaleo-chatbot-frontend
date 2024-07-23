import React from 'react'
import notfound from '../../../assets/img/notfound.png'
import { Grid } from '@mui/material'
const NotFound = () => {
  return (
    <Grid container display='flex' justifyContent='center' alignItems='center' mt='10rem'>
        <img width='auto' height='700px' src={notfound} alt="Example" />
    </Grid>
  )
}

export default NotFound
