n=1
let Id = setInterval(function(){
    console.log(`Mumbai Indians have won their ${n} IPL title in 201${n+1+n}`)
    n++
    if (n===5){
        console.log(`Mumbai Indians have won their ${n} IPL title in 2020`)
        clearInterval(Id)
    }
},1000)