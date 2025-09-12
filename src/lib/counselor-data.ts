
export type Counselor = {
  id: string;
  name: string;
};

// In a real application, this data would be fetched from your user database.
// For this prototype, we are using mock data.
export const registeredCounselors: Counselor[] = [
  { id: 'c1', name: 'Dr. Evelyn Reed' },
  { id: 'c2', name: 'Dr. Benjamin Carter' },
  { id: 'c3', name: 'Ms. Olivia Hayes' },
  { id: 'c4', name: 'Mr. Samuel Chen' },
];
