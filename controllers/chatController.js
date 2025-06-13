const { sendMessageToOpenAI } = require('../services/openaiService');

async function chatWithGpt(req, res) {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Falta el mensaje del usuario' });
    }

    const respuesta = await sendMessageToOpenAI(message);
    res.json({ respuesta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar GPT' });
  }
}

module.exports = { chatWithGpt };
