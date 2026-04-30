import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, BarChart2, BookOpen, MessageSquare, Headphones, PenTool, Award, ChevronRight, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const cefrLevels = [
  { id: 'a1', level: 'A1', name: 'Beginner', desc: 'Basic survival English', skills: 'Understand and use familiar everyday expressions. Introduce themselves and ask simple questions.', exam: 'Pre-A1 exams, beginner tests', color: 'bg-emerald-50 text-emerald-800', ringColor: 'ring-emerald-500', barColor: 'bg-emerald-500' },
  { id: 'a2', level: 'A2', name: 'Elementary', desc: 'Basic communication', skills: 'Communicate in simple routine tasks and describe simple needs.', exam: 'KET / Cambridge A2 Key', color: 'bg-teal-50 text-teal-800', ringColor: 'ring-teal-500', barColor: 'bg-teal-500' },
  { id: 'b1', level: 'B1', name: 'Intermediate', desc: 'Independent user', skills: 'Handle everyday situations, describe experiences, and give opinions simply.', exam: 'PET / IELTS ~4.0–5.0', color: 'bg-cyan-50 text-cyan-800', ringColor: 'ring-cyan-500', barColor: 'bg-cyan-500' },
  { id: 'b2', level: 'B2', name: 'Upper Intermediate', desc: 'Confident user', skills: 'Understand main ideas of complex texts and interact fluently with native speakers.', exam: 'FCE / IELTS ~5.5–6.5', color: 'bg-blue-50 text-blue-800', ringColor: 'ring-blue-500', barColor: 'bg-blue-500' },
  { id: 'c1', level: 'C1', name: 'Advanced', desc: 'Effective operational proficiency', skills: 'Use English fluently and flexibly in academic and professional settings.', exam: 'CAE / IELTS ~7.0–8.0', color: 'bg-indigo-50 text-indigo-800', ringColor: 'ring-indigo-500', barColor: 'bg-indigo-500' },
  { id: 'c2', level: 'C2', name: 'Proficient', desc: 'Near-native mastery', skills: 'Understand virtually everything heard or read and express themselves precisely.', exam: 'CPE / IELTS 8.5–9.0', color: 'bg-violet-50 text-violet-800', ringColor: 'ring-violet-500', barColor: 'bg-violet-500' },
];

const skillComparison = [
  { skill: 'Speaking', icon: MessageSquare, a1a2: 'Simple phrases', b1b2: 'Clear opinions & discussion', c1c2: 'Fluent, natural, flexible' },
  { skill: 'Writing', icon: PenTool, a1a2: 'Short sentences', b1b2: 'Paragraphs & essays', c1c2: 'Academic/professional writing' },
  { skill: 'Listening', icon: Headphones, a1a2: 'Slow, clear speech', b1b2: 'Everyday conversations', c1c2: 'Fast, complex speech' },
  { skill: 'Reading', icon: BookOpen, a1a2: 'Simple texts', b1b2: 'Articles & reports', c1c2: 'Academic & abstract texts' },
  { skill: 'Vocabulary', icon: Target, a1a2: 'Basic daily words', b1b2: 'Topic-based vocabulary', c1c2: 'Advanced & idiomatic language' }
];

export default function CefrPage() {
  const [selectedLevelId, setSelectedLevelId] = useState('b1');
  const selectedLevel = cefrLevels.find(l => l.id === selectedLevelId)!;
  const levelIndex = cefrLevels.findIndex(l => l.id === selectedLevelId);

  return (
    <main className="flex-grow pt-32 pb-24 bg-brand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="h-10 w-10 text-brand-800" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-900 mb-6 font-medium">
            CEFR English Level Framework
          </h1>
          <p className="text-slate-600 text-lg">
            The Common European Framework of Reference for Languages (CEFR) is an international standard for describing language ability. Explore the levels below to understand your proficiency.
          </p>
          <div className="mt-8 flex justify-center">
             <Link to="/proficiency-test" className="inline-flex items-center px-8 py-4 bg-accent text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-accent-hover transition-colors">
               Take Our Free Assessment
             </Link>
          </div>
        </div>

        {/* Interactive Level Selector */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Interactive Guide</h2>
            <h3 className="text-2xl font-serif text-brand-900">Explore the Levels</h3>
          </div>

          <div className="bg-white rounded-sm border border-brand-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Sidebar Selector */}
            <div className="md:w-1/3 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
               <div className="flex flex-row overflow-x-auto md:flex-col p-4 md:p-6 gap-2 snap-x">
                  {cefrLevels.map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setSelectedLevelId(lvl.id)}
                      className={`flex-shrink-0 snap-start text-left p-4 rounded-sm transition-all flex items-center justify-between ${
                        selectedLevelId === lvl.id 
                          ? `bg-white shadow-sm ring-1 ${lvl.ringColor}` 
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <div>
                        <span className={`inline-block font-bold text-lg mr-3 ${selectedLevelId === lvl.id ? lvl.color.split(' ')[1] : ''}`}>
                          {lvl.level}
                        </span>
                        <span className={`text-sm font-medium ${selectedLevelId === lvl.id ? 'text-brand-900' : ''}`}>
                          {lvl.name}
                        </span>
                      </div>
                      {selectedLevelId === lvl.id && <ChevronRight className="h-4 w-4 hidden md:block text-slate-400" />}
                    </button>
                  ))}
               </div>
            </div>

            {/* Content Display */}
            <div className="md:w-2/3 p-6 md:p-12 self-center">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedLevel.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                       <span className={`text-3xl font-serif italic py-2 px-4 rounded-sm ${selectedLevel.color}`}>
                          {selectedLevel.level}
                       </span>
                       <h3 className="text-2xl md:text-3xl font-medium text-brand-900">{selectedLevel.name}</h3>
                    </div>

                    <p className="text-xl text-brand-800 font-medium mb-6">"{selectedLevel.desc}"</p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b pb-2">Skills Summary (Can Do)</h4>
                        <p className="text-slate-700 leading-relaxed">{selectedLevel.skills}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 border-b pb-2">Typical Exam Equivalents</h4>
                        <p className="text-slate-700">{selectedLevel.exam}</p>
                      </div>
                    </div>
                  </motion.div>
               </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Progress Path Visualization */}
        <section className="mb-20">
          <div className="bg-brand-900 rounded-sm p-8 md:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-800 blur-3xl opacity-50 rounded-full"></div>
             
             <div className="relative z-10 text-center mb-12">
               <BarChart2 className="h-8 w-8 text-accent mx-auto mb-4" />
               <h2 className="text-2xl md:text-3xl font-serif mb-4">Student Progression Path</h2>
               <p className="text-brand-200 max-w-2xl mx-auto text-sm">
                 Visualizing the journey from beginner to near-native mastery. Consistent practice unlocks higher stages of proficiency.
               </p>
             </div>

             <div className="relative z-10">
                {/* Desktop Path */}
                <div className="hidden md:flex justify-between items-center relative">
                   <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-800 -translate-y-1/2 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      ></motion.div>
                   </div>
                   
                   {cefrLevels.map((lvl, index) => (
                     <div key={lvl.id} className="relative z-10 flex flex-col items-center group cursor-default">
                        <div className="mb-4 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 w-max px-2 py-1 bg-white text-brand-900 text-[10px] font-bold uppercase tracking-widest rounded-sm shadow-sm pointer-events-none">
                          {lvl.name}
                        </div>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm bg-brand-900 border-4 border-brand-800 text-slate-300 transition-colors group-hover:bg-brand-800 group-hover:text-white relative`}>
                          {lvl.level}
                        </div>
                     </div>
                   ))}
                </div>

                {/* Mobile Path */}
                <div className="md:hidden space-y-6 relative ml-6">
                   <div className="absolute top-0 bottom-0 left-[-2px] w-1 bg-brand-800 rounded-full"></div>
                   {cefrLevels.map((lvl, index) => (
                     <div key={lvl.id} className="relative z-10 flex items-center">
                        <div className="absolute left-[-22px] w-10 h-10 rounded-full bg-brand-900 border-4 border-brand-800 text-slate-300 flex items-center justify-center font-bold text-xs">
                          {lvl.level}
                        </div>
                        <div className="pl-14">
                          <p className="font-bold text-white text-sm">{lvl.name}</p>
                          <p className="text-brand-300 text-xs">{lvl.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* Quick Skill Comparison by Level */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Detailed Breakdown</h2>
            <h3 className="text-2xl font-serif text-brand-900">Skill Comparison by Level Group</h3>
          </div>

          <div className="bg-white rounded-sm border border-brand-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 md:p-6 text-xs font-bold uppercase tracking-widest text-brand-900 w-1/4">Skill</th>
                    <th className="p-4 md:p-6 text-xs font-bold uppercase tracking-widest text-slate-500 w-1/4">A1–A2</th>
                    <th className="p-4 md:p-6 text-xs font-bold uppercase tracking-widest text-slate-500 w-1/4">B1–B2</th>
                    <th className="p-4 md:p-6 text-xs font-bold uppercase tracking-widest text-slate-500 w-1/4">C1–C2</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 relative">
                  {skillComparison.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 md:p-6 text-sm font-medium text-brand-900 border-r border-slate-100">
                        <div className="flex items-center gap-3">
                          <row.icon className="h-5 w-5 text-brand-400" />
                          {row.skill}
                        </div>
                      </td>
                      <td className="p-4 md:p-6 text-sm text-slate-600 border-r border-slate-100">{row.a1a2}</td>
                      <td className="p-4 md:p-6 text-sm text-slate-600 border-r border-slate-100">{row.b1b2}</td>
                      <td className="p-4 md:p-6 text-sm text-slate-600">{row.c1c2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
