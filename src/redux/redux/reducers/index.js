import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import movie from './movie-reducer';
import tipodatos from './tipodatos-reducer';
import orders from './orders-reducer';
import trailer from './trailer-reducer';

const rootReducer = combineReducers({
    credentials,
    movie,
    tipodatos,
    orders,
    trailer   
});
export default rootReducer;