import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: none; }
`;

const Panel = styled.div`
  background: ${({ theme }) => theme.colors.sandstone};
  border: 2.5px solid ${({ theme }) => theme.colors.lapis};
  border-radius: 16px;
  padding: 2rem 1.5rem;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-shadow: 0 4px 24px 0 #C9B03733;
  animation: ${fadeIn} 0.8s cubic-bezier(0.4,0.2,0.2,1);
`;
const ChatBox = styled.div`
  background: rgba(229,211,179,0.7);
  border-radius: 10px;
  min-height: 120px;
  max-height: 220px;
  overflow-y: auto;
  margin-bottom: 1.2rem;
  padding: 0.7rem;
  box-shadow: 0 2px 8px 0 #4E342E22;
`;
const Message = styled.div<{ sender: 'user' | 'ai' }>`
  align-self: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
  background: ${({ sender, theme }) => sender === 'user' ? theme.colors.turquoise : theme.colors.gold};
  color: ${({ theme }) => theme.colors.brown};
  border: 2px solid ${({ sender, theme }) => sender === 'user' ? theme.colors.gold : theme.colors.lapis};
  border-radius: 10px;
  padding: 0.6rem 1.2rem;
  margin: 0.4rem 0;
  max-width: 70%;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  box-shadow: 0 2px 8px 0 #C9B03722;
`;
const InputRow = styled.form`
  display: flex;
  gap: 0.7rem;
`;
const Input = styled.input`
  flex: 1;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1.5px solid ${({ theme }) => theme.colors.gold};
  font-size: 1.1rem;
  font-family: 'Cormorant Garamond', serif;
`;
const AskButton = styled.button`
  background: ${({ theme }) => theme.colors.lapis};
  color: ${({ theme }) => theme.colors.gold};
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  font-size: 1.1rem;
  font-family: 'Cinzel', serif;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 #1A237E33;
  transition: background 0.3s, color 0.3s, box-shadow 0.2s;
  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.lapis};
    box-shadow: 0 4px 16px 0 #C9B03755;
  }
`;

interface StorytellingPanelProps {
  chat: { sender: 'user' | 'ai'; message: string }[];
  onAsk: (question: string) => void;
}

const StorytellingPanel: React.FC<StorytellingPanelProps> = ({ chat, onAsk }) => {
  const [input, setInput] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAsk(input);
      setInput('');
    }
  };
  return (
    <Panel>
      <ChatBox>
        {chat.length === 0 && <div style={{ color: '#888' }}>Ask Athar about the story or hieroglyphs...</div>}
        {chat.map((msg, idx) => (
          <Message key={idx} sender={msg.sender}>{msg.message}</Message>
        ))}
      </ChatBox>
      <InputRow onSubmit={handleSubmit}>
        <Input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask a question..."
          aria-label="Ask a question"
        />
        <AskButton type="submit">Ask</AskButton>
      </InputRow>
    </Panel>
  );
};

export default StorytellingPanel; 