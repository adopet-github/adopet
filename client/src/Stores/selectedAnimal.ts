import { writable } from 'svelte/store';
import type { ShelterAnimal } from '../types/shelterAnimal';

export const selectedAnimal = writable<ShelterAnimal>({
  shelterId: '',
  id: '',
  name: '',
  age: 0,
  weight: 0,
  description: ''
});
