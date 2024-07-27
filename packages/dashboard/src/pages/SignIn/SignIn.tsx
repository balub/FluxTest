import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

const SignIn: React.FC = () => {
  const handleSignIn = (endpoint: string) => {
    const url = `http://localhost:3170/v1/auth/${endpoint}`;
    window.open(url, '_blank');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
    >
      <Typography variant="h5" sx={{ fontWeight: '600' }} gutterBottom>
        Login to continue
      </Typography>
      <Stack spacing={2} direction="row">
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          style={{ textTransform: 'none' }}
          onClick={() => handleSignIn('google')}
        >
          Sign in with Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          style={{ textTransform: 'none' }}
          onClick={() => handleSignIn('github')}
        >
          Sign in with GitHub
        </Button>
      </Stack>
    </Box>
  );
};

export default SignIn;
