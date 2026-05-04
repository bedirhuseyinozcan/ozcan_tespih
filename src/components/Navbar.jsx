import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Link, NavLink } from "react-router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../pages/account/accountSlice";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useState } from "react";

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
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const ItemCount = cart
    ? cart.cartItems.reduce((total, item) => total + item.product.quantity, 0)
    : 0;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

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

          {user ? (
            <>
              <Button
                id="user-button"
                onClick={handleClick}
                endIcon={<KeyboardArrowDown />}
              >
                {user.username}
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/orders">
                  Orders
                </MenuItem>
                <MenuItem onClick={() => dispatch(logout())}>
                  Çıkış Yap
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
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
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
