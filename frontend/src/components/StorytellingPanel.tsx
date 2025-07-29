import React, { useState } from 'react';
import styled from 'styled-components';

const Panel = styled.div`
  background: ${({ theme }) => theme.colors.sandstone};
  border: 2px solid ${({ theme }) => theme.colors.gold};
  border-radius: 10px;
  padding: 1.5rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const ChatBox = styled.div`
  background: ${({ theme }) => theme.colors.sandstone};
  border-radius: 8px;
  min-height: 120px;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding: 0.5rem;
`;
const Message = styled.div<{ sender: 'user' | 'ai' }>`
  align-self: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
  background: ${({ sender, theme }) => sender === 'user' ? theme.colors.turquoise : theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin: 0.3rem 0;
  max-width: 70%;
`;
const InputRow = styled.form`
  display: flex;
  gap: 0.5rem;
`;
const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.gold};
  font-size: 1rem;
`;
const AskButton = styled.button`
  background: ${({ theme }) => theme.colors.turquoise};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.sandstone};
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