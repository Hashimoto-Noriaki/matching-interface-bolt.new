import { X, Heart, RotateCcw, Star } from 'lucide-react';

interface ActionButtonsProps {
  onSkip: () => void;
  onLike: () => void;
  onRewind: () => void;
  onSuperLike: () => void;
  canRewind: boolean;
}

export default function ActionButtons({ onSkip, onLike, onRewind, onSuperLike, canRewind }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      {/* Rewind */}
      <button
        onClick={onRewind}
        disabled={!canRewind}
        aria-label="戻る"
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
          canRewind
            ? 'bg-white/10 backdrop-blur border-purple-300/50 text-purple-200 hover:scale-110 hover:bg-purple-500/20 active:scale-95'
            : 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed'
        }`}
      >
        <RotateCcw size={22} />
      </button>

      {/* Skip */}
      <button
        onClick={onSkip}
        aria-label="スキップ"
        className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center bg-white/10 backdrop-blur border-2 border-white/20 text-white hover:scale-110 hover:bg-white/20 hover:border-white/40 active:scale-95 transition-all duration-200"
      >
        <X size={30} strokeWidth={2.5} />
      </button>

      {/* Super like */}
      <button
        onClick={onSuperLike}
        aria-label="スーパーいいね"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center border-2 bg-white/10 backdrop-blur border-blue-300/50 text-blue-300 hover:scale-110 hover:bg-blue-500/20 active:scale-95 transition-all duration-200"
      >
        <Star size={22} />
      </button>

      {/* Like — rose color */}
      <button
        onClick={onLike}
        aria-label="いいね"
        className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center border-2 bg-white/10 backdrop-blur border-rose-400/50 text-rose-400 hover:scale-110 hover:bg-rose-500/20 hover:border-rose-400 active:scale-95 transition-all duration-200"
      >
        <Heart size={30} strokeWidth={2.5} fill="currentColor" />
      </button>
    </div>
  );
}
