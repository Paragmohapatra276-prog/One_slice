import { Star } from 'lucide-react';

export default function Rating({ value = 4.8, showNumber = true }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      <Star size={16} fill="currentColor" />
      {showNumber && <span className="text-sm font-semibold text-stone-800">{value.toFixed(1)}</span>}
    </div>
  );
}
