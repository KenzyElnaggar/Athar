import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const COLORS = {
  lapis: "#235789",
  gold: "#FFD700",
  papyrus: "#F6E1C3",
  obsidian: "#222222",
  terracotta: "#AA5725",
  jade: "#54786A",
  coral: "#FF6F61",
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;700&display=swap');
  body {
    background: ${COLORS.papyrus};
    color: ${COLORS.obsidian};
    font-family: 'Inter', Arial, sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const Motif = styled.div`
  width: 100%;
  height: 16px;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="16" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="16" fill="none"/><circle cx="8" cy="8" r="6" fill="%23FFD700"/><rect x="20" y="4" width="60" height="8" fill="%23235789"/><circle cx="92" cy="8" r="6" fill="%23FFD700"/></svg>') repeat-x;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem 1.5rem;
  background: ${COLORS.papyrus};
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(34,34,34,0.10);
  border: 2.5px solid ${COLORS.terracotta};
  position: relative;
  z-index: 1;
`;

const Logo = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem auto;
  background: ${COLORS.gold};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  color: ${COLORS.lapis};
  box-shadow: 0 2px 12px 0 ${COLORS.gold}55;
  font-family: 'Playfair Display', serif;
  border: 3px solid ${COLORS.lapis};
  &::before {
    content: '\2625';
    font-size: 2.2em;
  }
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  color: ${COLORS.lapis};
  margin: 0 0 0.5rem 0;
  text-align: center;
  letter-spacing: 0.04em;
`;

const Slogan = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  color: ${COLORS.gold};
  margin: 0 0 1.2rem 0;
  text-align: center;
  font-weight: 700;
`;

const Intro = styled.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1.15rem;
  color: ${COLORS.obsidian};
  background: ${COLORS.papyrus};
  border-left: 4px solid ${COLORS.jade};
  padding: 1.2rem 1.2rem 1.2rem 1.5rem;
  border-radius: 8px;
  margin: 0 0 2rem 0;
  box-shadow: 0 2px 8px 0 ${COLORS.jade}22;
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: 1em 2.5em;
  font-size: 1.2em;
  font-weight: 700;
  border-radius: 14px;
  background: linear-gradient(90deg, ${COLORS.gold} 0%, ${COLORS.lapis} 100%);
  color: ${COLORS.obsidian};
  box-shadow: 0 2px 12px 0 ${COLORS.gold}33;
  text-decoration: none;
  margin: 1.5rem auto 0 auto;
  transition: background 0.3s, color 0.3s, box-shadow 0.3s, transform 0.2s;
  letter-spacing: 0.04em;
  border: none;
  text-align: center;
  &:hover, &:focus {
    background: linear-gradient(90deg, ${COLORS.lapis} 0%, ${COLORS.gold} 100%);
    color: ${COLORS.papyrus};
    box-shadow: 0 4px 24px 0 ${COLORS.lapis}55;
    transform: translateY(-2px) scale(1.04);
    outline: none;
  }
`;

const Home: React.FC = () => (
  <>
    <GlobalStyle />
    <Motif />
    <Container>
      <Logo />
      <Title>Athar</Title>
      <Slogan>Unlock Secrets of the Past</Slogan>
      <Intro>
        Welcome to <b>Athar</b>, your gateway to the mysteries of ancient Egypt. Effortlessly translate Egyptian hieroglyphs, explore interactive stories, and ask questions about the world of the pharaohs—all powered by advanced AI.<br /><br />
        <b>Begin your journey</b> by uploading a hieroglyph, or explore the stories and knowledge hidden within the sands of time.
      </Intro>
      <CTAButton href="/upload">Get Started</CTAButton>
    </Container>
    <Motif />
  </>
);

export default Home;
