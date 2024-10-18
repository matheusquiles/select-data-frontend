import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InputLabel, StyledSelect, InputWrapper } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';

export default function EstadoCidadeInput({ label, first, topless, imgW, small, formData, setFormData, required, invalidFields = [], onChange }) {
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCidades, setIsLoadingCidades] = useState(false);

    // Sincronizar valores iniciais de estado e cidade
    const [estadoSelecionado, setEstadoSelecionado] = useState(formData.estado || '');
    const [cidadeSelecionada, setCidadeSelecionada] = useState(formData.cidade || '');

    useEffect(() => {
        // Carrega estados do IBGE
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                setEstados(response.data.sort((a, b) => a.nome.localeCompare(b.nome)));
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Erro ao carregar estados:', error);
                setIsLoading(false);
            });
    }, []);

    const handleEstadoChange = (e) => {
        const estadoId = e.target.value;
        const estadoNome = e.target.options[e.target.selectedIndex].text;

        setEstadoSelecionado(estadoId);
        setCidadeSelecionada(''); // Limpar cidade ao trocar o estado

        // Atualizar estado no formData
        setFormData((prev) => ({ ...prev, estado: estadoNome, cidade: '' }));

        if (onChange) {
            onChange({ target: { name: 'estado', value: estadoNome } });
        }

        // Carregar cidades para o estado selecionado
        setIsLoadingCidades(true);
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`)
            .then(response => {
                setCidades(response.data.sort((a, b) => a.nome.localeCompare(b.nome)));
                setIsLoadingCidades(false);
            })
            .catch(error => {
                console.error('Erro ao carregar cidades:', error);
                setIsLoadingCidades(false);
            });
    };

    const handleCidadeChange = (e) => {
        const cidadeNome = e.target.value;

        setCidadeSelecionada(cidadeNome);

        // Atualizar cidade no formData
        setFormData((prev) => ({ ...prev, cidade: cidadeNome }));

        if (onChange) {
            onChange({ target: { name: 'cidade', value: cidadeNome } });
        }
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
                    disabled={!estadoSelecionado || isLoadingCidades}
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
