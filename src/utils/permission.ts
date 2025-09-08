export function hasPermission(perms: string[] | undefined, key: string, role?: string) {
  if (role === 'TOP_MANAGEMENT') return true;
  return !!perms?.includes(key);
}
