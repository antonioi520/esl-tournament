import {GET_TOURNAMENT, TOURNAMENT_ERROR, GET_TOURNAMENT_RESULTS, TOURNAMENT_RESULTS_ERROR, GET_TOURNAMENT_CONTESTANTS, TOURNAMENT_CONTESTANTS_ERROR } from '../types'

const initialState = {
    tournaments: {},
    results: {},
    contestants: {},
    loading:true
}

export default function(state = initialState, action){

    switch(action.type){

        case GET_TOURNAMENT:
            return {
                ...state,
                tournaments:action.payload,
                loading:false

            }
        case TOURNAMENT_ERROR:
            return{
                loading: false,
                error: action.payload
            }
        case GET_TOURNAMENT_RESULTS:
            return {
                ...state,
                results:action.payload,
                loading:false

            }
        case TOURNAMENT_RESULTS_ERROR:
            return{
                loading: false,
                error: action.payload
            }
        case GET_TOURNAMENT_CONTESTANTS:
            return {
                ...state,
                contestants:action.payload,
                loading:false

            }
        case TOURNAMENT_CONTESTANTS_ERROR:
            return{
                loading: false,
                error: action.payload
            }
        default: return state
    }

}
