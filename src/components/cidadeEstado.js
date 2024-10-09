import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InputLabel, StyledSelect, InputWrapper } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';
import PropTypes from 'prop-types';

export default function EstadoCidadeInput({ label, first, topless, imgW, small, formData, setFormData, required, invalidFields = [] }) {
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState(formData.estado || '');
    const [cidadeSelecionada, setCidadeSelecionada] = useState(formData.cidade || '');
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCidades, setIsLoadingCidades] = useState(false);

    useEffect(() => {
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
        setEstadoSelecionado(estadoId); // Atualiza com o ID do estado
        setCidadeSelecionada(''); // Reset cidade quando o estado mudar
        setFormData({ ...formData, estado: estadoNome, cidade: '' }); 

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
        const cidadeNome = e.target.options[e.target.selectedIndex].text; 
        setCidadeSelecionada(cidadeNome);
        setFormData({ ...formData, cidade: cidadeNome }); 
    };

    const isInvalid = (field) => invalidFields.includes(field);

    return (
        <InputWrapper>
            <InputLabel style={{ flexBasis: '30%', color: isInvalid('estado') ? 'red' : 'inherit' }} first={first} topless={topless} imgW={imgW} small={small}>
                <GenericP>{label} Estado:</GenericP>
                <StyledSelect 
                    onChange={handleEstadoChange} 
                    value={estadoSelecionado} // Vincula ao ID do estado
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

            <InputLabel style={{ flexBasis: '70%', color: isInvalid('cidade') ? 'red' : 'inherit' }} first={first} topless={topless} imgW={imgW} small={small}>
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

EstadoCidadeInput.propTypes = {
    label: PropTypes.string.isRequired,
    first: PropTypes.bool,
    topless: PropTypes.bool,
    imgW: PropTypes.bool,
    small: PropTypes.bool,
    formData: PropTypes.object.isRequired,
    setFormData: PropTypes.func.isRequired,
    required: PropTypes.bool,
    invalidFields: PropTypes.array,
};

EstadoCidadeInput.defaultProps = {
    first: false,
    topless: false,
    imgW: false,
    small: false,
    required: false,
    invalidFields: [],
};