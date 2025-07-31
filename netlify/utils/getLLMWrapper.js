import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Runnable } from '@langchain/core/runnables';

export default function getLLMWrapper({ provider, apiKey, temperature = 0.3 }) {
  let model;

  switch (provider) {
    case 'OpenAI':
      model = 'gpt-4';
      return new ChatOpenAI({
        openAIApiKey: apiKey,
        modelName: model,
        temperature,
      });

    case 'Claude':
      model = 'claude-3-sonnet-20240229';
      return new ChatAnthropic({
        anthropicApiKey: apiKey,
        modelName: model,
        temperature,
      });

    case 'Gemini': {
      model = 'gemini-1.5-flash';
      const genAI = new GoogleGenerativeAI(apiKey);
      const geminiModel = genAI.getGenerativeModel({ model });

      return Runnable.from(async (messages) => {
        const prompt = messages.map((msg) => msg.content).join('\n');

        const result = await geminiModel.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        });

        return {
          content: result.response.text(),
        };
      });
    }

    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}
