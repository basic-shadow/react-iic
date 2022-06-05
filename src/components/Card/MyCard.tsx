import React, { useState } from "react";

import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia,
  Box,
  Button,
  Typography,
  Grid,
} from "@mui/material";

import fav from "../../assets/icons/favicon.png";
import nonfav from "../../assets/icons/non_favicon.png";
import { likedItemsKey } from "../../utils/const";
import { useAppDispatch, useTypedSelector } from "../../hooks/reduxHooks";
import {
  addToFavorites,
  deleteFromFavorites,
} from "../../store/slicesAndThunks/favorites/favorites.slice";

interface IProps {
  id: number;
  title: string;
  body: string;
  src: string;
  isMobile: boolean;
}

export const MyCard: React.FC<IProps> = ({
  isMobile,
  id,
  src,
  body,
  title,
}) => {
  const dispatch = useAppDispatch();
  const favorites = useTypedSelector((state) => state.favorites);

  const toggleFavorites = () => {
    const item = {
      id,
      src,
      body,
      title,
    };

    const likedItems: any[] = JSON.parse(
      localStorage?.getItem(likedItemsKey) || "[]"
    );
    const idx = likedItems.findIndex((item) => item.id === id);
    if (idx >= 0) dispatch(deleteFromFavorites(id));
    else dispatch(addToFavorites(item));
  };

  const isLiked = () => {
    return Boolean(favorites.find((item) => item.id === id));
  };
  return (
    <Grid
      item
      sm={4}
      xs={12}
      sx={{
        width: "100%",
        maxWidth: isMobile ? "100%" : "373px",
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          minHeight: "309px",
          height: "100%",
          pb: "12px",
          borderRadius: 0,
          mt: isMobile ? 2 : 0,
        }}
      >
        <CardActionArea>
          <Box
            height="60%"
            width="100%"
            sx={{
              "& .img": { width: "100%", height: "100%", objectFit: "fill" },
            }}
          >
            <CardMedia component="img" src={src} alt="fox girl" />
          </Box>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5" mt="8px">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              margin: "0 40px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "200px",
            }}
          >
            {body}
          </Typography>
          <Button
            size="small"
            sx={{ position: "absolute", right: 0 }}
            onClick={toggleFavorites}
          >
            <img src={isLiked() ? fav : nonfav} alt="like" />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
