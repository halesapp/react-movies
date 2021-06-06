import React, {useState, useEffect} from "react";
import MoviePoster from "./MoviePoster";
import {URL_dbJSON} from "./urls";

function MovieApp() {
    const [db, setDb] = useState({})
    const [list, setList] = useState([])
    const [posters, setPosters] = useState([])
    const [posterIsVisible, setPosterIsVisible] = useState([])
    const [buttons, setButtons] = useState([])
    const [searchBarValue, setSearchBarValue] = useState("")

    useEffect(() => {
        fetch(URL_dbJSON)
            .then(res => {
                return res.json()
            })
            .then(res => {
                setDb(res)
                setList(Object.keys(res))
                setButtons(() => {
                    return [
                        <button key={"btn-ctrl-1"} className={"button-control"} onClick={clickRandom}>Random</button>,
                        <button key={"btn-ctrl-2"} className={"button-control"}>Advanced Search</button>
                    ]
                })
            })
    }, [])

    useEffect(() => {
        setPosterIsVisible(Array(list.length).fill(true))
    }, [list])

    useEffect(() => {
        setPosters(list.map(
            (movie, index) => {
                return <MoviePoster key={index} src={db[movie].poster} visible={posterIsVisible[index]}/>
            }))
    }, [posterIsVisible])

    useEffect(() => {
        if (searchBarValue === "") {
            setPosterIsVisible(Array(list.length).fill(true))
            return
        }
        // `.replace` on searchBarValue encodes regex special characters with backslashes
        // https://stackoverflow.com/questions/874709/converting-user-input-string-to-regular-expression
        const regexString = RegExp(`.*(${searchBarValue.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')}).*`, "i")
        setPosterIsVisible(list.map(item => regexString.test(item)))
    }, [searchBarValue])

    const clickRandom = function (event) {
        setSearchBarValue(list[Math.floor(Math.random() * list.length)])
    }

    return (
        <div className="app">
            <div className="controls-bar">
                <h2>Hales Movie Archive</h2>

                <input id="search-box" type="text" placeholder={`Search ${list.length} Movies`}
                       onChange={event => {
                           setSearchBarValue(event.target.value)
                       }} value={searchBarValue}/>

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
