import React, { useState, useEffect } from 'react';
import { useAuth } from './lib/AuthContext';
import { db } from './lib/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, query } from 'firebase/firestore';
import { Plus, Edit2, Trash2, X, Search, Database } from 'lucide-react';
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
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
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
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface Student {
  id: string;
  studentId?: string;
  fullName: string;
  age?: number;
  company?: string;
  industry?: string;
  jobTitle?: string;
  course?: string;
  payment?: string;
  credits?: number;
  refund?: string;
  bookedLesson?: string;
  studentType?: string;
  country?: string;
  startDate?: string;
  platform?: string;
  bonus?: string;
  extra?: string;
  email: string;
  phoneNumber?: string;
}

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [search, setSearch] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Partial<Student>>({
    fullName: '',
    email: '',
  });

  const ADMIN_EMAIL = 'tebzaro12@gmail.com';

  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'bookings'>('students');

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      if (activeTab === 'students') {
        fetchStudents();
      } else {
        fetchBookings();
      }
    } else {
      setIsFetching(false);
    }
  }, [user, activeTab]);

  const fetchBookings = async () => {
    try {
      setIsFetching(true);
      const q = query(collection(db, 'bookings'));
      const snapshot = await getDocs(q);
      const bookingsData: any[] = [];
      snapshot.forEach(doc => {
        bookingsData.push({ id: doc.id, ...doc.data() });
      });
      // Sort by date/time down locally for simplicity, or just order via firestore (requires index)
      bookingsData.sort((a, b) => new Date(`${b.date}T${b.time}`).getTime() - new Date(`${a.date}T${a.time}`).getTime());
      setBookings(bookingsData);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'bookings');
    } finally {
      setIsFetching(false);
    }
  };

  const handleUpdateBookingStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
      fetchBookings();
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${id}`);
    }
  };

  const fetchStudents = async () => {
    try {
      const q = query(collection(db, 'students'));
      const snapshot = await getDocs(q);
      const studentData: Student[] = [];
      snapshot.forEach(doc => {
        studentData.push({ id: doc.id, ...doc.data() } as Student);
      });
      setStudents(studentData);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'students');
    } finally {
      setIsFetching(false);
    }
  };

  const handleOpenModal = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
    } else {
      setEditingStudent(null);
      setFormData({ fullName: '', email: '' });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteDoc(doc(db, 'students', id));
        fetchStudents();
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `students/${id}`);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert("Full Name and Email are required");
      return;
    }

    try {
      const dbData: any = { ...formData };
      delete dbData.id;

      // Clean up empty strings or undefineds to avoid saving garbage
      Object.keys(dbData).forEach(key => {
        if (dbData[key] === '' || dbData[key] === undefined) {
          delete dbData[key];
        }
      });
      
      if (dbData.age) dbData.age = Number(dbData.age);
      if (dbData.credits) dbData.credits = Number(dbData.credits);

      if (editingStudent) {
        await updateDoc(doc(db, 'students', editingStudent.id), {
          ...dbData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'students'), {
          ...dbData,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      fetchStudents();
    } catch (error) {
      if (editingStudent) {
        handleFirestoreError(error, OperationType.UPDATE, `students/${editingStudent.id}`);
      } else {
        handleFirestoreError(error, OperationType.CREATE, 'students');
      }
    }
  };

  if (loading || isFetching) {
    return (
      <main className="flex-grow pt-32 pb-24 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-brand-800 rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <main className="flex-grow pt-32 pb-24 bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Database className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-serif text-slate-800 mb-2">Access Denied</h1>
          <p className="text-slate-500">You do not have permission to view this page.</p>
        </div>
      </main>
    );
  }

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(search.toLowerCase()) || 
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    (s.studentId && s.studentId.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="flex-grow pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center space-x-4 mb-6">
          <button 
            onClick={() => setActiveTab('students')}
            className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-all ${
              activeTab === 'students' 
                ? 'bg-brand-900 text-white shadow-md' 
                : 'bg-white text-brand-600 hover:bg-brand-100'
            }`}
          >
            Students CRM
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-md transition-all ${
              activeTab === 'bookings' 
                ? 'bg-brand-900 text-white shadow-md' 
                : 'bg-white text-brand-600 hover:bg-brand-100'
            }`}
          >
            Bookings
          </button>
        </div>
        
        {activeTab === 'students' ? (
          <>
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h1 className="text-2xl font-serif text-brand-900">Student Database</h1>
                <p className="text-slate-500 text-sm">Owner exclusive CRM. Manage all student records here.</p>
              </div>
              <div className="flex w-full md:w-auto items-center gap-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search students..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>
                <button 
                  onClick={() => handleOpenModal()}
                  className="bg-brand-900 text-white px-4 py-2 text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-brand-800 transition-colors flex items-center shrink-0"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </button>
              </div>
            </div>

        <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[max-content]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Actions</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Student ID</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Name</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Email</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Course</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Credits</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Phone</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Country</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Age</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Company</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Industry</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Job Title</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Payment</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Refund</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Booked</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Type</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Start Date</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Platform</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Bonus</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Extra</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={20} className="p-8 text-center text-slate-500">No students found.</td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleOpenModal(student)} className="text-brand-600 hover:text-brand-900"><Edit2 className="h-4 w-4"/></button>
                        <button onClick={() => handleDelete(student.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4"/></button>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-mono text-slate-600">{student.studentId || '-'}</td>
                    <td className="p-4 text-sm font-medium text-slate-900">{student.fullName}</td>
                    <td className="p-4 text-sm text-slate-600">{student.email}</td>
                    <td className="p-4 text-sm text-slate-600">{student.course || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.credits ?? '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.phoneNumber || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.country || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.age ?? '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.company || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.industry || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.jobTitle || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.payment || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.refund || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.bookedLesson || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.studentType || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.startDate || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.platform || '-'}</td>
                    <td className="p-4 text-sm text-slate-600">{student.bonus || '-'}</td>
                    <td className="p-4 text-sm text-slate-600 max-w-xs truncate" title={student.extra}>{student.extra || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
          </>
        ) : (
          <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-200">
              <h2 className="text-xl font-serif text-brand-900">Student Bookings</h2>
              <p className="text-slate-500 text-sm mt-1">Manage and update lesson statuses.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Student</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Email</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Date & Time</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                    <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-500">No bookings found.</td>
                    </tr>
                  ) : (
                    bookings.map(booking => (
                      <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 font-medium text-brand-900">{booking.studentName}</td>
                        <td className="p-4 text-sm text-brand-600">{booking.studentEmail}</td>
                        <td className="p-4 text-sm text-brand-600">
                          {booking.date} at {booking.time}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={booking.status}
                            onChange={(e) => handleUpdateBookingStatus(booking.id, e.target.value)}
                            className="text-xs border-slate-300 rounded-md shadow-sm focus:border-brand-500 focus:ring-brand-500 bg-white px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-sm shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-xl font-serif text-brand-900">{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Required Fields */}
                <div className="lg:col-span-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 pb-2 border-b">Core Information *</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Full Name *</label>
                      <input required type="text" value={formData.fullName || ''} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Email *</label>
                      <input required type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Tracking IDs */}
                <div className="lg:col-span-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 pb-2 border-b">Tracking Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Student ID</label>
                      <input type="text" value={formData.studentId || ''} onChange={e => setFormData({...formData, studentId: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Student Type</label>
                      <input type="text" value={formData.studentType || ''} onChange={e => setFormData({...formData, studentType: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Platform</label>
                      <input type="text" value={formData.platform || ''} onChange={e => setFormData({...formData, platform: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Personal & Professional */}
                <div className="lg:col-span-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 pb-2 border-b">Personal & Professional</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Age</label>
                      <input type="number" value={formData.age || ''} onChange={e => setFormData({...formData, age: Number(e.target.value)})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Phone Number</label>
                      <input type="text" value={formData.phoneNumber || ''} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Country</label>
                      <input type="text" value={formData.country || ''} onChange={e => setFormData({...formData, country: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Company</label>
                      <input type="text" value={formData.company || ''} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Industry</label>
                      <input type="text" value={formData.industry || ''} onChange={e => setFormData({...formData, industry: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Job Title</label>
                      <input type="text" value={formData.jobTitle || ''} onChange={e => setFormData({...formData, jobTitle: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Course & Finances */}
                <div className="lg:col-span-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 pb-2 border-b">Course & Financial</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Course</label>
                      <input type="text" value={formData.course || ''} onChange={e => setFormData({...formData, course: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Start Date</label>
                      <input type="text" value={formData.startDate || ''} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Booked Lesson</label>
                      <input type="text" value={formData.bookedLesson || ''} onChange={e => setFormData({...formData, bookedLesson: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Credits</label>
                      <input type="number" value={formData.credits || ''} onChange={e => setFormData({...formData, credits: Number(e.target.value)})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Payment</label>
                      <input type="text" value={formData.payment || ''} onChange={e => setFormData({...formData, payment: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Refund</label>
                      <input type="text" value={formData.refund || ''} onChange={e => setFormData({...formData, refund: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                  </div>
                </div>

                {/* Additional */}
                <div className="lg:col-span-3">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-4 pb-2 border-b">Additional Data</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Bonus</label>
                      <input type="text" value={formData.bonus || ''} onChange={e => setFormData({...formData, bonus: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Extra</label>
                      <input type="text" value={formData.extra || ''} onChange={e => setFormData({...formData, extra: e.target.value})} className="w-full border border-slate-300 rounded-sm px-3 py-2 text-sm focus:border-brand-500 outline-none" />
                    </div>
                  </div>
                </div>

              </div>

              <div className="border-t border-slate-200 mt-8 pt-6 flex justify-end gap-4 sticky bottom-0 bg-white">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-slate-300 rounded-sm text-sm font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-brand-900 text-white rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-brand-800 shadow-sm">{editingStudent ? 'Save Changes' : 'Create Student'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
