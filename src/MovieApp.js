import React, {useState, useEffect} from "react";

import ControlsModal from "./ControlsModal"
import TitleSearch from "./TitleSearch";
import TimeSearch from "./TimeSearch";
import SearchButtons from "./SearchButtons";
import MoviePoster from "./MoviePoster";

import {URL_dbJSON} from "./urls";

import './MovieApp.css';
import WatchButtons from "./WatchButtons";


function MovieApp() {
    const [db, setDb] = useState({})
    const [titlesList, setTitlesList] = useState([])
    const [timesList, setTimesList] = useState([])

    const [posters, setPosters] = useState([])
    const [postersVisible, setPostersVisible] = useState([])

    const [searchTime, setSearchTime] = useState(0)
    const [searchTitle, setSearchTitle] = useState("")

    const [modalVisible, setModalVisible] = useState(false)

    const localStorageItem = "halesMovieDB"

    const fetchDataBase = function () {
        fetch(URL_dbJSON)
            .then(res => {
                return res.text()
            })
            .then(csvData => {
                let newDB = {}
                const arrayData = csvData.split('\r\n')
                const labels = arrayData[0].split(",")
                arrayData.slice(1).forEach(row => {
                    let movie
                    let rowData
                    if (RegExp('\"').test(row)) {
                        const splitData = RegExp('\\"(.*)\\"').exec(row)
                        movie = splitData[1]
                        rowData = row.replace(splitData[0], "").split(",")
                    } else {
                        rowData = row.split(",")
                        movie = rowData[0]
                    }
                    newDB[movie] = {}
                    rowData.slice(1).forEach((value, index) => {
                        newDB[movie][labels[index + 1]] = value
                    })
                })
                setDb(newDB)
            })
    }

    useEffect(() => {
        const cachedDB = JSON.parse(localStorage.getItem(localStorageItem))
        if (cachedDB !== null) {
            // if ((Date.now() - cachedDB._UPDATED) < 86400000) {
            if ((Date.now() - cachedDB._UPDATED) < 15) {
                console.log("using cached db")
                delete cachedDB._UPDATED
                setDb(cachedDB)
                return
            }
        }
        fetchDataBase()
    }, [])

    useEffect(() => {
        setTitlesList(Object.keys(db))
        const dbToCache = JSON.parse(JSON.stringify(db))
        dbToCache["_UPDATED"] = Date.now()
        localStorage.setItem(localStorageItem, JSON.stringify(dbToCache))
    }, [db])

    useEffect(() => {
        setPostersVisible(Array(titlesList.length).fill(true))
        setTimesList(titlesList.map(item => {
            return Number(db[item].time)
        }))
    }, [titlesList])
    useEffect(() => {
        setPosters(titlesList.map(
            (movie, index) => {
                return <MoviePoster key={index} src={db[movie].poster} visible={postersVisible[index]} title={movie}
                                    click={setSearchTitle}/>
            }))
    }, [postersVisible])

    useEffect(() => {
        let titleMatches
        if (searchTitle === "") {
            titleMatches = Array(titlesList.length).fill(true)
        } else {
            titleMatches = searchByTitle(searchTitle)
        }
        const timeMatches = searchByTime(searchTime)
        setPostersVisible(titleMatches.map((item, index) => {
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
        return timesList.map(time => {return time <= maxTime})
    }

    const clickRandom = function (event) {
        setSearchTitle(titlesList[Math.floor(Math.random() * titlesList.length)])
    }

    const toggleModal = function () {
        setModalVisible(prevState => {
            return !prevState
        })
    }

    return (
        <div className="app">
            <ControlsModal visible={modalVisible} toggleModal={toggleModal} localItem={localStorageItem} fetchDB={fetchDataBase}/>

            <div className="controls-bar">
                <h2>Hales Movie Database</h2>
                <TitleSearch list={titlesList} value={searchTitle} set={setSearchTitle}
                             count={postersVisible.filter(Boolean).length}/>
                <TimeSearch list={timesList} value={searchTime} set={setSearchTime}/>
                <div className={"buttons-container"}>
                    <SearchButtons clickRandom={clickRandom} setSearchTitle={setSearchTitle} toggleModal={toggleModal}/>
                    <WatchButtons movie={searchTitle} db={db}/>
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
