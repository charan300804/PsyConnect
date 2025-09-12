
'use client';

// In a real application, this data would be stored in a secure database.
// For this prototype, we are using the browser's localStorage.
// Note: Storing passwords in localStorage is not secure for a production application.

export type UserRole = 'student' | 'admin' | 'counselor';

export type User = {
  fullName: string;
  email: string;
  password: string; // In a real app, this should be a hashed password.
};

export const COUNSELOR_LIMIT = 10;

function getUsers(role: UserRole): User[] {
  if (typeof window === 'undefined') return [];
  const key = `registered_${role}s`;
  const usersJson = localStorage.getItem(key);
  return usersJson ? JSON.parse(usersJson) : [];
}

function saveUsers(role: UserRole, users: User[]): void {
  if (typeof window === 'undefined') return;
  const key = `registered_${role}s`;
  localStorage.setItem(key, JSON.stringify(users));
}

/**
 * Adds a new user to the store.
 * @param role The role of the user to add.
 * @param userData The user data.
 * @returns boolean - True if the user was added successfully, false otherwise (e.g., user already exists).
 */
export function addUser(role: UserRole, userData: Omit<User, 'password'> & { password: string }): boolean {
  const users = getUsers(role);
  const userExists = users.some(user => user.email === userData.email);

  if (userExists) {
    return false; // User with this email already exists
  }

  // For admin, only one is allowed.
  if (role === 'admin' && users.length > 0) {
    return false;
  }

  // For counselors, check the limit.
  if (role === 'counselor' && users.length >= COUNSELOR_LIMIT) {
    return false;
  }

  users.push({
    fullName: userData.fullName,
    email: userData.email,
    password: userData.password, // In a real app, hash the password before saving
  });

  saveUsers(role, users);
  return true;
}

/**
 * Validates user credentials.
 * @param role The role of the user to validate.
 * @param email The user's email.
 * @param password The user's password.
 * @returns User | null - The user object if valid, otherwise null.
 */
export function validateUser(role: UserRole, email: string, password: string): User | null {
  const users = getUsers(role);
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
}

/**
 * Checks if a user for a given role exists. For 'admin', it checks if any admin is registered.
 * @param role The role to check.
 * @param email Optional email to check for a specific user.
 * @returns boolean
 */
export function hasUser(role: UserRole, email?: string): boolean {
  const users = getUsers(role);
  if (email) {
    return users.some(user => user.email === email);
  }
  return users.length > 0;
}

/**
 * Gets the count of registered users for a role.
 * @param role The role to count.
 * @returns number
 */
export function getUserCount(role: UserRole): number {
  return getUsers(role).length;
}

/**
 * Checks if the user limit for a role has been reached.
 * @param role The role to check.
 * @returns boolean
 */
export function hasReachedUserLimit(role: UserRole): boolean {
  if (role === 'counselor') {
    return getUserCount('counselor') >= COUNSELOR_LIMIT;
  }
  if (role === 'admin') {
    return getUserCount('admin') >= 1;
  }
  return false;
}
