import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Maincontainer from "./Components/MainContainer/Maincontainer";
import Footer from "./Components/Footer/Footer";
import { tsvParseRows } from "d3-dsv";

export default function Home() {
  const [dataLength, setDataLength] = useState(0);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [sortType, setSortType] = useState("primaryTitle");
  const [sortIncreasing, setSortIncreasing] = useState(true);
  const [filters, setFilters] = useState({
    genre: "",
    title: "",
    minRuntime: 0,
    maxRuntime: Infinity,
  });

  const filterData = (dataAsObjects) => {
    return dataAsObjects.filter((item) => {
      const matchesGenre =
        filters.genre === "" || item.genres?.includes(filters.genre);
      const matchesTitle =
        filters.title === "" ||
        item.primaryTitle?.toLowerCase().includes(filters.title.toLowerCase());
      const runtime = Number(item.runtimeMinutes);
      const matchesRuntime =
        runtime >= filters.minRuntime && runtime <= filters.maxRuntime;

      return matchesGenre && matchesTitle && matchesRuntime;
    });
  };

  const sortData = (filteredData) => {
    return filteredData.sort((a, b) => {
      let valueA = a[sortType];
      let valueB = b[sortType];

      if (sortType === "primaryTitle") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
        if (valueA < valueB) return sortIncreasing ? -1 : 1;
        if (valueA > valueB) return sortIncreasing ? 1 : -1;
        return 0;
      }

      valueA = Number(valueA);
      valueB = Number(valueB);
      if (isNaN(valueA)) valueA = 0;
      if (isNaN(valueB)) valueB = 0;

      return sortIncreasing ? valueA - valueB : valueB - valueA;
    });
  };

  useEffect(() => {
    const fetchBasicsAndRatings = async () => {
      try {
        let headers;
        const allFiles = [];

        for (let index = 0; index < 10; index++) {
          const basicsResponse = await fetch(
            `/dataset/title.basics${index + 1}.tsv`
          );
          const basicsReader = basicsResponse.body.getReader();
          const basicsDecoder = new TextDecoder();
          const basicsResult = await basicsReader.read();
          const basicsRows = tsvParseRows(
            basicsDecoder.decode(basicsResult.value, {
              stream: true,
            })
          );
          if (!index) {
            headers = basicsRows[0];
            allFiles.push(...basicsRows.slice(1));
          } else {
            allFiles.push(...basicsRows);
          }
        }

        const dataAsObjects = allFiles.map((row) => {
          return row.reduce((acc, value, index) => {
            acc[headers[index]] = value;
            return acc;
          }, {});
        });

        const ratingsResponse = await fetch("/dataset/title.ratings.tsv");
        const ratingsReader = ratingsResponse.body.getReader();
        const ratingsDecoder = new TextDecoder();
        const ratingsResult = await ratingsReader.read();
        const ratingsRows = tsvParseRows(
          ratingsDecoder.decode(ratingsResult.value, {
            stream: true,
          })
        );

        const ratingsMap = ratingsRows.slice(1).reduce((acc, row) => {
          const [tconst, averageRating, numVotes] = row;
          acc[tconst] = { averageRating, numVotes };
          return acc;
        }, {});

        const mergedData = dataAsObjects.map((movie) => {
          const ratingInfo = ratingsMap[movie.tconst] || {
            averageRating: "N/A",
            numVotes: "N/A",
          };
          return { ...movie, ...ratingInfo };
        });

        const filteredData = filterData(mergedData);
        setDataLength(filteredData?.length);

        const sortedData = sortData(filteredData);
        setData(sortedData.slice(pagination, pagination + 10));
      } catch (error) {
        console.error("Error fetching or parsing the file:", error);
      }
    };

    fetchBasicsAndRatings();
  }, [sortType, sortIncreasing, filters, pagination]);

  const handleSortType = (type) => {
    setSortType(type);
  };

  const handleSortIncreasing = () => {
    setSortIncreasing(!sortIncreasing);
  };

  const handleFilters = (type, value) => {
    setFilters((prev) => {
      return { ...prev, [type]: value };
    });
  };

  const handlePagination = (increment) => {
    setPagination(increment);
  };

  return (
    <div>
      <Navbar
        sortType={sortType}
        filters={filters}
        sortIncreasing={sortIncreasing}
        handleSortType={handleSortType}
        handleSortIncreasing={handleSortIncreasing}
        handleFilters={handleFilters}
      />
      <Maincontainer data={data} />
      <Footer dataLength={dataLength} handlePagination={handlePagination} />
    </div>
  );
}
