import React from 'react';
import styled from 'styled-components';

const ResultContainer = styled.div`
  background: ${({ theme }) => theme.colors.sandstone};
  border: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const TranslationText = styled.div`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 1rem;
`;
const AudioButton = styled.button`
  background: ${({ theme }) => theme.colors.turquoise};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.sandstone};
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