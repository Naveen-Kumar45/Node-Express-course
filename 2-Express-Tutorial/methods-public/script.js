let input = document.getElementById("username")
let errorMsg = document.querySelector(".errorMsg")
let sendBtn = document.getElementById("sendBtn")
let footer = document.querySelector(".footer")

async function fetchData(){
    try{
        const response = await axios.get("/api/persons")
        console.log(response.data)
    }
    catch(err){
        errorMsg.textContent = err;
    }
}

fetchData()



sendBtn.addEventListener("click",(event) => {
    let inputValue = input.value.trim()
    console.log(`The Entered Input value is : ${inputValue}`)
    /*if (inputValue === ""){
        errorMsg.textContent="Please enter a value"
        return;
    }*/
    errorMsg.textContent = ""; 

    const user = {
        name : inputValue
    }


    const postData = async() => {
        try {
            const {data} = await axios.post("/api/persons",user)
            console.log(data)
        }
        catch(error){
            errorMsg.textContent=error
        }

    }

    postData()

    const getData = async() => {
        try {
            const {data} = await axios.get(`/api/people/${user.name}`)
            console.log(data)
        }
        catch(error){
            errorMsg.textContent=error
        }

    }

    //getData()

    /*const putData = async() => {
        try{
            const {data} = await axios.put("/api/people",user)
            console.log(data)
        }
        catch(error){
            errorMsg.textContent = error
        }
    }

    putData()

    const deleteData = async() => {
        try{
            const {data} = await axios.delete("/api/people",{
                data : user})
            console.log(data)
        }
        catch(error){
            errorMsg.textContent = error
        }
    }

    deleteData() */

    input.value="";

    /*let options = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(user)
    }

    fetch("/api/persons",options)
      .then(function(response){
        return response.json()
      })
      .then(function(data){
        console.log(data)
      })
      .catch(function(error){
        errorMsg.textContent = error

      })*/

})