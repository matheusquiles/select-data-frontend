import { createStore, combineReducers } from 'redux';
import formReducer from './reducers/formReducer'; // Importar o reducer

const rootReducer = combineReducers({
  form: formReducer, // Adicionar o reducer ao rootReducer
  // Adicione outros reducers aqui
});

const store = createStore(rootReducer);

export default store;