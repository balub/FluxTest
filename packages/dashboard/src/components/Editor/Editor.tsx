import React, { useState } from 'react';
import { Box, Grid, TextField, Typography, InputLabel, Select, MenuItem, SelectChangeEvent, Stack } from '@mui/material';
import "./styles.css"

const Editor: React.FC = () => {
  const [placeholder, setPlaceholder] = useState('Enter text here...');
  const [label, setLabel] = useState('Input Label');

  const [position, setPosition] = React.useState('');

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value as string);
  };

  return (
    <Grid container sx={{backgroundColor: "grey", height: "100%"}}>
        {/* Center Display */}
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
        {/* Right Panel */}
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
            <Typography variant="h6" gutterBottom>
              Right Panel
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
        </Grid>
    </Grid>
  );
};

export default Editor;
