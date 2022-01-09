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

async function queryUser(data){
    let response = await fetch(`https://marshes-scoring-api.herokuapp.com/users/${data.username}`) 
    if(response.status === 200){
        console.log(response.json())
    }else{
        console.log(`Unable to find user. Response: ${response.json()}`)
    }
}



let regData;
formButtons['register'].addEventListener('click', async e =>{
    e.preventDefault();
    regData = packageRegData()
    await queryUser(regData)
    switchPage('game')
})

formButtons['login'].addEventListener('click', async e =>{
    e.preventDefault();

    
    switchPage('game')
})
