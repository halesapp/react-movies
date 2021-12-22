import React from "react"

import "./MoviePoster.css"

const MoviePoster = (props) => {
    return (
        <div className={`poster-div${!props.visible ? props.animateSearch ? " disappear" : " hidden" : ""}${props.large ? " sole" : ""}`}
             title={props.title}
             onClick={() => {if (props.visible) props.click(props.title)}}>
            <img loading={"lazy"}
                 alt={"movie poster"}
                 className={"poster-img"}
                 src={props.src}/>
        </div>
    )
}

export default MoviePoster