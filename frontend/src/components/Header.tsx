import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.sandstone};
  color: ${({ theme }) => theme.colors.black};
  padding: 2rem 1rem 1rem 1rem;
  text-align: center;
  border-bottom: 4px solid ${({ theme }) => theme.colors.gold};
`;
const Title = styled.h1`
  font-family: 'Cinzel', serif;
  font-size: 2.5rem;
  letter-spacing: 0.1em;
  margin: 0;
  color: ${({ theme }) => theme.colors.gold};
`;
const Slogan = styled.p`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.turquoise};
  margin: 0.5rem 0 0 0;
`;

const Header: React.FC = () => (
  <HeaderContainer>
    <Title>Athar</Title>
    <Slogan>Unlock Secrets of the Past</Slogan>
  </HeaderContainer>
);

export default Header; 