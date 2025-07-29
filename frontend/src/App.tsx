import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import DisplayArea from './components/DisplayArea';
import TranslationResult from './components/TranslationResult';
import StorytellingPanel from './components/StorytellingPanel';
import { egyptianTheme, AppContainer, Section } from './theme';

const App: React.FC = () => {
  // Placeholder state and handlers
  const [image, setImage] = React.useState<string | null>(null);
  const [detectedGlyphs, setDetectedGlyphs] = React.useState<string[]>([]);
  const [translation, setTranslation] = React.useState<string>('"The sun rises in the east."');
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [chat, setChat] = React.useState<{ sender: 'user' | 'ai'; message: string }[]>([]);

  // Dummy handlers
  const handleImageUpload = (img: string) => {
    setImage(img);
    setDetectedGlyphs(['𓂀', '𓅓', '𓏏']); // Dummy glyphs
    setTranslation('"The sun rises in the east."');
    setAudioUrl(null);
  };
  const handlePlayAudio = () => {
    // Dummy audio
    setAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  };
  const handleAsk = (question: string) => {
    setChat([...chat, { sender: 'user', message: question }, { sender: 'ai', message: 'This is a dummy answer from Athar.' }]);
  };

  return (
    <ThemeProvider theme={egyptianTheme}>
      <AppContainer>
        <Header />
        <Section>
          <ImageUpload onUpload={handleImageUpload} />
          <DisplayArea image={image} glyphs={detectedGlyphs} />
        </Section>
        <Section>
          <TranslationResult translation={translation} onPlayAudio={handlePlayAudio} audioUrl={audioUrl} />
        </Section>
        <Section>
          <StorytellingPanel chat={chat} onAsk={handleAsk} />
        </Section>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
