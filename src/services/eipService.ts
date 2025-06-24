import { EIP } from '../types/eip';

const GITHUB_API_BASE = 'https://api.github.com/repos/ethereum/EIPs';
const EIP_CONTENT_BASE = 'https://raw.githubusercontent.com/ethereum/EIPs/master/EIPS';

interface GitHubEIPFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
}

interface EIPMetadata {
  eip: number;
  title: string;
  author: string[];
  status: string;
  type: string;
  category?: string;
  created: string;
  updated?: string;
  description: string;
  discussions?: string;
  requires?: number[];
  supersededBy?: number[];
  replaces?: number[];
}

class EIPService {
  private cache: Map<string, any> = new Map();
  private cacheExpiry: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly REQUEST_DELAY = 100; // 100ms delay between requests

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

  async fetchEIPFiles(): Promise<GitHubEIPFile[]> {
    const cacheKey = 'eip-files';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(`${GITHUB_API_BASE}/contents/EIPS`);
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }
      
      const files: GitHubEIPFile[] = await response.json();
      const eipFiles = files.filter(file => 
        file.name.startsWith('eip-') && 
        file.name.endsWith('.md') &&
        file.type === 'file'
      );

      this.setCache(cacheKey, eipFiles);
      return eipFiles;
    } catch (error) {
      console.error('Error fetching EIP files:', error);
      // Return fallback data for development
      return this.getFallbackEIPFiles();
    }
  }

  private getFallbackEIPFiles(): GitHubEIPFile[] {
    // Fallback data for when GitHub API is not available
    const fallbackEIPs = [1, 20, 55, 137, 155, 162, 165, 173, 191, 721, 777, 1155, 1559, 1967, 2309, 2535, 2612, 2981, 3156, 4337, 4626, 4844];
    
    return fallbackEIPs.map(num => ({
      name: `eip-${num}.md`,
      path: `EIPS/eip-${num}.md`,
      sha: `sha-${num}`,
      size: 1000,
      url: `${GITHUB_API_BASE}/contents/EIPS/eip-${num}.md`,
      html_url: `https://github.com/ethereum/EIPs/blob/master/EIPS/eip-${num}.md`,
      git_url: `${GITHUB_API_BASE}/git/blobs/sha-${num}`,
      download_url: `${EIP_CONTENT_BASE}/eip-${num}.md`,
      type: 'file'
    }));
  }

  private parseEIPNumber(filename: string): number {
    const match = filename.match(/eip-(\d+)\.md/);
    return match ? parseInt(match[1], 10) : 0;
  }

  private parseEIPContent(content: string): EIPMetadata | null {
    try {
      // Extract frontmatter
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return null;

      const frontmatter = frontmatterMatch[1];
      const bodyContent = content.substring(frontmatterMatch[0].length);

      // Parse YAML-like frontmatter
      const metadata: any = {};
      const lines = frontmatter.split('\n');
      
      for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;
        
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        // Handle arrays (authors)
        if (key === 'author' && value.includes(',')) {
          metadata[key] = value.split(',').map(s => s.trim());
        } else if (key === 'author') {
          metadata[key] = [value];
        } else if (key === 'requires' || key === 'superseded-by' || key === 'replaces') {
          metadata[key] = value.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
        } else {
          metadata[key] = value;
        }
      }

      // Extract description from content
      const descriptionMatch = bodyContent.match(/## Abstract\s*\n\n(.*?)(?=\n\n##|\n\n$)/s);
      const description = descriptionMatch ? descriptionMatch[1].trim() : '';

      return {
        eip: metadata.eip || 0,
        title: metadata.title || '',
        author: metadata.author || [],
        status: metadata.status || 'Draft',
        type: metadata.type || 'Standards Track',
        category: metadata.category,
        created: metadata.created || '',
        updated: metadata['last-call-deadline'] || metadata.updated,
        description: description.substring(0, 300) + (description.length > 300 ? '...' : ''),
        discussions: metadata['discussions-to'],
        requires: metadata.requires,
        supersededBy: metadata['superseded-by'],
        replaces: metadata.replaces
      };
    } catch (error) {
      console.error('Error parsing EIP content:', error);
      return null;
    }
  }

  private getFallbackEIPData(eipNumber: number): EIP | null {
    const fallbackData: Record<number, Partial<EIP>> = {
      1559: {
        title: "Fee market change for ETH 1.0 chain",
        author: ["Vitalik Buterin", "Eric Conner", "Rick Dudley", "Matthew Slipper", "Ian Norden", "Abdelhamid Bakhta"],
        status: "Final",
        type: "Standards Track",
        category: "Core",
        created: "2019-04-13",
        updated: "2021-08-05",
        description: "A transaction pricing mechanism that includes fixed-per-block network fee that is burned and dynamically expands/contracts block sizes to deal with transient congestion."
      },
      721: {
        title: "Non-Fungible Token Standard",
        author: ["William Entriken", "Dieter Shirley", "Jacob Evans", "Nastassia Sachs"],
        status: "Final",
        type: "Standards Track",
        category: "ERC",
        created: "2018-01-24",
        updated: "2018-07-17",
        description: "A standard interface for non-fungible tokens, also known as deeds."
      },
      4337: {
        title: "Account Abstraction Using Alt Mempool",
        author: ["Vitalik Buterin", "Yoav Weiss", "Kristof Gazso", "Namra Patel", "Dror Tirosh", "Shahaf Nacson", "Tjaden Hess"],
        status: "Draft",
        type: "Standards Track",
        category: "ERC",
        created: "2021-09-29",
        updated: "2023-06-29",
        description: "An account abstraction proposal which completely avoids the need for consensus-layer protocol changes."
      },
      20: {
        title: "Token Standard",
        author: ["Fabian Vogelsteller", "Vitalik Buterin"],
        status: "Final",
        type: "Standards Track",
        category: "ERC",
        created: "2015-11-19",
        description: "A standard interface for tokens."
      },
      2981: {
        title: "NFT Royalty Standard",
        author: ["Zach Burks", "James Morgan", "Blaine Malone", "James Seibel"],
        status: "Final",
        type: "Standards Track",
        category: "ERC",
        created: "2020-09-15",
        updated: "2023-01-07",
        description: "A standardized way to retrieve royalty payment information for non-fungible tokens (NFTs)."
      }
    };

    const data = fallbackData[eipNumber];
    if (!data) return null;

    return {
      number: eipNumber,
      title: data.title || '',
      author: data.author || [],
      status: data.status as EIP['status'] || 'Draft',
      type: data.type as EIP['type'] || 'Standards Track',
      category: data.category as EIP['category'],
      created: data.created || '',
      updated: data.updated,
      description: data.description || '',
      content: `# EIP-${eipNumber}: ${data.title}\n\n## Abstract\n\n${data.description}\n\n## Specification\n\n[Content would be loaded from GitHub in production]`,
      discussions: `https://ethereum-magicians.org/t/eip-${eipNumber}`
    };
  }

  async fetchEIPContent(eipNumber: number): Promise<string> {
    const cacheKey = `eip-content-${eipNumber}`;
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      await this.delay(this.REQUEST_DELAY); // Rate limiting
      
      const response = await fetch(`${EIP_CONTENT_BASE}/eip-${eipNumber}.md`);
      if (!response.ok) {
        throw new Error(`Failed to fetch EIP-${eipNumber} content`);
      }
      
      const content = await response.text();
      this.setCache(cacheKey, content);
      return content;
    } catch (error) {
      console.error(`Error fetching EIP-${eipNumber} content:`, error);
      // Return fallback content
      const fallbackEIP = this.getFallbackEIPData(eipNumber);
      return fallbackEIP?.content || '';
    }
  }

  async getAllEIPs(): Promise<EIP[]> {
    const cacheKey = 'all-eips';
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const files = await this.fetchEIPFiles();
      const eips: EIP[] = [];

      // Process files in smaller batches with better error handling
      const batchSize = 5;
      for (let i = 0; i < Math.min(files.length, 50); i += batchSize) { // Limit to first 50 for performance
        const batch = files.slice(i, i + batchSize);
        const batchPromises = batch.map(async (file) => {
          try {
            const eipNumber = this.parseEIPNumber(file.name);
            if (eipNumber === 0) return null;

            const content = await this.fetchEIPContent(eipNumber);
            if (!content) {
              // Use fallback data if content fetch fails
              return this.getFallbackEIPData(eipNumber);
            }

            const metadata = this.parseEIPContent(content);
            if (!metadata) {
              return this.getFallbackEIPData(eipNumber);
            }

            return {
              number: eipNumber,
              title: metadata.title,
              author: metadata.author,
              status: metadata.status as EIP['status'],
              type: metadata.type as EIP['type'],
              category: metadata.category as EIP['category'],
              created: metadata.created,
              updated: metadata.updated,
              description: metadata.description,
              content: content,
              discussions: metadata.discussions,
              requires: metadata.requires,
              supersededBy: metadata.supersededBy,
              replaces: metadata.replaces
            } as EIP;
          } catch (error) {
            console.error(`Error processing EIP file ${file.name}:`, error);
            const eipNumber = this.parseEIPNumber(file.name);
            return this.getFallbackEIPData(eipNumber);
          }
        });

        const batchResults = await Promise.allSettled(batchPromises);
        const validEIPs = batchResults
          .filter(result => result.status === 'fulfilled' && result.value !== null)
          .map(result => (result as PromiseFulfilledResult<EIP>).value);

        eips.push(...validEIPs);

        // Add delay between batches
        if (i + batchSize < files.length) {
          await this.delay(1000);
        }
      }

      // Add fallback EIPs if we don't have enough data
      if (eips.length < 10) {
        const fallbackNumbers = [1559, 721, 4337, 20, 2981, 1155, 777, 165, 173, 191];
        for (const num of fallbackNumbers) {
          if (!eips.find(eip => eip.number === num)) {
            const fallbackEIP = this.getFallbackEIPData(num);
            if (fallbackEIP) {
              eips.push(fallbackEIP);
            }
          }
        }
      }

      // Sort by EIP number
      eips.sort((a, b) => a.number - b.number);

      this.setCache(cacheKey, eips);
      return eips;
    } catch (error) {
      console.error('Error fetching all EIPs:', error);
      // Return fallback EIPs
      const fallbackNumbers = [1559, 721, 4337, 20, 2981];
      const fallbackEIPs = fallbackNumbers
        .map(num => this.getFallbackEIPData(num))
        .filter(eip => eip !== null) as EIP[];
      
      this.setCache(cacheKey, fallbackEIPs);
      return fallbackEIPs;
    }
  }

  async getEIPByNumber(eipNumber: number): Promise<EIP | null> {
    const cacheKey = `eip-${eipNumber}`;
    const cached = this.getCache(cacheKey);
    if (cached) return cached;

    try {
      const content = await this.fetchEIPContent(eipNumber);
      if (!content) {
        return this.getFallbackEIPData(eipNumber);
      }

      const metadata = this.parseEIPContent(content);
      if (!metadata) {
        return this.getFallbackEIPData(eipNumber);
      }

      const eip: EIP = {
        number: eipNumber,
        title: metadata.title,
        author: metadata.author,
        status: metadata.status as EIP['status'],
        type: metadata.type as EIP['type'],
        category: metadata.category as EIP['category'],
        created: metadata.created,
        updated: metadata.updated,
        description: metadata.description,
        content: content,
        discussions: metadata.discussions,
        requires: metadata.requires,
        supersededBy: metadata.supersededBy,
        replaces: metadata.replaces
      };

      this.setCache(cacheKey, eip);
      return eip;
    } catch (error) {
      console.error(`Error fetching EIP-${eipNumber}:`, error);
      return this.getFallbackEIPData(eipNumber);
    }
  }

  async searchEIPs(query: string, eips?: EIP[]): Promise<EIP[]> {
    if (!eips) {
      eips = await this.getAllEIPs();
    }

    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) return eips;

    return eips.filter(eip => 
      eip.number.toString().includes(searchTerm) ||
      eip.title.toLowerCase().includes(searchTerm) ||
      eip.description.toLowerCase().includes(searchTerm) ||
      eip.author.some(author => author.toLowerCase().includes(searchTerm)) ||
      eip.content.toLowerCase().includes(searchTerm) ||
      (eip.category && eip.category.toLowerCase().includes(searchTerm)) ||
      eip.status.toLowerCase().includes(searchTerm) ||
      eip.type.toLowerCase().includes(searchTerm)
    );
  }

  getEIPStats(eips: EIP[]) {
    const stats = {
      total: eips.length,
      byStatus: {} as Record<string, number>,
      byCategory: {} as Record<string, number>,
      byType: {} as Record<string, number>,
      recentlyUpdated: 0
    };

    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    eips.forEach(eip => {
      // Count by status
      stats.byStatus[eip.status] = (stats.byStatus[eip.status] || 0) + 1;

      // Count by category
      if (eip.category) {
        stats.byCategory[eip.category] = (stats.byCategory[eip.category] || 0) + 1;
      }

      // Count by type
      stats.byType[eip.type] = (stats.byType[eip.type] || 0) + 1;

      // Count recently updated
      const updatedDate = new Date(eip.updated || eip.created);
      if (updatedDate > oneMonthAgo) {
        stats.recentlyUpdated++;
      }
    });

    return stats;
  }
}

export const eipService = new EIPService();