import { useState, useEffect } from 'react';
import { EIP } from '../types/eip';
import { eipService } from '../services/eipService';

interface UseEIPsResult {
  eips: EIP[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    byStatus: Record<string, number>;
    byCategory: Record<string, number>;
    byType: Record<string, number>;
    recentlyUpdated: number;
  };
  refetch: () => Promise<void>;
}

export function useEIPs(): UseEIPsResult {
  const [eips, setEIPs] = useState<EIP[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    byStatus: {},
    byCategory: {},
    byType: {},
    recentlyUpdated: 0
  });

  const fetchEIPs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const fetchedEIPs = await eipService.getAllEIPs();
      setEIPs(fetchedEIPs);
      
      const eipStats = eipService.getEIPStats(fetchedEIPs);
      setStats(eipStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch EIPs');
      console.error('Error fetching EIPs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEIPs();
  }, []);

  return {
    eips,
    loading,
    error,
    stats,
    refetch: fetchEIPs
  };
}

export function useEIP(eipNumber: number) {
  const [eip, setEIP] = useState<EIP | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEIP = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedEIP = await eipService.getEIPByNumber(eipNumber);
        setEIP(fetchedEIP);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch EIP');
        console.error(`Error fetching EIP-${eipNumber}:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (eipNumber > 0) {
      fetchEIP();
    }
  }, [eipNumber]);

  return { eip, loading, error };
}