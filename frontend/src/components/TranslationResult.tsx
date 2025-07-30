import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
`;

const ResultContainer = styled.div`
  background: ${({ theme }) => theme.colors.sandstone};
  border: 2.5px solid ${({ theme }) => theme.colors.lapis};
  border-radius: 16px;
  padding: 2rem 1.5rem;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 4px 24px 0 #C9B03733;
  animation: ${fadeIn} 0.8s cubic-bezier(0.4,0.2,0.2,1);
`;
const TranslationText = styled.div`
  font-size: 1.35rem;
  color: ${({ theme }) => theme.colors.brown};
  margin-bottom: 1.2rem;
  font-family: 'Cormorant Garamond', serif;
`;
const AudioButton = styled.button`
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.lapis};
  border: none;
  border-radius: 10px;
  padding: 0.7rem 1.5rem;
  font-size: 1.1rem;
  font-family: 'Cinzel', serif;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 #C9B03733;
  transition: background 0.3s, color 0.3s, box-shadow 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.lapis};
    color: ${({ theme }) => theme.colors.gold};
    box-shadow: 0 4px 16px 0 #1A237E55;
  }
`;

interface TranslationResultProps {
  translation: string;
  onPlayAudio: () => void;
  audioUrl: string | null;
}

const TranslationResult: React.FC<TranslationResultProps> = ({ translation, onPlayAudio, audioUrl }) => (
  <ResultContainer>
    <TranslationText>{translation}</TranslationText>
    <AudioButton onClick={onPlayAudio}>Play Audio</AudioButton>
    {audioUrl && <audio src={audioUrl} controls autoPlay style={{ marginTop: '1rem' }} />}
  </ResultContainer>
);

export default TranslationResult; 