import React from "react";
import { useState, useEffect } from "react";
import NavBar from "./NarBav";
import Banner from "./Banner";
import Original from "./Original";
import ListMovies from "./ListMovies.jsx";
import axios from "axios";
function Browse(props) {
  const requestsAPI = props.requestsAPI;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .get(props.requestsAPI.fetchTrending)
      .then((res) => {
        const loadedMovies = [];
        res.data.results.map((responseAPI) => {
          loadedMovies.push({
            key: responseAPI.id,
            title: responseAPI.original_title,
            backdropPath: `https://image.tmdb.org/t/p/w500/${responseAPI.backdrop_path}`,
            overView: responseAPI.overview,
          });
        });
        setMovies(loadedMovies);
        setIsLoading(true);
      })
      .catch((err) => {
        const errorBanner = [
          {
            key: true,
            title: "Something went wrong",
            backdropPath: `${process.env.PUBLIC_URL}/assets/images/background.jpg`,
            overView: "Something went wrong",
          },
        ];
        setMovies(errorBanner);
        setIsLoading(true);
      });
  }, []);
  return (
    <div className="app">
      {isLoading && <Banner dataBanner={movies} />}
      <NavBar />

      <Original original={requestsAPI.fetchNetflixOriginals} />
      <ListMovies title="Xu hướng" fetchAPI={requestsAPI.fetchTrending} />
      <ListMovies title="Xếp hạng cao" fetchAPI={requestsAPI.fetchTopRated} />
      <ListMovies title="Hành động" fetchAPI={requestsAPI.fetchActionMovies} />
      <ListMovies title="Hài hước" fetchAPI={requestsAPI.fetchComedyMovies} />
      <ListMovies title="Kinh dị" fetchAPI={requestsAPI.fetchHorrorMovies} />
      <ListMovies title="Lãng mạng" fetchAPI={requestsAPI.fetchRomanceMovies} />
      <ListMovies title="Tài liệu" fetchAPI={requestsAPI.fetchDocumentaries} />
    </div>
  );
}

export default Browse;
