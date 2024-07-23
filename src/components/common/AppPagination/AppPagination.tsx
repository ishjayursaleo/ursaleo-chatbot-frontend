import { Box, Pagination, PaginationItem, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const AppPagination: React.FC<{
  page: number
  count: number
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void
}> = ({
  page,
  count,
  handleChangePage
}) => {
  return (
      <React.Fragment>
        <Pagination
          variant="outlined"
          shape='rounded'
          color='secondary'
          count={Math.ceil(count / 3)}
          onChange={handleChangePage}
          page={page}
          sx={{
            '& .MuiPaginationItem-root': {
              borderColor: 'gray',
              color: 'white'
            }
          }}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: () => (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <ArrowBackIcon
                        style={{
                          fontSize: '1rem',
                          margin: '0 0rem 0 0rem'
                        }}
                      />
                      <Typography fontSize="1rem">Prev</Typography>
                    </Box>
                  </>
                ),
                next: () => (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Typography
                        style={{
                          fontSize: '1rem',
                          margin: '0 0rem 0 0rem'
                        }}
                      >
                        Next
                      </Typography>
                      <ArrowForwardIcon style={{ fontSize: '1rem' }} />
                    </Box>
                  </>
                )
              }}
              {...item}
            />
          )}
        />
      </React.Fragment>
  )
}

export default AppPagination
