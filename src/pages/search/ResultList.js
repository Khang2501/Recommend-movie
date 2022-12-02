import React, { useState, useEffect } from "react";
import MoviesDetail from "../browse/MoviesDetail";
import style from "./ResultList.module.css";
import classes from "../browse/Original.module.css";
const ResultList = (props) => {
  const [resultMovies, setresultMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [movieKey, setMovieKey] = useState();
  const [movieDetail, setMovieDetail] = useState({});
  const [toggleDetail, setToggleDetail] = useState(false);

  const inputResult = props.inputResult;

  const fetchResultMovies = async () => {
    setToggleDetail(false);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=30736126a260889e4fa8c79d809f759a&language=en-US&query=${inputResult}&page=1`
      );
      const data = await response.json();

      if (data.total_results === 0) throw new Error("No movies");

      const loadedMovies = [];
      data.results.map((responseAPI) => {
        return loadedMovies.push({
          key: responseAPI.id,
          title: responseAPI.original_title,
          posterPath:
            responseAPI.poster_path == null
              ? `${process.env.PUBLIC_URL}/assets/images/poster-replace.jpg`
              : `https://image.tmdb.org/t/p/w500/${responseAPI.poster_path}`,
          backdropPath:
            responseAPI.backdrop_path == null
              ? `${process.env.PUBLIC_URL}/assets/images/background.jpg`
              : `https://image.tmdb.org/t/p/w500/${responseAPI.backdrop_path}`,
          overView: responseAPI.overview,
          releaseDate: responseAPI.release_date,
          vote: responseAPI.vote_average,
        });
      });

      setresultMovies(loadedMovies);
      setIsLoading(true);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchResultMovies();
  }, [inputResult]);

  const reset = () => {
    setMovieKey();
    setToggleDetail(false);
    setMovieDetail({});
  };

  return (
    <div className={style.resultList}>
      <h2 className={style.title}>Search Result</h2>
      {isLoading && (
        <ul className={classes.ul}>
          {resultMovies.map((movie) => (
            <li key={movie.key}>
              <img
                className={classes.img}
                src={movie.posterPath}
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
      {!isLoading && <p className={style.error}>{error}</p>}
      {toggleDetail && <MoviesDetail moviesList={movieDetail} />}
    </div>
  );
};

export default ResultList;
