import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import TableContainer from '@mui/material/TableContainer';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2022',
    '12',
    '7',
    '8',
    27,
  ),
  createData(
    1,
    '18 Mar, 2022',
    '11',
    '12',
    '15',
    38,
  ),
  createData(2, '20 Mar, 2022', '8', '9', '10', 27),
  createData(
    3,
    '22 Mar, 2022',
    '10',
    '14',
    '13',
    37,
  ),
  createData(
    4,
    '24 Mar, 2022',
    '9',
    '8',
    '7',
    24,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>En detalle</Title>
      <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Pregunta 1</TableCell>
            <TableCell>Pregunta 2</TableCell>
            <TableCell>Pregunta 3</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </React.Fragment>
  );
}