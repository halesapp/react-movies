import React, {useState, useEffect} from "react";
import MoviePoster from "./MoviePoster";
import {URL_dbJSON} from "./urls";

function MovieApp() {
    const [db, setDb] = useState({})
    const [titlesList, setTitlesList] = useState([])

    const [posters, setPosters] = useState([])
    const [posterIsVisible, setPosterIsVisible] = useState([])

    const [timesList, setTimesList] = useState([])
    const [timeFilterValue, setTimeFilterValue] = useState(0)

    const [searchBarValue, setSearchBarValue] = useState("")
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
            return db[item].time
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
        if (searchBarValue === "") {
            setPosterIsVisible(Array(titlesList.length).fill(true))
            return
        }
        const titleMatches = searchByTitle(searchBarValue)
        const timeMatches = searchByTime()
        setPosterIsVisible(titleMatches.map((item, index) => {
            return item && timeMatches[index]
        }))
    }, [searchBarValue, timeFilterValue])

    const searchByTitle = function (searchStr) {
        // `.replace` on searchStr encodes regex special characters with backslashes
        // https://stackoverflow.com/questions/874709/converting-user-input-string-to-regular-expression
        const regexString = RegExp(`.*(${searchStr.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')}).*`, "i")
        return titlesList.map(item => regexString.test(item))
    }

    const searchByTime = function () {
        // return timesList.map(time => {return time < timeFilterValue})
        return timesList.map(time => {return time < timeFilterValue})
    }

    const clickRandom = function (event) {
        setSearchBarValue(titlesList[Math.floor(Math.random() * titlesList.length)])
    }

    return (
        <div className="app">
            <div className="controls-bar">
                <h2>Hales Movie Archive</h2>

                <input id="search-box" type="text" placeholder={`Search ${titlesList.length} Movies`}
                       onChange={event => {setSearchBarValue(event.target.value)}} value={searchBarValue}/>
                <label>{timeFilterValue}, {Math.max(...timesList)}</label>
                <input id={"time-slider"} type={"range"} min={0} max={Math.max(...timesList)}
                       onChange={event => {setTimeFilterValue(event.target.value)}} value={timeFilterValue}/>

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
