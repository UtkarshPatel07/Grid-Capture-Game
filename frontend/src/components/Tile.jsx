'use client';

import { memo } from 'react';

const Tile = memo(({ block, onClick, isOwned, isCurrentUser }) => {
  const handleClick = () => {
    if (!block.owner) {
      onClick(block.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        aspect-square border border-slate-700/50 transition-all duration-200
        ${!block.owner ? 'cursor-pointer hover:border-slate-500 hover:scale-105 bg-slate-800/30' : 'cursor-default'}
        ${isCurrentUser ? 'ring-2 ring-yellow-400/50' : ''}
      `}
      style={{
        backgroundColor: block.ownerColor || 'transparent',
        opacity: block.owner ? 0.85 : 1
      }}
      title={block.owner || 'Click to capture'}
    />
  );
});

Tile.displayName = 'Tile';

export default Tile;

