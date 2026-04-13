import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

export default function MainLayout() {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="light" />
      <Navbar />
      <Container sx={{ mt: 2 }}>
        <Outlet />
      </Container>
    </>
  );
}
