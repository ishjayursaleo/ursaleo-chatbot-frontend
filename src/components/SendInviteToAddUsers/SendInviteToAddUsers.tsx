/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/jsx-key */
import React from 'react'
import styles from './SendInviteToAddUsers.module.scss'
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { UrsaleoButton } from '../common'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const SendInviteToAddUsers: React.FC<{
  handleAutocompleteChange: (event: any, value: any) => void
  userList: any
  clientTwins: any
  renderTags: (value: any, getTagProps: any) => React.ReactNode
  renderTagEmail: (value: any, getTagProps: any) => React.ReactNode
  tagStyles?: any
  selectedEmails: any[]
  handleSendInvite: () => void
  handleUserLevelChange: (event: any, value: any) => void
  handleClientTwinsChange: (event: any, value: any) => void
  selectedOptions: any[]
}> = ({
  handleAutocompleteChange,
  userList,
  clientTwins,
  renderTags,
  renderTagEmail,
  selectedEmails,
  handleSendInvite,
  handleUserLevelChange,
  handleClientTwinsChange,
  selectedOptions
}) => {
  const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
  const checkedIcon = <CheckBoxIcon fontSize='small' />
  return (
    <div className={styles.clientCards}>
                  <Grid sm={12} container>
                    <Grid item sm={1}></Grid>
                    <Grid item sm={10}>
                    <Autocomplete className={styles.outerAutoComplete}
                      sx={{
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          border: 'none'
                        }
                      }}
                      popupIcon={<ExpandMoreIcon />}
                      clearIcon={false}
                      options={[]}
                      value={selectedEmails}
                      freeSolo
                      multiple
                      onChange={handleAutocompleteChange}
                      renderTags={renderTagEmail}
                      renderInput={(params) => <TextField
                        color='secondary' {...params}
                        placeholder={selectedEmails.length > 0 ? '' : 'Type email and hit enter to add'}
                        className={styles.inputFieldStyle}
                        sx={{
                          'MuiInputBase-root-MuiOutlinedInput-root': {
                            alignItems: 'flex-start'
                          },
                          '& .MuiInputBase-input': {
                            '&::placeholder': {
                              fontSize: '1rem'
                            },
                            color: 'white',
                            fontSize: '18px',
                            textAlign: 'start',
                            justifyContent: 'center'
                          },
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '1.5rem'
                          },
                          '& .MuiChip-root': {
                            borderRadius: '6px !important',
                            borderColor: 'transparent'
                          },
                          '& .MuiChip-deleteIcon': {
                            color: 'white !important',
                            '&:hover': {
                              color: 'white !important'
                            }
                          }
                        }}
                        />}
                    />
                    </Grid>
                    <Grid item sm={1}></Grid>
                  </Grid>
                  <Grid sm={12} container>
                      <Grid item sm={1}></Grid>
                      <Grid item sm={10}>
                        <Grid sm={12} container className={styles.levelAccessContainer}>
                            <Grid
                            item sm={5}
                            sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}
                            gap={2}>
                              <Typography
                                className={styles.userLevel}>
                                User Level
                              </Typography>

                              <Autocomplete
                              popupIcon={<ExpandMoreIcon />}
                                disablePortal
                                id="combo-box-demo"
                                options={userList}
                                className={styles.userLevelAutoComplete}
                                onChange={handleUserLevelChange}
                                // style={{ width: '10rem' }}
                                PaperComponent={({ children }) => (
                                  <ul
                                  className={styles.dropdownOption}
                                  >
                                    {children}
                                  </ul>
                                )}
                                renderOption={(props, option: any) => (
                                  <li {...props} style={{ fontSize: '1rem' }}>
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
                                  }
                                }}/>}
                              />
                            </Grid>
                            <Grid item sm={7}
                            sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
                            gap={2}>
                            <Typography
                                sx={{ fontSize: '1.125rem', color: '#fff' }}
                                color="text.secondary"
                                gutterBottom>
                                Twin Access
                              </Typography>
                              <Autocomplete
                                popupIcon={<ExpandMoreIcon />}
                                multiple
                                limitTags={1}
                                disableClearable
                                sx={{
                                  '& .MuiInputBase-input': {
                                    color: 'white', // Set text color
                                    fontSize: '1rem',
                                    textAlign: 'start'
                                  },
                                  '& .MuiChip-label': {
                                    fontSize: '1rem',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    width: '10rem', // Set your desired fixed width
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
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
                                    alignItems: 'center'
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
                                value={selectedOptions}
                                id="checkboxes-tags-demo"
                                options={[{ name: 'Select All' }, ...clientTwins]}
                                disableCloseOnSelect
                                onChange={handleClientTwinsChange}
                                getOptionLabel={(option: any) => option.name }
                                PaperComponent={({ children }) => (
                                  <ul style={{
                                    backgroundColor: 'black',
                                    padding: 0,
                                    listStyle: 'none',
                                    color: 'white',
                                    borderRadius: '0.875rem'
                                  }}>
                                    {children}
                                  </ul>
                                )}
                                renderOption={(props, option, { selected }) => {
                                  // Special handling to determine if "Select All" should be checked
                                  let isSelected = selected
                                  if (option.name === 'Select All') {
                                    isSelected = selectedOptions.length === clientTwins.length
                                  }
                                  return (
                                    <li {...props}>
                                      <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={isSelected}
                                      />
                                      {option.name}
                                    </li>
                                  )
                                }}
                                style={{ minWidth: '13rem', width: '18rem' }}
                                renderTags={renderTags}
                                renderInput={(params) => (
                                  <TextField {...params}
                                  variant='standard'
                                  InputProps={{
                                    disableUnderline: true,
                                    ...params.InputProps,
                                    style: {
                                      color: '#fff',
                                      fontSize: '0.975rem',
                                      padding: '0.1rem 1rem 1rem 1rem',
                                      justifyContent: 'flex-start',
                                      borderRadius: '0.438rem',
                                      height: '2.5rem',
                                      overflow: 'hidden'
                                    }
                                  }}
                                  color='secondary' sx={{
                                    border: '1px solid #fff',
                                    borderRadius: '8px',
                                    color: 'white' // Set text color
                                  }}/>
                                )}
                              />
                            </Grid>
                        </Grid>
                      </Grid>
                      <Grid item sm={1}></Grid>
                  </Grid>
                  <Grid sm={12} className={styles.addEntitlementBtnContainer}>
                  <Button
                      onClick={() => { handleSendInvite() }}
                      disabled={false}
                      className={styles.manageULBtn}
                      variant='outlined'
                      color='secondary'>
                      <Typography className={styles.btnInsideFontSize}>Send Invites</Typography>
                  </Button>
                  </Grid>
                </div>
  )
}

export default SendInviteToAddUsers
