'use client';

import { useState, useEffect } from 'react';
import { Member, VoteMatrix, WeekResult } from './types';
import { DEFAULT_MEMBERS, loadFromStorage, saveToStorage, addWeekResult, resetAllData } from './storage';
import {
  calculateTotalScores,
  determineDriver,
  countValidRows,
  areAllRowsValid,
} from './utils';
import MemberAvatar from './components/MemberAvatar';
import VoteMatrixComponent from './components/VoteMatrix';
import ResultReveal from './components/ResultReveal';
import History from './components/History';

export default function Home() {
  const [members, setMembers] = useState<Member[]>(DEFAULT_MEMBERS);
  const [votes, setVotes] = useState<VoteMatrix>({});
  const [history, setHistory] = useState<WeekResult[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<{
    driver: Member;
    isTie: boolean;
    tiedMembers: Member[];
    scores: { [memberId: string]: number };
  } | null>(null);
  const [weekName, setWeekName] = useState('');

  // Carica dati da localStorage
  useEffect(() => {
    const data = loadFromStorage();
    setMembers(data.members);
    setHistory(data.history);
    
    // Inizializza matrice voti vuota
    const initialVotes: VoteMatrix = {};
    data.members.forEach(giver => {
      initialVotes[giver.id] = {};
      data.members.forEach(receiver => {
        if (giver.id !== receiver.id) {
          initialVotes[giver.id][receiver.id] = 0;
        }
      });
    });
    setVotes(initialVotes);
    
    // Imposta nome settimana di default
    const today = new Date();
    const weekNumber = Math.ceil(
      ((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7
    );
    setWeekName(`Settimana ${weekNumber} - ${today.getFullYear()}`);
  }, []);

  const handleVoteChange = (giverId: string, receiverId: string, value: number) => {
    setVotes(prev => ({
      ...prev,
      [giverId]: {
        ...prev[giverId],
        [receiverId]: value,
      },
    }));
  };

  const handleDecideDriver = () => {
    const scores = calculateTotalScores(votes, members);
    const result = determineDriver(scores, members);
    
    const driver = members.find(m => m.id === result.driverId)!;
    const tiedMembers = members.filter(m => result.tiedMembers.includes(m.id));
    
    setCurrentResult({
      driver,
      isTie: result.isTie,
      tiedMembers,
      scores,
    });
    
    // Salva nello storico
    const weekResult: WeekResult = {
      week: weekName,
      scores,
      driver: result.driverId,
      isTie: result.isTie,
      tiedMembers: result.tiedMembers,
      date: new Date().toISOString(),
    };
    
    addWeekResult(weekResult);
    setHistory(prev => [weekResult, ...prev]);
    
    setShowResult(true);
  };

  const handleNewWeek = () => {
    // Reset solo la matrice voti
    const resetVotes: VoteMatrix = {};
    members.forEach(giver => {
      resetVotes[giver.id] = {};
      members.forEach(receiver => {
        if (giver.id !== receiver.id) {
          resetVotes[giver.id][receiver.id] = 0;
        }
      });
    });
    setVotes(resetVotes);
    
    // Incrementa settimana
    const today = new Date();
    const weekNumber = Math.ceil(
      ((today.getTime() - new Date(today.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7
    );
    setWeekName(`Settimana ${weekNumber} - ${today.getFullYear()}`);
  };

  const handleResetAll = () => {
    if (confirm('Sei sicuro di voler cancellare TUTTO lo storico? Questa azione non può essere annullata!')) {
      resetAllData();
      setHistory([]);
      handleNewWeek();
    }
  };

  const validRows = countValidRows(votes, members);
  const allValid = areAllRowsValid(votes, members);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-red-500 mb-4 text-glow animate-pulse-slow">
            CHI GUIDA STRONZI? 🚗💀
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-bold">
            Assemblea del cojone settimanale 😤
          </p>
        </div>

        {/* Membri */}
        <div className="mb-12">
          <div className="bg-gray-900/50 border-neon-red rounded-lg p-6">
            <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
              👥 I MEMBRI
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {members.map(member => (
                <MemberAvatar key={member.id} member={member} size="medium" />
              ))}
            </div>
          </div>
        </div>

        {/* Votazione */}
        <div className="mb-12">
          <div className="bg-gray-900/50 border-neon-red rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                🗳️ MODALITÀ ASSEMBLEA
              </h2>
              <p className="text-gray-300 mb-4">
                Una persona inserisce tutti i voti. Ogni membro ha{' '}
                <span className="font-bold text-red-400">10 punti</span> da distribuire
                agli altri 5.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <input
                  type="text"
                  value={weekName}
                  onChange={e => setWeekName(e.target.value)}
                  placeholder="Nome settimana..."
                  className="flex-1 px-4 py-3 bg-gray-800 text-white border-2 border-gray-600 rounded font-bold focus:border-red-500 focus:outline-none"
                />
                
                <div className="flex gap-2">
                  <div
                    className={`px-6 py-3 rounded font-bold text-lg ${
                      allValid
                        ? 'bg-green-900/50 text-green-400 border-2 border-green-500'
                        : 'bg-gray-800 text-gray-400 border-2 border-gray-600'
                    }`}
                  >
                    ✅ {validRows}/6 VALIDE
                  </div>
                </div>
              </div>
            </div>

            <VoteMatrixComponent
              members={members}
              votes={votes}
              onVoteChange={handleVoteChange}
            />

            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={handleDecideDriver}
                disabled={!allValid}
                className={`px-8 py-4 font-black text-2xl rounded-lg transition-all duration-300 ${
                  allValid
                    ? 'bg-red-600 hover:bg-red-700 text-white hover:scale-105 glow-red-intense cursor-pointer'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {allValid ? '🚗 DECIDI CHI GUIDA! 🚗' : '⚠️ COMPLETA TUTTI I VOTI'}
              </button>

              <button
                onClick={handleNewWeek}
                className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105"
              >
                🔄 NUOVA SETTIMANA
              </button>
            </div>
          </div>
        </div>

        {/* Storico */}
        <div className="bg-gray-900/50 border-neon-red rounded-lg p-6">
          <History history={history} members={members} onReset={handleResetAll} />
        </div>
      </div>

      {/* Result Overlay */}
      {showResult && currentResult && (
        <ResultReveal
          driver={currentResult.driver}
          isTie={currentResult.isTie}
          tiedMembers={currentResult.tiedMembers}
          scores={currentResult.scores}
          onClose={() => setShowResult(false)}
        />
      )}
    </main>
  );
}
