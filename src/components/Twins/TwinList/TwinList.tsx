/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable multiline-ternary */
import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import styles from './TwinList.module.scss'
import { type TwinDetails } from '../../../interfaces/twins'
import ListTableSkeletons from '../../Skeltons/ListTableSkeltons/ListTableSkeltons'
import deleteIcon from '../../../assets/img/deleteIcon.svg'
import editIcon from '../../../assets/img/editIcon.svg'

export interface TwinDetailsParams {
  twinId: string
  twinName: string
  twinVersionDefaultId?: string
}

const TwinList: React.FC<{
  page: number
  pageCount: number
  twinList: TwinDetails[]
  viewTwinDetails: ({ twinId, twinName, twinVersionDefaultId }: TwinDetailsParams) => void
  addNewTwin: () => void
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void
  deleteSelected: (twinId: string) => void
  isTwinData: boolean
  isLoading: boolean
  handleTwinEdit: (twinId: string, twinName: string) => void
}> = ({
  twinList,
  viewTwinDetails,
  addNewTwin,
  pageCount,
  handleChangePage,
  page,
  deleteSelected,
  isTwinData,
  isLoading,
  handleTwinEdit
}) => {
  return (
      <React.Fragment>
        <Grid
          container
          direction='column'
          sm={12}
        >
          <Grid item sm={11} >
            <div className={styles.twinCards}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }} className={styles.twinCardTable}>
                <Card sx={{
                  minWidth: '40rem',
                  width: '40rem',
                  height: '100%',
                  backgroundColor: '#000'
                }}>
                  <Box sx={{ backgroundColor: '#202020' }}>
                    <Grid container sm={12} sx={{
                      padding: '0.2rem 0rem 0.2rem 0rem',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <Grid item sm={4} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 300,
                            color: '#959595'
                          }}
                          color="secondary"
                          gutterBottom>
                          Twin Name
                        </Typography>
                      </Grid>
                      <Grid item sm={4} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 300,
                            color: '#959595'
                          }}
                          color="secondary"
                          gutterBottom>
                          Twin Version
                        </Typography>
                      </Grid>
                      <Grid item sm={4} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Typography
                          sx={{
                            fontSize: '14px',
                            fontWeight: 300,
                            color: '#959595'
                          }}
                          color="secondary"
                          gutterBottom>
                          Action
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box className={styles.innerRow}>
                    {isLoading
                      ? (
                        <Box className={styles.skeltonOuter}>
                          <ListTableSkeletons />
                        </Box>
                        )
                      : (
                          twinList?.length <= 0
                            ? <div className={styles.InnerDetailsMinHeightSkelton}>
                            <Typography fontSize='0.875rem' color='white' display='flex' justifyContent='center'>
                              No Data Found !!!
                            </Typography>
                          </div>
                            : (
                            <Box className={styles.InnerDetailsMinHeight}>
                              {twinList?.map((twin: TwinDetails, index: number) => {
                                return <CardContent key={twin.id} sx={{ padding: 0, margin: '0.5rem 0 0.5rem 0' }}>
                                  <Box sx={{
                                    display: 'flex',
                                    padding: '0rem'
                                  }}>

                                    <Grid container sm={12} sx={{
                                      padding: '0rem',
                                      display: 'flex',
                                      justifyContent: 'center'
                                    }}>
                                      <Grid item sm={4} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-start',
                                        justifyItems: 'center',
                                        paddingLeft: '1vw'
                                      }}>
                                        <Tooltip
                                          title={
                                            <Typography variant="body2"
                                              sx={{ maxWidth: '200px', whiteSpace: 'normal', lineHeight: '1.2' }}>
                                              {twin.name}
                                            </Typography>}>
                                          <Typography noWrap style={{ color: '#fff' }}>
                                            {twin.name}
                                          </Typography>
                                        </Tooltip>
                                      </Grid>
                                      <Grid item sm={4} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                      }}>
                                        <Typography
                                          noWrap
                                          sx={{ fontSize: '0.875rem', color: '#f2f2f2', fontWeight: 'bold' }}>
                                          {twin.defaultVersion?.name}
                                        </Typography>
                                      </Grid>
                                      <Grid item sm={4}
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          paddingLeft: '1vw'
                                        }}>
                                        <IconButton
                                          onClick={() => { handleTwinEdit(twin.id, twin.name) }}
                                          aria-label="edit"
                                        >
                                          <img
                                            src={editIcon}
                                            style={{ width: '36px', height: '33px', opacity: '0.8' }}
                                            alt="Edit Icon"
                                          />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => {
                                            deleteSelected(twin.id)
                                          }}
                                          aria-label="delete"
                                        >
                                          <img
                                            src={deleteIcon}
                                            style={{ width: '42px', height: '31px', opacity: '0.8' }}
                                            alt="Delete Icon"
                                          />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => {
                                            viewTwinDetails({
                                              twinId: twin.id,
                                              twinName: twin.name,
                                              twinVersionDefaultId: twin.defaultVersionId
                                            })
                                          }}
                                        >
                                          <ArrowForwardIosIcon
                                            style={{ width: '23px', color: '#FFFFFF', opacity: 0.8 }}
                                            color='secondary'
                                            fontSize='large' />
                                        </IconButton>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </CardContent>
                              })}
                            </Box>
                              )

                        )}
                  </Box>

                </Card>
              </Box>
            </div>
          </Grid>
          <Grid item sm={1} style={{ paddingTop: '2rem' }} display='flex' justifyContent='center'>
            <Button
              onClick={addNewTwin}
              disabled={false}
              className={styles.addNewBtn}
              variant='outlined'
              color='secondary'>
              <Typography className={styles.btnInsideFontSize}
                color='#fff'>Add New Twin</Typography>
            </Button>
          </Grid>
        </Grid>
      </React.Fragment >
  )
}

export default TwinList
