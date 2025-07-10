# Explore App - Social Profile Discovery Frontend

A React Native/Expo application that implements an intelligent social profile discovery screen with integrated recommendation algorithms. This app demonstrates a modern approach to connecting users based on shared interests, activities, and compatibility.

## 🚀 Features

### Core Functionality
- **Intelligent Profile Discovery**: Advanced recommendation algorithm that suggests compatible users
- **Interactive Matching**: Swipe-like interface with like/dislike functionality
- **Real-time Filtering**: Dynamic filters for college, age range, and interests
- **Smart Recommendations**: Algorithm learns from user interactions to improve suggestions
- **Beautiful UI**: Modern, clean design with smooth animations and gradients

### Technical Features
- **Recommendation Engine**: Sophisticated algorithm considering multiple factors:
  - Shared interests and hobbies
  - Activity pattern matching
  - Location proximity (college/university)
  - Social connection analysis
  - User interaction history
- **Performance Optimized**: Efficient rendering with FlatList and optimized re-renders
- **Responsive Design**: Works seamlessly across different screen sizes
- **State Management**: Efficient local state management with React hooks

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS testing) or Android emulator (for Android testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd citadel-assignment/explore-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Running the App

After starting the development server, you can:
- Press `a` to run on Android emulator
- Press `i` to run on iOS simulator  
- Press `w` to run on web browser
- Scan the QR code with Expo Go app on your mobile device

## 📱 App Screenshots & Demo

The app features:
- **Home Screen**: Clean profile discovery interface
- **Profile Cards**: Rich user profiles with photos, interests, and match reasons
- **Filter Modal**: Advanced filtering options
- **Interactive Actions**: Like/dislike functionality with smooth animations

## 🏗️ Project Structure

```
explore-app/
├── src/
│   ├── components/
│   │   └── ExploreScreen.js          # Main explore screen component
│   ├── algorithms/
│   │   └── ProfileDiscoveryEngine.js  # Core recommendation algorithm
│   ├── data/
│   │   └── userData.js               # Mock user database
│   └── assets/
│       └── index.js                  # Asset exports
├── tests/
│   └── algorithmTest.js              # Algorithm verification tests
├── App.js                            # Main application component
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## 🧠 Algorithm Details

### ProfileDiscoveryEngine

The recommendation system uses a multi-factor scoring algorithm:

1. **Interest Matching (40% weight)**
   - Calculates Jaccard similarity between user interests
   - Considers both direct matches and related interests

2. **Activity Pattern Analysis (25% weight)**
   - Analyzes user activity levels and preferences
   - Matches users with similar engagement patterns

3. **Location Proximity (20% weight)**
   - Prioritizes users from the same or nearby institutions
   - Considers geographic compatibility

4. **Social Connection Analysis (15% weight)**
   - Evaluates mutual connections and social circles
   - Considers friend-of-friend relationships

### Key Algorithm Features:
- **Learning System**: Adapts recommendations based on user interactions
- **Diversity Optimization**: Prevents echo chambers by introducing variety
- **Real-time Updates**: Continuously refines suggestions as users interact
- **Scalable Architecture**: Designed to handle large user bases efficiently

## 🧪 Testing

### Run Algorithm Tests
```bash
node tests/algorithmTest.js
```

### Test Coverage
- Algorithm correctness verification
- Performance benchmarking
- Edge case handling
- Integration testing with mock data

## 📊 Performance Metrics

The algorithm is optimized for:
- **Speed**: Sub-100ms recommendation generation
- **Accuracy**: High relevance score based on user feedback
- **Scalability**: Efficient performance with large datasets
- **Memory**: Optimized data structures for mobile performance

## 🔧 Configuration

### Environment Variables
- Development mode: Automatically configured
- Production builds: Optimized for performance

### Customization Options
- Recommendation weights can be adjusted in `ProfileDiscoveryEngine.js`
- UI themes and colors in component StyleSheet
- Mock data can be expanded in `userData.js`

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
expo build:android  # For Android
expo build:ios      # For iOS
```

### Web Deployment
```bash
expo build:web
```

## 📱 User Interface

### ExploreScreen Component
- **Header**: Navigation icons and title
- **Search Bar**: Real-time search functionality
- **Filter Button**: Access to advanced filters
- **Profile Cards**: Rich user profiles with:
  - High-quality profile images
  - User name and academic year
  - College/university information
  - User bio and interests
  - Match reasons (why they're recommended)
  - Like/Dislike action buttons

### Filter Modal
- **College Filter**: Text input for college name
- **Age Range**: Min/max age selection
- **Apply/Reset**: Filter management buttons

### Interactive Features
- **Like**: Adds user to liked profiles, learns preferences
- **Dislike**: Removes user from recommendations, learns preferences
- **Search**: Real-time user search functionality
- **Filters**: Advanced filtering options

## 🔍 Algorithm Integration

The app seamlessly integrates the recommendation algorithm from the Python assignment:

1. **Initialization**: Engine loads all users and builds similarity matrices
2. **Recommendation Generation**: Algorithm generates personalized recommendations
3. **User Interaction**: Like/dislike actions update user preferences
4. **Real-time Learning**: Algorithm adapts based on user behavior
5. **Filter Integration**: Filters applied to recommendation results

## 🎨 Design Principles

- **Modern UI**: Clean, card-based design with smooth animations
- **User-Centric**: Intuitive navigation and interaction patterns
- **Performance**: Optimized rendering and efficient state management
- **Accessibility**: Proper contrast ratios and touch targets
- **Responsive**: Works across different screen sizes and orientations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📝 License

This project is part of a development assignment and is for educational purposes.

## 📞 Support

For questions or support, please refer to the project documentation or contact the development team.

---

Built with ❤️ using React Native, Expo, and advanced recommendation algorithms.
