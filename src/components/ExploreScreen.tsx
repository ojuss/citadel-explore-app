import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import ProfileDiscoveryEngine from '../algorithms/ProfileDiscoveryEngine';
import { userData } from '../data/userData';
import { User, Filters, RecommendationScore } from '../types';

const { width, height } = Dimensions.get('window');

const ExploreScreen: React.FC = () => {
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
  const [year] = useState<number>(4); // Mock year for the profile card

  // Mock current user (first user in the database)
  useEffect(() => {
    const initializeApp = async () => {
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
      setLoading(false);
    };
    
    initializeApp();
  }, []);

  const handleLike = (userId: string): void => {
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

  const handleDislike = (userId: string): void => {
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

  const applyFilters = (): void => {
    if (!discoveryEngine || !currentUser) return;
    
    setLoading(true);
    const filteredRecommendations = discoveryEngine.discoverProfiles(currentUser.id, 10, filters);
    setRecommendations(filteredRecommendations);
    setLoading(false);
    setShowFilters(false);
  };

  const resetFilters = (): void => {
    setFilters({
      college: '',
      interests: [],
      minAge: 18,
      maxAge: 25,
    });
  };

  const ProfileCard: React.FC<{ user: User; reasons: string[] }> = ({ user, reasons }) => (
    <View style={styles.profileCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: user.avatar }} style={styles.profileImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.gradient}
        />
        
        {/* Top Status Bar */}
        <View style={styles.topStatusBar}>
          <Text style={styles.timeText}>12:45</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="wifi" size={16} color="#fff" />
            <Ionicons name="battery-full" size={16} color="#fff" />
          </View>
        </View>
        
        {/* Top Right Action Icons */}
        <View style={styles.topRightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="apps" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="information-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Friend Button */}
        <View style={styles.friendButtonContainer}>
          <TouchableOpacity style={styles.friendButton}>
            <Text style={styles.friendText}>Friend</Text>
          </TouchableOpacity>
        </View>
        
        {/* Profile Info Overlay */}
        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <View style={styles.yearBadge}>
              <Text style={styles.yearText}>{year}</Text>
            </View>
          </View>
          
          {/* College and Degree */}
          <View style={styles.educationContainer}>
            <View style={styles.educationRow}>
              <Ionicons name="school" size={16} color="#fff" />
              <Text style={styles.educationText}>{user.college}</Text>
            </View>
            <View style={styles.educationRow}>
              <Ionicons name="book" size={16} color="#fff" />
              <Text style={styles.educationText}>{user.degree}</Text>
            </View>
          </View>
        </View>
        
        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.dislikeButton}
            onPress={() => handleDislike(user.id)}
          >
            <Text style={styles.dislikeText}>Dislike</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => handleLike(user.id)}
          >
            <Text style={styles.likeText}>Like</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const FilterModal: React.FC = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowFilters(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Filters</Text>
            <TouchableOpacity onPress={() => setShowFilters(false)}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          
          {/* College Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>College</Text>
            <TextInput
              style={styles.collegeInput}
              placeholder="Enter college name"
              value={filters.college}
              onChangeText={(text) => setFilters({ ...filters, college: text })}
            />
          </View>
          
          {/* Age Range Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Age Range</Text>
            <View style={styles.ageRangeContainer}>
              <TextInput
                style={styles.ageInput}
                placeholder="Min"
                value={filters.minAge.toString()}
                onChangeText={(text) => setFilters({ ...filters, minAge: parseInt(text) || 18 })}
                keyboardType="numeric"
              />
              <Text style={styles.ageRangeText}>to</Text>
              <TextInput
                style={styles.ageInput}
                placeholder="Max"
                value={filters.maxAge.toString()}
                onChangeText={(text) => setFilters({ ...filters, maxAge: parseInt(text) || 25 })}
                keyboardType="numeric"
              />
            </View>
          </View>
          
          {/* Filter Buttons */}
          <View style={styles.filterButtons}>
            <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

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
        />
      )}
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="search" size={24} color="#00C851" />
          <Text style={styles.navText}>Explore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="calendar" size={24} color="#666" />
          <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chatbubble" size={24} color="#666" />
          <Text style={styles.navText}>Chats</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="notifications" size={24} color="#666" />
          <Text style={styles.navText}>Notifications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
      
      <FilterModal />
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
  profileCard: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  topStatusBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topRightIcons: {
    position: 'absolute',
    top: 90,
    right: 20,
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  friendButtonContainer: {
    position: 'absolute',
    top: 140,
    left: 20,
  },
  friendButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 15,
  },
  friendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  profileInfo: {
    position: 'absolute',
    bottom: 160,
    left: 20,
    right: 20,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginRight: 12,
  },
  yearBadge: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  yearText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  educationContainer: {
    marginBottom: 8,
  },
  educationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  educationText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  actionButtons: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    flexDirection: 'row',
    gap: 15,
  },
  dislikeButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  dislikeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  likeButton: {
    flex: 1,
    backgroundColor: '#00C851',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  likeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  filterSection: {
    padding: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  collegeInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  ageRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  ageRangeText: {
    fontSize: 16,
    color: '#666',
  },
  filterButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  resetButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#00C851',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default ExploreScreen;
