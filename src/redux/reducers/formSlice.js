import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {},
  selectedPedidos: [],
  options: {},
  invalidFields: [],
  errorMessage: '',
  isLoading: false,
  isEditing: false,
  isUpdating: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  errorMessage: '',
  reducers: {
    loading: {
      escritorio: false,
      faseProcessual: false,
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setOptions: (state, action) => {
      const { route, options } = action.payload;
      state.options[route] = options;
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
    },
    updateFormData(state, action) {
      state.formData = action.payload;
    },
    setIsValidResponse: (state, action) => {
      state.isValidResponse = action.payload;
    },
    setEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
  },
});

export const {
  setLoading,
  setFormData,
  setOptions,
  setSelectedPedidos,
  setInvalidFields,
  setErrorMessage,
  resetForm,
  updateFormData,
  setIsValidResponse,
  setEditing,
  setUpdating,
 } = formSlice.actions;
export default formSlice.reducer;
