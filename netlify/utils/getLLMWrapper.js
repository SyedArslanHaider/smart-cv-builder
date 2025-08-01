import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatTogetherAI } from '@langchain/community/chat_models/togetherai';

export default function getLLMWrapper({ provider, apiKey, temperature = 0.3 }) {
  switch (provider) {
    case 'OpenAI': {
      const model = 'gpt-4';
      return new ChatOpenAI({
        openAIApiKey: apiKey,
        modelName: model,
        temperature,
      });
    }

    case 'Claude': {
      const model = 'claude-3-sonnet-20240229';
      return new ChatAnthropic({
        anthropicApiKey: apiKey,
        modelName: model,
        temperature,
      });
    }

    case 'Gemini': {
      const model = 'gemini-1.5-flash';
      return new ChatGoogleGenerativeAI({
        apiKey,
        model,
        temperature: 0,
      });
    }
    case 'TogetherAI': {
      const model = 'mistralai/Mixtral-8x7B-Instruct-v0.1';
      return new ChatTogetherAI({
        togetherAIApiKey: apiKey,
        modelName: model,
        temperature,
      });
    }

    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
