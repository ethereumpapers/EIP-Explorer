interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
}

class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor() {
    // In production, this should be handled securely via environment variables
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  }

  async generateResponse(messages: ChatMessage[], eipContext?: any): Promise<string> {
    if (!this.apiKey) {
      console.warn('OpenAI API key not configured, using enhanced mock responses');
      return this.generateEnhancedMockResponse(messages[messages.length - 1].content, eipContext);
    }

    try {
      const systemPrompt = this.buildSystemPrompt(eipContext);
      const fullMessages = [
        { role: 'system' as const, content: systemPrompt },
        ...messages
      ];

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: fullMessages,
          max_tokens: 1500,
          temperature: 0.7,
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data: OpenAIResponse = await response.json();
      return data.choices[0]?.message?.content || 'I apologize, but I encountered an issue generating a response.';
    } catch (error) {
      console.error('OpenAI API error:', error);
      return this.generateEnhancedMockResponse(messages[messages.length - 1].content, eipContext);
    }
  }

  private buildSystemPrompt(eipContext?: any): string {
    const basePrompt = `You are an advanced EIP (Ethereum Improvement Proposal) research assistant with comprehensive knowledge of Ethereum standards and protocols. You provide detailed, accurate, and helpful information about EIPs, their implementations, and the broader Ethereum ecosystem.

Key capabilities:
- Deep technical analysis of EIP specifications
- Implementation guidance and best practices
- Security considerations and risk assessments
- Real-world usage examples and case studies
- Comparison between different EIPs and standards
- Market insights and adoption metrics
- Developer resources and tools

Communication style:
- Professional yet approachable
- Detailed but accessible explanations
- Use examples and analogies when helpful
- Provide actionable insights
- Structure responses with clear headings and bullet points
- Include relevant links and resources when appropriate`;

    if (eipContext) {
      return `${basePrompt}

Current EIP Context:
- EIP Number: ${eipContext.number}
- Title: ${eipContext.title}
- Status: ${eipContext.status}
- Type: ${eipContext.type}
- Category: ${eipContext.category || 'N/A'}
- Description: ${eipContext.description}

Use this context to provide specific, relevant information about this EIP when answering questions.`;
    }

    return basePrompt;
  }

  private async generateEnhancedMockResponse(userMessage: string, eipContext?: any): Promise<string> {
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

    const message = userMessage.toLowerCase();
    
    // Enhanced pattern matching for more comprehensive responses
    const eipNumberMatch = message.match(/eip[- ]?(\d+)/);
    const eipNumber = eipNumberMatch ? parseInt(eipNumberMatch[1]) : null;
    
    // Advanced response patterns with ChatGPT-like quality
    if (message.includes('comprehensive') || message.includes('detailed') || message.includes('analysis') || message.includes('analyze')) {
      if (eipContext) {
        return `# 📋 Comprehensive Analysis: EIP-${eipContext.number}

## 🎯 **Executive Summary**
**${eipContext.title}** represents a ${eipContext.type.toLowerCase()} proposal currently in **${eipContext.status}** status. This EIP addresses critical aspects of Ethereum's ${eipContext.category || 'core'} infrastructure and has significant implications for the ecosystem.

## 📖 **Technical Deep Dive**
${eipContext.description}

### **Key Technical Components:**
- **Specification Type:** ${eipContext.type}
- **Implementation Scope:** ${eipContext.category || 'Protocol-level changes'}
- **Current Status:** ${eipContext.status}
- **Development Stage:** ${this.getStatusDescription(eipContext.status)}

## 🏗️ **Implementation Considerations**

### **For Developers:**
- **Integration Complexity:** ${this.getComplexityLevel(eipContext.category)}
- **Breaking Changes:** ${eipContext.status === 'Final' ? 'Stable API' : 'Potential changes expected'}
- **Testing Requirements:** Comprehensive unit and integration testing recommended

### **For Projects:**
- **Adoption Timeline:** ${this.getAdoptionTimeline(eipContext.status)}
- **Resource Requirements:** ${this.getResourceRequirements(eipContext.type)}
- **Risk Assessment:** ${this.getRiskLevel(eipContext.status)}

## 🔍 **Market Impact & Adoption**
${this.getMarketAnalysis(eipContext.number)}

## 💡 **Strategic Recommendations**
${this.getRecommendations(eipContext.status, eipContext.type)}

## 🔗 **Related Standards & Dependencies**
This EIP operates within the broader Ethereum standards ecosystem. Consider reviewing related EIPs for comprehensive implementation.

**Want to explore specific aspects?** Ask me about:
- Implementation examples and code samples
- Security considerations and audit guidelines
- Integration patterns with existing systems
- Performance implications and optimizations`;
      }
      return "I'd love to provide a comprehensive analysis! Please specify which EIP you'd like me to analyze, or if you're viewing an EIP page, I can provide detailed insights about that specific standard.";
    }

    if (message.includes('security') || message.includes('risk') || message.includes('vulnerability')) {
      if (eipContext) {
        return `# 🔒 Security Analysis: EIP-${eipContext.number}

## ⚠️ **Security Risk Assessment**

### **Implementation Risks**
- **Smart Contract Security:** ${this.getSecurityRisks(eipContext.category)}
- **Protocol-Level Risks:** ${this.getProtocolRisks(eipContext.type)}
- **Integration Vulnerabilities:** Cross-contract interaction security considerations

### **Attack Vectors & Mitigations**
${this.getAttackVectors(eipContext.category)}

## 🛡️ **Security Best Practices**

### **Development Phase**
✅ **Code Review:** Multi-party security review process
✅ **Static Analysis:** Automated vulnerability scanning
✅ **Formal Verification:** Mathematical proof of correctness where applicable

### **Testing Phase**
✅ **Unit Testing:** Comprehensive edge case coverage
✅ **Integration Testing:** Cross-system compatibility verification
✅ **Stress Testing:** High-load scenario validation

### **Deployment Phase**
✅ **Gradual Rollout:** Phased deployment strategy
✅ **Monitoring:** Real-time security monitoring
✅ **Emergency Procedures:** Incident response protocols

## 📊 **Risk Matrix**
- **Likelihood:** ${this.getRiskLikelihood(eipContext.status)}
- **Impact:** ${this.getRiskImpact(eipContext.category)}
- **Overall Risk:** ${this.getOverallRisk(eipContext.status, eipContext.category)}

## 🔍 **Audit Recommendations**
${this.getAuditRecommendations(eipContext.type)}

**Need specific security guidance?** Ask me about:
- Specific attack scenarios and defenses
- Audit checklist for your implementation
- Security testing methodologies
- Incident response procedures`;
      }
      return "Security is paramount in Ethereum development! Please specify which EIP you'd like security analysis for, and I'll provide detailed security considerations, common vulnerabilities, and best practices.";
    }

    if (message.includes('implementation') || message.includes('example') || message.includes('code') || message.includes('how to use')) {
      if (eipContext) {
        return `# 💻 Implementation Guide: EIP-${eipContext.number}

## 🚀 **Quick Start Implementation**

### **Prerequisites**
- Development environment setup (Hardhat/Foundry)
- Understanding of ${eipContext.category || 'Ethereum'} standards
- Basic knowledge of Solidity and Web3 development

### **Step-by-Step Implementation**

#### **1. Environment Setup**
\`\`\`bash
npm install @openzeppelin/contracts
npm install hardhat
\`\`\`

#### **2. Basic Implementation**
${this.getImplementationExample(eipContext.number, eipContext.category)}

#### **3. Advanced Features**
${this.getAdvancedFeatures(eipContext.number)}

## 🛠️ **Development Tools & Libraries**

### **Recommended Libraries**
- **OpenZeppelin:** Battle-tested contract implementations
- **Hardhat:** Development environment and testing framework
- **Ethers.js:** Ethereum library for frontend integration

### **Testing Framework**
\`\`\`javascript
describe("EIP-${eipContext.number} Implementation", function() {
  // Comprehensive test suite
  it("should implement core functionality", async function() {
    // Test implementation
  });
});
\`\`\`

## 📚 **Integration Patterns**

### **Frontend Integration**
${this.getFrontendIntegration(eipContext.number)}

### **Backend Integration**
${this.getBackendIntegration(eipContext.category)}

## 🔧 **Deployment Guide**
${this.getDeploymentGuide(eipContext.status)}

## 📈 **Performance Optimization**
${this.getPerformanceOptimization(eipContext.category)}

**Need specific implementation help?** Ask me about:
- Detailed code examples for your use case
- Integration with specific frameworks
- Performance optimization techniques
- Testing strategies and best practices`;
      }
      return "I'd love to help with implementation! Please specify which EIP you need implementation guidance for, and I'll provide code examples, best practices, and step-by-step integration instructions.";
    }

    // Enhanced fallback responses with more personality and depth
    const contextualFallbacks = [
      `# 🤖 Your Advanced EIP Research Assistant

I'm here to provide comprehensive insights into Ethereum Improvement Proposals! I can help you with:

## 🔍 **Deep Technical Analysis**
- Detailed EIP breakdowns and specifications
- Implementation complexity assessments
- Security risk evaluations
- Performance impact analysis

## 💡 **Strategic Guidance**
- Adoption recommendations based on your use case
- Integration roadmaps and timelines
- Resource requirement planning
- Risk mitigation strategies

## 🛠️ **Practical Implementation**
- Code examples and best practices
- Testing methodologies and frameworks
- Deployment strategies and optimization
- Real-world case studies and examples

**What would you like to explore?** Try asking:
- "Analyze EIP-1559 for a DeFi protocol"
- "Security considerations for EIP-4337 implementation"
- "Compare EIP-721 vs EIP-1155 for gaming"
- "Implementation roadmap for account abstraction"`,

      `# 🚀 Welcome to Advanced EIP Research!

I'm equipped with comprehensive knowledge about Ethereum standards and can provide:

## 📊 **Market Intelligence**
- Adoption metrics and trends
- Real-world implementation examples
- Ecosystem impact assessments
- Future development roadmaps

## 🔬 **Technical Deep Dives**
- Specification analysis and interpretation
- Implementation complexity breakdowns
- Security vulnerability assessments
- Performance optimization strategies

## 🎯 **Personalized Recommendations**
Based on your specific needs, I can suggest:
- Optimal EIP choices for your project
- Implementation timelines and milestones
- Resource allocation strategies
- Risk management approaches

**Ready to dive deep?** Ask me anything about EIPs, and I'll provide detailed, actionable insights!`
    ];
    
    return contextualFallbacks[Math.floor(Math.random() * contextualFallbacks.length)];
  }

  // Helper methods for generating contextual responses
  private getStatusDescription(status: string): string {
    const descriptions = {
      'Draft': 'Active development phase - expect significant changes',
      'Review': 'Community review phase - implementation can begin cautiously',
      'Last Call': 'Final review period - minimal changes expected',
      'Final': 'Production ready - stable for implementation',
      'Living': 'Continuously updated - always check latest version',
      'Stagnant': 'Inactive development - consider alternatives',
      'Withdrawn': 'Abandoned - do not implement'
    };
    return descriptions[status as keyof typeof descriptions] || 'Status under evaluation';
  }

  private getComplexityLevel(category?: string): string {
    const complexity = {
      'Core': 'High - requires protocol-level understanding',
      'Networking': 'Medium-High - network protocol expertise needed',
      'Interface': 'Medium - application-level implementation',
      'ERC': 'Low-Medium - standard contract patterns'
    };
    return complexity[category as keyof typeof complexity] || 'Medium - standard implementation complexity';
  }

  private getAdoptionTimeline(status: string): string {
    const timelines = {
      'Final': 'Immediate - ready for production deployment',
      'Last Call': '1-3 months - pending final approval',
      'Review': '3-6 months - subject to changes',
      'Draft': '6+ months - early development stage'
    };
    return timelines[status as keyof typeof timelines] || 'Timeline dependent on development progress';
  }

  private getResourceRequirements(type: string): string {
    const requirements = {
      'Standards Track': 'Medium - requires development and testing resources',
      'Meta': 'Low - primarily documentation and process changes',
      'Informational': 'Low - reference implementation may be needed'
    };
    return requirements[type as keyof typeof requirements] || 'Standard development resources required';
  }

  private getRiskLevel(status: string): string {
    const risks = {
      'Final': 'Low - stable and well-tested',
      'Last Call': 'Low-Medium - minimal changes expected',
      'Review': 'Medium - potential for modifications',
      'Draft': 'High - significant changes likely'
    };
    return risks[status as keyof typeof risks] || 'Medium risk level';
  }

  private getMarketAnalysis(eipNumber: number): string {
    const analyses = {
      1559: 'Revolutionary impact on fee predictability and ETH tokenomics. 100% adoption across all major clients with over 4M ETH burned.',
      721: 'Foundational NFT standard with massive ecosystem adoption. Powers $40B+ NFT market with 45,000+ collections.',
      4337: 'Emerging account abstraction standard with growing wallet adoption. Expected to significantly improve user experience.',
      20: 'Most widely adopted token standard with 500,000+ implementations. Foundation of the $2.5T+ token economy.'
    };
    return analyses[eipNumber as keyof typeof analyses] || 'Significant potential for ecosystem impact based on adoption metrics and community interest.';
  }

  private getRecommendations(status: string, type: string): string {
    if (status === 'Final') {
      return '✅ **Recommended for Production:** This EIP is stable and ready for implementation.\n✅ **High Priority:** Consider immediate adoption for competitive advantage.\n✅ **Resource Allocation:** Invest in comprehensive implementation and testing.';
    }
    if (status === 'Review' || status === 'Last Call') {
      return '⚠️ **Cautious Implementation:** Begin development but expect potential changes.\n📚 **Stay Updated:** Monitor EIP repository for updates and modifications.\n🧪 **Testnet First:** Implement on testnets before mainnet deployment.';
    }
    return '🔬 **Research Phase:** Monitor development but avoid production implementation.\n📖 **Educational Value:** Study for future planning and architecture decisions.\n🤝 **Community Engagement:** Participate in discussions and provide feedback.';
  }

  private getSecurityRisks(category?: string): string {
    const risks = {
      'Core': 'Protocol-level vulnerabilities could affect entire network',
      'ERC': 'Smart contract vulnerabilities, reentrancy attacks, access control issues',
      'Interface': 'API security, input validation, integration vulnerabilities',
      'Networking': 'Network-level attacks, DoS vulnerabilities, peer discovery issues'
    };
    return risks[category as keyof typeof risks] || 'Standard smart contract security considerations apply';
  }

  private getProtocolRisks(type: string): string {
    const risks = {
      'Standards Track': 'Consensus failures, backward compatibility issues',
      'Meta': 'Process vulnerabilities, governance attacks',
      'Informational': 'Implementation inconsistencies, misinterpretation risks'
    };
    return risks[type as keyof typeof risks] || 'Standard protocol implementation risks';
  }

  private getAttackVectors(category?: string): string {
    if (category === 'ERC') {
      return `**Common Attack Vectors:**
- **Reentrancy:** Use checks-effects-interactions pattern
- **Integer Overflow:** Use SafeMath or Solidity 0.8+
- **Access Control:** Implement proper role-based permissions
- **Front-running:** Consider commit-reveal schemes
- **Flash Loan Attacks:** Implement proper validation and limits`;
    }
    return 'Standard security considerations apply based on implementation context';
  }

  private getRiskLikelihood(status: string): string {
    const likelihood = {
      'Final': 'Low - well-tested and stable',
      'Review': 'Medium - under active review',
      'Draft': 'High - early development stage'
    };
    return likelihood[status as keyof typeof likelihood] || 'Medium';
  }

  private getRiskImpact(category?: string): string {
    const impact = {
      'Core': 'Critical - affects entire protocol',
      'ERC': 'High - affects contract interactions',
      'Interface': 'Medium - affects application layer'
    };
    return impact[category as keyof typeof impact] || 'Medium';
  }

  private getOverallRisk(status: string, category?: string): string {
    if (status === 'Final' && category !== 'Core') return 'Low';
    if (status === 'Draft' || category === 'Core') return 'High';
    return 'Medium';
  }

  private getAuditRecommendations(type: string): string {
    if (type === 'Standards Track') {
      return `**Recommended Audit Approach:**
1. **Formal Verification:** Mathematical proof of correctness
2. **Security Audit:** Professional third-party review
3. **Economic Analysis:** Tokenomics and incentive evaluation
4. **Integration Testing:** Cross-system compatibility verification`;
    }
    return 'Standard security review and testing procedures recommended';
  }

  private getImplementationExample(eipNumber: number, category?: string): string {
    if (eipNumber === 721) {
      return `\`\`\`solidity
// Basic ERC-721 Implementation
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721, Ownable {
    uint256 private _tokenIdCounter;
    
    constructor() ERC721("MyNFT", "MNFT") {}
    
    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(to, tokenId);
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return string(abi.encodePacked("https://api.example.com/metadata/", tokenId));
    }
}
\`\`\``;
    }
    
    if (eipNumber === 20) {
      return `\`\`\`solidity
// Basic ERC-20 Implementation
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
    
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
\`\`\``;
    }

    return `\`\`\`solidity
// Implementation template for EIP-${eipNumber}
pragma solidity ^0.8.0;

contract EIP${eipNumber}Implementation {
    // Core implementation logic
    // Follow the specification guidelines
    // Implement required interfaces
}
\`\`\``;
  }

  private getAdvancedFeatures(eipNumber: number): string {
    const features = {
      721: '- Batch minting and transfers\n- Metadata URI management\n- Royalty integration (EIP-2981)\n- Enumerable extensions',
      20: '- Permit functionality (EIP-2612)\n- Flash mint capabilities\n- Governance token features\n- Deflationary mechanisms',
      1559: '- Dynamic fee calculation\n- Base fee adjustment algorithm\n- Priority fee optimization\n- Gas estimation improvements'
    };
    return features[eipNumber as keyof typeof features] || '- Extended functionality based on use case\n- Integration with related standards\n- Performance optimizations\n- Security enhancements';
  }

  private getFrontendIntegration(eipNumber: number): string {
    return `\`\`\`javascript
// Frontend integration example
import { ethers } from 'ethers';

const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider
);

// Interact with EIP-${eipNumber} implementation
const result = await contract.someMethod();
\`\`\``;
  }

  private getBackendIntegration(category?: string): string {
    return `\`\`\`javascript
// Backend service integration
const Web3 = require('web3');
const web3 = new Web3(process.env.RPC_URL);

// Monitor events and transactions
const contract = new web3.eth.Contract(ABI, address);
contract.events.allEvents()
  .on('data', handleEvent)
  .on('error', handleError);
\`\`\``;
  }

  private getDeploymentGuide(status: string): string {
    if (status === 'Final') {
      return `**Production Deployment:**
1. Comprehensive testing on testnets
2. Security audit completion
3. Gas optimization verification
4. Mainnet deployment with monitoring
5. Gradual feature rollout`;
    }
    return `**Development Deployment:**
1. Testnet deployment and testing
2. Community feedback integration
3. Iterative improvements
4. Documentation updates
5. Preparation for mainnet when stable`;
  }

  private getPerformanceOptimization(category?: string): string {
    const optimizations = {
      'ERC': '- Gas optimization techniques\n- Batch operations\n- Storage layout optimization\n- Function selector optimization',
      'Core': '- Protocol-level optimizations\n- Consensus efficiency\n- Network bandwidth optimization\n- State management improvements'
    };
    return optimizations[category as keyof typeof optimizations] || '- Standard optimization practices\n- Gas efficiency improvements\n- Performance monitoring\n- Scalability considerations';
  }
}

export const openaiService = new OpenAIService();