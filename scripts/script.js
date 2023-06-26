let login=document.querySelector(".login");
let info=document.querySelector(".info");
let signup = document.querySelector(".signup");
let signupbtn=document.querySelector(".signup-btn")

document.getElementById("signup-btn").addEventListener("change",(event)=>{
    // event.preventDefault()
    signup.classList.add(".signup-slide")
    signup.classList.remove(".signup")
    info.classList.add(".info-slide")
    info.classList.remove(".info")
})