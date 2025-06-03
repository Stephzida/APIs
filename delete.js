//Delete request
let studentId = "";
let deleteForm = document.getElementById("deleteStudent")
let delurl = "https://class-work-s65y.onrender.com/api/v1/student"

deleteForm.addEventListener("submit", async function(e){
    e.preventDefault();
    
    studentId = document.getElementById("student_id").value;

    if (!studentId ){
        alert("Input an ID");
        return
    };

    try {
        let response = await fetch(`${delurl}/${studentId}` , {
            method : "DELETE"
        })
        if(response.ok === true){
            let result = await response.json()
            console.log(result)
        }
    } catch (error) {
        console.log(error.msg)
    }
})