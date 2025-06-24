import { useState, useEffect } from 'react';
import { duneService, LiveMetrics } from '../services/duneService';

interface UseLiveDataResult {
  metrics: LiveMetrics[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
}

export function useLiveData(): UseLiveDataResult {
  const [metrics, setMetrics] = useState<LiveMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const allMetrics = await duneService.getAllMetrics();
      setMetrics(allMetrics);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live metrics');
      console.error('Error fetching live metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    
    // Set up periodic refresh every 10 minutes
    const interval = setInterval(fetchMetrics, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    metrics,
    loading,
    error,
    lastUpdated,
    refetch: fetchMetrics
  };
}

export function useEIPMetrics(eipNumber: number) {
  const [metrics, setMetrics] = useState<LiveMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEIPMetrics = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let eipMetrics: LiveMetrics | null = null;
        
        switch (eipNumber) {
          case 1559:
            eipMetrics = await duneService.getEIP1559Metrics();
            break;
          case 721:
            eipMetrics = await duneService.getEIP721Metrics();
            break;
          case 4337:
            eipMetrics = await duneService.getEIP4337Metrics();
            break;
          case 20:
            eipMetrics = await duneService.getEIP20Metrics();
            break;
          case 2981:
            eipMetrics = await duneService.getEIP2981Metrics();
            break;
          default:
            eipMetrics = null;
        }
        
        setMetrics(eipMetrics);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch EIP metrics');
        console.error(`Error fetching EIP-${eipNumber} metrics:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (eipNumber > 0) {
      fetchEIPMetrics();
    }
  }, [eipNumber]);

  return { metrics, loading, error };
}