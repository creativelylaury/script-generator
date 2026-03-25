export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { system, messages } = req.body;

  // Claude ne veut que les rôles 'user' et 'assistant' dans le tableau messages
  const cleanMessages = messages.map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: m.content
  }));

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 4000,
        system: system, // Le prompt Square Motion va ici
        messages: cleanMessages
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Erreur Anthropic:', data.error);
      return res.status(500).json({ error: data.error.message });
    }
    
    const aiText = data.content[0].text;
    res.status(200).json({ 
      content: [{ type: 'text', text: aiText }] 
    });

  } catch (error) {
    res.status(500).json({ error: 'Erreur technique' });
  }
}
