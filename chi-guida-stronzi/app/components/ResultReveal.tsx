'use client';

import { useEffect, useState } from 'react';
import { Member } from '../types';
import MemberAvatar from './MemberAvatar';

interface ResultRevealProps {
  driver: Member;
  isTie: boolean;
  tiedMembers: Member[];
  scores: { [memberId: string]: number };
  onClose: () => void;
}

export default function ResultReveal({
  driver,
  isTie,
  tiedMembers,
  scores,
  onClose,
}: ResultRevealProps) {
  const [phase, setPhase] = useState<'loading' | 'reveal'>('loading');
  const [flickerName, setFlickerName] = useState('');

  useEffect(() => {
    // Fase 1: Loading con flicker
    const names = ['daddi', 'richi', 'tommi', 'ciccio', 'matto', 'lino'];
    let count = 0;
    const maxFlickers = 20;

    const flickerInterval = setInterval(() => {
      setFlickerName(names[Math.floor(Math.random() * names.length)]);
      count++;

      if (count >= maxFlickers) {
        clearInterval(flickerInterval);
        // Fase 2: Reveal
        setTimeout(() => {
          setPhase('reveal');
        }, 300);
      }
    }, 100);

    return () => clearInterval(flickerInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
      {phase === 'loading' && (
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 animate-pulse">
            Sto a decide... 🤔
          </h2>
          <div className="text-6xl md:text-8xl font-bold text-red-500 animate-pulse">
            {flickerName}
          </div>
        </div>
      )}

      {phase === 'reveal' && (
        <div className="text-center max-w-4xl w-full animate-pop">
          {isTie && (
            <div className="mb-8 p-6 bg-yellow-900/30 border-2 border-yellow-500 rounded-lg">
              <p className="text-xl md:text-2xl font-bold text-yellow-400 mb-2">
                ⚠️ PAREGGIO! ⚠️
              </p>
              <p className="text-lg text-white">
                Pareggio tra:{' '}
                <span className="font-bold text-red-400">
                  {tiedMembers.map(m => m.name).join(', ')}
                </span>
              </p>
              <p className="text-lg text-gray-300 mt-2">
                Punteggio minimo: {scores[driver.id]} punti
              </p>
              <p className="text-lg text-green-400 mt-2">
                ✅ Scelta casuale effettuata!
              </p>
            </div>
          )}

          <div className="mb-8">
            <div className="inline-block border-8 border-red-600 rounded-full pulse-border">
              <MemberAvatar member={driver} size="xlarge" showName={false} />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-red-500 mb-4 animate-shake text-glow">
            GUIDA COJONE
          </h1>

          <p className="text-4xl md:text-5xl font-bold text-white mb-8">
            {driver.name.toUpperCase()}
          </p>

          <div className="bg-gray-800/50 p-6 rounded-lg mb-8">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">
              📊 PUNTEGGI FINALI
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(scores)
                .sort(([, a], [, b]) => a - b)
                .map(([memberId, score]) => (
                  <div
                    key={memberId}
                    className={`p-3 rounded ${
                      memberId === driver.id
                        ? 'bg-red-900/50 border-2 border-red-500'
                        : 'bg-gray-700/50'
                    }`}
                  >
                    <p className="font-bold text-white">{memberId}</p>
                    <p
                      className={`text-2xl font-bold ${
                        memberId === driver.id ? 'text-red-400' : 'text-green-400'
                      }`}
                    >
                      {score} pts
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xl rounded-lg transition-all duration-300 hover:scale-105 glow-red"
          >
            CHIUDI 🚗
          </button>
        </div>
      )}
    </div>
  );
}
