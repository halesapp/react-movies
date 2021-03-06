import {useEffect} from "react";

import "./TimeSearch.css"

const TimeSearch = (props) => {
    const interval = 10
    const maxTime = Math.ceil((Math.max(...props.list) + 1) / 10) * 10

    useEffect(() => {
        props.set(maxTime)
        // eslint-disable-next-line
    }, [props.list])

    return (
      <div className={"time-search-box"}>
          <p>Time:</p>
          <input className={"time-search-input"} type={"range"} min={interval} max={maxTime} step={interval} aria-label={"filter by runtime"}
                 onChange={event => {props.set(event.target.value)}} value={props.value}/>
          <p>{props.value === Infinity ? "" : props.value} min</p>
      </div>)
}

export default TimeSearch