import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Tooltip, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Editor from '../../components/Editor/Editor';
import Analytics from '../../components/Analytics/Analytics';
import axios from 'axios';

const Project: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [projectName, setProjectName] = useState<string>('');
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:3170/v1/projects/${id}`, { withCredentials: true });
          const project = response.data[0];
          setProjectName(project.name);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCopyClick = () => {
    if (id) {
      navigator.clipboard.writeText(id);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "#34425f", paddingX: "5%", paddingTop: "2%" }}>
        <Typography variant="h6" sx={{ fontWeight: '600' }} gutterBottom>
          {projectName || 'Loading...'}
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" sx={{ marginRight: 1 }}>
            {id}
          </Typography>
          <Tooltip title="Copy to clipboard">
            <IconButton onClick={handleCopyClick} size="small" sx={{ color: 'white' }}>
              <ContentCopyIcon color='inherit' fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "#34425f", paddingX: "5%" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  sx={{ '& .MuiTab-root': { color: 'white' } }}>
          <Tab label="Editor" />
          <Tab label="Analysis" />
        </Tabs>
      </Box>
      <Box sx={{ height: "80vh", overflow: "hidden" }}>
        {value === 0 && <Editor />}
        {value === 1 && <Analytics />}
      </Box>
    </Box>
  );
};

export default Project;
