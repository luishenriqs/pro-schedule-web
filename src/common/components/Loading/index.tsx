import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Container } from './styles';

export const LoadingComponent = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}
