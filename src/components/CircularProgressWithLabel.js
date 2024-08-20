import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  return (
      <Box position="relative" display="inline-flex">
          <CircularProgress 
          variant="determinate" {...props} 
          style={{ color:'red' }}
          size={300}
          />
          <Box
              top={0}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
          >
              <Typography 
              variant="body2"
              fontSize={30}
              >{props.label}</Typography>
              <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(props.value)}%`}</Typography>
          </Box>
      </Box>
  );
}

export default CircularProgressWithLabel;