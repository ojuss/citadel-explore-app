/**
 * Algorithm Test Suite
 * Tests the ProfileDiscoveryEngine recommendation logic
 */

import ProfileDiscoveryEngine from '../src/algorithms/ProfileDiscoveryEngine.ts';
import { userData } from '../src/data/userData.ts';

// Test the recommendation engine
const testRecommendationEngine = () => {
  console.log('🧪 Testing Profile Discovery Engine...\n');
  
  // Initialize engine
  const engine = new ProfileDiscoveryEngine();
  engine.addAllUsers(userData.users);
  
  // Test user (first user in database)
  const testUser = userData.users[0];
  console.log(`📱 Testing recommendations for: ${testUser.name}`);
  console.log(`🎓 College: ${testUser.college}`);
  console.log(`🎯 Interests: ${testUser.interests.join(', ')}`);
  console.log(`📍 City: ${testUser.city}\n`);
  
  // Get recommendations
  const recommendations = engine.discoverProfiles(testUser.id, 5);
  
  console.log('🔍 Top 5 Recommendations:');
  console.log('=' .repeat(50));
  
  recommendations.forEach((rec, index) => {
    const user = rec.user;
    const score = rec.score.toFixed(3);
    const reasons = rec.reasons.join(', ');
    
    console.log(`${index + 1}. ${user.name} (Score: ${score})`);
    console.log(`   🎓 ${user.college} - ${user.degree}`);
    console.log(`   📍 ${user.city}`);
    console.log(`   🎯 ${user.interests.slice(0, 3).join(', ')}`);
    console.log(`   💡 Match reasons: ${reasons}`);
    console.log();
  });
  
  // Test behavioral learning
  console.log('🤖 Testing Behavioral Learning...');
  console.log('=' .repeat(30));
  
  // Simulate user liking first recommendation
  const firstRecommendation = recommendations[0];
  engine.recordInteraction(testUser.id, firstRecommendation.user.id, 'like');
  console.log(`👍 Liked: ${firstRecommendation.user.name}`);
  
  // Get new recommendations
  const newRecommendations = engine.discoverProfiles(testUser.id, 3);
  console.log('\n🔄 Updated Recommendations:');
  
  newRecommendations.forEach((rec, index) => {
    const user = rec.user;
    const score = rec.score.toFixed(3);
    
    console.log(`${index + 1}. ${user.name} (Score: ${score})`);
    console.log(`   🎓 ${user.college}`);
    console.log(`   🎯 ${user.interests.slice(0, 2).join(', ')}`);
  });
  
  // Test filtering
  console.log('\n🔍 Testing Filters...');
  console.log('=' .repeat(20));
  
  const filters = {
    college: 'IIT Delhi',
    minAge: 19,
    maxAge: 22
  };
  
  const filteredRecommendations = engine.discoverProfiles(testUser.id, 3, filters);
  console.log(`\n📋 Filtered Results (College: ${filters.college}, Age: ${filters.minAge}-${filters.maxAge}):`);
  
  filteredRecommendations.forEach((rec, index) => {
    const user = rec.user;
    const score = rec.score.toFixed(3);
    
    console.log(`${index + 1}. ${user.name} (Score: ${score})`);
    console.log(`   🎓 ${user.college}`);
    console.log(`   🎂 Age: ${user.age}`);
    console.log(`   🎯 ${user.interests.slice(0, 2).join(', ')}`);
  });
  
  // Test similarity calculations
  console.log('\n🧮 Testing Similarity Calculations...');
  console.log('=' .repeat(35));
  
  const user1 = userData.users[0];
  const user2 = userData.users[1];
  
  const academicSim = engine.calculateAcademicSimilarity(user1, user2);
  const interestSim = engine.calculateInterestCompatibility(user1, user2);
  const geoSim = engine.calculateGeographicScore(user1, user2);
  const overallSim = engine.calculateProfileSimilarity(user1, user2);
  
  console.log(`\n📊 Similarity between ${user1.name} and ${user2.name}:`);
  console.log(`   🎓 Academic: ${academicSim.toFixed(3)}`);
  console.log(`   🎯 Interests: ${interestSim.toFixed(3)}`);
  console.log(`   📍 Geographic: ${geoSim.toFixed(3)}`);
  console.log(`   🎯 Overall: ${overallSim.toFixed(3)}`);
  
  console.log('\n✅ Algorithm testing completed successfully!');
};

// Run test if this file is executed directly
if (typeof window === 'undefined') {
  testRecommendationEngine();
}

export default testRecommendationEngine;
