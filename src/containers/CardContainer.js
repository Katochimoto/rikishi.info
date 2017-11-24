import { Container } from 'flux/utils';
import bioStore from '../store';
import Card from '../components/Card';

function getStores () {
  return [
    bioStore,
  ];
}

function getState () {
  const {
    facebook,
    github,
    linkedin,
    nickname,
    role,
    userpic,
  } = bioStore.getState();

  const hasAccess = bioStore.hasAccess();

  return {
    facebook,
    github,
    hasAccess,
    linkedin,
    nickname,
    role,
    userpic,
  };
}

export default Container.createFunctional(Card, getStores, getState);
