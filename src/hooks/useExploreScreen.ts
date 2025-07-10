import { useState, useEffect } from 'react';
import { ProfileDiscoveryEngine, userData, User, Filters, RecommendationScore } from '../../lib';

export const useExploreScreen = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    college: '',
    interests: [],
    minAge: 18,
    maxAge: 25,
  });
  const [discoveryEngine, setDiscoveryEngine] = useState<ProfileDiscoveryEngine | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize discovery engine
        const engine = new ProfileDiscoveryEngine();
        engine.addAllUsers(userData.users);
        setDiscoveryEngine(engine);
        
        // Set current user (simulate logged in user)
        const user = userData.users[0];
        setCurrentUser(user);
        
        // Get initial recommendations
        const recommendations = engine.discoverProfiles(user.id, 10);
        setRecommendations(recommendations);
      } catch (error) {
        console.error('Failed to initialize app:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initializeApp();
  }, []);

  const handleLike = (userId: string) => {
    if (!discoveryEngine || !currentUser) return;
    
    discoveryEngine.recordInteraction(currentUser.id, userId, 'like');
    
    // Remove from recommendations
    setRecommendations(prev => prev.filter(rec => rec.user.id !== userId));
    
    // Get new recommendations if running low
    if (recommendations.length <= 3) {
      const newRecommendations = discoveryEngine.discoverProfiles(currentUser.id, 5, filters);
      setRecommendations(prev => [...prev, ...newRecommendations]);
    }
  };

  const handleDislike = (userId: string) => {
    if (!discoveryEngine || !currentUser) return;
    
    discoveryEngine.recordInteraction(currentUser.id, userId, 'dislike');
    
    // Remove from recommendations
    setRecommendations(prev => prev.filter(rec => rec.user.id !== userId));
    
    // Get new recommendations if running low
    if (recommendations.length <= 3) {
      const newRecommendations = discoveryEngine.discoverProfiles(currentUser.id, 5, filters);
      setRecommendations(prev => [...prev, ...newRecommendations]);
    }
  };

  const applyFilters = () => {
    if (!discoveryEngine || !currentUser) return;
    
    setLoading(true);
    const filteredRecommendations = discoveryEngine.discoverProfiles(currentUser.id, 10, filters);
    setRecommendations(filteredRecommendations);
    setLoading(false);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setFilters({
      college: '',
      interests: [],
      minAge: 18,
      maxAge: 25,
    });
  };

  const handleTabPress = (tab: string) => {
    // Handle navigation to different tabs
    console.log('Navigate to:', tab);
  };

  return {
    // State
    currentUser,
    recommendations,
    loading,
    showFilters,
    filters,
    searchQuery,
    
    // Actions
    handleLike,
    handleDislike,
    applyFilters,
    resetFilters,
    handleTabPress,
    
    // Setters
    setShowFilters,
    setFilters,
    setSearchQuery,
  };
};
