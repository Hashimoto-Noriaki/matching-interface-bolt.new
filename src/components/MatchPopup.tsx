import { useState } from 'react';
import { Heart, X, Send } from 'lucide-react';
import type { Profile } from '@/types';

interface MatchPopupProps {
  profile: Profile;
  onClose: () => void;
  onSendMessage: () => void;
}

export default function MatchPopup({ profile, onClose, onSendMessage }: MatchPopupProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    alert('送信しました');
    onSendMessage();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-950/95 via-fuchsia-900/90 to-indigo-950/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full max-w-sm flex flex-col items-center animate-[fadeIn_0.3s_ease-out]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Heart size={28} className="text-rose-400" fill="currentColor" />
          <h1 className="text-3xl font-bold text-white tracking-tight">マッチしました！</h1>
        </div>

        {/* Photos */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {/* Your avatar (placeholder) */}
          <div className="w-28 h-28 rounded-full border-4 border-white/20 overflow-hidden shadow-xl bg-gradient-to-br from-purple-400 to-fuchsia-500 flex items-center justify-center shrink-0">
            <span className="text-4xl font-bold text-white">You</span>
          </div>

          {/* Heart between */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 blur-xl bg-rose-500/40" />
            <Heart size={36} className="relative text-rose-400" fill="currentColor" />
          </div>

          {/* Matched person */}
          <div className="w-28 h-28 rounded-full border-4 border-rose-400/60 overflow-hidden shadow-xl shrink-0">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        </div>

        {/* Name */}
        <p className="text-xl text-white/90 font-medium mb-1">
          <span className="text-rose-300">{profile.name}</span>さんとマッチしました
        </p>
        <p className="text-sm text-white/50 mb-8">お互いに「いいね」しました！メッセージを送りましょう。</p>

        {/* Message input */}
        <div className="w-full flex flex-col gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="メッセージを入力"
            className="w-full px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder-white/40 outline-none transition-all focus:bg-white/15 focus:border-rose-400/60 focus:ring-2 focus:ring-rose-400/30"
          />

          <button
            onClick={handleSend}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 hover:from-rose-400 hover:to-fuchsia-400 text-white font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-rose-500/30"
          >
            <Send size={18} />
            送信する
          </button>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-medium flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <X size={18} />
            スワイプを続ける
          </button>
        </div>
      </div>
    </div>
  );
}
