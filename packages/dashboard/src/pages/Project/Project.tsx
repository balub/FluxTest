import React from 'react';
import { Box, Typography, Tabs, Tab, Tooltip, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Editor from '../../components/Editor/Editor';
import Analytics from '../../components/Analytics/Analytics';

const Project: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { id } = useParams<{ id: string }>();
  const handleCopyClick = () => {
      if (id) {
      navigator.clipboard.writeText(id);
      }
  };

  return (
    <Box>
    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{backgroundColor: "#0A2342", paddingX: "5%", paddingTop: "2%"}}>
        <Typography variant="h6" sx={{ fontWeight: '600' }} gutterBottom>
            Project Name
        </Typography>
        <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{ marginRight: 1 }}>
                ID: {id}
            </Typography>
            <Tooltip title="Copy to clipboard">
                <IconButton onClick={handleCopyClick} size="small" sx={{ color: 'white' }}>
                <ContentCopyIcon color='inherit' fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: "#0A2342", paddingX: "5%" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Editor" />
            <Tab label="Analysis" />
        </Tabs>
      </Box>
      <Box marginTop={2}>
        {value === 0 && <Editor></Editor>}
        {value === 1 && <Analytics></Analytics>}
      </Box>
    </Box>
  );
};

export default Project;
