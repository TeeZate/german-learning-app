import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { MotionDiv } from "../utils/animations";
import { showConfirmation } from "../utils/alerts";

const LessonCard = ({ lesson }) => {
  const navigate = useNavigate();

  const handleStartLesson = async () => {
    const confirmed = await showConfirmation(
      "Start Lesson",
      `Are you ready to start "${lesson.title}"?`,
      "Let's Go!"
    );
    
    if (confirmed) {
      navigate(`/lesson/${lesson.id}`);
    }
  };

  return (
    <MotionDiv
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {lesson.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {lesson.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Difficulty:
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: lesson.difficulty === 'Easy' ? 'success.main' : 
                       lesson.difficulty === 'Medium' ? 'warning.main' : 'error.main'
              }}
            >
              {lesson.difficulty}
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth
            onClick={handleStartLesson}
          >
            Start Lesson
          </Button>
        </Box>
      </Card>
    </MotionDiv>
  );
};

export default LessonCard;
