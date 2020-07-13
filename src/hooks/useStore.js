import { useEffect, useState, useCallback } from 'react';
import { eventCreator } from '../utils/eventCreator';

export const useStore = () => {

  const [clientIds, setClientIds] = useState([]);

  const subscribe = clients => {
    setClientIds([...clients]);
  }

  const handleMessage = useCallback(({ detail: { clientId, formData } }) => {
    window.dispatchEvent(eventCreator('onStoreUpdated', {
      clients: clientIds.filter(id => id !== clientId),
      formData
    }))
  }, [clientIds])

  useEffect(() => {
    window.addEventListener('onMessage', handleMessage);

    return () => {
      window.removeEventListener('onMessage', handleMessage);
    }
  }, [handleMessage]);

  return { clientIds, subscribe };
}