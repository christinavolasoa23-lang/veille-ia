const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { keyword } = req.body;

  const prompt = `Fais une veille structurée sur le sujet : "${keyword}".
- Résume le sujet
- Donne 3 sources fiables (titre + URL)
- Donne un indice de confiance pour chaque source (entre 0 et 100)
Réponds de manière claire et professionnelle.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('Erreur OpenAI :', error);
    res.status(500).json({ result: 'Erreur lors de la génération de la veille.' });
  }
}

