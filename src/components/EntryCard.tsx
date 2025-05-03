import { motion } from 'framer-motion';
import { Smile, Meh, Frown, Calendar, Clock } from 'lucide-react';

const moodIcons = {
  happy: <Smile className="text-amber-500" />,
  neutral: <Meh className="text-gray-500" />,
  calm: <Smile className="text-blue-500" />,
  anxious: <Frown className="text-rose-500" />
};

export function EntryCard({ entry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass-card rounded-2xl p-6 mb-6 shadow-sm ${entry.mood ? 'mood-' + entry.mood : 'mood-neutral'}`}
    >
      <div className="flex items-center gap-3 mb-4">
        {moodIcons[entry.mood] || moodIcons.neutral}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} />
          <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
          <Clock size={14} />
          <span>{new Date(entry.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>
      
      <p className="mb-4 text-gray-700 leading-relaxed whitespace-pre-line">{entry.content}</p>
      
      <div className="border-t border-white/30 pt-4">
        <div className="flex flex-wrap gap-2">
          {entry.themes?.map((theme, i) => (
            <motion.span 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 px-3 py-1 rounded-full text-xs shadow-xs"
            >
              #{theme}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
