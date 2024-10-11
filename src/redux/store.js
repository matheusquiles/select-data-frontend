import { configureStore } from '@reduxjs/toolkit';
import formSlice from './reducers/formSlice'; 

const store = configureStore({
  reducer: {
    form: formSlice,
  },
});


export default store;