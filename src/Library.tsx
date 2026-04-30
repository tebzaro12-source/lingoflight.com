import React, { useState } from 'react';
import { useAuth } from './lib/AuthContext';
import { Lock, FileText, Download, PlayCircle, FolderOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const materials = [
  {
    program: 'General English',
    items: [
      { id: 1, title: 'Essential 1000 Words Vocabulary List', type: 'document', icon: FileText },
      { id: 2, title: 'Everyday Dialogues Audio Pack', type: 'audio', icon: PlayCircle },
      { id: 3, title: 'Grammar Cheat Sheet (A1-B1)', type: 'document', icon: FileText }
    ]
  },
  {
    program: 'Business English',
    items: [
      { id: 4, title: 'Email Templates for Professionals', type: 'document', icon: FileText },
      { id: 5, title: 'Meeting Phrases & Negotiations', type: 'document', icon: FileText },
      { id: 6, title: 'Business Presentation Framework', type: 'document', icon: FileText }
    ]
  },
  {
    program: 'IELTS Preparation',
    items: [
      { id: 7, title: 'IELTS Academic Vocab Guide', type: 'document', icon: FileText },
      { id: 8, title: 'Speaking Part 2 Practice Cards', type: 'document', icon: FileText },
      { id: 9, title: 'Writing Task 1 & 2 Template', type: 'document', icon: FileText }
    ]
  },
  {
    program: 'English Grammar',
    items: [
      { id: 10, title: 'Tenses Masterclass Notes', type: 'document', icon: FileText },
      { id: 11, title: 'Conditionals Practice Exercises', type: 'document', icon: FileText }
    ]
  },
  {
    program: 'Interview Preparation',
    items: [
      { id: 12, title: 'Top 50 Interview Questions', type: 'document', icon: FileText },
      { id: 13, title: 'STAR Method Strategies', type: 'document', icon: FileText }
    ]
  },
  {
    program: 'Travel English',
    items: [
      { id: 14, title: 'Travel Phrasebook & Maps', type: 'document', icon: FileText },
      { id: 15, title: 'Airport announcements audio', type: 'audio', icon: PlayCircle }
    ]
  }
];

export default function LibraryPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState(materials[0].program);

  if (loading) {
    return (
      <main className="flex-grow pt-32 pb-24 bg-brand-50 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-accent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex-grow pt-32 pb-24 bg-brand-50 min-h-screen overflow-hidden relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 relative z-10">
          <div className="w-24 h-24 bg-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
            <Lock className="h-10 w-10 text-brand-800" />
          </div>
          <h1 className="text-4xl text-brand-900 font-serif mb-4">Members Library</h1>
          <p className="text-slate-600 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
            Access our exclusive collection of study materials, vocabulary lists, grammar guides, and practice tests. Sign in to unlock the materials.
          </p>
          <button 
            onClick={signInWithGoogle}
            className="bg-brand-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-md hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/10"
          >
            Sign in with Google to Access
          </button>
        </div>
      </main>
    );
  }

  const activeMaterials = materials.find(m => m.program === activeTab)?.items || [];

  return (
    <main className="flex-grow pt-32 pb-24 bg-brand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-serif text-brand-900 mb-2">Student Library</h1>
          <p className="text-slate-600">Welcome back, {user.displayName || 'Student'}! Here are your resources.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
           <div className="md:w-1/4">
             <div className="bg-white rounded-xl border border-brand-100 shadow-sm overflow-hidden">
               <div className="bg-brand-50 border-b border-brand-100 text-brand-900 p-5 font-bold text-xs uppercase tracking-wider">
                 Categories
               </div>
               <div className="p-3 space-y-1">
                 {materials.map((cat) => (
                   <button
                     key={cat.program}
                     onClick={() => setActiveTab(cat.program)}
                     className={`w-full text-left px-4 py-3 rounded-lg flex items-center text-sm transition-colors ${
                       activeTab === cat.program 
                        ? 'bg-brand-900 text-white font-medium shadow-sm' 
                        : 'text-brand-600 hover:bg-brand-50'
                     }`}
                   >
                     <FolderOpen className={`h-4 w-4 mr-3 ${activeTab === cat.program ? 'text-brand-200' : 'text-brand-400'}`} />
                     {cat.program}
                   </button>
                 ))}
               </div>
             </div>
           </div>
           
           <div className="md:w-3/4">
             <div className="bg-white rounded-xl border border-brand-100 shadow-sm p-6 md:p-8 min-h-[500px]">
                <h2 className="text-2xl font-serif text-brand-900 mb-8 border-b pb-4">{activeTab} Resources</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <AnimatePresence mode="popLayout">
                     {activeMaterials.map(item => (
                       <motion.div
                         key={item.id}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.95 }}
                         className="border border-brand-100 p-5 rounded-xl hover:border-brand-200 hover:shadow-md transition-all group flex items-start bg-white"
                       >
                         <div className="bg-brand-50 p-3 rounded-full mr-4 group-hover:bg-brand-100 transition-colors">
                           <item.icon className="h-6 w-6 text-brand-700" />
                         </div>
                         <div className="flex-grow">
                           <h3 className="font-medium text-brand-900 mb-1">{item.title}</h3>
                           <p className="text-[10px] text-brand-500 uppercase tracking-wider">{item.type}</p>
                         </div>
                         <button className="text-brand-400 hover:text-accent p-2 outline-none transition-colors">
                           <Download className="h-5 w-5" />
                         </button>
                       </motion.div>
                     ))}
                   </AnimatePresence>
                </div>
                
                {activeMaterials.length === 0 && (
                  <div className="text-center py-20 text-slate-500">
                    <p>No materials available for this category yet.</p>
                  </div>
                )}
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
