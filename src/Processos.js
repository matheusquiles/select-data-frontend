import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './components/input.js';
import SelectRest from './components/selectRest.js';
import DateImput from './components/date.js';
import MoneyImput from './components/money.js';
import * as F from './styles/formulario.jsx';
import EstadoCidadeInput from './components/cidadeEstado.js';
import MultiSelectRest from './components/multiSelectRest.js';
import LookupRest from './components/lookupRest.js';

const ConsultarProcesso = () => {
    const [invalidFields, setInvalidFields] = useState([]);
    const [selectedPedidos, setSelectedPedidos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isValidResponse, setIsValidResponse] = useState(false); // Estado para a resposta da API
    const apiBaseUrl = 'http://localhost:8080/api/';

    const [formData, setFormData] = useState({
        numeroProcesso: '',
        nomeEscritorio: '',
        faseProcessual: '',
        autor: '',
        reu: '',
        reclamada: '',
        estado: '',
        cidade: '',
        natureza: '',
        tipoAcao: '',
        funcao: '',
        tribunalOrigem: '',
        valorCausa: 0,
        dataAjuizamento: '',
        // Outros campos...
    });

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
            tipoPedido: item.id 
        }));

        setSelectedPedidos(mappedItems);
    };
    const handleLookupResponse = (response) => {
        if (response && response.numeroProcesso) {
            setIsValidResponse(true);
            setFormData(prevFormData => ({
                ...prevFormData,
                numeroProcesso: response.numeroProcesso || '',
                nomeEscritorio: response.escritorio || '',
                faseProcessual: response.faseProcessual || '',
                autor: response.autor || '',
                reu: response.reu || '',
                reclamada: response.reclamada || '',
                estado: response.estado || '',
                cidade: response.cidadeOrigem || '',
                natureza: response.natureza || '',
                tipoAcao: response.tipoAcao || '',
                funcao: response.funcao || '',
                tribunalOrigem: response.tribunal || '',
                valorCausa: response.valorCausa || 0,
                dataAjuizamento: response.dataAjuizamento || '',
            }));
        } else {
            setErrorMessage("Processo não encontrado ou dados inválidos.");
            setIsValidResponse(false);
        }
    };

    useEffect(() => {
        console.log("FormData atualizado:", formData);
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dados do formulário:", formData);
    };

    return (
        <form onSubmit={handleSubmit} className="cadastro-processo-form">
            <F.InputLine column>

                <F.InputLine>
                    <LookupRest
                        label="Buscar Processo"
                        route='processo/buscarProcesso'
                        name='nrProcesso'
                        onChange={setFormData}
                        first small form={formData}
                        invalidFields={invalidFields}
                        onResponse={handleLookupResponse} 
                    />
                </F.InputLine>

                <F.InputLine>
                    <SelectRest
                        label="Escritório"
                        first route='escritorio'
                        id='idEscritorio'
                        name='nomeEscritorio'
                        onChange={setFormData}
                        form={formData}
                        // value={formData.nomeEscritorio || ""}
                        invalidFields={invalidFields}
                    />
                    <Input
                        label="Nº do Processo"
                        fieldName="numeroProcesso"
                        formData={formData}
                        setFormData={setFormData}
                        value={formData.numeroProcesso || ""}
                        invalidFields={invalidFields}
                    />
                    <SelectRest
                        label="Fase Processual"
                        route='faseProcessual'
                        id='idFaseProcessual'
                        name='faseProcessual'
                        onChange={setFormData}
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

export default ConsultarProcesso;