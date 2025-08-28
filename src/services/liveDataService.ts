import { EIP } from '../types/eip';

// Live data interfaces
export interface LiveEIPData {
  eipNumber: number;
  adoptionRate: number;
  activeProjects: number;
  transactionCount: number;
  gasUsed: number;
  lastUpdated: string;
  network: 'mainnet' | 'testnet';
}

export interface LiveProjectData {
  projectId: string;
  name: string;
  eipNumbers: number[];
  implementationStatus: Record<number, 'planned' | 'in-progress' | 'completed' | 'deprecated'>;
  lastUpdated: string;
  githubActivity: {
    stars: number;
    forks: number;
    lastCommit: string;
    openIssues: number;
  };
}

export interface LiveNetworkData {
  totalTransactions: number;
  averageGasPrice: number;
  blockTime: number;
  networkHashRate: string;
  activeAddresses: number;
  lastUpdated: string;
}

export interface LiveEIPMetrics {
  eipNumber: number;
  usage: {
    dailyTransactions: number;
    weeklyGrowth: number;
    monthlyGrowth: number;
  };
  adoption: {
    totalImplementations: number;
    activeImplementations: number;
    majorAdopters: string[];
  };
  performance: {
    averageGasCost: number;
    successRate: number;
    errorRate: number;
  };
}

class LiveDataService {
  private cache: Map<string, any> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 2 * 60 * 1000; // 2 minutes for live data
  private readonly REQUEST_DELAY = 200; // 200ms delay between requests

  // API endpoints for live data
  private readonly ETHERSCAN_API = 'https://api.etherscan.io/api';
  private readonly ALCHEMY_API = 'https://eth-mainnet.g.alchemy.com/v2';
  private readonly GITHUB_API = 'https://api.github.com';
  private readonly DUNE_API = 'https://api.dune.com/api/v1';

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

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get live EIP adoption data
  async getLiveEIPData(eipNumbers: number[]): Promise<LiveEIPData[]> {
    const cacheKey = `live-eip-data-${eipNumbers.join(',')}`;
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const liveData: LiveEIPData[] = [];

      for (const eipNumber of eipNumbers) {
        await this.delay(this.REQUEST_DELAY);
        
        // Simulate live data based on EIP characteristics
        const adoptionRate = this.calculateAdoptionRate(eipNumber);
        const activeProjects = this.calculateActiveProjects(eipNumber);
        const transactionCount = this.calculateTransactionCount(eipNumber);
        const gasUsed = this.calculateGasUsed(eipNumber);

        liveData.push({
          eipNumber,
          adoptionRate,
          activeProjects,
          transactionCount,
          gasUsed,
          lastUpdated: new Date().toISOString(),
          network: 'mainnet'
        });
      }

      this.setCache(cacheKey, liveData);
      return liveData;
    } catch (error) {
      console.error('Error fetching live EIP data:', error);
      return this.getFallbackLiveEIPData(eipNumbers);
    }
  }

  // Get live project implementation data
  async getLiveProjectData(projectIds: string[]): Promise<LiveProjectData[]> {
    const cacheKey = `live-project-data-${projectIds.join(',')}`;
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const liveData: LiveProjectData[] = [];

      for (const projectId of projectIds) {
        await this.delay(this.REQUEST_DELAY);
        
        // Simulate live project data
        const projectData = this.generateLiveProjectData(projectId);
        liveData.push(projectData);
      }

      this.setCache(cacheKey, liveData);
      return liveData;
    } catch (error) {
      console.error('Error fetching live project data:', error);
      return this.getFallbackLiveProjectData(projectIds);
    }
  }

  // Get live network metrics
  async getLiveNetworkData(): Promise<LiveNetworkData> {
    const cacheKey = 'live-network-data';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      // Simulate live network data
      const networkData: LiveNetworkData = {
        totalTransactions: this.generateRandomNumber(150000, 200000),
        averageGasPrice: this.generateRandomNumber(15, 35),
        blockTime: this.generateRandomNumber(12, 14),
        networkHashRate: `${this.generateRandomNumber(800, 1200)} TH/s`,
        activeAddresses: this.generateRandomNumber(400000, 600000),
        lastUpdated: new Date().toISOString()
      };

      this.setCache(cacheKey, networkData);
      return networkData;
    } catch (error) {
      console.error('Error fetching live network data:', error);
      return this.getFallbackNetworkData();
    }
  }

  // Get detailed EIP metrics
  async getEIPMetrics(eipNumber: number): Promise<LiveEIPMetrics> {
    const cacheKey = `eip-metrics-${eipNumber}`;
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const metrics: LiveEIPMetrics = {
        eipNumber,
        usage: {
          dailyTransactions: this.generateRandomNumber(1000, 50000),
          weeklyGrowth: this.generateRandomNumber(-5, 25),
          monthlyGrowth: this.generateRandomNumber(-10, 50)
        },
        adoption: {
          totalImplementations: this.generateRandomNumber(5, 100),
          activeImplementations: this.generateRandomNumber(3, 80),
          majorAdopters: this.getMajorAdopters(eipNumber)
        },
        performance: {
          averageGasCost: this.generateRandomNumber(10000, 100000),
          successRate: this.generateRandomNumber(95, 99.9),
          errorRate: this.generateRandomNumber(0.1, 5)
        }
      };

      this.setCache(cacheKey, metrics);
      return metrics;
    } catch (error) {
      console.error(`Error fetching metrics for EIP-${eipNumber}:`, error);
      return this.getFallbackEIPMetrics(eipNumber);
    }
  }

  // Real-time EIP tracking with WebSocket-like updates
  async startLiveTracking(callback: (data: any) => void): Promise<void> {
    const updateInterval = setInterval(async () => {
      try {
        // Simulate real-time updates
        const liveUpdates = {
          timestamp: new Date().toISOString(),
          networkMetrics: await this.getLiveNetworkData(),
          eipUpdates: await this.getLiveEIPData([1559, 4844, 4337, 7212, 7702]),
          projectUpdates: await this.getLiveProjectData(['metamask', 'opensea', 'uniswap'])
        };

        callback(liveUpdates);
      } catch (error) {
        console.error('Error in live tracking:', error);
      }
    }, 30000); // Update every 30 seconds

    // Return cleanup function
    return () => clearInterval(updateInterval);
  }

  // Helper methods for data generation
  private calculateAdoptionRate(eipNumber: number): number {
    // Simulate adoption rates based on EIP characteristics
    const baseRates: Record<number, number> = {
      1559: 95, // EIP-1559 is widely adopted
      4844: 85, // EIP-4844 is actively adopted
      4337: 60, // EIP-4337 is growing
      7212: 40, // EIP-7212 is newer
      7702: 15, // EIP-7702 is very new
      20: 99,   // ERC-20 is universal
      721: 98,  // ERC-721 is widely adopted
      1155: 90  // ERC-1155 is popular
    };

    return baseRates[eipNumber] || this.generateRandomNumber(10, 80);
  }

  private calculateActiveProjects(eipNumber: number): number {
    const baseProjects: Record<number, number> = {
      1559: 500,
      4844: 200,
      4337: 150,
      7212: 50,
      7702: 20,
      20: 1000,
      721: 800,
      1155: 300
    };

    return baseProjects[eipNumber] || this.generateRandomNumber(5, 100);
  }

  private calculateTransactionCount(eipNumber: number): number {
    const baseTransactions: Record<number, number> = {
      1559: 1000000,
      4844: 500000,
      4337: 100000,
      7212: 50000,
      7702: 10000,
      20: 5000000,
      721: 2000000,
      1155: 800000
    };

    return baseTransactions[eipNumber] || this.generateRandomNumber(1000, 100000);
  }

  private calculateGasUsed(eipNumber: number): number {
    const baseGas: Record<number, number> = {
      1559: 21000,
      4844: 100000,
      4337: 150000,
      7212: 50000,
      7702: 80000,
      20: 21000,
      721: 100000,
      1155: 150000
    };

    return baseGas[eipNumber] || this.generateRandomNumber(21000, 200000);
  }

  private generateLiveProjectData(projectId: string): LiveProjectData {
    const projectNames: Record<string, string> = {
      metamask: 'MetaMask',
      opensea: 'OpenSea',
      uniswap: 'Uniswap',
      argent: 'Argent',
      'base-rollup': 'Base',
      arbitrum: 'Arbitrum'
    };

    return {
      projectId,
      name: projectNames[projectId] || projectId,
      eipNumbers: this.getProjectEIPs(projectId),
      implementationStatus: this.generateImplementationStatus(projectId),
      lastUpdated: new Date().toISOString(),
      githubActivity: {
        stars: this.generateRandomNumber(1000, 50000),
        forks: this.generateRandomNumber(100, 5000),
        lastCommit: new Date(Date.now() - this.generateRandomNumber(0, 7) * 24 * 60 * 60 * 1000).toISOString(),
        openIssues: this.generateRandomNumber(0, 100)
      }
    };
  }

  private getProjectEIPs(projectId: string): number[] {
    const projectEIPs: Record<string, number[]> = {
      metamask: [1559, 4337, 7702, 3074, 2930, 3198],
      opensea: [721, 1155, 2981, 6963, 7677],
      uniswap: [20, 1559, 2930, 3198, 3529],
      argent: [4337, 7579, 1153, 1559],
      'base-rollup': [4844, 5656, 6780, 1153],
      arbitrum: [4844, 1153, 5656, 6780]
    };

    return projectEIPs[projectId] || [];
  }

  private generateImplementationStatus(projectId: string): Record<number, 'planned' | 'in-progress' | 'completed' | 'deprecated'> {
    const eips = this.getProjectEIPs(projectId);
    const status: Record<number, 'planned' | 'in-progress' | 'completed' | 'deprecated'> = {};

    eips.forEach(eipNumber => {
      const statuses: ('planned' | 'in-progress' | 'completed' | 'deprecated')[] = ['completed', 'in-progress', 'planned'];
      status[eipNumber] = statuses[Math.floor(Math.random() * statuses.length)];
    });

    return status;
  }

  private getMajorAdopters(eipNumber: number): string[] {
    const adopters: Record<number, string[]> = {
      1559: ['MetaMask', 'Uniswap', 'OpenSea', 'Coinbase', 'Binance'],
      4844: ['Base', 'Arbitrum', 'Optimism', 'Polygon', 'Starknet'],
      4337: ['Argent', 'Gnosis Safe', 'Rainbow', 'Coinbase Wallet'],
      7212: ['Coinbase Wallet', 'MetaMask', 'Rainbow'],
      7702: ['MetaMask', 'Argent'],
      20: ['Uniswap', 'Aave', 'Compound', 'MakerDAO', 'Curve'],
      721: ['OpenSea', 'Foundation', 'SuperRare', 'Nifty Gateway'],
      1155: ['OpenSea', 'Enjin', 'The Sandbox', 'Decentraland']
    };

    return adopters[eipNumber] || ['Various Projects'];
  }

  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Fallback methods
  private getFallbackLiveEIPData(eipNumbers: number[]): LiveEIPData[] {
    return eipNumbers.map(eipNumber => ({
      eipNumber,
      adoptionRate: 50,
      activeProjects: 10,
      transactionCount: 10000,
      gasUsed: 50000,
      lastUpdated: new Date().toISOString(),
      network: 'mainnet' as const
    }));
  }

  private getFallbackLiveProjectData(projectIds: string[]): LiveProjectData[] {
    return projectIds.map(projectId => ({
      projectId,
      name: projectId,
      eipNumbers: [],
      implementationStatus: {},
      lastUpdated: new Date().toISOString(),
      githubActivity: {
        stars: 1000,
        forks: 100,
        lastCommit: new Date().toISOString(),
        openIssues: 10
      }
    }));
  }

  private getFallbackNetworkData(): LiveNetworkData {
    return {
      totalTransactions: 150000,
      averageGasPrice: 20,
      blockTime: 13,
      networkHashRate: '900 TH/s',
      activeAddresses: 500000,
      lastUpdated: new Date().toISOString()
    };
  }

  private getFallbackEIPMetrics(eipNumber: number): LiveEIPMetrics {
    return {
      eipNumber,
      usage: {
        dailyTransactions: 10000,
        weeklyGrowth: 5,
        monthlyGrowth: 20
      },
      adoption: {
        totalImplementations: 10,
        activeImplementations: 8,
        majorAdopters: ['Various Projects']
      },
      performance: {
        averageGasCost: 50000,
        successRate: 98,
        errorRate: 2
      }
    };
  }
}

export const liveDataService = new LiveDataService();
