# Explore Screen - University Social Platform

A React Native implementation of the Explore screen for a university social networking platform, featuring intelligent profile recommendations based on advanced matching algorithms.

## 🚀 Features

- **Intelligent Recommendations**: Profile matching algorithm that considers academic similarity, interests, geographic proximity, and behavioral patterns
- **Beautiful UI**: Modern, card-based interface matching the provided design
- **Advanced Filtering**: Filter by college, age range, and other criteria
- **Interactive Like/Dislike**: Seamless user interaction with recommendation learning
- **Real-time Updates**: Dynamic recommendation updates based on user interactions
- **Responsive Design**: Optimized for various screen sizes

## 📱 Screenshots

### Main Explore Screen
- Clean, modern interface with profile cards
- Each card displays user photo, name, college, interests, and match reasons
- Like/Dislike buttons for user interaction
- Header with search and navigation icons

### Filter Modal
- College filter input
- Age range selection
- Apply/Reset filter functionality

### Loading States
- Elegant loading animation while fetching recommendations
- Empty state handling when no profiles are available

## 🧠 Algorithm Logic

The recommendation system is based on the Python ProfileDiscoveryEngine from the original assignment, adapted for React Native:

### 1. **Academic Similarity (25% weight)**
- Same university/college: +0.4 points
- Same degree field: +0.3 points
- Similar graduation year (within 1 year): +0.3 points

### 2. **Interest Compatibility (35% weight)**
- Uses Jaccard similarity with diversity bonus
- Calculates intersection/union of interests
- Penalizes identical interest sets to encourage diversity
- Rewards optimal overlap (not too similar, not too different)

### 3. **Geographic Proximity (20% weight)**
- Same city: +0.8 points
- Different cities: 0 points

### 4. **Demographic Similarity (20% weight)**
- Age similarity (within 3 years): up to 0.3 points
- Common languages: +0.2 points
- Compatible dietary restrictions: +0.1 points

### 5. **Behavioral Learning**
- Analyzes user's like/dislike patterns
- Finds similar profiles to previously liked users
- Avoids recommending profiles similar to disliked ones
- Cold start handling for new users

### 6. **Match Reasons**
The system provides transparent reasons for matches:
- \"Both at [College Name]\"
- \"X shared interests\"
- \"Both in [City]\"
- \"Similar age\"
- \"Both studying [Degree]\"

## 🗄️ Database Structure

The app uses a fake database of 100 users from 5 colleges:

### Colleges:
- IIT Delhi
- Delhi University
- Jamia Millia Islamia
- Jawaharlal Nehru University
- Indian Institute of Technology Bombay

### User Model:
```javascript
{
  id: \"userXXX\",
  name: \"Full Name\",
  college: \"College Name\",
  city: \"City Name\",
  degree: \"Degree Field\",
  interests: [\"Interest1\", \"Interest2\", ...],
  bio: \"Short bio/tagline\",
  avatar: \"Profile picture URL\",
  age: 18-23,
  graduationYear: 2024-2027,
  gender: \"Male/Female\",
  relationshipStatus: \"Single/Looking\",
  languages: [\"English\", \"Hindi\"],
  dietaryRestrictions: \"none/vegetarian/vegan\",
  budgetRange: \"500-800/800-1200/1200+\",
  alcohol: true/false,
  likedProfiles: [...],
  dislikedProfiles: [...],
  interactionHistory: {...}
}
```

## 🛠️ Technology Stack

- **React Native**: Core framework
- **Expo**: Development platform
- **React Native Elements**: UI components
- **Expo Vector Icons**: Icon library
- **Expo Linear Gradient**: Gradient effects
- **Expo Blur**: Blur effects for overlays

## 📦 Installation & Setup

1. **Prerequisites**:
   - Node.js (v16 or higher)
   - Expo CLI
   - Android Studio/Xcode (for device testing)

2. **Install dependencies**:
   ```bash
   cd explore-app
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on device/emulator**:
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   
   # Web
   npm run web
   ```

## 🔧 Third-Party Libraries

- **@expo/vector-icons**: Icon library for navigation and UI elements
- **expo-linear-gradient**: Gradient overlays on profile cards
- **expo-blur**: Blur effects for modal backgrounds
- **react-native-elements**: Pre-built UI components
- **react-native-paper**: Material Design components
- **react-native-gesture-handler**: Touch gesture handling
- **react-native-safe-area-context**: Safe area management
- **react-native-vector-icons**: Additional icon sets

## 🎯 How It Works

### 1. **Initialization**
- App loads 100 fake user profiles
- Initializes ProfileDiscoveryEngine with all users
- Sets current user (first user in database for demo)
- Generates initial recommendations

### 2. **Recommendation Generation**
- Engine calculates compatibility scores for all potential matches
- Excludes already interacted profiles (liked/disliked)
- Applies any active filters
- Sorts by compatibility score (highest first)
- Returns top 10 recommendations

### 3. **User Interaction**
- User can like/dislike profiles
- Each interaction is recorded in the engine
- Engine learns from user behavior
- New recommendations are generated dynamically
- UI updates in real-time

### 4. **Filtering**
- Users can filter by college, age range
- Filters are applied to the recommendation algorithm
- Results update immediately after applying filters

### 5. **Learning Algorithm**
- Tracks user's like/dislike patterns
- Finds commonalities in liked profiles
- Avoids profiles similar to disliked ones
- Improves recommendations over time

## 📊 UI/UX Mapping

### Profile Card Elements:
- **Hero Image**: High-quality profile photo
- **Gradient Overlay**: Ensures text readability
- **Name & Year Badge**: Clear identification
- **College & Degree Info**: Academic context with icons
- **Bio**: Personal tagline
- **Interest Tags**: Visual representation of shared interests
- **Match Reasons**: Transparent matching logic
- **Action Buttons**: Like/Dislike with visual feedback

### Navigation:
- **Header**: Search, notifications, chat, profile access
- **Search Bar**: Quick user search functionality
- **Filter Button**: Access to advanced filtering options

### States:
- **Loading**: Elegant spinner with contextual message
- **Empty State**: Clear messaging when no profiles available
- **Error Handling**: Graceful error management

## 🔍 Testing the Algorithm

To test the recommendation accuracy:

1. **Like similar profiles**: Notice how subsequent recommendations become more targeted
2. **Dislike certain types**: Observe how the algorithm avoids similar profiles
3. **Apply filters**: See how recommendations change based on criteria
4. **Check match reasons**: Verify the transparency of matching logic

The algorithm demonstrates:
- **Relevance**: Recommendations improve with user interaction
- **Diversity**: Avoids showing only identical profiles
- **Transparency**: Clear reasons for each match
- **Performance**: Fast recommendation generation

## 📱 Demo Flow

1. **Launch App**: See initial loading screen
2. **View Recommendations**: Browse through intelligently matched profiles
3. **Interact**: Like/dislike profiles to see learning in action
4. **Filter**: Use filters to refine recommendations
5. **Observe**: Notice how recommendations adapt to your preferences

## 🎨 Design Fidelity

The implementation closely follows the provided UI design:
- **Color Scheme**: Matches the green accent color (#00C851)
- **Typography**: Uses appropriate font weights and sizes
- **Spacing**: Consistent padding and margins
- **Card Design**: Accurate recreation of the profile card layout
- **Button Styling**: Matches the Like/Dislike button design
- **Icons**: Consistent iconography throughout

## 🚀 Future Enhancements

Potential improvements for the platform:
- **Real-time Chat**: Integrate messaging functionality
- **Video Profiles**: Support for video introductions
- **Advanced Matching**: Machine learning for better recommendations
- **Social Features**: Mutual friends, shared events
- **Privacy Controls**: Enhanced privacy and blocking features

## 📞 Support

For questions or issues:
- Check the algorithm implementation in `src/algorithms/ProfileDiscoveryEngine.js`
- Review the UI components in `src/components/ExploreScreen.js`
- Examine the fake database in `src/data/userData.js`

This implementation demonstrates how advanced matching algorithms can create meaningful connections in a university social platform, combining intelligent recommendations with an intuitive user interface.
