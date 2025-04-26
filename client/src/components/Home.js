import React from 'react';
import { Container, Typography, Button, Grid, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const createNewRoom = () => {
    // Generate a random room ID
    const roomId = Math.random().toString(36).substring(2, 8);
    navigate(`/room/${roomId}`);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Welcome to Virtual Study Room
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
          Collaborate, Learn, and Succeed Together
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Create a New Study Room
            </Typography>
            <Typography variant="body1" paragraph>
              Start a new collaborative session with your study group
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={createNewRoom}
              sx={{ mt: 2 }}
            >
              Create Room
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Join Existing Room
            </Typography>
            <Typography variant="body1" paragraph>
              Enter a room code to join an ongoing study session
            </Typography>
            <Button
              variant="outlined"
              size="large"
              sx={{ mt: 2 }}
            >
              Join Room
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Real-time Collaboration
              </Typography>
              <Typography variant="body2">
                Work together with your study group in real-time using our chat and whiteboard features.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                File Sharing
              </Typography>
              <Typography variant="body2">
                Share notes, documents, and resources with your study group instantly.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Focus Timer
              </Typography>
              <Typography variant="body2">
                Stay productive with our built-in Pomodoro timer and study session tracking.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 