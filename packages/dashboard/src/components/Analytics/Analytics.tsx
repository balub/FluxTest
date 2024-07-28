import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const data = [
  { id: 1, value: 'Value 1' },
  { id: 2, value: 'Value 2' },
  { id: 3, value: 'Value 1' },
  { id: 4, value: 'Value 2' }, 
  { id: 5, value: 'Value 1' },
  { id: 6, value: 'Value 2' },
];

const Analytics: React.FC = () => {
  return (
    <Box sx={{padding: "5%"}}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: "700"}}>ID</TableCell>
              <TableCell sx={{fontWeight: "700"}}>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Analytics;
