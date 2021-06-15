import React from "react";

import {URL_pageGoogle, URL_searchGoogle, URL_searchFandango, URL_searchIMDB, URL_pageTMDB} from "./urls";
import "./WatchButtons.css"

const WatchButton = function (props) {
    return (
        <a href={props.href} target={"_blank"} rel={"noopener noreferrer"}>
            <button>{props.name}</button>
        </a>
    )
}

const WatchButtons = function (props) {
    if (props.movie === "") return <div className={"watch-buttons"}/>
    if (props.db[props.movie] === undefined) return <div className={"watch-buttons"}/>
    const options = props.db[props.movie]

    const buttons = []

    if (options.onGoogle) {
        buttons.push(<WatchButton
            key={"watch-google"}
            href={options.gid ? `${URL_pageGoogle}${options.gid}` : `${URL_searchGoogle}${props.movie}`}
            name={"Google"}/>
        )
    }
    if (options.onFandango) {
        buttons.push(<WatchButton
            key={"watch-fandango"}
            href={`${URL_searchFandango}${props.movie}`}
            name={"Fandango"}/>
        )
    }
    if (options.file) {
        buttons.push(<WatchButton
            key={"watch-digital"}
            href={"#"}
            name={"Digital File"}/>
        )
    }
    if (options.disc) {
        buttons.push(<WatchButton
            key={"watch-disc"}
            href={"#"}
            name={"Disc"}/>
        )
    }
    if (options.uhd) {
        buttons.push(<WatchButton
            key={"watch-uhd"}
            href={"#"}
            name={"UHD"}/>
        )
    }
    if (options.is3D) {
        buttons.push(<WatchButton
            key={"watch-3d"}
            href={"#"}
            name={"3D"}/>
        )
    }

    buttons.push(<WatchButton
        key={"watch-imdb"}
        href={`${URL_searchIMDB}${props.movie}`}
        name={"Search IMDb"}/>
    )

    buttons.push(<WatchButton
        key={"watch-tmdb"}
        href={`${URL_pageTMDB}${options.tmdbid}`}
        name={"View on TMDB"}/>
    )

    return (
        <div className={"watch-buttons"}>
            {buttons}
        </div>
    )
}

export default WatchButtons