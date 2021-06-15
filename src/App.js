import React, {useState, useEffect} from "react";

import LoadingScreen from "./LoadingScreen"
import OptionsModal from "./OptionsModal"
import TitleSearch from "./TitleSearch";
import TimeSearch from "./TimeSearch";
import SearchButtons from "./SearchButtons";
import Gallery from "./Gallery"

import './App.css';
import WatchButtons from "./WatchButtons";

const URL_dbJSON = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWb4mFDqo7FZkh5ov5juVw8i06_BRmJ9RdSBn5NFSlAzj_QoMW9f_W-NBvOmOTSk2SMxKLugIvuk44/pub?gid=0&single=true&output=csv"

const App = function () {
    const [db, setDb] = useState(null)
    const [titlesList, setTitlesList] = useState([])
    const [timesList, setTimesList] = useState([])

    const [postersVisible, setPostersVisible] = useState([])
    const [searchTime, setSearchTime] = useState(0)
    const [searchTitle, setSearchTitle] = useState("")

    const [modalVisible, setModalVisible] = useState(false)
    const [viewMode, setViewMode] = useState("gallery")

    const localStorageItem = "halesMovieDB"

    const fetchDataBase = function () {
        setDb(null)
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
                    // csv values which contain commas are wrapped in quotes
                    if (RegExp('"').test(row)) {
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
                delete cachedDB._UPDATED
                setDb(cachedDB)
                return
            }
        }
        fetchDataBase()
    }, [])

    useEffect(() => {
        if (db === null) return
        setTitlesList(Object.keys(db))
        const dbToCache = JSON.parse(JSON.stringify(db))
        dbToCache["_UPDATED"] = Date.now()
        localStorage.setItem(localStorageItem, JSON.stringify(dbToCache))
    }, [db])

    useEffect(() => {
        if (titlesList.length === 0) return
        setPostersVisible(Array(titlesList.length).fill(true))
        setTimesList(titlesList.map(item => {
            return Number(db[item].time)
        }))
    }, [titlesList])

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

    const searchByTitle = function (searchStr) {
        // `.replace` on searchStr encodes regex special characters with backslashes
        // https://stackoverflow.com/questions/874709/converting-user-input-string-to-regular-expression
        const regexString = RegExp(`.*(${searchStr.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')}).*`, "i")
        return titlesList.map(item => regexString.test(item))
    }

    const searchByTime = function (maxTime) {
        return timesList.map(time => {
            return time <= maxTime
        })
    }

    const clickRandom = function (event) {
        setSearchTitle(titlesList[Math.floor(Math.random() * titlesList.length)])
    }

    const toggleModal = function () {
        setModalVisible(prevState => {
            return !prevState
        })
    }

    const downloadDB = function () {
        let link = document.createElement('a');
        link.setAttribute('href', encodeURI(`data:application/json;charset=utf-8,${JSON.stringify(db)}`));
        link.setAttribute('target', '_blank');
        link.setAttribute('download', 'hales-movie-database.json');
        link.click();
        link.remove()
    }

    return db === null ? <LoadingScreen /> : (
        <div className="app">
            <div className="controls-bar">
                <h2>Hales Movie Database</h2>
                <TitleSearch list={titlesList} value={searchTitle} set={setSearchTitle} count={postersVisible.filter(Boolean).length}/>
                <TimeSearch list={timesList} value={searchTime} set={setSearchTime}/>
                <div className={"buttons-container"}>
                    <SearchButtons clickRandom={clickRandom} setSearchTitle={setSearchTitle} toggleModal={toggleModal}/>
                    <WatchButtons movie={searchTitle} db={db}/>
                </div>
            </div>
            {viewMode === "gallery" ? <Gallery titlesList={titlesList} db={db} postersVisible={postersVisible} setSearchTitle={setSearchTitle}/> : null}
            {viewMode === "table" ? null : null}
            {viewMode === "gsheet" ? <iframe className={"gsheet-embed"}
                                             src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSWb4mFDqo7FZkh5ov5juVw8i06_BRmJ9RdSBn5NFSlAzj_QoMW9f_W-NBvOmOTSk2SMxKLugIvuk44/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false" /> : null}
            <OptionsModal visible={modalVisible}
                          toggleModal={toggleModal}
                          localItem={localStorageItem}
                          fetchDB={fetchDataBase}
                          downloadDB={downloadDB}
                          viewMode={viewMode}
                          setViewMode={setViewMode}/>
        </div>

    );
}

export default App;
