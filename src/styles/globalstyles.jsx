import styled from 'styled-components';
// import { BACKGROUND, BOX_SHADOW, HR, PRIMARY, PRIMARY_DISABLED, SECUNDARY, SECUNDARY_DISABLED, TEXT_SECUNDARY } from './Colors';
import { TEXT_SECUNDARY } from './colors';
// import backgroundImage from '../helpers/images/backgroundLogin.png';
// import { fade, slideXClose, slideXOpen } from './Animations';
// import { MENU_HEIGHT_TOTAL_MOBILE } from './Sizes';

// export const GlobalContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   width: 100%;
//   max-width: 100vw;
//   height: 100%;
//   min-height: 100vh;
  
//   // Notebook
//   @media(min-width: 1366px) {
//     flex-direction: row;
//   }
// `;

// export const Container = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   background-image: ${ ({ $background }) => $background && `url(${ backgroundImage })` };
//   background-position: right bottom;
//   background-size: cover;
//   background-repeat: no-repeat;
// `;

// export const ModalTitle = styled.p`
//   color: ${ PRIMARY };
//   padding-left: 0.5rem;
//   margin-left: -1rem;
//   margin-bottom: 0.5rem;
//   margin-top: 0.5rem;
//   border-left: solid 0.5rem ${ PRIMARY };
// `;

// export const Line = styled.hr`
//   width: 100%;
//   height: 0.05rem;
//   min-height: 0.05rem;
//   background-color: ${ HR };
//   margin: ${({ margin }) => margin ? margin : '1rem' };
//   ${({ marginBottom }) => marginBottom && `margin-bottom: ${ marginBottom }`};
//   ${({ marginTop }) => marginTop && `margin-top : ${ marginTop }`};
//   ${({ marginLeft }) => marginLeft && `margin-left : ${ marginLeft }`};
//   ${({ marginRight }) => marginRight && `margin-right : ${ marginRight }`};
// `;

// export const PopUpContainer = styled.div`
//   position: fixed;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 3;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100vw;
//   height: 100vh;
//   outline: none;
// `;

// export const Overlay = styled(PopUpContainer)`
//   z-index: 4;
//   background-color: ${ ({ transparent }) => transparent ? 'none' : 'black' };
//   opacity:  0.7;
//   animation: ${ fade } 400ms;
//   width: 100%;
//   height: 100%;
// `;

// export const PopupContent = styled.div`
//   position: absolute;
//   top: ${ ({ tiny }) => tiny ? 'auto' : '15%' };
//   bottom: ${ ({ tiny }) => tiny ? 'auto' : '15%' };
//   z-index: 5;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: flex-start;
//   overflow-y: scroll;
//   width: auto;
//   height: auto;
//   max-height: 100vh;
//   padding: 0.5rem 1rem;
//   border-radius: 5px;
//   background: white;
//   line-height: 1.4;
//   text-overflow: ellipsis;

//   p {
//     text-align: center;
//   }

//   // Tablet
//   @media(min-width: 768px) {
//     top: 10%;
//     bottom: 10%;
//   }
  
//   // Monitor quadrado
//   @media(min-width: 1280px) {
//     top: auto;
//     bottom: auto;
//     max-height: 95vh;
//   }
// `;

// export const SideModalContainer = styled(PopUpContainer)`
//   align-items: flex-start;
//   justify-content: flex-end;
//   animation: ${ ({ closing }) => closing ? slideXClose : slideXOpen } 300ms;
//   transform-origin: right;
//   transform: ${ `scaleX(${ ({ closing }) => closing && 0 })` };
//   overflow-y: scroll;
// `;

// export const SideModalContent = styled(PopupContent)`
//   top: ${ MENU_HEIGHT_TOTAL_MOBILE };
//   width: 70%;
//   max-height: none;
//   min-height: calc(100% - ${ MENU_HEIGHT_TOTAL_MOBILE } - 1rem);
//   align-items: center;
//   border-radius: 0;
//   box-shadow: ${ BOX_SHADOW };
//   justify-content: ${ ({ $loading }) => $loading ? 'center' : 'flex-start' };

//   @media(min-width: 768px) {
//     width: 50%;
//   }

//   @media(min-width: 1280px) {
//     top: 0;
//     width: 30%;
//     min-height: calc(100% - 1rem);
//   }
// `;

// export const GenericButton = styled.button`
//   height: ${({ height }) => height || '2.25rem'};
//   margin: ${({ margin }) => margin || '1rem'};
//   padding: ${({ padding }) => padding || '0.5rem' };
//   border-radius: 5px;
//   background-color: ${ ({ $deletion, background }) => background ? background : $deletion ? SECUNDARY : PRIMARY };
//   color: ${ ({ color }) => color ? color : BACKGROUND };
//   ${({ marginBottom }) => marginBottom && `margin-bottom: ${ marginBottom }`};
//   ${({ marginTop }) => marginTop && `margin-top : ${ marginTop }`};
//   ${({ marginLeft }) => marginLeft && `margin-left : ${ marginLeft }`};
//   ${({ marginRight }) => marginRight && `margin-right : ${ marginRight }`};
//   font-size: 0.9rem;
//   cursor: pointer;
  
//   :disabled {
//     background-color: ${ ({ $deletion }) => $deletion ? SECUNDARY_DISABLED : PRIMARY_DISABLED };
//     cursor: not-allowed;
//   }
// `;

export const GenericP = styled.p`
  /* color: ${ TEXT_SECUNDARY }; */
  margin: 0;
  /* margin-top: 0.5em; */
  margin-bottom: 0.5em;
`;