import { writable } from 'svelte/store';
import type { Match } from '../types/match';

export const viewMatchChat = writable<Match>();