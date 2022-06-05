import React, { useState } from "react";

import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Typography,
} from "@mui/material";

import { useAppDispatch } from "../../hooks/reduxHooks";
import { deleteFromFavorites } from "../../store/slicesAndThunks/favorites/favorites.slice";
import { CloseIcon } from "../../assets/icons/CloseIcon";

interface IProps {
  id: number;
  title: string;
  body: string;
  src: string;
  isMobile: boolean;
}

export const FavoriteCard: React.FC<IProps> = ({
  isMobile,
  id,
  src,
  body,
  title,
}) => {
  const dispatch = useAppDispatch();

  const toggleFavorites = () => {
    dispatch(deleteFromFavorites(id));
  };

  return (
    <Grid
      item
      sm={4}
      xs={12}
      sx={{
        width: "100%",
        maxWidth: isMobile ? "100%" : "361px",
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          display: "flex",
          borderRadius: 0,
          position: "relative",
          height: "217px",
          mt: isMobile ? 2 : 0,
        }}
      >
        <Box width="35%">
          <CardMedia
            component="img"
            src={src}
            alt="fox girl"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "fitHeight",
            }}
          />
        </Box>
        <CardContent sx={{ textAlign: "center", width: "65%" }}>
          <Typography variant="h5">{title}</Typography>
        </CardContent>

        <Button
          size="small"
          sx={{
            position: "absolute",
            right: 0,
            bottom: "10px",
          }}
          onClick={toggleFavorites}
        >
          <CloseIcon style={{ height: "18px" }} />
        </Button>
      </Card>
    </Grid>
  );
};
