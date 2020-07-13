import React, { useEffect, useState } from 'react';
import { Container, makeStyles, createStyles } from '@material-ui/core';
import { v4 } from 'uuid';
import { Form } from '../form/form';

import { useStore } from '../../hooks/useStore';

// Store

import { FormData } from '../../store/formData';

const useStyles = makeStyles(theme => createStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding: theme.spacing(8)
  }
}));

function App() {

  const { clientIds, subscribe } = useStore();
  const [clients, setClients] = useState([v4(), v4(), v4()]);
  const { container } = useStyles();

  useEffect(() => {
    subscribe(clients);
  }, []);

  return (
    <FormData.Provider value={ { clientIds, subscribe } }>
      <Container maxWidth='lg' className={ container }>
        {
          clientIds.map((id, inx) => <Form title={ `Form ${inx + 1}` } key={ id } clientId={ id } />)
        }
      </Container>
    </FormData.Provider>
  );
}

export default App;
