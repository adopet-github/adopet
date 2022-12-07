import { writable } from 'svelte/store';
import type { Adopter } from '../types/adopter';

export const viewAdopterProfile = writable<Adopter>();
