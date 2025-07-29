import React from 'react';
import styled from 'styled-components';

const Area = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 1rem;
`;
const ImageBox = styled.div`
  background: ${({ theme }) => theme.colors.sandstone};
  border: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: 10px;
  padding: 0.5rem;
  min-width: 180px;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GlyphsBox = styled.div`
  background: ${({ theme }) => theme.colors.turquoise};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 10px;
  padding: 1rem;
  min-width: 120px;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface DisplayAreaProps {
  image: string | null;
  glyphs: string[];
}

const DisplayArea: React.FC<DisplayAreaProps> = ({ image, glyphs }) => (
  <Area>
    <ImageBox>
      {image ? <img src={image} alt="Uploaded" style={{ maxWidth: '160px', maxHeight: '160px', borderRadius: '8px' }} /> : <span>No image</span>}
    </ImageBox>
    <GlyphsBox>
      {glyphs.length > 0 ? glyphs.join(' ') : 'No glyphs detected'}
    </GlyphsBox>
  </Area>
);

export default DisplayArea; 