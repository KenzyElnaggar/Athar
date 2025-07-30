import { DefaultTheme } from 'styled-components';
import styled from 'styled-components';

export const egyptianTheme: DefaultTheme = {
  colors: {
    gold: '#C9B037',        // Egyptian gold
    turquoise: '#26A69A',   // Egyptian turquoise
    lapis: '#1A237E',       // Deep lapis blue
    sandstone: '#E5D3B3',   // Sandstone/papyrus
    brown: '#4E342E',       // Dark brown for text
    red: '#B03A2E',         // Muted Egyptian red
    green: '#588157',       // Muted Egyptian green
    white: '#FFFFFF',
  },
};

export const BackgroundWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background:
    linear-gradient(rgba(229,211,179,0.92), rgba(229,211,179,0.92)),
    url('/src/assets/Pics/bg image.jpg');
  background-blend-mode: lighten;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Cormorant Garamond', 'Cinzel', 'Forum', serif;
`;

export const Card = styled.div`
  background: rgba(255,255,255,0.18);
  border: 2.5px solid ${({ theme }) => theme.colors.gold};
  border-radius: 22px;
  box-shadow: 0 12px 48px 0 rgba(78,52,46,0.18);
  padding: 2.8rem 2.2rem;
  margin: 2.5rem auto;
  max-width: 480px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.3s, transform 0.3s, border-color 0.3s;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
  &:hover {
    box-shadow: 0 16px 64px 0 ${({ theme }) => theme.colors.lapis}33;
    border-color: ${({ theme }) => theme.colors.lapis};
    transform: translateY(-6px) scale(1.03);
  }
`;

export const Section = styled.section`
  margin: 0 auto;
  min-height: 60vh;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    min-height: 40vh;
  }
  & > * {
    flex: 1;
    margin: 0 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  border-left: 8px solid ${({ theme }) => theme.colors.gold};
  border-right: 8px solid ${({ theme }) => theme.colors.lapis};
`;