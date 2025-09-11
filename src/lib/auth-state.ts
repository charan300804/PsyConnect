
'use client';

// In a real application, this would be a check against a database.
// For this prototype, we'll use a simple boolean in memory.
let adminRegistered = false;

export function hasAdminAccount(): boolean {
  // In a server-side environment, you might read this from a config file or database
  // to persist the state across server restarts. For client-side, this will reset
  // on page refresh, which is acceptable for this prototype.
  if (typeof window !== 'undefined') {
    const storedState = sessionStorage.getItem('adminRegistered');
    return storedState === 'true';
  }
  return adminRegistered;
}

export function createAdminAccount(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('adminRegistered', 'true');
  } else {
    adminRegistered = true;
  }
}
