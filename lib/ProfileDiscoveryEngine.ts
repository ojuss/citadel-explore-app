/**
 * Profile Discovery Algorithm - TypeScript implementation
 * Based on the Python ProfileDiscoveryEngine from the assignment
 */

import { User, RecommendationScore, BehavioralModel, Filters } from './types';

export class ProfileDiscoveryEngine {
  private userProfiles: Map<string, User>;
  private similarityCache: Map<string, number>;
  private behavioralModels: Map<string, BehavioralModel>;
  private performanceMetrics: {
    totalCalculations: number;
    cacheHits: number;
    cacheMisses: number;
    averageResponseTime: number;
  };

  constructor() {
    this.userProfiles = new Map();
    this.similarityCache = new Map();
    this.behavioralModels = new Map();
    this.performanceMetrics = {
      totalCalculations: 0,
      cacheHits: 0,
      cacheMisses: 0,
      averageResponseTime: 0
    };
  }

  addUser(user: User): void {
    this.userProfiles.set(user.id, user);
  }

  addAllUsers(users: User[]): void {
    users.forEach(user => this.addUser(user));
  }

  calculateAcademicSimilarity(user1: User, user2: User): number {
    let score = 0.0;
    
    // Same university/college
    if (user1.college === user2.college) {
      score += 0.4;
    }
    
    // Same degree field
    if (user1.degree === user2.degree) {
      score += 0.3;
    }
    
    // Similar graduation year (within 1 year)
    const yearDifference = Math.abs(user1.graduationYear - user2.graduationYear);
    if (yearDifference <= 1) {
      score += 0.3 * (1 - yearDifference / 2);
    }
    
    return Math.min(score, 1.0);
  }

  calculateInterestCompatibility(user1: User, user2: User): number {
    // Create cache key for this pair
    const cacheKey = `interest-${user1.id}-${user2.id}`;
    if (this.similarityCache.has(cacheKey)) {
      this.performanceMetrics.cacheHits++;
      return this.similarityCache.get(cacheKey)!;
    }
    
    this.performanceMetrics.cacheMisses++;
    this.performanceMetrics.totalCalculations++;
    
    const interests1 = new Set(user1.interests);
    const interests2 = new Set(user2.interests);
    
    if (interests1.size === 0 || interests2.size === 0) {
      this.similarityCache.set(cacheKey, 0.0);
      return 0.0;
    }
    
    const intersection = new Set([...interests1].filter(x => interests2.has(x)));
    const union = new Set([...interests1, ...interests2]);
    
    const intersectionCount = intersection.size;
    const unionCount = union.size;
    
    // Base Jaccard similarity
    const jaccardScore = unionCount > 0 ? intersectionCount / unionCount : 0;
    
    // Apply diversity bonus - penalize identical interest sets
    let diversityMultiplier = 1.0;
    if (intersectionCount === interests1.size && intersectionCount === interests2.size) {
      diversityMultiplier = 0.7; // Reduce score for identical interests
    } else if (intersectionCount / Math.min(interests1.size, interests2.size) > 0.8) {
      diversityMultiplier = 0.85; // Slight penalty for too much overlap
    }
    
    const result = jaccardScore * diversityMultiplier;
    this.similarityCache.set(cacheKey, result);
    return result;
  }

  calculateGeographicScore(user1: User, user2: User): number {
    if (user1.city !== user2.city) {
      return 0.0;
    }
    
    // Same city gives base score
    return 0.8;
  }

  calculateDemographicSimilarity(user1: User, user2: User): number {
    let score = 0.0;
    
    // Age similarity (within 3 years)
    const ageDifference = Math.abs(user1.age - user2.age);
    if (ageDifference <= 3) {
      score += 0.3 * (1 - ageDifference / 3);
    }
    
    // Same languages
    const languages1 = new Set(user1.languages);
    const languages2 = new Set(user2.languages);
    const commonLanguages = new Set([...languages1].filter(x => languages2.has(x)));
    if (commonLanguages.size > 0) {
      score += 0.2;
    }
    
    // Compatible dietary restrictions
    if (user1.dietaryRestrictions === user2.dietaryRestrictions) {
      score += 0.1;
    }
    
    return Math.min(score, 1.0);
  }

  calculateBehavioralMatch(user: User, candidate: User, userHistory: Record<string, any> = {}): number {
    if (!user.likedProfiles || user.likedProfiles.length === 0) {
      // Cold start - use demographic similarity
      return this.calculateDemographicSimilarity(user, candidate);
    }
    
    // Find users similar to candidate that the user has interacted with
    let behavioralScore = 0.0;
    let similarInteractionCount = 0;
    
    // Check recent likes (last 10)
    const recentLikes = user.likedProfiles.slice(-10);
    for (const likedUserId of recentLikes) {
      const likedUser = this.userProfiles.get(likedUserId);
      if (likedUser) {
        const similarity = this.calculateProfileSimilarity(candidate, likedUser);
        if (similarity > 0.3) { // Threshold for similarity
          behavioralScore += similarity;
          similarInteractionCount++;
        }
      }
    }
    
    if (similarInteractionCount > 0) {
      return behavioralScore / similarInteractionCount;
    }
    
    // Check if candidate is similar to disliked profiles
    const recentDislikes = user.dislikedProfiles.slice(-5);
    for (const dislikedUserId of recentDislikes) {
      const dislikedUser = this.userProfiles.get(dislikedUserId);
      if (dislikedUser) {
        const similarity = this.calculateProfileSimilarity(candidate, dislikedUser);
        if (similarity > 0.6) { // High similarity to disliked profile
          return 0.1; // Low score
        }
      }
    }
    
    return 0.5; // Neutral score
  }

  calculateProfileSimilarity(user1: User, user2: User): number {
    const weights = {
      academic: 0.25,
      interests: 0.35,
      geographic: 0.20,
      demographic: 0.20
    };
    
    const academicScore = this.calculateAcademicSimilarity(user1, user2);
    const interestScore = this.calculateInterestCompatibility(user1, user2);
    const geographicScore = this.calculateGeographicScore(user1, user2);
    const demographicScore = this.calculateDemographicSimilarity(user1, user2);
    
    return (
      weights.academic * academicScore +
      weights.interests * interestScore +
      weights.geographic * geographicScore +
      weights.demographic * demographicScore
    );
  }

  calculateCompatibilityScore(user: User, candidate: User, userHistory: Record<string, any> = {}): number {
    const weights = {
      profile: 0.4,
      behavioral: 0.3,
      freshness: 0.2,
      diversity: 0.1
    };
    
    const profileScore = this.calculateProfileSimilarity(user, candidate);
    const behavioralScore = this.calculateBehavioralMatch(user, candidate, userHistory);
    
    // Freshness score - prefer newer profiles
    const freshnessScore = Math.random() * 0.3 + 0.7; // Simulate freshness
    
    // Diversity score - encourage exploring different types
    const diversityScore = 1.0 - Math.min(profileScore, 0.8); // Encourage some diversity
    
    return (
      weights.profile * profileScore +
      weights.behavioral * behavioralScore +
      weights.freshness * freshnessScore +
      weights.diversity * diversityScore
    );
  }

  discoverProfiles(userId: string, count: number = 10, filters: Partial<Filters> = {}): RecommendationScore[] {
    const startTime = performance.now();
    
    const user = this.userProfiles.get(userId);
    if (!user) {
      return [];
    }
    
    // Create cache key for this request
    const filterKey = JSON.stringify(filters);
    const cacheKey = `${userId}-${filterKey}-${user.likedProfiles.length}-${user.dislikedProfiles.length}`;
    
    // Check cache first
    if (this.similarityCache.has(cacheKey)) {
      this.performanceMetrics.cacheHits++;
      const cachedResult = this.similarityCache.get(cacheKey);
      if (cachedResult) {
        const endTime = performance.now();
        this.updateAverageResponseTime(endTime - startTime);
        return JSON.parse(cachedResult.toString());
      }
    }
    
    this.performanceMetrics.cacheMisses++;
    
    const candidates: RecommendationScore[] = [];
    const interactedProfiles = new Set([...user.likedProfiles, ...user.dislikedProfiles]);
    
    for (const [candidateId, candidate] of this.userProfiles) {
      // Skip self and already interacted profiles
      if (candidateId === userId || interactedProfiles.has(candidateId)) {
        continue;
      }
      
      // Apply filters early to avoid unnecessary calculations
      if (filters.college && candidate.college !== filters.college) continue;
      if (filters.minAge && candidate.age < filters.minAge) continue;
      if (filters.maxAge && candidate.age > filters.maxAge) continue;
      if (filters.interests && filters.interests.length > 0 && 
          !filters.interests.some(interest => candidate.interests.includes(interest))) continue;
      
      const compatibilityScore = this.calculateCompatibilityScore(user, candidate);
      
      candidates.push({
        user: candidate,
        score: compatibilityScore,
        reasons: this.getMatchReasons(user, candidate)
      });
    }
    
    // Sort by compatibility score (descending)
    candidates.sort((a, b) => b.score - a.score);
    
    const result = candidates.slice(0, count);
    
    // Cache the result (store as string to avoid object reference issues)
    this.similarityCache.set(cacheKey, JSON.stringify(result) as any);
    
    const endTime = performance.now();
    this.updateAverageResponseTime(endTime - startTime);
    
    return result;
  }

  private updateAverageResponseTime(responseTime: number): void {
    const { totalCalculations, averageResponseTime } = this.performanceMetrics;
    this.performanceMetrics.averageResponseTime = 
      (averageResponseTime * totalCalculations + responseTime) / (totalCalculations + 1);
  }

  // Get performance metrics
  getPerformanceMetrics(): typeof this.performanceMetrics {
    return { ...this.performanceMetrics };
  }

  getMatchReasons(user: User, candidate: User): string[] {
    const reasons: string[] = [];
    
    // Same college
    if (user.college === candidate.college) {
      reasons.push(`Both at ${user.college}`);
    }
    
    // Common interests
    const commonInterests = user.interests.filter(interest => 
      candidate.interests.includes(interest));
    if (commonInterests.length > 0) {
      reasons.push(`${commonInterests.length} shared interests`);
    }
    
    // Same city
    if (user.city === candidate.city) {
      reasons.push(`Both in ${user.city}`);
    }
    
    // Similar age
    const ageDiff = Math.abs(user.age - candidate.age);
    if (ageDiff <= 1) {
      reasons.push('Similar age');
    }
    
    // Same degree
    if (user.degree === candidate.degree) {
      reasons.push(`Both studying ${user.degree}`);
    }
    
    return reasons;
  }

  // Simulate user interaction
  recordInteraction(userId: string, targetUserId: string, action: 'like' | 'dislike'): void {
    const user = this.userProfiles.get(userId);
    if (!user) return;
    
    if (action === 'like') {
      user.likedProfiles.push(targetUserId);
    } else if (action === 'dislike') {
      user.dislikedProfiles.push(targetUserId);
    }
    
    // Update user in map
    this.userProfiles.set(userId, user);
    
    // Clear cache entries for this user since their interaction history changed
    this.clearUserCache(userId);
  }

  // Clear cache entries for a specific user
  private clearUserCache(userId: string): void {
    const keysToDelete: string[] = [];
    for (const [key] of this.similarityCache) {
      if (key.startsWith(`${userId}-`) || key.includes(`-${userId}-`)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => this.similarityCache.delete(key));
  }

  // Clear all cache (useful for memory management)
  clearCache(): void {
    this.similarityCache.clear();
  }

  // Get cache statistics
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.similarityCache.size,
      keys: Array.from(this.similarityCache.keys())
    };
  }
}

export default ProfileDiscoveryEngine;
