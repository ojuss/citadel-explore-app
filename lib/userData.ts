import { User, UserDatabase } from './types';

// Fake user database with 100 users from 5 colleges
const colleges: string[] = [
  "IIT Delhi",
  "Delhi University",
  "Jamia Millia Islamia",
  "Jawaharlal Nehru University",
  "Indian Institute of Technology Bombay"
];

const interests: string[] = [
  "Photography", "Gaming", "Startups", "Music", "Art", "Sports", "Reading", 
  "Cooking", "Travel", "Movies", "Dancing", "Programming", "Fitness", "Writing",
  "Painting", "Singing", "Cricket", "Football", "Basketball", "Tennis",
  "Hiking", "Yoga", "Meditation", "Blogging", "Fashion", "Architecture",
  "History", "Psychology", "Literature", "Philosophy", "Science", "Technology"
];

const degrees: string[] = [
  "Computer Science", "Engineering", "Business", "Arts", "Science", 
  "Medicine", "Law", "Economics", "Psychology", "Literature", "History",
  "Mathematics", "Physics", "Chemistry", "Biology", "Architecture"
];

const names: string[] = [
  "Aditya Sharma", "Priya Singh", "Rohit Kumar", "Ananya Gupta", "Arjun Patel",
  "Sneha Reddy", "Vikram Mehta", "Kavya Nair", "Ravi Agarwal", "Meera Joshi",
  "Akash Verma", "Ishita Saxena", "Siddharth Rao", "Nisha Kapoor", "Varun Malhotra",
  "Pooja Sharma", "Karan Singh", "Ritika Bansal", "Nikhil Pandey", "Shruti Mishra",
  "Abhishek Tiwari", "Neha Chandra", "Manish Goyal", "Preeti Aggarwal", "Shubham Jain",
  "Divya Khanna", "Rahul Sinha", "Simran Kaur", "Ankit Dubey", "Sakshi Mittal",
  "Harsh Vardhan", "Komal Gupta", "Gaurav Bhardwaj", "Richa Srivastava", "Deepak Yadav",
  "Tanya Malhotra", "Vishal Kumar", "Payal Jha", "Mohit Agarwal", "Swati Verma",
  "Kunal Sethi", "Megha Sharma", "Rajesh Gupta", "Kritika Singh", "Naveen Kumar",
  "Archana Patel", "Sumit Raj", "Anjali Mishra", "Amar Singh", "Pallavi Reddy",
  "Yash Sharma", "Sonali Gupta", "Amit Kumar", "Shivani Agarwal", "Suraj Patel",
  "Nikita Singh", "Rohan Verma", "Aditi Sharma", "Tarun Malhotra", "Shilpa Joshi",
  "Kartik Mehta", "Tanvi Gupta", "Ashish Kumar", "Ritu Singh", "Sandeep Yadav",
  "Prachi Agarwal", "Vivek Sharma", "Neetu Patel", "Anuj Sinha", "Shreya Reddy",
  "Raj Kumar", "Shivam Gupta", "Natasha Singh", "Aman Sharma", "Priyanka Jain",
  "Tushar Verma", "Jyoti Agarwal", "Sachin Patel", "Riya Sharma", "Arun Kumar",
  "Vandana Singh", "Nitin Gupta", "Shweta Mishra", "Manoj Yadav", "Deepika Reddy",
  "Puneet Sharma", "Sunita Patel", "Rahul Agarwal", "Madhuri Singh", "Subhash Kumar",
  "Kiran Gupta", "Ajay Sharma", "Rekha Patel", "Sanjay Singh", "Mamta Agarwal",
  "Bharat Kumar", "Lata Sharma", "Dinesh Patel", "Geeta Singh", "Rajiv Agarwal",
  "Savita Gupta", "Umesh Sharma", "Radha Patel", "Narayan Singh", "Kamala Agarwal"
];

const cities: string[] = ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune"];

const bios: string[] = [
  "Explorer at heart 🌟", "Living life one adventure at a time", "Coffee lover & dreamer",
  "Passionate about making connections", "Always up for new experiences", "Optimist with a camera",
  "Foodie exploring the world", "Music is my therapy", "Creating memories every day",
  "Student by day, dreamer by night", "Making the most of college life", "Believer in good vibes",
  "Spreading positivity wherever I go", "Learning something new everyday", "Art enthusiast",
  "Sports lover and team player", "Bookworm with big dreams", "Tech geek with a creative side",
  "Fitness enthusiast", "Nature lover", "Aspiring entrepreneur", "Social butterfly",
  "Minimalist lifestyle", "Adventure seeker", "Philosophy student", "Future changemaker"
];

// Generate random user data
const generateUsers = (): User[] => {
  const users: User[] = [];
  
  for (let i = 1; i <= 100; i++) {
    const userId = `user${i.toString().padStart(3, '0')}`;
    const name = names[Math.floor(Math.random() * names.length)];
    const college = colleges[Math.floor(Math.random() * colleges.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const degree = degrees[Math.floor(Math.random() * degrees.length)];
    const bio = bios[Math.floor(Math.random() * bios.length)];
    
    // Generate 3-6 random interests
    const numInterests = Math.floor(Math.random() * 4) + 3;
    const userInterests: string[] = [];
    const shuffledInterests = [...interests].sort(() => Math.random() - 0.5);
    for (let j = 0; j < numInterests; j++) {
      userInterests.push(shuffledInterests[j]);
    }
    
    const user: User = {
      id: userId,
      name: name,
      college: college,
      city: city,
      degree: degree,
      interests: userInterests,
      bio: bio,
      avatar: `https://i.pravatar.cc/150?img=${i}`,
      age: Math.floor(Math.random() * 6) + 18, // 18-23
      graduationYear: Math.floor(Math.random() * 4) + 2024, // 2024-2027
      gender: Math.random() > 0.5 ? "Male" : "Female",
      relationshipStatus: Math.random() > 0.7 ? "Single" : "Looking",
      languages: ["English", "Hindi"],
      dietaryRestrictions: ["none", "vegetarian", "vegan"][Math.floor(Math.random() * 3)],
      budgetRange: ["500-800", "800-1200", "1200+"][Math.floor(Math.random() * 3)],
      alcohol: Math.random() > 0.5,
      likedProfiles: [],
      dislikedProfiles: [],
      interactionHistory: {}
    };
    
    users.push(user);
  }
  
  return users;
};

export const userData: UserDatabase = {
  users: generateUsers()
};

export default userData;
