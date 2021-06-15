import React from "react"

import "./MoviePoster.css"

const posterBaseUrl = "https://image.tmdb.org/t/p/w300/"

const MoviePoster = function (props) {
    return (
        <div className="poster-wrapper"
             style={{"display": props.visible ? "inline-flex" : "none"}}
             title={props.title}
             onClick={() => {props.click(props.title)}} >
            <img loading="lazy"
                 alt="movie-poster"
                 className={"poster-img"}
                 src={`${posterBaseUrl}${props.src}.jpg`}/>
        </div>
    )
};

export default MoviePoster