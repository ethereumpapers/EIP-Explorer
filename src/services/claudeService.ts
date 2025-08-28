// Anthropic Claude API service for EIP Explorer
import Anthropic from '@anthropic-ai/sdk';
import { huggingFaceService } from './huggingFaceService';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface EIP {
  number: number;
  title: string;
  status: string;
  category: string;
  description: string;
  authors: string[];
  created: string;
  type: string;
}

class ClaudeService {
  private anthropic: Anthropic | null = null;
  private useClaude: boolean = false;

  constructor() {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    if (apiKey) {
      this.anthropic = new Anthropic({
        apiKey: apiKey,
      });
      this.useClaude = true;
    } else {
      console.log('Anthropic API key not found. Using fallback service.');
      this.useClaude = false;
    }
  }

  async generateResponse(
    messages: ChatMessage[], 
    currentEIP?: EIP | null
  ): Promise<string> {
    if (!this.useClaude || !this.anthropic) {
      // Fallback to Hugging Face service
      return await huggingFaceService.generateResponse(messages, currentEIP);
    }

    try {
      // Get the last user message
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.role !== 'user') {
        return "I'm here to help! What would you like to know about EIPs?";
      }

      const userQuery = lastMessage.content;
      
      // Create a comprehensive system prompt
      const systemPrompt = this.createSystemPrompt(currentEIP);
      
      // Convert messages to Claude format
      const claudeMessages = messages.slice(-5).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));

      // Call Claude API
      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        system: systemPrompt,
        messages: claudeMessages
      });

      // Extract the response content
      const responseContent = response.content[0];
      if (responseContent.type === 'text') {
        return responseContent.text;
      }

      return "I apologize, but I'm having trouble processing your request. Please try again.";
      
    } catch (error) {
      console.error('Claude API error:', error);
      // Fallback to Hugging Face service on error
      return await huggingFaceService.generateResponse(messages, currentEIP);
    }
  }

  private createSystemPrompt(currentEIP?: EIP | null): string {
    const basePrompt = `You are an expert AI assistant for the EIP Explorer, a comprehensive platform for exploring Ethereum Improvement Proposals (EIPs). You help users understand, analyze, and navigate the world of Ethereum standards.

## Your Role:
- Provide accurate, detailed information about EIPs
- Explain complex technical concepts in accessible terms
- Help users find relevant EIPs for their needs
- Offer implementation guidance and best practices
- Share insights about adoption trends and ecosystem impact

## Response Guidelines:
- Use clear, professional language
- Structure responses with headers, bullet points, and code examples when relevant
- Include emojis sparingly for better readability
- Provide actionable insights and next steps
- Be conversational but informative
- Always be helpful and encouraging

## Formatting:
- Use ## for main headers
- Use ### for subheaders
- Use **bold** for emphasis
- Use \`code\` for technical terms
- Use bullet points for lists
- Use emojis like ✅ ❌ ⚠️ 🔍 💡 🚀 for visual cues`;

    if (currentEIP) {
      return `${basePrompt}

## Current Context:
The user is currently viewing EIP-${currentEIP.number}: "${currentEIP.title}"
- Status: ${currentEIP.status}
- Category: ${currentEIP.category}
- Type: ${currentEIP.type}
- Authors: ${currentEIP.authors.join(', ')}
- Created: ${new Date(currentEIP.created).toLocaleDateString()}
- Description: ${currentEIP.description}

When responding, consider this EIP context and provide relevant insights, comparisons, and implementation guidance specific to EIP-${currentEIP.number}.`;
    }

    return basePrompt;
  }

  private getFallbackResponse(): string {
    const fallbacks = [
      "I'm experiencing some technical difficulties, but I'm still here to help! Try asking about specific EIPs or topics.",
      "Let me help you explore EIPs! What specific standard or topic interests you?",
      "I'm ready to assist with EIP research! What would you like to know?",
      "Having a small hiccup, but I can still help! Ask me about NFTs, DeFi, scaling, or any EIP topic."
    ];
    
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // Generate AI summary for EIPs
  async generateEIPSummary(eip: EIP): Promise<string> {
    if (!this.useClaude || !this.anthropic) {
      // Fallback to Hugging Face service
      return await huggingFaceService.generateResponse([
        { role: 'user', content: `Generate a comprehensive summary for EIP-${eip.number}: ${eip.title}` }
      ], eip);
    }

    try {
      const prompt = `Generate a comprehensive, engaging summary for EIP-${eip.number}: "${eip.title}".

Please provide:
1. A clear overview of what this EIP does
2. Key technical details and specifications
3. Real-world use cases and applications
4. Implementation considerations
5. Security aspects and best practices
6. Related EIPs and dependencies
7. Current adoption status and trends

Make it accessible to both technical and non-technical audiences. Use clear headers, bullet points, and include relevant emojis for better readability.`;

      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const responseContent = response.content[0];
      if (responseContent.type === 'text') {
        return responseContent.text;
      }

      return "Unable to generate summary at this time. Please try again later.";
      
    } catch (error) {
      console.error('Claude summary error:', error);
      // Fallback to Hugging Face service
      return await huggingFaceService.generateResponse([
        { role: 'user', content: `Generate a comprehensive summary for EIP-${eip.number}: ${eip.title}` }
      ], eip);
    }
  }

  // Generate recommendations
  async generateRecommendations(): Promise<string> {
    if (!this.useClaude || !this.anthropic) {
      return "Using fallback recommendations";
    }

    try {
      const prompt = `Generate AI-powered EIP recommendations for the EIP Explorer homepage. 

Create 4-5 categories of trending and important EIPs with:
1. Category title and description
2. 3-4 relevant EIP numbers
3. Brief explanation of why this category is trending
4. Use emojis and engaging language

Focus on current trends like:
- Account Abstraction (EIP-4337, EIP-7702, etc.)
- NFT Standards (EIP-721, EIP-1155, EIP-2981)
- Scaling Solutions (EIP-4844, EIP-1559)
- DeFi Innovation (EIP-20, EIP-2612, EIP-3156)
- Developer Tools and UX improvements

Format as structured data that can be easily parsed.`;

      const response = await this.anthropic.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      const responseContent = response.content[0];
      if (responseContent.type === 'text') {
        return responseContent.text;
      }

      return "Unable to generate recommendations at this time.";
      
    } catch (error) {
      console.error('Claude recommendations error:', error);
      return "Using fallback recommendations";
    }
  }
}

export const claudeService = new ClaudeService();
