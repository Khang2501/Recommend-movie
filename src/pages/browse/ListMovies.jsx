import React, { useState, useEffect } from "react";
import MoviesDetail from "./MoviesDetail";
import classes from "./ListMovies.module.scss";

import axios from "axios";
const ListMovies = ({ fetchAPI, title }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [movieKey, setMovieKey] = useState();
  const [movieDetail, setMovieDetail] = useState({});
  const [toggleDetail, setToggleDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(fetchAPI)
      .then((res) => {
        const loadedMovies = [];
        res.data.results.forEach((responseAPI) => {
          loadedMovies.push({
            key: responseAPI.id,
            title: responseAPI.original_title
              ? responseAPI.original_title
              : responseAPI.original_name,
            backdropPath:
              responseAPI.backdrop_path == null
                ? `https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png`
                : `https://image.tmdb.org/t/p/w500/${responseAPI.backdrop_path}`,
            overView: responseAPI.overview,
            releaseDate: responseAPI.release_date,
            vote: responseAPI.vote_average,
          });
        });

        setMoviesList(loadedMovies);
        setIsLoading(true);
      })
      .catch((err) => {});
  }, []);

  const reset = () => {
    setMovieKey();
    setToggleDetail(false);
    setMovieDetail({});
  };
  return (
    <div className={classes["List-movies_container"]}>
      <h2>{title}</h2>
      {isLoading && (
        <ul className={classes.ul}>
          {moviesList.map((movie) => (
            <li key={movie.key} className={classes.items}>
              <img
                className={classes.img}
                src={movie.backdropPath}
                alt={movie.title}
                onClick={() => {
                  if (movieKey !== movie.key) {
                    reset();
                    setMovieKey(movie.key);
                    setMovieDetail(movie);

                    setToggleDetail(true);
                  } else {
                    reset();
                  }
                }}
              ></img>
            </li>
          ))}
        </ul>
      )}

      {toggleDetail && <MoviesDetail moviesList={movieDetail} />}
    </div>
  );
};

export default ListMovies;
