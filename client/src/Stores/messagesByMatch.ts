import { writable } from 'svelte/store';
import type { Message } from '../types/message';

type MessagesByMatch = {
  animalId: string;
  adopterId: string;
  messages: Message[]
}

export const messagesByMatch = writable<MessagesByMatch>({ animalId: '', adopterId: '', messages: []})
