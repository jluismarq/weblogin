import * as React from "react";
import { useAlert } from "../hooks/useAlert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
  //const [open, setOpen] = React.useState(true);
  //const [transition, setTransition] = React.useState(undefined);
  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "center",
    Transition: Slide,
  });

  const { vertical, horizontal, open } = state;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    //setOpen(false);
    setState({ ...state, open: false });
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical, horizontal }}
      TransitionComponent={TransitionDown}
    >
      <MuiAlert
        onClose={handleClose}
        elevation={6}
        ref={ref}
        variant="filled"
        {...props}
      />
    </Snackbar>
  );
});

export default function CustomizedSnackbars() {
  const alert = useAlert();

  return (
    <>
      {alert.alerts?.map((alert) => (
        <Alert severity={alert.severity} sx={{ width: '100%' }}>{alert.message}</Alert>
      ))}
    </>
  );
}
