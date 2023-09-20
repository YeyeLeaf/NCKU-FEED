import { post } from 'jquery';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const isLogining = ref(false);
export const cur_restaurant = ref('');
export const cur_post = ref('');
export const isLargeScreen = ref(true);

export const wheelList = ref([]);

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

// truncate text
export function textTruncation(text, maxLength) {
  const pattern = /[^\u4e00-\u9fa5]/g;
  if (text.length > maxLength) {
    const temp = text.slice(0, maxLength);
    const matches = temp.match(pattern);
    if (!matches) {
      return text.slice(0, maxLength) + '...';
    } else {
      if (matches.length > Math.round(maxLength / 2)) {
        return text.slice(0, maxLength + 4) + '...';
      } else {
        return text.slice(0, maxLength) + '...';
      }
    }
  }
  return text;
}

export function isScrollingToBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

// page loader (hamburger)
function loader() {
  document.querySelector('.loader-container').classList.add('fade-out');
}
export function fadeOut() {
  setInterval(loader, 2000);
}

// store post to localStorage
export function saveDataToLocalStorage(data) {
  localStorage.setItem('postData', JSON.stringify(data));
}

// get post from localStorage
export function getDataFromLocalStorage() {
  const storedData = localStorage.getItem('postData');
  return storedData ? JSON.parse(storedData) : null;
}

// store cur_restaurant to localStorage
export function saveRestToLocalStorage(data) {
  localStorage.setItem('cur_restaurant', JSON.stringify(data));
}

// get cur_restaurant from localStorage
export function getRestFromLocalStorage() {
  const storedData = localStorage.getItem('cur_restaurant');
  return storedData ? JSON.parse(storedData) : null;
}
