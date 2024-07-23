import { createTheme } from '@mui/material'

const PrimaryTheme = createTheme({
  palette: {
    primary: {
      main: '#437EF7',
      contrastText: '#fff'
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: ['Noto Sans', 'sans-serif'].join(','),
    fontSize: 14,
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightBold: 500,
    body1: {
      fontSize: 14
    }
  },
  components: {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '16px',
          '&:last-child': {
            paddingBottom: '16px'
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: 'none' // Hide the indicator
        }
      }
    },
    // MuiPaginationItem: {
    //   styleOverrides: {
    //     root: {
    //       '&.Mui-selected': {
    //         backgroundColor: '#437EF7',
    //         fontWeight: 600,
    //         color: '#fff'
    //       }
    //     }
    //   }
    // },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#DAE0E6'
        }
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          color: '#b2b2b2'
        },
        track: {
          backgroundColor: '#b2b2b2'
        }
      }
    }
  }
})
export default PrimaryTheme
