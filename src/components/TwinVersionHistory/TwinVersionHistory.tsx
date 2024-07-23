/* eslint-disable multiline-ternary */
/* eslint-disable max-len */
import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  Typography
} from '@mui/material'
import Radio from '@mui/material/Radio'
import styles from './TwinVersionHistory.module.scss'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

export const VersionHistorySkeletonRow = () => {
  return (
        <Grid item sm={12} sx={{
          display: 'flex',
          margin: 0
        }}>
              <Grid sm={8} sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: 0
              }}>
                  <Skeleton
                      variant="rectangular"
                      animation="pulse"
                      sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                      width='90%'
                      height={50} />
              </Grid>
              <Grid sm={4} sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: 0
              }}>
                  <Skeleton
                      variant="rectangular"
                      animation="pulse"
                      sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                      width='100%'
                      height={50} />
              </Grid>

        </Grid>
  )
}
const TwinVersionHistory: React.FC<{
  isVersionList: boolean
  twinVersionList?: any
  selectedValue: string | undefined
  handleChange: (event: any) => void
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void
  page: number
  deleteTwinVersion: (twinVersionId: string) => void
  handleBtnClick: () => void
}> = ({
  twinVersionList,
  selectedValue,
  handleChange,
  isVersionList,
  handleChangePage,
  page,
  deleteTwinVersion,
  handleBtnClick
}) => {
  return (
            <Box className={styles.twinVersionOuterContainer}>
                <Grid container sm={12}>
                    <Grid item sm={2}></Grid>
                    <Grid item sm={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                        <Box sx={{ marginBottom: '1rem' }}>
                           <Typography fontSize='1.125rem' color='white'>Version History</Typography>
                        </Box>
                        <Card sx={{
                          width: '100%',
                          backgroundColor: '#000',
                          minHeight: '15rem'
                        }}>
                            <Box sx={{ backgroundColor: '#202020' }}>
                                <Grid container sm={12} sx={{
                                  display: 'flex',
                                  justifyContent: 'center'
                                }}>
                                    <Grid item sm={2} className={styles.twinColumnAlignment}>
                                        <Typography
                                            id={styles.twinVersionHeaderColumnsText}
                                            gutterBottom>
                                            Version
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={3} className={styles.twinColumnAlignment}>
                                        <Typography
                                            id={styles.twinVersionHeaderColumnsText}
                                            color="secondary"
                                            gutterBottom>
                                            Update Date
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={3} className={styles.twinColumnAlignment}>
                                        <Typography
                                            id={styles.twinVersionHeaderColumnsText}
                                            color="secondary"
                                            gutterBottom>
                                            Published Date
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={2} className={styles.twinColumnAlignment}>
                                        <Typography
                                            id={styles.twinVersionHeaderColumnsText}
                                            color="secondary"
                                            gutterBottom>
                                            Active
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={2} className={styles.twinColumnAlignment}>
                                        <Typography
                                            id={styles.twinVersionHeaderColumnsText}
                                            color="secondary"
                                            gutterBottom>
                                            Remove
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                            {isVersionList
                              ? (
                                    <div>
                                        <CardContent>
                                            <Grid container sm={12} gap={1} sx={{
                                              display: 'flex',
                                              justifyContent: 'center',
                                              margin: 0
                                            }}>
                                                <VersionHistorySkeletonRow/>
                                                <VersionHistorySkeletonRow/>
                                                <VersionHistorySkeletonRow/>
                                            </Grid>
                                        </CardContent>
                                    </div>
                                ) : twinVersionList.data.length === 0 ? (
                                    <div className={styles.twinListContainer}>
                                        <CardContent className={styles.twinListCardContent}>
                                            <Grid container sm={12} sx={{
                                              display: 'flex',
                                              justifyContent: 'center',
                                              margin: 0
                                            }}>
                                                <Typography
                                                    color="secondary"
                                                    fontSize='1.5rem'>
                                                    No Data Found
                                                </Typography>
                                            </Grid>
                                        </CardContent>
                                    </div>
                                ) : twinVersionList.data.length > 0 ? (
                                    <div className={styles.twinListContainer}>
                                        <CardContent className={styles.twinListCardContent}>
                                            {twinVersionList?.data?.map((twinVersion: any, index: number) => {
                                              return <Grid key={index} container sm={12} sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                margin: 0
                                              }}>
                                                    <Grid item sm={2} className={styles.twinColumnAlignment}>
                                                        <Typography
                                                            className={styles.twinListColumnValues}
                                                            color="secondary"
                                                            gutterBottom>
                                                            {twinVersion.name}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm={3} className={styles.twinColumnAlignment}>
                                                        <Typography
                                                            color="secondary"
                                                            gutterBottom>
                                                            {new Date(twinVersion.createdAt).toLocaleDateString('en-GB')}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm={3} className={styles.twinColumnAlignment}>
                                                        <Typography
                                                            color="secondary"
                                                            gutterBottom>
                                                            {new Date(twinVersion.updatedAt).toLocaleDateString('en-GB')}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm={2} className={styles.twinColumnAlignment}>
                                                        <Radio
                                                            // defaultChecked={twinVersion.id === twinVersionDefaultId}
                                                            checked={selectedValue === twinVersion.id}
                                                            onChange={handleChange}
                                                            value={twinVersion.id}
                                                            name="radio-buttons"
                                                            className={styles.radioInputButton}
                                                        />
                                                    </Grid>
                                                    <Grid item sm={2} className={styles.twinColumnAlignment}>
                                                        <IconButton aria-label="delete"
                                                            onClick={() => { deleteTwinVersion(twinVersion.id) }}>
                                                            <DeleteOutlinedIcon
                                                                fontSize='large'
                                                                color='secondary' />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            })}
                                        </CardContent>
                                    </div>
                                ) : null}

                        </Card>
                    </Grid>
                    <Grid item sm={2}></Grid>
                </Grid>
                <Grid container sm={12}>
                    <Grid item sm={4}></Grid>
                    <Grid item xs={4} className={styles.uploadBtnContainer}>
                        <Button
                            onClick={() => { handleBtnClick() }}
                            disabled={false}
                            className={styles.manageULBtn}
                            variant='outlined'
                            color='secondary'>
                            <Typography className={styles.btnInsideFontSize}>Upload New Version</Typography>
                        </Button>
                    </Grid>
                    <Grid item sm={4}></Grid>
                </Grid>
            </Box>
  )
}

export default TwinVersionHistory
