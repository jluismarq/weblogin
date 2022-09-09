import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Dashcomponents/Title";
import TableContainer from "@mui/material/TableContainer";
import { useAuth } from "../hooks/useAuth";
import { obtenerSVQ } from "../entities/questionnarie";
import { Typography } from "@mui/material";

function createData(jsonResponse) {
  return jsonResponse.data.data.map((Test) => {
    const { usuario, created_at, total } = Test;
    const preguntas = Object.keys(Test)
      .filter((key) => key.includes("pregunta"))
      .map((key) => ({ key: Test[key] }));
    return { usuario, created_at, total, preguntas };
  });
}

export default function Test() {
  const auth = useAuth();
  const [test, setTest] = React.useState([]);

  React.useEffect(() => {
    const fetchPrueba = () => {
      obtenerSVQ({
        email: auth.user.user,
        access: auth.user.access,
      }).then((jsonResponse) => {
        // console.log(jsonResponse);
        setTest(createData(jsonResponse));
      });
    };
    fetchPrueba();
  }, [auth.user.user, auth.user.access]);

  return (
    <React.Fragment>
      <Title>Lista de Indicadores de Vulnerabilidad al Estrés</Title>
      {!(test.length === 0) ? (
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
      ) : (
        <Typography>No hay información disponible</Typography>
      )}
    </React.Fragment>
  );
}
