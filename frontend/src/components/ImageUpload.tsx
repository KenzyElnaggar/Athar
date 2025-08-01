import React from 'react';
import styled from 'styled-components';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  background: ${({ theme }) => theme.colors.sandstone};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;
const Button = styled.button`
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.brown};
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  margin-right: 0.5rem;
  transition: background 0.3s, color 0.3s, box-shadow 0.2s;
  box-shadow: 0 2px 8px 0 #C9B03733;
  &:hover {
    background: ${({ theme }) => theme.colors.lapis};
    color: ${({ theme }) => theme.colors.gold};
  }
`;

interface ImageUploadProps {
  onUpload: (img: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleCamera = () => {
    onUpload('https://upload.wikimedia.org/wikipedia/commons/4/4a/Egyptian_hieroglyphs_example.png');
  };
  return (
    <UploadContainer>
      <label>
        <Button as="span">Upload Image
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
        </Button>
      </label>
      <Button onClick={handleCamera}>Use Camera (Dummy)</Button>
    </UploadContainer>
  );
};

export default ImageUpload; 