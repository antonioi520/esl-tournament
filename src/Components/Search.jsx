import React, {useState, useEffect} from 'react';
import SearchResult from "./SearchResult";
import {useDispatch, useSelector} from 'react-redux'
import {getTournament, getTournamentResults, getTournamentContestants} from '../redux/actions/actions'

const Search = () => {

    //Initial redux state hooks
    const dispatch = useDispatch();
    const tournamentInfo = useSelector(state => state.tournamentInfo);
    const {loading, error, tournaments, results, contestants} = tournamentInfo;

    //Initial state hooks
    const [search, setSearch] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(search, 500);

    //Update results with new search request
    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);
            //searchCharacters(debouncedSearchTerm);
            dispatch(getTournament(debouncedSearchTerm));
            dispatch(getTournamentResults(debouncedSearchTerm));
            dispatch(getTournamentContestants(debouncedSearchTerm));
        }
        else{
            setIsSearching(false);
        }
    }, [debouncedSearchTerm]);


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
            {Object.keys(tournaments).length > 0 ? (<SearchResult tournament={tournaments} results={results} contestants={contestants}   />) : null}

        </div>
    );
}
export default Search
