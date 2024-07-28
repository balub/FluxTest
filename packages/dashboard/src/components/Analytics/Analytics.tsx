import React, {useEffect, useState} from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const data = [
  { id: 1, value: 'Value 1' },
  { id: 2, value: 'Value 2' },
  { id: 3, value: 'Value 1' },
  { id: 4, value: 'Value 2' }, 
  { id: 5, value: 'Value 1' },
  { id: 6, value: 'Value 2' },
];

const Analytics: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [components, setComponents] = useState<{ id: string, name: string }[]>([]);
  const [tableData,setTableData] = useState([])
  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await axios.get('http://localhost:3170/v1/components', { withCredentials: true });
        const componentData = response.data;
        setComponents(componentData);

        if(componentData.length > 0){
          setSelectedComponent(componentData[0].name)
        }
      } catch (error) {
        console.error('Error fetching components:', error);
      }
    };

    fetchComponents();
}, []);

console.log(tableData)
useEffect(() => {

  const getInsights = async () =>{
    if(selectedComponent){

      console.log("selected comp", selectedComponent)
      try {
        const response:any = await axios.get(`http://localhost:3170/v1/projects/${id}/insights?componentID=${selectedComponent}`, { withCredentials: true });
        setTableData(response?.data || [])
      } catch (error) {
        console.error('Error fetching components:', error);
      }
    }
  
  }

  getInsights();

}, [selectedComponent])

const handleComponentChange = (event: SelectChangeEvent) => {
  setSelectedComponent(event.target.value as string);
};

const getHeaders = (data:any)=>{
  const ref = data?.[0] || {}
  const keys = [...Object.keys(ref)]
  
  const dataRef = ref?.data || {}

  if(dataRef.label) keys.push("label")
  if(dataRef.value) keys.push("value")
  return keys?.filter(v=>v!=="data")
}
const headers = getHeaders(tableData)


  return (
    <Box sx={{padding: "5%"}}>
      <Box sx={{backgroundColor: "white"}}>
        <Select
          label="Select Component"
          labelId="component-select-label"
          id="component-select"
          value={selectedComponent}
          onChange={handleComponentChange}
          sx={{width: "20%"}}
        >
          {components.map((component) => (
            <MenuItem key={component.id} value={component.name}>
              {component.name}
            </MenuItem>
          ))}
        </Select>
        </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers?.map((val:any)=>{
                return <TableCell sx={{fontWeight: "700"}}>{val}</TableCell>
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row?.id}>
                {headers?.map((key)=>{
                  if(key === "label") return <TableCell>{row?.data?.["label"]}</TableCell>
                  if(key === "value") return <TableCell>{row?.data?.["value"]}</TableCell>
                  return <TableCell>{`${row[key]}`}</TableCell>
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Analytics;
