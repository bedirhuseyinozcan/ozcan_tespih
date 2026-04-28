import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { currencyTRY } from "../utils/formats";
import ReportIcon from "@mui/icons-material/Report";
import CircularProgress from "@mui/material/CircularProgress";

export default function ProductItem({
  product,
  handleAddItem,
  cartItem,
  isAdding,
}) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ lg: 4, md: 5, sm: 6, xs: 12 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <img
            src={"http://localhost:5000/images/" + product.image}
            style={{ width: "100%", height: "auto" }}
          />
        </Paper>
      </Grid>
      <Grid size={{ lg: 8, md: 7, sm: 6, xs: 12 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography
            component="h1"
            variant="h4"
            color="secondary.dark"
            gutterBottom
          >
            {product.title}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
          <Typography variant="h5" color="secondary" sx={{ mt: 3 }}>
            {currencyTRY.format(product.price)}
          </Typography>
          <Stack
            direction="row"
            display="flex"
            alignItems="center"
            spacing={2}
            gap={2}
            sx={{ mt: 3 }}
          >
            <Button
              onClick={() => handleAddItem(product.id)}
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }}
            >
              Sepete ekle
            </Button>
            {cartItem?.product.quantity > 0 && (
              <Typography
                sx={{ mt: 3, display: "flex", alignItems: "center" }}
                variant="body2"
                color="secondary"
              >
                <ReportIcon color="secondary" /> Sepetinizde{" "}
                {cartItem.product.quantity} adet var.
              </Typography>
            )}

            {isAdding && <CircularProgress size={20} />}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}
