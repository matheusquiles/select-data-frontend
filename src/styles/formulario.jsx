import styled from 'styled-components';
// import { PRIMARY, SECUNDARY, SECUNDARY_DISABLED, WHITE } from './colors';
import { WHITE, TEXT_SECUNDARY, BOX_SHADOW, BACKGROUND, HR } from './colors';

const MARGIN = '0.5em';

export const Input = styled.input`
  background-color: ${WHITE};
  border: solid ${TEXT_SECUNDARY} .1px;
  border-radius: 5px;
  /* margin: ${MARGIN} 0; */
  font-size: 1em;
  padding: 1m;
  box-shadow: ${BOX_SHADOW};
  outline: none;
`;

export const selectInput = styled.input`
  background-color: ${WHITE};
  border: solid ${TEXT_SECUNDARY} .1px;
  border-radius: 5px;
  /* margin: ${MARGIN} 0; */
  /* font-size: 0.7em; */
  padding: 1em;
  box-shadow: ${BOX_SHADOW};
  outline: none;
`;

export const InputLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ column }) => column ? 'column' : 'row'};
  align-items: flex-start;
`

export const SmallInputLine = styled(InputLine)`
  margin-right: 1rem;
  max-width: calc(37.5% - 1rem);
`

export const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin-left: ${({ first, small }) => first ? 0 : small ? '.5rem' : '1rem'};
  margin-right: ${({ first, small }) => first && small ? '.5rem' : '0'};
  width: ${({ imgW }) => imgW ? '27%' : 'auto'};
  width: ${({ first, medium }) => first && medium ? '20%' : 'auto'};
  flex-grow: ${({ imgW, small }) => imgW || small ? 0 : 1};
  /* color: ${TEXT_SECUNDARY}; */

  /* @media(min-width: 1280px) {
    margin-left: ${({ gap }) => gap ? '1rem' : '0'};
    width: ${({ items }) => !items || items < 2 ? '100%' : `calc(100% / ${items})`};
    max-width: ${({ maxWidth }) => maxWidth && maxWidth};
    padding: ${({ pad, maxWidth }) => pad && `0 calc((100% - ${maxWidth}) / 2)`};
  } */
`;


export const LookupLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  margin-left: ${({ first, small }) => first ? 0 : small ? '.5rem' : '1rem'};
  margin-right: ${({ first, small }) => first && small ? '.5rem' : '0'};
  width: ${({ small }) => small ? '40%' : 'auto'};
  
  /* color: ${TEXT_SECUNDARY}; */

  /* @media(min-width: 1280px) {
    margin-left: ${({ gap }) => gap ? '1rem' : '0'};
    width: ${({ items }) => !items || items < 2 ? '100%' : `calc(100% / ${items})`};
    max-width: ${({ maxWidth }) => maxWidth && maxWidth};
    padding: ${({ pad, maxWidth }) => pad && `0 calc((100% - ${maxWidth}) / 2)`};
  } */
`;

export const LogoLine = styled.div`
  width: 95%;
  height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Logo = styled.img`
  width: auto;         
  height: auto;         
  max-height: 100%;    
  margin-left: 1rem;
  cursor: pointer;
  object-fit: contain;  
  max-width: 100%;      
`

export const StyledSelect = styled.select`
  color: black; 
  box-shadow: ${BOX_SHADOW};
  background-color: ${WHITE};
  border: solid ${TEXT_SECUNDARY} .1px;
  border-radius: 5px;
  margin: ${MARGIN} 1; 
  font-size: 1em;
  padding: 0.75em;
  box-shadow: ${BOX_SHADOW};
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  cursor: pointer;
  width: 100%;
  text-align: left; 
  line-height: 2rem;
  font-size: 1rem;
  padding: 0.5rem 0;
  height: 100%;
  border: ${({ $styled }) => $styled ? `solid ${HR} 1px` : `solid ${TEXT_SECUNDARY} .1px`};
  overflow-y: scroll;

  :focus {
    background-color: ${({ $styled }) => !$styled && WHITE};
    box-shadow: ${({ $styled }) => !$styled && BOX_SHADOW};
  }

  :disabled {
    background-color: ${BACKGROUND};
    border: solid ${BACKGROUND} 1px;
    opacity: 0.7;
  }

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`

export const InputDate = styled.input`
  color: black;  
  background-color: ${WHITE};
  border: solid ${TEXT_SECUNDARY} .1px;
  border-radius: 5px;
  /* margin: ${MARGIN} 0; */
  font-size: 1.2em;
  padding: 1m;
  box-shadow: ${BOX_SHADOW};
  outline: none;
`

export const InputMoney = styled.input`
  background-color: ${WHITE};
  border: solid ${TEXT_SECUNDARY} .1px;
  border-radius: 5px;
  font-size: 1em;
  padding: 0.5em;
  box-shadow: ${BOX_SHADOW};
  outline: none;
`

export const InputWrapper = styled.div`
  display: flex;
  width: 100%; 
  gap: 10px; 
  margin-bottom: 15px; 
`;

export const SelectedItem = styled.span`
  margin: 5px;
  display: inline-flex;
  align-items: center;
  background: #eee;
  padding: 5px 10px;
  border-radius: 5px;
  position: relative;
  max-width: 100%;
  white-space: nowrap;  /* Garante que o texto não seja quebrado */
  overflow: hidden;     /* Evita estouro de conteúdo */
  text-overflow: ellipsis; /* Adiciona "..." se o texto for muito longo */
`;

export const RemoveButton = styled.button`
  background: none;
  color: black;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 8px;
  display: inline-block;
  padding: 0;
  line-height: 1;
`;

export const LookupButton = styled.button`
  width: 10%;
  height: 100%;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-left: 0px;
  display: flex;
  padding: 0;
  &:hover {
    color: inherit;
  }

  &:focus {
    outline: none; 
  }
`;