
'use client';

// This file is deprecated. User management is now handled in `src/lib/user-store.ts`.
// The logic here is kept for reference but is no longer used by the application.

// In a real application, this would be a check against a database.
// For this prototype, we'll use a simple boolean in memory.
let adminRegistered = false;
const COUNSELOR_LIMIT = 10;

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

export function getCounselorCount(): number {
    if (typeof window !== 'undefined') {
        const count = sessionStorage.getItem('counselorCount');
        return count ? parseInt(count, 10) : 0;
    }
    return 0; 
}

export function hasReachedCounselorLimit(): boolean {
    return getCounselorCount() >= COUNSELOR_LIMIT;
}

export function incrementCounselorCount(): void {
    if (typeof window !== 'undefined') {
        const currentCount = getCounselorCount();
        if (currentCount < COUNSELOR_LIMIT) {
            sessionStorage.setItem('counselorCount', (currentCount + 1).toString());
        }
    }
}
