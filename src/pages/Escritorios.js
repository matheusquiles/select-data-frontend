import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { setErrorMessage, setFormData, setIsValidResponse, setSelectedPedidos, resetForm, setEditing, setLoading, setUpdating } from '../redux/reducers/formSlice.js';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Input from '../components/input.js';
import * as F from '../styles/formulario.jsx';
import EstadoCidadeInput from '../components/cidadeEstado.js';
import LookupRest from '../components/lookupRest.js';
import { Divider } from '@mui/material';
import { API_SEARCH_URL } from '../helpers/constants.js';
import { API_UPDATE_URL } from '../helpers/constants.js';

import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import TableComponent from '../components/tableComponent.js';


const data = [
    { indice: 1, codigo: 'A001', descricao: 'Descrição 1' },
    { indice: 2, codigo: 'A002', descricao: 'Descrição 2' },
    { indice: 3, codigo: 'A003', descricao: 'Descrição 3' },
];

const columns = [
    { title: '#', key: 'indice', width: '8px' },
    { title: 'Código', key: 'codigo', width: '32px' },
    { title: 'Descrição', key: 'descricao', width: '600px' },
  ];

const Escritorios = () => {

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
                    </Box>
                </Box >
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, p: 2 }}>

                <Divider sx={{ mt: 3 }} />
                <TableComponent data={data} columns={columns}/>

                </Box> 

            </CssVarsProvider>
        </form>
    );
};

export default Escritorios;