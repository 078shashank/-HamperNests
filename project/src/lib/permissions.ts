// Centralized Role-Based Access Control (RBAC) permissions
// Defines what actions each role can perform on which resources

import { User } from '../types';

// Actions and resources can be expanded as needed
export type Action =
  | 'view'
  | 'create'
  | 'update'
  | 'delete'
  | 'manage' // implies all actions
  | 'approve' // admin approval for sellers/products
  | 'fulfill' // order fulfillment
  | 'refund';

export type Resource =
  | 'users'
  | 'seller_profiles'
  | 'products'
  | 'orders'
  | 'order_items'
  | 'categories'
  | 'reviews'
  | 'coupons'
  | 'analytics'
  | 'announcements'
  | 'wishlist'
  | 'cart';

// Permission map per role
const permissions: Record<User['role'], Array<{ action: Action | Action[]; resource: Resource | Resource[] }>> = {
  admin: [
    { action: 'manage', resource: ['users', 'seller_profiles', 'products', 'orders', 'order_items', 'categories', 'reviews', 'coupons', 'analytics', 'announcements'] },
    { action: 'approve', resource: ['seller_profiles', 'products', 'reviews'] },
    { action: 'refund', resource: ['orders'] },
  ],
  seller: [
    { action: ['create', 'update', 'delete', 'view'], resource: ['products', 'coupons'] },
    { action: ['view', 'fulfill', 'update'], resource: ['orders', 'order_items'] },
    { action: 'view', resource: ['analytics'] },
    { action: 'update', resource: ['seller_profiles'] },
  ],
  customer: [
    { action: ['view', 'create', 'update', 'delete'], resource: ['cart', 'wishlist'] },
    { action: ['create', 'view'], resource: ['orders'] },
    { action: ['create', 'view'], resource: ['reviews'] },
    { action: 'view', resource: ['products', 'categories', 'announcements'] },
  ],
};

function expand<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

// Check if a role has permission to perform an action on a resource
export function hasPermission(
  role: User['role'] | undefined,
  action: Action,
  resource: Resource
): boolean {
  if (!role) return false;

  const roleRules = permissions[role] || [];
  for (const rule of roleRules) {
    const actions = expand(rule.action);
    const resources = expand(rule.resource);

    const actionAllowed = actions.includes('manage') || actions.includes(action);
    const resourceAllowed = resources.includes(resource);

    if (actionAllowed && resourceAllowed) return true;
  }

  return false;
}

// Helper to get all permissions for a role (useful for UI)
export function getRolePermissions(role: User['role']): Array<{ action: Action; resource: Resource }> {
  const rules = permissions[role] || [];
  const expanded: Array<{ action: Action; resource: Resource }> = [];
  for (const rule of rules) {
    const actions = expand(rule.action);
    const resources = expand(rule.resource);
    for (const a of actions) {
      if (a === 'manage') {
        // Expand manage to standard CRUD for UI purposes
        for (const r of resources) {
          (['view', 'create', 'update', 'delete'] as Action[]).forEach((crud) => expanded.push({ action: crud, resource: r }));
        }
      } else {
        for (const r of resources) expanded.push({ action: a, resource: r });
      }
    }
  }
  return expanded;
}
