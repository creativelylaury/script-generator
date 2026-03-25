export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { system, messages } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620', // Le modèle le plus puissant actuellement
        max_tokens: 2000,
        system: system, // Claude prend le system prompt à part
        messages: messages
      }),
    });

    const data = await response.json();
    
    // On adapte la réponse pour ton App.jsx
    const aiText = data.content[0].text;
    res.status(200).json({ 
      content: [{ type: 'text', text: aiText }] 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur Anthropic' });
  }
}
