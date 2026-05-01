import React, { useState, useEffect } from 'react';
import { useAuth } from './lib/AuthContext';
import { db } from './lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { BookOpen, Calendar, Clock, CreditCard, LogOut, Settings, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!user) return;
      try {
        setIsFetching(true);
        // Fetch user data
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        // Fetch user bookings
        const q = query(collection(db, 'bookings'), where("email", "==", user.email));
        const bookingSnap = await getDocs(q);
        const bookingData: any[] = [];
        bookingSnap.forEach(b => bookingData.push({ id: b.id, ...b.data() }));
        bookingData.sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchStudentData();
  }, [user]);

  if (loading || isFetching) {
    return (
      <main className="flex-grow pt-32 pb-24 bg-brand-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-900"></div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="flex-grow pt-24 pb-24 bg-brand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-brand-100 p-8 mb-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center text-brand-800 text-3xl font-serif italic font-bold">
              {user.email?.charAt(0).toUpperCase() || 'S'}
            </div>
            <div>
              <h1 className="text-3xl font-serif text-brand-900">Welcome Back!</h1>
              <p className="text-brand-500 mt-1">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link to="/book" className="bg-brand-900 text-white px-6 py-3 rounded-md text-xs uppercase tracking-widest font-bold shadow-md hover:bg-brand-800 transition-colors">
              Book a Lesson
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats / Quick Links */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-brand-100 p-6">
              <h2 className="text-lg font-bold text-brand-900 mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                Your Plan
              </h2>
              {userData?.hasPurchased ? (
                <div className="bg-brand-50 p-4 rounded-lg border border-brand-100">
                  <p className="text-sm text-brand-700 font-medium mb-1">Active Plan Member</p>
                  <p className="text-xs text-brand-500">You have successfully purchased a plan.</p>
                </div>
              ) : (
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="text-sm text-slate-700 font-medium mb-2">No Active Plan</p>
                  <Link to="/#pricing" className="text-xs text-accent font-bold hover:underline">
                    View Pricing Plans →
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-brand-100 p-6">
              <h2 className="text-lg font-bold text-brand-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-brand-500" />
                Quick Actions
              </h2>
              <div className="space-y-2">
                <Link to="/proficiency-test" className="flex items-center justify-between p-3 hover:bg-brand-50 rounded-lg transition-colors border border-transparent hover:border-brand-100 group">
                  <span className="text-sm font-medium text-brand-700 group-hover:text-brand-900">Retake Level Test</span>
                  <span className="text-brand-400 group-hover:text-accent">→</span>
                </Link>
                <Link to="/library" className="flex items-center justify-between p-3 hover:bg-brand-50 rounded-lg transition-colors border border-transparent hover:border-brand-100 group">
                  <span className="text-sm font-medium text-brand-700 group-hover:text-brand-900">Resource Library</span>
                  <span className="text-brand-400 group-hover:text-accent">→</span>
                </Link>
                <button onClick={logout} className="w-full flex items-center justify-between p-3 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 group text-left">
                  <span className="text-sm font-medium text-red-600">Sign Out</span>
                  <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Booking History */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-brand-100 overflow-hidden">
              <div className="px-6 py-5 border-b border-brand-100 flex justify-between items-center bg-brand-50/50">
                <h2 className="text-lg font-bold text-brand-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-600" />
                  Your Lesson History
                </h2>
              </div>
              
              <div className="p-6">
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-brand-100 rounded-lg hover:border-brand-300 transition-colors bg-white">
                        <div className="mb-2 sm:mb-0">
                          <p className="font-bold text-brand-900">{new Date(booking.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                          <div className="flex items-center text-sm text-brand-500 mt-1 gap-2">
                            <Clock className="w-4 h-4" /> {booking.time}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            booking.status === 'completed' ? 'bg-slate-100 text-slate-700' :
                            booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {booking.status || 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 px-4 border-2 border-dashed border-brand-100 rounded-lg">
                    <BookOpen className="w-12 h-12 text-brand-200 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-brand-900 mb-1">No lessons booked yet</h3>
                    <p className="text-brand-500 text-sm mb-6 max-w-md mx-auto">Start your learning journey by booking your first lesson with our expert instructors.</p>
                    <Link to="/book" className="inline-block border border-brand-200 text-brand-800 hover:bg-brand-50 hover:border-brand-300 transition-colors px-6 py-2 rounded-md text-xs uppercase tracking-widest font-bold">
                      Book Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
