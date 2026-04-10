import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Button,
  CardActionArea,
} from "@mui/material";
import { Link } from "react-router";
import { currencyTRY } from "../utils/formats";

export default function ProductCard({ product }) {
  return (
    <Card>
      <CardActionArea component={Link} to={"/products/" + product.id}>
        <CardMedia
          sx={{ height: 160, backgroundSize: "contain" }}
          image={"http://localhost:5000/images/" + product.image}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h2"
            color="primary.dark"
          >
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="secondary.dark">
            {currencyTRY.format(product.price)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="primary">
          <FavoriteIcon />
          {/* <FavoriteBorderIcon /> */}
        </IconButton>
        <Button>Sepete ekle</Button>
      </CardActions>
    </Card>
  );
}
