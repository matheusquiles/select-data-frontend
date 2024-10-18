// CidadeInput.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InputLabel, StyledSelect, InputWrapper } from '../styles/formulario';
import { GenericP } from '../styles/globalstyles';

const CidadeInput = ({ estadoSelecionado, formData, setFormData }) => {
    const [cidades, setCidades] = useState([]);
    const [isLoadingCidades, setIsLoadingCidades] = useState(false);

    useEffect(() => {
        if (estadoSelecionado) {
            setIsLoadingCidades(true);
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
                .then(response => {
                    const cidadesOrdenadas = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
                    setCidades(cidadesOrdenadas);
                    setIsLoadingCidades(false);
                })
                .catch(error => {
                    console.error('Erro ao carregar cidades:', error);
                    setIsLoadingCidades(false);
                });
        } else {
            setCidades([]); // Limpar cidades se nenhum estado estiver selecionado
        }
    }, [estadoSelecionado]);

    const handleChange = (e) => {
        const cidadeNome = e.target.value;
        setFormData((prev) => ({ ...prev, cidade: cidadeNome }));
    };

    return (
        <InputWrapper>
            <InputLabel>
                <GenericP>Cidade:</GenericP>
                <StyledSelect
                    onChange={handleChange}
                    value={formData.cidade}
                    disabled={!estadoSelecionado || isLoadingCidades}
                    style={{ width: '100%', height: '45px' }}
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
};

export default CidadeInput;
