import React, {useState, useEffect} from "react";

import MoviePoster from "./MoviePoster";
import TitleSearch from "./TitleSearch"
import TimeSearch from "./TimeSearch";

import {URL_dbJSON} from "./urls";

import './MovieApp.css';


function MovieApp() {
    const [db, setDb] = useState({})
    const [titlesList, setTitlesList] = useState([])
    const [timesList, setTimesList] = useState([])

    const [posters, setPosters] = useState([])
    const [posterIsVisible, setPosterIsVisible] = useState([])

    const [searchTime, setSearchTime] = useState(0)
    const [searchTitle, setSearchTitle] = useState("")
    const [buttons, setButtons] = useState([])

    useEffect(() => {
        fetch(URL_dbJSON)
            .then(res => {
                return res.json()
            })
            .then(res => {
                setDb(res)
                setTitlesList(Object.keys(res))
            })
    }, [])

    useEffect(() => {
        setPosterIsVisible(Array(titlesList.length).fill(true))

        setTimesList(titlesList.map(item => {
            return Number(db[item].time)
        }))
    }, [titlesList])
    useEffect(() => {
        setPosters(titlesList.map(
            (movie, index) => {
                return <MoviePoster key={index} src={db[movie].poster} visible={posterIsVisible[index]}/>
            }))
        setButtons(() => {
            return [
                <button key={"btn-ctrl-1"} className={"button-control"} onClick={clickRandom}>Random</button>,
                <button key={"btn-ctrl-2"} className={"button-control"}>Advanced Search</button>
            ]
        })
    }, [posterIsVisible])

    useEffect(() => {
        if (searchTitle === "") {
            setPosterIsVisible(Array(titlesList.length).fill(true))
            return
        }
        const titleMatches = searchByTitle(searchTitle)
        const timeMatches = searchByTime(searchTime)
        setPosterIsVisible(titleMatches.map((item, index) => {
            return item && timeMatches[index]
        }))
    }, [searchTitle, searchTime])

    useEffect(() => {

    }, [timesList])

    const searchByTitle = function (searchStr) {
        // `.replace` on searchStr encodes regex special characters with backslashes
        // https://stackoverflow.com/questions/874709/converting-user-input-string-to-regular-expression
        const regexString = RegExp(`.*(${searchStr.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')}).*`, "i")
        return titlesList.map(item => regexString.test(item))
    }

    const searchByTime = function (maxTime) {
        // return timesList.map(time => {return time < searchTime})
        return timesList.map(time => {return time < maxTime})
    }

    const clickRandom = function (event) {
        setSearchTitle(titlesList[Math.floor(Math.random() * titlesList.length)])
    }

    return (
        <div className="app">
            <div className="controls-bar">
                <h2>Hales Movie Archive</h2>

                <TitleSearch list={titlesList} value={searchTitle} set={setSearchTitle}/>
                <TimeSearch list={timesList} value={searchTime} set={setSearchTime} />

                <div className="button-controls">
                    {buttons}
                </div>
            </div>

            <div className="gallery">
                <div className="posters-container">
                    {posters}
                </div>
            </div>
        </div>
    );
}

export default MovieApp;
