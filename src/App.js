import React from 'react';
import {Route, createRoutesFromElements, createBrowserRouter, RouterProvider,} from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import ErrorPath from './components/Common/ErrorPath';
import NavBarWrapper from './components/Common/NavBarWrapper';
import EmployeeForm from './components/EmployeeForm';

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<NavBarWrapper />} errorElement={<ErrorPath error='ruta'/>}>
            <Route path='/' element={<EmployeeList />} />
            <Route path='/new/:id' element={<EmployeeForm />} />
            <Route path='/employee/:id' element={<EmployeeForm />} errorElement={<ErrorPath error='empleado'/>}/>
        </Route>
    )
  );

  return (
    <div> 
        <RouterProvider router= {router} />
    </div>
    
  );
}

export default App;
