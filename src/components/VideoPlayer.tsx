"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// ReactPlayer must be dynamically imported on client side to avoid hydration errors
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any;

interface VideoPlayerProps {
    url: string;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Skeleton className="w-full aspect-video rounded-xl" />;
    }

    return (
        <div className="relative pt-[56.25%] rounded-xl overflow-hidden bg-black w-full shadow-lg ring-1 ring-border">
            <ReactPlayer
                url={url}
                width="100%"
                height="100%"
                className="absolute top-0 left-0"
                controls
                playing={false}
            />
        </div>
    );
}
