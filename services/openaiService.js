const fs = require('fs');
const path = require('path');

// Función para leer la instrucción del JSON según perfil
function getSystemPrompt(perfil = "general") {
  const filePath = path.join(__dirname, '..', 'instructions', 'system_prompts.json');
  const data = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(data);

  // Si el perfil existe, lo usa. Si no, usa el general
  return (json.system_prompts && json.system_prompts[perfil]) 
    ? json.system_prompts[perfil] 
    : json.system_prompts["general"];
}

// mensajeUsuario: texto del usuario
// perfilPrompt: string, ej "adriana", "general", "traumatologia"
async function sendMessageToOpenAI(mensajeUsuario, perfilPrompt = "general") {
  const systemPrompt = getSystemPrompt(perfilPrompt);

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
