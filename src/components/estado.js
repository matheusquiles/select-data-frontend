import React from 'react';
import EstadoInput from './estado';
import CidadeInput from './cidade';

const EstadoCidadeInput = ({ label, first, formData, setFormData, setEstadoSelecionado }) => {
    return (
        <>
            <EstadoInput
                formData={formData}
                setFormData={setFormData}
                setEstadoSelecionado={setEstadoSelecionado} // Passando a função
            />
            <CidadeInput
                estadoSelecionado={formData.estado} // Passa o estado selecionado do formData
                formData={formData}
                setFormData={setFormData}
            />
        </>
    );
};

export default EstadoCidadeInput;
