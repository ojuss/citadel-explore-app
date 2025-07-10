import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab = 'explore', onTabPress }) => {
  const tabs = [
    { id: 'explore', label: 'Explore', icon: 'search' },
    { id: 'events', label: 'Events', icon: 'calendar' },
    { id: 'chats', label: 'Chats', icon: 'chatbubble' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <View style={styles.bottomNavigation}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.navButton}
          onPress={() => onTabPress?.(tab.id)}
        >
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={activeTab === tab.id ? '#00C851' : '#666'}
          />
          <Text style={[styles.navText, activeTab === tab.id && styles.activeNavText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
  activeNavText: {
    color: '#00C851',
  },
});

export default BottomNavigation;
