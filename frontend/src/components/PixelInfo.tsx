'use client';

import { useCanvasStore } from '@/lib/store';
import { COLORS, ColorIndex } from '@/lib/constants';

export default function PixelInfo() {
    const { hoverPosition, pixels } = useCanvasStore();

    if (!hoverPosition) {
        return (
            <div className="flex items-center justify-center h-20 text-gray-500 text-xs bg-gray-900/30 rounded-lg border border-gray-700/50 border-dashed">
                Hover over canvas
            </div>
        );
    }

    const { x, y } = hoverPosition;
    const colorIndex = pixels.get(`${x},${y}`) ?? 0;
    const color = COLORS[colorIndex as ColorIndex];

    return (
        <div className="bg-gray-900/40 backdrop-blur-sm rounded-lg p-3 border border-gray-700/50">
            <div className="flex items-center gap-3">
                <div 
                    className="w-12 h-12 rounded-lg border-2 border-gray-600 shadow-lg"
                    style={{ backgroundColor: color }}
                />
                <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Position</span>
                        <span className="text-xs font-mono text-gray-200 bg-gray-800/50 px-2 py-0.5 rounded">
                            {x}, {y}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Color</span>
                        <span className="text-xs font-mono text-blue-400 bg-gray-800/50 px-2 py-0.5 rounded">
                            #{colorIndex}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
