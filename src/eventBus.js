import { ref } from 'vue';

export const isLogining = ref(false);

export function changeNavbar() {
  isLogining.value = !isLogining.value;
}
