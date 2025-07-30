import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUpload from '../components/ImageUpload';
import DisplayArea from '../components/DisplayArea';
import TranslationResult from '../components/TranslationResult';
import StorytellingPanel from '../components/StorytellingPanel';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 80vh;
  width: 100%;
  padding: 2.5rem 0 2rem 0;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  width: 100%;
  max-width: 1100px;
  justify-content: center;
  align-items: flex-start;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 320px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomRow = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Translation: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [detectedGlyphs, setDetectedGlyphs] = useState<string[]>([]);
  const [translation, setTranslation] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [chat, setChat] = useState<{ sender: 'user' | 'ai'; message: string }[]>([]);

  // Dummy translation logic for instant translation
  React.useEffect(() => {
    if (detectedGlyphs.length > 0) {
      setTranslation('Instant translation of: ' + detectedGlyphs.join(' '));
      setAudioUrl(null); // Reset audio for new translation
    } else {
      setTranslation('');
      setAudioUrl(null);
    }
  }, [detectedGlyphs]);

  return (
    <MainContainer>
      <TopRow>
        <Column>
          <ImageUpload onUpload={img => {
            setImage(img);
            setDetectedGlyphs(['𓂀', '𓅓', '𓏏']); // Dummy glyphs for demo
          }} />
        </Column>
        <Column>
          <DisplayArea image={image} glyphs={detectedGlyphs} />
          {translation && (
            <TranslationResult translation={translation} onPlayAudio={() => setAudioUrl('dummy.mp3')} audioUrl={audioUrl} />
          )}
        </Column>
      </TopRow>
      <BottomRow>
        <StorytellingPanel chat={chat} onAsk={question => setChat([...chat, { sender: 'user', message: question }, { sender: 'ai', message: 'This is a dummy answer from Athar.' }])} />
      </BottomRow>
    </MainContainer>
  );
};

export default Translation; 