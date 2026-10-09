export function canAccessServiceAdmin(profile) {
  return profile?.status === 'active' && profile?.role === 'admin';
}

export const isActiveServiceAdmin = canAccessServiceAdmin;
