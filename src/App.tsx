import { useState, useCallback } from 'react';
import { Sparkles, Flame } from 'lucide-react';
import { profiles } from '@/data/profiles';
import ProfileCard from '@/components/ProfileCard';
import ActionButtons from '@/components/ActionButtons';
import MatchPopup from '@/components/MatchPopup';
import type { Profile } from '@/types';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [matchMessage, setMatchMessage] = useState<string | null>(null);
  const [matchedProfile, setMatchedProfile] = useState<Profile | null>(null);

  const current = profiles[currentIndex];
  const next = profiles[currentIndex + 1];
  const isLast = currentIndex >= profiles.length - 1;

  const handleSwipe = useCallback(
    (direction: 'left' | 'right') => {
      if (isAnimating || isLast) return;
      setIsAnimating(true);
      setSwipeDirection(direction);

      if (direction === 'right') {
        setMatchMessage(`${current.name}に「いいね」を送りました！`);
      }

      setTimeout(() => {
        const isMatch = direction === 'right' && Math.random() < 0.3;
        setHistory((prev) => [...prev, currentIndex]);
        setCurrentIndex((prev) => prev + 1);
        setSwipeDirection(null);
        setIsAnimating(false);
        setMatchMessage(null);

        if (isMatch) {
          setMatchedProfile(current);
        }
      }, 450);
    },
    [isAnimating, isLast, currentIndex, current],
  );

  const handleRewind = useCallback(() => {
    if (history.length === 0 || isAnimating) return;
    const prevIndex = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentIndex(prevIndex);
    setSwipeDirection(null);
  }, [history, isAnimating]);

  if (isLast && !current) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-900 flex items-center justify-center px-6">
        <div className="text-center">
          <Sparkles size={64} className="mx-auto text-purple-300 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-3">すべてのプロフィールを確認しました</h2>
          <p className="text-purple-200/70 mb-8">また後で新しい人が追加されるかも…</p>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setHistory([]);
            }}
            className="px-8 py-3 rounded-full bg-purple-500 hover:bg-purple-400 text-white font-semibold transition-colors"
          >
            もう一度最初から
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950">
      {/* Ambient blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] bg-fuchsia-500/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 min-h-screen flex flex-col max-w-md mx-auto px-5 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Flame size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Spark</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/10">
            <Sparkles size={14} className="text-purple-300" />
            <span className="text-xs text-purple-100 font-medium">{profiles.length - currentIndex} 人</span>
          </div>
        </header>

        {/* Card stack */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="relative w-full aspect-[3/4] max-h-[560px] mx-auto">
            {/* Next card peeking behind */}
            {next && (
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-xl scale-95 translate-y-2 opacity-60">
                <img
                  src={next.photo}
                  alt={next.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-purple-950/40" />
              </div>
            )}

            {/* Active card */}
            <ProfileCard
              profile={current}
              isActive={true}
              swipeDirection={swipeDirection}
            />
          </div>

          {/* Match message toast */}
          {matchMessage && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-rose-500/90 backdrop-blur text-white text-sm font-medium shadow-lg shadow-rose-500/30 animate-pulse">
              {matchMessage}
            </div>
          )}

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {profiles.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-6 bg-purple-300'
                    : i < currentIndex
                      ? 'w-1.5 bg-purple-500/40'
                      : 'w-1.5 bg-white/15'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 mb-2">
          <ActionButtons
            onSkip={() => handleSwipe('left')}
            onLike={() => handleSwipe('right')}
            onRewind={handleRewind}
            onSuperLike={() => handleSwipe('right')}
            canRewind={history.length > 0 && !isAnimating}
          />
        </div>
      </div>

      {/* Match popup */}
      {matchedProfile && (
        <MatchPopup
          profile={matchedProfile}
          onClose={() => setMatchedProfile(null)}
          onSendMessage={() => setMatchedProfile(null)}
        />
      )}
    </div>
  );
}
