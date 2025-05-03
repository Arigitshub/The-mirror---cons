import { useState, useEffect } from 'react'

type JournalEntry = {
  id: string
  content: string
  createdAt: string
  mood: string
  themes: string[]
  summary: string
}

export function useJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journalEntries')
    return saved ? JSON.parse(saved) : []
  })
  const [currentEntry, setCurrentEntry] = useState('')
  const [draft, setDraft] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Auto-save draft every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (draft.trim()) {
        localStorage.setItem('journalDraft', draft)
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [draft])

  // Load draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('journalDraft')
    if (savedDraft) setDraft(savedDraft)
  }, [])

  const analyzeEntry = (content: string) => {
    // Simple analysis (in a real app you'd use NLP or API)
    const moodWords = [
      { mood: 'happy', words: ['happy', 'joy', 'excited'] },
      { mood: 'calm', words: ['peace', 'relax', 'calm'] },
      { mood: 'anxious', words: ['worry', 'anxious', 'stress'] }
    ]
    
    const detectedMood = moodWords.find(mood => 
      mood.words.some(word => content.toLowerCase().includes(word))
    )?.mood || 'neutral'

    const themes = [
      ...new Set(
        content
          .split(' ')
          .filter(word => word.length > 5)
          .slice(0, 3)
      )
    ]

    const summary = content.length > 50 
      ? `${content.substring(0, 50)}...` 
      : content

    return { mood: detectedMood, themes, summary }
  }

  const saveEntry = () => {
    if (!draft.trim()) return

    const { mood, themes, summary } = analyzeEntry(draft)
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      content: draft,
      createdAt: new Date().toISOString(),
      mood,
      themes,
      summary
    }

    setEntries(prev => {
      const updated = [newEntry, ...prev]
      localStorage.setItem('journalEntries', JSON.stringify(updated))
      return updated
    })

    setDraft('')
    localStorage.removeItem('journalDraft')
  }

  const exportEntries = () => {
    const data = JSON.stringify(entries, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `journal-entries-${new Date().toISOString()}.json`
    a.click()
  }

  return {
    entries,
    draft,
    setDraft,
    saveEntry,
    exportEntries,
    isSaving
  }
}
