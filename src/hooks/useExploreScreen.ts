import { useState, useEffect, useCallback, useMemo } from 'react';
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

  const handleLike = useCallback((userId: string) => {
    if (!discoveryEngine || !currentUser) return;
    
    discoveryEngine.recordInteraction(currentUser.id, userId, 'like');
    
    // Remove from recommendations
    setRecommendations(prev => prev.filter(rec => rec.user.id !== userId));
    
    // Get new recommendations if running low
    if (recommendations.length <= 3) {
      const newRecommendations = discoveryEngine.discoverProfiles(currentUser.id, 5, filters);
      setRecommendations(prev => [...prev, ...newRecommendations]);
    }
  }, [discoveryEngine, currentUser, recommendations.length, filters]);

  const handleDislike = useCallback((userId: string) => {
    if (!discoveryEngine || !currentUser) return;
    
    discoveryEngine.recordInteraction(currentUser.id, userId, 'dislike');
    
    // Remove from recommendations
    setRecommendations(prev => prev.filter(rec => rec.user.id !== userId));
    
    // Get new recommendations if running low
    if (recommendations.length <= 3) {
      const newRecommendations = discoveryEngine.discoverProfiles(currentUser.id, 5, filters);
      setRecommendations(prev => [...prev, ...newRecommendations]);
    }
  }, [discoveryEngine, currentUser, recommendations.length, filters]);

  const applyFilters = useCallback(() => {
    if (!discoveryEngine || !currentUser) return;
    
    setLoading(true);
    const filteredRecommendations = discoveryEngine.discoverProfiles(currentUser.id, 10, filters);
    setRecommendations(filteredRecommendations);
    setLoading(false);
    setShowFilters(false);
  }, [discoveryEngine, currentUser, filters]);

  const resetFilters = useCallback(() => {
    setFilters({
      college: '',
      interests: [],
      minAge: 18,
      maxAge: 25,
    });
  }, []);

  const handleTabPress = useCallback((tab: string) => {
    // Handle navigation to different tabs
    console.log('Navigate to:', tab);
  }, []);

  // Memoize the return object to prevent unnecessary re-renders
  const hookReturn = useMemo(() => ({
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
  }), [
    currentUser,
    recommendations,
    loading,
    showFilters,
    filters,
    searchQuery,
    handleLike,
    handleDislike,
    applyFilters,
    resetFilters,
    handleTabPress,
  ]);

  return hookReturn;
};
