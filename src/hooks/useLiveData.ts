import { useState, useEffect } from 'react';
import { duneService, LiveMetrics } from '../services/duneService';
import { liveDataService, LiveEIPData, LiveProjectData, LiveNetworkData, LiveEIPMetrics } from '../services/liveDataService';

interface UseLiveDataResult {
  metrics: LiveMetrics[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
}

interface UseLiveEIPDataResult {
  eipData: LiveEIPData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
}

interface UseLiveProjectDataResult {
  projectData: LiveProjectData[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
}

interface UseLiveNetworkDataResult {
  networkData: LiveNetworkData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refetch: () => Promise<void>;
}

interface UseLiveTrackingResult {
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;
  lastUpdate: any | null;
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
    
    // Set up periodic refresh every 5 minutes for live data
    const interval = setInterval(fetchMetrics, 5 * 60 * 1000);
    
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

// New hook for live EIP data
export function useLiveEIPData(eipNumbers: number[]): UseLiveEIPDataResult {
  const [eipData, setEipData] = useState<LiveEIPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchEIPData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await liveDataService.getLiveEIPData(eipNumbers);
      setEipData(data);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live EIP data');
      console.error('Error fetching live EIP data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (eipNumbers.length > 0) {
      fetchEIPData();
      
      // Set up periodic refresh every 2 minutes for live EIP data
      const interval = setInterval(fetchEIPData, 2 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [eipNumbers.join(',')]);

  return {
    eipData,
    loading,
    error,
    lastUpdated,
    refetch: fetchEIPData
  };
}

// New hook for live project data
export function useLiveProjectData(projectIds: string[]): UseLiveProjectDataResult {
  const [projectData, setProjectData] = useState<LiveProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await liveDataService.getLiveProjectData(projectIds);
      setProjectData(data);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live project data');
      console.error('Error fetching live project data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectIds.length > 0) {
      fetchProjectData();
      
      // Set up periodic refresh every 3 minutes for live project data
      const interval = setInterval(fetchProjectData, 3 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [projectIds.join(',')]);

  return {
    projectData,
    loading,
    error,
    lastUpdated,
    refetch: fetchProjectData
  };
}

// New hook for live network data
export function useLiveNetworkData(): UseLiveNetworkDataResult {
  const [networkData, setNetworkData] = useState<LiveNetworkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchNetworkData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await liveDataService.getLiveNetworkData();
      setNetworkData(data);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch live network data');
      console.error('Error fetching live network data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNetworkData();
    
    // Set up periodic refresh every 1 minute for live network data
    const interval = setInterval(fetchNetworkData, 1 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    networkData,
    loading,
    error,
    lastUpdated,
    refetch: fetchNetworkData
  };
}

// New hook for real-time tracking
export function useLiveTracking(): UseLiveTrackingResult {
  const [isTracking, setIsTracking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<any | null>(null);
  const [cleanup, setCleanup] = useState<(() => void) | null>(null);

  const startTracking = () => {
    if (!isTracking) {
      setIsTracking(true);
      const cleanupFn = liveDataService.startLiveTracking((data) => {
        setLastUpdate(data);
      });
      setCleanup(() => cleanupFn);
    }
  };

  const stopTracking = () => {
    if (isTracking && cleanup) {
      cleanup();
      setIsTracking(false);
      setCleanup(null);
    }
  };

  useEffect(() => {
    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, [cleanup]);

  return {
    isTracking,
    startTracking,
    stopTracking,
    lastUpdate
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