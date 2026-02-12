'use client';

import { Member, VoteMatrix } from '../types';
import { isRowValid } from '../utils';

interface VoteMatrixComponentProps {
  members: Member[];
  votes: VoteMatrix;
  onVoteChange: (giverId: string, receiverId: string, value: number) => void;
}

export default function VoteMatrixComponent({
  members,
  votes,
  onVoteChange,
}: VoteMatrixComponentProps) {
  const handleInputChange = (
    giverId: string,
    receiverId: string,
    value: string
  ) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      onVoteChange(giverId, receiverId, numValue);
    }
  };

  const getRowSum = (giverId: string): number => {
    return members
      .filter(m => m.id !== giverId)
      .reduce((acc, m) => acc + (votes[giverId]?.[m.id] || 0), 0);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-3 text-left text-red-500 font-bold text-lg border-b-2 border-red-600">
              DA ➡️ A
            </th>
            {members.map(member => (
              <th
                key={member.id}
                className="p-3 text-center text-yellow-400 font-bold text-sm border-b-2 border-red-600"
              >
                {member.name}
              </th>
            ))}
            <th className="p-3 text-center text-green-400 font-bold text-sm border-b-2 border-red-600">
              TOTALE
            </th>
          </tr>
        </thead>
        <tbody>
          {members.map(giver => {
            const rowSum = getRowSum(giver.id);
            const rowValid = isRowValid(votes, giver.id, members);
            
            return (
              <tr
                key={giver.id}
                className={`border-b border-gray-700 ${
                  !rowValid ? 'bg-red-900/20' : 'bg-green-900/10'
                }`}
              >
                <td className="p-3 font-bold text-yellow-400 text-sm">
                  {giver.name}
                </td>
                {members.map(receiver => {
                  const isSelf = giver.id === receiver.id;
                  
                  return (
                    <td key={receiver.id} className="p-2 text-center">
                      {isSelf ? (
                        <div className="w-16 h-12 mx-auto bg-gray-800 rounded flex items-center justify-center text-gray-600 font-bold">
                          ❌
                        </div>
                      ) : (
                        <input
                          type="number"
                          min="0"
                          value={votes[giver.id]?.[receiver.id] || 0}
                          onChange={e =>
                            handleInputChange(giver.id, receiver.id, e.target.value)
                          }
                          className="w-16 h-12 bg-gray-800 text-white text-center text-xl font-bold rounded border-2 border-gray-600 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                        />
                      )}
                    </td>
                  );
                })}
                <td className="p-3 text-center">
                  <div
                    className={`text-xl font-bold px-4 py-2 rounded ${
                      rowValid
                        ? 'text-green-400 bg-green-900/30'
                        : 'text-red-400 bg-red-900/30'
                    }`}
                  >
                    {rowSum}/10
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
