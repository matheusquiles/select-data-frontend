import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { setErrorMessage, setFormData, setIsValidResponse, setSelectedPedidos, resetForm, setEditing, setLoading, setUpdating } from '../redux/reducers/formSlice.js';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import * as F from '../styles/formulario.jsx';
import LookupRest from '../components/lookupRest.js';
import { API_BASE_URL } from '../helpers/constants.js';
import TableComponent from '../components/tableComponent.js';

import { Divider } from '@mui/material';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CircularProgress from '@mui/joy/CircularProgress';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Escritorios = () => {

    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const isLoading = useSelector((state) => state.form.isLoading);
    const [searchValue, setSearchValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSearch = useCallback(async (searchValue) => {
        dispatch(setLoading(true));
        try {
            const endpoint = searchValue ? `${API_BASE_URL}/escritorio/${searchValue}` : `${API_BASE_URL}/escritorio`;
            const response = await axios.get(endpoint);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            console.log('data', response.data);
            if (!response.data || (Array.isArray(response.data) && response.data.length === 0)) {
                setErrorMessage('Nenhum resultado encontrado.');
                setOpen(true);
                setData([]);
            } else {
                const transformedData = transformData(response.data);
                setErrorMessage('');
                setData(transformedData);
            }
        } catch (error) {
            setErrorMessage('Erro ao buscar dados.');
        } finally {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    const transformData = (data) => {
        const dataArray = Array.isArray(data) ? data : [data];
        return dataArray.map((item, index) => ({
            indice: index + 1,
            codigo: item.idEscritorio,
            descricao: item.nomeEscritorio,
        }));
    };

    const columns = [
        { title: '#', key: 'indice', width: '8px' },
        { title: 'Código', key: 'codigo', width: '32px' },
        { title: 'Descrição', key: 'descricao', width: '600px' },
    ];


    return (
        <form onSubmit={(e) => e.preventDefault()} style={{ height: '100%', width: '100%' }}>
            <CssVarsProvider disableTransitionOnChange>
                <CssBaseline />
                <Box sx={{ display: 'flex', minHeight: '10dvh' }}>
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
                            height: '1dvh',
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
                                <HomeRoundedIcon />
                                <Typography color="neutral" sx={{ fontWeight: 500, fontSize: 12 }}>
                                    Manutenção
                                </Typography>
                                <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
                                    Escritórios
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
                                Escritórios
                            </Typography>
                        </Box>
                        <F.InputLine>
                            <LookupRest
                                value={searchValue}
                                first
                                onChange={setSearchValue}
                                onSearch={() => handleSearch(searchValue)}
                            />


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

                    </Box>
                </Box >

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, p: 2 }}>

                    <Divider sx={{ mt: 10 }} />
                    <TableComponent data={data} columns={columns} isLoading={isLoading} />

                </Box>
            </CssVarsProvider>
            <Snackbar open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </form>
    );
};

export default Escritorios;