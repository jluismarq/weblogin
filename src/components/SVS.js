import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { useAuth } from "../hooks/useAuth";
import { obtenerSVS } from "../entities/questionnarie";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableFooter from "@mui/material/TableFooter";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { tableCellClasses } from "@mui/material/TableCell";

function createData(jsonResponse) {
  return jsonResponse.data.data.map((Test) => {
    const { usuario, created_at, total } = Test;
    const preguntas = Object.keys(Test)
      .filter((key) => key.includes("pregunta"))
      .map((key) => ({ key: Test[key] }));
    return { usuario, created_at, total, preguntas };
  });
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="primera página"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="página anterior"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="página siguiente"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="última página"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function SVS() {
  const auth = useAuth();
  const [test, setTest] = React.useState([]);
  const [ocultar, setOcultar] = React.useState(true);

  React.useEffect(() => {
    const fetchPrueba = () => {
      obtenerSVS({
        email: auth.user.user,
        access: auth.user.access,
      }).then((jsonResponse) => {
        // console.log(jsonResponse);
        setTest(createData(jsonResponse));
      });
    };
    fetchPrueba();
  }, [auth.user.user, auth.user.access]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
       {!(test.length === 0) ? (
          <Button
            sx={{
              mt: 2,
              mb: 2,
              textTransform: "none",
              borderRadius: 5,
            }}
            onClick={() => setOcultar(!ocultar)}
          >
            Mostrar Respuestas
          </Button>
      ) : (
        <></>
      )}
      {!(test.length === 0) ? (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                {/* {console.log(test)} */}
                {test[0] &&
                  !ocultar &&
                  test[0].preguntas.map((pregunta, index) => {
                    return <TableCell>R:{index + 1}</TableCell>;
                  })}
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {test &&
                (rowsPerPage > 0
                  ? test.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : test
                ).map((row) => (
                  <TableRow
                    key={row.created_at}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {new Date(row.created_at).toLocaleDateString()}
                    </TableCell>
                    {!ocultar &&
                      row.preguntas.map((pregunta, index) => {
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
            <TableFooter>
              <TableRow
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                  },
                }}
              >
                <TablePagination
                  rowsPerPageOptions={[
                    5,
                    10,
                    25,
                    { label: "Todos", value: -1 },
                  ]}
                  colSpan={3}
                  count={test.length}
                  rowsPerPage={rowsPerPage}
                  labelDisplayedRows={({ from, to, count }) => {
                    return "" + from + " - " + to + " de " + count;
                  }}
                  page={page}
                  labelRowsPerPage={"Resultados por página"}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "filas por página",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <Typography align="center">No hay información disponible</Typography>
      )}
    </React.Fragment>
  );
}
