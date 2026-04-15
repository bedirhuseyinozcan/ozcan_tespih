import { AppBar, Badge, Box, Button, IconButton, Toolbar } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { NavLink } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartContext } from "../context/CartContext";

const links = [
  { title: "Home", path: "/" },
  { title: "Products", path: "/products" },
  { title: "About", path: "/about" },
  { title: "Error", path: "/errors" },
];

const authlinks = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

export default function Navbar() {
  const { cart } = useCartContext();
  const ItemCount = cart
    ? cart.cartItems.reduce((total, item) => total + item.product.quantity, 0)
    : 0;
  return (
    <AppBar
      position="sticky"
      color="secondary"
      sx={{ backgroundColor: "secondary.light" }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton color="inherit">
            <StorefrontIcon />
          </IconButton>
          {links.map((link) => (
            <Button
              key={link.to}
              component={NavLink}
              to={link.path}
              color="inherit"
            >
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
            <Badge badgeContent={ItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {authlinks.map((link) => (
            <Button
              key={link.to}
              component={NavLink}
              to={link.path}
              color="inherit"
            >
              {link.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
