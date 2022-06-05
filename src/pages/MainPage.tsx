import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { CloseIcon } from "../assets/icons/CloseIcon";
import { MyInput } from "../components/UI/Input/StyledInput";
import defaultImg from "../assets/images/card.png";
import catImg from "../assets/images/catImg.png";
import { MyCard } from "../components/Card/MyCard";
import { useAppDispatch, useTypedSelector } from "../hooks/reduxHooks";
import { fetchFavorites } from "../store/slicesAndThunks/favorites/favorites.slice";
import { ArrowIcon } from "../assets/icons/ArrowIcon";
import { FavoriteCard } from "../components/Card/FavoriteCard";
import {
  IMediaData,
  IPage,
  IResponseData,
} from "../ts/interfaces/search.interface";
import { searchQueryGql } from "../services/query/searchQuery";
import useDebounce from "../hooks/debounceHook";

var url = "https://graphql.anilist.co";

interface IProps {}

const initialData = {
  pageInfo: {
    total: 0,
    currentPage: 0,
    lastPage: 0,
    hasNextPage: false,
    perPage: 0,
  },
  media: [],
};

export const MainPage: React.FC<IProps> = (props) => {
  // loading
  const [loading, setLoading] = useState(false);
  // page
  const [currentPage, setCurrentPage] = useState(0);
  // search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchList, setSearchList] = useState<{ Page: IResponseData }>({
    Page: initialData,
  });
  const [mediaList, setMediaList] = useState<IMediaData[]>([]);
  // custom hooks
  const debouncedQuery = useDebounce(searchQuery, 150);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  // favorites
  const favorites = useTypedSelector((state) => state.favorites);
  const dispatch = useAppDispatch();

  const clearSearch = () => {
    setSearchList({ Page: initialData });
    setMediaList([]);
  };

  useEffect(() => {
    if (!debouncedQuery.trim().length) return;

    const handler = setTimeout(() => {
      clearSearch();
      fetchData();
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedQuery]);

  const fetchData = () => {
    setLoading(true);
    const variables = {
      search: debouncedQuery,
      page: currentPage + 1 || 1,
      perPage: 3,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: searchQueryGql,
        variables,
      }),
    };

    fetch(url, options)
      .then(handleResponse)
      .then(handleData)
      .catch(handleError)
      .finally(() => setLoading(false));
  };

  useLayoutEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  function handleResponse(response: any) {
    return response.json().then(function (json: any) {
      return response.ok ? json?.data : Promise.reject(json);
    });
  }

  function handleData(data: any) {
    setSearchList(data);
    setCurrentPage(data?.Page?.pageInfo?.currentPage);
    setMediaList((prev) => [...prev, ...data?.Page?.media]);
  }

  function handleError(error: any) {
    console.error("err = ", error);
  }

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#eee",
        fontFamily: "NotoSerif",
        fontWeight: 500,
      }}
      minHeight="92vh"
      py="24px"
    >
      <Box
        px="12px"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1280px",
          width: "100%",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          mb="1.5rem"
          sx={{ color: "#00CC99" }}
        >
          Список аниме
        </Typography>
        <MyInput
          id="search"
          placeholder="text here"
          variant="filled"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            disableUnderline: true,
            style: {
              padding: "0",
              backgroundColor: "#fff",
              marginBottom: "24px",
            },
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  padding: "12px",
                  margin: 0,
                  backgroundColor: "#fff",
                }}
              >
                <CloseIcon
                  style={{ height: "18px", cursor: "pointer" }}
                  onClick={() => {
                    setSearchQuery("");
                    clearSearch();
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
        {loading && <CircularProgress />}

        {/* SEARCH RESULTS */}
        <Grid
          container
          spacing={2}
          sx={{ width: isMobile ? "calc(100% + 40px)" : "inherit" }}
        >
          {!!mediaList.length &&
            mediaList.map((items) => {
              return (
                <MyCard
                  key={items.id}
                  id={items.id}
                  title={
                    items.title?.english || items.title?.romaji || "No title"
                  }
                  body={items.title?.native || ""}
                  src={defaultImg}
                  isMobile={isMobile}
                />
              );
            })}
        </Grid>

        {!!debouncedQuery.trim().length &&
          searchList.Page?.pageInfo?.hasNextPage && (
            <React.Fragment>
              {/* SEARCH MORE */}
              <Button
                sx={{
                  backgroundColor: "#00CC99",
                  width: "min-content",
                  padding: "10px 24px",
                  color: "#000",
                  margin: "24px 0",
                }}
                onClick={fetchData}
              >
                <span style={{ marginRight: "10px", fontWeight: 700 }}>
                  More
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ArrowIcon />
                </span>
              </Button>
            </React.Fragment>
          )}
        {/* LIKED DATA */}
        {favorites.length > 0 && (
          <React.Fragment>
            <Typography
              variant="h4"
              component="h2"
              my="28px"
              sx={{ color: "#00CC99" }}
            >
              Любимое аниме
            </Typography>
            <Grid
              container
              spacing={isMobile ? 0 : 2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ width: isMobile ? "calc(100% + 24px)" : "inherit" }}
            >
              {favorites.map((item) => (
                <FavoriteCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  body={item.body}
                  src={catImg}
                  isMobile={isMobile}
                />
              ))}
            </Grid>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};
