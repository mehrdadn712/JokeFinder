import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper,
  ThemeProvider,
  createTheme
} from '@mui/material';
import JokeFilter from './components/JokeFilter';
import JokeDisplay from './components/JokeDisplay';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [filters, setFilters] = useState({
    category: '',
    language: '',
    keywords: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ color: 'primary.main' }}>
            Joke Finder
          </Typography>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <JokeFilter onFilterChange={handleFilterChange} />
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <JokeDisplay filters={filters} />
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 