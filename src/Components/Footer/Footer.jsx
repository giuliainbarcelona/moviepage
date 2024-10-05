import React from "react";
import { Link, Pagination, Box, BottomNavigation, Paper } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer({ dataLength, handlePagination }) {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
      }}
      elevation={3}
    >
      <Box sx={{ mb: 1 }}>
        <Pagination
          count={Math.ceil(dataLength / 10)}
          onChange={(e, value) => {
            const startIndex = (value - 1) * 10;
            handlePagination(startIndex);
          }}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        This app was created by: Giulia Cellerino
        <Link
          href="https://github.com/giuliainbarcelona/moviepage"
          target="_blank"
          sx={{ display: "inline-flex", alignItems: "center", ml: 1 }}
        >
          <GitHubIcon sx={{ ml: 1 }} />
        </Link>
      </Box>
      <BottomNavigation />
    </Paper>
  );
}
