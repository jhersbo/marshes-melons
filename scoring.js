//packages score
function packageScore(){
    return JSON.stringify({
        score: Number(time)
    })
}

//function to update user's score upon finishing the game
async function updateScore(username, time){
    let response = await fetch(`https://marshes-scoring-api.herokuapp.com/users/${username}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({score: time})
    })
    let parsedResponse = await response.json().then((data)=>{
        return data
    })
    console.log(username)
    console.log(JSON.stringify({score: time}))
    console.log(parsedResponse)
    // console.log(parsedResponse)
    // if(parsedResponse.score === JSON.stringify(packageScore())){
    //     console.log(`Score updated: ${parsedResponse.score}`)
    // }else{
    //     console.log('Something went wrong.')
    // }
    return parsedResponse
}
