import {URL_tmdbPosterBase} from "./urls";

const MoviePoster = function (props) {
    return (
        <div className="movie-poster">
            <img
                loading="lazy"
                alt="movie-poster"
                className="poster"
                src={`${URL_tmdbPosterBase}${props.src}.jpg`}
                style={{"display": props.visible ? "inline-flex" : "none"}}
            />
        </div>
    )
};

export default MoviePoster