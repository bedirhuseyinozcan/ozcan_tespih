import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { currencyTRY } from "../utils/formats";
import { useState } from "react";
import requests from "../api/apiClient";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCartContext } from "../context/CartContext";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CircularProgress from "@mui/material/CircularProgress";

export default function CartPage() {
  const { cart, setCart } = useCartContext();
  const [status, setStatus] = useState({ loading: false, id: "" });

  const subTotal = cart?.cartItems.reduce((toplam, item) => {
    return toplam + item.product.price * item.product.quantity;
  }, 0);
  const tax = subTotal * 0.18;
  const total = subTotal + tax;

  if (!cart || cart.cartItems.length === 0) {
    return (
      <Typography variant="h6" color="text.secondary">
        Sepetiniz boş
      </Typography>
    );
  }

  function handleAddItem(productId, id) {
    setStatus({ loading: true, id: id });
    requests.cart
      .addItem(productId)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  function handleRemoveItem(productId, id, quantity = 1) {
    setStatus({ loading: true, id: id });
    requests.cart
      .removeItem(productId, quantity)
      .then((cart) => setCart(cart))
      .catch((error) => console.log(error))
      .finally(() => setStatus({ loading: false, id: "" }));
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 100 }}></TableCell>
            <TableCell>Ürün</TableCell>
            <TableCell sx={{ width: 120 }}>Fiyat</TableCell>
            <TableCell sx={{ width: 170 }}>Adet</TableCell>
            <TableCell sx={{ width: 120 }}>Toplam</TableCell>
            <TableCell sx={{ width: 50 }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart &&
            cart.cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={`http://localhost:5000/images/${item.product.image}`}
                    alt={item.product.title}
                    style={{ width: "100%" }}
                  />
                </TableCell>
                <TableCell>{item.product.title}</TableCell>
                <TableCell>{currencyTRY.format(item.product.price)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      handleAddItem(
                        item.product.productId,
                        "add" + item.product.productId,
                      )
                    }
                    size="small"
                  >
                    {status.loading &&
                    status.id === "add" + item.product.productId ? (
                      <CircularProgress size={20} />
                    ) : (
                      <AddCircleIcon />
                    )}
                  </Button>
                  {item.product.quantity}
                  <Button
                    onClick={() =>
                      handleRemoveItem(
                        item.product.productId,
                        "remove" + item.product.productId,
                      )
                    }
                    size="small"
                  >
                    {status.loading &&
                    status.id === "remove" + item.product.productId ? (
                      <CircularProgress size={20} />
                    ) : (
                      <RemoveCircleIcon />
                    )}
                  </Button>
                </TableCell>
                <TableCell>
                  {currencyTRY.format(
                    item.product.price * item.product.quantity,
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      handleRemoveItem(
                        item.product.productId,
                        "delete" + item.product.productId,
                        item.product.quantity,
                      )
                    }
                    color="error"
                  >
                    {status.loading &&
                    status.id === "delete" + item.product.productId ? (
                      <CircularProgress size={20} />
                    ) : (
                      <DeleteIcon />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell align="right" colSpan={5}>
              Ara Toplam
            </TableCell>
            <TableCell align="right" colSpan={5}>
              {currencyTRY.format(subTotal)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={5}>
              Vergi
            </TableCell>
            <TableCell align="right" colSpan={5}>
              {currencyTRY.format(tax)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" colSpan={5}>
              Toplam
            </TableCell>
            <TableCell align="right" colSpan={5}>
              {currencyTRY.format(total)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
