import React from "react";

import {URL_pageGoogle, URL_searchGoogle, URL_searchFandango, URL_searchIMDB, URL_pageTMDB} from "./urls";
import {GooglePlayLogo, FandangoLogo, DiscIcon, IMDBLogo} from "./LogoSVG"
import "./WatchButtons.css"

const WatchButton = function (props) {
    return (
        <a href={props.href} target={"_blank"} rel={"noopener noreferrer"}>
            <button className={"watch-button"}>{props.children}</button>
        </a>
    )
}

const WatchButtons = function (props) {
    if (props.movie === "") return <div className={"watch-button-group hide"}/>
    if (props.db[props.movie] === undefined) return <div className={"watch-button-group hide"}/>
    const options = props.db[props.movie]

    const buttons = []

    if (options.onGoogle) {
        buttons.push(
            <WatchButton
                key={"google"}
                key={"google"}
                href={options.gid ? `${URL_pageGoogle}${options.gid}` : `${URL_searchGoogle}${props.movie}`}
            >
                <GooglePlayLogo/>
                <div>Google</div>
            </WatchButton>
        )
    }
    if (options.onFandango) {
        buttons.push(
            <WatchButton
                key={"fandango"}
                href={`${URL_searchFandango}${props.movie}`}
            >
                <FandangoLogo/>
                <div>Fandango</div>
            </WatchButton>
        )
    }
    if (options.file) {
        buttons.push(
            <WatchButton
                key={"digital"}
                href={"#"}
            >
                <div>Digital File</div>
            </WatchButton>
        )
    }
    if (options.disc) {
        buttons.push(
            <button key={"disc"} className={"watch-button"}>
                <DiscIcon/>
                <div>Disc</div>
            </button>
        )
    }
    if (options.uhd) {
        buttons.push(
            <button key={"uhd"} className={"watch-button"}>
                <div>UHD</div>
            </button>        )
    }

    buttons.push(
        <WatchButton
            key={"watch-imdb"}
            href={`${URL_searchIMDB}${props.movie}`}
        >
            <IMDBLogo/>
            <div>IMDb</div>
        </WatchButton>
    )

    buttons.push(
        <WatchButton
            key={"watch-tmdb"}
            href={`${URL_pageTMDB}${options.tmdbid}`}
        >
            <div>TMDb</div>
        </WatchButton>
    )

    return (
        <div className={"watch-button-group"}>
            {buttons}
        </div>
    )
}

export default WatchButtons