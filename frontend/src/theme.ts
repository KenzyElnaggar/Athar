import { DefaultTheme } from 'styled-components';
import styled from 'styled-components';

export const egyptianTheme: DefaultTheme = {
  colors: {
    gold: '#C28818',        // Deep gold
    turquoise: '#1ABC9C',   // Turquoise
    sandstone: '#E9CBA7',   // Sandstone
    black: '#181818',       // Black
  },
};

export const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.sandstone};
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Cormorant Garamond', 'Cinzel', serif;
`;

export const Section = styled.section`
  margin: 2rem auto;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1rem;
  }
`; 