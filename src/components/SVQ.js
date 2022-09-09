import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Dashcomponents/Title';
import TableContainer from '@mui/material/TableContainer';
import { useAuth } from "../hooks/useAuth";
import { obtenerSVQ } from "../entities/questionnarie";

function createData(jsonResponse) {
 return jsonResponse.data.data.map(Test => { 
  const {usuario,created_at,total}=Test;
  const preguntas = Object.keys(Test)
  .filter(key => key.includes("pregunta"))
  .map(key=>({key:Test[key]}))
  return{usuario,created_at,total,preguntas}
});  
}

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2022',
//     '12',
//     '7',
//     '8',
//     27,
//   ),
//   createData(
//     1,
//     '18 Mar, 2022',
//     '11',
//     '12',
//     '15',
//     38,
//   ),
//   createData(2, '20 Mar, 2022', '8', '9', '10', 27),
//   createData(
//     3,
//     '22 Mar, 2022',
//     '10',
//     '14',
//     '13',
//     37,
//   ),
//   createData(
//     4,
//     '24 Mar, 2022',
//     '9',
//     '8',
//     '7',
//     24,
//   ),
// ];

// function preventDefault(event) {
//   event.preventDefault();
// }

export default function Test() {
  const auth = useAuth();
  const [test, setTest] = React.useState([]);

  React.useEffect(() => {
    const fetchPrueba = () => {
      obtenerSVQ({
        email: auth.user.user,
        access: auth.user.access,
      }).then((jsonResponse) => {
        console.log(jsonResponse);
        setTest(createData(jsonResponse));
      });
    };
    fetchPrueba();
  }, [auth.user.user, auth.user.access]);

  return (
    <React.Fragment>
      <Title>Test de Vulnerabilidad al Estrés</Title>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              {/* {console.log(test)} */}
              {test[0] &&
                test[0].preguntas.map((pregunta, index) => {
                  return <TableCell>Pregunta {index + 1}</TableCell>;
                })}
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {test &&
              test.map((row) => (
                <TableRow
                  key={row.created_at}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {new Date(row.created_at).toLocaleDateString()}
                  </TableCell>
                  {row.preguntas.map((pregunta, index) => {
                    return (
                      <TableCell>
                        {pregunta[Object.keys(pregunta)[0]]}
                      </TableCell>
                    );
                  })}
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}