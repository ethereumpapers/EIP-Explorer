interface DuneQueryResult {
  execution_id: string;
  query_id: number;
  state: string;
  submitted_at: string;
  expires_at: string;
  execution_started_at?: string;
  execution_ended_at?: string;
  result?: {
    rows: any[];
    metadata: {
      column_names: string[];
      column_types: string[];
      row_count: number;
      result_set_bytes: number;
      total_row_count: number;
    };
  };
}

interface LiveMetrics {
  eipNumber: number;
  adoptionRate: number;
  transactionVolume: string;
  gasUsage: string;
  activeProjects: number;
  lastUpdated: string;
  additionalMetrics?: Record<string, any>;
}

class DuneService {
  private cache: Map<string, any> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes for live data
  private readonly API_BASE = 'https://api.dune.com/api/v1';

  // Note: In production, this should be stored securely as an environment variable
  private readonly API_KEY = import.meta.env.VITE_DUNE_API_KEY || '';

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

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    // Dune API disabled - using mock data only
    console.log('Dune API disabled - using mock data');
    return this.getMockData(endpoint);

    try {
      const response = await fetch(`${this.API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'X-Dune-API-Key': this.API_KEY,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Dune API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Dune API request failed:', error);
      return this.getMockData(endpoint);
    }
  }

  private getMockData(endpoint: string): any {
    // Fallback mock data when API is not available
    if (endpoint.includes('1559')) {
      return {
        result: {
          rows: [{
            total_burned_eth: 4200000,
            daily_burned_eth: 8500,
            avg_base_fee: 25,
            total_transactions: 1200000,
            adoption_rate: 100
          }]
        }
      };
    }
    
    if (endpoint.includes('721')) {
      return {
        result: {
          rows: [{
            total_collections: 45000,
            total_nfts: 12000000,
            daily_volume_eth: 2500,
            active_marketplaces: 25,
            adoption_rate: 95
          }]
        }
      };
    }

    if (endpoint.includes('4337')) {
      return {
        result: {
          rows: [{
            total_user_ops: 850000,
            daily_user_ops: 12000,
            active_wallets: 45000,
            bundlers_count: 15,
            adoption_rate: 25
          }]
        }
      };
    }

    return { result: { rows: [] } };
  }

  async getEIP1559Metrics(): Promise<LiveMetrics> {
    const cacheKey = 'eip-1559-metrics';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      // This would be a real Dune query ID for EIP-1559 metrics
      const data = await this.makeRequest('/query/1234567/results');
      
      const row = data.result?.rows?.[0] || {};
      
      const metrics: LiveMetrics = {
        eipNumber: 1559,
        adoptionRate: row.adoption_rate || 100,
        transactionVolume: this.formatNumber(row.total_transactions || 1200000) + '/day',
        gasUsage: this.formatNumber(row.total_burned_eth || 4200000) + ' ETH burned',
        activeProjects: row.active_implementations || 850,
        lastUpdated: new Date().toISOString(),
        additionalMetrics: {
          totalBurnedETH: row.total_burned_eth || 4200000,
          dailyBurnedETH: row.daily_burned_eth || 8500,
          avgBaseFee: row.avg_base_fee || 25
        }
      };

      this.setCache(cacheKey, metrics);
      return metrics;
    } catch (error) {
      console.error('Error fetching EIP-1559 metrics:', error);
      return this.getFallbackMetrics(1559);
    }
  }

  async getEIP721Metrics(): Promise<LiveMetrics> {
    const cacheKey = 'eip-721-metrics';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.makeRequest('/query/2345678/results');
      
      const row = data.result?.rows?.[0] || {};
      
      const metrics: LiveMetrics = {
        eipNumber: 721,
        adoptionRate: row.adoption_rate || 95,
        transactionVolume: this.formatNumber(row.daily_volume_eth || 2500) + ' ETH/day',
        gasUsage: this.formatNumber(row.daily_gas_used || 8000000) + ' gas/day',
        activeProjects: row.total_collections || 45000,
        lastUpdated: new Date().toISOString(),
        additionalMetrics: {
          totalCollections: row.total_collections || 45000,
          totalNFTs: row.total_nfts || 12000000,
          activeMarketplaces: row.active_marketplaces || 25
        }
      };

      this.setCache(cacheKey, metrics);
      return metrics;
    } catch (error) {
      console.error('Error fetching EIP-721 metrics:', error);
      return this.getFallbackMetrics(721);
    }
  }

  async getEIP4337Metrics(): Promise<LiveMetrics> {
    const cacheKey = 'eip-4337-metrics';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.makeRequest('/query/3456789/results');
      
      const row = data.result?.rows?.[0] || {};
      
      const metrics: LiveMetrics = {
        eipNumber: 4337,
        adoptionRate: row.adoption_rate || 25,
        transactionVolume: this.formatNumber(row.daily_user_ops || 12000) + ' ops/day',
        gasUsage: this.formatNumber(row.daily_gas_saved || 2500000) + ' gas saved/day',
        activeProjects: row.active_wallets || 45000,
        lastUpdated: new Date().toISOString(),
        additionalMetrics: {
          totalUserOps: row.total_user_ops || 850000,
          activeWallets: row.active_wallets || 45000,
          bundlersCount: row.bundlers_count || 15
        }
      };

      this.setCache(cacheKey, metrics);
      return metrics;
    } catch (error) {
      console.error('Error fetching EIP-4337 metrics:', error);
      return this.getFallbackMetrics(4337);
    }
  }

  async getEIP20Metrics(): Promise<LiveMetrics> {
    const cacheKey = 'eip-20-metrics';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.makeRequest('/query/4567890/results');
      
      const row = data.result?.rows?.[0] || {};
      
      const metrics: LiveMetrics = {
        eipNumber: 20,
        adoptionRate: row.adoption_rate || 99,
        transactionVolume: this.formatNumber(row.daily_transactions || 800000) + '/day',
        gasUsage: this.formatNumber(row.daily_gas_used || 12000000) + ' gas/day',
        activeProjects: row.total_tokens || 500000,
        lastUpdated: new Date().toISOString(),
        additionalMetrics: {
          totalTokens: row.total_tokens || 500000,
          totalMarketCap: row.total_market_cap || 2500000000000,
          activeTokens: row.active_tokens || 25000
        }
      };

      this.setCache(cacheKey, metrics);
      return metrics;
    } catch (error) {
      console.error('Error fetching EIP-20 metrics:', error);
      return this.getFallbackMetrics(20);
    }
  }

  async getEIP2981Metrics(): Promise<LiveMetrics> {
    const cacheKey = 'eip-2981-metrics';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.makeRequest('/query/5678901/results');
      
      const row = data.result?.rows?.[0] || {};
      
      const metrics: LiveMetrics = {
        eipNumber: 2981,
        adoptionRate: row.adoption_rate || 75,
        transactionVolume: this.formatNumber(row.daily_royalty_volume || 150) + ' ETH/day',
        gasUsage: this.formatNumber(row.implementations || 2500) + ' contracts',
        activeProjects: row.active_marketplaces || 15,
        lastUpdated: new Date().toISOString(),
        additionalMetrics: {
          totalRoyaltiesPaid: row.total_royalties_paid || 45000,
          implementations: row.implementations || 2500,
          supportingMarketplaces: row.active_marketplaces || 15
        }
      };

      this.setCache(cacheKey, metrics);
      return metrics;
    } catch (error) {
      console.error('Error fetching EIP-2981 metrics:', error);
      return this.getFallbackMetrics(2981);
    }
  }

  async getEIP4844Metrics(): Promise<LiveMetrics> {
    const cacheKey = 'eip-4844-metrics';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      // This would be a real Dune query ID for EIP-4844 metrics
      const data = await this.makeRequest('/query/6789012/results');
      const row = data.result?.rows?.[0] || {};
      const metrics: LiveMetrics = {
        eipNumber: 4844,
        adoptionRate: row.adoption_rate || 85,
        transactionVolume: this.formatNumber(row.daily_blobs || 2500000) + ' blobs/day',
        gasUsage: (row.l2_cost_reduction ? row.l2_cost_reduction + '% cost reduction' : '90% cost reduction'),
        activeProjects: row.active_rollups || 25,
        lastUpdated: new Date().toISOString(),
        additionalMetrics: {
          totalBlobs: row.total_blobs || 100000000,
          l2CostReduction: row.l2_cost_reduction || 90,
          activeRollups: row.active_rollups || 25
        }
      };
      this.setCache(cacheKey, metrics);
      return metrics;
    } catch (error) {
      console.error('Error fetching EIP-4844 metrics:', error);
      // Fallback data
      return {
        eipNumber: 4844,
        adoptionRate: 85,
        transactionVolume: '2.5M blobs/day',
        gasUsage: '90% cost reduction',
        activeProjects: 25,
        lastUpdated: new Date().toISOString(),
        additionalMetrics: {
          totalBlobs: 100000000,
          l2CostReduction: 90,
          activeRollups: 25
        }
      };
    }
  }

  private getFallbackMetrics(eipNumber: number): LiveMetrics {
    const fallbackData: Record<number, Partial<LiveMetrics>> = {
      1559: {
        adoptionRate: 100,
        transactionVolume: '1.2M/day',
        gasUsage: '4.2M ETH burned',
        activeProjects: 850
      },
      721: {
        adoptionRate: 95,
        transactionVolume: '2.5K ETH/day',
        gasUsage: '8M gas/day',
        activeProjects: 45000
      },
      4337: {
        adoptionRate: 25,
        transactionVolume: '12K ops/day',
        gasUsage: '2.5M gas saved/day',
        activeProjects: 45000
      },
      20: {
        adoptionRate: 99,
        transactionVolume: '800K/day',
        gasUsage: '12M gas/day',
        activeProjects: 500000
      },
      2981: {
        adoptionRate: 75,
        transactionVolume: '150 ETH/day',
        gasUsage: '2.5K contracts',
        activeProjects: 15
      }
    };

    const data = fallbackData[eipNumber] || {};
    
    return {
      eipNumber,
      adoptionRate: data.adoptionRate || 0,
      transactionVolume: data.transactionVolume || '0',
      gasUsage: data.gasUsage || '0',
      activeProjects: data.activeProjects || 0,
      lastUpdated: new Date().toISOString(),
      additionalMetrics: {}
    };
  }

  private formatNumber(num: number): string {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  async getAllMetrics(): Promise<LiveMetrics[]> {
    try {
      const [eip1559, eip721, eip4337, eip20, eip2981, eip4844] = await Promise.all([
        this.getEIP1559Metrics(),
        this.getEIP721Metrics(),
        this.getEIP4337Metrics(),
        this.getEIP20Metrics(),
        this.getEIP2981Metrics(),
        this.getEIP4844Metrics()
      ]);
      return [eip1559, eip721, eip4337, eip20, eip2981, eip4844];
    } catch (error) {
      console.error('Error fetching all metrics:', error);
      return [];
    }
  }
}

export const duneService = new DuneService();
export type { LiveMetrics };