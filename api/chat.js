export default async function handler(req, res) {
  const { system, messages } = req.body;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        system: system || '',
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // ICI : On renvoie l'erreur RÉELLE pour qu'on puisse la lire
      return res.status(200).json({ 
        content: [{ type: 'text', text: "🚨 ERREUR CLAUDE : " + JSON.stringify(data.error) }] 
      });
    }
    
    res.status(200).json({ content: [{ type: 'text', text: data.content[0].text }] });

  } catch (error) {
    res.status(200).json({ content: [{ type: 'text', text: "🚨 ERREUR SERVEUR : " + error.message }] });
  }
}
