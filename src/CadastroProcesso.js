import React, { useEffect } from 'react';
import { setLoading, setFormData, setInvalidFields, setSelectedPedidos, fetchEscritorio, fetchFaseProcessual } from './redux/reducers/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Input from './components/input.js';
import SelectRest from './components/selectRest.js';
import DateImput from './components/date.js';
import LoadingSpinner from './components/LoaderComponent.js';
import MoneyImput from './components/money.js';
import * as F from './styles/formulario.jsx';
import EstadoCidadeInput from './components/cidadeEstado.js';
import MultiSelectRest from './components/multiSelectRest.js';

const CadastroProcesso = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.form.loading);
  const formData = useSelector((state) => state.form.formData);
  const invalidFields = useSelector((state) => state.form.invalidFields);
  const selectedPedidos = useSelector((state) => state.form.selectedPedidos);
  const errorMessage = useSelector((state) => state.form.errorMessage);
  const apiBaseUrl = 'http://localhost:8080/api/';


  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));

      const timer = setTimeout(async () => {
        try {
          await Promise.all([
            dispatch(fetchEscritorio()),
            dispatch(fetchFaseProcessual())
          ]);
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
        } finally {
          dispatch(setLoading(false));
        }
      }, 1000);

      return () => clearTimeout(timer);
    };

    fetchData();
  }, [dispatch]);



  const toCamelCase = (str) => {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
  };

  const convertKeysToCamelCase = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = toCamelCase(key);
      acc[camelCaseKey] = obj[key];
      return acc;
    }, {});
  };


  const handleChange = (e) => {
    if (e.target && e.target.name && e.target.value !== undefined) {
      const { name, value } = e.target;
      dispatch(setFormData({ [name]: value }));
    } else {
      console.error('Event target is missing name or value:', e.target);
    }
  };


  const handleMultiSelectChange = (selectedItems) => {

    if (!Array.isArray(selectedItems)) {
      selectedItems = [];
    }

    const mappedItems = selectedItems.map(item => ({
      tipoPedido: item.id
    }));

    setSelectedPedidos(mappedItems);
    dispatch(setSelectedPedidos(mappedItems));
  };


  const validateFields = () => {
    const requiredFields = ['numeroProcesso', 'autor', 'reu', 'reclamada', 'escritorio', 'faseProcessual', 'classificacaoRisco',
      'natureza', 'tipoAcao', 'tribunal', 'vara', 'funcao'];
    const invalids = requiredFields.filter(field => !formData[field] || formData[field] === '');
    dispatch(setInvalidFields(invalids));
    return invalids.length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateFields()) {
      try {
        const camelCaseFormData = convertKeysToCamelCase(formData);
        const dataToSend = {
          ...camelCaseFormData,
          pedido: selectedPedidos
        };

        console.log("Dados a serem enviados:", JSON.stringify(dataToSend, null, 2));

        const response = await axios.post(`${apiBaseUrl}processo/salvar`, dataToSend);

        if (response.data === true) {
          alert('Processo criado com sucesso!');
        } else {
          alert('Já existe um processo com esse número.');
        }

      } catch (error) {
        console.error('Erro ao criar o processo:', error);

        if (error.response) {
          alert(`Erro ao criar o processo: ${error.response.data.message || 'Erro desconhecido'}`);
        } else if (error.request) {
          alert('Erro: Nenhuma resposta recebida do servidor.');
        } else {
          alert(`Erro ao configurar a requisição: ${error.message}`);
        }
      }
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  };

  const isLoading = loading && Object.values(loading).some((isLoading) => isLoading);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <LoadingSpinner />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="cadastro-processo-form">
          <F.InputLine column>
            <F.InputLine>
              <SelectRest
                label="Escritório"
                first route='escritorio'
                id='idEscritorio'
                name='nomeEscritorio'
                onChange={handleChange}
                form={formData}
                defaultValue=""
                invalidFields={invalidFields}
                loading={loading}
              />
              <Input
                label="Nº do Processo"
                fieldName="numeroProcesso"
                formData={formData}
                setFormData={setFormData}
                onChange={handleChange}
                invalidFields={invalidFields}
              />
              <Input
                label="Réu"
                fieldName="reu"
                formData={formData}
                setFormData={setFormData}
                onChange={handleChange}
              />
            </F.InputLine>

            <F.InputLine>
              <SelectRest
                label="Fase Processual"
                first medium route='faseProcessual'
                id='idFaseProcessual'
                name='faseProcessual'
                onChange={setFormData}
                defaultValue=""
                form={formData}
                invalidFields={invalidFields}
                loading={loading}
              />
              <Input
                label="Autor"
                fieldName="autor"
                formData={formData}
                setFormData={setFormData}
                onChange={handleChange}
                invalidFields={invalidFields}
              />
              <Input
                label="Reclamada"
                fieldName="reclamada"
                formData={formData}
                setFormData={setFormData}
                onChange={handleChange}
              />
            </F.InputLine>

            <F.InputLine>
              <SelectRest
                label="Vara"
                first medium route='vara'
                id='idVara'
                name='vara'
                onChange={setFormData}
                form={formData}
                defaultValue=""
                invalidFields={invalidFields}
                loading={loading} // Passando o estado de loading para o component
              />
              <SelectRest
                label="Classificação de Risco"
                medium route='classificacaoRisco'
                id='idClassificacaoRisco'
                name='classificacaoRisco'
                onChange={setFormData}
                form={formData}
                defaultValue=""
                invalidFields={invalidFields}
                loading={loading} // Passando o estado de loading para o component
              />
              <SelectRest
                label="Função"
                route='funcao'
                id='idFuncao'
                name='funcao'
                onChange={setFormData}
                form={formData}
                defaultValue=""
                invalidFields={invalidFields}
                loading={loading} // Passando o estado de loading para o component
              />
            </F.InputLine>

            <F.MediumInputLine>
              <SelectRest
                label="Natureza"
                first route='natureza'
                id='idNatureza'
                name='natureza'
                onChange={setFormData}
                form={formData}
                defaultValue=""
                invalidFields={invalidFields}
                loading={loading} // Passando o estado de loading para o component
              />
              <SelectRest
                label="Tipo de Ação"
                small route='tipoAcao'
                id='idTipoAcao'
                name='tipoAcao'
                onChange={setFormData}
                form={formData}
                defaultValue=""
                invalidFields={invalidFields}
                loading={loading}
              />
            </F.MediumInputLine>

            <F.MediumInputLine>
              <SelectRest
                label="Tribunal Origem"
                first route='tribunal'
                id='idTribunal'
                name='tribunalOrigem'
                onChange={setFormData}
                form={formData}
                defaultValue=""
                invalidFields={invalidFields}
                loading={loading}
              />
              <DateImput
                label="Data de Ajuizamento"
                small fieldName="dataAjuizamento"
                formData={formData}
                setFormData={setFormData}
              />
              <MoneyImput
                label="Valor da Causa"
                imgW fieldName="valorCausa"
                formData={formData}
                setFormData={setFormData} />
            </F.MediumInputLine>


            <F.MediumInputLine>
              <EstadoCidadeInput
                label="Estado"
                first
                formData={formData}
                setFormData={setFormData}
              />
            </F.MediumInputLine>

            <F.InputLine>
              <Input
                label="Últimos andamentos processuais"
                first fieldName="ultimosAndamentosProcessuais"
                formData={formData}
                setFormData={setFormData}
                onChange={handleChange}
                invalidFields={invalidFields}
              />
            </F.InputLine>

            <F.MediumInputLine>
              <MultiSelectRest
                label="Pedidos do Processo"
                first route='tipoPedido'
                id='idTipoPedido'
                name='descricao'
                onChange={handleMultiSelectChange}
                form={formData}
                defaultValue={[]}
                invalidFields={invalidFields}
                loading={loading}
              />
            </F.MediumInputLine>

            <F.SmallInputLine>
              <DateImput
                label="Data Admissão"
                fieldName="admissao"
                first formData={formData}
                setFormData={setFormData}
              />
              <DateImput
                label="Data Demissão"
                fieldName="demissao"
                formData={formData}
                setFormData={setFormData}
              />
            </F.SmallInputLine>

            <F.SmallInputLine>
              <MoneyImput
                label="Depósito Recurso Ordinário"
                first fieldName="depositoRecursalOrdinario"
                formData={formData}
                setFormData={setFormData}
              />
              <DateImput
                label="Data Recurso Ordinário"
                fieldName="dataDepositoRecursalOrdinario"
                formData={formData}
                setFormData={setFormData}
              />
            </F.SmallInputLine>

            <F.SmallInputLine>
              <MoneyImput
                label="Depósito Recurso Revista"
                first fieldName="depositoRecursalRevista"
                formData={formData}
                setFormData={setFormData}
              />
              <DateImput
                label="Data Recurso Revista"
                fieldName="dataDepositoRecursalRevista"
                formData={formData}
                setFormData={setFormData}
              />
            </F.SmallInputLine>

            <F.SmallInputLine>
              <MoneyImput
                label="Depósito Judicial"
                first fieldName="depositoJudicial"
                formData={formData}
                setFormData={setFormData}
              />
              <DateImput
                label="Data do Depósito Judicial"
                fieldName="dataDepositoJudicial"
                formData={formData}
                setFormData={setFormData}
              />
            </F.SmallInputLine>

          </F.InputLine>

          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Exibir mensagem de erro */}

          <button type="submit">Cadastrar Processo</button>
        </form >
      )}
    </>
  );
};
export default CadastroProcesso;