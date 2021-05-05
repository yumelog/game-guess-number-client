const axios = require('axios')

function game_start(){
  return axios.post('http://127.0.0.1:3000/sessions', {
    "game_id": "d4r10"
  })
}

function guess_number(session_id, target_number){
  let judge_numbers = new Set(target_number)
  judge_numbers = Array.from(judge_numbers)
  if(judge_numbers.length === 4){
    return axios.put(`http://127.0.0.1:3000/sessions/${session_id}/guess`, {
      numbers: target_number
    })
  }else{
    return
  }
}
async function main(){

  console.time('client001')
  let session_id = await game_start()
  let target_number =[]

  for(let i = 0; i <= 9; i++){
    target_number[0] = i
    for(let z = 0; z <= 9; z++) {
      target_number[1] = z
      for(let x = 0; x <= 9; x++ ){
        target_number[2] = x
        for(let y = 0; y <= 9; y++){
          target_number[3] = y
          let answer = await guess_number(session_id.data.session_id, target_number)
          if(answer?.data?.status?.code === 1){
            console.log(target_number)
            console.log("success!")
            console.timeEnd('client001')
            return 0
          }
        }
      }
    }
  }
}
main()
