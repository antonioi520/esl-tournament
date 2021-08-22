import React, {useState, useEffect} from 'react';
import SearchResult from "./SearchResult";
import {useDispatch, useSelector} from 'react-redux'
import {getTournament, getTournamentResults, getTournamentContestants} from '../redux/actions/actions'


const Search = () => {

    //Initial redux state hooks
    const dispatch = useDispatch();
    const tournamentInfo = useSelector(state => state.tournamentInfo);
    const {tournaments, results, contestants} = tournamentInfo;

    //Initial state hooks
    const [inputSearch, setInputSearch] = useState('');
    const [tournamentId, setTournamentid] = useState('');
    const [isSearching, setIsSearching] = useState(false);
   // const debouncedSearchTerm = useDebounce(tournamentId, 100);

    //Update results with new search request
    useEffect(() => {
        if (tournamentId) {
            setIsSearching(false);
            dispatch(getTournament(tournamentId));
            dispatch(getTournamentResults(tournamentId));
            dispatch(getTournamentContestants(tournamentId));

        }
        else{
            setIsSearching(false);
        }
        console.log(tournamentId);
    }, [dispatch, tournamentId]);

    // Debounce Hook
    /*function useDebounce(value, delay) {
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
    }*/

    //Update search value
    const handleChange = event => {
        if (event.target.value === ''){
            setInputSearch('');
        }
        else{
            setInputSearch(event.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputSearch === ''){
            setTournamentid('');
            setIsSearching(false);
        }
        else if(tournamentId === inputSearch){
            setIsSearching(false);
        }
        else{
            setTournamentid(inputSearch)
            setIsSearching(true);
        }

    }


    return (
        <div>
            <form action="/" method="get">
                <div className="searchContainer">
                <label htmlFor="header-search">
                    <h2 className="searchHeader"><span className="visually-hidden">ESL Tournament ID Search</span></h2>
                </label>
                <input
                    type="number"
                    className="searchBar"
                    placeholder="177160, 177161, 185553..."
                    value={inputSearch}
                    onChange={handleChange}
                />
                <button className="searchButton" type="submit" onClick={(e) => handleSubmit(e)}>Search</button>
                </div>
            </form>
            {/*Show text when loading - removed for now as loads were instant so gave jarring effect */}
            {/*{isSearching ? <div style={{textAlign: "center"}}>Loading...</div> : null}*/}

            {/*If there are results, display SearchResult component, otherwise do not display*/}
            {tournaments === undefined ? (<div style={{textAlign: 'center'}}>Unknown Tournament</div>) : tournaments.type === 'ladder' ? (<div style={{textAlign: 'center'}}>Ladder not supported</div>) : Object.keys(tournaments).length > 0 ? (<SearchResult tournament={tournaments} results={results} contestants={contestants} />) : null}
        </div>
    );
}
export default Search
