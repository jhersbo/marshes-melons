//packages score
function packageScore(){
    return {
        score: time
    }
}

//function to update user's score upon finishing the game
async function updateScore(username){
    let response = await fetch(`https://marshes-scoring-api.herokuapp.com/users/${username}`,{
        method: 'PUT',
        body: JSON.stringify(packageScore())
    })
    let parsedResponse = await response.json().then((data)=>{
        return data.user[0]
    })
    console.log(parsedResponse)
    // if(parsedResponse.score === JSON.stringify(packageScore())){
    //     console.log(`Score updated: ${parsedResponse.score}`)
    // }else{
    //     console.log('Something went wrong.')
    // }
}
