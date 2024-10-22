import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { InputLabel, StyledSelect, InputWrapper } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';

export default function EstadoCidadeInput({ 
    label, 
    first, 
    topless, 
    imgW, 
    small, 
    formData, 
    setFormData, 
    required, 
    invalidFields = [], 
    onChange,
    disabled = false
}) {
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCidades, setIsLoadingCidades] = useState(false);
    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [cidadeSelecionada, setCidadeSelecionada] = useState('');
    const debounceRef = useRef(null); 

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const estadosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
                setEstados(estadosOrdenados);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar estados:', error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (formData.estado) {
            const estadoEncontrado = estados.find((e) => e.nome === formData.estado);
            if (estadoEncontrado && estadoEncontrado.id !== estadoSelecionado) {
                setEstadoSelecionado(estadoEncontrado.id);
                if (debounceRef.current) clearTimeout(debounceRef.current); // Evita duplicidade
                debounceRef.current = setTimeout(() => {
                    carregarCidades(estadoEncontrado.id, formData.cidade);
                }, 300); // Aguarda 300ms antes de carregar cidades
            }
        }
    }, [formData.estado, estados]);

    const carregarCidades = (estadoId, cidadeInicial = '') => {
        setIsLoadingCidades(true);
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .then(response => {
                const cidadesOrdenadas = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
                setCidades(cidadesOrdenadas);
                if (cidadeInicial) {
                    setCidadeSelecionada(cidadeInicial);
                }
                setIsLoadingCidades(false);
            })
            .catch(error => {
                console.error('Erro ao carregar cidades:', error);
                setIsLoadingCidades(false);
            });
    };

    const handleEstadoChange = (e) => {
        const estadoId = e.target.value;
        const estadoNome = e.target.options[e.target.selectedIndex].text;

        setEstadoSelecionado(estadoId);
        setCidadeSelecionada('');
        setFormData((prev) => ({ ...prev, estado: estadoNome, cidade: '' }));

        if (onChange) onChange({ target: { name: 'estado', value: estadoNome } });

        carregarCidades(estadoId);
    };

    const handleCidadeChange = (e) => {
        const cidadeNome = e.target.value;

        setCidadeSelecionada(cidadeNome);
        setFormData((prev) => ({ ...prev, cidade: cidadeNome }));

        if (onChange) onChange({ target: { name: 'cidade', value: cidadeNome } });
    };

    const isInvalid = (field) => invalidFields.includes(field);

    return (
        <InputWrapper>
            <InputLabel
                style={{ flexBasis: '30%', color: isInvalid('estado') ? 'red' : 'inherit' }}
                first={first} topless={topless} imgW={imgW} small={small}
            >
                <GenericP>{label} Estado:</GenericP>
                <StyledSelect
                    onChange={handleEstadoChange}
                    value={estadoSelecionado}
                    style={{ width: '100%', height: '45px' }}
                    required={required}
                    disabled={disabled}
                >
                    <option value="">Selecione o Estado</option>
                    {estados.map(({ id, nome }) => (
                        <option key={id} value={id}>
                            {nome}
                        </option>
                    ))}
                </StyledSelect>
            </InputLabel>

            <InputLabel
                style={{ flexBasis: '70%', color: isInvalid('cidade') ? 'red' : 'inherit' }}
                first={first} topless={topless} imgW={imgW} small={small}
            >
                <GenericP>Cidade:</GenericP>
                <StyledSelect
                    onChange={handleCidadeChange}
                    value={cidadeSelecionada}
                    disabled={!estadoSelecionado || isLoadingCidades || disabled} 
                    style={{ width: '100%', height: '45px' }}
                    required={required}
                >
                    <option value="">Selecione a Cidade</option>
                    {cidades.map(({ id, nome }) => (
                        <option key={id} value={nome}>
                            {nome}
                        </option>
                    ))}
                </StyledSelect>
            </InputLabel>
        </InputWrapper>
    );
}
