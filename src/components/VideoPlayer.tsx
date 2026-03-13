"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface VideoPlayerProps {
    url: string;           // any YouTube URL or embed URL
    thumbnail?: string;    // optional poster image
    title?: string;
}

function getYoutubeEmbedUrl(url: string): string {
    if (!url) return "";

    // Already an embed URL — use as-is
    if (url.includes("youtube.com/embed/")) return url;

    // youtu.be short link
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    // Standard watch URL
    const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    // Raw 11-char ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        return `https://www.youtube.com/embed/${url.trim()}`;
    }

    return url;
}

export function VideoPlayer({ url, thumbnail, title }: VideoPlayerProps) {
    const [started, setStarted] = useState(false);
    const embedUrl = getYoutubeEmbedUrl(url);

    // Show click-to-play poster before loading iframe (improves page speed)
    if (!started) {
        return (
            <div
                className="relative w-full aspect-video rounded-xl overflow-hidden bg-black cursor-pointer group shadow-lg ring-1 ring-border"
                onClick={() => setStarted(true)}
                role="button"
                aria-label="تشغيل الفيديو"
            >
                {/* Poster image — YouTube thumbnail or custom */}
                {thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={thumbnail}
                        alt={title || "فيديو الدرس"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/95 group-hover:scale-110 transition-transform duration-200 shadow-2xl flex items-center justify-center">
                        <Play size={32} className="text-primary fill-primary mr-[-4px]" />
                    </div>
                </div>

                {/* Title overlay */}
                {title && (
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                        <p className="text-white text-sm font-medium truncate">{title}</p>
                    </div>
                )}
            </div>
        );
    }

    if (!embedUrl) {
        return (
            <div className="w-full aspect-video rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                رابط الفيديو غير صالح
            </div>
        );
    }

    return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-lg ring-1 ring-border">
            <iframe
                src={`${embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={title || "فيديو الدرس"}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}
