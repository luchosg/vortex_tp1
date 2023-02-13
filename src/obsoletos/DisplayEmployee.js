import React, {useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

import {FormGroup, FormControl} from '@mui/material';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useDispatch, useSelector } from 'react-redux';
import { editEmployee } from '../actions';

import validateForm from '../functions/validateForm';

const DisplayEmployee = () => {
    const {id, action} = useParams();
    const dispatch = useDispatch();
    const employeeInfo = useSelector(state => state.rrhh.employees[id]);
    const [editMode, setEditMode] = useState(action==='edit');
    const [alert, setAlert] = useState('');

    const formVacio = {
        id: id,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        hireDate: '',
        salary: '',
        commission: ''
    }
    const [employee, setEmployee] = useState(employeeInfo);

    const handleInputChange = (event) => {
        setEmployee({...employee, [event.target.id]: event.target.value });
    }

    const handleClean = () => {
        setEmployee(formVacio);
    }

    const handleEdit = () => {
        setEditMode(!editMode);
    }

    const handleUpdate = () => {
        if(validateForm(employee)){
            setEditMode(!editMode);
            dispatch(editEmployee(employee));
            setAlert('success');
            setTimeout(()=>{
                setAlert('');
            },1000);
        } else {
            setAlert('validateError');
            setTimeout(()=>{
                setAlert('');
            },1000);
        }
    }
        
    const handleCancel = () => {
        setEditMode(!editMode);
        setEmployee(employeeInfo);
    }

    useEffect(()=>{
    }, [employee])

    const renderAlert = () => {
        switch (alert) {
            case 'success':
                return(
                    <Alert severity="success">
                        <AlertTitle>Actualizacion Exitosa</AlertTitle>
                        <strong>Empleado actualizado correctamente</strong>
                    </Alert>
                )
            case 'validateError':
                return(
                    <Alert severity="error">
                        <AlertTitle>Error de carga</AlertTitle>
                        <strong>Complete todos los campos obligatorios</strong>
                    </Alert>
                )
            default:
                return;       
        } 
    }

    const renderForm = () => {
        return(
            <FormGroup
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}>
                <FormControl>
                    <Stack direction='row' spacing={2}>
                        <TextField
                            required
                            id="firstName"
                            label="First Name"
                            onChange={handleInputChange}
                            value={employee.firstName}
                            variant='outlined'
                            InputProps={{
                                readOnly: !editMode,
                              }}
                        />
                        <TextField
                            required
                            id="lastName"
                            label="Last Name"
                            onChange={handleInputChange}
                            value={employee.lastName}
                            variant='outlined'
                            InputProps={{
                                readOnly: !editMode,
                              }}
                        />
                    </Stack> 
                </FormControl>
                <FormControl>
                    <Stack direction='row' spacing={2}>
                        <TextField
                            required
                            id="email"
                            label="e-mail"
                            onChange={handleInputChange}
                            value={employee.email}
                            variant='outlined'
                            InputProps={{
                                readOnly: !editMode,
                              }}
                        />
                        <TextField
                            required
                            id="phoneNumber"
                            label="Phone Number"
                            onChange={handleInputChange}
                            value={employee.phoneNumber}
                            variant='outlined'
                            InputProps={{
                                readOnly: !editMode,
                              }}
                        />
                    </Stack>
                </FormControl> 
                <FormControl>
                    <Stack direction='row' spacing={2}>
                        <TextField
                            required
                            type='date'
                            id="hireDate"
                            label="Hire Date"
                            onChange={handleInputChange}
                            value={employee.hireDate}
                            variant='outlined'
                            InputProps={{
                                readOnly: !editMode,
                              }}
                        />
                        <TextField
                            required
                            id="salary"
                            label="Salary"
                            onChange={handleInputChange}
                            value={employee.salary}
                            variant='outlined'
                            InputProps={{
                                readOnly: !editMode,
                              }}
                        />
                    </Stack>
                </FormControl>
                <FormControl>
                    <Stack direction='row' spacing={2}>
                        <TextField
                            required
                            id="commission"
                            label="Commission PCT"
                            onChange={handleInputChange}
                            value={employee.commission}
                            variant='outlined'
                            InputProps={{
                                readOnly: !editMode,
                            }}
                        />
                        <TextField
                            required
                            id="id"
                            label="id"
                            value={employee.id}
                            variant='outlined'
                            disabled 
                        />
                    </Stack>
                </FormControl>
                <Stack direction='row' spacing={2}>
                    <Button onClick={editMode ? handleUpdate : handleEdit}> {editMode ? 'Actualizar' : 'Editar'} </Button>
                    <Button onClick={editMode ? handleCancel : handleClean}>{editMode ? 'Cancelar' : 'Limpiar'}</Button>
                </Stack>
            </FormGroup>
        )
    }

    return (
        <div>
            <div className='form'>
                {renderForm()}
            </div>
            <div className='alert'>
                {renderAlert()} 
            </div>
        </div>
    )
}

export default DisplayEmployee;