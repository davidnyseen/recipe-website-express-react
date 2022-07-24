import { useState, useEffect } from 'react'
import './search.css'
import { useDispatch, useSelector } from "react-redux";
import { searchValue } from "../../store/searchReducer";

function Search() {
    const { value } = useSelector((state) => state.searchReducer);
    const dispatch = useDispatch();
    const [searchResult, setSearchResult] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(searchValue(searchResult))
    }

    return (
        <div className="search-box">
            <form className="search-form" onSubmit={handleClick} >
                <button className="btn-search"><i className="fas fa-search"></i></button>
                <input type="text" className="input-search" placeholder="Type to Search..." value={searchResult}
                    onChange={(e) => setSearchResult(e.target.value)}></input>
            </form>
            <div className="search-title">
                <h1>Delicious recipes.</h1>
                <h1>Share yours.</h1>
            </div>
        </div>
    );
}
export default Search;
