// User interface definitions for TypeScript
export interface User {
  id: string;
  name: string;
  college: string;
  city: string;
  degree: string;
  interests: string[];
  bio: string;
  avatar: string;
  age: number;
  graduationYear: number;
  gender: string;
  relationshipStatus: string;
  languages: string[];
  dietaryRestrictions: string;
  budgetRange: string;
  alcohol: boolean;
  likedProfiles: string[];
  dislikedProfiles: string[];
  interactionHistory: Record<string, any>;
}

export interface UserDatabase {
  users: User[];
}

export interface Filters {
  college: string;
  interests: string[];
  minAge: number;
  maxAge: number;
}

export interface RecommendationScore {
  user: User;
  score: number;
  reasons: string[];
}

export interface BehavioralModel {
  userId: string;
  likedProfiles: string[];
  dislikedProfiles: string[];
  preferences: Record<string, number>;
}
