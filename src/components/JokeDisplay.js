import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import axios from 'axios';

function JokeDisplay({ filters }) {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchJokes = async (isLoadMore = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://v2.jokeapi.dev/joke/' + 
        (filters.category || 'Any'), {
        params: {
          lang: filters.language ? filters.language.toLowerCase() : 'en',
          contains: filters.keywords,
          amount: 5,
          page: isLoadMore ? page + 1 : 1
        },
        timeout: 5000
      });

      if (response.data.error) {
        throw new Error(response.data.message);
      }

      const newJokes = response.data.jokes || [response.data];
      setJokes(prevJokes => isLoadMore ? [...prevJokes, ...newJokes] : newJokes);
      if (isLoadMore) {
        setPage(prevPage => prevPage + 1);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch jokes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filters.category || filters.language || filters.keywords) {
      setPage(1);
      fetchJokes(false);
    }
  }, [filters]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Jokes
      </Typography>
      {jokes.length === 0 ? (
        <Typography color="textSecondary" align="center">
          No jokes found. Try adjusting your filters.
        </Typography>
      ) : (
        <>
          {jokes.map((joke, index) => (
            <Card key={`${joke.id}-${index}`} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {joke.type === 'single' ? joke.joke : `${joke.setup}\n\n${joke.delivery}`}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Category: {joke.category}
                </Typography>
              </CardContent>
            </Card>
          ))}
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => fetchJokes(true)}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More Jokes'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

export default JokeDisplay; 