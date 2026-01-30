'use client';

import { useCanvasStore } from '@/lib/store';
import { COLORS, ColorIndex } from '@/lib/constants';

export default function ColorPicker() {
    const { selectedColor, setSelectedColor } = useCanvasStore();

    return (
        <div className="grid grid-cols-8 gap-2 p-3 bg-gray-900/40 backdrop-blur-sm rounded-lg border border-gray-700/50">
            {COLORS.map((color, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedColor(index as ColorIndex)}
                    className={`relative w-full aspect-square rounded-lg transition-all duration-200 ${
                        selectedColor === index
                            ? 'ring-2 ring-white scale-110 shadow-lg'
                            : 'hover:scale-105 hover:shadow-md'
                    }`}
                    style={{ backgroundColor: color }}
                    title={`Color ${index}`}
                />
            ))}
        </div>
    );
}
