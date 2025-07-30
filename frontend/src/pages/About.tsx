import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaReact, FaGithub, FaUser, FaEnvelope, FaTwitter, FaFont, FaBook, FaRobot } from "react-icons/fa";
import { SiStyledcomponents } from "react-icons/si";
import { GiScarabBeetle, GiEgyptianProfile, GiAnkh, GiLotus } from "react-icons/gi";

const COLORS = {
  lapis: "#235789",
  gold: "#FFD700",
  papyrus: "#F6E1C3",
  obsidian: "#222222",
  terracotta: "#AA5725",
  jade: "#54786A",
  coral: "#FF6F61",
};

const PageBg = styled.div`
  min-height: 100vh;
  background:
    linear-gradient(rgba(246,225,195,0.98), rgba(246,225,195,0.98)),
    url('https://www.transparenttextures.com/patterns/papyrus.png'),
    url('https://upload.wikimedia.org/wikipedia/commons/4/4a/Egyptian_hieroglyphs_example.png');
  background-blend-mode: lighten, multiply;
  background-size: auto, 400px, 600px;
  background-repeat: repeat, repeat, no-repeat;
  background-position: top left, right bottom, center;
  padding-bottom: 3rem;
`;

const shimmer = keyframes`
  0% { filter: drop-shadow(0 0 0px ${COLORS.gold}); transform: translateY(0);}
  50% { filter: drop-shadow(0 0 12px ${COLORS.gold}); transform: translateY(-6px);}
  100% { filter: drop-shadow(0 0 0px ${COLORS.gold}); transform: translateY(0);}
`;
const Scarab = styled(GiScarabBeetle)`
  color: ${COLORS.gold};
  font-size: 2.2rem;
  position: absolute;
  top: 1.2rem;
  right: 2.2rem;
  animation: ${shimmer} 2.8s infinite;
  cursor: pointer;
  z-index: 10;
`;

const Motif = styled.div`
  width: 100%;
  height: 16px;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="16" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="16" fill="none"/><circle cx="8" cy="8" r="6" fill="%23FFD700"/><rect x="20" y="4" width="60" height="8" fill="%23235789"/><circle cx="92" cy="8" r="6" fill="%23FFD700"/></svg>') repeat-x;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  max-width: 900px;
  margin: 2.5rem auto 2rem auto;
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  background: ${COLORS.papyrus};
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(34,34,34,0.10);
  border: 2.5px solid ${COLORS.terracotta};
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.1rem;
  color: ${COLORS.lapis};
  margin: 2.2rem 0 1.2rem 0;
  text-align: center;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  svg {
    color: ${COLORS.gold};
    font-size: 1.5em;
    vertical-align: middle;
  }
`;

const Card = styled.div`
  background: ${COLORS.terracotta};
  color: ${COLORS.papyrus};
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 ${COLORS.lapis}22;
  border: 2.5px solid ${COLORS.gold};
  padding: 2rem 1.5rem;
  margin-bottom: 2.2rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  font-size: 1.18rem;
  font-family: 'Inter', Arial, sans-serif;
  &::before {
    content: '';
    position: absolute;
    left: 1.5rem;
    top: 1.5rem;
    width: 60px;
    height: 60px;
    opacity: 0.07;
    background: url('https://upload.wikimedia.org/wikipedia/commons/4/4a/Egyptian_hieroglyphs_example.png') center/cover no-repeat;
    z-index: 0;
  }
`;

const Cartouche = styled.div`
  display: flex;
  align-items: center;
  background: ${COLORS.papyrus};
  border: 3px solid ${COLORS.gold};
  border-radius: 40px 40px 30px 30px / 30px 30px 40px 40px;
  box-shadow: 0 2px 12px 0 ${COLORS.gold}33;
  padding: 0.7rem 1.5rem;
  margin: 0.7rem 0;
  min-width: 220px;
  position: relative;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 24px 0 ${COLORS.gold}77;
    background: ${COLORS.jade}22;
  }
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${COLORS.lapis};
  margin-right: 1.2rem;
  object-fit: cover;
  background: ${COLORS.papyrus};
`;

const ContributorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ContributorName = styled.span`
  font-family: 'Playfair Display', serif;
  font-size: 1.18rem;
  color: ${COLORS.lapis};
  font-weight: bold;
`;

const ContributorRole = styled.span`
  font-size: 1rem;
  color: ${COLORS.obsidian};
  font-family: 'Inter', Arial, sans-serif;
`;

const FunFact = styled.div`
  font-size: 0.98rem;
  color: ${COLORS.jade};
  margin-top: 0.2rem;
  font-style: italic;
`;

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin: 1.2rem 0 0 0;
`;

const TechIcon = styled.div`
  background: ${COLORS.papyrus};
  border: 2.5px solid ${COLORS.gold};
  border-radius: 16px;
  box-shadow: 0 2px 8px 0 ${COLORS.lapis}22;
  padding: 1.1rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  min-height: 80px;
  font-size: 2.2rem;
  color: ${COLORS.lapis};
  transition: box-shadow 0.2s, border-color 0.2s;
  &:hover {
    box-shadow: 0 4px 16px 0 ${COLORS.gold}55;
    border-color: ${COLORS.jade};
    color: ${COLORS.gold};
  }
  span {
    font-size: 0.95rem;
    color: ${COLORS.obsidian};
    margin-top: 0.5rem;
    font-family: 'Inter', Arial, sans-serif;
  }
`;

const ScarabBullet = styled(GiScarabBeetle)`
  color: ${COLORS.gold};
  font-size: 1.2em;
  margin-right: 0.7em;
  vertical-align: middle;
`;

const LotusBullet = styled(GiLotus)`
  color: ${COLORS.jade};
  font-size: 1.2em;
  margin-right: 0.7em;
  vertical-align: middle;
`;

const CreditList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-bottom: 0.7em;
    display: flex;
    align-items: center;
    font-size: 1.08rem;
    color: ${COLORS.obsidian};
    a {
      color: ${COLORS.lapis};
      text-decoration: underline;
      margin-left: 0.5em;
      &:hover { color: ${COLORS.gold}; }
    }
  }
`;

const Medallion = styled.div`
  display: inline-block;
  background: ${COLORS.gold};
  color: ${COLORS.lapis};
  border-radius: 50%;
  width: 70px;
  height: 70px;
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  line-height: 70px;
  margin: 0.5rem;
  box-shadow: 0 2px 12px 0 ${COLORS.gold}33;
  border: 3px solid ${COLORS.lapis};
  position: relative;
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s;
  &:hover {
    background: ${COLORS.jade};
    color: ${COLORS.papyrus};
    box-shadow: 0 4px 24px 0 ${COLORS.jade}77;
  }
`;

const ContactBox = styled.div`
  background: ${COLORS.jade}22;
  border: 2px solid ${COLORS.jade};
  border-radius: 14px;
  padding: 1.2rem 1.5rem;
  margin: 1.5rem 0 0 0;
  color: ${COLORS.obsidian};
  font-size: 1.1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 2px 8px 0 ${COLORS.jade}22;
  a {
    color: ${COLORS.lapis};
    font-weight: 600;
    margin-left: 0.5em;
    &:hover { color: ${COLORS.gold}; }
  }
`;

const Proverb = styled.div`
  background: ${COLORS.coral};
  color: ${COLORS.papyrus};
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  margin: 2rem 0 0 0;
  font-size: 1.15rem;
  text-align: center;
  box-shadow: 0 2px 8px 0 ${COLORS.coral}33;
  border-left: 4px solid ${COLORS.gold};
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.04em;
`;

const About: React.FC = () => {
  const [showProverb, setShowProverb] = useState(false);

  return (
    <PageBg>
      <Motif />
      <Container>
        <Scarab
          title="Click for a proverb!"
          onClick={() => setShowProverb((v) => !v)}
          aria-label="Reveal Egyptian proverb"
        />
        <SectionTitle>
          <GiAnkh /> Project Overview
        </SectionTitle>
        <Card>
          <b>Athar</b> is dedicated to unlocking the secrets of ancient Egypt for everyone. Effortlessly translate Egyptian hieroglyphs to text and audio, and ask questions about history, culture, and language—powered by advanced AI and a passion for the past.
        </Card>

        <SectionTitle>
          <GiEgyptianProfile /> Team & Contributors
        </SectionTitle>
        <Card>
          <Cartouche>
            <Avatar src="https://randomuser.me/api/portraits/men/32.jpg" alt="Lead Dev" />
            <ContributorInfo>
              <ContributorName>Ahmed El-Masry</ContributorName>
              <ContributorRole>Lead Developer</ContributorRole>
              <FunFact>“Can read hieroglyphs faster than English!”</FunFact>
            </ContributorInfo>
          </Cartouche>
          <Cartouche>
            <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" alt="AI Specialist" />
            <ContributorInfo>
              <ContributorName>Layla Hassan</ContributorName>
              <ContributorRole>AI Specialist</ContributorRole>
              <FunFact>“Dreams in ancient scripts.”</FunFact>
            </ContributorInfo>
          </Cartouche>
          <Cartouche>
            <Avatar src="https://randomuser.me/api/portraits/men/65.jpg" alt="Designer" />
            <ContributorInfo>
              <ContributorName>Omar Farouk</ContributorName>
              <ContributorRole>Design & UX</ContributorRole>
              <FunFact>“Once painted a mural in Luxor.”</FunFact>
            </ContributorInfo>
          </Cartouche>
        </Card>

        <SectionTitle>
          <FaRobot /> Technology Stack
        </SectionTitle>
        <Card>
          <TechGrid>
            <TechIcon><FaReact /><span>React</span></TechIcon>
            <TechIcon><SiStyledcomponents /><span>styled-components</span></TechIcon>
            <TechIcon><FaRobot /><span>AI Models</span></TechIcon>
            <TechIcon><FaGithub /><span>GitHub</span></TechIcon>
            <TechIcon><FaFont /><span>Google Fonts</span></TechIcon>
          </TechGrid>
        </Card>

        <SectionTitle>
          <GiLotus /> Art, Design & Fonts Credits
        </SectionTitle>
        <Card>
          <CreditList>
            <li><LotusBullet /> Egyptian motifs: <a href="https://thenounproject.com/" target="_blank" rel="noopener noreferrer">Noun Project</a></li>
            <li><LotusBullet /> Fonts: <a href="https://fonts.google.com/specimen/Playfair+Display" target="_blank" rel="noopener noreferrer">Playfair Display</a>, <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener noreferrer">Inter</a></li>
            <li><LotusBullet /> Icons: <a href="https://react-icons.github.io/react-icons/" target="_blank" rel="noopener noreferrer">React Icons</a></li>
            <li><LotusBullet /> Papyrus texture: <a href="https://www.transparenttextures.com/" target="_blank" rel="noopener noreferrer">Transparent Textures</a></li>
          </CreditList>
        </Card>

        <SectionTitle>
          <FaBook /> Historical & Scholarly Sources
        </SectionTitle>
        <Card>
          <CreditList>
            <li><ScarabBullet /> <a href="https://www.britishmuseum.org/collection/galleries/egyptian-sculpture" target="_blank" rel="noopener noreferrer">British Museum</a></li>
            <li><ScarabBullet /> <a href="https://www.ucl.ac.uk/museums-static/digitalegypt/ideograms/" target="_blank" rel="noopener noreferrer">UCL Digital Egypt</a></li>
            <li><ScarabBullet /> <a href="https://www.ancientegyptonline.co.uk/hieroglyphs.html" target="_blank" rel="noopener noreferrer">Ancient Egypt Online</a></li>
          </CreditList>
        </Card>

        <SectionTitle>
          <GiScarabBeetle /> Special Thanks
        </SectionTitle>
        <Card style={{ textAlign: "center" }}>
          <Medallion title="Beta Tester">Mona</Medallion>
          <Medallion title="Community">Youssef</Medallion>
          <Medallion title="Supporter">Fatima</Medallion>
          <Medallion title="Advisor">Dr. Selim</Medallion>
        </Card>

        <SectionTitle>
          <FaEnvelope /> Contact & Feedback
        </SectionTitle>
        <ContactBox>
          <div>
            <FaEnvelope /> Email: <a href="mailto:contact@athar.app">contact@athar.app</a>
          </div>
          <div>
            <FaTwitter /> Twitter: <a href="https://twitter.com/atharapp" target="_blank" rel="noopener noreferrer">@atharapp</a>
          </div>
          <div>
            Feedback form: <a href="https://forms.gle/your-form-link" target="_blank" rel="noopener noreferrer">Submit feedback</a>
          </div>
        </ContactBox>

        {showProverb && (
          <Proverb>
            <div style={{ fontSize: "2.2rem", marginBottom: "0.5rem" }}>𓂀 𓏏 𓆑</div>
            “To speak the name of the dead is to make them live again.”<br />
            <span style={{ fontSize: "0.95em", color: COLORS.gold }}>— Ancient Egyptian Proverb</span>
          </Proverb>
        )}
      </Container>
      <Motif />
    </PageBg>
  );
};

export default About; 