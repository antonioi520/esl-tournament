import { combineReducers } from 'redux'
import tournamentReducer from './tournamentsReducer'

export default combineReducers({
    tournamentInfo: tournamentReducer
})
