import { Container } from 'flux/utils';
import bioStore from '../data/store';
import Card from '../components/Card';

function getStores () {
  return [
    bioStore,
  ];
}

function getState () {
  const bio = bioStore.getState();
  const hasAccess = bioStore.hasAccess();

  return {
    bio,
    hasAccess,
  };
}

export default Container.createFunctional(Card, getStores, getState);
