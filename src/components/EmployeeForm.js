import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import {FormGroup, Container, Alert, AlertTitle, TextField, Button, Stack} from '@mui/material';

import { createEmployee, editEmployee } from '../actions';
import validateForm from '../functions/validateForm';

const EmployeeForm = () => {
    //-------------------------------- HOOKS ------------------------------------------------------

    const {id} = useParams();
    const [alert, setAlert] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {pathname} = useLocation();
    const newMode = pathname.includes('new');

    const [editMode, setEditMode] = useState(newMode);
    const employeeList = useSelector(state => state.rrhh.employees);

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

    const [employee, setEmployee] = useState(newMode ? formVacio : employeeList[id]);

    const [errors, setErrors] = useState([]);
    
    // ----------------------------- HANDLERS ------------------------------------------------------

    const handleCreate = () => {
        if(validateForm(employee).length === 0){
            dispatch(createEmployee(employee));
            setEmployee(formVacio);
            setAlert('success');
            setTimeout(()=>{
                setAlert('');
                navigate('/');
            },1000);
        } else {
            setErrors(validateForm(employee))
            setAlert('validateError');
            setTimeout(()=>{
                setAlert('');
            },1500);
        }
    }

    const handleCancel = () => {
        setEditMode(!editMode);
        setEmployee(employeeList[id]);
    }

    const handleUpdate = () => {
        if(validateForm(employee).length === 0){
            setEditMode(!editMode);
            dispatch(editEmployee(employee));
            setAlert('success');
            setTimeout(()=>{
                setAlert('');
            },1000);
        } else {
            setAlert('validateError');
            setErrors(validateForm(employee));
            setTimeout(()=>{
                setAlert('');
            },1000);
        }
    }

    //----------------------------------------- RENDERS ---------------------------------------------------

    const renderAlert = () => {
        switch (alert) {
            case 'success':
                return(
                    <Alert severity="success">
                        <AlertTitle>{newMode ? 'Carga Exitosa' : 'Actualizacion Exitosa' }</AlertTitle>
                        {newMode ? 'Empleado cargado correctamente' : 'Empleado actualizado correctamente'}
                    </Alert>
                )
            case 'validateError':
                return(
                    <Alert severity="error">
                        <AlertTitle>Error de carga</AlertTitle>
                        <strong>Complete correctamente todos los campos obligatorios</strong>
                    </Alert>
                )
            default:
                return;       
        } 
    }

    const renderTextField = (required, disabled, id, label, value, type, shrink) => {
        return(
            <TextField 
                required={required}
                disabled={disabled} 
                id={id} 
                label={label}
                onChange={event => setEmployee({...employee, [event.target.id]: event.target.value })}
                value={value}
                InputProps={{
                    readOnly: !editMode,
                  }}
                type={type}
                InputLabelProps={{
                    shrink: shrink,
                }}
                error={errors.includes(id)}
            />
        )
    }

    const renderButtons = () => {
        return(
            <Stack direction='row' spacing={2} display='flex' justifyContent='center' alignItems='center'>
                    <Button 
                        variant='contained' 
                        color='secondary' 
                        onClick={newMode ? handleCreate : (editMode ? handleUpdate : () => setEditMode(!editMode))}> 
                        {newMode ? 'Agregar' : (editMode ? 'Actualizar' : 'Editar')}
                    </Button>
                    {!editMode ? <div></div> : 
                        <Button variant='contained' onClick={newMode ? () => setEmployee(formVacio) : handleCancel}>
                            {newMode ? 'Limpiar' : 'Cancelar' }
                        </Button> }
            </Stack>
        )
    }

    const renderTitle = () => {
        return (
            <h1>
                {newMode ? 
                    'Agrega un nuevo empleado' :
                    (editMode ? `Actualiza la informacion del empleado ${id}` : `Informacion del empleado ${id}`) }
            </h1>
        )
    }

    const renderForm = () => {
        return(
            <FormGroup
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '30ch' }
            }}>
                <Stack direction='row' spacing={2}>
                    {renderTextField(true, false, 'firstName','First Name', employee.firstName)}
                    {renderTextField(true, false, 'lastName','Last Name', employee.lastName)}
                </Stack> 
                <Stack direction='row' spacing={2}>
                    {renderTextField(true, false, 'email','e-mail', employee.email)}
                    {renderTextField(true, false, 'phoneNumber','Phone Number', employee.phoneNumber)}
                </Stack>
                <Stack direction='row' spacing={2}>
                    {renderTextField(true, false, 'hireDate', 'Hire Date', employee.hireDate, 'date', true)}
                    {renderTextField(true, false, 'salary', 'Salary', employee.salary)}
                </Stack>
                <Stack direction='row' spacing={2}>
                    {renderTextField(false, false,'commission', 'Commission PCT', employee.commission)}
                    {renderTextField(false, true,'id', 'id', employee.id)}
                </Stack>
                {renderButtons()}
            </FormGroup>
        )
    }

    return (
        <Container sx={{
            mt: 10, 
            bgcolor: '#F2FAFD', 
            height: 450, 
            width: 650,
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',},
            }}>
            <Stack direction='column' spacing={4} display='flex' justifyContent='center' alignItems='center'>
                <div className='title'>
                    {renderTitle()}
                </div>
                <div>
                    {renderForm()}
                </div>
                <div className='alert'>
                    {renderAlert()} 
                </div>
            </Stack>
       </Container>
    )
}

export default EmployeeForm;