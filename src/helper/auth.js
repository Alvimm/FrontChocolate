import { localStorageGetItem } from './localStorage';

export default function validateToken() {
  const token = localStorageGetItem();

  if (!token) {
    window.location.href = '/login';
  }
}
