import { ref } from 'vue';

export const isLogining = ref(false);

export function changeNavbar() {
  isLogining.value = !isLogining.value;
}
export function setJwtToCookie(jwtToken, expirationDays) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  document.cookie = `jwtToken=${jwtToken}; expires=${expirationDate.toUTCString()}; path=/`;
}
export function getJwtFromCookie() {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc;
  }, {});

  return cookies.jwtToken;
}
