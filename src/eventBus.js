import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const isLogining = ref(false);

//change navbar status
export function changeNavbar() {
  isLogining.value = !isLogining.value;
}

//store jwt token into cookie
export function setJwtToCookie(jwtToken, expirationDays) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);

  document.cookie = `jwtToken=${jwtToken}; expires=${expirationDate.toUTCString()}; path=/`;
}

//get jwt token from cookie
export function getJwtFromCookie() {
  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc;
  }, {});

  return cookies.jwtToken;
}

// delete jwt token from cookie
export function deleteCookie() {
  document.cookie = 'jwtToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
}

//confirm that users have access to the page
export function confirmAccess() {
  const router = useRouter();
  if (!getJwtFromCookie()) router.push('/');
}
