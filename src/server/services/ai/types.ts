export interface AIProvider {
  name: string;
  models: string[];
  generateText(prompt: string, model?: string): Promise<string>;
  generateImage(prompt: string): Promise<string>;
}