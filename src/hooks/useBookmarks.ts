'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface Bookmark {
    id: string;
    title: string;
    category: string;
    path: string;
    createdAt?: string;
}

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    // Fetch bookmarks from API
    const fetchBookmarks = useCallback(async () => {
        if (!isAuthenticated) {
            setBookmarks([]);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/bookmarks', { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setBookmarks(data.bookmarks.map((b: { item_id: string; item_title: string; item_category: string; item_path: string; created_at: string }) => ({
                    id: b.item_id,
                    title: b.item_title,
                    category: b.item_category,
                    path: b.item_path,
                    createdAt: b.created_at
                })));
            }
        } catch (error) {
            console.error('Failed to fetch bookmarks:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        fetchBookmarks();
    }, [fetchBookmarks]);

    const addBookmark = async (bookmark: Omit<Bookmark, 'createdAt'>) => {
        if (!isAuthenticated) return;

        // Optimistic update
        const newBookmark: Bookmark = {
            ...bookmark,
            createdAt: new Date().toISOString(),
        };
        setBookmarks(prev => [...prev, newBookmark]);

        try {
            await fetch('/api/bookmarks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(bookmark)
            });
        } catch (error) {
            console.error('Failed to add bookmark:', error);
            // Revert on error
            setBookmarks(prev => prev.filter(b => b.id !== bookmark.id));
        }
    };

    const removeBookmark = async (id: string) => {
        if (!isAuthenticated) return;

        // Optimistic update
        const previousBookmarks = bookmarks;
        setBookmarks(prev => prev.filter(b => b.id !== id));

        try {
            await fetch('/api/bookmarks', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ id })
            });
        } catch (error) {
            console.error('Failed to remove bookmark:', error);
            // Revert on error
            setBookmarks(previousBookmarks);
        }
    };

    const isBookmarked = (id: string) => {
        return bookmarks.some(b => b.id === id);
    };

    const toggleBookmark = async (bookmark: Omit<Bookmark, 'createdAt'>) => {
        if (isBookmarked(bookmark.id)) {
            await removeBookmark(bookmark.id);
        } else {
            await addBookmark(bookmark);
        }
    };

    return {
        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,
        toggleBookmark,
        isLoading,
        refetch: fetchBookmarks
    };
}
