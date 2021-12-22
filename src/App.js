import React, {useState, useEffect, lazy, Suspense} from "react";

import './App.css';

import LoadingScreen from "./LoadingScreen"

const TitleSearch = lazy(() => import('./TitleSearch'))
const TimeSearch = lazy(() => import('./TimeSearch'))
const ButtonControls = lazy(() => import('./ButtonControls'))
const Gallery = lazy(() => import('./Gallery'))
const OptionsModal = lazy(() => import('./OptionsModal'))

const CSV_DB_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSWb4mFDqo7FZkh5ov5juVw8i06_BRmJ9RdSBn5NFSlAzj_QoMW9f_W-NBvOmOTSk2SMxKLugIvuk44/pub?gid=0&single=true&output=csv"
const localStorageItem = "halesMovieDB"
const _10daysInMilliseconds = 864000000

const shuffle = (arr, mixes = 15, recurse = true) => {
    let a = arr.slice(0)
    // cut the deck
    const midPoint = Math.floor(a.length / 2)
    a = a.slice(midPoint).concat(a.slice(0, midPoint))
    // mix the deck
    let mixNum = 0
    while (mixNum < mixes) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        mixNum = mixNum + 1
    }
    return recurse ? shuffle(a, mixes,false) : a
}

const csvStringToJSON = (csvString) => {
    let newDB = {}
    const arrayData = csvString.split('\r\n')
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
        rowData.slice(1).forEach((value, index) => newDB[movie][labels[index + 1]] = value)
    })
    return newDB
}

const App = () => {
    // core state
    const [db, setDb] = useState(null)
    const [titlesList, setTitlesList] = useState([])
    const [randomList, setRandomList] = useState([])
    const [timesList, setTimesList] = useState([])

    // search/filter parameters
    const [movieMatches, setMovieMatches] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchTime, setSearchTime] = useState(0)

    // toggle optional display parameters
    const [excludeDisc, setExcludeDisc] = useState(false)
    const [imgHighRes, setImgHighRes] = useState(false)
    const [animateSearch, setAnimateSearch] = useState(false)
    const [alphabetize, setAlphabetize] = useState(false)

    // modal visibility
    const [modalVisible, setModalVisible] = useState(false)

    const fetchDataBase = (overwrite = false) => {
        // set DB to null to trigger loading screen
        setDb(null)
        setSearchTitle("")
        // check if there is a cached database
        if (!overwrite) {
            const cachedDB = JSON.parse(localStorage.getItem(localStorageItem))
            if (cachedDB !== null && Date.now() - cachedDB._UPDATED < _10daysInMilliseconds) {
                    delete cachedDB._UPDATED
                    setDb(cachedDB)
                    return
            }
        }
        // otherwise fetch the new database
        fetch(CSV_DB_URL)
          .then(res => res.text())
          .then(csvData => {
              const newDB = csvStringToJSON(csvData)
              setDb(JSON.parse(JSON.stringify(newDB)))
              newDB["_UPDATED"] = Date.now()
              localStorage.setItem(localStorageItem, JSON.stringify(newDB))
          })
          .catch(() => alert("Unable to retrieve Movie Database"))
    }

    useEffect(() => {
        document.onkeydown = (evt) => {if (evt.key === "Escape") setModalVisible(false)}
        fetchDataBase()
    }, [])

    useEffect(() => {
        if (db === null) return

        let titles = Object.keys(db).slice(0)
        if (!alphabetize) titles = shuffle(titles)
        if (excludeDisc) titles = titles.filter(a => !Boolean(db[a].disc && !db[a].onGoogle && !db[a].onVudu))

        setTitlesList(titles)
        setRandomList(shuffle(shuffle(titles)))
        setSearchTitle("")
        setTimesList(titles.map(item => Number(db[item].time)))
        setMovieMatches(Array(titles.length).fill(true))
    }, [db, alphabetize, excludeDisc])

    useEffect(() => {
        if (movieMatches.length === 0) return
        let titleMatches = filterByTitle(searchTitle)
        const timeMatches = filterByTime(searchTime)
        setMovieMatches(titleMatches.map((item, index) => item && timeMatches[index]))
        // eslint-disable-next-line
    }, [searchTitle, searchTime])

    const filterByTitle = (searchStr) => {
        // `.replace` on searchStr encodes regex special characters with backslashes
        // https://stackoverflow.com/questions/874709/converting-user-input-string-to-regular-expression
        if (searchStr === "") return Array(titlesList.length).fill(true)
        const regexString = RegExp(`.*(${searchStr.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')}).*`, "i")
        return titlesList.map(item => regexString.test(item))
    }

    const togModal = () => setModalVisible(prevState => !prevState)
    const togExclDisc = () => setExcludeDisc(prevState => !prevState)
    const togImgRes = () => setImgHighRes(prevState => !prevState)
    const togAnimate = () => setAnimateSearch(prevState => !prevState)
    const togAlphabetize = () => setAlphabetize(prevState => !prevState)
    const filterByTime = (maxTime) => timesList.map(time => time <= maxTime)
    const chooseRandom = (a) => setSearchTitle(a[Math.round(Math.random() * a.length)])

    const randomButton = () => {
        const newMix = shuffle(shuffle(randomList))
        setRandomList(newMix)
        chooseRandom(newMix)
    }

    if (db === null || titlesList.length === 0) return <LoadingScreen message={"Loading database..."}/>
    return (
      <Suspense fallback={<LoadingScreen message={"Loading display..."}/>}>
          <div className="app">
              <div className="controls-bar">
                  <h2>Hales Movie Library</h2>
                  <TitleSearch list={titlesList} value={searchTitle} set={setSearchTitle} count={movieMatches.filter(Boolean).length}/>
                  <TimeSearch list={timesList} value={searchTime} set={setSearchTime}/>
                  <ButtonControls movie={searchTitle} db={db} random={randomButton} toggleModal={togModal} setSearchTitle={setSearchTitle}/>
              </div>
              <Gallery imgHighRes={imgHighRes}
                       titlesList={titlesList}
                       animateSearch={animateSearch}
                       db={db}
                       postersVisible={movieMatches}
                       setSearchTitle={setSearchTitle}/> :
              <OptionsModal visible={modalVisible}
                            toggleModal={togModal}
                            togExclDisc={togExclDisc}
                            filterDisc={excludeDisc}
                            togAnimate={togAnimate}
                            animateSearch={animateSearch}
                            togAlphabetize={togAlphabetize}
                            alphabetize={alphabetize}
                            togImgRes={togImgRes}
                            imgHighRes={imgHighRes}
                            fetchDB={fetchDataBase}/>
          </div>
      </Suspense>
    )
}

export default App;
