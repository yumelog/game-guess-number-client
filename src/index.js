const axios = require('axios')

async function game_start(){
  try {
    const data = await axios.post('http://127.0.0.1:3000/sessions', {
      "game_id": "d4r10"
    })
    return data
  } catch (err) {
    console.error("error1")
    return 1
  }
}

async function guess_number(session_id, target_number){

  try{
    let judge_numbers = new Set(target_number)
    judge_numbers = Array.from(judge_numbers)
    if(judge_numbers.length === 4){
      return axios.put(`http://127.0.0.1:3000/sessions/${session_id}/guess`, {
        numbers: target_number
      })
    }else{
      return 1
    }
  } catch(err) {
    console.error("error2")
    return 1
  }
}
async function main(){

  console.time('client001')
  const start_response = await game_start()
  const session_id = start_response.data.session_id
  if(!start_response){
    console.log("cant start game")
    return
  }
  const target_number =[]

  for(let i = 0; i <= 9; i++){
    target_number[0] = i
    for(let z = 0; z <= 9; z++) {
      target_number[1] = z
      for(let x = 0; x <= 9; x++ ){
        target_number[2] = x
        for(let y = 0; y <= 9; y++){
          target_number[3] = y
          let answer = await guess_number(session_id, target_number)
          if(!answer){
            console.log("error occured")
            return
          }else if(answer?.data?.status?.code === 1){
            console.log(target_number)
            console.log("success!")
            console.timeEnd('client001')
            return
          }
        }
      }
    }
  }
}
main()
