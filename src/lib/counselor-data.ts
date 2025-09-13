
import { getUsers, User } from './user-store';

export type Counselor = {
  id: string;
  name: string;
};

// In a real application, this data would be fetched from your user database.
// For this prototype, we are using the user store which uses localStorage.
export function getRegisteredCounselors(): Counselor[] {
  const counselorUsers: User[] = getUsers('counselor');
  return counselorUsers.map(user => ({
    id: user.email, // Using email as a unique ID
    name: user.fullName,
  }));
}
