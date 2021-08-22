import {GET_TOURNAMENT, TOURNAMENT_ERROR, GET_TOURNAMENT_RESULTS, TOURNAMENT_RESULTS_ERROR, GET_TOURNAMENT_CONTESTANTS, TOURNAMENT_CONTESTANTS_ERROR } from '../types'
import axios from 'axios'


//API Info
const apiUrl = 'https://murmuring-brook-49622.herokuapp.com/https://api.eslgaming.com/play/v1/leagues';


export const getTournament = (search) => async dispatch => {

    try{
        const res = await axios.get(`${apiUrl}/${search}/results`)
        dispatch( {
            type: GET_TOURNAMENT_RESULTS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: TOURNAMENT_RESULTS_ERROR,
            payload: console.log(e),
        })
    }

}

export const getTournamentResults = (search) => async dispatch => {

    try{
        const res = await axios.get(`${apiUrl}/${search}/contestants`)
        dispatch( {
            type: GET_TOURNAMENT_CONTESTANTS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: TOURNAMENT_CONTESTANTS_ERROR,
            payload: console.log(e),
        })
    }

}

export const getTournamentContestants = (search) => async dispatch => {

    try{
        const res = await axios.get(`${apiUrl}/${search}`)
        dispatch( {
            type: GET_TOURNAMENT,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: TOURNAMENT_ERROR,
            payload: console.log(e),
        })
    }

}
