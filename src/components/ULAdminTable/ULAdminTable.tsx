/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Box, Button, Card, Checkbox, Grid, InputAdornment, Skeleton, TextField, Typography } from '@mui/material'
import React from 'react'
import styles from './ULAdminTable.module.scss'
import SearchIcon from '@mui/icons-material/Search'
import { type AdminListTableTypes } from '../../interfaces'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'

const SkeltonCard = () => {
  return (
    <Card
      sx={{
        width: '100%',
        backgroundColor: '#000',
        margin: '0rem 0rem 0.75rem 0rem'
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem',
          margin: '0rem 0.5rem'
        }}>
        <Grid container lg={12} gap={2}>
          <Grid item lg={4} sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center'
          }}>
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
              width='100%'
              height={30} />
          </Grid>
          <Grid item lg={4} sx={{
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center'
          }}>
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
              width='100%'
              height={30} />
          </Grid>
          <Grid item lg={3} sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center'
          }}>
            <Skeleton
              variant="rectangular"
              animation="pulse"
              sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
              width='100%'
              height={30} />
          </Grid>
        </Grid>
      </Box>
    </Card>
  )
}
const ULAdminTable: React.FC<{
  adminList: AdminListTableTypes[]
  addUserToList: () => void
  pageCount: number
  page: number
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void
  handleUserSearch: (e: any) => void
  handleSelected: (id: string, value: boolean) => void
  handleDeleteSelected: () => void
  isLoadingData: boolean
}> = (
  {
    adminList,
    addUserToList,
    pageCount,
    page,
    handleChangePage,
    handleUserSearch,
    handleSelected,
    handleDeleteSelected,
    isLoadingData
  }
) => {
  return (
      <Box sx={{ width: '100%' }}>
        <React.Fragment>
          <div>
            <Grid sm={12} container className={styles.ulAdminSearchBarContainer}
              display='flex'
              justifyContent='center'
              alignItems='center'
              marginTop={2}>
              <Grid sm={2} item></Grid>
              <Grid sm={8} item display='flex'
                  justifyContent='center'
                  alignItems='center'>
                <Grid sm={11}
                  display='flex'
                  justifyContent='start'
                  alignItems='center'>
                  <TextField
                    fullWidth
                    variant='standard'
                    onChange={handleUserSearch}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    id="outlined-basic"
                    placeholder='Search username...'
                    color='secondary'
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        color: '#fff',
                        fontSize: '1.125rem',
                        margin: '1rem 0 1rem 0',
                        backgroundColor: '#000',
                        border: '1px solid #fff',
                        borderRadius: '0.438rem',
                        padding: '0rem 1rem',
                        height: '3rem'
                      },
                      endAdornment: (
                        <InputAdornment position="start" sx={{ cursor: 'pointer' }}>
                          <SearchIcon sx={{ color: '#9B9B9B' }} fontSize='large' />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </Grid>
              <Grid sm={2} item></Grid>
            </Grid>
            <div className={styles.clientCards}>
              {isLoadingData
                ? (<>
                  <Box className={styles.ulAdminOuterDataCardContainer}>
                    <Grid sm={12} container>
                      <Grid sm={2} item></Grid>
                      <Grid sm={8} item>
                        <SkeltonCard />
                        <SkeltonCard />
                        <SkeltonCard />
                      </Grid>
                      <Grid sm={2} item></Grid>

                    </Grid>
                  </Box>
                </>)
                : (<>
                  {
                    adminList?.length === 0
                      ? (
                        <Box>
                          <Grid sm={12} container>
                            <Grid sm={2} item></Grid>
                            <Grid sm={8} item>
                              <Card
                                sx={{
                                  width: '100%',
                                  backgroundColor: '#000',
                                  margin: '0rem 0rem 0rem 0rem'
                                }}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '4rem',
                                    margin: '0rem 0.5rem'
                                  }}>
                                  <Typography
                                    color="secondary"
                                    fontSize='1.5rem'>
                                    No Data Found
                                  </Typography>

                                </Box>
                              </Card>
                            </Grid>
                            <Grid sm={2} item></Grid>
                          </Grid>
                        </Box>
                        )
                      : (<Box>
                        <Grid sm={12} container className={styles.ulAdminOuterDataCardContainer}>
                          <Grid sm={2} item></Grid>
                          <Grid sm={8} item className={styles.ulAdminDataCardTable}>
                            {adminList?.map((user: AdminListTableTypes) => {
                              return (
                                <Card key={user.id} className={styles.ulAdminDataCard}>
                                  <Box className={styles.ulAdminInnerDataCard}>
                                    <Grid container lg={12}>
                                      <Grid item lg={1}>
                                        <Checkbox
                                         className={user.isSelected ? styles.checkboxChecked : styles.checkbox}
                                         checkedIcon={<DoneOutlinedIcon className={styles.iconWithBorder}/>}
                                          value={user.isSelected}
                                          onChange={() => {
                                            handleSelected(user.id, !(user.isSelected))
                                          }} color="default" />
                                      </Grid>
                                      <Grid item lg={8} sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                      }}>
                                        <Grid container sm={12}>
                                          <Grid item sm={3}>
                                          </Grid>
                                          <Grid item sm={7} sx={{
                                            display: 'flex',
                                            justifyContent: 'start',
                                            alignItems: 'center'
                                          }}>
                                            <Typography sx={{
                                              fontSize: '1rem',
                                              color: '#fff'
                                            }}>
                                              {user.email}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      <Grid item lg={2} sx={{
                                        display: 'flex',
                                        justifyContent: 'end',
                                        alignItems: 'center'
                                      }}>
                                        <div>
                                          <Typography sx={{
                                            fontSize: '1rem',
                                            color: '#fff'
                                          }}
                                            color="text.secondary">
                                            {user.emailVerified ? 'Accepted' : 'Invited'}
                                          </Typography>
                                        </div>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                </Card>
                              )
                            })}
                          </Grid>
                          <Grid sm={2} item></Grid>
                        </Grid>
                      </Box>
                        )
                  }
                </>)}

              <Box className={styles.paginationContainer}>
                <Grid sm={12} container>
                  <Grid sm={2} item></Grid>
                  <Grid sm={8} item sx={{ display: 'flex', justifyContent: 'end' }}>
                    {/* <AppPagination count={pageCount} handleChangePage={handleChangePage} page={page} /> */}
                  </Grid>
                  <Grid sm={2} item></Grid>
                </Grid>
              </Box>
              <div className={styles.ulModelButtonWrapper}>
                <Grid sm={12} container>
                  <Grid sm={2} item></Grid>
                  <Grid sm={8} item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                     <Button
                      onClick={() => { handleDeleteSelected() }}
                      disabled={!adminList?.some(admin => admin.isSelected)}
                      className={styles.deleteBtn}
                      variant='outlined'
                      color='secondary'>
                       <Typography className={styles.deleteBtnInsideFontSize}
                                    color={!adminList.some(admin => admin.isSelected) ? 'gray' : '#fff'}>Delete Selected</Typography>
                    </Button>
                    <Button
                      onClick={addUserToList}
                      disabled={false}
                      className={styles.addUserBtn}
                      variant='outlined'
                      color='secondary'>
                      <Typography className={styles.btnInsideFontSize}>Add User</Typography>
                    </Button>
                  </Grid>
                  <Grid sm={2} item></Grid>
                </Grid>
              </div>
            </div>
          </div>
        </React.Fragment>
      </Box>
  )
}

export default ULAdminTable
