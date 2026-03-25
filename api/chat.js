export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { system, messages } = req.body;

  // Filtrage strict pour Claude : seulement les messages 'user' et 'assistant'
  const cleanMessages = (messages || [])
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({
      role: m.role,
      content: m.content
    }));

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 4000,
        system: system || '',
        messages: cleanMessages
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erreur API Anthropic:', data);
      return res.status(response.status).json({ 
        error: data.error?.message || 'Erreur API Anthropic',
        details: data
      });
    }
    
    if (data.content && data.content.length > 0) {
      const aiText = data.content[0].text;
      return res.status(200).json({ 
        content: [{ type: 'text', text: aiText }] 
      });
    }

    throw new Error('Réponse vide de l\'IA');

  } catch (error) {
    console.error('Erreur technique:', error);
    res.status(500).json({ error: 'Erreur technique interne', message: error.message });
  }
}
