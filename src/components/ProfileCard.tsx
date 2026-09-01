import { MapPin } from 'lucide-react';
import type { Profile } from '@/types';

interface ProfileCardProps {
  profile: Profile;
  isActive: boolean;
  swipeDirection: 'left' | 'right' | null;
}

export default function ProfileCard({ profile, isActive, swipeDirection }: ProfileCardProps) {
  return (
    <div
      className={`absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-500 ease-out ${
        isActive
          ? swipeDirection === 'left'
            ? '-translate-x-[120%] -rotate-12 opacity-0'
            : swipeDirection === 'right'
              ? 'translate-x-[120%] rotate-12 opacity-0'
              : 'translate-x-0 rotate-0 opacity-100'
          : 'scale-95 opacity-0 pointer-events-none'
      }`}
    >
      {/* Photo */}
      <img
        src={profile.photo}
        alt={profile.name}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Like / Nope stamps */}
      <div
        className={`absolute top-8 left-8 border-4 border-rose-400 text-rose-400 text-3xl font-bold px-6 py-2 rounded-xl rotate-[-18deg] transition-opacity duration-300 ${
          swipeDirection === 'right' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        LIKE
      </div>
      <div
        className={`absolute top-8 right-8 border-4 border-white text-white text-3xl font-bold px-6 py-2 rounded-xl rotate-[18deg] transition-opacity duration-300 ${
          swipeDirection === 'left' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        NOPE
      </div>

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
        <div className="flex items-end gap-3">
          <h2 className="text-3xl font-bold tracking-tight">{profile.name}</h2>
          <span className="text-2xl font-light mb-0.5">{profile.age}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-white/80 text-sm">
          <MapPin size={16} />
          <span>{profile.location}</span>
        </div>
        <p className="mt-3 text-base text-white/90 leading-relaxed">{profile.comment}</p>
      </div>
    </div>
  );
}
