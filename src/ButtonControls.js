import React from "react";

import "./ButtonControls.css"

import {URL_pageGoogle, URL_searchGoogle, URL_searchFandango, URL_searchIMDB, URL_pageTMDB} from "./urls";
import {GooglePlayLogo, FandangoLogo, DiscIcon, IMDBLogo} from "./LogoSVG"


const WatchButton = function (props) {
    if (!props.shown && props.shown !== undefined) return null
    return (
        <a href={props.href} target={"_blank"} rel={"noopener noreferrer"}>
            <button className={"button-control"}>{props.children}</button>
        </a>
    )
}

const ButtonControls = function (props) {
    const SearchControls =
        <div className={"button-group"}>
            <button key={1} className={"button-control"} onClick={props.chooseRandom}><div>Random</div></button>
            <button key={2} className={"button-control"} onClick={() => props.setSearchTitle("")}><div>Clear</div></button>
            <button key={3} className={"button-control"} onClick={() => {
                props.viewMode === "gallery" ? props.setViewMode("table") : props.setViewMode("gallery")
            }}><div>View {props.viewMode === "gallery" ? "Table" : "Posters"}</div></button>
        </div>

    let WatchControls = null
    if (props.movie !== "" && props.db[props.movie] !== undefined) {
        const options = props.db[props.movie]
        const gUrl = options.gid ? `${URL_pageGoogle}${options.gid}` : `${URL_searchGoogle}${props.movie}`
        const fUrl = `${URL_searchFandango}${props.movie}`
        const iUrl = `${URL_searchIMDB}${props.movie}`
        const tUrl = `${URL_pageTMDB}${options.tmdbid}`
        WatchControls =
            <div className={"button-group"}>
                <WatchButton key={"w1"} href={gUrl} shown={Boolean(options.onGoogle)}>
                    <GooglePlayLogo/>
                    <div>Google</div>
                </WatchButton>
                <WatchButton key={"w2"} href={fUrl} shown={Boolean(options.onFandango)}>
                    <FandangoLogo/>
                    <div>Fandango</div>
                </WatchButton>
                <WatchButton key={"w3"} href={"#"}  shown={Boolean(options.file)}>
                    <div>Digital File</div>
                </WatchButton>
                <WatchButton key={"w4"} shown={Boolean(options.disc)}>
                    <DiscIcon/>
                    <div>Disc</div>
                </WatchButton>
                <WatchButton key={"w5"} href={iUrl}>
                    <IMDBLogo/>
                    <div>IMDb</div>
                </WatchButton>
                <WatchButton key={"w6"} href={tUrl}>
                    <div>TMDb</div>
                </WatchButton>
            </div>
    }

    return (
        <div className={"button-controls-container"}>
            {SearchControls}
            {WatchControls}
        </div>
    )
}

export default ButtonControls