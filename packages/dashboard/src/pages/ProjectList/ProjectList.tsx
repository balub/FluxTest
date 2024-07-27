import React, {useState, useEffect} from 'react';
import { Modal, Box, Card, CardContent, IconButton, Typography, Grid, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProjectList: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<{ id: number; name: string }[]>([]);
  const [projectName, setProjectName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  
  const handleCardClick = (id: number) => {
    navigate(`/project/${id}`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await axios.get('http://localhost:3170/v1/projects', { withCredentials: true });
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3170/v1/projects', { name: projectName }, {withCredentials: true});
      setProjects((prevProjects) => [
        { id: response.data.id, name: projectName },
        ...prevProjects
      ]);
      setProjectName('');
      setModalOpen(false);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" paddingX={35} paddingY={4}>
      <Modal open={modalOpen}  onClose={handleCloseModal}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px'
          }}
        >
          <Typography variant="h6" color={'black'} gutterBottom>
            Add New Project
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              margin="normal"
            />
            <Button size='large' type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      <Box>
        <Typography variant="h6" sx={{fontWeight: "600"}} gutterBottom>
          Recent Projects
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card style={{ width: '300px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CardContent style={{ textAlign: 'center' }}>
                <IconButton aria-label="add new project" onClick={handleOpenModal}>
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
