import React, { createContext, useState, useContext, useEffect } from 'react';
import { showSuccessToast } from '../utils/alerts';

// Initial user data
const initialUserData = {
  name: "Max Müller",
  email: "max@example.com",
  level: "Intermediate",
  points: 750,
  streak: 12,
  progress: {
    vocabulary: 68,
    grammar: 45,
    listening: 72,
    speaking: 51
  },
  completedLessons: [
    { id: 1, title: "Basic Greetings", score: 95 },
    { id: 2, title: "Numbers and Counting", score: 88 }
  ],
  achievements: [
    { id: 1, title: "First Steps", description: "Complete your first lesson" },
    { id: 2, title: "Week Warrior", description: "Maintain a 7-day streak" },
    { id: 3, title: "Vocabulary Master", description: "Learn 100 new words" }
  ]
};

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data from API or localStorage
    const loadUserData = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch('/api/user');
        // const data = await response.json();
        
        // For now, we'll just use our initial data with a delay to simulate loading
        setTimeout(() => {
          setUserData(initialUserData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading user data:', error);
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Add points to user
  const addPoints = (points) => {
    setUserData(prevData => {
      const newPoints = prevData.points + points;
      const newData = { ...prevData, points: newPoints };
      
      // Check if user leveled up
      if (newPoints >= 1000 && prevData.level === "Beginner") {
        newData.level = "Intermediate";
        showSuccessToast("Congratulations! You've reached Intermediate level!");
      } else if (newPoints >= 2000 && prevData.level === "Intermediate") {
        newData.level = "Advanced";
        showSuccessToast("Congratulations! You've reached Advanced level!");
      }
      
      return newData;
    });
  };

  // Complete a lesson
  const completeLesson = (lessonId, lessonTitle, score) => {
    setUserData(prevData => {
      // Check if lesson is already completed
      const lessonIndex = prevData.completedLessons.findIndex(lesson => lesson.id === lessonId);
      
      let newCompletedLessons;
      if (lessonIndex >= 0) {
        // Update existing lesson score if it's better
        newCompletedLessons = [...prevData.completedLessons];
        if (score > newCompletedLessons[lessonIndex].score) {
          newCompletedLessons[lessonIndex] = { ...newCompletedLessons[lessonIndex], score };
        }
      } else {
        // Add new completed lesson
        newCompletedLessons = [...prevData.completedLessons, { id: lessonId, title: lessonTitle, score }];
      }
      
      // Add points based on score
      const pointsEarned = Math.floor(score / 10) * 10;
      
      return {
        ...prevData,
        completedLessons: newCompletedLessons,
        points: prevData.points + pointsEarned
      };
    });
    
    // Show success message
    showSuccessToast(`Lesson completed! You earned ${Math.floor(score / 10) * 10} points.`);
  };

  // Reset user progress
  const resetProgress = () => {
    setUserData({
      ...initialUserData,
      points: 0,
      streak: 0,
      progress: {
        vocabulary: 0,
        grammar: 0,
        listening: 0,
        speaking: 0
      },
      completedLessons: []
    });
  };

  // Update user profile
  const updateProfile = (newProfileData) => {
    setUserData(prevData => ({
      ...prevData,
      ...newProfileData
    }));
    
    showSuccessToast("Profile updated successfully!");
  };

  return (
    <UserContext.Provider value={{ 
      userData, 
      isLoading, 
      addPoints, 
      completeLesson, 
      resetProgress,
      updateProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
