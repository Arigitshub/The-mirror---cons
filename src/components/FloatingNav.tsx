import { motion } from 'framer-motion';
import { Plus, Calendar, Search } from 'lucide-react';

export function FloatingNav({ onNewEntry, onViewByDate, onFilter }) {
  return (
    <motion.div 
      className="fixed bottom-6 right-6 flex flex-col gap-3 z-10"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="floating-nav bg-white rounded-full p-4 shadow-lg"
        onClick={onNewEntry}
      >
        <Plus className="text-gray-700" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="floating-nav bg-white rounded-full p-4 shadow-lg"
        onClick={onViewByDate}
      >
        <Calendar className="text-gray-700" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="floating-nav bg-white rounded-full p-4 shadow-lg"
        onClick={onFilter}
      >
        <Search className="text-gray-700" />
      </motion.button>
    </motion.div>
  );
}
