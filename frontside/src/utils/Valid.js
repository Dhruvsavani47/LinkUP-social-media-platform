const valid = ({username, fullname, email, password, confirmPassword}) => {
    const err = {}

    if(!fullname){
        err.fullname = 'Please add your fullname'
    }
    else if(fullname.length > 25){
        err.fullname = 'length should be less than 25 characters'
    }

    if(!username){
        err.username = 'Please add your username'
    }
    else if(username.replace(/ /g, '').length > 25){
        err.username = 'length should be less than 25 characters'
    }

    if(!email){
        err.email = 'Please add your email'
    }
    else if(validateEmail(email)){
        err.email = 'Invalid Email format'
    }

    if(!password){
        err.password = 'Please add your password'
    }
    else if(password.length < 6){
        err.password = 'length should be greater than 6 characters'
    }

    if(password !== confirmPassword){
        err.confirmPassword = 'password should be match'
    }

    return{
        errMsg : err,
        errLength: Object.keys(err).length
    }
}

// const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
//     return emailRegex.test(email);
// };

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

export default valid;
