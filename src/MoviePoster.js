import React from "react"

import "./MoviePoster.css"

const MoviePoster = function (props) {
    return (
        <div className={"poster-wrapper"}
             style={{"display": props.visible ? "inline-flex" : "none"}}
             title={props.title}
             onClick={() => {props.click(props.title)}} >
            <img loading={"lazy"}
                 alt={"movie-poster"}
                 className={"poster-img"}
                 src={props.src}/>
        </div>
    )
}

export default MoviePoster