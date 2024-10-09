import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './components/input.js';
import SelectRest from './components/selectRest.js';
import DateImput from './components/date.js';
import MoneyImput from './components/money.js';
import * as F from './styles/formulario.jsx';
import EstadoCidadeInput from './components/cidadeEstado.js';
import MultiSelectRest from './components/multiSelectRest.js';

const CadastroProcesso = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [selectedPedidos, setSelectedPedidos] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const apiBaseUrl = 'http://localhost:8080/api/';

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
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleMultiSelectChange = (selectedItems) => {
    console.log("Selected items recebidos:", selectedItems);

    if (!Array.isArray(selectedItems)) {
      selectedItems = [];
    }

    const mappedItems = selectedItems.map(item => ({
      tipoPedido: item.id // Usando a prop id para mapear o campo idTipoPedido
    }));

    setSelectedPedidos(mappedItems);
  };


  const validateFields = () => {
    const requiredFields = ['numeroProcesso', 'autor', 'reu', 'reclamada', 'escritorio', 'faseProcessual', 'classificacaoRisco',
      'natureza', 'tipoAcao', 'tribunal', 'vara', 'funcao']; // Campos que são obrigatórios
    const invalids = requiredFields.filter(field => !formData[field] || formData[field] === '');
    setInvalidFields(invalids);
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


  return (
    <form onSubmit={handleSubmit} className="cadastro-processo-form">
      <F.InputLine column>
        <F.InputLine>
          <SelectRest
            label="Escritório"
            first route='escritorio'
            id='idEscritorio'
            name='nomeEscritorio'
            onChange={setFormData}
            form={formData}
            defaultValue=""
            invalidFields={invalidFields}
          />
          <Input
            label="Nº do Processo"
            fieldName="numeroProcesso"
            formData={formData}
            setFormData={setFormData}
            invalidFields={invalidFields}
          />
          <SelectRest
            label="Fase Processual"
            route='faseProcessual'
            id='idFaseProcessual'
            name='faseProcessual'
            onChange={setFormData}
            defaultValue=""
            form={formData}
            invalidFields={invalidFields}
          />
        </F.InputLine>

        <F.InputLine topless>
          <Input
            label="Autor" first imgW
            fieldName="autor"
            formData={formData}
            setFormData={setFormData}
            invalidFields={invalidFields}
          />
          <Input
            label="Réu"
            fieldName="reu"
            formData={formData}
            setFormData={setFormData}
          />
          <Input
            label="Reclamada"
            fieldName="reclamada"
            formData={formData}
            setFormData={setFormData}
          />
        </F.InputLine>
      </F.InputLine>

      <F.InputLine>
        <SelectRest
          label="Vara"
          first small route='vara'
          id='idVara'
          name='vara'
          onChange={setFormData}
          form={formData}
          defaultValue=""
          invalidFields={invalidFields}
        />
        <SelectRest
          label="Classificação de Risco"
          route='classificacaoRisco'
          id='idClassificacaoRisco'
          name='classificacaoRisco'
          onChange={setFormData}
          form={formData}
          defaultValue=""
          invalidFields={invalidFields}
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
        />
      </F.InputLine>

      <F.InputLine>
        <F.SmallInputLine>
          <SelectRest
            label="Natureza"
            first route='natureza'
            id='idNatureza'
            name='natureza'
            onChange={setFormData}
            form={formData}
            defaultValue=""
            invalidFields={invalidFields}
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
          />
        </F.SmallInputLine>
        <F.SmallInputLine>
          <SelectRest
            label="Tribunal Origem"
            first route='tribunal'
            id='idTribunal'
            name='tribunalOrigem'
            onChange={setFormData}
            form={formData}
            defaultValue=""
            invalidFields={invalidFields}
          />
          <DateImput
            label="Data de Ajuizamento"
            small fieldName="dataAjuizamento"
            formData={formData}
            setFormData={setFormData}
          />
        </F.SmallInputLine>
        <MoneyImput
          label="Valor da Causa"
          first imgW fieldName="valorCausa"
          formData={formData}
          setFormData={setFormData} />
      </F.InputLine>

      <F.InputLine>
        <EstadoCidadeInput
          label="Estado"
          first
          formData={formData}
          setFormData={setFormData}
        />
      </F.InputLine>

      <F.InputLine>
        <Input
          label="Últimos andamentos processuais"
          first fieldName="ultimosAndamentosProcessuais"
          formData={formData}
          setFormData={setFormData}
          invalidFields={invalidFields}
        />
      </F.InputLine>
      <F.InputLine>
        <MultiSelectRest
          label="Pedidos do Processo"
          first route='tipoPedido'
          id='idTipoPedido'
          name='descricao'
          onChange={handleMultiSelectChange}
          form={formData}
          defaultValue={[]}
          invalidFields={invalidFields}
        />
      </F.InputLine>

      <F.InputLine>
        <F.SmallInputLine>
          <DateImput
            label="Data Admissão"
            fieldName="admissao"
            first medium formData={formData}
            setFormData={setFormData}
          />
          <DateImput
            label="Data Demissão"
            fieldName="demissao"
            formData={formData}
            setFormData={setFormData}
          />
        </F.SmallInputLine>
      </F.InputLine>


      <F.InputLine>
        <F.SmallInputLine>
          <MoneyImput
            label="Depósito Recursal (Recurso Ordinário)"
            first fieldName="depositoRecursalOrdinario"
            formData={formData}
            setFormData={setFormData}
          />
          <DateImput
            label="Data do Depósito Recursal (Recurso Ordinário)"
            fieldName="dataDepositoRecursalOrdinario"
            formData={formData}
            setFormData={setFormData}
          />
        </F.SmallInputLine>
      </F.InputLine>

      <F.InputLine>
        <F.SmallInputLine>
          <MoneyImput
            label="Depósito Recursal (Recurso Revista)"
            first fieldName="depositoRecursalRevista"
            formData={formData}
            setFormData={setFormData}
          />
          <DateImput
            label="Data do Depósito Recursal (Recurso Revista)"
            fieldName="dataDepositoRecursalRevista"
            formData={formData}
            setFormData={setFormData}
          />
        </F.SmallInputLine>
      </F.InputLine>

      <F.InputLine>
        <F.SmallInputLine>
          <MoneyImput
            label="Depósito Judicial"
            first small fieldName="depositoJudicial"
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
    </form>
  );
};

export default CadastroProcesso;