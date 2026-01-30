'use client';

import { useEffect, useState } from 'react';
import { useCanvasStore } from '@/lib/store';
import { COOLDOWN_MS } from '@/lib/constants';

export default function CooldownTimer() {
    const { cooldownEnd } = useCanvasStore();
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        if (!cooldownEnd) {
            setRemaining(0);
            return;
        }

        const interval = setInterval(() => {
            const now = Date.now();
            if (now >= cooldownEnd) {
                setRemaining(0);
            } else {
                setRemaining(Math.ceil((cooldownEnd - now) / 1000));
            }
        }, 100);

        return () => clearInterval(interval);
    }, [cooldownEnd]);

    if (remaining === 0) {
        return (
            <div className="bg-green-500/10 text-green-400 px-2.5 py-1.5 rounded text-xs font-medium border border-green-500/30">
                Ready
            </div>
        );
    }

    const progress = ((COOLDOWN_MS / 1000 - remaining) / (COOLDOWN_MS / 1000)) * 100;

    return (
        <div className="bg-orange-500/10 px-2.5 py-1.5 rounded border border-orange-500/30">
            <div className="text-orange-400 text-xs font-medium mb-1">
                {remaining}s
            </div>
            <div className="h-1 bg-gray-800/50 rounded-full overflow-hidden">
                <div
                    className="h-full bg-orange-500 transition-all duration-100 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
