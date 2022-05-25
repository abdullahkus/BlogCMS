import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

export default function PageSettings() {
  const [pages, setPages] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:4000/page-settings/')
      .then(function (res) {
        setPages(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [setPages])

  const deletePage = (id) => {
    axios
      .delete('http://localhost:4000/page-settings/delete/' + id)
      .then(function (res) {
        setPages(pages.filter((page) => page._id === id))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
          }}>
          <Box style={{ width: '100%' }}>
            <Typography variant='h4' gutterBottom>
              Sayfalar
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Link style={{ textDecoration: 'none' }} to='/page-settings/create'>
            <Button variant='contained'>Yeni Ekle</Button>
          </Link>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{}} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Sayfa Adı</StyledTableCell>
                <StyledTableCell>Sayfa Açıklaması</StyledTableCell>
                <StyledTableCell>Seo Başlık</StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pages.map((page) => (
                <StyledTableRow key={page.id}>
                  <StyledTableCell style={{ wordBreak: 'break-word' }}>{page.pageName}</StyledTableCell>
                  <StyledTableCell style={{ wordBreak: 'break-word' }}>
                    {page.pageDescription}
                  </StyledTableCell>
                  <StyledTableCell style={{ wordBreak: 'break-word' }}>
                    {page.seoTitle}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link style={{ textDecoration: 'none' }} to={`/page-settings/edit/${page.id}`}>
                      <Button>
                        <EditIcon />
                      </Button>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => deletePage(page.id)}>
                      <DeleteForeverIcon />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
