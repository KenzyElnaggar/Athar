import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
`;

const Area = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 1rem;
  animation: ${fadeIn} 0.8s cubic-bezier(0.4,0.2,0.2,1);
`;
const ImageBox = styled.div`
  background: ${({ theme }) => theme.colors.sandstone};
  border: 2.5px solid ${({ theme }) => theme.colors.lapis};
  border-radius: 14px;
  padding: 0.7rem;
  min-width: 180px;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 18px 0 #4E342E22;
`;
const GlyphsBox = styled.div`
  background: ${({ theme }) => theme.colors.turquoise};
  color: ${({ theme }) => theme.colors.brown};
  border: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: 14px;
  padding: 1.2rem;
  min-width: 120px;
  font-size: 2.1rem;
  font-family: 'Cinzel', serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 10px 0 #C9B03722;
`;

interface DisplayAreaProps {
  image: string | null;
  glyphs: string[];
}

const DisplayArea: React.FC<DisplayAreaProps> = ({ image, glyphs }) => (
  <Area>
    <ImageBox>
      {image ? <img src={image} alt="Uploaded" style={{ maxWidth: '160px', maxHeight: '160px', borderRadius: '10px', boxShadow: '0 2px 8px #4E342E33' }} /> : <span>No image</span>}
    </ImageBox>
    <GlyphsBox>
      {glyphs.length > 0 ? glyphs.join(' ') : 'No glyphs detected'}
    </GlyphsBox>
  </Area>
);

export default DisplayArea; 