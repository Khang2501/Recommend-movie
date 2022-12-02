import React, { useState, useEffect } from "react";
import classes from "./MoviesDetail.module.css";
const MoviesDetail = (props) => {
  const [movieDetail, setMovieDetail] = useState();
  const [videoError, setVideoError] = useState(false);
  const moviesList = props.moviesList;

  const fetchList = async () => {
    setVideoError(false);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3//movie/${props.moviesList.key}/videos?api_key=30736126a260889e4fa8c79d809f759a`
      );
      if (response.status === 404) {
        setVideoError(true);
        throw new Error("404 not found");
      }

      const data = await response.json();

      if (data.results.length === 0) setVideoError(true);

      const loadedMovies = [];
      data.results.map((responseAPI) => {
        if (responseAPI.type === "Trailer" && responseAPI.site === "YouTube") {
          return loadedMovies.push(responseAPI.key);
        }
      });

      if (loadedMovies.length === 0)
        data.results.map((responseAPI) => {
          if (responseAPI.type === "Teaser" && responseAPI.site === "YouTube") {
            loadedMovies.push(responseAPI.key);
          }
        });
      if (loadedMovies.length === 0)
        data.results.map((responseAPI) => {
          if (
            responseAPI.type === "Behind the Scenes" &&
            responseAPI.site === "YouTube"
          ) {
            loadedMovies.push(responseAPI.key);
          }
        });
      if (loadedMovies.length === 0) {
        setVideoError(true);
      }
      setMovieDetail(loadedMovies[0]);
    } catch (error) {}
  };

  useEffect(() => {
    fetchList();
  }, [moviesList]);

  return (
    <div className={classes["movies_detail_container"]}>
      <div className={classes.left}>
        <h2>{moviesList.title}</h2>
        <div></div>
        <h4>Release Date: {moviesList.releaseDate}</h4>
        <h4>Vote: {moviesList.vote}/10</h4>
        <p>{moviesList.overView}</p>
      </div>

      {videoError ? (
        <img
          className={classes["video_error"]}
          src={moviesList.backdropPath}
          alt={moviesList.title}
        ></img>
      ) : (
        <iframe
          className={classes.right}
          height="300"
          width="630"
          src={`https://www.youtube.com/embed/${movieDetail}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      )}
    </div>
  );
};

export default MoviesDetail;
