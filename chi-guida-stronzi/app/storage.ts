import { StorageData, Member, WeekResult } from './types';

const STORAGE_KEY = 'chi-guida-stronzi-data';

export const DEFAULT_MEMBERS: Member[] = [
  { id: 'daddi', name: 'daddi', avatar: '/avatars/daddi.jpg' },
  { id: 'richi', name: 'richi', avatar: '/avatars/richi.jpg' },
  { id: 'tommi', name: 'tommi', avatar: '/avatars/tommi.jpg' },
  { id: 'ciccio', name: 'ciccio', avatar: '/avatars/ciccio.jpg' },
  { id: 'matto', name: 'matto', avatar: '/avatars/matto.jpg' },
  { id: 'lino', name: 'lino', avatar: '/avatars/lino.jpg' },
];

/**
 * Carica i dati dal localStorage
 */
export function loadFromStorage(): StorageData {
  if (typeof window === 'undefined') {
    return {
      members: DEFAULT_MEMBERS,
      history: [],
    };
  }
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return {
        members: DEFAULT_MEMBERS,
        history: [],
      };
    }
    
    const parsed = JSON.parse(data) as StorageData;
    
    // Assicurati che ci siano i membri di default se mancano
    if (!parsed.members || parsed.members.length === 0) {
      parsed.members = DEFAULT_MEMBERS;
    }
    
    return parsed;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return {
      members: DEFAULT_MEMBERS,
      history: [],
    };
  }
}

/**
 * Salva i dati nel localStorage
 */
export function saveToStorage(data: StorageData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
}

/**
 * Aggiunge un risultato settimanale allo storico
 */
export function addWeekResult(result: WeekResult): void {
  const data = loadFromStorage();
  data.history.unshift(result); // Aggiungi all'inizio
  saveToStorage(data);
}

/**
 * Resetta tutto lo storico
 */
export function resetAllData(): void {
  const data: StorageData = {
    members: DEFAULT_MEMBERS,
    history: [],
  };
  saveToStorage(data);
}
