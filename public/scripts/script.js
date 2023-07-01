// <<<<<<< HEAD


let sentMessag1=document.getElementById("sent-message1")
let chattingContent1=document.getElementById("chatting-content1")
let sendButton= ()=>{
    let chatInput1=document.getElementById("chat-input1").value
    if(chatInput1!=""){
        let messageDiv=document.createElement("div")
        messageDiv.classList.add("sent-message")
        messageDiv.textContent=chatInput1
        for(var i=0;i<4;i++){
            let br=document.createElement("br")
            chattingContent1.appendChild(br)
        }
        chattingContent1.appendChild(messageDiv)
    }
    else{
        return;
    }
    document.getElementById("chat-input1").value=""
}
let sentMessag2=document.getElementById("sent-message2")
let chattingContent2=document.getElementById("chatting-content2")
let sendButton2= ()=>{
    let chatInput2=document.getElementById("chat-input2").value
    if(chatInput2!=""){
        let messageDiv=document.createElement("div")
        messageDiv.classList.add("sent-message")
        messageDiv.textContent=chatInput2
        for(var i=0;i<4;i++){
            let br=document.createElement("br")
            chattingContent2.appendChild(br)
        }
        chattingContent2.appendChild(messageDiv)
    }
    else{
        return;
    }
    document.getElementById("chat-input2").value=""
}
let sentMessag3=document.getElementById("sent-message3")
let chattingContent3=document.getElementById("chatting-content3")
let sendButton3= ()=>{
    let chatInput3=document.getElementById("chat-input3").value
    if(chatInput3!=""){
        let messageDiv=document.createElement("div")
        messageDiv.classList.add("sent-message")
        messageDiv.textContent=chatInput3
        for(var i=0;i<4;i++){
            let br=document.createElement("br")
            chattingContent3.appendChild(br)
        }
        chattingContent3.appendChild(messageDiv)
    }
    else{
        return;
    }
    document.getElementById("chat-input3").value=""
}
let sentMessag4=document.getElementById("sent-message4")
let chattingContent4=document.getElementById("chatting-content4")
let sendButton4= ()=>{
    let chatInput4=document.getElementById("chat-input4").value
    if(chatInput4!=""){
        let messageDiv=document.createElement("div")
        messageDiv.classList.add("sent-message")
        messageDiv.textContent=chatInput4
        for(var i=0;i<4;i++){
            let br=document.createElement("br")
            chattingContent4.appendChild(br)
        }
        chattingContent4.appendChild(messageDiv)
    }
    else{
        return;
    }
    document.getElementById("chat-input4").value=""
}
let sentMessag5=document.getElementById("sent-message5")
let chattingContent5=document.getElementById("chatting-content5")
let sendButton5= ()=>{
    let chatInput5=document.getElementById("chat-input5").value
    if(chatInput5!=""){
        let messageDiv=document.createElement("div")
        messageDiv.classList.add("sent-message")
        messageDiv.textContent=chatInput5
        for(var i=0;i<4;i++){
            let br=document.createElement("br")
            chattingContent5.appendChild(br)
        }
        chattingContent5.appendChild(messageDiv)
    }
    else{
        return;
    }
    document.getElementById("chat-input5").value=""
}
// This code provides chatting area for selected user.

let userCard1=document.getElementById("card1")
let userCard2=document.getElementById("card2")
let userCard3=document.getElementById("card3")
let userCard4=document.getElementById("card4")
let userCard5=document.getElementById("card5")

let userChat1=document.getElementById("user-chat1")
let userChat2=document.getElementById("user-chat2")
let userChat3=document.getElementById("user-chat3")
let userChat4=document.getElementById("user-chat4")
let userChat5=document.getElementById("user-chat5")

userCard1.addEventListener("click",()=>{
    userChat1.style.right="40px";
    userChat1.style.width="65vw";
    userChat2.style.right="-2000px";
    userChat3.style.right="-2000px";
    userChat4.style.right="-2000px";
    userChat5.style.right="-2000px";
    
})
userCard2.addEventListener("click",()=>{
    userChat2.style.right="40px";
    userChat2.style.width="65vw";
    userChat1.style.right="-2000px";
    userChat3.style.right="-2000px";
    userChat4.style.right="-2000px";
    userChat5.style.right="-2000px";
})
userCard3.addEventListener("click",()=>{
    userChat3.style.right="40px";
    userChat3.style.width="65vw";
    userChat2.style.right="-2000px";
    userChat1.style.right="-2000px";
    userChat4.style.right="-2000px";
    userChat5.style.right="-2000px";
})
userCard4.addEventListener("click",()=>{
    userChat4.style.right="40px";
    userChat4.style.width="65vw";
    userChat2.style.right="-2000px";
    userChat3.style.right="-2000px";
    userChat1.style.right="-2000px";
    userChat5.style.right="-2000px";
})
userCard5.addEventListener("click",()=>{
    userChat5.style.right="40px";
    userChat5.style.width="65vw";
    userChat2.style.right="-2000px";
    userChat3.style.right="-2000px";
    userChat4.style.right="-2000px";
    userChat1.style.right="-2000px";
})
// =======
const err = document.getElementById("err");
err.style.display = "none";
if (err.innerHTML != "" ) {
  alert(err.innerHTML);
}
// >>>>>>> ec80aa3839a07b95b6f0765d6fd61158e82f015d
