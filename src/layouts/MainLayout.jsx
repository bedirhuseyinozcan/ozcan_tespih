import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 2 }}>
        <Outlet />
      </Container>
    </>
  );
}
