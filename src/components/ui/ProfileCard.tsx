import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { User } from '../../../lib';

const { height } = Dimensions.get('window');

interface ProfileCardProps {
  user: User;
  reasons: string[];
  year: number;
  onLike: (userId: string) => void;
  onDislike: (userId: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, reasons, year, onLike, onDislike }) => {
  return (
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
            onPress={() => onDislike(user.id)}
          >
            <Text style={styles.dislikeText}>Dislike</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => onLike(user.id)}
          >
            <Text style={styles.likeText}>Like</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProfileCard;
