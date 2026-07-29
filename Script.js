const API_KEY = "YAHAN_APNI_GEMINI_API_KEY_PASTE_KARO";

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  const message = input.value.trim();
  if (!message) return;

  chatBox.innerHTML += `<div class="user">${message}</div>`;
  input.value = "";

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    let reply = "No response";

    if (data.candidates?.length) {
      reply = data.candidates[0].content.parts[0].text;
    } else if (data.error) {
      reply = "❌ " + data.error.message;
    }

    chatBox.innerHTML += `<div class="bot">${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    chatBox.innerHTML += `<div class="bot">❌ ${err.message}</div>`;
  }
}

document.getElementById("userInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});
