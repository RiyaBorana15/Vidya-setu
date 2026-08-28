import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  UserPlus, 
  Download, 
  CheckCircle2, 
  Activity, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Award,
  TrendingUp
} from 'lucide-react';
import StudentProfileModal from './StudentProfileModal';
import AddStudentModal from './AddStudentModal';
import { STUDENTS_DATA } from '../../data/studentsData';
import { soundEffects } from '../../utils/soundEffects';

export default function StudentDatabaseHub() {
  const [students, setStudents] = useState(STUDENTS_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisability, setSelectedDisability] = useState('All');
  const [selectedStudentForView, setSelectedStudentForView] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const disabilityFilters = [
    'All',
    'Dyslexia',
    'Deaf / Hard-of-Hearing',
    'Dyscalculia & ADHD',
    'Dysgraphia',
    'Visual Processing'
  ];

  const filteredStudents = students.filter((stu) => {
    const matchesSearch = 
      stu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stu.disabilityType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDisability = 
      selectedDisability === 'All' || 
      stu.disabilityType.toLowerCase().includes(selectedDisability.toLowerCase());

    return matchesSearch && matchesDisability;
  });

  const handleAddStudent = (newStudent) => {
    setStudents([newStudent, ...students]);
    setIsAddModalOpen(false);
  };

  const exportCSV = () => {
    soundEffects.playClick();
    const headers = ['Student ID', 'Name', 'Grade', 'Age', 'Disability Type', 'IEP Status', 'Attendance', 'Quiz Average'];
    const rows = students.map(s => [
      s.id,
      `"${s.name}"`,
      `"${s.grade}"`,
      s.age,
      `"${s.disabilityType}"`,
      `"${s.iepStatus}"`,
      s.attendance,
      `${s.quizAverage}%`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `aicte-iep-database-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="pro-card p-6 flex flex-wrap items-center justify-between gap-4 border border-emerald-500/20 bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 shadow-xl shadow-emerald-500/30">
            <Database size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                Unified Inclusive Students & IEP Registry
              </h2>
              <span className="badge-pro bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px]">
                AICTE Official Database
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Centralized record management of neurodivergent & hearing-impaired learners with individual accommodations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportCSV}
            className="btn-pro btn-glass text-xs px-4 py-2.5 cursor-pointer flex items-center gap-1.5"
            title="Export CSV data"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setIsAddModalOpen(true);
            }}
            className="btn-pro btn-gradient-emerald text-xs px-5 py-2.5 cursor-pointer flex items-center gap-1.5 shadow-lg shadow-emerald-500/25 font-black"
          >
            <UserPlus size={15} />
            <span>Enroll New Learner</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="pro-card p-4 text-center">
          <div className="text-3xl font-black text-white font-['Outfit']">{students.length}</div>
          <div className="text-xs text-slate-400 mt-1 font-semibold">Enrolled Learners</div>
        </div>
        <div className="pro-card p-4 text-center">
          <div className="text-3xl font-black text-cyan-300 font-['Outfit']">100%</div>
          <div className="text-xs text-slate-400 mt-1 font-semibold">Active IEP Profiles</div>
        </div>
        <div className="pro-card p-4 text-center">
          <div className="text-3xl font-black text-emerald-400 font-['Outfit']">93.6%</div>
          <div className="text-xs text-slate-400 mt-1 font-semibold">Average Attendance</div>
        </div>
        <div className="pro-card p-4 text-center">
          <div className="text-3xl font-black text-amber-400 font-['Outfit']">86.2%</div>
          <div className="text-xs text-slate-400 mt-1 font-semibold">Flashcard Retention Rate</div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="pro-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name, ID, disability, or grade..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-950/80 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="text-xs text-slate-400 font-semibold">
            Showing <strong className="text-cyan-300">{filteredStudents.length}</strong> of {students.length} Registered Learners
          </div>
        </div>

        {/* Disability Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {disabilityFilters.map((df) => (
            <button
              key={df}
              onClick={() => {
                soundEffects.playClick();
                setSelectedDisability(df);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer border ${
                selectedDisability === df
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 border-cyan-300 text-white shadow-md shadow-emerald-500/25 scale-105'
                  : 'bg-white/[0.04] border-white/10 text-slate-400 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {df}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Table View */}
      <div className="pro-card rounded-3xl overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/90 text-slate-400 font-extrabold uppercase tracking-wider text-[11px] border-b border-white/10">
              <tr>
                <th className="py-4 px-5">Student</th>
                <th className="py-4 px-5">Disability Classification</th>
                <th className="py-4 px-5">IEP Plan Status</th>
                <th className="py-4 px-5">Attendance</th>
                <th className="py-4 px-5">Quiz Avg</th>
                <th className="py-4 px-5">Flashcard Retention</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.map((stu) => (
                <tr
                  key={stu.id}
                  className="hover:bg-white/[0.04] transition-colors group cursor-pointer"
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedStudentForView(stu);
                  }}
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={stu.avatar}
                        alt={stu.name}
                        className="w-11 h-11 rounded-2xl object-cover border border-cyan-400/50 shadow-md group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <div className="font-black text-white group-hover:text-cyan-300 transition-colors text-sm">
                          {stu.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">{stu.id} • {stu.grade}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5 font-semibold text-slate-200">
                    <span className="badge-pro bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 text-[10px]">
                      {stu.disabilityType}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="badge-pro bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px]">
                      {stu.iepStatus}
                    </span>
                  </td>

                  <td className="py-4 px-5 font-black text-emerald-400 text-sm">
                    {stu.attendance}
                  </td>

                  <td className="py-4 px-5 font-black text-cyan-300 text-sm">
                    {stu.quizAverage}%
                  </td>

                  <td className="py-4 px-5 font-black text-amber-400 text-sm">
                    {stu.flashcardMastery}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEffects.playClick();
                        setSelectedStudentForView(stu);
                      }}
                      className="btn-pro btn-glass text-[11px] px-3.5 py-1.5 hover:bg-cyan-500/20 hover:text-cyan-300 border-white/10"
                    >
                      <Eye size={13} />
                      <span>View IEP</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Student Profile Modal */}
      {selectedStudentForView && (
        <StudentProfileModal
          student={selectedStudentForView}
          onClose={() => setSelectedStudentForView(null)}
        />
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <AddStudentModal
          onClose={() => setIsAddModalOpen(false)}
          onAddStudent={handleAddStudent}
        />
      )}
    </div>
  );
}
