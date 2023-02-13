import React, {useState, useEffect } from 'react';

import {FormGroup, FormControl, Alert, AlertTitle} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee } from '../actions';

import validateForm from '../functions/validateForm';

const CreateEmployee = () => {
    const [alert, setAlert] = useState('');
    const {id} = useParams();

    const navigate = useNavigate();
    
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
    const [employee, setEmployee] = useState(formVacio);
    
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        setEmployee({...employee, [event.target.id]: event.target.value });
    }

    const renderAlert = () => {
        switch (alert) {
            case 'success':
                return(
                    <Alert severity="success">
                        <AlertTitle>Carga Exitosa</AlertTitle>
                        Empleado ingresado correctamente — <strong>Cargando la nueva lista!</strong>
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

    const handleCreate = () => {
        if(validateForm(employee)){
            dispatch(createEmployee(employee));
            setEmployee(formVacio);
            setAlert('success');
            setTimeout(()=>{
                setAlert('');
                navigate('/');
            },1000);
        } else {
            setAlert('validateError');
            setTimeout(()=>{
                setAlert('');
            },1500);
        }
    }

    const handleClean = () => {
        setEmployee(formVacio);
    }

    useEffect(()=>{
    }, [employee])

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
                        />
                        <TextField
                            required
                            id="lastName"
                            label="Last Name"
                            onChange={handleInputChange}
                            value={employee.lastName}
                            variant='outlined'
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
                        />
                        <TextField
                            required
                            id="phoneNumber"
                            label="Phone Number"
                            onChange={handleInputChange}
                            value={employee.phoneNumber}
                            variant='outlined'
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
                            InputLabelProps={{
                                shrink: true,
                              }}
                        />
                        <TextField
                            required
                            type='number'
                            id="salary"
                            label="Salary"
                            onChange={handleInputChange}
                            value={employee.salary}
                            variant='outlined'
                        />
                    </Stack>
                </FormControl>
                <FormControl>
                    <Stack direction='row' spacing={2}>
                        <TextField
                            id="commission"
                            label="Commission PCT"
                            onChange={handleInputChange}
                            value={employee.commission}
                            variant='outlined'
                        />
                        <TextField
                                id="id"
                                label="id"
                                value={employee.id}
                                variant='outlined'
                                disabled 
                        />
                    </Stack>
                </FormControl>
                <FormControl>
                    <Stack direction='row' spacing={2}>
                        <Button onClick={handleCreate}> Agregar </Button>
                        <Button onClick={handleClean}> Limpiar </Button>
                    </Stack>
                </FormControl>
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

export default CreateEmployee;