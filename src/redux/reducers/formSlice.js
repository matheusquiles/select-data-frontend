import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_BASE_URL } from '../../helpers/constants';

const initialState = {
  formData: {
    numeroProcesso: '',
    autor: '',
  },
  selectedPedidos: [],
  options: {},
  invalidFields: [],
  errorMessage: '',
  isLoading: false,
};

export const fetchEscritorio = createAsyncThunk('form/fetchEscritorio', async () => {
  const response = await axios.get(API_BASE_URL + '/escritorio');
  return response.data;
});

export const fetchFaseProcessual = createAsyncThunk('form/fetchFaseProcessual', async () => {
  const response = await axios.get(API_BASE_URL + '/faseProcessual');
  return response.data;
});


const formSlice = createSlice({
  name: 'form',
  initialState,
  loading: false,
  options: {},
  errorMessage: '',
  reducers: {
    loading: {
      escritorio: false,
      faseProcessual: false,
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
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
    setLookupResponse: (state, action) => {
      const response = action.payload;
      if (response && response.numeroProcesso) {
        state.formData = {
          ...state.formData,
          numeroProcesso: response.numeroProcesso || '',
          autor: response.autor || '', 
        };
        state.isValidResponse = true;
      } else {
        state.errorMessage = "Processo não encontrado ou dados inválidos.";
        state.isValidResponse = false;
      }
    },
    setIsValidResponse: (state, action) => {
      state.isValidResponse = action.payload;
    },
    extraReducers: (builder) => {
      builder.addCase(fetchEscritorio.pending, (state) => {
        state.loading.escritorio = true;
      }).addCase(fetchEscritorio.fulfilled, (state, action) => {
        state.options.escritorio = action.payload;
        state.loading.escritorio = false;
      }).addCase(fetchEscritorio.rejected, (state) => {
        state.loading.escritorio = false;
      });

      builder.addCase(fetchFaseProcessual.pending, (state) => {
        state.loading.outraRota = true;
      }).addCase(fetchFaseProcessual.fulfilled, (state, action) => {
        state.options.outraRota = action.payload;
        state.loading.outraRota = false;
      }).addCase(fetchFaseProcessual.rejected, (state) => {
        state.loading.outraRota = false;
      });
    },
  }
});

export const { setLoading,
  setFormData,
  setOptions,
  setSelectedPedidos,
  setInvalidFields,
  setErrorMessage,
  resetForm,
  updateFormData,
  setLookupResponse,
  setIsValidResponse } = formSlice.actions;
export default formSlice.reducer;
