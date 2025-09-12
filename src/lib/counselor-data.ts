
export type Counselor = {
  id: string;
  name: string;
};

// In a real application, this data would be fetched from your user database.
// For this prototype, we are using mock data.
export const registeredCounselors: Counselor[] = [];
