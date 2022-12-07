import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia
        component="img"
        image={product.image}
        alt="image"
      />
      <CardContent>
        <Typography 
        // gutterBottom
        variant="h6" 
        color="text.primary">
          {product.name}
        </Typography>
        <Typography
          // gutterBottom
          variant=""
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          ${product.cost}
        </Typography>
        <Rating
          // gutterBottom
          name="half-rating"
          value={product.rating}
          readOnly
        />
      </CardContent>
      <CardActions>
        <Button fullWidth className="button" variant="contained" onClick={handleAddToCart}>
          <AddShoppingCartOutlined />
           Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
