let inputs = {
    userRegistration: document.getElementById('username-input'),
    userRegPass1: document.getElementById('password1'),
    userRegPass2: document.getElementById('password2'),
    loginUser: document.getElementById('login-username'),
    loginPass: document.getElementById('login-password'),
}
let formButtons = {
    register: document.getElementById('register-submit'),
    login: document.getElementById('login-submit'),
}
function packageRegData(){
    let obj = {
        username: inputs.userRegistration.value,
        password: passwordMatch(),
        score: null
    }
    return JSON.stringify(obj)
}

async function registerUser(){
    let response = await fetch('https://marshes-scoring-api.herokuapp.com/users', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: packageRegData()
    })
    if(response.ok){
        return true
    }else{
        return false
    }
}

async function validateUser(username){
    let response = await fetch(`https://marshes-scoring-api.herokuapp.com/users/${username}`,{
        method: 'GET'
    })
    let parsedResponse = await response.json().then((data)=>{
        return data.user[0]
    })
    if(response.ok && parsedResponse.username === inputs.loginUser.value && parsedResponse.password === inputs.loginPass.value){
        return true
    }else{
        return false
    }
}

//Verify that passwords match
function passwordMatch(){
    if (inputs.userRegPass1.value === inputs.userRegPass2.value){
       return inputs.userRegPass1.value
    }else{
        window.alert('Passwords do not match. Please try again.')
    }
}

//Packaging data
function intakeRegData(){
    let regData = {
        username: inputs.userRegistration.value,
        password: passwordMatch(),
    }
    return regData;
}

function intakeLoginData(){
    let loginData = {
        username: inputs.loginUser.value,
        password: inputs.loginPass.value
    }
    return loginData;
}

let regData;
let user;
formButtons['register'].addEventListener('click', async e =>{
    e.preventDefault();
    if(await registerUser()){
        user = inputs.userRegistration.value
        switchPage('game')
    }else{
        window.alert('Registration Failed! Please refresh and try again.')
    }
    return user
})

formButtons['login'].addEventListener('click', async e =>{
    e.preventDefault();
    if(await validateUser(inputs.loginUser.value)){
        user = inputs.loginUser.value
        switchPage('game')
    }else{
        window.alert('Login Failed! Please refresh and try again.')
    }
    return user
})
