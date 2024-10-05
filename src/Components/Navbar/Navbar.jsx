import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Typography,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Popover,
  FormControl,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import {
  FilterAlt as FilterAltIcon,
  Sort as SortIcon,
  MovieFilter as MovieFilterIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";

export default function Navbar({
  filters,
  sortType,
  sortIncreasing,
  handleSortType,
  handleSortIncreasing,
  handleFilters,
}) {
  const [anchorElFilters, setAnchorElFilters] = useState(false);
  const [anchorElSort, setAnchorElSort] = useState(false);
  const openFilters = Boolean(anchorElFilters);
  const openSort = Boolean(anchorElSort);

  const handleClose = () => {
    setAnchorElFilters(null);
    setAnchorElSort(null);
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <MovieFilterIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Beacon's Movie List
            </Typography>
            <IconButton
              aria-controls={openFilters ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openFilters ? "true" : undefined}
              onClick={(e) => setAnchorElFilters(e.currentTarget)}
            >
              <FilterAltIcon sx={{ color: "#fff" }} />
            </IconButton>
            <IconButton
              aria-controls={openSort ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openSort ? "true" : undefined}
              onClick={(e) => setAnchorElSort(e.currentTarget)}
            >
              <SortIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Popover
              open={openSort}
              anchorEl={anchorElSort}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2, width: "250px" }}>
                <Typography variant="h6">Sort By</Typography>
                <IconButton onClick={handleSortIncreasing}>
                  <Box
                    sx={{
                      display: "flex",
                      height: "35px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ArrowUpwardIcon
                      sx={{ color: sortIncreasing ? "gray" : "blue" }}
                    />
                    <ArrowDownwardIcon
                      sx={{ color: sortIncreasing ? "blue" : "gray" }}
                    />
                  </Box>
                </IconButton>
                <br />
                <FormControl>
                  <RadioGroup
                    value={sortType}
                    onChange={(e) => handleSortType(e.target.value)}
                  >
                    <FormControlLabel
                      value="primaryTitle"
                      control={<Radio />}
                      label="Title"
                    />
                    <FormControlLabel
                      value="startYear"
                      control={<Radio />}
                      label="Year"
                    />
                    <FormControlLabel
                      value="rating"
                      control={<Radio />}
                      label="Rating"
                    />
                    <FormControlLabel
                      value="runtimeMinutes"
                      control={<Radio />}
                      label="Duration"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </Popover>
            <Popover
              open={openFilters}
              anchorEl={anchorElFilters}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2, width: "250px" }}>
                <Typography variant="h6">Filters</Typography>
                <TextField
                  value={filters?.genre}
                  fullWidth
                  size="small"
                  label="Filter By Genre"
                  onChange={(e) => handleFilters("genre", e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  value={filters?.title}
                  fullWidth
                  size="small"
                  label="Filter By Title"
                  onChange={(e) => handleFilters("title", e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  value={filters?.minRuntime}
                  fullWidth
                  size="small"
                  label="Filter By Min Duration"
                  onChange={(e) => handleFilters("minRuntime", e.target.value)}
                  type="number"
                  sx={{ mb: 2 }}
                />
                <TextField
                  value={filters?.maxRuntime}
                  fullWidth
                  size="small"
                  label="Filter By Max Duration"
                  onChange={(e) => handleFilters("maxRuntime", e.target.value)}
                  type="number"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </Box>
            </Popover>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
