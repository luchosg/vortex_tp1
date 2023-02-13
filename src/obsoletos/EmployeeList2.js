import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee } from '../actions';

import {Table, Box, TableBody, TableCell, TableContainer, TableHead, IconButton, Alert, AlertTitle,
  TableRow, Paper, Container, Button, Stack, Fab, TableFooter, TablePagination} from '@mui/material';

import {Add, LastPage, KeyboardArrowLeft, KeyboardArrowRight, FirstPage, Delete, Visibility} from '@mui/icons-material';

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

const EmployeeList = () => {
    //------------------------ HOOKS --------------------------------

    const employeesList = useSelector(state => state.rrhh.employees);
    const nextId = useSelector(state => state.rrhh.nextId[0]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //------------------------ HANDLERS ------------------------------

    const handleNew = () => {
        navigate(`/new/${nextId}`);
    }

    const handleDelete = event => {
        dispatch(deleteEmployee(Number(event.target.id)));
    }

    const handleMoreInfo = event => {
        navigate(`/employee/${event.target.id}`)
    }

    //------------------------ TABLA/PAGINACION -----------------------

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const createData = (id, firstName, lastName) => {
      return { id, firstName, lastName };
    }

    const TablePaginationActions = (props) => {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;
      
        const handleFirstPageButtonClick = (event) => {
          onPageChange(event, 0);
        };
      
        const handleBackButtonClick = (event) => {
          onPageChange(event, page - 1);
        };
      
        const handleNextButtonClick = (event) => {
          onPageChange(event, page + 1);
        };
      
        const handleLastPageButtonClick = (event) => {
          onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };
      
        return (
          <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
              onClick={handleFirstPageButtonClick}
              disabled={page === 0}
              aria-label="first page"
            >
              {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton
              onClick={handleBackButtonClick}
              disabled={page === 0}
              aria-label="previous page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
              onClick={handleNextButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="next page"
            >
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
              onClick={handleLastPageButtonClick}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
              aria-label="last page"
            >
              {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
            </IconButton>
          </Box>
        );
      }

    TablePaginationActions.propTypes = {
        count: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        page: PropTypes.number.isRequired,
        rowsPerPage: PropTypes.number.isRequired,
    };

    const rows = [];
    employeesList.map(employee => rows.push(createData(employee.id, employee.firstName, employee.lastName)));

    //------------------------------ RENDERS ---------------------------------------------

    const renderTable = () => {
        const emptyRows =
            page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
        
        if(rows.length === 0){
            return (
              <Alert severity="warning">
                <AlertTitle>No hay mas empleados</AlertTitle>
                <strong>Agrega un nuevo empleado</strong>
              </Alert>
            )
        } else {
            return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Options</TableCell>
                            </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                            ).map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.firstName}</TableCell>
                                <TableCell align="center">{row.lastName}</TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={2} display='flex' justifyContent='center' alignItems='center'>
                                        <Button 
                                            id={row.id} 
                                            onClick={handleMoreInfo} 
                                            variant="contained"
                                            startIcon={<Visibility />}
                                            >More Info
                                        </Button>
                                        <Button 
                                            id={row.id} 
                                            onClick={handleDelete} 
                                            variant="contained"
                                            startIcon={<Delete />}
                                            >Delete
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[3, 5, 10, { label: 'All', value: -1 }]}
                          colSpan={4}
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              'aria-label': 'rows per page',
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              );
        }
    }

    const renderInit = () => {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <Container >
            <Stack direction='column' spacing={2} mt='100px' display='flex' justifyContent='center' alignItems='center'>
                <div>
                    <h1>Lista de empleados</h1>
                </div>
                <div>
                    {employeesList ? renderTable() : renderInit()}
                </div>
                <div>
                    <Fab color="primary" aria-label="add">
                        <Add onClick={handleNew} />
                    </Fab>
                </div>
            </Stack>
        </Container>
    )    
}

export default EmployeeList;