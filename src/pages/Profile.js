import React from "react";
import { 
  Container, Typography, Box, Avatar, Paper, 
  Grid, LinearProgress, Button, Divider, Chip 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MotionDiv, fadeIn, slideUp } from "../utils/animations";
import { showConfirmation, showSuccessToast } from "../utils/alerts";
import { useUser } from "../context/UserContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';

const Profile = () => {
  const navigate = useNavigate();
  const { userData, isLoading, resetProgress } = useUser();

  const handleResetProgress = async () => {
    const confirmed = await showConfirmation(
      "Reset Progress",
      "Are you sure you want to reset all your progress? This cannot be undone.",
      "Yes, Reset"
    );
    
    if (confirmed) {
      resetProgress();
      showSuccessToast("Your progress has been reset");
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading profile data..." />;
  }

  return (
    <MotionDiv
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Button 
            startIcon={<ArrowBackIcon />} 
            color="inherit" 
            onClick={() => navigate('/')}
            sx={{ mb: 2 }}
          >
            Back to Home
          </Button>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={3}>
              <MotionDiv variants={slideUp}>
                <Avatar
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: { xs: 'auto', md: 0 },
                    bgcolor: 'secondary.main',
                    fontSize: '3rem'
                  }}
                >
                  {userData.name.charAt(0)}
                </Avatar>
              </MotionDiv>
            </Grid>
            
            <Grid item xs={12} md={9}>
              <MotionDiv variants={slideUp}>
                <Typography variant="h3" component="h1" gutterBottom>
                  {userData.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {userData.email}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Chip 
                    label={`Level: ${userData.level}`} 
                    color="secondary" 
                    sx={{ mr: 2 }}
                  />
                  <Chip 
                    label={`${userData.points} Points`} 
                    color="primary" 
                    variant="outlined"
                    sx={{ mr: 2 }}
                  />
                  <Chip 
                    label={`${userData.streak} Day Streak`} 
                    color="success" 
                    variant="outlined"
                  />
                </Box>
              </MotionDiv>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <MotionDiv variants={slideUp}>
              <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Learning Progress
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body1" gutterBottom>Vocabulary</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={userData.progress.vocabulary} 
                    color="primary"
                    sx={{ height: 10, borderRadius: 5, mb: 2 }}
                  />
                  
                  <Typography variant="body1" gutterBottom>Grammar</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={userData.progress.grammar} 
                    color="secondary"
                    sx={{ height: 10, borderRadius: 5, mb: 2 }}
                  />
                  
                  <Typography variant="body1" gutterBottom>Listening</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={userData.progress.listening} 
                    color="success"
                    sx={{ height: 10, borderRadius: 5, mb: 2 }}
                  />
                  
                  <Typography variant="body1" gutterBottom>Speaking</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={userData.progress.speaking} 
                    color="info"
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
              </Paper>
            </MotionDiv>

            <MotionDiv variants={slideUp}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Completed Lessons
                </Typography>
                
                {userData.completedLessons.length > 0 ? (
                  <Box>
                    {userData.completedLessons.map((lesson, index) => (
                      <React.Fragment key={lesson.id}>
                        <Box sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="body1" fontWeight={500}>
                              {lesson.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Lesson {lesson.id}
                            </Typography>
                          </Box>
                          <Chip 
                            label={`${lesson.score}%`} 
                            color={lesson.score >= 90 ? "success" : lesson.score >= 70 ? "primary" : "secondary"}
                          />
                        </Box>
                        {index < userData.completedLessons.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    You haven't completed any lessons yet.
                  </Typography>
                )}
              </Paper>
            </MotionDiv>
          </Grid>

          <Grid item xs={12} md={4}>
            <MotionDiv variants={slideUp}>
              <Paper sx={{ p: 3, mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmojiEventsIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h5" component="h2">
                    Achievements
                  </Typography>
                </Box>
                
                {userData.achievements.map((achievement) => (
                  <Box key={achievement.id} sx={{ py: 2 }}>
                    <Typography variant="body1" fontWeight={500}>
                      {achievement.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.description}
                    </Typography>
                  </Box>
                ))}
              </Paper>
            </MotionDiv>

            <MotionDiv variants={slideUp}>
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h5" component="h2">
                    Learning Stats
                  </Typography>
                </Box>
                
                <Box sx={{ py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Study Time
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    12 hours 30 minutes
                  </Typography>
                </Box>
                
                <Box sx={{ py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Words Learned
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    248 words
                  </Typography>
                </Box>
                
                <Box sx={{ py: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Exercises Completed
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    86 exercises
                  </Typography>
                </Box>
                
                <Button 
                  variant="outlined" 
                  color="error" 
                  fullWidth 
                  sx={{ mt: 3 }}
                  onClick={handleResetProgress}
                >
                  Reset Progress
                </Button>
              </Paper>
            </MotionDiv>
          </Grid>
        </Grid>
      </Container>
    </MotionDiv>
  );
};

export default Profile;
