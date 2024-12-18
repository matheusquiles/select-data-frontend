import styled from 'styled-components';

export const TableContainer = styled.div`
  max-height: 400px; /* Altura máxima para 10 linhas */
  overflow-y: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  width: ${(props) => props.width || 'auto'};
`;

export const Td = styled.td`
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  width: ${(props) => props.width || 'auto'};
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }

  &.selected {
    background-color: #f2f2f2;
  }
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
  width: 16px; /* Aumenta a largura do checkbox */
  height: 16px; /* Aumenta a altura do checkbox */
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const DisabledTable = styled.div`
  pointer-events: none;
  opacity: 0.5;
`;