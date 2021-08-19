import React, {useState} from 'react';

const SearchResult = ({results}) => {

    return(

        <div>
            {console.log(results)}
            {results.id}
            {results.gameName}
            {results.name.short}

        </div>
    )
}
export default SearchResult
