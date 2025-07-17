import React from 'react';
import { useForm } from 'react-hook-form';
import styles from './ApiKeyInput.module.css';
import validateApiKey from '../../../netlify/utils/validations.js'; // Your validation function

const ApiKeyInput = ({ onApiKeySubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const key = data.apiKey?.trim();
    if (key) {
      onApiKeySubmit(key);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
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
        {...register('apiKey', {
          required: 'API Key is required',
          validate: (value) =>
            validateApiKey(value) || 'Invalid API key format',
        })}
        placeholder="Paste your Gemini API key here"
        className={styles.input}
      />
      {errors.apiKey && <p className={styles.error}>{errors.apiKey.message}</p>}

      <button type="submit" className={styles.button}>
        Submit API Key
      </button>
    </form>
  );
};

export default ApiKeyInput;
