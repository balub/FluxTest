import React from 'react';
import { Box, Card, CardContent, IconButton, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Projects: React.FC = () => {
  const projectNames = ['Project One', 'Project Two', 'Project Three'];

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" paddingX={35} paddingY={4}>
      <Box>
        <Typography variant="h6" sx={{fontWeight: "600"}} gutterBottom>
          Recent Projects
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ width: '300px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardContent style={{ textAlign: 'center' }}>
                <IconButton aria-label="add new project">
                  <AddIcon fontSize="large" />
                </IconButton>
                <Typography>
                  Add New Project
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {projectNames.map((projectName, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ width: '300px', height: '200px' }}>
                <CardContent>
                  <Typography variant="h6">
                    {projectName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Projects;
