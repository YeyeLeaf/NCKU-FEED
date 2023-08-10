import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const isLogining = ref(false);

//change navbar status
export function changeNavbar() {
  isLogining.value = !isLogining.value;
}

//store jwt token into cookie
export function setJwtToCookie(jwtToken, uid, expirationDays) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  document.cookie = `jwtToken=${jwtToken}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = `uid=${uid}; expires=${expirationDate.toUTCString()}; path=/`;
}

//get jwt token from cookie
export function getJwtFromCookie() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'jwtToken') {
      return value;
    }
  }
  return null;
}

//get uid from cookie
export function getUidFromCookie() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'uid') {
      return value;
    }
  }
  return null;
}

// delete jwt token & uid from cookie
export function deleteCookie() {
  const pastDate = new Date(0).toUTCString();

  document.cookie = `jwtToken=; expires=${pastDate}; path=/`;
  document.cookie = `uid=; expires=${pastDate}; path=/`;
}

//confirm that users have access to the page
export function confirmAccess() {
  const router = useRouter();
  if (!getJwtFromCookie()) router.push('/');
}
