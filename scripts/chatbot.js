import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyBGOA9CGdHeIg0r7MyLQc9BHbhI1b0syxQ";
const EDAMAM_APP_ID = "22a10e41"; 
const EDAMAM_APP_KEY = "3c8283966b138fb4e09ac5ec5202e7f2"; 

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const default_response = "Please choose one of the following options:\n1. Healthy foods \n2. Nutrition suggestion \n3. Just exploring\n--------------------------------\nType 'options' to see this box again";

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});
appendMessage("Nehaal", default_response);

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
      response = "Tell me the ingredients that you like to avoid";
    } else if (userInput.toLowerCase() === "3") {
      response = "You can visit the home page for exploring";
    } else if (userInput.toLowerCase().startsWith("healthy food")) {
      response = await getHealthyFood(userInput);
    } else if (userInput.toLowerCase().startsWith("nutrition suggestion")) {
      response = await getNutritionSuggestion(userInput);
    } else {
      const result = await model.generateContent(userInput);
      response = await result.response.text();
      response = response.replace(/\*/g, "");
      response = response.replace(/\s(?=\w)/g, " ");
    }
    
    appendMessage("Nehaal", response);
  } catch (error) {
    console.error("Error:", error);
    appendMessage("Nehaal", "Sorry, I am having trouble connecting to the server.");
  }
}

async function getHealthyFood(query) {
  const url = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.hits.length > 0) {
      return data.hits.map(hit => `${hit.recipe.label}: ${hit.recipe.url}`).join("\n");
    } else {
      return "No recipes found for the given query.";
    }
  } catch (error) {
    console.error("Error fetching healthy food recipes:", error);
    return "Error fetching healthy food recipes.";
  }
}

async function getNutritionSuggestion(query) {
  const url = `https://api.edamam.com/api/nutrition-data?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.calories) {
      return `Calories: ${data.calories}, Fat: ${data.totalNutrients.FAT.quantity} ${data.totalNutrients.FAT.unit}`;
    } else {
      return "No nutrition data found for the given query.";
    }
  } catch (error) {
    console.error("Error fetching nutrition suggestion:", error);
    return "Error fetching nutrition suggestion.";
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
