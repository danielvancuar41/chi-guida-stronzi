'use client';

import Image from 'next/image';
import { Member } from '../types';
import { useState } from 'react';

interface MemberAvatarProps {
  member: Member;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  showName?: boolean;
  className?: string;
}

export default function MemberAvatar({
  member,
  size = 'medium',
  showName = true,
  className = '',
}: MemberAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
    xlarge: 'w-48 h-48',
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-xl',
    xlarge: 'text-2xl',
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full border-4 border-red-600 overflow-hidden transition-all duration-300 hover:scale-110 hover:glow-red flex items-center justify-center bg-gray-800`}
      >
        {!imageError ? (
          <Image
            src={member.avatar}
            alt={member.name}
            width={200}
            height={200}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-4xl">😎</div>
        )}
      </div>
      {showName && (
        <p className={`font-bold text-white ${textSizes[size]}`}>
          {member.name}
        </p>
      )}
    </div>
  );
}
