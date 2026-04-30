import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const questions = [
  // Grammar & Vocabulary
  {
    id: 1,
    section: "Grammar",
    level: "A1",
    question: "She ___ to school every day.",
    options: ["go", "goes", "going", "gone"],
    answer: "goes",
  },
  {
    id: 2,
    section: "Grammar",
    level: "A2",
    question: "I ___ coffee in the morning.",
    options: ["drink", "drinks", "drinking", "drank"],
    answer: "drink",
  },
  {
    id: 3,
    section: "Grammar",
    level: "B1",
    question: "If I ___ you, I would accept the offer.",
    options: ["am", "was", "were", "be"],
    answer: "were",
  },
  {
    id: 4,
    section: "Grammar",
    level: "C1",
    question: "Hardly had I arrived ___ the meeting started.",
    options: ["when", "than", "that", "while"],
    answer: "when",
  },

  // Reading-style questions (simulated)
  {
    id: 5,
    section: "Reading",
    level: "B1",
    question: "Online learning allows students to study from anywhere. What is one advantage?",
    options: ["Flexibility", "Higher cost", "Less access", "More exams"],
    answer: "Flexibility",
  },
  {
    id: 6,
    section: "Reading",
    level: "B2",
    question: "A major challenge of online learning is:",
    options: ["Motivation", "Weather", "Transport", "Books"],
    answer: "Motivation",
  },
];

function getCEFR(score: number) {
  if (score <= 20) return "A1 (Beginner)";
  if (score <= 40) return "A2 (Elementary)";
  if (score <= 60) return "B1 (Intermediate)";
  if (score <= 75) return "B2 (Upper Intermediate)";
  if (score <= 90) return "C1 (Advanced)";
  return "C2 (Proficient)";
}

export default function ProficiencyTestPage() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<{qid: number, selected: string}[]>([]);
  const [finished, setFinished] = useState(false);

  const current = questions[index];

  const handleAnswer = (option: string) => {
    setAnswers([...answers, { qid: current.id, selected: option }]);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((a) => {
      const q = questions.find((q) => q.id === a.qid);
      if (q && q.answer === a.selected) correct++;
    });

    return Math.round((correct / questions.length) * 100);
  };

  if (finished) {
    const score = calculateScore();
    const level = getCEFR(score);

    return (
      <main className="flex-grow pt-32 pb-24 bg-brand-50 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-sm border border-brand-100 shadow-sm">
             <div className="text-center mb-10">
                <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle2 className="h-10 w-10 text-accent" />
                </div>
                <h1 className="text-3xl font-serif text-brand-900 mb-2">🎓 Test Completed</h1>
                <p className="text-slate-500">Here are your estimated proficiency results.</p>
             </div>

             <div className="bg-brand-900 text-white rounded-sm p-6 mb-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-brand-800 blur-2xl rounded-full"></div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-200 mb-2 relative z-10">Your Score: {score}%</p>
                <h3 className="text-3xl md:text-5xl font-serif italic relative z-10">{level}</h3>
             </div>

             <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
                <button 
                  onClick={() => {
                    setIndex(0);
                    setAnswers([]);
                    setFinished(false);
                  }}
                  className="px-8 py-3 bg-accent text-white rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-accent-hover transition-colors"
                >
                  Restart Test
                </button>
                <Link 
                  to="/#programs" 
                  className="inline-block text-center border border-slate-300 py-3 px-8 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-50 rounded-sm"
                >
                  View Curriculum
                </Link>
             </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-32 pb-24 bg-brand-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-serif text-brand-900 mb-4">English Proficiency Test</h1>
        <p className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-8">
          Question {index + 1} of {questions.length}
        </p>

        <div className="bg-white p-6 md:p-10 rounded-sm border border-brand-100 shadow-sm text-left">
          <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500">
                Section: {current.section} ({current.level})
              </span>
          </div>

          <h3 className="text-xl md:text-2xl font-serif text-brand-900 mb-8 font-medium">
            {current.question}
          </h3>

          <div className="flex flex-col gap-3">
            {current.options.map((opt, i) => (
              <button 
                key={i} 
                onClick={() => handleAnswer(opt)}
                className="w-full text-left px-5 py-4 rounded-sm border border-brand-200 hover:border-brand-400 hover:bg-brand-50 bg-white text-slate-700 transition-all text-sm flex items-center"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
