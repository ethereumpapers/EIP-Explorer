import { Project } from '../types/eip';

interface ProjectData {
  name: string;
  description: string;
  website: string;
  github?: string;
  logo?: string;
  eipNumbers: number[];
  implementationDetails: string;
  status: 'Active' | 'Beta' | 'Deprecated';
  category: string;
  tvl?: string;
  users?: string;
  verified: boolean;
}

class ProjectService {
  private cache: Map<string, any> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  private isCacheValid(key: string): boolean {
    const expiry = this.cacheExpiry.get(key);
    return expiry ? Date.now() < expiry : false;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, data);
    this.cacheExpiry.set(key, Date.now() + this.CACHE_DURATION);
  }

  private getCache(key: string): any {
    if (this.isCacheValid(key)) {
      return this.cache.get(key);
    }
    return null;
  }

  // Curated list of real projects implementing EIPs
  private readonly VERIFIED_PROJECTS: ProjectData[] = [
    // EIP-1559 Implementations
    {
      name: 'MetaMask',
      description: 'Leading Web3 wallet with full EIP-1559 support for improved fee estimation and user experience.',
      website: 'https://metamask.io',
      github: 'https://github.com/MetaMask',
      logo: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      eipNumbers: [1559, 4337],
      implementationDetails: 'Full EIP-1559 integration with advanced fee estimation, priority fee suggestions, and gas optimization features.',
      status: 'Active',
      category: 'Wallet',
      users: '30M+',
      verified: true
    },
    {
      name: 'Ethereum Foundation',
      description: 'Core Ethereum client implementations supporting EIP-1559 across all major execution clients.',
      website: 'https://ethereum.org',
      github: 'https://github.com/ethereum',
      eipNumbers: [1559],
      implementationDetails: 'Native protocol-level implementation in Geth, Nethermind, Besu, and Erigon clients.',
      status: 'Active',
      category: 'Infrastructure',
      verified: true
    },

    // EIP-721 (NFT) Implementations
    {
      name: 'OpenSea',
      description: 'World\'s largest NFT marketplace supporting ERC-721, ERC-1155, and EIP-2981 royalty standards.',
      website: 'https://opensea.io',
      github: 'https://github.com/ProjectOpenSea',
      logo: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      eipNumbers: [721, 1155, 2981],
      implementationDetails: 'Comprehensive NFT marketplace with full ERC-721/1155 support, royalty enforcement, and advanced trading features.',
      status: 'Active',
      category: 'Marketplace',
      tvl: '$2B+',
      users: '2M+',
      verified: true
    },
    {
      name: 'Bored Ape Yacht Club',
      description: 'Iconic NFT collection implementing ERC-721 standard with utility and community features.',
      website: 'https://boredapeyachtclub.com',
      eipNumbers: [721],
      implementationDetails: 'Premium ERC-721 implementation with metadata standards, provenance tracking, and utility integration.',
      status: 'Active',
      category: 'NFT Collection',
      verified: true
    },
    {
      name: 'Art Blocks',
      description: 'Generative art platform using ERC-721 for programmable and dynamic NFT creation.',
      website: 'https://artblocks.io',
      eipNumbers: [721],
      implementationDetails: 'Advanced ERC-721 implementation with on-chain generative art, dynamic metadata, and artist royalties.',
      status: 'Active',
      category: 'Art Platform',
      verified: true
    },

    // EIP-20 (Token) Implementations
    {
      name: 'Uniswap',
      description: 'Leading DEX protocol built on ERC-20 token standard with automated market making.',
      website: 'https://uniswap.org',
      github: 'https://github.com/Uniswap',
      logo: 'https://images.pexels.com/photos/7567526/pexels-photo-7567526.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      eipNumbers: [20],
      implementationDetails: 'Core DEX infrastructure supporting all ERC-20 tokens with concentrated liquidity and advanced AMM mechanics.',
      status: 'Active',
      category: 'DeFi',
      tvl: '$4B+',
      verified: true
    },
    {
      name: 'Chainlink',
      description: 'Decentralized oracle network with LINK token implementing ERC-20 standard.',
      website: 'https://chain.link',
      github: 'https://github.com/smartcontractkit',
      eipNumbers: [20],
      implementationDetails: 'LINK token serves as payment for oracle services with standard ERC-20 functionality and additional oracle-specific features.',
      status: 'Active',
      category: 'Oracle',
      verified: true
    },
    {
      name: 'Aave',
      description: 'DeFi lending protocol supporting hundreds of ERC-20 tokens as collateral and borrowing assets.',
      website: 'https://aave.com',
      github: 'https://github.com/aave',
      eipNumbers: [20],
      implementationDetails: 'Comprehensive ERC-20 integration for lending, borrowing, and yield farming with aToken wrappers.',
      status: 'Active',
      category: 'DeFi',
      tvl: '$10B+',
      verified: true
    },

    // EIP-4337 (Account Abstraction) Implementations
    {
      name: 'Argent',
      description: 'Smart contract wallet implementing EIP-4337 for gasless transactions and social recovery.',
      website: 'https://argent.xyz',
      github: 'https://github.com/argentlabs',
      logo: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      eipNumbers: [4337],
      implementationDetails: 'Native EIP-4337 implementation with social recovery, gasless transactions, and DeFi integrations.',
      status: 'Active',
      category: 'Wallet',
      users: '500K+',
      verified: true
    },
    {
      name: 'Biconomy',
      description: 'Infrastructure platform providing EIP-4337 account abstraction solutions for dApps.',
      website: 'https://biconomy.io',
      github: 'https://github.com/bcnmy',
      eipNumbers: [4337],
      implementationDetails: 'Comprehensive AA infrastructure with bundler services, paymaster solutions, and SDK for developers.',
      status: 'Active',
      category: 'Infrastructure',
      verified: true
    },
    {
      name: 'Safe',
      description: 'Multi-signature wallet evolving to support EIP-4337 account abstraction features.',
      website: 'https://safe.global',
      github: 'https://github.com/safe-global',
      eipNumbers: [4337],
      implementationDetails: 'Integrating EIP-4337 support into existing multi-sig infrastructure for enhanced UX and automation.',
      status: 'Beta',
      category: 'Wallet',
      tvl: '$40B+',
      verified: true
    },

    // EIP-2981 (Royalty) Implementations
    {
      name: 'Foundation',
      description: 'Creator-focused NFT platform with native EIP-2981 royalty support.',
      website: 'https://foundation.app',
      eipNumbers: [721, 2981],
      implementationDetails: 'Built-in royalty enforcement using EIP-2981 standard ensuring creators receive ongoing compensation.',
      status: 'Active',
      category: 'Marketplace',
      verified: true
    },
    {
      name: 'SuperRare',
      description: 'Digital art marketplace implementing EIP-2981 for automatic artist royalty distribution.',
      website: 'https://superrare.com',
      eipNumbers: [721, 2981],
      implementationDetails: 'Automatic royalty calculation and distribution using EIP-2981 standard for all secondary sales.',
      status: 'Active',
      category: 'Art Marketplace',
      verified: true
    },
    {
      name: 'Manifold',
      description: 'Creator tools platform enabling artists to deploy EIP-2981 compliant NFT contracts.',
      website: 'https://manifold.xyz',
      github: 'https://github.com/manifoldxyz',
      eipNumbers: [721, 2981],
      implementationDetails: 'Creator studio with built-in EIP-2981 royalty configuration and cross-marketplace compatibility.',
      status: 'Active',
      category: 'Creator Tools',
      verified: true
    }
  ];

  async getAllProjects(): Promise<Project[]> {
    const cacheKey = 'all-projects';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      // In a real implementation, this might fetch from multiple sources:
      // - GitHub repositories with EIP implementations
      // - DeFi Pulse for TVL data
      // - Community-submitted projects
      // - On-chain analysis for contract implementations

      const projects: Project[] = this.VERIFIED_PROJECTS.map((projectData, index) => ({
        id: `project-${index + 1}`,
        name: projectData.name,
        description: projectData.description,
        logo: projectData.logo,
        website: projectData.website,
        github: projectData.github,
        eipNumbers: projectData.eipNumbers,
        implementationDetails: projectData.implementationDetails,
        status: projectData.status
      }));

      this.setCache(cacheKey, projects);
      return projects;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  }

  async getProjectsByEIP(eipNumber: number): Promise<Project[]> {
    const allProjects = await this.getAllProjects();
    return allProjects.filter(project => project.eipNumbers.includes(eipNumber));
  }

  async getProjectStats() {
    const projects = await this.getAllProjects();
    
    const stats = {
      total: projects.length,
      active: projects.filter(p => p.status === 'Active').length,
      beta: projects.filter(p => p.status === 'Beta').length,
      deprecated: projects.filter(p => p.status === 'Deprecated').length,
      byCategory: {} as Record<string, number>,
      topEIPs: {} as Record<number, number>
    };

    // Count implementations per EIP
    projects.forEach(project => {
      project.eipNumbers.forEach(eipNumber => {
        stats.topEIPs[eipNumber] = (stats.topEIPs[eipNumber] || 0) + 1;
      });
    });

    return stats;
  }

  async searchProjects(query: string): Promise<Project[]> {
    const allProjects = await this.getAllProjects();
    const searchTerm = query.toLowerCase().trim();
    
    if (!searchTerm) return allProjects;

    return allProjects.filter(project =>
      project.name.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.implementationDetails.toLowerCase().includes(searchTerm) ||
      project.eipNumbers.some(eip => eip.toString().includes(searchTerm))
    );
  }
}

export const projectService = new ProjectService();