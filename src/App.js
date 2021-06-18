import React, {useState, useEffect, lazy, Suspense} from "react";

import './App.css';

import LoadingScreen from "./LoadingScreen"

const TitleSearch = lazy(() => import('./TitleSearch'))
const TimeSearch = lazy(() => import('./TimeSearch'))
const ButtonControls = lazy(() => import('./ButtonControls'))
const Gallery = lazy(() => import('./Gallery'))
const TableView = lazy(() => import('./TableView'))
const OptionsButton = lazy(() => import('./OptionsButton'))
const OptionsModal = lazy(() => import('./OptionsModal'))

const URL_dbJSON = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWb4mFDqo7FZkh5ov5juVw8i06_BRmJ9RdSBn5NFSlAzj_QoMW9f_W-NBvOmOTSk2SMxKLugIvuk44/pub?gid=0&single=true&output=csv"
const localStorageItem = "halesMovieDB"
const _24hours = 86400000

const App = function () {
    const [db, setDb] = useState(null)
    const [titlesList, setTitlesList] = useState([])
    const [timesList, setTimesList] = useState([])
    const [discOnlyList, setDiscOnlyList] = useState(null)

    const [movieMatches, setMovieMatches] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchTime, setSearchTime] = useState(0)
    const [excludeDisc, setExcludeDisc] = useState(false)
    const [imgHighRes, setImgHighRes] = useState(false)

    const [modalVisible, setModalVisible] = useState(false)
    const [viewMode, setViewMode] = useState("gallery")

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
            if ((Date.now() - cachedDB._UPDATED) < _24hours) {
                delete cachedDB._UPDATED
                setDb(cachedDB)
                return
            }
        }
        fetchDataBase()
    }, [])

    useEffect(() => {
        if (db === null) return
        const dbToCache = JSON.parse(JSON.stringify(db))
        dbToCache["_UPDATED"] = Date.now()
        localStorage.setItem(localStorageItem, JSON.stringify(dbToCache))
        setTitlesList(Object.keys(db))
    }, [db])

    useEffect(() => {
        if (titlesList.length === 0) return
        setMovieMatches(Array(titlesList.length).fill(true))
        setTimesList(titlesList.map(item => {
            return Number(db[item].time)
        }))
        setDiscOnlyList(titlesList.map(title => {
            return Boolean(db[title].disc && !db[title].onGoogle && !db[title].onFandango)
        }))
    }, [titlesList])

    useEffect(() => {
        if (movieMatches.length === 0) return
        let titleMatches
        if (searchTitle === "") {
            titleMatches = Array(titlesList.length).fill(true)
        } else {
            titleMatches = searchByTitle(searchTitle)
        }
        const timeMatches = searchByTime(searchTime)

        setMovieMatches(titleMatches.map((item, index) => {
            return item && timeMatches[index] && (excludeDisc ? !discOnlyList[index] : true)
        }))
    }, [searchTitle, searchTime, excludeDisc])

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

    const chooseRandom = function () {
        setSearchTitle(titlesList[Math.round(Math.random() * titlesList.length)])
    }

    const toggleModal = function () {
        setModalVisible(prevState => {return !prevState})
    }

    const toggleExcludeDisc = function () {
        setExcludeDisc(prevState => {return !prevState})
    }

    const toggleImgRes = function () {
        setImgHighRes(prevState => {return!prevState})
    }

    const downloadDB = function () {
        let link = document.createElement('a');
        link.setAttribute('href', encodeURI(`data:application/json;charset=utf-8,${JSON.stringify(db)}`));
        link.setAttribute('target', '_blank');
        link.setAttribute('download', 'hales-movie-database.json');
        link.click();
        link.remove()
    }

    if (db === null || titlesList.length === 0) return <LoadingScreen message={"Loading database..."}/>
    return (
        <Suspense fallback={<LoadingScreen message={"Loading display..."}/>}>
            <div className="app">
                <div className="controls-bar">
                    <h2>Hales Movie Database</h2>
                    <OptionsButton toggleModal={toggleModal}/>
                    <TitleSearch list={titlesList} value={searchTitle} set={setSearchTitle} count={movieMatches.filter(Boolean).length}/>
                    <TimeSearch list={timesList} value={searchTime} set={setSearchTime}/>
                    <ButtonControls movie={searchTitle} db={db} chooseRandom={chooseRandom} setSearchTitle={setSearchTitle} viewMode={viewMode} setViewMode={setViewMode}/>
                </div>
                {viewMode === "gallery" ?
                    <Gallery imgHighRes={imgHighRes} titlesList={titlesList} db={db} postersVisible={movieMatches} setSearchTitle={setSearchTitle}/> :
                    <TableView titlesList={titlesList} db={db} postersVisible={movieMatches} setSearchTitle={setSearchTitle}/>}
                <OptionsModal visible={modalVisible}
                              toggleModal={toggleModal}
                              toggleDisc={toggleExcludeDisc}
                              filterDisc={excludeDisc}
                              toggleImgRes={toggleImgRes}
                              imgHighRes={imgHighRes}
                              localItem={localStorageItem}
                              fetchDB={fetchDataBase}
                              downloadDB={downloadDB} />
            </div>
        </Suspense>
    )
}

export default App;
