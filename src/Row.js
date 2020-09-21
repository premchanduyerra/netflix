import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from './axios'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'
function Row({ title, fetchURL, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerURL, setTrailerUrl] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request
        }
        fetchData();
    }, [fetchURL])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };


    const handleClick = (movie) => {
        if (trailerURL) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search)
                    setTrailerUrl(urlParams.get('v'))
                })
                .catch(err => console.log(err))


        }

    }
    // console.table(movies)
    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {
                    movies.map(movie => (
                        <img
                            key={movie.id}
                            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                            onClick={() => handleClick(movie)}
                        />
                    ))
                }

            </div>
            {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
        </div>
    )
}

export default Row;
