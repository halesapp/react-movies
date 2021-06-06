import React, {useState, useEffect} from "react";
import MoviePoster from "./MoviePoster";

function App() {
    const [db, setDb] = useState({})
    const [list, setList] = useState([])
    const [inputOptions, setInputOptions] = useState([])
    const [posters, setPosters] = useState([])
    const [posterIsVisible, setPosterIsVisible] = useState([])
    const [buttons, setButtons] = useState([])

    useEffect(() => {
        fetch('mvdb.json')
            .then(res => {
                return res.json()
            })
            .then(res => {
                setDb(res)
                setList(Object.keys(res))
                console.log('passed here')
            })
    }, [])

    useEffect(() => {
        setPosterIsVisible(Array(list.length).fill(true))
        // setInputOptions(list.map(
        //     movie => {
        //         return <option>{movie}</option>
        //     }
        // ))
    }, [list])

    useEffect(() => {
        setPosters(list.map(
            (movie, index) => {
                return <MoviePoster key={index} src={db[movie].poster} visible={posterIsVisible[index]}/>
            }))
    }, [posterIsVisible])

    const onSearchInputChange = function (event) {
        if (event.target.value === "") {
            setPosterIsVisible(Array(list.length).fill(true))
            return
        }
        const regexString = RegExp(`.{0,}(${event.target.value}).{0,}`, "i")
        setPosterIsVisible(list.map(item => regexString.test(item)))
    }

    return (
        <div className="app">
            <div className="search-bar">
                <h2>Hales Movie Archive</h2>

                {/*<datalist id="search-options">*/}
                {/*    {inputOptions}*/}
                {/*</datalist>*/}
                <input id="search-box" type="text" list="search-options" placeholder="Search Movies" onChange={onSearchInputChange}/>

                <div className="buttons-container">
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

export default App;
