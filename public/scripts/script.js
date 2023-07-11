console.log("script works");

let sentMessag1 = document.getElementById("sent-message1");
let chattingContent1 = document.getElementById("chatting-content1");

let sendButton = () => {
  let chatInput1 = document.getElementById("chat-input1").value;
  if (chatInput1 != "") {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("sent-message");
    messageDiv.textContent = chatInput1;
    for (var i = 0; i < 4; i++) {
      let br = document.createElement("br");
      chattingContent1.appendChild(br);
    }
    chattingContent1.appendChild(messageDiv);
  } else {
    return;
  }
  document.getElementById("chat-input1").value = "";
};

let sentMessag2 = document.getElementById("sent-message2");
let chattingContent2 = document.getElementById("chatting-content2");
let sendButton2 = () => {
  let chatInput2 = document.getElementById("chat-input2").value;
  if (chatInput2 != "") {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("sent-message");
    messageDiv.textContent = chatInput2;
    for (var i = 0; i < 4; i++) {
      let br = document.createElement("br");
      chattingContent2.appendChild(br);
    }
    chattingContent2.appendChild(messageDiv);
  } else {
    return;
  }
  document.getElementById("chat-input2").value = "";
};
let sentMessag3 = document.getElementById("sent-message3");
let chattingContent3 = document.getElementById("chatting-content3");
let sendButton3 = () => {
  let chatInput3 = document.getElementById("chat-input3").value;
  if (chatInput3 != "") {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("sent-message");
    messageDiv.textContent = chatInput3;
    for (var i = 0; i < 4; i++) {
      let br = document.createElement("br");
      chattingContent3.appendChild(br);
    }
    chattingContent3.appendChild(messageDiv);
  } else {
    return;
  }
  document.getElementById("chat-input3").value = "";
};
let sentMessag4 = document.getElementById("sent-message4");
let chattingContent4 = document.getElementById("chatting-content4");
let sendButton4 = () => {
  let chatInput4 = document.getElementById("chat-input4").value;
  if (chatInput4 != "") {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("sent-message");
    messageDiv.textContent = chatInput4;
    for (var i = 0; i < 4; i++) {
      let br = document.createElement("br");
      chattingContent4.appendChild(br);
    }
    chattingContent4.appendChild(messageDiv);
  } else {
    return;
  }
  document.getElementById("chat-input4").value = "";
};
let sentMessag5 = document.getElementById("sent-message5");
let chattingContent5 = document.getElementById("chatting-content5");
let sendButton5 = () => {
  let chatInput5 = document.getElementById("chat-input5").value;
  if (chatInput5 != "") {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("sent-message");
    messageDiv.textContent = chatInput5;
    for (var i = 0; i < 4; i++) {
      let br = document.createElement("br");
      chattingContent5.appendChild(br);
    }
    chattingContent5.appendChild(messageDiv);
  } else {
    return;
  }
  document.getElementById("chat-input5").value = "";
};
// This code provides chatting area for selected user.

const userCards = document.getElementsByClassName("card");
const userChats = document.getElementsByClassName("chat-containor");

for (let i = 0; i < userCards.length; i++) {
  userCards[i].addEventListener("click", () => {
    userChats[i].style.right = "40px";
    userChats[i].style.width = "65vw";

    for (let j = 0; i < userChats.length; j++) {
      if (i == j) {
        continue;
      } else {
        userChats[j].style.right = "-2000px";
      }
    }
  });
}

// Alerting user with error
const errMsg = document.getElementById("errMsg");
if (errMsg.value) {
  alert(errMsg.value);
}

// sending AJAX request on sending message
const form = document.getElementById("messageForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const value = document.getElementById("cip1").value;

  const xhr = new XMLHttpRequest();
  xhr.open("post", "/ajax");
  xhr.sendRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      document.getElementById("h1").innerHTML = response.response;
    }
  };
  xhr.send(JSON.stringify({ var: value }));
});
