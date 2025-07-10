// Core algorithm
export { default as ProfileDiscoveryEngine } from './ProfileDiscoveryEngine';

// User data
export { userData } from './userData';

// Types
export * from './types';

// Re-export types for easier importing
export type {
  User,
  Filters,
  RecommendationScore,
  BehavioralModel,
  UserDatabase,
} from './types';
