/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable max-len */
import React, { useState } from 'react'
import styles from './ULAdminHomeTable.module.scss'
import { Box, Button, Card, Checkbox, Grid, IconButton, Typography } from '@mui/material'
import { AppPagination, UrsaleoButton } from '../common'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ListTableSkeletons from '../Skeltons/ListTableSkeltons/ListTableSkeltons'
import { type ClientListData } from '../../pages/ULAdminHome/ULAdminHome'
import { URSALEO_USER_ROLES } from '../../utils/constants'
import InfiniteScroll from 'react-infinite-scroll-component'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'

const ULAdminHomeTable: React.FC<{
  handleAddNewClient: () => void
  handleULAdminList: () => void
  clientList: ClientListData[]
  isIdSelected: (clientId: string) => void
  handleSelected: (clientId: string, value: boolean) => void
  handleClientAdminMenu: (clientId: string, clientName: string) => void
  fetchMoreData: any
  isAdminSelected?: boolean
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void
  page: number
  count: number
  hasMore: boolean
  deleteSelected: () => void
  totalTwinUserCounts: {
    totalTwinCount: number
    totalUserCount: number
  }
}> = ({
  handleAddNewClient,
  handleULAdminList,
  clientList,
  handleSelected,
  handleClientAdminMenu,
  handleChangePage,
  fetchMoreData,
  hasMore,
  page,
  count,
  deleteSelected,
  totalTwinUserCounts
}) => {
  const userRolesString = localStorage.getItem('userRoles')
  let isULAdmin = false
  if (userRolesString !== null) {
    const userRoles = JSON.parse(userRolesString)
    if (userRoles.includes(URSALEO_USER_ROLES.ULADMIN)) {
      isULAdmin = true
    }
  }
  return (
            <>
                <div className={styles.clientCards}>
                    <Card className={`${styles.tableHeader} ${styles.tableWrapper}`}>
                        <Grid container sm={12} display='flex' alignItems='center'>
                            <Grid item sm={1} />
                            <Grid item sm={7} display='flex' flexDirection='row' alignItems='center' gap={2}>
                                <Typography className={styles.clientNameSize}>
                                    Ursaleo
                                </Typography>
                                <Typography className={styles.clientAllTwinAndUserSize}>
                                    {totalTwinUserCounts.totalTwinCount} Twins
                                </Typography>
                                <Typography className={styles.clientAllTwinAndUserSize}>
                                    {totalTwinUserCounts.totalUserCount} Users
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>
                    <React.Fragment>
                        {clientList.length > 0
                          ? (
                            <div id="scrollableDiv" className={`${styles.infiniteScrollContainer} ${styles.innerRow}`} style={{ height: '29rem', overflow: 'auto' }}>
                                <InfiniteScroll
                                dataLength={clientList.length}
                                scrollableTarget="scrollableDiv"
                                next={fetchMoreData}
                                hasMore={false}
                                loader={<h4>Loading...</h4>}
                              >
                                  {clientList.map((client) => (
                                    <Card key={client.clientId} className={styles.tableHeader}>
                                    <Grid container sm={12} display='flex' alignItems='center'>
                                        <Grid item sm={1}>
                                            {isULAdmin &&
                                                <Checkbox
                                                    className={client.isSelected ? styles.checkboxChecked : styles.checkbox}
                                                    checkedIcon={<DoneOutlinedIcon className={styles.iconWithBorder}/>}
                                                    value={client.isSelected}
                                                    onChange={() => {
                                                      handleSelected(client.clientId, !(client.isSelected))
                                                    }} color="default"
                                                />
                                            }
                                        </Grid>
                                        <Grid item sm={8 + 3 / 4}
                                            display='flex'
                                            flexDirection='row'
                                            alignItems='center'
                                            gap={2}>
                                            <Typography className={styles.clientNameSize}>
                                                {client.clientName}
                                            </Typography>
                                            <Typography className={styles.clientAllTwinAndUserSize}
                                                color="text.secondary">
                                                {client?.twinCount} Twins
                                            </Typography>
                                            <Typography className={styles.clientAllTwinAndUserSize}
                                                color="text.secondary">
                                                {client?.userCount} Users
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={2} sx={{
                                          display: 'flex',
                                          justifyContent: 'end',
                                          alignItems: 'center'
                                        }}>
                                            <div onClick={() => { handleClientAdminMenu(client.clientId, client.clientName) }}>
                                                <IconButton>
                                                    <ArrowForwardIosIcon style={{ width: '2.5vw', color: '#FFFFFF' }}
                                                        color='secondary'
                                                        fontSize='large' />
                                                </IconButton>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Card>
                                  ))}
                              </InfiniteScroll>
                            </div>
                            )
                          : (
                                <ListTableSkeletons />
                            )}
                    </React.Fragment>

                </div>
                <div className={styles.ulModelButtonWrapper}>
                    {isULAdmin &&
                        <>
                            <Button
                                onClick={deleteSelected}
                                disabled={!clientList.some(admin => admin.isSelected)}
                                className={styles.deleteBtn}
                                variant='outlined'
                                color='secondary'>
                                <Typography className={styles.deleteBtnInsideFontSize}
                                    color={!clientList.some(admin => admin.isSelected) ? 'gray' : '#fff'}>Delete Selected</Typography>
                            </Button>
                            <Button
                                onClick={handleAddNewClient}
                                disabled={false}
                                className={styles.addNewBtn}
                                variant='outlined'
                                color='secondary'>
                                <Typography className={styles.btnInsideFontSize}>Add New Client</Typography>
                            </Button>
                            <Button
                                onClick={handleULAdminList}
                                disabled={false}
                                className={styles.manageULBtn}
                                variant='outlined'
                                color='secondary'>
                                <Typography className={styles.btnInsideFontSize}>Manage UL Admin</Typography>
                            </Button>
                        </>
                    }
                </div>
            </>
  )
}

export default ULAdminHomeTable
