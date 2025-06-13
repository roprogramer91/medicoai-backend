const fs = require('fs');
const path = require('path');

// Función para leer la instrucción del JSON
function getSystemPrompt() {
  const filePath = path.join(__dirname, '..', 'instructions', 'adri_system_prompt.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(data);
  return json.system_prompt;
}

async function sendMessageToOpenAI(mensajeUsuario) {
  const systemPrompt = getSystemPrompt();

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o", // o el que quieras usar
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: mensajeUsuario }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error OpenAI:', errorText);
    throw new Error('Fallo la conexión con OpenAI');
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

module.exports = { sendMessageToOpenAI };
