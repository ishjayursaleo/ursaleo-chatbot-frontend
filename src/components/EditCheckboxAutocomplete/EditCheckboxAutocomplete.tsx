/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Box, Chip } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export interface SelectedOptions {
  label: string
  value: string
  isSelected: boolean
}
const EditCheckboxAutocomplete: React.FC<{
  entitlementList: any[]
  entitlementType: string
  selectedTwinsFromManageTwin: string[]
  handleSelectedOptions: (selectedOption: SelectedOptions[]) => void
  selectedOptions: any[]
}> = ({
  entitlementList,
  entitlementType,
  selectedTwinsFromManageTwin,
  handleSelectedOptions,
  selectedOptions
}) => {
  const renderOption = (props: any, option: any, { selected }: any) => {
    return (
        <li {...props}>
          <Checkbox style={{ marginRight: 8 }} checked={option.isSelected} onClick={() => { handleOnClick(option.value) }} />
          {option.label}
        </li>
    )
  }

  const handleOnClick = (value: string) => {
    // setSelectedOptions()

    handleSelectedOptions(selectedOptions.map((option: any) => {
      return {
        ...option,
        isSelected: option.value === value ? !option.isSelected : option.isSelected
      }
    }))
  }
  const handleDelete = (chipToDelete: any) => () => {
    handleSelectedOptions(
      selectedOptions.map((option: any) => {
        return {
          ...option,
          isSelected: option.value === chipToDelete ? false : option.isSelected
        }
      })
    )
  }

  useEffect(() => {
    handleSelectedOptions(entitlementList.map((entitlement: any) => {
      return {
        label: entitlement.label,
        value: entitlement.value,
        isSelected: selectedTwinsFromManageTwin.some((twinId: string) => twinId === entitlement.value)
      }
    }))
  }, [selectedTwinsFromManageTwin, entitlementList])
  return (
      <div>
        <Autocomplete
        popupIcon={<ExpandMoreIcon />}
          limitTags={1}
          multiple
          sx={{
            backgroundColor: 'transparent',
            '& .MuiInputBase-root': {
              backgroundColor: 'black'
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white' // Set border color
            },
            '& .MuiInputLabel-root': {
              color: 'white' // Set label (placeholder) color
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white' // Set border color when focused
            },
            '& .MuiInputBase-input': {
              color: 'white', // Set text color
              fontSize: '0.75rem',
              textAlign: 'start',
              backgroundColor: 'black'
            },
            '& .MuiAutocomplete-popupIndicator': {
              color: 'white', // Set dropdown icon color
              borderRadius: '0rem',
              backgroundColor: '#000'
            }
          }}
          options={selectedOptions || []}
          getOptionLabel={(option) => option?.label}
          renderInput={(params) => (
            <TextField
              sx={{
                border: '1px solid #fff',
                padding: '0.5rem',
                borderRadius: '0.437rem'
              }}
              {...params}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
              variant='standard'
              color='secondary'
              placeholder={entitlementType} />
          )}
          PaperComponent={({ children }) => (
            <ul style={{
              backgroundColor: 'black',
              padding: 0,
              listStyle: 'none',
              color: 'white',
              border: '1px solid #fff',
              borderRadius: '0.875rem',
              marginTop: '2rem'
            }}>
              {children}
            </ul>
          )}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderOption={renderOption}
          renderTags={() => null}
        />
        <Box sx={{ marginTop: '2rem' }}>
          {selectedOptions?.map((option: any, index: number) => {
            return (
              option.isSelected
                ? (
                  <Chip
                    key={index}
                    onDelete={handleDelete(option.value)}
                    label={option.label}
                    sx={{
                      backgroundColor: 'white',
                      color: 'black',
                      marginRight: '4px',
                      '& .MuiChip-label': {
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }
                    }}
                  />
                  )
                : (
                  <></>
                  )
            )
          })}
        </Box>
      </div>
  )
}

export default EditCheckboxAutocomplete
