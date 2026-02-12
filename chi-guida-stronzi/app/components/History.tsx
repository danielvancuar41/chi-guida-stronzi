'use client';

import { WeekResult, Member } from '../types';

interface HistoryProps {
  history: WeekResult[];
  members: Member[];
  onReset: () => void;
}

export default function History({ history, members, onReset }: HistoryProps) {
  if (history.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p className="text-xl">📭 Nessuno storico ancora...</p>
        <p className="text-sm mt-2">Fai la prima votazione!</p>
      </div>
    );
  }

  const getMemberName = (memberId: string): string => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : memberId;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-yellow-400">
          📜 STORICO SETTIMANE
        </h3>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-all duration-300 hover:scale-105"
        >
          🗑️ RESET TOTALE
        </button>
      </div>

      <div className="space-y-4">
        {history.map((result, index) => (
          <div
            key={index}
            className="bg-gray-800/50 border-2 border-gray-700 rounded-lg p-6 hover:border-red-500 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-xl font-bold text-white mb-1">
                  {result.week}
                </h4>
                <p className="text-sm text-gray-400">
                  {new Date(result.date).toLocaleDateString('it-IT', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400 mb-1">GUIDATORE</p>
                <p className="text-2xl font-bold text-red-400">
                  {getMemberName(result.driver)} 🚗
                </p>
                {result.isTie && (
                  <p className="text-xs text-yellow-400 mt-1">⚠️ PAREGGIO</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.entries(result.scores)
                .sort(([, a], [, b]) => a - b)
                .map(([memberId, score]) => (
                  <div
                    key={memberId}
                    className={`p-3 rounded text-center ${
                      memberId === result.driver
                        ? 'bg-red-900/50 border-2 border-red-500'
                        : 'bg-gray-700/50'
                    }`}
                  >
                    <p className="font-bold text-white text-sm">
                      {getMemberName(memberId)}
                    </p>
                    <p
                      className={`text-xl font-bold ${
                        memberId === result.driver
                          ? 'text-red-400'
                          : 'text-green-400'
                      }`}
                    >
                      {score}
                    </p>
                  </div>
                ))}
            </div>

            {result.isTie && result.tiedMembers && (
              <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-600 rounded">
                <p className="text-sm text-yellow-300">
                  <span className="font-bold">Pareggiati:</span>{' '}
                  {result.tiedMembers.map(getMemberName).join(', ')}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
