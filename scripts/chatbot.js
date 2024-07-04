import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBGOA9CGdHeIg0r7MyLQc9BHbhI1b0syxQ";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const default_response ="Please choose one of the following options:\n1. Healthy foods \n2. Nutritiion suggestion \n3. just exploring\n--------------------------------\n Type 'options' to see this box again";

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
appendMessage("Nehaal",default_response);
async function sendMessage() {
  const userInput = document.getElementById("user-input").value.trim();
  if (userInput === "") return;
  
  appendMessage("You", userInput);
  document.getElementById("user-input").value = "";
  
  try {
    let response;
    if (userInput.toLowerCase() === "options") {
      response = default_response;
    } else if (userInput.toLowerCase() === "1") {
      response = "Type in the prompt that you desire regarding healthy food";
    } else if (userInput.toLowerCase() === "2") {
      response = "Tell me the ingredients that you like to avoid ";
    } else if (userInput.toLowerCase() === "3") {
      response = "You can visit the home page for exploring ";
    } else {
      const result = await model.generateContent(userInput);
      response = await result.response.text();
      response = response.replace(/\*/g, "");   
      response = response.replace(/\s(?=\w)/g, " ");
    }
    
    appendMessage("Nehaal", response);
    // if(response!=default_response){
    //   appendMessage("Nehaal",default_response);
    // }
  } catch (error) {
    console.error("Error:", error);
    appendMessage("Nehaal", "Sorry, I am having trouble connecting to the server.");
  }
}

function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.className = "chat-message";

  let styledMessage = "";

  if (sender === "Nehaal" && message.includes("\n")) {
    const listItems = message
      .split("\n")
      .filter((item) => item.trim() !== "")
      .map((item) => `<li>${item.trim()}</li>`)
      .join("");

    styledMessage = `<strong>${sender}:</strong> <ul>${listItems}</ul>`;
  } else {
    styledMessage = `<strong>${sender}:</strong> <span class="preformatted">${message}</span>`;
  }

  messageElement.innerHTML = styledMessage;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}
