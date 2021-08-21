import React, {useState, useEffect} from 'react';
import Moment from 'react-moment';

const SearchResult = (props) => {
    const{tournament: {name, timeline}} = props;
    const{results} = props;
    const{contestants} = props;

    const [buttonText, setButtonText] = useState('Date ▲');
    const [data, setData] = useState(results);
    const [sortType, setSortType] = useState('asc');
    useEffect(() => {
        setData(results)
        console.log(data)

        const myFunction = () => {
            if(sortType === 'asc'){
                setButtonText('Date ▼');
                const sorted = Object.values(results).sort((a,b) => (b.beginAt > a.beginAt) ? 1: -1);
                setData(sorted);

            }
            else{
                setButtonText('Date ▲');
                const sorted = Object.values(results).sort((a,b) => (b.beginAt < a.beginAt) ? 1: -1);
                setData(sorted);
            }
        }

        myFunction()
    }, [sortType])

    const myFunction2 = () => {
        if(buttonText === 'Date ▲'){
            setSortType('asc')
        }
        else{
            setSortType('desc')
        }
    }


    return(

        <div className="container">
            <div className="box">
                <div className="row">
                    <div className="tournamentHeader">
                    <h3 style={{marginTop: 5, marginBottom: 5}}>{name.short}</h3>
                        <Moment format="Do MMMM YYYY">{timeline.inProgress.begin}</Moment>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="resultsHeader">
                        <button className="sortButton" type="submit" onClick={() => myFunction2()}>{buttonText}</button>
                        {Object.values(data).map(result => (
                            <div className="matchBox">
                                <p className="timeOfMatch"><Moment format="h:mm">{result.beginAt}</Moment></p>
                                <div className="teamRow">
                                    {Object.values(contestants).map(contestant => (
                                        result.participants[0].id === contestant.id ? (<p className={`teamName ${result.participants[0].points > result.participants[1].points ? "matchWinner" : "matchLoser"}`}> {contestant.name} </p>) : null
                                        ))}
                                    <p className={`teamScore ${result.participants[0].points > result.participants[1].points ? "bold" : ""}`}>{result.participants[0].points}</p>
                                </div>
                                <div className="teamRow">
                                    {Object.values(contestants).map(contestant => (
                                        result.participants[1].id === contestant.id ? (<p className={`teamName ${result.participants[1].points > result.participants[0].points ? "matchWinner" : "matchLoser"}`}> {contestant.name} </p>) : null
                                    ))}
                                    <p className={`teamScore ${result.participants[1].points > result.participants[0].points ? "bold" : ""}`}>{result.participants[1].points}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SearchResult
