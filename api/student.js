import { readFileSync } from 'fs';
import { join } from 'path';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing student ID' });

  try {
    const filePath = join(process.cwd(), 'students.json');
    const students = JSON.parse(readFileSync(filePath, 'utf-8'));
    const studentId = id.toLowerCase().trim();
    
    if (students[studentId]) {
      return res.status(200).json({ config: students[studentId] });
    }
    
    return res.status(404).json({ error: 'Élève non trouvé' });
  } catch (e) {
    console.error('Error reading students:', e);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}
