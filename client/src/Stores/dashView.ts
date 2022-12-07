import { writable } from 'svelte/store';

export const dashView = writable(['likes', 'animalList']);

// index 0 = sidebar = matches / likes
// index 1 = mainDiv = chat / adopter / animal / animalList
