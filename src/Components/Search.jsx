import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import SearchResult from "./SearchResult";

const Search = () => {
    //API Info
    const apiUrl = 'https://api.eslgaming.com/play/v1/leagues';

    //Initial state hooks
    const[search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState({});
    const debouncedSearchTerm = useDebounce(search, 500);

    //Update results with new search request
    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);
            searchCharacters(debouncedSearchTerm);
        }
        else{
            setIsSearching(false);
        }
    }, [debouncedSearchTerm]);

    // API search function
    function searchCharacters(search) {
        axios.get(`${apiUrl}/${search}`)
            .then(res => setResults(res.data))
            .catch(err => console.log(err))
    }

    // Hook
    function useDebounce(value, delay) {
        // State and setters for debounced value
        const [debouncedValue, setDebouncedValue] = useState(value);
        useEffect(
            () => {
                // Update debounced value after delay
                const handler = setTimeout(() => {
                    setDebouncedValue(value);
                }, delay);
                // Cancel the timeout if value changes (also on delay change or unmount)
                // This is how we prevent debounced value from updating if value is changed ...
                // .. within the delay period. Timeout gets cleared and restarted.
                return () => {
                    clearTimeout(handler);
                };
            },
            [value, delay] // Only re-call effect if value or delay changes
        );
        return debouncedValue;
    }

    //Update search value
    const handleChange = event => {
        if (event.target.value === ''){
            setSearch('');
            setResults([])
        }
        else{
            setSearch(event.target.value)
        }
    }

    return (
        <div>
            <form action="/" method="get">
                <label htmlFor="header-search">
                    <span className="visually-hidden">Search</span>
                </label>
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search"
                    value={search}
                    onChange={handleChange}
                />
                <button type="submit">Search</button>
            </form>
            {/*If there are results, display ImageResult component, otherwise do not display*/}
            {Object.keys(results).length > 0 ? (<SearchResult results={results}   />) : null}

        </div>
    );
}
export default Search
