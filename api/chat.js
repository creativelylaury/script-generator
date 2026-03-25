export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { system, messages } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Ta clé sera ici
      },
      body: JSON.stringify({
        model: 'gpt-4', // Ou ton modèle préféré
        messages: [
          { role: 'system', content: system },
          ...messages
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    
    // On formate la réponse pour qu'elle corresponde à ce que ton App.jsx attend
    const aiText = data.choices[0].message.content;
    res.status(200).json({ 
      content: [{ type: 'text', text: aiText }] 
    });

  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l appel à l IA' });
  }
}
