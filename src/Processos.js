import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { setErrorMessage, setFormData, setIsValidResponse, setSelectedPedidos, resetForm, setEditing, setLoading, setUpdating } from './redux/reducers/formSlice';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Input from './components/input.js';
import SelectRest from './components/selectRest.js';
import DateImput from './components/date.js';
import MoneyImput from './components/money.js';
import * as F from './styles/formulario.jsx';
import EstadoCidadeInput from './components/cidadeEstado.js';
import LookupRest from './components/lookupRest.js';
import { Divider } from '@mui/material';
import { API_SEARCH_URL } from './helpers/constants.js';
import { API_UPDATE_URL } from './helpers/constants.js';
import camelCase from './helpers/camelCase.js';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PedidoManager from './components/PedidoManger.js';

const ConsultarProcesso = () => {
    const dispatch = useDispatch();
    const {
        loading,
        formData,
        invalidFields,
        isEditing,
        isLoading,
        isUpdating,
    } = useSelector(state => ({
        loading: state.form.loading,
        formData: state.form.formData,
        selectedPedidos: state.form.selectedPedidos,
        invalidFields: state.form.invalidFields,
        isEditing: state.form.isEditing,
        isLoading: state.form.isLoading,
        isUpdating: state.form.isUpdating,
        formState: state.form
    }), shallowEqual);

    const validateFields = () => {
        const requiredFields = ['numeroProcesso', 'autor', 'reu', 'reclamada', 'escritorio', 'faseProcessual', 'classificacaoRisco',
            'natureza', 'tipoAcao', 'tribunal', 'vara', 'funcao'];
        const invalids = requiredFields.filter(field => !formData[field] || formData[field] === '');
        return invalids.length === 0;
    };

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        dispatch(setFormData({ [name]: value }));
    }, [dispatch]);


    useEffect(() => {
        dispatch(resetForm());
    }, [dispatch]);

    const [searchValue, setSearchValue] = useState('');

    const handleEditClick = useCallback(() => {
        if (!formData.numeroProcesso) {
            alert('Por favor, busque um processo antes de editar.');
            return;
        } else {
            dispatch(setEditing(true));
            dispatch(setFormData({ ...formData }));
        }
    }, [dispatch, formData]);

    const handleSaveClick = useCallback(async (e) => {
        e.preventDefault();
        dispatch(setUpdating(true));

        if (validateFields()) {
            try {
                // const camelCaseFormData = camelCase.convertKeysToCamelCase(formData);
                const { pedidos, ...dataToSend } = formData;
                console.log("Dados a serem enviados:", JSON.stringify(dataToSend, null, 2));

                const response = await axios.put(`${API_UPDATE_URL}${searchValue}`, dataToSend);
                await new Promise((resolve) => setTimeout(resolve, 3000));

                if (response.data === true) {
                    alert('Processo atualizado com sucesso!');
                } else {
                    alert('Erro ao atualizar processo.');
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
            } finally {
                dispatch(setUpdating(false));
                // dispatch(validateFields(true))
            }
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
            dispatch(setUpdating(false));
        }
    }, [dispatch, formData, searchValue]);

    const handleCancelClick = useCallback(() => {
        dispatch(resetForm());
        dispatch(setEditing(false));
    }, [dispatch]);

    const handleSearch = useCallback(async () => {
        dispatch(resetForm());
        dispatch(setLoading(true));
        dispatch(setEditing(true));

        try {
            const { data } = await axios.get(`${API_SEARCH_URL}${searchValue}`);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            if (data && data.numeroProcesso) {
                const pedidos = Array.isArray(data.pedido) ? data.pedido : [];
                dispatch(setFormData({
                    ...data,
                    pedido: pedidos.map(pedido => ({
                        idPedido: pedido.idPedido,
                        idTipoPedido: pedido.idTipoPedido,
                        descricao: pedido.descricao
                    })),
                }));
                dispatch(setIsValidResponse(true));
            } else {
                alert('Processo não encontrado ou dados inválidos');
                dispatch(setErrorMessage('Processo não encontrado ou dados inválidos.'));
                dispatch(setIsValidResponse(false));
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            dispatch(setErrorMessage('Erro ao buscar dados.'));
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch, searchValue]);


    return (
        <form onSubmit={(e) => e.preventDefault()}>

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
                        <F.InputLine>
                            <Box>
                                <LookupRest
                                    value={searchValue}
                                    first
                                    onChange={setSearchValue}
                                    onSearch={handleSearch}
                                />
                            </Box>

                            {isLoading && <CircularProgress sx={{
                                size: 'sm',
                                gap: 2,
                                mt: 2,
                                mb: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }} />}

                        </F.InputLine>

                        <Divider sx={{ mt: 3 }} />

                        <F.InputLine column>
                            <F.InputLine>
                                <SelectRest
                                    label="Escritório"
                                    first route='escritorio'
                                    id='idEscritorio'
                                    name='nomeEscritorio'
                                    onChange={setFormData}
                                    defaultValue=""
                                    form={formData}
                                    invalidFields={invalidFields}
                                    loading={loading}
                                    disabled={!isEditing}
                                />
                                <Input
                                    label="Nº do Processo"
                                    fieldName="numeroProcesso"
                                    formData={formData}
                                    setFormData={setFormData}
                                    value={formData.numeroProcesso || ''}
                                    invalidFields={invalidFields}
                                    disabled={true}
                                />
                                <Input
                                    label="Réu"
                                    fieldName="reu"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
                                />
                                <Input
                                    label="Autor"
                                    medium fieldName="autor"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    invalidFields={invalidFields}
                                    disabled={!isEditing}
                                />
                                <Input
                                    label="Reclamada"
                                    fieldName="reclamada"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
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
                                    invalidFields={invalidFields}
                                    loading={loading}
                                    disabled={!isEditing}
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
                                    loading={loading}
                                    disabled={!isEditing}
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
                                    loading={loading}
                                    disabled={!isEditing}
                                />
                            </F.InputLine>

                            <F.MediumInputLine>
                                <SelectRest
                                    label="Natureza"
                                    first imgW route='natureza'
                                    id='idNatureza'
                                    name='natureza'
                                    onChange={setFormData}
                                    form={formData}
                                    defaultValue=""
                                    invalidFields={invalidFields}
                                    loading={loading}
                                    disabled={!isEditing}
                                />
                                <SelectRest
                                    label="Tipo de Ação"
                                    route='tipoAcao'
                                    id='idTipoAcao'
                                    name='tipoAcao'
                                    onChange={setFormData}
                                    form={formData}
                                    defaultValue=""
                                    invalidFields={invalidFields}
                                    loading={loading}
                                    disabled={!isEditing}
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
                                    disabled={!isEditing}
                                />
                                <DateImput
                                    label="Data de Ajuizamento"
                                    small
                                    fieldName="dataAjuizamento"
                                    value={formData.dataAjuizamento || ''}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                <MoneyImput
                                    label="Valor da Causa"
                                    imgW fieldName="valorCausa"
                                    value={formData.valorCausa || ''}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing} />
                            </F.MediumInputLine>

                            <F.MediumInputLine>
                                <EstadoCidadeInput
                                    label="Estado"
                                    first
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={true}
                                />
                            </F.MediumInputLine>

                            <F.MediumInputLine>
                                <Input
                                    label="Últimos andamentos processuais"
                                    first fieldName="ultimosAndamentosProcessuais"
                                    formData={formData}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    invalidFields={invalidFields}
                                    disabled={!isEditing}
                                />
                            </F.MediumInputLine>



                            <F.SmallInputLine>
                                <DateImput
                                    label="Data Admissão"
                                    fieldName="admissao"
                                    first formData={formData}
                                    value={formData.admissao || ''}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                <DateImput
                                    label="Data Demissão"
                                    fieldName="demissao"
                                    value={formData.demissao || ''}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </F.SmallInputLine>

                            <F.SmallInputLine>
                                <MoneyImput
                                    label="Depósito Recurso Ordinário"
                                    first fieldName="depositoRecursalOrdinario"
                                    formData={formData}
                                    value={formData.depositoRecursalOrdinario || ''}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                <DateImput
                                    label="Data Recurso Ordinário"
                                    fieldName="dataDepositoRecursalOrdinario"
                                    value={formData.dataDepositoRecursalOrdinario || ''}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </F.SmallInputLine>

                            <F.SmallInputLine>
                                <MoneyImput
                                    label="Depósito Recurso Revista"
                                    first fieldName="depositoRecursalRevista"
                                    formData={formData}
                                    value={formData.depositoRecursalRevista || ''}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                <DateImput
                                    label="Data Recurso Revista"
                                    fieldName="dataDepositoRecursalRevista"
                                    value={formData.dataDepositoRecursalRevista || ''}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </F.SmallInputLine>

                            <F.SmallInputLine>
                                <MoneyImput
                                    label="Depósito Judicial"
                                    first fieldName="depositoJudicial"
                                    formData={formData}
                                    value={formData.depositoJudicial || ''}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                <DateImput
                                    label="Data do Depósito Judicial"
                                    fieldName="dataDepositoJudicial"
                                    value={formData.dataDepositoJudicial || ''}
                                    setFormData={setFormData}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </F.SmallInputLine>

                                <Divider sx={{ mt: 3 }} />
                            <F.InputLine>
                                <PedidoManager
                                    form={formData}
                                    disabled={!isEditing} />
                            </F.InputLine>


                        </F.InputLine>

                        <F.InputLine>
                            <Box sx={{
                                display: 'flex',
                                flexWrap: 'nowrap',
                                gap: 2,
                                mt: 3,
                                mb: 1,
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}>
                                <Button type="button" variant='outlined' onClick={handleCancelClick}>Cancelar</Button>
                                <Button type="reset" variant='soft' onClick={handleEditClick} disabled>Editar</Button>
                                <Button type="submit" disabled={!isEditing} onClick={handleSaveClick} startDecorator={isUpdating ? <CircularProgress variant="solid" /> : null}>
                                    {isUpdating ? 'Atualizando...' : 'Atualizar Processo'}

                                </Button>
                            </Box>
                        </F.InputLine>
                    </Box>
                </Box>
            </CssVarsProvider>
        </form>
    );
};

export default ConsultarProcesso;