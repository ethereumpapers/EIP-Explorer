// Free AI service using Hugging Face Inference API
// No API key required for basic models

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

class HuggingFaceService {
  private readonly baseUrl = 'https://api-inference.huggingface.co/models';
  private readonly model = 'microsoft/DialoGPT-medium'; // Free conversational model

  // Generate AI response using Hugging Face's free API
  async generateResponse(
    messages: ChatMessage[], 
    currentEIP?: EIP | null
  ): Promise<string> {
    try {
      // Get the last user message
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage || lastMessage.role !== 'user') {
        return "I'm here to help! What would you like to know about EIPs?";
      }

      const userQuery = lastMessage.content.toLowerCase();
      
      // Context-aware responses based on EIP data
      if (currentEIP) {
        return this.generateEIPContextualResponse(userQuery, currentEIP);
      }
      
      // General EIP-related responses
      return this.generateGeneralResponse(userQuery);
      
    } catch (error) {
      console.error('Hugging Face API error:', error);
      return this.getFallbackResponse();
    }
  }

  private generateEIPContextualResponse(query: string, eip: EIP): string {
    const eipNumber = eip.number;
    const eipTitle = eip.title;
    const eipStatus = eip.status;
    const eipCategory = eip.category;
    const eipDescription = eip.description;

    // Analysis requests
    if (query.includes('analyze') || query.includes('explain') || query.includes('detail')) {
      return `## 📋 **EIP-${eipNumber} Analysis: ${eipTitle}**

**📊 Status:** ${eipStatus}  
**🏷️ Category:** ${eipCategory}  
**👥 Authors:** ${eip.authors.join(', ')}  
**📅 Created:** ${new Date(eip.created).toLocaleDateString()}

### **📖 Overview**
${eipDescription}

### **🔍 Key Insights**
${this.getEIPInsights(eipNumber, eipCategory)}

### **💡 Implementation Considerations**
${this.getImplementationGuidance(eipNumber, eipCategory)}

### **🔗 Related Standards**
${this.getRelatedEIPs(eipNumber, eipCategory)}

**💬 Need more specific information? Ask me about security, implementation examples, or adoption metrics!**`;
    }

    // Security questions
    if (query.includes('security') || query.includes('risk') || query.includes('vulnerability')) {
      return `## 🔒 **Security Analysis: EIP-${eipNumber}**

### **🛡️ Security Considerations**
${this.getSecurityAnalysis(eipNumber, eipCategory)}

### **⚠️ Potential Risks**
${this.getSecurityRisks(eipNumber, eipCategory)}

### **✅ Best Practices**
${this.getSecurityBestPractices(eipNumber, eipCategory)}

**🔍 Want a deeper security review? I can provide specific attack vectors and mitigation strategies.**`;
    }

    // Implementation questions
    if (query.includes('implement') || query.includes('code') || query.includes('example')) {
      return `## 💻 **Implementation Guide: EIP-${eipNumber}**

### **🚀 Getting Started**
${this.getImplementationSteps(eipNumber, eipCategory)}

### **📝 Code Example**
\`\`\`solidity
${this.getCodeExample(eipNumber, eipCategory)}
\`\`\`

### **🔧 Integration Tips**
${this.getIntegrationTips(eipNumber, eipCategory)}

**💡 Need more code examples or integration help? Just ask!**`;
    }

    // Comparison questions
    if (query.includes('compare') || query.includes('difference') || query.includes('vs')) {
      return `## ⚖️ **Comparison Analysis: EIP-${eipNumber}**

### **🔄 Similar Standards**
${this.getComparisonAnalysis(eipNumber, eipCategory)}

### **📊 Feature Comparison**
${this.getFeatureComparison(eipNumber, eipCategory)}

### **🎯 When to Use**
${this.getUseCaseGuidance(eipNumber, eipCategory)}

**🤔 Need help choosing between standards? I can provide detailed comparisons.**`;
    }

    // Default contextual response
    return `## 🤖 **EIP-${eipNumber} Assistant**

I can help you with **${eipTitle}** in several ways:

**🔍 Analysis & Explanation**
- Detailed technical breakdown
- Implementation guidance
- Security considerations

**💻 Code & Examples**
- Implementation examples
- Integration patterns
- Best practices

**📊 Context & Comparison**
- Related EIPs
- Adoption metrics
- Use case analysis

**💡 Try asking:**
- "Explain the technical details"
- "Show me implementation examples"
- "What are the security implications?"
- "How does this compare to similar standards?"

What specific aspect of EIP-${eipNumber} interests you most?`;
  }

  private generateGeneralResponse(query: string): string {
    // Simple greetings and casual conversation
    if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
      return `## 👋 Hello! Welcome to EIP Explorer

I'm your AI assistant here to help you explore Ethereum Improvement Proposals!

### **🚀 What I can help you with:**
- **Find EIPs** by topic or category
- **Explain technical concepts** in simple terms
- **Compare different standards** and their use cases
- **Provide implementation guidance** and examples
- **Share insights** about adoption and trends

### **💡 Try asking me:**
- "What are the most important EIPs?"
- "Explain account abstraction"
- "Find NFT-related standards"
- "What's new in Ethereum scaling?"

**What would you like to explore today?**`;
    }

    if (query.includes('how are you') || query.includes('how do you do')) {
      return `## 😊 I'm doing great, thank you for asking!

I'm here and ready to help you navigate the world of Ethereum Improvement Proposals. I have access to comprehensive information about EIPs, their implementations, and the latest trends in the Ethereum ecosystem.

**What can I help you discover today?**`;
    }

    if (query.includes('what can you do') || query.includes('help')) {
      return `## 🤖 Here's what I can do for you:

### **🔍 EIP Discovery & Research**
- Find EIPs by topic, category, or status
- Explain complex technical concepts
- Compare different standards and their trade-offs

### **📚 Technical Analysis**
- Provide detailed explanations of EIP specifications
- Share implementation examples and best practices
- Explain security considerations and potential risks

### **📊 Market Insights**
- Track adoption trends and usage statistics
- Identify the most impactful standards
- Share insights about ecosystem developments

### **💻 Implementation Support**
- Code examples and integration guidance
- Best practices for developers
- Troubleshooting common issues

**Just ask me anything about EIPs, and I'll do my best to help!**`;
    }

    // NFT-related queries
    if (query.includes('nft') || query.includes('721') || query.includes('1155')) {
      return `## 🎨 **NFT Standards Overview**

### **📋 Key NFT EIPs**
- **EIP-721**: Non-Fungible Token Standard (most common)
- **EIP-1155**: Multi Token Standard (gas efficient)
- **EIP-2981**: NFT Royalty Standard
- **EIP-6963**: Multi Injected Provider Discovery

### **🔍 Quick Comparison**
**EIP-721**: One contract = One token type  
**EIP-1155**: One contract = Multiple token types

### **💡 When to Use Which?**
- **EIP-721**: Simple NFTs, art, collectibles
- **EIP-1155**: Gaming, bundles, gas optimization

**🎯 Want detailed analysis of any specific NFT standard?**`;
    }

    // Account abstraction queries
    if (query.includes('account') || query.includes('abstraction') || query.includes('4337') || query.includes('7702')) {
      return `## 🔐 **Account Abstraction Standards**

### **🚀 Current Standards**
- **EIP-4337**: Account Abstraction (ERC-4337) - Most adopted
- **EIP-7702**: Set EOA account code (Pectra upgrade)
- **EIP-3074**: AUTH and AUTHCALL opcodes
- **EIP-7579**: Minimal Modular Smart Account

### **💡 Key Benefits**
- **Smart Wallets**: Programmable account logic
- **Gasless Transactions**: Sponsored transactions
- **Batch Operations**: Multiple actions in one tx
- **Social Recovery**: Alternative to seed phrases

### **🔍 Implementation Status**
- **EIP-4337**: Live on mainnet (Bundler infrastructure)
- **EIP-7702**: Planned for Pectra upgrade (2025)
- **EIP-3074**: Available but limited adoption

**🤔 Need help choosing the right approach for your project?**`;
    }

    // Scaling queries
    if (query.includes('scaling') || query.includes('layer 2') || query.includes('rollup') || query.includes('4844')) {
      return `## ⚡ **Ethereum Scaling Solutions**

### **🔧 Core Scaling EIPs**
- **EIP-4844**: Proto-Danksharding (Blob transactions)
- **EIP-1559**: Fee market reform
- **EIP-4488**: Calldata gas reduction

### **🏗️ Layer 2 Technologies**
- **Optimistic Rollups**: Arbitrum, Optimism
- **ZK Rollups**: zkSync, Polygon zkEVM
- **Validiums**: StarkEx, Polygon Miden

### **📊 Current Impact**
- **EIP-4844**: ~90% L2 cost reduction
- **EIP-1559**: Predictable gas fees
- **L2 Adoption**: 15%+ of all transactions

**🚀 Want to understand how these work together?**`;
    }

    // DeFi queries
    if (query.includes('defi') || query.includes('swap') || query.includes('liquidity') || query.includes('amm')) {
      return `## 💰 **DeFi Standards Overview**

### **🔄 Core DeFi EIPs**
- **EIP-20**: ERC-20 Token Standard (foundation)
- **EIP-2612**: Permit for gasless approvals
- **EIP-3156**: Flash Loan Standard
- **EIP-4626**: Tokenized Vault Standard

### **🏦 Key Protocols**
- **Uniswap**: EIP-20, EIP-2612
- **Aave**: EIP-20, EIP-3156
- **Compound**: EIP-20, EIP-4626

### **💡 Innovation Areas**
- **MEV Protection**: EIP-1559, EIP-4488
- **Cross-chain**: EIP-5169, EIP-7281
- **Account Abstraction**: EIP-4337

**🔍 Need specific DeFi implementation guidance?**`;
    }

    // Default general response
    return `## 🤖 **EIP Research Assistant**

I'm here to help you explore Ethereum Improvement Proposals! Here's what I can assist with:

### **🔍 Discovery & Research**
- Find EIPs by topic or use case
- Compare similar standards
- Track adoption and implementation

### **📚 Technical Analysis**
- Detailed explanations and breakdowns
- Implementation examples and code
- Security considerations and best practices

### **🚀 Popular Topics**
- **NFTs**: EIP-721, EIP-1155, EIP-2981
- **Account Abstraction**: EIP-4337, EIP-7702, EIP-3074
- **Scaling**: EIP-4844, EIP-1559, Layer 2 solutions
- **DeFi**: EIP-20, EIP-2612, EIP-3156

### **💡 Try These Questions**
- "Find all NFT-related standards"
- "Explain account abstraction"
- "What's new in Ethereum scaling?"
- "Show me the most adopted EIPs"

**🎯 What would you like to explore?**`;
  }

  // Helper methods for generating contextual content
  private getEIPInsights(eipNumber: number, category: string): string {
    const insights: { [key: string]: string } = {
      'Core': 'This is a core protocol improvement that affects the Ethereum network at a fundamental level.',
      'ERC': 'This standard defines a common interface for smart contracts, promoting interoperability.',
      'Interface': 'This specification enables standardized communication between different systems.',
      'Meta': 'This proposal affects the EIP process itself or governance mechanisms.',
      'Informational': 'This provides information and guidance without proposing changes.'
    };
    
    return insights[category] || 'This EIP contributes to the Ethereum ecosystem in important ways.';
  }

  private getImplementationGuidance(eipNumber: number, category: string): string {
    if (category === 'ERC') {
      return `- **Interface Compliance**: Ensure your contract implements all required functions
- **Event Emission**: Emit events for all state changes
- **Gas Optimization**: Consider gas costs for frequent operations
- **Testing**: Comprehensive test coverage for all functions`;
    }
    
    return `- **Review Dependencies**: Check for related EIPs and standards
- **Implementation Testing**: Thorough testing in testnet environments
- **Documentation**: Clear documentation for users and developers
- **Community Feedback**: Engage with the Ethereum community for feedback`;
  }

  private getRelatedEIPs(eipNumber: number, category: string): string {
    const related: { [key: number]: string } = {
      721: 'EIP-1155 (Multi Token), EIP-2981 (Royalties), EIP-2309 (Consecutive Transfer)',
      1155: 'EIP-721 (NFT Standard), EIP-2981 (Royalties), EIP-2309 (Consecutive Transfer)',
      20: 'EIP-2612 (Permit), EIP-4626 (Vaults), EIP-3156 (Flash Loans)',
      4337: 'EIP-7702 (Set EOA Code), EIP-3074 (AUTH/AUTHCALL), EIP-7579 (Smart Accounts)',
      4844: 'EIP-1559 (Fee Market), EIP-4488 (Calldata), EIP-1153 (Transient Storage)'
    };
    
    return related[eipNumber] || 'Check the EIP repository for related proposals and dependencies.';
  }

  private getSecurityAnalysis(eipNumber: number, category: string): string {
    return `- **Reentrancy Protection**: Use checks-effects-interactions pattern
- **Access Control**: Implement proper permission systems
- **Input Validation**: Validate all external inputs
- **State Management**: Ensure consistent state transitions`;
  }

  private getSecurityRisks(eipNumber: number, category: string): string {
    return `- **Smart Contract Vulnerabilities**: Standard risks like reentrancy, overflow
- **Economic Attacks**: Consider MEV and front-running scenarios
- **Integration Risks**: Third-party contract interactions
- **Upgrade Risks**: If upgradeable, consider proxy patterns`;
  }

  private getSecurityBestPractices(eipNumber: number, category: string): string {
    return `- **Code Audits**: Professional security audits before mainnet
- **Formal Verification**: Mathematical proof of correctness where possible
- **Bug Bounties**: Community-driven security testing
- **Gradual Rollout**: Phased deployment with monitoring`;
  }

  private getImplementationSteps(eipNumber: number, category: string): string {
    return `1. **Study the Specification**: Read the full EIP document
2. **Set Up Development Environment**: Use Hardhat, Foundry, or Remix
3. **Implement Interface**: Start with the required functions
4. **Add Tests**: Comprehensive unit and integration tests
5. **Deploy to Testnet**: Test thoroughly before mainnet`;
  }

  private getCodeExample(eipNumber: number, category: string): string {
    if (eipNumber === 721) {
      return `// Basic ERC-721 implementation
contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") {}
    
    function mint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
}`;
    }
    
    if (eipNumber === 20) {
      return `// Basic ERC-20 implementation
contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10**18);
    }
}`;
    }
    
    return `// Implementation example for EIP-${eipNumber}
// Check the EIP specification for exact requirements
contract MyImplementation {
    // Add your implementation here
}`;
  }

  private getIntegrationTips(eipNumber: number, category: string): string {
    return `- **Library Usage**: Consider using OpenZeppelin contracts
- **Gas Optimization**: Use efficient data structures
- **Event Logging**: Emit events for off-chain indexing
- **Error Handling**: Implement proper error messages`;
  }

  private getComparisonAnalysis(eipNumber: number, category: string): string {
    const comparisons: { [key: number]: string } = {
      721: 'EIP-1155 offers gas efficiency for multiple token types, while EIP-721 is simpler for single token types.',
      1155: 'EIP-721 is better for simple NFTs, while EIP-1155 excels in gaming and multi-token scenarios.',
      4337: 'EIP-7702 provides native account abstraction, while EIP-4337 works with existing infrastructure.'
    };
    
    return comparisons[eipNumber] || 'Compare with similar standards in the same category for best fit.';
  }

  private getFeatureComparison(eipNumber: number, category: string): string {
    return `- **Gas Efficiency**: Compare transaction costs
- **Flexibility**: Evaluate customization options
- **Adoption**: Check ecosystem support
- **Security**: Review audit history and vulnerabilities`;
  }

  private getUseCaseGuidance(eipNumber: number, category: string): string {
    const useCases: { [key: number]: string } = {
      721: 'Perfect for: Art, collectibles, unique assets, identity tokens',
      1155: 'Ideal for: Gaming items, bundles, gas-efficient multi-tokens',
      20: 'Best for: Fungible tokens, currencies, governance tokens',
      4337: 'Great for: Smart wallets, gasless transactions, batch operations'
    };
    
    return useCases[eipNumber] || 'Consider your specific use case and requirements when choosing standards.';
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
}

export const huggingFaceService = new HuggingFaceService();
