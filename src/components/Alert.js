import * as React from "react";
import { useAlert } from "../hooks/useAlert";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} elevation={6} ref={ref} variant="filled" {...props} />
    </Snackbar>
  );
});

export default function CustomizedSnackbars() {
  const alert = useAlert();
  
  return (
    <>
      {alert.alerts?.map((alert) => (
        <Alert severity={alert.severity}>
          {alert.message}
        </Alert>
      ))}
    </>
  );
}
