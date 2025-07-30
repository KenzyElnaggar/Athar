import React from 'react';
import styled, { ThemeProvider, createGlobalStyle, keyframes } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Header from './components/Header';
import ImageUpload from './components/ImageUpload';
import DisplayArea from './components/DisplayArea';
import TranslationResult from './components/TranslationResult';
import StorytellingPanel from './components/StorytellingPanel';
import { egyptianTheme, AppContainer as BaseAppContainer, Section, BackgroundWrapper, Card } from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Cormorant+Garamond:wght@400;700&family=Forum&display=swap');
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.sandstone};
    font-family: 'Cormorant Garamond', 'Cinzel', 'Forum', serif;
    box-sizing: border-box;
  }
`;

const AppContainer = styled(BaseAppContainer)`
  min-height: 100vh;
  width: 100vw;
  padding-top: 88px; /* Height of navbar */
  box-sizing: border-box;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
`;

const AnimatedCard = styled(Card)`
  animation: ${fadeIn} 0.8s cubic-bezier(0.4,0.2,0.2,1);
`;

const UploadPage: React.FC = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [detectedGlyphs, setDetectedGlyphs] = React.useState<string[]>([]);
  return (
    <Section>
      <AnimatedCard>
        <ImageUpload onUpload={img => {
          setImage(img);
          setDetectedGlyphs(['𓂀', '𓅓', '𓏏']);
        }} />
      </AnimatedCard>
      <AnimatedCard>
        <DisplayArea image={image} glyphs={detectedGlyphs} />
      </AnimatedCard>
    </Section>
  );
};

const TranslationsPage: React.FC = () => {
  const [translation, setTranslation] = React.useState<string>('“The sun rises in the east.”');
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  return (
    <Section>
      <AnimatedCard>
        <TranslationResult translation={translation} onPlayAudio={() => setAudioUrl('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3')} audioUrl={audioUrl} />
      </AnimatedCard>
    </Section>
  );
};

const QAPage: React.FC = () => {
  const [chat, setChat] = React.useState<{ sender: 'user' | 'ai'; message: string }[]>([]);
  return (
    <Section>
      <AnimatedCard>
        <StorytellingPanel chat={chat} onAsk={question => setChat([...chat, { sender: 'user', message: question }, { sender: 'ai', message: 'This is a dummy answer from Athar.' }])} />
      </AnimatedCard>
    </Section>
  );
};

const AboutPage: React.FC = () => (
  <Section>
    <AnimatedCard>
      <Header />
      <p style={{ fontFamily: 'Forum, serif', fontSize: '1.2rem', color: '#181818', marginTop: '1.5rem' }}>
        <b>Athar</b> is an AI-powered platform for translating Egyptian hieroglyphs, exploring interactive stories, and learning about ancient Egypt. Created with passion for history and technology.<br/><br/>
        <span style={{ color: '#C28818' }}>Credits:</span> Design & Development by the Athar Team.
      </p>
    </AnimatedCard>
  </Section>
);

const App: React.FC = () => (
  <ThemeProvider theme={egyptianTheme}>
    <GlobalStyle />
    <BackgroundWrapper>
      <Router>
        <Navbar />
        <AppContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/translations" element={<TranslationsPage />} />
            <Route path="/qa" element={<QAPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AppContainer>
      </Router>
    </BackgroundWrapper>
  </ThemeProvider>
);

export default App;
