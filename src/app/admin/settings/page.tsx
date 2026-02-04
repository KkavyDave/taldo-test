'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, LogOut, Shield, Save } from 'lucide-react';

interface UserProfile {
    name: string;
    email: string;
    role: string;
}

export default function SettingsPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    // Profile form state
    const [name, setName] = useState('');
    const [profileError, setProfileError] = useState('');
    const [profileSuccess, setProfileSuccess] = useState('');
    const [updatingProfile, setUpdatingProfile] = useState(false);

    // Password form state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await fetch('/api/auth/me');
            const data = await res.json();
            if (data.authenticated && data.user) {
                setUser(data.user);
                setName(data.user.name);
            }
        } catch (error) {
            console.error('Failed to fetch profile', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e: FormEvent) => {
        e.preventDefault();
        setProfileError('');
        setProfileSuccess('');
        setUpdatingProfile(true);

        try {
            const res = await fetch('/api/auth/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            const data = await res.json();

            if (res.ok) {
                setProfileSuccess('Profile updated successfully!');
                if (user) {
                    setUser({ ...user, name });
                }
                router.refresh(); // Refresh to update header name if displayed anywhere
            } else {
                setProfileError(data.error || 'Failed to update profile');
            }
        } catch (error) {
            setProfileError('An error occurred. Please try again.');
        } finally {
            setUpdatingProfile(false);
        }
    };

    const handleChangePassword = async (e: FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (newPassword.length < 8) {
            setPasswordError('New password must be at least 8 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }

        setChangingPassword(true);

        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await res.json();

            if (res.ok) {
                setPasswordSuccess('Password changed successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setPasswordError(data.error || 'Failed to change password');
            }
        } catch (error) {
            setPasswordError('An error occurred. Please try again.');
        } finally {
            setChangingPassword(false);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/admin');
            router.refresh();
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Loading profile...</div>;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium w-full sm:w-auto"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>

            <div className="grid gap-8">
                {/* Profile Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <User size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Profile Details</h2>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="max-w-md space-y-5">
                        {profileError && (
                            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                                {profileError}
                            </div>
                        )}

                        {profileSuccess && (
                            <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
                                {profileSuccess}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                disabled
                                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                            />
                            <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={updatingProfile}
                                className="flex items-center gap-2 px-6 py-2.5 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                <Save size={18} />
                                {updatingProfile ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Change Password */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                            <Lock size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Change Password</h2>
                    </div>

                    <form onSubmit={handleChangePassword} className="max-w-md space-y-5">
                        {passwordError && (
                            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                                {passwordError}
                            </div>
                        )}

                        {passwordSuccess && (
                            <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
                                {passwordSuccess}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                required
                                minLength={8}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={changingPassword}
                                className="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                {changingPassword ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
