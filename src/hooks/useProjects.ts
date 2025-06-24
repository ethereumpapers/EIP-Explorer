import { useState, useEffect } from 'react';
import { Project } from '../types/eip';
import { projectService } from '../services/projectService';

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    active: number;
    beta: number;
    deprecated: number;
    byCategory: Record<string, number>;
    topEIPs: Record<number, number>;
  };
  refetch: () => Promise<void>;
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    beta: 0,
    deprecated: 0,
    byCategory: {},
    topEIPs: {}
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [fetchedProjects, projectStats] = await Promise.all([
        projectService.getAllProjects(),
        projectService.getProjectStats()
      ]);
      
      setProjects(fetchedProjects);
      setStats(projectStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    stats,
    refetch: fetchProjects
  };
}

export function useProjectsByEIP(eipNumber: number) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsByEIP = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const eipProjects = await projectService.getProjectsByEIP(eipNumber);
        setProjects(eipProjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
        console.error(`Error fetching projects for EIP-${eipNumber}:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (eipNumber > 0) {
      fetchProjectsByEIP();
    }
  }, [eipNumber]);

  return { projects, loading, error };
}