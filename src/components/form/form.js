import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  createStyles
} from '@material-ui/core';
import _ from 'lodash';

import { Field } from '../field/field';
import { eventCreator } from '../../utils/eventCreator';
import { difference } from '../../utils/helpers';

const useStyles = makeStyles(theme => createStyles({
  field: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  button: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  form: {
    padding: theme.spacing(4)
  }
}))

export const Form = ({ title, clientId }) => {

  const { field, form, button } = useStyles();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    work: ''
  });
  const [updatedData, setUpdatedData] = useState({});

  const handleStoreUpdated = useCallback(({ detail: { clients, formData: updatedFormData } }) => {
    const needUpdate = clients.includes(clientId) && !_.isEqual(formData, updatedFormData);

    if (needUpdate) {
      const diff = difference(formData, updatedFormData);
      setUpdatedData(
        Object.keys(diff).reduce((acc, key) => {
          acc[key] = updatedFormData[key];
          return acc;
        }, {})
      );

    }
  }, [clientId, formData]);

  const handleSubmit = e => {
    e.preventDefault();
    setUpdatedData({})
    window.dispatchEvent(eventCreator('onMessage', { clientId, formData }));
  }

  const handleChange = ({ target: { name, value } }) => setFormData({
    ...formData,
    [name]: value
  })

  const staticProps = name => ({
    className: field,
    onChange: handleChange,
    name,
    value: formData[name],
    error: Object.keys(updatedData).includes(name),
    applyChanges: () => {
      setFormData({
        ...formData,
        [name]: updatedData[name]
      });
      setUpdatedData(() => {
        return Object.keys(updatedData).reduce((acc, key) => {
          if (key !== name) {
            acc[name] = updatedData[name]
          }
          return acc;
        }, {});
      });
    }
  })

  useEffect(() => {
    window.addEventListener('onStoreUpdated', handleStoreUpdated);
  }, [handleStoreUpdated]);

  return (
    <Grid item xs={ 6 }>
      <Typography variant='h5' align='center'>{ title }{ ' ' }{ }</Typography>
      <form noValidate autoComplete='off' className={ form }>
        <Field { ...staticProps('name') } label='Name' />
        <Field { ...staticProps('age') } label='Age' />
        <Field { ...staticProps('work') } label='Work' />
        <Button className={ button } variant='contained' color='primary' onClick={ handleSubmit }>Send</Button>
      </form>
    </Grid>
  );

}