import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaVolumeUp, FaUpload, FaMagic } from "react-icons/fa";
import { GiScarabBeetle, GiLotus, GiAnkh } from "react-icons/gi";
import ImageUpload from "../components/ImageUpload";
import DisplayArea from "../components/DisplayArea";
import StorytellingPanel from "../components/StorytellingPanel";
import TranslationResult from "../components/TranslationResult";

const COLORS = {
  lapis: "#235789",
  gold: "#FFD700",
  papyrus: "#F6E1C3",
  obsidian: "#222222",
  terracotta: "#AA5725",
  jade: "#54786A",
  turquoise: "#008080",
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(32px);}
  to { opacity: 1; transform: none;}
`;

const Motif = styled.div`
  width: 100%;
  height: 16px;
  background: url('data:image/svg+xml;utf8,<svg width="100" height="16" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="16" fill="none"/><circle cx="8" cy="8" r="6" fill="%23FFD700"/><rect x="20" y="4" width="60" height="8" fill="%23235789"/><circle cx="92" cy="8" r="6" fill="%23FFD700"/></svg>') repeat-x;
  margin-bottom: 2rem;
`;

const MainContainer = styled.div`
  max-width: 1200px;
  margin: 2.5rem auto 2rem auto;
  padding: 2.5rem 1.5rem 2rem 1.5rem;
  background: ${COLORS.papyrus};
  border-radius: 24px;
  box-shadow: 0 8px 32px 0 rgba(35,87,137,0.10);
  border: 2.5px solid ${COLORS.terracotta};
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  width: 100%;
  justify-content: center;
  align-items: stretch;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const Card = styled.div`
  background: ${COLORS.papyrus};
  border-radius: 18px;
  box-shadow: 0 4px 20px rgba(35,87,137,0.12);
  border: 2.5px solid transparent;
  padding: 2rem 1.5rem;
  min-width: 320px;
  max-width: 420px;
  flex: 1 1 340px;
  margin: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.8s cubic-bezier(0.4,0.2,0.2,1);
  transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 8px 32px 0 ${COLORS.gold}33;
    border-color: ${COLORS.gold};
    transform: scale(1.03);
  }
  &::after {
    content: '';
    position: absolute;
    right: 18px;
    bottom: 18px;
    width: 32px;
    height: 32px;
    opacity: 0.10;
    background: url('data:image/svg+xml;utf8,<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="%23FFD700"/><text x="16" y="22" font-size="18" text-anchor="middle" fill="%23235789">&#9763;</text></svg>') no-repeat center/contain;
    pointer-events: none;
  }
`;

const CardHeader = styled.h2`
  font-family: 'Cinzel', 'Playfair Display', serif;
  font-size: 2rem;
  color: ${COLORS.lapis};
  text-align: center;
  letter-spacing: 0.06em;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  svg {
    color: ${COLORS.gold};
    font-size: 1.3em;
    vertical-align: middle;
  }
`;

const CardBody = styled.div`
  font-family: 'Inter', Arial, sans-serif;
  color: ${COLORS.obsidian};
  font-size: 1.13rem;
  text-align: center;
  margin-bottom: 1.2rem;
`;

const AudioButton = styled.button`
  background: ${COLORS.gold};
  color: ${COLORS.lapis};
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.2rem auto 0 auto;
  box-shadow: 0 2px 8px 0 ${COLORS.gold}33;
  cursor: pointer;
  transition: box-shadow 0.2s, background 0.2s, color 0.2s, transform 0.2s;
  outline: none;
  position: relative;
  &:hover, &:focus {
    background: ${COLORS.turquoise};
    color: ${COLORS.gold};
    box-shadow: 0 4px 16px 0 ${COLORS.turquoise}55;
    transform: scale(1.08);
  }
  &:active {
    background: ${COLORS.lapis};
    color: ${COLORS.gold};
  }
`;

const MotifCorner = styled(GiLotus)`
  color: ${COLORS.gold};
  font-size: 2.2rem;
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: 0.18;
  pointer-events: none;
`;

const MotifCornerRight = styled(GiScarabBeetle)`
  color: ${COLORS.lapis};
  font-size: 2.2rem;
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: 0.13;
  pointer-events: none;
`;

const Upload: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [detectedGlyphs, setDetectedGlyphs] = useState<string[]>([]);
  const [translation, setTranslation] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [chat, setChat] = useState<{ sender: 'user' | 'ai'; message: string }[]>([]);
  const [playing, setPlaying] = useState(false);

  React.useEffect(() => {
    if (detectedGlyphs.length > 0) {
      setTranslation('Instant translation of: ' + detectedGlyphs.join(' '));
      setAudioUrl(null);
    } else {
      setTranslation('');
      setAudioUrl(null);
    }
  }, [detectedGlyphs]);

  // Dummy audio playback
  const handlePlayAudio = () => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 1200);
  };

  return (
    <>
      <Motif />
      <MainContainer>
        <Grid>
          <Card>
            <MotifCorner />
            <CardHeader><FaUpload /> Upload Hieroglyphs</CardHeader>
            <CardBody>
              Upload a photo of ancient Egyptian hieroglyphs to begin translation and exploration.
            </CardBody>
            <ImageUpload onUpload={img => {
              setImage(img);
              setDetectedGlyphs(['𓂀', '𓅓', '𓏏']);
            }} />
          </Card>
          <Card>
            <MotifCornerRight />
            <CardHeader><FaMagic /> Detected Glyphs</CardHeader>
            <CardBody>
              <DisplayArea image={image} glyphs={detectedGlyphs} />
            </CardBody>
          </Card>
          <Card>
            <MotifCorner />
            <CardHeader><GiAnkh /> Translation Output</CardHeader>
            <CardBody>
              <TranslationResult 
                translation={translation}
                onPlayAudio={handlePlayAudio}
                audioUrl={audioUrl}
              />
            </CardBody>
          </Card>
        </Grid>
        <Card style={{ marginTop: "2.5rem", width: "100%", maxWidth: "900px", position: "relative" }}>
          <MotifCorner />
          <MotifCornerRight />
          <CardHeader><GiScarabBeetle /> Interactive Q&A / Storytelling</CardHeader>
          <CardBody>
            Ask questions about the translation, ancient Egypt, or start a story!
          </CardBody>
          <StorytellingPanel
            chat={chat}
            onAsk={question =>
              setChat([
                ...chat,
                { sender: "user", message: question },
                { sender: "ai", message: "This is a dummy answer from Athar." }
              ])
            }
          />
        </Card>
      </MainContainer>
      <Motif />
      <style>
        {`
        @keyframes wave {
          0% { transform: scale(1) rotate(-8deg);}
          100% { transform: scale(1.15) rotate(8deg);}
        }
        `}
      </style>
    </>
  );
};

export default Upload;
