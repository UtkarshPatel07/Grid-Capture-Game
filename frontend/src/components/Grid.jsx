'use client';

import { useMemo } from 'react';
import Tile from './Tile';

export default function Grid({ grid, onTileClick, currentUsername }) {
  const gridSize = 30;

  const gridArray = useMemo(() => {
    if (!grid || grid.length === 0) {
      return Array(gridSize * gridSize).fill(null).map((_, i) => ({
        id: i,
        owner: null,
        ownerColor: null
      }));
    }
    return grid;
  }, [grid]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div 
        className="grid gap-[1px] bg-slate-900/50 p-2 rounded-lg shadow-2xl"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
        }}
      >
        {gridArray.map((block) => (
          <Tile
            key={block.id}
            block={block}
            onClick={onTileClick}
            isOwned={!!block.owner}
            isCurrentUser={block.owner === currentUsername}
          />
        ))}
      </div>
    </div>
  );
}

