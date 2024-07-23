import React from 'react'
import UnAuthorized401 from '../../../assets/img/unauthorized.png'
import { Grid } from '@mui/material'
const UnAuthorized = () => {
  return (
    <Grid container display='flex' justifyContent='center' alignItems='center' mt='10rem'>
        <img width='auto' height='700px' src={UnAuthorized401} alt="Example" />
    </Grid>
  )
}

export default UnAuthorized
