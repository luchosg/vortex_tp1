const validateForm = ({firstName, lastName, email, phoneNumber, hireDate, salary}) => {
    const errors =  [];
    const validateEmail = () => {
        const [usuario, dominio] = email.split('@');
        if(!dominio || usuario.includes('@') || dominio.includes('@')){
            return false;
        }
        const [organizacion, tipo] = dominio.split('.');
        if(!tipo || organizacion.includes('.') || tipo.includes('.')){
            return false;
        }
        if(usuario.length === 0 || tipo.length !== 3 || organizacion.length === 0){
            return false;
        } else {
            return true;
        }
    }

    if(firstName.length === 0) {errors.push('firstName')}
    if(lastName.length === 0) {errors.push('lastName')}
    if(!validateEmail()) {errors.push('email')}
    if(phoneNumber.length !== 10) {errors.push('phoneNumber')}
    if(hireDate.length !== 10) {errors.push('hireDate')}
    if(salary <= 0) {errors.push('salary')}

    return errors;
}

export default validateForm;
