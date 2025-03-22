import { LLMService } from './LLMService';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
  relevance: number;
}

export class WebSearchService {
  private llmService: LLMService;

  constructor() {
    this.llmService = LLMService.getInstance();
  }

  private async performSearch(query: string): Promise<SearchResult[]> {
    try {
      console.log('Querying LLM for:', query);
      
      const llmResponse = await this.llmService.query(query);
      
      if (llmResponse.error) {
        throw new Error(llmResponse.error);
      }

      // Convert LLM response into SearchResult format
      const result: SearchResult = {
        title: query,
        url: 'generated-by-llm',
        snippet: llmResponse.text,
        source: 'LLM',
        relevance: 1.0
      };

      console.log('LLM results:', JSON.stringify([result], null, 2));
      return [result];
    } catch (error) {
      console.error('LLM query failed:', error);
      throw error;
    }
  }

  public async searchWithRetry(query: string, maxRetries: number = 3): Promise<SearchResult[]> {
    let retries = 0;
    let lastError: Error | null = null;

    while (retries < maxRetries) {
      try {
        const results = await this.performSearch(query);
        if (results.length > 0) {
          return results;
        }
        console.warn(`Search attempt ${retries + 1} returned no results`);
      } catch (error) {
        lastError = error as Error;
        console.error(`Search attempt ${retries + 1} failed:`, error);
      }
      retries++;
      if (retries < maxRetries) {
        const delay = 1000 * retries;
        console.log(`Waiting ${delay}ms before retry ${retries + 1}...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    if (lastError) {
      throw lastError;
    }
    return [];
  }

  public async searchMultipleQueries(queries: string[]): Promise<SearchResult[]> {
    console.log('Searching multiple queries:', queries);
    
    const results = await Promise.allSettled(
      queries.map(query => this.searchWithRetry(query))
    );

    const successfulResults = results
      .filter((result): result is PromiseFulfilledResult<SearchResult[]> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value)
      .flat();

    console.log(`Got ${successfulResults.length} total results from ${queries.length} queries`);

    // Remove duplicates based on URL
    const uniqueResults = Array.from(
      new Map(
        successfulResults.map(result => [result.url, result])
      ).values()
    );

    // Sort by relevance
    return uniqueResults.sort((a, b) => b.relevance - a.relevance);
  }
} 