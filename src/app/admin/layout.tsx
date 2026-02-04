'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FileText, Video, LayoutDashboard, LogOut, Settings, Calendar, Menu, X } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me');
            const data = await response.json();

            if (data.authenticated) {
                setAuthenticated(true);
                // If on login page and authenticated, redirect to dashboard
                if (pathname === '/admin') {
                    router.push('/admin/dashboard');
                }
            } else {
                // If not authenticated and not on login page, redirect to login
                if (pathname !== '/admin') {
                    router.push('/admin');
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            if (pathname !== '/admin') {
                router.push('/admin');
            }
        } finally {
            setLoading(false);
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

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Show login page without sidebar
    if (!authenticated || pathname === '/admin') {
        return <>{children}</>;
    }

    // Show admin layout with sidebar
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-white p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-30">
                <h1 className="text-xl font-bold text-gray-900">Taldo Admin</h1>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed md:sticky md:top-0 inset-y-0 left-0 z-50
                w-64 bg-white border-r border-gray-200 flex flex-col h-screen
                transform transition-transform duration-200 ease-in-out
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo (Desktop) */}
                <div className="p-6 border-b border-gray-200 hidden md:block">
                    <h1 className="text-2xl font-bold text-gray-900">Taldo Admin</h1>
                </div>

                {/* Mobile Header in Sidebar (optional, for branding consistency or close button) */}
                <div className="md:hidden p-4 border-b border-gray-200 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">Menu</h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link
                        href="/admin/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname === '/admin/dashboard'
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link
                        href="/admin/blogs"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.startsWith('/admin/blogs')
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <FileText size={20} />
                        <span className="font-medium">Blogs</span>
                    </Link>

                    {/* <Link
                        href="/admin/webinars"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.startsWith('/admin/webinars')
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <Video size={20} />
                        <span className="font-medium">Webinars</span>
                    </Link> */}

                    <Link
                        href="/admin/live-webinars"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.startsWith('/admin/live-webinars')
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <Calendar size={20} />
                        <span className="font-medium">Live Events</span>
                    </Link>

                    <Link
                        href="/admin/settings"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.startsWith('/admin/settings')
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                            }`}
                    >
                        <Settings size={20} />
                        <span className="font-medium">Settings</span>
                    </Link>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto w-full">
                {children}
            </main>
        </div>
    );
}
