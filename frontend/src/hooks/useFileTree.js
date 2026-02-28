import { useCallback, useEffect, useState } from 'react';
import { fetchTree } from '../services/treeApi';
import { normalizeTree } from '../utils/normalizeTree';

export function useFileTree() {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(() => new Set());

  useEffect(() => {
    let active = true;

    async function loadTree() {
      setLoading(true);
      setError(null);

      try {
        const rawData = await fetchTree();
        const normalizedTree = normalizeTree(rawData);

        if (active) {
          setTree(Array.isArray(normalizedTree) ? normalizedTree : []);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load tree');
          setTree([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTree();

    return () => {
      active = false;
    };
  }, []);

  const toggleFolder = useCallback((id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);
  return {
    tree,
    loading,
    error,
    expanded,
    toggleFolder
  };
}
