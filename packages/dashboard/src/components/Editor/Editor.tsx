import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Typography, InputLabel, Select, MenuItem, Stack, Tabs, Tab } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import "./styles.css";

const Editor: React.FC = () => {
  const [placeholder, setPlaceholder] = useState('Enter text here...');
  const [label, setLabel] = useState('Input Label');
  const [position, setPosition] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [components, setComponents] = useState<{ id: string, name: string }[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string>('');

  useEffect(() => {
    if (tabValue === 0) {
      const fetchComponents = async () => {
        try {
          const response = await axios.get('http://localhost:3170/v1/components', { withCredentials: true });
          setComponents(response.data);
        } catch (error) {
          console.error('Error fetching components:', error);
        }
      };

      fetchComponents();
    }
  }, [tabValue]);

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value as string);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleComponentChange = (event: SelectChangeEvent) => {
    setSelectedComponent(event.target.value as string);
  };

  return (
    <Grid container sx={{backgroundColor: "grey", height: "100%"}}>

      <Grid item xs={8}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <div className="center-display">
            <div className="input-box">
              <h6 className="label">{label}</h6>
              <input type="text" className="input-field" placeholder={placeholder} disabled/>
              <button className="submit-button">Submit</button>
            </div>
          </div>
        </Box>
      </Grid>
      
      <Grid item xs={4}>
        <Box
          sx={{
            border: '1px solid #ccc',
            padding: 2,
            borderRadius: 1,
            backgroundColor: 'white',
            height: '100%',
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="editor tabs" sx={{ mb: 2 }}>
            <Tab label="Components" />
            <Tab label="Inspect" />
          </Tabs>
          
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Components
              </Typography>
              <InputLabel id="component-select-label">Select Component</InputLabel>
              <Select
                labelId="component-select-label"
                id="component-select"
                value={selectedComponent}
                onChange={handleComponentChange}
                fullWidth
              >
                {components.map((component) => (
                  <MenuItem key={component.id} value={component.id}>
                    {component.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}
          
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Inspect
              </Typography>
              <InputLabel id="demo-simple-select-label">Placeholder</InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                margin="normal"
              />
              <InputLabel id="demo-simple-select-label">Label</InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                margin="normal"
              />
              <Stack>
                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={position}
                  onChange={handleDropdownChange}
                >
                  <MenuItem value={"top right"}>Top Right</MenuItem>
                  <MenuItem value={"top left"}>Top Left</MenuItem>
                  <MenuItem value={"bottom right"}>Bottom Right</MenuItem>
                  <MenuItem value={"bottom left"}>Bottom Left</MenuItem>
                </Select>
              </Stack>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Editor;
