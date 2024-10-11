import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    numeroProcesso: '',
    autor: '',
  },
  selectedPedidos: [],
  options: {},
  invalidFields: [],
  errorMessage: ''
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setOptions: (state, action) => {
      const { route, options } = action.payload;
      state.options[route] = options; // Armazena opções por rota
    },
    setSelectedPedidos: (state, action) => {
      state.selectedPedidos = action.payload;
    },
    setInvalidFields: (state, action) => {
      state.invalidFields = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    resetForm: (state) => {
      state.formData = {};
      state.selectedPedidos = [];
      state.invalidFields = [];
      state.errorMessage = '';
    }
  }
});

export const { setFormData, setOptions, setSelectedPedidos, setInvalidFields, setErrorMessage, resetForm } = formSlice.actions;
export default formSlice.reducer;
