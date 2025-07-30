import React from 'react';
import styled from 'styled-components';
import { FaHome, FaUpload, FaInfoCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const COLORS = {
  lapis: "#235789",
  gold: "#FFD700",
  papyrus: "#F6E1C3",
  obsidian: "#222222",
  terracotta: "#AA5725",
  jade: "#54786A",
  coral: "#FF6F61",
};

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 130px;
  background: ${COLORS.lapis};
  border-bottom: 4px solid ${COLORS.gold};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 1000;
  box-shadow: 0 6px 32px 0 #22222233;
  padding: 0 5vw;
  flex-direction: column;
`;
const Motif = styled.div`
  width: 100vw;
  height: 16px;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="16" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="16" fill="none"/><circle cx="8" cy="8" r="6" fill="%23FFD700"/><rect x="20" y="4" width="60" height="8" fill="%23235789"/><circle cx="92" cy="8" r="6" fill="%23FFD700"/></svg>') repeat-x;
  margin-top: 0.5rem;
`;
const Branding = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Playfair Display', serif;
  font-size: 3.4rem;
  color: ${COLORS.gold};
  font-weight: bold;
  letter-spacing: 0.12em;
  margin-right: 5vw;
  user-select: none;
  transition: color 0.3s;
  margin-top: 1.2rem;
`;
const NavList = styled.ul`
  display: flex;
  gap: 3.2rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const NavItem = styled.li<{active?: boolean}>`
  display: flex;
  align-items: center;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 2.1rem;
  color: ${({ active }) => active ? COLORS.gold : COLORS.papyrus};
  cursor: pointer;
  transition: color 0.2s, font-weight 0.2s, text-shadow 0.2s;
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  position: relative;
  padding-bottom: 8px;
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 4px;
    background: ${COLORS.gold};
    border-radius: 2px;
    transition: width 0.3s;
  }
  &:hover {
    color: ${COLORS.jade};
  }
  &:hover:after {
    width: 100%;
  }
`;
const Icon = styled.span`
  margin-right: 0.9rem;
  font-size: 2.1rem;
`;

const Navbar: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <NavbarContainer>
        <Branding>Athar</Branding>
        <NavList>
          <NavItem as={Link} to="/" active={location.pathname === '/'}><Icon><FaHome /></Icon>Home</NavItem>
          <NavItem as={Link} to="/upload" active={location.pathname === '/upload'}><Icon><FaUpload /></Icon>Upload Hieroglyphs</NavItem>
          <NavItem as={Link} to="/about" active={location.pathname === '/about'}><Icon><FaInfoCircle /></Icon>About / Credits</NavItem>
        </NavList>
      </NavbarContainer>
      <Motif />
    </>
  );
};

export default Navbar; 