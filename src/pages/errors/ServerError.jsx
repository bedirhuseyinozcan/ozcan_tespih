import { Alert, Button, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

export default function ServerErrorPage() {
  const { state } = useLocation().state;
  return (
    <Paper sx={{ p: 3 }}>
      {state?.error ? (
        <>
          <Typography variant="h4" gutterBottom>
            {state.error.message} - {state.status}
          </Typography>
          <Alert severity="error">
            {state.error.details || "bilinmeyen bir hata oluştu"}
          </Alert>
        </>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Server Error
          </Typography>
          <Alert security="error">Bilinmeyen bir hata</Alert>
        </>
      )}
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Anasayfa
      </Button>
    </Paper>
  );
}
