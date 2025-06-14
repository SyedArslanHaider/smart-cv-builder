import React, { useState } from 'react';
import styles from '../ApiKeyInput/ApiKeyInput.module.css';
import validateApiKey from './validation.js';

const ApiKeyInput = ({ data, onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState(data || '');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!apiKey.trim()) {
      setError('API key is required.');
      return;
    }

    if (!validateApiKey(apiKey)) {
      setError('Invalid API key format.');
      return;
    }

    setError('');
    onApiKeySubmit(apiKey);
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Connect Your Gemini API Key</h2>

      <ol className={styles.instructions}>
        <li>
          Go to{' '}
          <a
            href="https://makersuite.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            makersuite.google.com/apikey
          </a>
        </li>
        <li>Sign in with your Google account.</li>
        <li>Click "Generate API key".</li>
        <li>Copy the key and paste it below.</li>
      </ol>

      <input
        type="text"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Paste your Gemini API key here"
        className={styles.input}
      />

      {error && <p className={styles.error}>{error}</p>}

      <button type="button" onClick={handleSubmit} className={styles.button}>
        Submit API Key
      </button>
    </div>
  );
};

export default ApiKeyInput;
