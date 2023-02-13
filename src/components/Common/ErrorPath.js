import React from 'react';
import {Alert, AlertTitle} from '@mui/material';

const ErrorPath = ({error}) => {
    return (
        <Alert severity="warning">
            <AlertTitle>{error==='empleado' ? 'Empleado no encontrado' : 'Ruta no encontrada'}</AlertTitle>
            La ruta ingresada no es correcta — <strong>Ingrese a una ruta valida</strong>
        </Alert>
    )
}

export default ErrorPath;