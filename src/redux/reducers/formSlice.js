import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    formData: {
      admissao: '',
      demissao: '',
      principal_pedido: '',
      ultimos_andamentos_processuais: '',
      valor_perda_estimado: '',
      deposito_recursal_ordinario: '',
      data_deposito_recursal_ordinario: '',
      deposito_recursal_revista: '',
      data_deposito_recursal_revista: '',
      deposito_judicial: '',
      data_deposito_judicial: '',
      bloqueio_judicial: '',
      data_bloqueio_judicial: '',
      estado: '',
      cidade: ''
    },
    invalidFields: []
  };
  
  const formSlice = createSlice({
    name: 'form',
    initialState: {
      numeroProcesso: '',
      nomeEscritorio: '',
      // Adicione mais campos conforme necessário
    },
    reducers: {
      setFormData: (state, action) => {
        return {
          ...state,
          ...action.payload,
        };
      },
    },
  });
  
  export const { setFormData } = formSlice.actions;
  export default formSlice.reducer;