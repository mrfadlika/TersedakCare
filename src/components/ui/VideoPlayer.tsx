'use client';

import React, { useState } from 'react';
import { Play, Video } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
    url: string;
    title?: string;
    className?: string;
}

export default function VideoPlayer({ url, title, className = '' }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check if it's a YouTube URL
    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');

    // Extract YouTube video ID
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const youtubeId = isYouTube ? getYouTubeId(url) : null;

    const handlePlay = () => {
        setIsPlaying(true);
    };

    return (
        <div className={`mt-6 ${className}`}>
            {title && (
                <div className="flex items-center gap-2 mb-3">
                    <Video className="w-5 h-5 text-primary-500" />
                    <h4 className="font-semibold text-neutral-800">{title}</h4>
                </div>
            )}

            <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 shadow-lg">
                {!isPlaying ? (
                    // Thumbnail with play button
                    <motion.button
                        onClick={handlePlay}
                        className="absolute inset-0 w-full h-full flex items-center justify-center group cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* YouTube thumbnail */}
                        {youtubeId && (
                            <img
                                src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                                alt={title || 'Video thumbnail'}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback to lower quality thumbnail
                                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                                }}
                            />
                        )}

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Play button */}
                        <div className="relative z-10 w-20 h-20 rounded-full bg-primary-500 flex items-center justify-center shadow-xl group-hover:bg-primary-600 group-hover:scale-110 transition-all duration-300">
                            <Play className="w-10 h-10 text-white ml-1" fill="white" />
                        </div>

                        {/* Title overlay */}
                        {title && (
                            <div className="absolute bottom-4 left-4 right-4 text-left">
                                <p className="text-white font-medium text-sm opacity-90">{title}</p>
                            </div>
                        )}
                    </motion.button>
                ) : (
                    // Embedded player
                    <>
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                                <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                        {isYouTube && youtubeId ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                                title={title || 'Video'}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={() => setIsLoading(false)}
                            />
                        ) : (
                            <video
                                src={url}
                                controls
                                autoPlay
                                className="absolute inset-0 w-full h-full"
                                onLoadedData={() => setIsLoading(false)}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
