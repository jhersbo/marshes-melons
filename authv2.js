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
        score: time
    }
    return JSON.stringify(obj)
}

async function registerUser(data){
    let response = await fetch('https://marshes-scoring-api.herokuapp.com/users', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if(response.status === 200){
        console.log(response.json())
    }else{
        console.log(`Unable to register user. Response: ${response.json()}`)
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
        console.log('True')
        return true
    }else{
        console.log(`Unable to find user.`)
        return false
    }
}

let regData;
formButtons['register'].addEventListener('click', async e =>{
    e.preventDefault();
    if(await validateUser(inputs.userRegistration.value)){
        switchPage('game')
    }
    
})

formButtons['login'].addEventListener('click', async e =>{
    e.preventDefault();
    if(await validateUser(inputs.loginUser.value)){
        auth = true
        switchPage('game')
    }else{
        window.alert('Login Failed! Please refresh and try again.')
    }
})
