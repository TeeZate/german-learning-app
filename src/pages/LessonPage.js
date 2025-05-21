import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Container, Typography, Box, Paper, Button, 
  Stepper, Step, StepLabel, StepContent,
  TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
  CircularProgress, Chip,
} from "@mui/material";
import { MotionDiv, fadeIn, slideUp } from "../utils/animations";
import { showConfirmation, showCompletionAlert, showSuccessToast } from "../utils/alerts";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock lesson data
const lessonData = {
  1: {
    id: 1,
    title: "Basic Greetings",
    description: "Learn how to greet people in German and introduce yourself.",
    difficulty: "Easy",
    steps: [
      {
        title: "Common Greetings",
        content: "In German, 'Hello' is 'Hallo' and 'Good morning' is 'Guten Morgen'. 'Good afternoon' is 'Guten Tag' and 'Good evening' is 'Guten Abend'.",
        type: "learn"
      },
      {
        title: "Practice: Greetings",
        content: "Choose the correct translation for 'Good morning':",
        type: "quiz",
        options: ["Guten Abend", "Guten Tag", "Guten Morgen", "Hallo"],
        correctAnswer: "Guten Morgen"
      },
      {
        title: "Introducing Yourself",
        content: "To say 'My name is...' in German, you say 'Ich heiße...' or 'Mein Name ist...'",
        type: "learn"
      },
      {
        title: "Practice: Introductions",
        content: "How would you say 'My name is John' in German?",
        type: "text",
        correctAnswer: "Ich heiße John"
      },
      {
        title: "Asking Questions",
        content: "To ask 'What is your name?' in German, you say 'Wie heißt du?' (informal) or 'Wie heißen Sie?' (formal).",
        type: "learn"
      }
    ]
  },
  2: {
    id: 2,
    title: "Numbers and Counting",
    description: "Master numbers from 1-100 and basic counting in German.",
    difficulty: "Easy",
    steps: [
      {
        title: "Numbers 1-10",
        content: "1 - eins, 2 - zwei, 3 - drei, 4 - vier, 5 - fünf, 6 - sechs, 7 - sieben, 8 - acht, 9 - neun, 10 - zehn",
        type: "learn"
      },
      {
        title: "Practice: Numbers 1-10",
        content: "What is the German word for the number 7?",
        type: "quiz",
        options: ["sechs", "sieben", "acht", "neun"],
        correctAnswer: "sieben"
      }
    ]
  }
};

const LessonPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch lesson data
    setTimeout(() => {
      const fetchedLesson = lessonData[id];
      if (fetchedLesson) {
        setLesson(fetchedLesson);
      }
      setLoading(false);
    }, 800);
  }, [id]);

  const handleNext = () => {
    if (activeStep === lesson.steps.length - 1) {
      setCompleted(true);
      showCompletionAlert(
        "Lesson Completed!",
        `Congratulations! You've completed the "${lesson.title}" lesson.`
      ).then(() => {
        // Navigate back to home after completion
        navigate('/');
      });
    } else {
      setActiveStep((prevStep) => prevStep + 1);
      setUserAnswer("");
      setIsCorrect(null);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setUserAnswer("");
    setIsCorrect(null);
  };

  const handleExit = async () => {
    const confirmed = await showConfirmation(
      "Exit Lesson",
      "Are you sure you want to exit this lesson? Your progress will not be saved.",
      "Yes, Exit"
    );
    
    if (confirmed) {
      navigate('/');
    }
  };

  const checkAnswer = () => {
    const currentStep = lesson.steps[activeStep];
    
    if (currentStep.type === "quiz") {
      setIsCorrect(userAnswer === currentStep.correctAnswer);
    } else if (currentStep.type === "text") {
      // Case insensitive comparison for text inputs
      setIsCorrect(userAnswer.toLowerCase() === currentStep.correctAnswer.toLowerCase());
    }
    
    if (userAnswer === currentStep.correctAnswer) {
      showSuccessToast("Correct answer!");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!lesson) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" align="center">
          Lesson not found
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <MotionDiv
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
        <Container maxWidth="md">
          <Button 
            startIcon={<ArrowBackIcon />} 
            color="inherit" 
            onClick={handleExit}
            sx={{ mb: 2 }}
          >
            Exit Lesson
          </Button>
          
          <MotionDiv variants={slideUp}>
            <Typography variant="h3" component="h1" gutterBottom>
              {lesson.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {lesson.description}
            </Typography>
            <Chip 
              label={`Difficulty: ${lesson.difficulty}`} 
              color={
                lesson.difficulty === "Easy" ? "success" : 
                lesson.difficulty === "Medium" ? "warning" : "error"
              }
              sx={{ mt: 1 }}
            />
          </MotionDiv>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
        <Paper sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {lesson.steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>
                  <Typography variant="h6">{step.title}</Typography>
                </StepLabel>
                <StepContent>
                  <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Typography variant="body1" paragraph>
                      {step.content}
                    </Typography>
                    
                    {step.type === "quiz" && (
                      <FormControl component="fieldset" sx={{ mt: 2, width: '100%' }}>
                        <FormLabel component="legend">Select your answer:</FormLabel>
                        <RadioGroup
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                        >
                          {step.options.map((option, i) => (
                            <FormControlLabel 
                              key={i} 
                              value={option} 
                              control={<Radio />} 
                              label={option} 
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}
                    
                    {step.type === "text" && (
                      <TextField
                        fullWidth
                        label="Your answer"
                        variant="outlined"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        sx={{ mt: 2 }}
                      />
                    )}
                    
                    {(step.type === "quiz" || step.type === "text") && (
                      <Box sx={{ mt: 2 }}>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={checkAnswer}
                          disabled={!userAnswer}
                          sx={{ mr: 2 }}
                        >
                          Check Answer
                        </Button>
                        
                        {isCorrect !== null && (
                          <Typography 
                            variant="body1" 
                            color={isCorrect ? "success.main" : "error.main"}
                            sx={{ mt: 2, display: 'flex', alignItems: 'center' }}
                          >
                            {isCorrect ? (
                              <>
                                <CheckCircleIcon sx={{ mr: 1 }} />
                                Correct!
                              </>
                            ) : (
                              <>
                                The correct answer is: {step.correctAnswer}
                              </>
                            )}
                          </Typography>
                        )}
                      </Box>
                    )}
                    
                    <Box sx={{ mt: 4 }}>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={(step.type !== "learn" && isCorrect === null) || (step.type !== "learn" && isCorrect === false)}
                      >
                        {index === lesson.steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </Box>
                  </MotionDiv>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          
          {completed && (
            <MotionDiv
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ p: 3, bgcolor: 'success.light', borderRadius: 2, mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Lesson Completed!
                </Typography>
                <Typography variant="body1" paragraph>
                  Congratulations! You've successfully completed this lesson.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
              </Box>
            </MotionDiv>
          )}
        </Paper>
      </Container>
    </MotionDiv>
  );
};

export default LessonPage;
