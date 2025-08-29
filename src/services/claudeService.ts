// Anthropic Claude API service for EIP Explorer
// Using proxy approach - no direct SDK initialization in browser

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
  constructor() {
    console.log('✅ Claude service initialized - using proxy approach');
  }

  async generateResponse(
    messages: ChatMessage[], 
    currentEIP?: EIP | null
  ): Promise<string> {
    // Always use the proxy approach instead of direct API calls
    console.log('🚀 Using proxy approach for Claude API');
    console.log('🚀 Input messages:', messages);

    try {
      // Get the last user message
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.role !== 'user') {
        return "I'm here to help! What would you like to know about EIPs?";
      }

      const userQuery = lastMessage.content;
      console.log('🚀 Making Claude API call for:', userQuery);
      
      // Create a comprehensive system prompt
      const systemPrompt = this.createSystemPrompt(currentEIP);
      console.log('📝 System prompt created:', systemPrompt.substring(0, 100) + '...');
      
      // Convert messages to Claude format
      const claudeMessages = messages.slice(-5).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      }));
      console.log('💬 Messages to send:', claudeMessages);

      // Call Claude API through proxy to avoid CORS issues
      console.log('📡 Making fetch request to proxy...');
      const response = await fetch('/api/anthropic/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 2000,
          system: systemPrompt,
          messages: claudeMessages
        })
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('📡 Response data received:', responseData);
      
      console.log('🎉 Claude API response received successfully');

      // Extract the response content
      const responseContent = responseData.content[0];
      if (responseContent.type === 'text') {
        return responseContent.text;
      }

      return "I apologize, but I'm having trouble processing your request. Please try again.";
      
    } catch (error) {
      console.error('❌ Claude API error:', error);
      console.error('❌ Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      // Return helpful error message
      return "I'm experiencing some technical difficulties. Please try again in a moment.";
    }
  }

  private createSystemPrompt(currentEIP?: EIP | null): string {
    const basePrompt = `You are the EIP Explorer AI assistant. You help users with both casual conversation and deep technical knowledge about Ethereum Improvement Proposals (EIPs).

## Your Identity:
- You are the EIP Explorer assistant
- When introducing yourself, say: "Hi! I'm your EIP Explorer assistant. How can I help you?"
- Never mention being "Claude" or "created by Anthropic"
- You are specifically the EIP Explorer assistant

## Your Personality:
- Be warm, friendly, and conversational
- Show genuine interest in helping users
- Be approachable for both beginners and experts
- Use natural, professional language
- Be encouraging and supportive
- Keep responses clean and professional

## Your Expertise:
- Deep knowledge of Ethereum Improvement Proposals (EIPs)
- Understanding of blockchain technology and smart contracts
- Knowledge of DeFi, NFTs, scaling solutions, and more
- Ability to explain complex concepts in simple terms
- Up-to-date information on Ethereum ecosystem developments

## Conversation Style:
- Start conversations warmly and professionally
- Ask follow-up questions to better understand user needs
- Provide examples and analogies when explaining complex topics
- Be patient with beginners and detailed with experts
- Balance technical accuracy with accessibility
- Keep conversations focused and helpful

## When Discussing EIPs:
- Explain what each EIP does in clear language
- Share real-world use cases and examples
- Discuss implementation challenges and solutions
- Compare related EIPs and their differences
- Provide practical guidance for developers
- Share insights about adoption and impact

## Response Guidelines:
- Be conversational and natural
- Use **bold** for emphasis on important points
- Use \`code\` for technical terms and EIP numbers
- Use bullet points for lists when helpful
- Always be helpful and encouraging
- Keep responses professional and informative`;

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
      // Return basic summary when Claude API is not available
      return `## EIP-${eip.number}: ${eip.title}

**Status:** ${eip.status}  
**Category:** ${eip.category}  
**Type:** ${eip.type}  
**Authors:** ${eip.authors.join(', ')}  
**Created:** ${new Date(eip.created).toLocaleDateString()}

### Description
${eip.description}

This EIP is part of the Ethereum ecosystem and contributes to the platform's ongoing development.`;
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
      // Return basic summary on error
      return `## EIP-${eip.number}: ${eip.title}

**Status:** ${eip.status}  
**Category:** ${eip.category}  
**Type:** ${eip.type}  
**Authors:** ${eip.authors.join(', ')}  
**Created:** ${new Date(eip.created).toLocaleDateString()}

### Description
${eip.description}

This EIP is part of the Ethereum ecosystem and contributes to the platform's ongoing development.`;
    }
  }

  // Generate recommendations
  async generateRecommendations(): Promise<string> {
    if (!this.useClaude || !this.anthropic) {
      return "## 🔥 Trending EIP Categories\n\n### 🎨 **NFT Standards**\n- EIP-721: Non-Fungible Token Standard\n- EIP-1155: Multi Token Standard\n- EIP-2981: NFT Royalty Standard\n\n### 🔐 **Account Abstraction**\n- EIP-4337: Account Abstraction (ERC-4337)\n- EIP-7702: Set EOA account code\n- EIP-3074: AUTH and AUTHCALL opcodes\n\n### ⚡ **Scaling Solutions**\n- EIP-4844: Proto-Danksharding\n- EIP-1559: Fee market reform\n- EIP-4488: Calldata gas reduction\n\n### 💰 **DeFi Innovation**\n- EIP-20: ERC-20 Token Standard\n- EIP-2612: Permit for gasless approvals\n- EIP-3156: Flash Loan Standard\n\nThese are some of the most important and trending EIPs in the Ethereum ecosystem!";
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
      return "## 🔥 Trending EIP Categories\n\nHere are some of the most important EIPs in the Ethereum ecosystem!";
    }
  }
}

export const claudeService = new ClaudeService();

// Test function to verify the service is working
export const testClaudeService = async () => {
  console.log('🧪 Testing Claude service...');
  try {
    const response = await claudeService.generateResponse([
      { role: 'user', content: 'Hello test' }
    ]);
    console.log('🧪 Test response:', response);
    return response;
  } catch (error) {
    console.error('🧪 Test error:', error);
    return null;
  }
};
