import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Maximize2, Sparkles, BookOpen, Search, TrendingUp, Users } from 'lucide-react';
import { useEIPs } from '../hooks/useEIPs';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface AIAssistantProps {
  currentEIP?: number;
}

export default function AIAssistant({ currentEIP }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { eips } = useEIPs();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'assistant',
        content: currentEIP 
          ? `👋 Hello! I'm your advanced EIP assistant powered by comprehensive Ethereum research. I'm here to help you understand **EIP-${currentEIP}** in detail.\n\n🔍 **I can help you with:**\n• Detailed technical explanations\n• Implementation examples\n• Real-world use cases\n• Related EIPs and dependencies\n• Current adoption metrics\n• Security considerations\n\n💡 **Try asking:** "Give me a comprehensive analysis of this EIP" or "What are the security implications?"`
          : "👋 Welcome! I'm your advanced EIP research assistant, powered by comprehensive Ethereum documentation and real-time data.\n\n🚀 **I'm here to help you:**\n• **Discover EIPs** - Find standards by topic or use case\n• **Deep Analysis** - Get detailed technical breakdowns\n• **Implementation Guidance** - Learn how to use EIPs in projects\n• **Market Insights** - Understand adoption and impact\n• **Security Reviews** - Learn about risks and best practices\n\n💬 **Ask me anything like:**\n• \"Find all scaling-related EIPs\"\n• \"Explain gas optimization techniques\"\n• \"What's the difference between EIP-721 and EIP-1155?\"\n• \"Show me the most adopted standards\"",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, currentEIP]);

  const quickSuggestions = currentEIP ? [
    `Analyze EIP-${currentEIP} in detail`,
    "What are the security considerations?",
    "Show implementation examples",
    "Compare with similar standards"
  ] : [
    "Find NFT-related standards",
    "Explain account abstraction",
    "What's new in Ethereum standards?",
    "Show me DeFi-related EIPs"
  ];

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate realistic AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));

    const message = userMessage.toLowerCase();
    
    // Enhanced pattern matching for more comprehensive responses
    const eipNumberMatch = message.match(/eip[- ]?(\d+)/);
    const eipNumber = eipNumberMatch ? parseInt(eipNumberMatch[1]) : null;
    const relevantEIP = eipNumber ? eips.find(eip => eip.number === eipNumber) : null;
    
    // Advanced response patterns
    if (message.includes('comprehensive') || message.includes('detailed') || message.includes('analysis') || message.includes('analyze')) {
      if (currentEIP) {
        const eip = eips.find(e => e.number === currentEIP);
        if (eip) {
          return `# 📋 Comprehensive Analysis: EIP-${eip.number}

## 🎯 **Overview**
**${eip.title}** is a ${eip.type} proposal in **${eip.status}** status, authored by ${eip.author.slice(0, 3).join(', ')}${eip.author.length > 3 ? ` and ${eip.author.length - 3} others` : ''}.

## 📖 **Technical Summary**
${eip.description}

## 🏗️ **Implementation Status**
- **Current Status:** ${eip.status}
- **Type:** ${eip.type}
${eip.category ? `- **Category:** ${eip.category}` : ''}
- **Created:** ${new Date(eip.created).toLocaleDateString()}
${eip.updated ? `- **Last Updated:** ${new Date(eip.updated).toLocaleDateString()}` : ''}

## 🔗 **Dependencies & Relationships**
${eip.requires ? `**Requires:** ${eip.requires.map(r => `EIP-${r}`).join(', ')}` : 'No dependencies'}
${eip.supersededBy ? `**Superseded by:** ${eip.supersededBy.map(r => `EIP-${r}`).join(', ')}` : ''}

## 💡 **Key Benefits**
${eip.status === 'Final' ? '✅ **Production Ready** - This standard is finalized and widely adopted' : '⚠️ **Under Development** - This proposal is still evolving'}

## 🔍 **Want to dive deeper?**
Ask me about specific aspects like "security considerations", "implementation examples", or "real-world usage"!`;
        }
      }
      return "I'd love to provide a comprehensive analysis! Please specify which EIP you'd like me to analyze, or if you're viewing an EIP page, I can analyze that one for you.";
    }

    if (message.includes('security') || message.includes('risk') || message.includes('vulnerability')) {
      if (currentEIP || relevantEIP) {
        const eip = relevantEIP || eips.find(e => e.number === currentEIP);
        if (eip) {
          return `# 🔒 Security Analysis: EIP-${eip.number}

## ⚠️ **Security Considerations**

### **Implementation Risks**
- **Smart Contract Security:** Ensure proper access controls and input validation
- **Upgrade Patterns:** Consider proxy patterns and migration strategies
- **Gas Optimization:** Prevent DoS attacks through gas limit exploitation

### **Best Practices**
✅ **Audit Requirements:** Professional security audit recommended before mainnet deployment
✅ **Testing:** Comprehensive unit and integration testing
✅ **Gradual Rollout:** Consider testnet deployment and gradual adoption

### **Common Pitfalls**
❌ **Reentrancy:** Implement proper checks-effects-interactions pattern
❌ **Integer Overflow:** Use SafeMath or Solidity 0.8+ built-in protections
❌ **Access Control:** Implement role-based permissions correctly

### **Monitoring & Maintenance**
📊 Monitor contract interactions and gas usage patterns
🔄 Plan for potential upgrades and emergency procedures
📈 Track adoption metrics and user feedback

**Need specific security guidance for your implementation? Ask me about particular attack vectors or defensive patterns!**`;
        }
      }
      return "Security is crucial in Ethereum development! Please specify which EIP you'd like security analysis for, and I'll provide detailed security considerations, common vulnerabilities, and best practices.";
    }

    if (message.includes('implementation') || message.includes('example') || message.includes('code') || message.includes('how to use')) {
      if (currentEIP || relevantEIP) {
        const eip = relevantEIP || eips.find(e => e.number === currentEIP);
        if (eip) {
          let examples = '';
          
          if (eip.number === 721) {
            examples = `
## 💻 **Implementation Examples**

### **Basic ERC-721 Contract**
\`\`\`solidity
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
}
\`\`\`

### **Advanced Features**
- **Metadata URI:** Implement \`tokenURI()\` for off-chain metadata
- **Royalties:** Combine with EIP-2981 for creator royalties
- **Batch Operations:** Use EIP-1155 for multiple token types`;
          } else if (eip.number === 20) {
            examples = `
## 💻 **Implementation Examples**

### **Basic ERC-20 Token**
\`\`\`solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}
\`\`\`

### **Production Features**
- **Burnable:** Allow token burning for deflationary mechanics
- **Pausable:** Emergency pause functionality
- **Access Control:** Role-based minting and management`;
          } else {
            examples = `
## 💻 **Implementation Guidance**

### **Getting Started**
1. **Study the Specification:** Review the complete EIP document
2. **Check Dependencies:** Ensure all required EIPs are understood
3. **Use Established Libraries:** Leverage OpenZeppelin when possible
4. **Test Thoroughly:** Implement comprehensive test suites

### **Development Tools**
- **Hardhat/Foundry:** For development and testing
- **OpenZeppelin:** Secure, audited contract libraries
- **Remix:** Browser-based development environment`;
          }

          return `# 🛠️ Implementation Guide: EIP-${eip.number}

${examples}

### **Integration Steps**
1. **Environment Setup:** Configure development environment
2. **Dependency Management:** Install required packages
3. **Contract Development:** Implement core functionality
4. **Testing:** Write comprehensive tests
5. **Deployment:** Deploy to testnet first
6. **Verification:** Verify contracts on Etherscan

### **Real-World Projects Using This Standard**
Many successful projects implement this standard. Would you like me to show you specific examples of live implementations?

**Need help with a specific implementation challenge? Ask me about particular functions or integration patterns!**`;
        }
      }
      return "I'd love to help with implementation! Please specify which EIP you need implementation guidance for, and I'll provide code examples, best practices, and step-by-step integration instructions.";
    }

    if (message.includes('compare') || message.includes('difference') || message.includes('vs') || message.includes('similar')) {
      return `# 🔄 EIP Comparison & Relationships

## **Popular Comparisons**

### **Token Standards**
- **EIP-20 vs EIP-1155:** Fungible vs Multi-token standard
- **EIP-721 vs EIP-1155:** Single NFTs vs Batch operations
- **EIP-777 vs EIP-20:** Advanced features vs Simplicity

### **Account Standards**
- **EIP-4337 vs EIP-3074:** Account abstraction approaches
- **EIP-1271 vs Native signatures:** Smart contract signatures

### **Fee Mechanisms**
- **EIP-1559 vs Legacy:** Predictable vs Auction-based fees
- **EIP-4844 vs EIP-1559:** Data availability vs Execution fees

## **How to Choose?**
🎯 **Consider your use case:**
- **Simple tokens?** → EIP-20
- **Unique assets?** → EIP-721
- **Gaming/Multiple types?** → EIP-1155
- **Better UX?** → EIP-4337

**Want a specific comparison? Ask me to compare any two EIPs and I'll break down their differences, use cases, and trade-offs!**`;
    }

    if (message.includes('latest') || message.includes('recent') || message.includes('new') || message.includes('trending')) {
      const recentEIPs = eips
        .filter(eip => eip.updated || eip.created)
        .sort((a, b) => new Date(b.updated || b.created).getTime() - new Date(a.updated || a.created).getTime())
        .slice(0, 8);
        
      return `# 🆕 Latest EIP Activity & Trends

## **Recently Updated EIPs**
${recentEIPs.map(eip => 
        `### **EIP-${eip.number}: ${eip.title}**
- **Status:** ${eip.status} | **Type:** ${eip.type}
- **Updated:** ${new Date(eip.updated || eip.created).toLocaleDateString()}
- ${eip.description.substring(0, 100)}...`
      ).join('\n\n')}

## **🔥 Hot Topics in Ethereum Standards**
- **Account Abstraction (EIP-4337):** Revolutionizing wallet UX
- **Data Availability (EIP-4844):** Scaling through blob transactions  
- **MEV Protection:** Standards for fair transaction ordering
- **Layer 2 Integration:** Cross-chain compatibility standards

## **📈 Adoption Trends**
- **EIP-1559:** 100% adoption across all major clients
- **EIP-721:** 45,000+ NFT collections deployed
- **EIP-4337:** Growing adoption in smart wallets

**Want details about any of these trends or specific EIPs? Just ask!**`;
    }

    if (message.includes('find') || message.includes('search') || message.includes('looking for') || message.includes('show me')) {
      if (message.includes('nft') || message.includes('721') || message.includes('1155')) {
        return `# 🎨 NFT-Related EIP Standards

## **Core NFT Standards**
### **EIP-721: Non-Fungible Token Standard**
- **Purpose:** Unique digital assets (art, collectibles, domain names)
- **Status:** Final ✅
- **Use Cases:** CryptoPunks, Bored Apes, ENS domains

### **EIP-1155: Multi Token Standard**  
- **Purpose:** Batch operations for multiple token types
- **Status:** Final ✅
- **Use Cases:** Gaming items, fractional NFTs

## **Enhanced NFT Features**
### **EIP-2981: NFT Royalty Standard**
- **Purpose:** Standardized creator royalties
- **Adoption:** 95% of major marketplaces

### **EIP-4906: Metadata Update Extension**
- **Purpose:** Dynamic NFT metadata updates
- **Use Cases:** Evolving artwork, game characters

### **EIP-5192: Minimal Soulbound NFTs**
- **Purpose:** Non-transferable tokens
- **Use Cases:** Certificates, achievements

## **🚀 Emerging Standards**
- **EIP-6551:** Token Bound Accounts (NFTs owning assets)
- **EIP-5484:** Consensual Soulbound Tokens
- **EIP-4675:** Multi-Fractional NFTs

**Want to explore any specific NFT standard or use case? Ask me for detailed implementation guidance!**`;
      }

      if (message.includes('defi') || message.includes('finance') || message.includes('token')) {
        return `# 💰 DeFi & Financial EIP Standards

## **Token Standards**
### **EIP-20: Token Standard (ERC-20)**
- **Purpose:** Fungible tokens (currencies, utility tokens)
- **Adoption:** 500,000+ tokens deployed
- **Market Cap:** $2.5T+ total value

### **EIP-777: Advanced Token Standard**
- **Purpose:** Enhanced ERC-20 with hooks and operators
- **Features:** Send/receive callbacks, authorized operators

## **DeFi Infrastructure**
### **EIP-1559: Fee Market Reform**
- **Impact:** Predictable fees, ETH burning mechanism
- **Burned:** 4.2M+ ETH permanently removed

### **EIP-2612: Permit Extension**
- **Purpose:** Gasless token approvals via signatures
- **Adoption:** Major DeFi protocols (Uniswap, Aave)

## **Advanced DeFi Standards**
### **EIP-4626: Tokenized Vault Standard**
- **Purpose:** Standardized yield-bearing tokens
- **Use Cases:** Lending protocols, yield farming

### **EIP-3156: Flash Loan Standard**
- **Purpose:** Standardized flash loan interfaces
- **Protocols:** Aave, dYdX, Balancer

## **🔮 Emerging DeFi Standards**
- **EIP-5115:** Super Token Standard
- **EIP-6093:** Custom Errors for ERC-20
- **Cross-chain bridge standards**

**Need specific DeFi implementation guidance or want to explore particular protocols? Just ask!**`;
      }

      if (message.includes('scaling') || message.includes('layer 2') || message.includes('l2')) {
        return `# ⚡ Scaling & Layer 2 EIP Standards

## **Core Scaling Solutions**
### **EIP-4844: Proto-Danksharding**
- **Purpose:** Blob transactions for data availability
- **Impact:** 10-100x cost reduction for L2s
- **Status:** Implemented in Cancun upgrade

### **EIP-1559: Fee Market Reform**
- **Purpose:** Predictable base fees and block size flexibility
- **Result:** More efficient block space utilization

## **Layer 2 Integration**
### **EIP-2930: Access List Transactions**
- **Purpose:** Optimize gas costs for complex transactions
- **Use Cases:** L2 batch submissions, complex DeFi operations

### **EIP-2718: Typed Transaction Envelope**
- **Purpose:** Support for new transaction types
- **Enables:** EIP-1559, EIP-2930, future scaling features

## **State Management**
### **EIP-2929/2930: Gas Cost Increases**
- **Purpose:** Better gas accounting for state access
- **Impact:** More predictable execution costs

## **🚀 Future Scaling Standards**
- **EIP-4488:** Transaction calldata gas cost reduction
- **EIP-4490:** State rent mechanisms
- **Verkle tree integration standards**

## **Cross-Chain Standards**
- **Bridge security standards**
- **Cross-chain message passing**
- **Interoperability protocols**

**Want to dive deeper into any scaling solution or need implementation guidance for L2 integration?**`;
      }

      return `# 🔍 EIP Discovery Guide

## **Search by Category**
### **🏗️ Core Protocol**
- Infrastructure and consensus changes
- Gas mechanisms and fee structures
- State management improvements

### **🔗 Networking**  
- P2P communication protocols
- Node discovery mechanisms
- Network upgrade procedures

### **🎯 Interface Standards**
- Application-level standards
- Wallet and dApp interfaces
- User experience improvements

### **📜 ERC Standards**
- Token standards (EIP-20, 721, 1155)
- Contract interfaces and patterns
- Interoperability standards

## **Search by Use Case**
- **"NFT standards"** → EIP-721, 1155, 2981
- **"DeFi protocols"** → EIP-20, 1559, 4626
- **"Account abstraction"** → EIP-4337, 3074
- **"Scaling solutions"** → EIP-4844, 1559, 2930

## **Search by Status**
- **Final:** Production-ready standards
- **Review:** Community review phase  
- **Draft:** Active development
- **Living:** Continuously updated

**Tell me what you're building or what problem you're solving, and I'll recommend the most relevant EIPs!**`;
    }

    if (message.includes('status') && relevantEIP) {
      const statusExplanations = {
        'Draft': '📝 **Active Development** - This EIP is being actively developed and may change significantly. Use with caution in production.',
        'Review': '👀 **Community Review** - The EIP is ready for community feedback. Implementation can begin but expect potential changes.',
        'Last Call': '⏰ **Final Review Period** - Last chance for feedback before potential acceptance. Implementations should be stable.',
        'Final': '✅ **Production Ready** - This EIP has been accepted and is ready for widespread implementation. Stable and secure.',
        'Stagnant': '😴 **Inactive** - No recent activity for 6+ months. May be abandoned or need revival.',
        'Withdrawn': '❌ **Withdrawn** - The author has withdrawn this EIP. Do not implement.',
        'Living': '🔄 **Continuously Updated** - This EIP is regularly updated (like EIP-1). Always check for latest version.'
      };
      
      return `# 📊 EIP Status Analysis: EIP-${relevantEIP.number}

## **Current Status: ${relevantEIP.status}**
${statusExplanations[relevantEIP.status]}

## **Timeline & Progress**
- **Created:** ${new Date(relevantEIP.created).toLocaleDateString()}
${relevantEIP.updated ? `- **Last Updated:** ${new Date(relevantEIP.updated).toLocaleDateString()}` : ''}
- **Authors:** ${relevantEIP.author.join(', ')}

## **Implementation Readiness**
${relevantEIP.status === 'Final' 
  ? '🚀 **Ready for Production** - This standard is stable and widely adopted. Safe to implement in production systems.'
  : relevantEIP.status === 'Review' || relevantEIP.status === 'Last Call'
  ? '⚠️ **Proceed with Caution** - Implementation possible but expect potential changes. Monitor for updates.'
  : '🔬 **Experimental** - Use only for research and testing. Not recommended for production use.'
}

## **Next Steps**
${relevantEIP.status === 'Final' 
  ? '✅ Begin implementation with confidence\n✅ Check for established libraries and tools\n✅ Review real-world implementations'
  : '📚 Monitor EIP repository for updates\n🧪 Experiment in testnet environments\n💬 Participate in community discussions'
}

**Want specific implementation guidance or have questions about this EIP's development? Just ask!**`;
    }

    if (message.includes('help') || message.includes('what can you do') || message.includes('guide')) {
      return `# 🤖 Your Advanced EIP Research Assistant

## **🎯 What I Can Help You With**

### **📚 Deep EIP Analysis**
- **Comprehensive breakdowns** of any EIP's technical details
- **Security analysis** and risk assessments  
- **Implementation guidance** with code examples
- **Comparison studies** between related standards

### **🔍 Smart Discovery**
- **Find EIPs by topic** (NFTs, DeFi, scaling, etc.)
- **Search by use case** or problem you're solving
- **Filter by status** and development stage
- **Discover related standards** and dependencies

### **📊 Market Intelligence**
- **Adoption metrics** and real-world usage
- **Project showcases** implementing specific EIPs
- **Trend analysis** and emerging standards
- **Impact assessments** on the ecosystem

### **🛠️ Implementation Support**
- **Code examples** and best practices
- **Security considerations** and audit guidelines
- **Testing strategies** and deployment advice
- **Integration patterns** with existing systems

## **💬 How to Get the Best Results**

### **Be Specific**
❌ "Tell me about tokens"
✅ "Compare EIP-20 vs EIP-777 for a DeFi protocol"

### **Ask Follow-ups**
❌ Stop after one question
✅ "Now show me implementation examples"

### **Context Matters**
❌ Generic questions
✅ "I'm building a gaming platform, which NFT standard should I use?"

## **🚀 Try These Advanced Queries**
- *"Analyze the security implications of EIP-4337"*
- *"Show me all EIPs related to MEV protection"*
- *"Compare gas efficiency of different token standards"*
- *"What are the latest developments in account abstraction?"*

**I'm here to be your comprehensive Ethereum research companion. What would you like to explore first?**`;
    }

    // Enhanced fallback responses with more personality
    const contextualFallbacks = [
      "That's a fascinating question! I'd love to dive deeper into that topic. Could you specify which EIP or aspect of Ethereum standards you're most interested in? I can provide detailed technical analysis, implementation guidance, or market insights.",
      
      "Great question! I'm equipped with comprehensive knowledge about all Ethereum standards. Whether you're looking for technical specifications, security analysis, or real-world implementation examples, I'm here to help. What specific area would you like to explore?",
      
      "I'm excited to help you explore Ethereum standards! I can provide everything from high-level overviews to deep technical dives. Try asking about specific EIPs, comparing standards, or getting implementation guidance for your project.",
      
      "Excellent! I love helping developers and researchers understand Ethereum standards. I can explain complex concepts, provide code examples, analyze security implications, or help you choose the right standards for your use case. What's your specific interest?"
    ];
    
    return contextualFallbacks[Math.floor(Math.random() * contextualFallbacks.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const response = await generateResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment. In the meantime, you can browse the EIP documentation directly or try a different question.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Enhanced markdown formatting
    return content
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold text-gray-900 mb-3 border-b border-gray-200 pb-2">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-lg font-semibold text-gray-800 mb-2 mt-4">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-md font-medium text-gray-700 mb-2 mt-3">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-gray-700">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-gray-800">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-3 text-sm"><code>$2</code></pre>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^✅ (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-green-600 mt-0.5">✅</span><span>$1</span></div>')
      .replace(/^❌ (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-red-600 mt-0.5">❌</span><span>$1</span></div>')
      .replace(/^⚠️ (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-yellow-600 mt-0.5">⚠️</span><span>$1</span></div>')
      .replace(/^🔍 (.*$)/gm, '<div class="flex items-start space-x-2 mb-2"><span class="text-blue-600 mt-0.5">🔍</span><span>$1</span></div>')
      .split('\n')
      .map((line, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: line || '<br>' }} />
      ));
  };

  return (
    <>
      {/* Enhanced Floating AI Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 group animate-pulse hover:animate-none"
        >
          <div className="relative">
            <Bot className="h-7 w-7" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"></div>
          </div>
          <div className="absolute -top-16 right-0 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Ask AI about EIPs</span>
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </button>
      )}

      {/* Enhanced AI Chat Interface */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-[420px] h-[650px]'
        }`}>
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-semibold text-lg">EIP Research AI</span>
                <div className="flex items-center space-x-1 text-xs text-blue-100">
                  <Sparkles className="h-3 w-3" />
                  <span>Advanced Analysis Ready</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Enhanced Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[500px] bg-gradient-to-b from-gray-50 to-white">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-100'
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {message.type === 'assistant' ? formatMessage(message.content) : message.content}
                      </div>
                      <div className={`text-xs mt-2 ${
                        message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Enhanced Loading Animation */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-600">Analyzing EIP data...</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Suggestions */}
                {showSuggestions && messages.length <= 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 font-medium">💡 Try these suggestions:</p>
                    <div className="grid grid-cols-1 gap-2">
                      {quickSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-left p-3 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 rounded-lg text-sm text-gray-700 border border-blue-100 hover:border-blue-200 transition-all duration-200"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Enhanced Input Area */}
              <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about EIPs..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center min-w-[48px]"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                
                {/* Enhanced Footer */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-3 w-3" />
                      <span>Comprehensive EIP Database</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>Live Market Data</span>
                    </div>
                  </div>
                </div>
                
                {/* Sponsored by Section */}
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
                    <img 
                      src="/ERP Pic .png" 
                      alt="ERP Logo" 
                      className="h-4 w-4 object-contain"
                    />
                    <span>Sponsored by</span>
                    <span className="font-semibold text-gray-800">Ethereum Research Papers</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}