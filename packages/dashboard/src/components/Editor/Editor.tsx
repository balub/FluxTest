import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Typography, InputLabel, Select, MenuItem, Stack, Tabs, Tab, Button,
  FormControl, FormControlLabel, RadioGroup, Radio
 } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import "./styles.css";
import { useParams } from 'react-router-dom';

const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tabValue, setTabValue] = useState(0);
  const [components, setComponents] = useState<{ id: string, name: string }[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  //common property
  const [label, setLabel] = useState('Input Label');
  const [position, setPosition] = useState('');
  //input property
  const [placeholder, setPlaceholder] = useState('Enter text here...');
  //tab property
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(100);
  //toast property
  const [status, setStatus] = useState('success');

  useEffect(() => {
      const fetchComponents = async () => {
        try {
          const response = await axios.get('http://localhost:3170/v1/components', { withCredentials: true });
          const componentData = response.data;
          setComponents(componentData);
        } catch (error) {
          console.error('Error fetching components:', error);
        }
      };

      const fetchTemplate = async () => {
        try {
          const response = await axios.get(`http://localhost:3170/v1/templates/${id}`, { withCredentials: true });
          const templateData = response.data;
          const meta = templateData.meta[0];
          if (meta) {
            setLabel(meta.data.label || '');
            setPosition(meta.data.position || '');
            setPlaceholder(meta.data.placeholder || '');
            setSelectedComponent(meta.componentId.toUpperCase());
            setMinValue(meta.data.minValue || 1);
            setMaxValue(meta.data.maxValue || 100);
            setStatus(meta.data.status || 'success');
          }
        } catch (error) {
          console.error('Error fetching template:', error);
        }
      };

      fetchTemplate();
      fetchComponents();
  }, []);

  const handleDropdownChange = (event: SelectChangeEvent) => {
    setPosition(event.target.value as string);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleComponentChange = (event: SelectChangeEvent) => {
    setSelectedComponent(event.target.value as string);
  };

  const renderComponent = () => {
    const component = components.find(comp => comp.name === selectedComponent);

    if (component) {
      switch (component.name) {
        case 'INPUT':
          return (
            <>
              <input type="text" className="input-field" placeholder={placeholder} disabled />
              <button className="submit-button">Submit</button>
            </>
          );

        case 'RANGE':
          return (
            <>
            <div className="slider-container">
            <input 
              type="range" 
              min={minValue} 
              max={maxValue} 
              value={(minValue + maxValue) / 2} 
              className="slider" 
            />
            <div className="slider-info">
              <small>{minValue}</small>
              <small>{(minValue + maxValue) / 2}</small>
              <small>{maxValue}</small>
            </div>
          </div>
           <button className="submit-button">Submit</button>
           </>
          );

        case 'RATING':
          return (
            <>
              <input type="text" className="toast-message" placeholder={placeholder} disabled />
            </>
          );

        default:
          return <Typography>No Component Selected</Typography>;
      }
    }
    return <Typography>No Component Selected</Typography>;
  };

  const renderField = () => {
    const component = components.find(comp => comp.name === selectedComponent);
    if (component) {
      switch (component.name) {
        case 'INPUT':
          return (
            <>
              <InputLabel id="demo-simple-select-label">Placeholder</InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                margin="normal"
              />
            </>
          );

        case 'RANGE':
          return (
            <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <InputLabel id="min-value-label">Min Value</InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={minValue}
                  onChange={(e) => setMinValue(Number(e.target.value))}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel id="max-value-label">Max Value</InputLabel>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  value={maxValue}
                  onChange={(e) => setMaxValue(Number(e.target.value))}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </>
          );

        case 'RATING':
          return (
            <>
             <InputLabel id="demo-simple-select-label">Description</InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                margin="normal"/>
                  <FormControl component="fieldset" margin="normal">
                  <RadioGroup row value={status} onChange={handleStatusChange}>
                    <FormControlLabel value="success" control={<Radio />} label="Success" sx={{color: "black"}}/>
                    <FormControlLabel value="error" control={<Radio />} label="Error"  sx={{color: "black"}}/>
                  </RadioGroup>
                </FormControl>
            </>
          );

        default:
          return <Typography>No Component Selected</Typography>;
      }
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus((event.target as HTMLInputElement).value);
  };


  const handleSave = async () => {
    const data:any = {
      meta: [
        {
          componentId: selectedComponent.toLowerCase(),
          data: {
            label,
            position,
          },
        },
      ],
      projectId: id,
    };

    if (selectedComponent === 'INPUT') {
      data.meta[0].data.placeholder = placeholder;
    } else if (selectedComponent === 'RANGE') {
      data.meta[0].data.minValue = minValue;
      data.meta[0].data.maxValue = maxValue;
    } else{
      data.meta[0].data.placeholder = placeholder;
      data.meta[0].data.status = status;
    }

    try {
      await axios.post('http://localhost:3170/v1/templates', data, { withCredentials: true });
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <Grid container sx={{ backgroundColor: "#2d2d31", height: "100%" }}>
      <Grid item xs={8}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <div className="center-display">
            <Box className="input-box"   sx={{
              border: selectedComponent === 'RATING'
                ? (status === 'success' ? '5px solid green' : '5px solid red')
                : 'none',
            }}>
              <h6 className="label">{label}</h6>
              {renderComponent()}
            </Box>
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
                  <MenuItem key={component.id} value={component.name}>
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
              <InputLabel id="demo-simple-select-label">Label</InputLabel>
              <TextField
                fullWidth
                variant="outlined"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                margin="normal"
              />
                 {renderField()}
              <Stack>
                <InputLabel id="demo-simple-select-label">Position</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={position}
                  onChange={handleDropdownChange}
                >
                  <MenuItem value={"top-right"}>Top Right</MenuItem>
                  <MenuItem value={"top-left"}>Top Left</MenuItem>
                  <MenuItem value={"bottom-right"}>Bottom Right</MenuItem>
                  <MenuItem value={"bottom-left"}>Bottom Left</MenuItem>
                </Select>
              </Stack>
              <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Editor;
