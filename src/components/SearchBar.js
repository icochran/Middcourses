import {useState} from "react"

export default function SearchBar({searchByCallback}) {
    const [searchBarText, setSearchBarText] = useState();
    
    return(
        <div>
            <input 
                type = "text" 
                value = {searchBarText}
                id = "searchBar"
                placeholder = "Search"
                onChange = {(e) => {
                    setSearchBarText(e.target.value);
                }}
            /> 
            <button 
                type = "button" 
                disabled = {(searchBarText === undefined ? true : false)}
                onClick = {() => searchByCallback(searchBarText)}
            >Search</button>
            <button 
                type = "button" 
                onClick = {() => {
                    setSearchBarText();
                    searchByCallback();
                }}
            >Clear</button>
        </div>
    );
}