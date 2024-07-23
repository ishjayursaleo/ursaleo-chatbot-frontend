import React from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import { styled } from '@mui/system'
import { Box, TextField } from '@mui/material'

const UrsaleoAutocomplete = styled(Autocomplete)({
  backgroundColor: 'transparent',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'gray' // Set border color
  },
  '& .MuiInputLabel-root': {
    color: 'white' // Set label (placeholder) color
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'gray' // Set border color when focused
  },
  '& .MuiInputBase-input': {
    color: 'white', // Set text color
    fontSize: '1.5rem',
    textAlign: 'left'
  },
  '& .MuiAutocomplete-popupIndicator': {
    color: 'black' // Set dropdown icon color
  }
})
const AutocompleteComponent: React.FC<{ userList: any }> = ({
  userList
}) => {
  const handleSelectedValue = (event: any, changeValue: any) => {
    console.log('[SelectedValue]', changeValue)
  }
  return (
        <Box>
            <UrsaleoAutocomplete
                fullWidth
                onChange={handleSelectedValue}
                id="combo-box-demo"
                options={userList}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" color='secondary' />
                )}
            />
        </Box>
  )
}

export default AutocompleteComponent
