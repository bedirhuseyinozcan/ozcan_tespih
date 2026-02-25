import { AppBar, Badge, Box, Button, IconButton, Toolbar } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { NavLink } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const links = [
  { title: "Home", path: "/" },
  { title: "Products", path: "/products" },
  { title: "About", path: "/about" },
];

const authlinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "secondary.light" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton color="inherit">
            <StorefrontIcon />
          </IconButton>
          {links.map((link) => (
            <Button component={NavLink} to={link.path} color="inherit">
              {link.title}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            component={NavLink}
            to="/cart"
            size="large"
            edge="start"
          >
            <Badge badgeContent={2} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {authlinks.map((link) => (
            <Button component={NavLink} to={link.path} color="inherit">
              {link.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
