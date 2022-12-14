import React, { useEffect, useState } from "react";
import classes from "./Original.module.css";
import useAPI from "../../custom-hook/useAPI";
const Original = (props) => {
  const [moviesOriginals, setMoviesOriginals] = useState([]);

  const { isLoading, fetchAPI } = useAPI();

  useEffect(() => {
    const transformTasks = (movieObj) => {
      const loadedMovies = [];

      movieObj.results.map((responseAPI) => {
        return loadedMovies.push({
          key: responseAPI.id,
          title: responseAPI.original_name,
          posterPath: `https://image.tmdb.org/t/p/w500/${responseAPI.poster_path}`,
          overView: responseAPI.overview,
          releaseDate: responseAPI.first_air_date,
          vote: responseAPI.vote_average,
        });
      });
      const loadedMovies10 = loadedMovies.slice(0, 10);
      setMoviesOriginals(loadedMovies10);
    };

    fetchAPI(`https://api.themoviedb.org/3${props.original}`, transformTasks);
  }, []);

  return (
    <div>
      {isLoading && (
        <ul className={classes.ul}>
          {moviesOriginals.map((movie) => (
            <li key={movie.key}>
              <img
                className={classes.img}
                src={movie.posterPath}
                alt={movie.title}
              ></img>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Original;
