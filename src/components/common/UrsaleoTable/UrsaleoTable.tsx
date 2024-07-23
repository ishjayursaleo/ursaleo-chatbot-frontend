import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import { Button, IconButton } from '@mui/material'
import styles from './UrsaleoTable.module.scss'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

function createData (
  fname: string,
  lname: string,
  email: string,
  company: string,
  action: any
) {
  return { fname, lname, email, company, action }
}

const rows = [
  createData('Kalana', 'Nimsara', 'kalana@tecciance.com', 'Tecciance', 4.0),
  createData('Sajana', 'Deelka', 'sajana@tecciance.com', 'Tecciance', 4.3),
  createData('Keshan', 'Perera', 'keshan@tecciance.com', 'Tecciance', 6.0),
  createData('Awishka', 'Chanka', 'awishka@tecciance.com', 'Tecciance', 4.3),
  createData('Supun', 'Hansaka', 'supun@tecciance.com', 'Tecciance', 3.9)
]

const UrsaleoTable = () => {
  return (
    <div>
      <div className={styles.addNewBtn}>
        <Button sx={{ textTransform: 'none', fontWeight: 600 }}
          variant="contained"
          color='primary'

          endIcon={<AddCircleOutlineOutlinedIcon />}>Add New</Button>
      </div>
      <TableContainer sx={{ boxShadow: 10 }} component={Paper}>
        <Table sx={{ width: '1200px' }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#1b2944' }}>
            <TableRow>
              <TableCell className={styles.tableHeaderCell}>First Name</TableCell>
              <TableCell className={styles.tableHeaderCell}>Last Name</TableCell>
              <TableCell className={styles.tableHeaderCell} align="left">Email</TableCell>
              <TableCell className={styles.tableHeaderCell} align="left">Company</TableCell>
              <TableCell className={styles.tableHeaderCellAction} align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.fname}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" className={styles.tableCell}>
                  <div className={styles.tableCellColumn}>
                    <p className={styles.tableCellText}>{row.fname}</p>
                  </div>
                </TableCell>
                <TableCell className={styles.tableCell}
                  color='white'>
                  <div className={styles.tableCellColumn}>
                    <p className={styles.tableCellText}>{row.lname}</p>
                  </div>
                </TableCell>
                <TableCell
                  className={styles.tableCell}>
                  <div className={styles.tableCellColumn}>
                    <p className={styles.tableCellText}>{row.email}</p>
                  </div>
                </TableCell>
                <TableCell
                  className={styles.tableCell}>
                  <div className={styles.tableCellColumn}>
                    <p className={styles.tableCellText}>{row.company}</p>
                  </div>
                </TableCell>
                <TableCell
                  className={styles.tableCell}>
                  <div className={styles.tableCellColumnIcon}>
                    <IconButton aria-label="delete"><ModeEditOutlinedIcon color='primary' /></IconButton>
                    <IconButton aria-label="delete"><DeleteIcon color='error' /></IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></div>
  )
}

export default UrsaleoTable
