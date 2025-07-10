# Citadel Explore App

A React Native application built with Expo that helps college students discover and connect with potential matches using an intelligent profile discovery algorithm.

p.s : I'm mostly a web dev guy so it was my first time building an expo app and I've many a times vibe coded my way through it. I want to give acknowledgement Claude for the great assistance and I had lots of fun implementing the app! Thanks lots for the opportunity!

## Overview

The Citadel Explore App implements a sophisticated matching system that analyzes user profiles across multiple dimensions to suggest compatible matches. The app features a modern, full-screen interface similar to popular dating applications, with an emphasis on academic and interest-based compatibility.

## Features

- Profile discovery with intelligent matching algorithm
- Full-screen profile cards with detailed user information
- Like/Dislike functionality with learning capabilities
- Advanced filtering system (college, age, interests)
- Real-time recommendations based on user behavior
- Bottom navigation with multiple app sections

## Technical Architecture

### Core Components

1. **ProfileDiscoveryEngine** (`lib/ProfileDiscoveryEngine.ts`)
   - Main recommendation algorithm
   - Calculates compatibility scores using multiple factors
   - Learns from user interactions to improve future suggestions

2. **ExploreScreen** (`src/components/ExploreScreen.tsx`)
   - Primary user interface for profile discovery
   - Handles user interactions (like/dislike)
   - Manages recommendation state and filtering

3. **User Database** (`lib/userData.ts`)
   - Contains 100 fake user profiles from 5 colleges
   - Diverse set of interests, degrees, and demographics
   - Realistic profile data for testing algorithm accuracy

4. **UI Components** (`src/components/ui/`)
   - ProfileCard: Individual profile display component
   - BottomNavigation: Main app navigation
   - FilterModal: Advanced filtering interface

5. **Custom Hook** (`src/hooks/useExploreScreen.ts`)
   - Manages explore screen state and logic
   - Handles recommendation engine interactions
   - Provides clean separation of concerns

### Algorithm Logic

The ProfileDiscoveryEngine uses a multi-factor scoring system:

#### 1. Academic Similarity (30% weight)
- Same college: +0.5 score
- Same degree: +0.3 score
- Related academic fields: +0.1 score

#### 2. Interest Compatibility (40% weight)
- Uses Jaccard similarity coefficient
- Calculates intersection over union of interests
- Applies diversity bonus to prevent identical matches
- Penalizes too much overlap to encourage variety

#### 3. Geographic Proximity (15% weight)
- Same city: +0.8 score
- Different cities: 0.0 score

#### 4. Demographic Compatibility (15% weight)
- Age similarity (within 3 years): scaled score
- Common languages: +0.2 score
- Compatible dietary restrictions: +0.1 score

#### 5. Behavioral Learning
- Analyzes user's like/dislike history
- Finds patterns in preferred profiles
- Avoids suggesting similar profiles to previously disliked users
- Cold start handling for new users

### Data Flow

1. **Initialization**
   - App loads 100 user profiles from userData.ts
   - ProfileDiscoveryEngine initializes with user database
   - Current user is set (simulated as first user in database)

2. **Profile Discovery**
   - Algorithm calculates compatibility scores for all potential matches
   - Applies any active filters (college, age, interests)
   - Returns top-ranked profiles sorted by compatibility

3. **User Interaction**
   - Like/Dislike actions are recorded in user's interaction history
   - Algorithm learns from these interactions for future recommendations
   - Viewed profiles are removed from recommendation pool

4. **Recommendation Updates**
   - When recommendation pool gets low (≤3 profiles), new suggestions are generated
   - Updated recommendations incorporate recent user behavior
   - Filter changes trigger immediate recommendation refresh

### Compatibility Score Calculation

```
Total Score = (Academic × 0.30) + (Interest × 0.40) + (Geographic × 0.15) + (Demographic × 0.15)
```

Final scores range from 0.0 to 1.0, with higher scores indicating better compatibility.

### Match Reasons Generation

The algorithm provides explanations for why profiles were matched:
- "Both at [College Name]" - Same academic institution
- "[N] shared interests" - Common hobby/activity overlap
- "Both in [City]" - Geographic proximity
- "Similar age" - Age difference ≤ 1 year
- "Both studying [Degree]" - Same academic program

## Database Structure

The fake database contains 100 users distributed across:

### Colleges (20 users each)
- IIT Delhi
- Delhi University  
- Jamia Millia Islamia
- Jawaharlal Nehru University
- Indian Institute of Technology Bombay

### User Attributes
- **Demographics**: Name, age (18-25), gender
- **Academic**: College, degree, graduation year
- **Personal**: Bio, interests (3-8 per user), languages
- **Location**: City, dietary restrictions
- **Social**: Profile image URL, interaction history

### Interest Categories (32 total)
Photography, Gaming, Startups, Music, Art, Sports, Reading, Cooking, Travel, Movies, Dancing, Programming, Fitness, Writing, Painting, Singing, Cricket, Football, Basketball, Tennis, Hiking, Yoga, Meditation, Blogging, Fashion, Architecture, History, Psychology, Literature, Philosophy, Science, Technology

## Installation and Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. Access the app via Expo Go or web browser at localhost:8081

## Testing the Algorithm

To verify algorithm accuracy:

1. **Cold Start Testing**: New user receives recommendations based on demographic similarity
2. **Learning Verification**: Like several profiles with common traits, observe how subsequent recommendations adapt
3. **Filter Testing**: Apply various filters and verify results match criteria  
4. **Diversity Testing**: Algorithm should balance similarity with variety to prevent echo chambers

## File Structure

```
lib/
├── ProfileDiscoveryEngine.ts    # Core matching algorithm
├── userData.ts                  # User database (100 profiles)
├── types.ts                     # TypeScript type definitions
└── index.ts                     # Main library exports

src/
├── components/
│   ├── ExploreScreen.tsx        # Main screen component
│   └── ui/
│       ├── ProfileCard.tsx      # Individual profile card
│       ├── BottomNavigation.tsx # App navigation
│       └── FilterModal.tsx      # Filter interface
└── hooks/
    └── useExploreScreen.ts      # Custom hook for screen logic
```

## Key Functions

### ProfileDiscoveryEngine Methods

- `calculateCompatibilityScore()`: Main scoring function combining all factors
- `calculateInterestSimilarity()`: Jaccard similarity with diversity bonus
- `calculateAcademicSimilarity()`: College and degree matching
- `calculateBehavioralMatch()`: Learning from user interaction history
- `discoverProfiles()`: Main recommendation generation with filtering
- `recordInteraction()`: Updates user behavior model

### ExploreScreen Methods

- `handleLike()`: Records positive interaction and updates recommendations
- `handleDislike()`: Records negative interaction and updates recommendations  
- `applyFilters()`: Regenerates recommendations with filter criteria
- Profile card rendering with user information display

The algorithm successfully balances multiple compatibility factors while learning from user behavior to provide increasingly accurate recommendations over time.
