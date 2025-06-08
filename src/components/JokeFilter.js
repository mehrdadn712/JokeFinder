import React, { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography
} from '@mui/material';
import debounce from 'lodash/debounce';

const categories = [
  'Programming',
  'Misc',
  'Dark',
  'Pun',
  'Spooky',
  'Christmas'
];

const languages = [
  'English',
  'Spanish',
  'French',
  'German',
  'Portuguese',
  'Czech'
];

function JokeFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: '',
    language: '',
    keywords: ''
  });

  // Debounce the filter changes
  const debouncedFilterChange = useCallback(
    debounce((newFilters) => {
      onFilterChange(newFilters);
    }, 500),
    [onFilterChange]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    debouncedFilterChange(newFilters);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterChange(filters);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Filter Jokes
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <MenuItem value="">Any</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label="Language"
            name="language"
            value={filters.language}
            onChange={handleChange}
          >
            <MenuItem value="">Any</MenuItem>
            {languages.map((language) => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Keywords"
            name="keywords"
            value={filters.keywords}
            onChange={handleChange}
            placeholder="Enter keywords separated by commas"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Find Jokes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default JokeFilter; 