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
  estadoSelecionado: '', 
  cidadeSelecionada: '',  
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  errorMessage: '',
  reducers: {
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
      state.formData.pedido = action.payload.map(item => ({
        idPedido: item.idPedido || null,
        tipoPedido: item.idTipoPedido,
        descricao: item.name,
      }));
    },
    addPedido: (state, action) => {
      const newPedido = action.payload;
      if (!state.selectedPedidos.some(p => p.id === newPedido.id)) {
        state.selectedPedidos.push(newPedido);
        state.formData.pedido = state.selectedPedidos.map(item => ({
          idPedido: item.idPedido || null,
          idTipoPedido: item.id,
          descricao: item.name,
        }));
      }
    },
    removePedido: (state, action) => {
      const pedidoId = action.payload;
      state.selectedPedidos = state.selectedPedidos.filter(p => p.id !== pedidoId);
      state.formData.pedido = state.selectedPedidos.map(item => ({
        idPedido: item.idPedido || null,
        idTipoPedido: item.id,
        descricao: item.name,
      }));
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
      state.estadoSelecionado = ''; 
      state.cidadeSelecionada = '';
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
    setEstadoSelecionado: (state, action) => {
      state.estadoSelecionado = action.payload;
      state.formData.estado = action.payload;
    },
    setCidadeSelecionada: (state, action) => {
      state.cidadeSelecionada = action.payload;
      state.formData.cidade = action.payload;
    },
  },
});

export const {
  setLoading,
  setFormData,
  setOptions,
  setSelectedPedidos,
  addPedido,
  removePedido,
  setInvalidFields,
  setErrorMessage,
  resetForm,
  updateFormData,
  setIsValidResponse,
  setEditing,
  setUpdating,
  setEstadoSelecionado,
  setCidadeSelecionada,
} = formSlice.actions;
export default formSlice.reducer;
