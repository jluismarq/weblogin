import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, amount) {
  return { id, date, name, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'SCVES',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'SISCO',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'PSS', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'SISCO',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'SCVES',
    212.79,
  ),
];

export default function Test() {
  return (
    <React.Fragment>
      <Title>Test Realizados</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Prueba</TableCell>
            <TableCell>Suma Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}