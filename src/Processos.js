import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Input from './components/input.js';
import SelectRest from './components/selectRest.js';
import DateImput from './components/date.js';
import MoneyImput from './components/money.js';
import * as F from './styles/formulario.jsx';
import EstadoCidadeInput from './components/cidadeEstado.js';
import MultiSelectRest from './components/multiSelectRest.js';
import LookupRest from './components/lookupRest.js';
import { Chip, Divider } from '@mui/material';

const ConsultarProcesso = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.form.loading);
    const [invalidFields, setInvalidFields] = useState([]);
    const [selectedPedidos, setSelectedPedidos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [isValidResponse, setIsValidResponse] = useState(false); // Estado para a resposta da API

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
    });

    const toCamelCase = (str) => {
        return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
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
        if (response) {
            if (response.numeroProcesso) {
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
        } else {
            setErrorMessage("Resposta da API inválida.");
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
            </F.InputLine>
            
            <Divider  />

            {isValidResponse ? (

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
                        // value={formData.nomeEscritorio || ""}
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

            // {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Exibir mensagem de erro */}

        ) : (
            <p/>
        )}
        </form>
    );
};

export default ConsultarProcesso;