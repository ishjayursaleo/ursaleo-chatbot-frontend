import React from 'react'
import styles from './UrsaleoClient.module.scss'
import { Grid } from '@mui/material'
// import noDataFound from '../../assets/img/noDataFound.png'
import { useLocation } from 'react-router-dom'
import modelingImage from '../../assets/img/3dModeling.png'
import modelingImage2 from '../../assets/img/3dModeling2.png'

const UrsaleoClient = () => {
  const location = useLocation()
  const pathDetails = location.pathname.split('/')
  const modelID = pathDetails[pathDetails.length - 1]

  return (
    <div className={styles.container}>
      {/* <div> */}
      {/* <UrsaleoTable /> */}
      {/* </div> */}
      <Grid display='flex' justifyContent='start' alignItems='center' mt='1rem'>
        {/* <img width='auto' height='700px' src={modelID === '1' ? noDataFound : (modelID === '2' ? modelingImage : '')} alt="Example" /> */}

        {modelID === '1' ? <img width='auto' height='700px' src={modelingImage} alt="Example" /> : null}
        {modelID === '3' ? <img width='auto' height='700px' src={modelingImage2} alt="Example" /> : null}
        {/* <UrsaleoTable /> */}
      </Grid>
    </div>
  )
}

export default UrsaleoClient
