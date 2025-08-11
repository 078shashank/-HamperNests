import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission, type Action, type Resource } from '../lib/permissions';

export function useAuthorization() {
  const { user } = useAuth();

  const role = user?.role;

  const can = useMemo(
    () => (action: Action, resource: Resource) => hasPermission(role, action, resource),
    [role]
  );

  const requireAuthz = (action: Action, resource: Resource) => {
    return hasPermission(role, action, resource);
  };

  return { role, can, requireAuthz };
}

export default useAuthorization;
