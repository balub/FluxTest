import React from 'react';
import { Box, Card, CardContent, IconButton, Typography, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

const projects = [
  { id: 1, name: 'Project One' },
  { id: 2, name: 'Project Two' },
  { id: 3, name: 'Project Three' },
];

const ProjectList: React.FC = () => {

  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/project/${id}`);
  };

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
          {projects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ width: '300px', height: '200px' }} onClick={() => handleCardClick(project.id)}>
                <CardContent>
                  <Typography variant="h6">
                    {project.name}
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

export default ProjectList;
