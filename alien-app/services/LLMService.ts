import { API_KEY } from '@env';

interface LLMResponse {
  text: string;
  error?: string;
}

export class LLMService {
  private static instance: LLMService;
  private apiKey: string | undefined;

  private constructor() {
    this.apiKey = API_KEY;
    if (!this.apiKey) {
      console.warn('API_KEY not found in environment variables. Make sure to set it in your .env file.');
    }
  }

  public static getInstance(): LLMService {
    if (!LLMService.instance) {
      LLMService.instance = new LLMService();
    }
    return LLMService.instance;
  }

  private buildPrompt(query: string): string {
    return `You are an expert on immigration processes and visa requirements. 
    Please provide detailed information about ${query}.
    Focus on:
    1. Required documents
    2. Application steps
    3. Important deadlines
    4. Contact information
    5. Prerequisites
    
    Format your response in a clear, structured way that can be easily parsed.`;
  }

  public async query(input: string): Promise<LLMResponse> {
    try {
      if (!this.apiKey) {
        return {
          text: '',
          error: 'OpenAI API key not configured. Please add your API key to the .env file.'
        };
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert immigration advisor specializing in student visas.'
            },
            {
              role: 'user',
              content: this.buildPrompt(input)
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to get response from LLM');
      }

      const data = await response.json();
      return {
        text: data.choices[0].message.content
      };
    } catch (error) {
      console.error('LLM query failed:', error);
      return {
        text: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
} 