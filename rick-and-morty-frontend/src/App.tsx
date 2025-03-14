import React from 'react';
import { Container, Typography } from '@mui/material';
import CharacterList from './components/CharacterList';

const App: React.FC = () => {
  return (
      <Container>
        <Typography variant="h4" gutterBottom>
          Rick and Morty Characters
        </Typography>
        <CharacterList />
      </Container>
  );
};

export default App;
