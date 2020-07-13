import React from 'react';
import { TextField, Box, Typography, Link } from '@material-ui/core';

export const Field = props => {

  return (
    <Box>
      <TextField { ...props } />
      { props.error &&
        <Typography variant='caption' color='error'>
          Даные изменились. { ' ' }
          <Link href='#' type='button' onClick={ props.applyChanges }>Применить?</Link>
        </Typography>
      }
    </Box>
  );
}