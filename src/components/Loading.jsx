import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

export default function Loading({ message }) {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" size={60} />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60px" }}
        >
          {message || "Loading..."}
        </Typography>
      </Box>
    </Backdrop>
  );
}
