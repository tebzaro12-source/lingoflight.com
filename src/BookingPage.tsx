import React, { useState } from 'react';
import { useAuth } from './lib/AuthContext';
import { db } from './lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
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
  const calendlyUrl = import.meta.env.VITE_CALENDLY_URL || "https://calendly.com/tebzaro12/new-meeting";
  
  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      let currentUser = auth.currentUser;
      if (!currentUser) {
        // Allow unauthenticated booking to proceed via Calendly directly
        return;
      }
      
      try {
        const bookingId = crypto.randomUUID();
        const bookingRef = doc(db, 'bookings', bookingId);
        
        await setDoc(bookingRef, {
          userId: currentUser.uid,
          studentName: currentUser.displayName || 'Unknown',
          studentEmail: currentUser.email || '',
          calendlyEventUri: e.data.payload.event.uri,
          calendlyInviteeUri: e.data.payload.invitee.uri,
          status: 'pending',
          createdAt: serverTimestamp()
        });
        
        // Note: For email sending, Calendly handles the basic notification automatically,
        // but we keep the firestore record for the student dashboard.
      } catch (error: any) {
        console.error(error);
        handleFirestoreError(error, OperationType.CREATE, `bookings/${currentUser.uid}`);
      }
    },
  });

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
          <h1 className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent mb-4">Book a Lesson</h1>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-900 mb-6">Schedule Your <span className="italic">Session</span></h2>
          <p className="text-brand-600 max-w-xl mx-auto">Select a day and time to schedule your English lesson. All times are in your local timezone.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-brand-100 overflow-hidden min-h-[700px]">
          <InlineWidget url={calendlyUrl} styles={{ height: '700px', width: '100%' }} />
        </div>
      </div>
    </main>
  );
}
