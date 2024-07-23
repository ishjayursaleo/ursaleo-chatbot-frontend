/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'
import styles from './ManageEntitlementList.module.scss'
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Skeleton,
  TextField,
  Typography,
  Tooltip,
  Button,
  Autocomplete,
  Checkbox
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { URSALEO_USER_ROLES } from '../../utils/constants'
import deleteicon from '../../assets/img/deleteIcon.svg'
import { ConfirmationDialogBox } from '../common'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ManageEntitlementList: React.FC<{
  handleUserSearch: (e: any) => void
  isLoading: boolean
  manageUserList: any
  userRoles: string[]
  clientId: string
  editUserEntitlements: (userId: string, userRole: string, userFirstName: string, twins: any) => void
  deleteUserEntitlements: (userId: string, userRole: string, clientId: string) => void
  handleAddUserToClient: () => void
  pageCount: number
  page: number
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void
  selectedOptions: any[]
  allTwins: any[]
  handleClientTwinsChange: (index: any, value: any) => void
  renderTags: (value: any, getTagProps: any) => React.ReactNode
  updateUserEntitlements: (userId: string, userRole: string, clientId: string, twins: any) => void
  userList: any[]
}> = ({
  handleUserSearch,
  isLoading,
  manageUserList,
  userRoles,
  clientId,
  editUserEntitlements,
  deleteUserEntitlements,
  handleAddUserToClient,
  pageCount,
  page,
  handleChangePage,
  selectedOptions,
  allTwins,
  handleClientTwinsChange,
  renderTags,
  updateUserEntitlements,
  userList
}) => {
  const [open, setOpen] = useState(false)
  const [delUser, setDelUser] = useState<any>({})
  const handleClickOpen = () => {
    if (clientId !== undefined) { setOpen(true) }
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleConfirm = () => {
    deleteUserEntitlements(delUser.userId, delUser.userRole, clientId)
    setOpen(false)
  }
  const SkeltonTable = () => {
    return (
        <Card className={styles.tableHeaderSkelton}>
          <Grid container sm={12} display='flex' alignItems='center'>
            <Grid item sm={10}
              display='flex'
              flexDirection='row'
              alignItems='center'
              gap={3}>
              <Skeleton
                variant="rectangular"
                animation="pulse"
                sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                width='45%'
                height={30} />
              <Skeleton
                variant="rectangular"
                animation="pulse"
                sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                width='45%'
                height={30} />
              <Skeleton
                variant="rectangular"
                animation="pulse"
                sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                width='45%'
                height={30} />
            </Grid>
            <Grid item sm={2} sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center'
            }}>
              <Skeleton
                variant="rectangular"
                animation="pulse"
                sx={{ bgcolor: '#202020', borderRadius: '0.25rem' }}
                width='50%'
                height={30} />
            </Grid>
          </Grid>
        </Card>
    )
  }
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
  const checkedIcon = <CheckBoxIcon fontSize='small' />
  return (
      <Box sx={{ width: '100%' }}>
        <React.Fragment>
          <div>
            <Grid container sm={12}>
              <Grid item xs={12} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <TextField
                  onChange={handleUserSearch}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  id="outlined-basic"
                  placeholder='Search Users'
                  variant="standard"
                  color='secondary'
                  sx={{
                    '& .MuiOutlinedInput-root.Mui-focused': {
                      borderColor: 'transparent'
                    }
                  }}
                  InputProps={{
                    disableUnderline: true,
                    className: styles.userSearchTextFelid,
                    endAdornment: (
                      <InputAdornment position="start" sx={{ cursor: 'pointer' }}>
                        <SearchIcon sx={{ color: '#9B9B9B' }} />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <div className={styles.clientCards}>
              <Box className={styles.clientCardTable}>
                <Card sx={{
                  minWidth: '52.063rem',
                  width: '52.063rem',
                  backgroundColor: '#000'
                }}>
                  <Box sx={{ backgroundColor: '#202020' }}>
                    <Grid container sm={12} sx={{
                      padding: '0.2rem 0rem 0.2rem 0rem',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <Grid item sm={3} sx={{
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
                          Member ID
                        </Typography>
                      </Grid>
                      <Grid item sm={2} sx={{
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
                          User Level
                        </Typography>
                      </Grid>
                      <Grid item sm={5} sx={{
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
                          Twin Access
                        </Typography>
                      </Grid>
                      <Grid item sm={2} sx={{
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
                          <SkeltonTable />
                          <SkeltonTable />
                          <SkeltonTable />
                        </Box>
                        )
                      : (
                          manageUserList?.length <= 0
                            ? <div className={styles.InnerDetailsMinHeightSkelton}>
                            <Typography fontSize='0.875rem' color='white' display='flex' justifyContent='center'>
                              No Data Found !!!
                            </Typography>
                          </div>
                            : (
                            <Box className={styles.InnerDetailsMinHeight}>
                              {manageUserList?.map((user: any, index: number) => {
                                return <CardContent key={index} sx={{ padding: 0, margin: '0.5rem 0 0.5rem 0' }}>
                                  <Box sx={{
                                    display: 'flex',
                                    padding: '0rem'
                                  }}>

                                    <Grid container sm={12} sx={{
                                      padding: '0rem',
                                      display: 'flex',
                                      justifyContent: 'center'
                                    }}>
                                      <Grid item sm={3} sx={{
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
                                              {user.userEmail}
                                            </Typography>}>
                                          <Typography className={styles.emailToolTip}>
                                            {user.userEmail}
                                          </Typography>
                                        </Tooltip>
                                      </Grid>
                                      <Grid item sm={2} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                      }}>
                                        {/* <Typography
                                          sx={{ fontSize: '0.875rem', color: '#f2f2f2', fontWeight: 'bold' }}>
                                          {user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1).toLowerCase()}
                                        </Typography> */}
                                        <Autocomplete
                                          popupIcon={<ExpandMoreIcon />}
                                            disablePortal
                                            id="combo-box-demo"
                                            options={userList}
                                            className={styles.userLevelAutoComplete}
                                            value={user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1).toLowerCase()}
                                            onChange={(event, reason) => { updateUserEntitlements(user.userId, selectedOptions[index], clientId, user.userRole) }}
                                            PaperComponent={({ children }) => (
                                              <ul
                                              className={styles.dropdownOption}
                                              style={{
                                                backgroundColor: 'black',
                                                padding: 0,
                                                listStyle: 'none',
                                                color: 'white',
                                                borderRadius: '5px',
                                                border: '1px solid #fff'
                                              }}
                                              >
                                                {children}
                                              </ul>
                                            )}
                                            renderOption={(props, option: any) => (
                                              <li {...props} style={{ fontSize: '1rem', color: 'white' }}>
                                                {option.label}
                                              </li>
                                            )}
                                            renderInput={(params) => <TextField {...params}
                                            InputProps={{
                                              disableUnderline: true,
                                              ...params.InputProps,
                                              className: styles.userLevelOption
                                            }}
                                            color='secondary'
                                            variant='standard'
                                            sx={{
                                              border: '1px solid #fff',
                                              borderRadius: '0.5rem',
                                              '& .MuiAutocomplete-popupIndicator': {
                                                color: 'white'
                                              },
                                              '& .MuiInput-input': {
                                                padding: '4px 4px 4px 10px !important',
                                                color: 'white !important',
                                                height: '30px'
                                              }
                                            }}/>}
                                          />
                                      </Grid>
                                      <Grid item sm={5} sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                      }}>
                                        {/* <CheckboxAutocomplete
                                          optionList={user.twins} /> */}
                                        <Autocomplete
                                          popupIcon={<ExpandMoreIcon />}
                                          multiple
                                          limitTags={1}
                                          disableClearable
                                          sx={{
                                            height: '50px !important',
                                            width: '185px !important',
                                            '& .MuiInput-root': {
                                              overflow: 'hidden'
                                            },
                                            '& .MuiAutocomplete-input': {
                                              color: '#FFFFFF !important'
                                            },
                                            '& .MuiInputBase-input': {
                                              color: 'white', // Set text color
                                              fontSize: '1rem',
                                              textAlign: 'start'
                                            },
                                            '& .MuiChip-label': {
                                              fontSize: '1rem',
                                              color: 'white',
                                              fontWeight: 'bold',
                                              whiteSpace: 'nowrap',
                                              overflow: 'hidden',
                                              textOverflow: 'ellipsis',
                                              width: '120px'
                                            },
                                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                              border: 'none'
                                            },
                                            '& .MuiAutocomplete-tag': {
                                              color: 'white',
                                              fontSize: '0.975rem',
                                              borderRadius: '1rem',
                                              backgroundColor: 'transparent',
                                              display: 'flex',
                                              alignItems: 'center',
                                              width: '150px'
                                            },
                                            '& .MuiChip-deleteIcon': {
                                              fill: 'transparent',
                                              '&:hover': {
                                                fill: 'white',
                                                color: 'white'
                                              }
                                            },
                                            '& .MuiAutocomplete-popupIndicator': {
                                              color: 'white', // Set dropdown icon color
                                              borderRadius: '0.875rem'
                                            }
                                          }}
                                          value={selectedOptions?.length ? selectedOptions[index] : []}
                                          id="checkboxes-tags-demo"
                                          options={[
                                            { label: 'Select All', value: 'Select All' },
                                            ...(Array.isArray(allTwins) ? allTwins : [])
                                          ]}
                                          disableCloseOnSelect
                                          onChange={(event, value) => { handleClientTwinsChange(index, value) }}
                                          getOptionLabel={(option: any) => option.value }
                                          PaperComponent={({ children }) => (
                                            <ul style={{
                                              backgroundColor: 'black',
                                              padding: 0,
                                              listStyle: 'none',
                                              color: 'white',
                                              borderRadius: '5px',
                                              border: '1px solid #fff'
                                            }}>
                                              {children}
                                            </ul>
                                          )}
                                          renderOption={(props, option, { selected }) => {
                                            // Special handling to determine if "Select All" should be checked
                                            let isSelected = selected
                                            if (option.label === 'Select All') {
                                              isSelected = selectedOptions[index].length === allTwins.length
                                            } else {
                                              isSelected = selectedOptions[index].some((selectedOption: any) => selectedOption.value === option.value)
                                            }
                                            return (
                                              <li {...props}>
                                                <Checkbox
                                                  icon={icon}
                                                  checkedIcon={checkedIcon}
                                                  style={{ marginRight: 8 }}
                                                  checked={isSelected}
                                                />
                                                {option.label}
                                              </li>
                                            )
                                          }}
                                          onClose={(event, reason) => { updateUserEntitlements(user.userId, selectedOptions[index], clientId, user.userRole) }}
                                          style={{ minWidth: '13rem', width: '18rem' }}
                                          renderTags={renderTags}
                                          renderInput={(params) => (
                                            <TextField {...params}
                                            variant='standard'
                                            InputProps={{
                                              disableUnderline: true,
                                              ...params.InputProps,
                                              className: styles.twinLevelOption
                                            }}
                                            color='secondary' sx={{
                                              border: '1px solid #fff',
                                              borderRadius: '8px',
                                              color: 'white' // Set text color
                                            }}/>
                                          )}
                                        />
                                      </Grid>
                                      <Grid item sm={2}
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                          paddingLeft: '1vw'
                                        }}>
                                        <IconButton
                                              disabled={user.disableButtons}
                                              onClick={() => {
                                                setDelUser(user)
                                                handleClickOpen()
                                              }}
                                              aria-label="delete">
                                                  <img src={deleteicon} style={{ width: '42px', height: '31px', opacity: '0.8' }} alt="Delete Icon" />
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
                {/* <Box className={styles.tablePagination}>
                  <AppPagination count={pageCount} handleChangePage={handleChangePage} page={page} />
                </Box> */}
              </Box>
            </div>
            <ConfirmationDialogBox
              confirmationText={` Do you want to remove ${delUser.userEmail as string}?`}
              handleConfirmationBoxClose={handleClose}
              handleConfirmationClose={handleConfirm}
              openConfirmation={open}
            />
            {userRoles.some((role: string) => role === URSALEO_USER_ROLES.ULADMIN || role === URSALEO_USER_ROLES.ADMIN) && (
              <Grid container sm={12} sx={{ padding: '0 1rem 0 1rem' }}>
                <Grid item xs={12} sx={{
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center'
                }}>
                  <Button
                    onClick={handleAddUserToClient}
                    disabled={false}
                    className={styles.addNewEntitlement}
                    variant='outlined'
                    color='secondary'>
                    <Typography className={styles.btnInsideFontSize}>Add New Users</Typography>
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>
        </React.Fragment>
      </Box>

  )
}

export default ManageEntitlementList
