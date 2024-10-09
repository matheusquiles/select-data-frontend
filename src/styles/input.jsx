import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
// import { BACKGROUND, BOX_SHADOW, GREEN, HR, LIGHT_BLACK, PRIMARY, SECUNDARY, TEXT_SECUNDARY, WHITE } from '../Colors';
import { WHITE } from '../colors';

export const InputLabel = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: ${ ({ topless }) => topless ? '0' : '0.8rem' };
  justify-content: space-around;
  color: red;

  /* @media(min-width: 1280px) {
    margin-left: ${ ({ gap }) => gap ? '1rem' : '0' };
    width: ${ ({ items }) => !items || items < 2 ? '100%' : `calc(100% / ${ items })` };
    max-width: ${ ({ maxWidth }) => maxWidth && maxWidth};
    padding: ${ ({ pad, maxWidth }) => pad && `0 calc((100% - ${ maxWidth }) / 2)`};
  } */
`;

export const StyledInput = styled.input`
  color: ${ TEXT_SECUNDARY };
  outline: none;
  border-radius: ${ ({ $tall, $notUnique }) => $tall ? '5px' : ($notUnique ? '0 5px 5px 0' : '5px') };
  border:  ${ ({ $styled, $invalid, $disabled }) => {
    if ($disabled) return 'none';

    if ($styled) return `solid ${ $invalid ? SECUNDARY : HR } 1px`;
  } };
  border-color: ${ ({ $invalid, $styled }) => $styled && $invalid && SECUNDARY };
  border-left: ${ ({ $notUnique }) => $notUnique && 'none' };
  width: 100%;
  text-align: center;
  background-color: ${ ({ $styled }) => !$styled && BACKGROUND };
  line-height: ${ ({ $tall }) => $tall ? '2rem' : '1.436rem' };
  font-size: 0.91rem;
  padding: 0.5rem 0;

  :-webkit-autofill {
    background-clip: text;
    -webkit-background-clip: text;
  }

  :focus {
    background-color: ${ WHITE };
  }
  
  :disabled {
    background-color: ${ BACKGROUND };
    border: solid ${ BACKGROUND } 1px;
    opacity: 0.7;
  }

  ::placeholder {
    color: ${ LIGHT_BLACK };
  }
`;

export const IconContainer = styled.div`
  display: flex;
  width: ${ ({ width }) => width ? width : '100%' };
  border-radius: 5px;
  background-color: ${ ({ focus, $styled, $disabled }) => {
    if (!$styled) return focus ? WHITE : BACKGROUND;

    if ($disabled) return BACKGROUND;

    return 'none';
  } };
  box-shadow: ${ ({ focus, $styled }) => !$styled && (focus ? BOX_SHADOW : 'none') };
  align-items: center;
  border: ${({ invalid, $styled }) => !$styled && (invalid ? `solid ${ SECUNDARY } 1px` : 'none') };
  flex-direction: ${ ({ $column }) => $column ? 'column' : 'row' };

  @media(min-width: 1280px) {
    flex-direction: row;
  }
`;

export const ValidIcon = styled(FontAwesomeIcon)`
  height: 1rem;
  width: 1rem;
  padding-right: 0.5rem;
  color: ${ GREEN };
  background-color: transparent;
`;

export const Icon = styled(ValidIcon)`
  color: ${ PRIMARY };
  height: ${ ({ size }) => size || '1rem' };
  width: ${ ({ size }) => size || '1rem' };
`;

export const PasswordIcon = styled(ValidIcon)`
  color: ${ TEXT_SECUNDARY };
  cursor: pointer;
`;

export const Date = styled.input`
  border-radius: 5px;
  color: ${ TEXT_SECUNDARY };
  padding: calc(0.5rem - 1px) 0.5rem;
  border: ${ ({ $invalid }) => `solid ${ $invalid ? SECUNDARY : HR } 1px` };
  text-align: center;
  outline: none;
  margin-left: ${ ({ gap }) => gap ? '1rem' : '0' };
  width: ${ ({ items }) => !items || items < 2 ? 'calc(100% - 1rem)' : `calc(100% / ${ items })` };
  max-width: ${ ({ maxWidth }) => maxWidth && maxWidt };
  line-height: ${ ({ $tall }) => $tall ? '2rem' : '1.436rem' };

  :disabled {
    background-color: ${ BACKGROUND };
    border: solid ${ BACKGROUND } 1px;
    opacity: 0.7;
  }

  ::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

export const SumButton = styled.button`
  cursor: pointer;
  background-color: ${ ({ $hover }) => $hover ? PRIMARY : TEXT_SECUNDARY };
  color: ${ WHITE };
  border-radius: ${ ({ id }) => id === 'minus' ? '5px 0 0 5px' : '0 5px 5px 0' };
  height: 2.5rem;
  width: 100%;
  max-width: 2rem;
  outline: none;
`;

export const SumStyledInput = styled(StyledInput)`
  border-radius: 0;
  border-top: solid ${ HR } 1px;
  border-bottom: solid ${ HR } 1px;
  background-color: transparent;
`;

export const InputContainer = styled.div`
  display: flex;
  width: ${ ({ width }) => width ? width : '100%' };
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${ ({ $locked }) => $locked ? BACKGROUND : 'transparent' };
  border: ${({ $locked }) => $locked ? 'none': `solid ${ HR } 1px` };
  min-height: 2.5rem;

  @media(min-width: 1280px) {
    flex-direction: row;
  }
`;
