'use client';

import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch (error) {
      setResult("Erreur lors de la génération de la veille.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Créer une veille avec l'IA</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Mot-clé (ex : cybersécurité)"
          style={{ padding: '0.5rem', width: '300px' }}
          required
        />
        <button
          type="submit"
          style={{
            marginLeft: '1rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
          }}
        >
          {loading ? 'Chargement...' : 'Lancer'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
          <h2>Résultat de la veille :</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
