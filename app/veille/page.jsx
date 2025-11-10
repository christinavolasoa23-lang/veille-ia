'use client';
import { useState } from 'react';

export default function VeillePage() {
  const [keyword, setKeyword] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ keyword }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Créer une veille avec l'IA</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tape un mot-clé ex: cybersécurité"
          style={{ width: '300px', padding: '8px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '8px' }}>
          Lancer
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Résultat de la veille :</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}
