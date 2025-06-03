const navBtn = document.querySelectorAll(".tab-button")
const tabContent = document.querySelectorAll(".tab-content")
navBtn.forEach(function(button){
    button.addEventListener("click" ,function(event){
        event.preventDefault();
        let link = button.getAttribute("data-tab")
        //remove active from button and content
        navBtn.forEach(function(btn){
            btn.classList.remove("active")
        });

        tabContent.forEach(function(content){
            content.classList.remove("active")
        });

        //add active to button and content
        button.classList.add("active")
        document.getElementById(link).classList.add("active")

    });
});

//create form
let firstname = "";
let lastname = "";
let email = "";
let  dob = "";
let password = "";
let confirmPassword = "" ;

const form = document.getElementById("createStudent");

   form.addEventListener("submit" , function(event){
    event.preventDefault();

    firstname = document.getElementById("firstname").value;
    lastname = document.getElementById("lastname").value;
    email = document.getElementById("email").value;
    dob = document.getElementById("date").value;
    password = document.getElementById("password").value;
    confirmPassword = document.getElementById("confirmPassword").value;

    //validating the form
    //for the entire field
    // if(!firstname || !lastname || !email || !dob || !password || !confirmPassword){
    //     alert("Fill in the required fields");
    //     return
    // };

    //validating for firstname
    let regfirstname = /[\d*]/
    let verifyFirstname = regfirstname.test(firstname)
    if( verifyFirstname|| firstname.length<3 || firstname.length>30){
        alert("Enter a valid Firstname");
        return
    }

    //validating for lastname
    let reglastname = /[\d*]/
    let verifylastname = reglastname.test(lastname)
    if(verifylastname || lastname.length<3 || lastname.length>30){
        alert("Enter a valid Lastname");
        return
    }

    //validating for email
    // let regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
    // let verifyemail = regemail.test(email)
    if(!email.includes("@") || !email.includes(".")){
        alert("Enter a valid email");
        return
    };

    //validating for password
    let regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    let verifypassword = regPassword.test(password)
    if(!verifypassword){
        alert("Enter a valid password")
        return
    }

    //validating for confirmpassword
    if (password != confirmPassword){
        alert ("Enter a matching password")
        return
    }


    let url = "https://class-work-s65y.onrender.com/api/v1/register"

    let userObject = {
        firstname : firstname,
        lastname : lastname,
        email : email,
        dob : dob ,
        password : password
    }

    //To post user information to the Api

    fetch(url , {
        method : "POST",
        headers :{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(userObject)
        
    }).then(function(response){
        console.log(response)
        if(response.ok == true){
            return response.json()
        }
        
    }).then(function(data){
        console.log(data)
        if(!data || data === undefined){
            return
        };
        alert("User created Successfully")

    }).catch(function(error){
        console.log(error.msg)
    })
});

let displayBtn = document.getElementById("displayBtn");
const table = document.querySelector("table")
let url = "https://class-work-s65y.onrender.com/api/v1/all-students"

displayBtn.addEventListener("click" , async function getUser() {
    try{
        let response = await fetch(url);
        let result = await response.json()
        console.log(result)
        result.data.forEach(function(user){
            let tableRow = document.createElement("tr");
            tableRow.innerHTML = `
            <td>${user._id}</td>
            <td>${user.createdAt}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.email}</td>
             <td>${user.dob}</td>
            `
            table.appendChild(tableRow)
        })
    }catch (error){
        console.log(error.msg)
    }
});


