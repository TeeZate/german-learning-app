import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = "Loading..." }) => {
  const MotionBox = motion(Box);
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        minHeight: '200px'
      }}
    >
      <MotionBox
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, repeatType: "reverse" }
        }}
      >
        <CircularProgress color="primary" size={60} thickness={4} />
      </MotionBox>
      <Typography 
        variant="body1" 
        color="text.secondary" 
        sx={{ mt: 2 }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
