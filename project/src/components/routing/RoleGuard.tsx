import React from 'react';
import { useAuthorization } from '../../hooks/useAuthorization';
import type { Action, Resource } from '../../lib/permissions';

interface RoleGuardProps {
  action: Action;
  resource: Resource;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

// Usage: <RoleGuard action="update" resource="products"> ... </RoleGuard>
export const RoleGuard: React.FC<RoleGuardProps> = ({ action, resource, fallback = null, children }) => {
  const { can } = useAuthorization();

  if (!can(action, resource)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default RoleGuard;
