import React from "react";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MotionDiv, staggerContainer, slideUp } from "../utils/animations";
import LessonCard from "../components/LessonCard";

// Example lesson data
const lessons = [
  {
    id: 1,
    title: "Basic Greetings",
    description: "Learn how to greet people in German and introduce yourself.",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "Numbers and Counting",
    description: "Master numbers from 1-100 and basic counting in German.",
    difficulty: "Easy"
  },
  {
    id: 3,
    title: "Daily Conversations",
    description: "Practice everyday conversations and useful phrases.",
    difficulty: "Medium"
  },
  {
    id: 4,
    title: "Grammar Fundamentals",
    description: "Understand the basics of German grammar and sentence structure.",
    difficulty: "Hard"
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <MotionDiv
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <MotionDiv variants={slideUp}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to German Learning
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Start your journey to mastering the German language today
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={() => navigate('/profile')}
              sx={{ mr: 2 }}
            >
              View Profile
            </Button>
          </MotionDiv>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <MotionDiv variants={slideUp}>
          <Typography variant="h3" component="h2" gutterBottom>
            Available Lessons
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Choose a lesson below to start learning German. Track your progress in your profile.
          </Typography>
        </MotionDiv>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {lessons.map((lesson) => (
            <Grid item xs={12} sm={6} md={4} key={lesson.id}>
              <LessonCard lesson={lesson} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: 6, mt: 8 }}>
        <Container maxWidth="lg">
          <MotionDiv variants={slideUp}>
            <Typography variant="h4" component="h3" gutterBottom align="center">
              Ready to become fluent in German?
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Start Learning Now
              </Button>
            </Box>
          </MotionDiv>
        </Container>
      </Box>
    </MotionDiv>
  );
};

export default Home;
