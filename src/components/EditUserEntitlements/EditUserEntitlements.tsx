/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React from 'react'
import {
  Box,
  Card,
  Grid,
  Typography
} from '@mui/material'
import EditCheckboxAutocomplete,
{ type SelectedOptions } from '../../components/EditCheckboxAutocomplete/EditCheckboxAutocomplete'
import { UrsaleoButton } from '../../components'
import { useParams } from 'react-router-dom'

const EditUserEntitlements: React.FC<{
  entitledTwins: any[]
  selectedTwinsFromManageTwin: any[]
  handleSelectedOptions: (selectedOption: SelectedOptions[]) => void
  selectedOptions: any[]
  handleUserEntitlementUpdate: () => void
}> = ({
  entitledTwins,
  selectedTwinsFromManageTwin,
  handleSelectedOptions,
  selectedOptions,
  handleUserEntitlementUpdate
}) => {
  const { userRole } = useParams()
  return (
      <React.Fragment>
        <Box>
          <div>
            <Grid container sm={12} sx={{ margin: '2rem 0rem' }}>
              <Grid item sm={2}>
              </Grid>
              <Grid item sm={4}>
                  <Grid sm={12} sx={{ display: 'flex', justifyContent: 'start' }}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'end'
                    }}>
                      <Typography
                        fontWeight={500}
                        color='#fff'
                        fontSize='1.5rem'>Entitled Role
                      </Typography>
                    </Box>
                  </Grid>
              </Grid>
              <Grid item sm={4} sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start'
              }}>
                <Typography
                  fontWeight={500}
                  fontSize='1.5rem'
                  color='#fff'>{userRole
                    ? userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()
                    : ''}
                </Typography>
              </Grid>
              <Grid item sm={2}></Grid>
            </Grid>

            <Grid container sm={12} sx={{ margin: '3rem 0rem' }}>
              <Grid item sm={2}>
              </Grid>
              <Grid item sm={4}>
                 <Grid sm={12} sx={{ display: 'flex', justifyContent: 'start' }}>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'end'
                    }}>
                      <Typography
                        fontWeight={500}
                        color='#fff'
                        fontSize='1.5rem'>Entitled Twins
                      </Typography>
                    </Box>
                  </Grid>
              </Grid>
              <Grid item sm={4} sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              </Grid>
              <Grid item sm={2}></Grid>
            </Grid>

            <Grid container sm={12} sx={{ margin: '3rem 0rem' }}>
              <Grid item sm={2}>
              </Grid>
              <Grid item sm={8} sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start'
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw' }}>
                  <Card sx={{
                    backgroundColor: '#000',
                    margin: '1rem 0rem',
                    padding: '1rem 1rem 1rem 1rem'
                  }}>
                    <EditCheckboxAutocomplete
                      handleSelectedOptions={handleSelectedOptions}
                      selectedTwinsFromManageTwin={selectedTwinsFromManageTwin}
                      selectedOptions={selectedOptions}
                      entitlementType='Select Twins'
                      entitlementList={entitledTwins} />

                  </Card>
                </Box>
              </Grid>
              <Grid item sm={2}>
              </Grid>
            </Grid>
          </div>
          <Grid container sm={12} sx={{ margin: '3rem 0rem' }}>
            <Grid item sm={2}>
            </Grid>
            <Grid item sm={8} sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'end'
            }}>
              <UrsaleoButton
                height='3.5rem'
                buttonTitle='Save'
                width='19.563rem'
                borderRadius='1rem'
                buttonAction={handleUserEntitlementUpdate}
                textFontSize='1.25rem'
                variant='outlined'
                color='secondary'
              />

            </Grid>
            <Grid item sm={2}>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
  )
}

export default EditUserEntitlements
