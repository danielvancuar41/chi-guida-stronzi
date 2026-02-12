import { Member, VoteMatrix } from './types';

/**
 * Calcola i punteggi totali ricevuti da ogni membro
 */
export function calculateTotalScores(
  votes: VoteMatrix,
  members: Member[]
): { [memberId: string]: number } {
  const scores: { [memberId: string]: number } = {};
  
  // Inizializza tutti a 0
  members.forEach(member => {
    scores[member.id] = 0;
  });
  
  // Somma i voti ricevuti
  Object.keys(votes).forEach(giverId => {
    Object.keys(votes[giverId]).forEach(receiverId => {
      scores[receiverId] += votes[giverId][receiverId];
    });
  });
  
  return scores;
}

/**
 * Determina chi guida (chi ha MENO punti)
 * In caso di pareggio, sceglie casualmente
 */
export function determineDriver(
  scores: { [memberId: string]: number },
  members: Member[]
): {
  driverId: string;
  isTie: boolean;
  tiedMembers: string[];
} {
  const memberScores = members.map(m => ({
    id: m.id,
    score: scores[m.id],
  }));
  
  // Trova il punteggio minimo
  const minScore = Math.min(...memberScores.map(m => m.score));
  
  // Trova tutti i membri con punteggio minimo
  const tiedMembers = memberScores
    .filter(m => m.score === minScore)
    .map(m => m.id);
  
  const isTie = tiedMembers.length > 1;
  
  // Se pareggio, scelta casuale
  const driverId = tiedMembers[Math.floor(Math.random() * tiedMembers.length)];
  
  return {
    driverId,
    isTie,
    tiedMembers,
  };
}

/**
 * Valida che una riga di voti sommi esattamente a 10
 */
export function isRowValid(
  votes: VoteMatrix,
  giverId: string,
  members: Member[]
): boolean {
  if (!votes[giverId]) return false;
  
  const sum = members
    .filter(m => m.id !== giverId)
    .reduce((acc, m) => acc + (votes[giverId][m.id] || 0), 0);
  
  return sum === 10;
}

/**
 * Calcola quante righe sono valide (somma = 10)
 */
export function countValidRows(
  votes: VoteMatrix,
  members: Member[]
): number {
  return members.filter(m => isRowValid(votes, m.id, members)).length;
}

/**
 * Verifica che tutte le righe siano valide
 */
export function areAllRowsValid(
  votes: VoteMatrix,
  members: Member[]
): boolean {
  return countValidRows(votes, members) === members.length;
}
