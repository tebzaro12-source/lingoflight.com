import React, { useState } from 'react';
import { useAuth } from './lib/AuthContext';
import { db } from './lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from './lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function BookingPage() {
  const { user, loading, signInWithGoogle } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [bookingError, setBookingError] = useState("");

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", 
    "16:00", "16:30"
  ];

  const handleNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const handlePrevWeek = () => setCurrentDate(subWeeks(currentDate, 1));

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 5 }).map((_, i) => addDays(startOfCurrentWeek, i));

  const handleBookLesson = async () => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    
    if (!selectedDate || !selectedTime) return;

    setBookingStatus("submitting");
    setBookingError("");

    try {
      // Need a random doc ID that matches the rules: string, <=128, alphanumeric + dashes
      const bookingId = crypto.randomUUID();
      const bookingRef = doc(db, 'bookings', bookingId);
      
      await setDoc(bookingRef, {
        userId: user.uid,
        studentName: user.displayName || 'Unknown',
        studentEmail: user.email || '',
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setBookingStatus("success");
    } catch (error: any) {
      console.error(error);
      setBookingStatus("error");
      setBookingError(error.message || "Failed to book your lesson.");
      handleFirestoreError(error, OperationType.CREATE, `bookings/${user.uid}`);
    }
  };

  if (loading) {
    return (
      <main className="flex-grow pt-32 pb-24 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-800 rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-24 pb-24 bg-brand-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-4">Free Trial Lesson</h1>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-900 mb-6">Book Your <span className="italic">Free Demo</span></h2>
          <p className="text-brand-600 max-w-xl mx-auto">Select a day and time to schedule your free 30-minute introductory English lesson. All times are in your local timezone.</p>
        </div>

        {!user ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-brand-100 max-w-xl mx-auto">
            <CalendarIcon className="h-16 w-16 mx-auto text-brand-300 mb-6" />
            <h3 className="text-xl font-serif text-brand-900 mb-4">Please sign in to book</h3>
            <p className="text-brand-600 mb-8">You need an account to schedule and manage your lessons.</p>
            <button 
              onClick={signInWithGoogle}
              className="bg-brand-900 text-white px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-md hover:bg-brand-800 transition-all shadow-xl shadow-brand-900/10"
            >
              Sign up / Log in
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden">
            {bookingStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-16 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-serif text-brand-900 mb-4">Lesson Booked Successfully!</h3>
                <p className="text-brand-600 mb-8">We've scheduled your lesson for <strong>{selectedDate && format(selectedDate, 'MMMM d, yyyy')}</strong> at <strong>{selectedTime}</strong>.</p>
                <button 
                  onClick={() => {
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setBookingStatus("idle");
                  }}
                  className="bg-brand-100 text-brand-900 px-8 py-4 text-xs font-bold uppercase tracking-wider rounded-md hover:bg-brand-200 transition-all"
                >
                  Book Another Lesson
                </button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-brand-100">
                {/* Date Selection */}
                <div className="p-8 lg:col-span-3">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-brand-900 flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-3 text-brand-500" />
                      Select a Date
                    </h3>
                    <div className="flex items-center gap-4">
                      <button onClick={handlePrevWeek} className="p-2 hover:bg-brand-50 rounded-full transition-colors text-brand-600">
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="text-sm font-medium text-brand-900 min-w-28 text-center">
                        {format(startOfCurrentWeek, 'MMM yyyy')}
                      </span>
                      <button onClick={handleNextWeek} className="p-2 hover:bg-brand-50 rounded-full transition-colors text-brand-600">
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    {weekDays.map((day, idx) => {
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      const isPast = day < new Date(new Date().setHours(0,0,0,0));
                      
                      return (
                        <button
                          key={idx}
                          disabled={isPast}
                          onClick={() => {
                            setSelectedDate(day);
                            setSelectedTime(null);
                          }}
                          className={`flex flex-col items-center p-4 rounded-xl transition-all border ${
                            isSelected 
                              ? 'bg-brand-900 border-brand-900 text-white shadow-md shadow-brand-900/20' 
                              : isPast
                                ? 'opacity-30 cursor-not-allowed border-transparent bg-slate-50'
                                : 'bg-white border-brand-100 hover:border-brand-300 text-brand-900'
                          }`}
                        >
                          <span className={`text-[10px] font-bold uppercase tracking-widest block mb-2 ${isSelected ? 'text-white/80' : 'text-brand-500'}`}>
                            {format(day, 'EEE')}
                          </span>
                          <span className="text-2xl font-serif">
                            {format(day, 'd')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="p-8 lg:col-span-2 bg-brand-50/50">
                  <h3 className="text-lg font-bold text-brand-900 flex items-center mb-6">
                    <Clock className="h-5 w-5 mr-3 text-brand-500" />
                    Available Times
                  </h3>

                  {!selectedDate ? (
                    <div className="h-48 flex items-center justify-center text-center px-4">
                      <p className="text-brand-500 italic text-sm">Please select a date first to see available times.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {timeSlots.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-3 px-4 rounded-lg text-sm font-medium transition-all text-center border ${
                                isSelected
                                  ? 'bg-accent border-accent text-white shadow-md shadow-accent/20'
                                  : 'bg-white border-brand-200 text-brand-700 hover:border-brand-400'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-6 border-t border-brand-200">
                        {bookingError && (
                          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
                            {bookingError}
                          </div>
                        )}
                        <button
                          disabled={!selectedTime || bookingStatus === "submitting"}
                          onClick={handleBookLesson}
                          className={`w-full py-4 text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-xl shadow-brand-900/10 ${
                            !selectedTime || bookingStatus === "submitting"
                              ? 'bg-brand-200 text-brand-400 cursor-not-allowed'
                              : 'bg-brand-900 text-white hover:bg-brand-800'
                          }`}
                        >
                          {bookingStatus === "submitting" ? 'Confirming...' : 'Confirm Booking'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
