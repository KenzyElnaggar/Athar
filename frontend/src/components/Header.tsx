import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-24px); }
  to { opacity: 1; transform: none; }
`;

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.sandstone};
  color: ${({ theme }) => theme.colors.white};
  padding: 2.5rem 1.5rem 1.5rem 1.5rem;
  text-align: center;
  border-bottom: 4px solid ${({ theme }) => theme.colors.gold};
  box-shadow: 0 2px 16px 0 #1DE9B655;
  animation: ${fadeIn} 1.2s cubic-bezier(0.4,0.2,0.2,1);
`;
const Title = styled.h1`
  font-family: 'Playfair Display', 'Cinzel', serif;
  font-size: 2.8rem;
  letter-spacing: 0.1em;
  margin: 0;
  color: ${({ theme }) => theme.colors.magenta};
  text-shadow: 0 2px 12px #10193588;
`;
const Slogan = styled.p`
  font-family: 'Inter', 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.turquoise};
  margin: 0.7rem 0 0 0;
  text-shadow: 0 1px 8px #1DE9B655;
`;

const Header: React.FC = () => (
  <HeaderContainer>
    <Title>Athar</Title>
    <Slogan>Unlock Secrets of the Past</Slogan>
  </HeaderContainer>
);

export default Header; 