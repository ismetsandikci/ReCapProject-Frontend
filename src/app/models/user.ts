export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    passwordSalt: string;
    status: boolean;
  }