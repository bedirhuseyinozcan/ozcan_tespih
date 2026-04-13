import { Alert, Button, Paper, Typography } from "@mui/material";
import { Link, useLocation } from "react-router";

export default function NotFoundPage() {
  const { state } = useLocation();
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Not Found Error
      </Typography>
      <Alert severity="error">
        Aradığınız kaynak bulunamadı. Lütfen URL'yi kontrol edin veya anasayfaya
        dönün.
      </Alert>
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
