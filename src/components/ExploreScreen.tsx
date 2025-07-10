import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import { useExploreScreen } from '../hooks/useExploreScreen';
import ProfileCard from './ui/ProfileCard';
import BottomNavigation from './ui/BottomNavigation';
import FilterModal from './ui/FilterModal';

const ExploreScreen: React.FC = () => {
  const {
    // State
    recommendations,
    loading,
    showFilters,
    filters,
    
    // Actions
    handleLike,
    handleDislike,
    applyFilters,
    resetFilters,
    handleTabPress,
    
    // Setters
    setShowFilters,
    setFilters,
  } = useExploreScreen();

  const year = 4; // Mock year for the profile card

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00C851" />
          <Text style={styles.loadingText}>Finding your perfect matches...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Main Profile Card */}
      {recommendations.length > 0 && (
        <ProfileCard
          user={recommendations[0].user}
          reasons={recommendations[0].reasons}
          year={year}
          onLike={handleLike}
          onDislike={handleDislike}
        />
      )}
      
      {/* Empty State */}
      {recommendations.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No profiles found</Text>
          <Text style={styles.emptyStateSubtext}>Try adjusting your filters</Text>
        </View>
      )}
      
      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="explore"
        onTabPress={handleTabPress}
      />
      
      {/* Filter Modal */}
      <FilterModal
        visible={showFilters}
        filters={filters}
        onClose={() => setShowFilters(false)}
        onFiltersChange={setFilters}
        onApply={applyFilters}
        onReset={resetFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#fff',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: '#ccc',
  },
});

export default ExploreScreen;
