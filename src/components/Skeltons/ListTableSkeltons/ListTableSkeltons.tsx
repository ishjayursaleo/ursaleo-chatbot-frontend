import React from 'react'
import styles from './ListTableSkeltons.module.scss'
import { Card, Grid, Skeleton } from '@mui/material'

const SkeltonRow = () => {
  return (
        <Card className={styles.tableHeaderSkelton}>
            <Grid container sm={12} display='flex' alignItems='center'>
                <Grid item sm={1}>
                    <Skeleton
                        variant="rectangular"
                        animation="pulse"
                        sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                        width='25%'
                        height={30} />
                </Grid>
                <Grid item sm={8 + 3 / 4}
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    gap={2}>
                    <Skeleton
                        variant="rectangular"
                        animation="pulse"
                        sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                        width='25%'
                        height={30} />
                    <Skeleton
                        variant="rectangular"
                        animation="pulse"
                        sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                        width='25%'
                        height={30} />
                    <Skeleton
                        variant="rectangular"
                        animation="pulse"
                        sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                        width='25%'
                        height={30} />
                </Grid>
                <Grid item lg={2} sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center'
                }}>
                    <Skeleton
                        variant="rectangular"
                        animation="pulse"
                        sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                        width='25%'
                        height={30} />
                </Grid>
            </Grid>
        </Card>
  )
}
const ListTableSkeletons = () => {
  return (
        <>
        <SkeltonRow/>
        <SkeltonRow/>
        <SkeltonRow/>
        </>
  )
}

export default ListTableSkeletons
