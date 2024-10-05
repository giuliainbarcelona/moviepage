import React, { useState, useEffect } from "react";
import {
  Rating,
  Box,
  Typography,
  Link,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import defaultMovieImg from "../../Image/defaultMovieImg.jpg";

export default function Maincontainer({ data }) {
  const [moviesPosters, setMoviesPosters] = useState({});
  const getPoster = async (id) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=648cab45`
      );

      const data = await response.json();
      setMoviesPosters((prev) => {
        return { ...prev, [id]: data?.Poster };
      });
    } catch (error) {
      console.error("Error fetching poster:", error);
    }
  };

  useEffect(() => {
    data.forEach((movie) => {
      getPoster(movie.tconst);
    });
  }, [data]);

  return (
    <div
      style={{
        padding: 50,
      }}
    >
      <ImageList sx={{ width: "100%" }} cols={5} gap={16}>
        {data?.map((item) => {
          return (
            <ImageListItem
              key={item.tconst}
              sx={{
                borderRadius: "25px",
                overflow: "hidden",
                backgroundColor: "aliceblue",
              }}
            >
              <img
                src={
                  moviesPosters?.[item.tconst] === "N/A"
                    ? defaultMovieImg
                    : moviesPosters?.[item.tconst] || defaultMovieImg
                }
                alt={item.primaryTitle}
                loading="lazy"
                style={{ height: "200px" }}
              />
              <ImageListItemBar
                sx={{ padding: "5px" }}
                title={
                  <Link
                    href={`https://www.imdb.com/title/${item.tconst}/`}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      color: "#0000EE",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.primaryTitle}
                  </Link>
                }
                subtitle={
                  <div>
                    <p>Genre: {item.genres}</p>
                    <p>Year: {item.startYear}</p>
                    <p>Duration: {item.runtimeMinutes} Min</p>
                    <Box display="flex" alignItems="center">
                      <Rating
                        name="read-only"
                        value={item.averageRating}
                        size="small"
                        readOnly
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {item.averageRating} / 10
                      </Typography>
                    </Box>
                  </div>
                }
                position="below"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
}
