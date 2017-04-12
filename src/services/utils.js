function roundMaxNumber(numberToRound){
  //add 1 to every 10th except 10
  if(numberToRound % 10 === 0 && numberToRound !==10){
    numberToRound += 1}
  //round the number
  if(numberToRound < 20) {
    return numberToRound +1
  }else if(numberToRound < 200){
    return Math.ceil(numberToRound /10) * 10
  }else if(numberToRound < 1000){
    return Math.ceil(numberToRound /50) * 50
  }else if(numberToRound > 1000){
    return Math.ceil(numberToRound /100) * 100
  }
}

function getSteps(number) {
  if(number < 20) {
    return 1
  }else if(number < 200) {
    return 10
  }else if(number < 1000){
    return 50
  }else if(number < 10000){
    return 100
  }else if(number < 100000){
    return 1000
  }
}

export { roundMaxNumber, getSteps }
