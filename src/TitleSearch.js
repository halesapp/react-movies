import "./TitleSearch.css"

const TitleSearch = function (props) {
    return (
        <input className={"title-search-box"} type="text" placeholder={`Search ${props.list.length} Movies`}
               onChange={event => {props.set(event.target.value)}} value={props.value}/>
    )
}

export default TitleSearch