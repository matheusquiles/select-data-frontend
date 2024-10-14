import React, { useEffect } from 'react';
import axios from 'axios';
import { setErrorMessage, setFormData, setIsValidResponse, setSelectedPedidos } from './redux/reducers/formSlice';
import { useDispatch, useSelector } from 'react-redux';
import Input from './components/input.js';
import SelectRest from './components/selectRest.js';
import DateImput from './components/date.js';
import MoneyImput from './components/money.js';
import * as F from './styles/formulario.jsx';
import EstadoCidadeInput from './components/cidadeEstado.js';
import MultiSelectRest from './components/multiSelectRest.js';
import LookupRest from './components/lookupRest.js';
import { Divider } from '@mui/material';
import { API_BASE_URL } from './helpers/constants.js'; 

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const ConsultarProcesso = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.form.loading);
    const formData = useSelector((state) => state.form.formData);
    const invalidFields = useSelector((state) => state.form.invalidFields);


    // const handleChange = (e) => {
    //     if (e.target && e.target.name && e.target.value !== undefined) {
    //         const { name, value } = e.target;
    //         dispatch(setFormData({ [name]: value }));
    //     } else {
    //         console.error('Event target is missing name or value:', e.target);
    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Resposta HandleChange:", e);
        dispatch(setFormData({ [name]: value })); // Atualiza o formData no Redux
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


    // const handleLookupResponse = (response) => {
    //     if (response && response.numeroProcesso) {
    //         dispatch(setLookupResponse(response));
    //         dispatch(setIsValidResponse(true));
    //     } else {
    //         dispatch(setErrorMessage("Processo não encontrado ou dados inválidos."));
    //         dispatch(setIsValidResponse(false));
    //     }
    // };

    const handleLookupResponse = (response) => {
        console.log("Resposta da API:", response);

        if (response && response.numeroProcesso) {
            setFormData((prevData) => ({
                ...prevData,
                numeroProcesso: response.numeroProcesso,
                autor: response.autor || '',
                nomeEscritorio: response.nomeEscritorio || '',
            }));

            dispatch(setIsValidResponse(true));
        } else {
            dispatch(setErrorMessage("Processo não encontrado ou dados inválidos."));
            dispatch(setIsValidResponse(false));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/processo/${formData.numeroProcesso}`);
                handleLookupResponse(response.data); 
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                dispatch(setErrorMessage("Erro ao buscar dados.")); // Dispatch error message if needed
            }
        };

        if (formData.numeroProcesso) {
            fetchData();
        }
    }, [formData.numeroProcesso]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Dados do formulário:", formData);
    };


    return (
        <form onSubmit={handleSubmit} className="cadastro-processo-form">

            <CssVarsProvider disableTransitionOnChange>
                <CssBaseline />
                <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
                    <Box
                        component="main"
                        className="MainContent"
                        sx={{
                            px: { xs: 2, md: 6 },
                            pt: {
                                xs: 'calc(12px + var(--Header-height))',
                                sm: 'calc(12px + var(--Header-height))',
                                md: 3,
                            },
                            pb: { xs: 2, sm: 2, md: 3 },
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0,
                            height: '100dvh',
                            gap: 1,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Breadcrumbs
                                size="sm"
                                aria-label="breadcrumbs"
                                separator={<ChevronRightRoundedIcon fontSize="sm" />}
                                sx={{ pl: 0 }}
                            >
                                <Link
                                    underline="none"
                                    color="neutral"
                                    aria-label="Home"
                                >
                                    <HomeRoundedIcon />
                                </Link>
                                <Link
                                    underline="hover"
                                    color="neutral"
                                    sx={{ fontSize: 12, fontWeight: 500 }}
                                >
                                    Processos
                                </Link>
                                <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
                                    Buscar Processo
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                mb: 1,
                                gap: 1,
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: { xs: 'start', sm: 'center' },
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Typography level="h2" component="h1">
                                Buscar Processo
                            </Typography>
                        </Box>
                        <Box>
                            <LookupRest
                                route='processo/buscarProcesso'
                                name='nrProcesso'
                                onChange={setFormData}
                                first small form={formData}
                                invalidFields={invalidFields}
                                onResponse={handleLookupResponse}
                                blocked={false}
                            />
                        </Box>

                        <Divider />

                        <F.InputLine column>
                            <F.InputLine>
                                <SelectRest
                                    label="Escritório"
                                    first route='escritorio'
                                    id='idEscritorio'
                                    name='nomeEscritorio'
                                    value={formData.numeroProcesso || ""}
                                    onChange={(e) => setFormData((prev) => ({
                                        ...prev,
                                        numeroProcesso: e.target.value,
                                    }))}
                                    form={formData}
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
                                    onChange={handleChange}
                                />
                                <MoneyImput
                                    label="Valor da Causa"
                                    imgW fieldName="valorCausa"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange} />
                            </F.MediumInputLine>

                            <F.MediumInputLine>
                                <EstadoCidadeInput
                                    label="Estado"
                                    first
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                />
                                <DateImput
                                    label="Data Demissão"
                                    fieldName="demissao"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                />
                            </F.SmallInputLine>

                            <F.SmallInputLine>
                                <MoneyImput
                                    label="Depósito Recurso Ordinário"
                                    first fieldName="depositoRecursalOrdinario"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                />
                                <DateImput
                                    label="Data Recurso Ordinário"
                                    fieldName="dataDepositoRecursalOrdinario"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                />
                            </F.SmallInputLine>

                            <F.SmallInputLine>
                                <MoneyImput
                                    label="Depósito Recurso Revista"
                                    first fieldName="depositoRecursalRevista"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                />
                                <DateImput
                                    label="Data Recurso Revista"
                                    fieldName="dataDepositoRecursalRevista"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                />
                            </F.SmallInputLine>

                            <F.SmallInputLine>
                                <MoneyImput
                                    label="Depósito Judicial"
                                    first fieldName="depositoJudicial"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                />
                                <DateImput
                                    label="Data do Depósito Judicial"
                                    fieldName="dataDepositoJudicial"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                />
                            </F.SmallInputLine>

                        </F.InputLine>
                    </Box>
                </Box>
            </CssVarsProvider>
        </form>
    );
};

export default ConsultarProcesso;