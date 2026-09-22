import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { UserRecord } from '../../types';
import { api } from '../../services/api';
import {
  User,
  Shield,
  Key,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Clock,
  UserPlus,
  Trash2,
  Upload,
  Save,
  Lock,
  X
} from 'lucide-react';

export const ProfileTab: React.FC = () => {
  const { currentUser, updateProfile } = useData();
  const [usersList, setUsersList] = useState<UserRecord[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    fullName: currentUser?.fullName || '',
    department: currentUser?.department || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || '/images/arthco_logo.png',
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // New User Modal State (for IT Admin)
  const [newUserModal, setNewUserModal] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    username: '',
    password: '',
    fullName: '',
    role: 'Executive Director',
    department: 'Executive Management',
    email: '',
    phone: '',
    bio: '',
  });

  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        fullName: currentUser.fullName || '',
        department: currentUser.department || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        bio: currentUser.bio || '',
        avatar: currentUser.avatar || '/images/arthco_logo.png',
      });
    }
    loadAllUsers();
  }, [currentUser]);

  const loadAllUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const list = await api.getUsers();
      setUsersList(list);
    } catch (err: unknown) {
      console.warn('Could not load user list:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await updateProfile(profileForm);
      setStatusMessage({ type: 'success', text: 'Personal profile details updated successfully.' });
      loadAllUsers();
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to update profile.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.currentPassword) {
      setStatusMessage({ type: 'error', text: 'Please enter your current password.' });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setStatusMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (passwordForm.newPassword.length < 4) {
      setStatusMessage({ type: 'error', text: 'Password must be at least 4 characters.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await updateProfile({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setStatusMessage({ type: 'success', text: 'Password changed successfully.' });
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to change password.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserForm.username.trim() || !newUserForm.password.trim() || !newUserForm.fullName.trim()) {
      setStatusMessage({ type: 'error', text: 'Username, password, and Full Name are required.' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await api.createUser(newUserForm);
      setNewUserModal(false);
      setNewUserForm({
        username: '',
        password: '',
        fullName: '',
        role: 'Executive Director',
        department: 'Executive Management',
        email: '',
        phone: '',
        bio: '',
      });
      setStatusMessage({ type: 'success', text: `User ${newUserForm.username} created successfully.` });
      loadAllUsers();
    } catch (err: unknown) {
      setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to create user account.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string, username: string) => {
    if (currentUser?.id === id) {
      alert('You cannot delete your own logged-in account.');
      return;
    }
    if (window.confirm(`Delete backend user account "${username}"?`)) {
      try {
        await api.deleteUser(id);
        setStatusMessage({ type: 'success', text: `User ${username} deleted.` });
        loadAllUsers();
      } catch (err: unknown) {
        setStatusMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete user.' });
      }
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfileForm(prev => ({ ...prev, avatar: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#D9E3DC] shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-[#14261C] flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#2C593F]" />
            Backend Credentials & User Profiling
          </h2>
          <p className="text-xs text-[#526B5C]">
            Manage backend executive credentials (director1, director2, it), staff profile cards, permissions, and account passwords.
          </p>
        </div>

        <button
          onClick={() => setNewUserModal(true)}
          className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#2C593F] hover:bg-[#20422E] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4 mr-1.5" />
          Add User Account
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-2 border ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <Lock className="w-5 h-5 text-red-600 shrink-0" />
          )}
          {statusMessage.text}
        </div>
      )}

      {/* Grid: Active Profile & Password Change */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Current User Card & Edit Profile */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] shadow-sm">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-[#E8EFEA]">
              <div className="relative">
                <img
                  src={profileForm.avatar || '/images/arthco_logo.png'}
                  alt={currentUser?.fullName}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-[#2C593F] shadow-sm bg-[#F4F8F5]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/arthco_logo.png';
                  }}
                />
                <label className="absolute -bottom-1 -right-1 bg-[#2C593F] hover:bg-[#20422E] text-white p-1.5 rounded-full cursor-pointer shadow-md transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-lg font-bold text-[#14261C]">{currentUser?.fullName}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F3EC] text-[#2C593F]">
                    {currentUser?.role}
                  </span>
                </div>
                <p className="text-xs text-[#526B5C] font-mono mt-0.5">
                  @{currentUser?.username} • {currentUser?.department}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-[#526B5C] mt-3">
                  {currentUser?.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#2C593F]" />
                      {currentUser.email}
                    </span>
                  )}
                  {currentUser?.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#2C593F]" />
                      {currentUser.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Edit Form */}
            <form onSubmit={handleUpdateProfile} className="pt-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A4334]">
                Edit Personal Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Executive Bio & Responsibilities
                </label>
                <textarea
                  rows={2}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#2C593F] hover:bg-[#20422E] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  Save Profile Info
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Security & Change Password */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#D5E2D9] shadow-sm">
            <h3 className="text-sm font-bold text-[#14261C] uppercase tracking-wider flex items-center gap-2 mb-2">
              <Key className="w-4 h-4 text-[#2C593F]" />
              Account Security & Password
            </h3>
            <p className="text-xs text-[#526B5C] mb-4">
              Update password for the active logged-in user account ({currentUser?.username}).
            </p>

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Current Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg bg-[#14261C] hover:bg-[#0D1A13] text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Quick Default Credentials Card for convenience */}
          <div className="bg-[#FAFDFB] p-5 rounded-xl border border-[#CDE0D4] space-y-3">
            <span className="text-xs font-bold text-[#2C593F] uppercase tracking-wider block">
              Default Executive Credentials Reference:
            </span>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-white border border-[#D5E2D9] flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#14261C]">director1</span> (Executive Director)
                </div>
                <span className="font-mono text-[#2C593F] bg-[#E8F3EC] px-2 py-0.5 rounded font-bold">arthco</span>
              </div>
              <div className="p-2.5 rounded bg-white border border-[#D5E2D9] flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#14261C]">director2</span> (Operations Director)
                </div>
                <span className="font-mono text-[#2C593F] bg-[#E8F3EC] px-2 py-0.5 rounded font-bold">arthco</span>
              </div>
              <div className="p-2.5 rounded bg-white border border-[#D5E2D9] flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#14261C]">it</span> (IT Administrator)
                </div>
                <span className="font-mono text-[#2C593F] bg-[#E8F3EC] px-2 py-0.5 rounded font-bold">arthco</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team User Directory Table */}
      <div className="bg-white rounded-xl border border-[#D5E2D9] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#E8EFEA] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-[#14261C] flex items-center gap-2">
              <Building className="w-4 h-4 text-[#2C593F]" />
              Team Directory & User Profiling ({usersList.length})
            </h3>
            <p className="text-xs text-[#526B5C]">
              All registered administrators with access to the website control panel.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#F4F8F5] text-[#2C593F] border-b border-[#D5E2D9] text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role & Dept</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Last Login</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBF2ED]">
              {usersList.map(u => (
                <tr key={u.id} className="hover:bg-[#F9FCFA] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={u.avatar || '/images/arthco_logo.png'}
                        alt={u.fullName}
                        className="w-8 h-8 rounded-full object-cover border border-[#D5E2D9] bg-[#F4F8F5]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/arthco_logo.png';
                        }}
                      />
                      <div>
                        <div className="font-bold text-[#14261C] text-xs">{u.fullName}</div>
                        <div className="text-[11px] font-mono text-[#526B5C]">@{u.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs font-semibold text-[#14261C]">{u.role}</div>
                    <div className="text-[11px] text-[#526B5C]">{u.department}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-[#14261C]">{u.email || '—'}</div>
                    <div className="text-[11px] text-[#526B5C]">{u.phone || '—'}</div>
                  </td>
                  <td className="py-3 px-4 text-xs text-[#526B5C]">
                    {u.lastLogin ? (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#8BAAA4]" />
                        {new Date(u.lastLogin).toLocaleDateString()}
                      </span>
                    ) : (
                      'Never'
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {u.id !== currentUser?.id && (
                      <button
                        onClick={() => handleDeleteUser(u.id, u.username)}
                        className="p-1.5 rounded text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Creating New User */}
      {newUserModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D5E2D9] my-8 animate-in zoom-in-95 duration-150">
            <div className="bg-[#14261C] text-white p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Add Backend Staff / Director Account</h3>
                <p className="text-xs text-[#9BBBA6]">Create new credentials for website control access</p>
              </div>
              <button
                onClick={() => setNewUserModal(false)}
                className="text-[#9BBBA6] hover:text-white p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. director3"
                    value={newUserForm.username}
                    onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Initial Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="e.g. arthco"
                    value={newUserForm.password}
                    onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tinashe Nyathi"
                  value={newUserForm.fullName}
                  onChange={(e) => setNewUserForm({ ...newUserForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={newUserForm.role}
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newUserForm.department}
                    onChange={(e) => setNewUserForm({ ...newUserForm, department: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A4334] uppercase tracking-wide mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#D5E2D9] focus:ring-2 focus:ring-[#2C593F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8EFEA] flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setNewUserModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#526B5C] hover:text-[#14261C]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-[#2C593F] hover:bg-[#20422E] text-white font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
