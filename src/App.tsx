import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useJournal } from './hooks/useJournal';
import { EntryCard } from './components/EntryCard';
import { FloatingNav } from './components/FloatingNav';
import './App.css';

export default function App() {
  const { entries, draft, setDraft, saveEntry, exportEntries } = useJournal();
  const [bgClass, setBgClass] = useState('bg-gradient-to-br from-blue-50 to-purple-50');
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showMoodFilter, setShowMoodFilter] = useState(false);

  // Update background based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const hue = 200 + (scrollY / 10);
      setBgClass(`bg-gradient-to-br from-[hsl(${hue},80%,90%)] to-[hsl(${hue + 20},80%,90%)]`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${bgClass} bg-transition pb-20`}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          The Mirror
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-2xl p-6 mb-8 shadow-lg"
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Reflect on your day..."
            className="w-full h-48 p-4 bg-transparent focus:outline-none resize-none text-gray-700 placeholder-gray-400"
          />
          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveEntry}
              disabled={!draft.trim()}
              className="px-6 py-2 rounded-full bg-white/80 shadow-sm disabled:opacity-50"
            >
              Save Reflection
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {entries.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-700">Your Reflections</h2>
              {entries.map(entry => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FloatingNav 
        onNewEntry={() => setDraft('')}
        onViewByDate={() => setShowDateFilter(!showDateFilter)}
        onFilter={() => setShowMoodFilter(!showMoodFilter)}
      />
    </div>
  );
}
