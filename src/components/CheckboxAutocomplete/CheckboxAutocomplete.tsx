/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// /* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Chip, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const CheckboxAutocomplete: React.FC<{ optionList: any }> = ({ optionList }) => {
  const [selectedOptions, setSelectedOptions] = React.useState(
    optionList.map((option: any) => option.id)
  )
  const [inputFocused, setInputFocused] = React.useState(false)

  const renderOption = (props: any, option: any, { selected }: any) => (
    <li {...props}>
      <Checkbox color='secondary' style={{ marginRight: 8 }} checked={true} />
      <Typography color='white' sx={{ opacity: '10' }}>{option?.label}</Typography>
    </li>
  )

  const handleChange = (event: any, newValues: any) => {
    setSelectedOptions(newValues)
  }

  const renderTags = (value: any, getTagProps: any) => {
    // Conditionally render tags based on input focus
    return inputFocused
      ? optionList.slice(0, 1).map((option: any, index: number) => (
        <Chip
          key={index}
          label={option?.label}
          {...getTagProps({ index })}
          clearIcon={null}
          sx={{
            backgroundColor: '#303030',
            color: 'black',
            marginRight: '4px',
            marginBottom: '2px',
            '& .MuiChip-label': {
              fontSize: '0.625rem',
              fontWeight: 'bold',
              overflow: 'hidden',
              color: 'white'
            }
          }}
          onDelete={() => { }}
        />
      ))
      : optionList.map((option: any, index: number) => (
        <Chip
          key={index}
          label={option?.label}
          {...getTagProps({ index })}
          clearIcon={null}
          sx={{
            backgroundColor: '#303030',
            color: 'black',
            marginRight: '4px',
            marginBottom: '2px',
            '& .MuiChip-label': {
              fontSize: '0.625rem',
              fontWeight: 'bold',
              color: 'white'
            }
          }}
          onDelete={() => { }}
        />
      ))
  }

  return (
    <Autocomplete
    popupIcon={<ExpandMoreIcon />}
      limitTags={1}
      disableClearable={true}
      multiple
      options={optionList}
      getOptionLabel={(option) => option?.label}
      getOptionDisabled={() => true}
      value={selectedOptions}
      onFocus={() => { setInputFocused(true) }}
      onBlur={() => { setInputFocused(false) }}
      sx={{
        '& .MuiChip-label': {
          fontSize: '0.625rem',
          color: 'black',
          fontWeight: 'bold',
          width: '80px', // Set your desired fixed width
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        },
        '&.MuiAutocomplete-tag': {
          color: 'white',
          display: 'flex'
        },
        '& .MuiAutocomplete-popupIndicator': {
          color: 'white', // Set dropdown icon color
          borderRadius: '0rem',
          backgroundColor: '#000'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'white', // Set border color when focused
          border: '1px solid #fff',
          borderRadius: '8px'
        },
        '& .MuiAutocomplete-tag': {
          color: 'white !important'
        },
        '& .MuiOutlinedInput-root': {
          padding: '1px'
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          color="secondary"
          sx={{
            backgroundColor: 'transparent',
            border: inputFocused ? 'none' : '0.01px solid white',
            borderRadius: '8px',
            minWidth: '240px',
            maxWidth: '240px',
            maxHeight: '55px',
            overflow: 'hidden'
          }}
          InputProps={{
            disableUnderline: true,
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {params.InputProps.endAdornment}
                <span className="MuiAutocomplete-popupIndicator" />
              </React.Fragment>)
          }}
        />
      )}
      PaperComponent={({ children }) => (
        <ul
          style={{
            backgroundColor: 'black',
            padding: 0,
            listStyle: 'none',
            color: 'white',
            border: '1px solid #fff',
            borderRadius: '0.875rem'
          }}
        >
          {React.Children.map(children, child => (
            <li style={{ margin: 0 }}>{child}</li>
          ))}
        </ul>
      )}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option?.value === value?.value}
      renderOption={renderOption}
      renderTags={renderTags}
    />
  )
}

export default CheckboxAutocomplete
