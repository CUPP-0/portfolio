'use client';

import { Marquee } from '@/components/ui/marquee';
import { RetroGrid } from '@/components/ui/retro-grid';

const images = [
    './launchbest.jpeg',
    './rapat.jpeg',
    './wawancara.jpg',
    './koding.jpg',
    './juara.jpg',
    './infra.jpg',
];

const firstRow = images.slice(0, images.length / 2);
const secondRow = images.slice(images.length / 2);

const ImageCard = ({ img }: { img: string }) => {
    return (
        <figure
            className="
        relative 
        h-[180px] 
        w-[280px] 
        overflow-hidden 
        rounded-3xl
        border 
        border-white/10
        bg-white/5
        shadow-2xl
        transition-all 
        duration-300 
        hover:scale-[1.02]
      "
        >
            <img
                src={img}
                alt=""
                className="h-full w-full object-cover"
            />
        </figure>
    );
};

export function MarqueeDemo() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10 gap-6 h-screen">
            <div className="absolute inset-0 -z-10">
                <RetroGrid />
            </div>

            <Marquee pauseOnHover className="[--duration:25s]">
                {firstRow.map((img, index) => (
                    <ImageCard key={index} img={img} />
                ))}
            </Marquee>

            <Marquee reverse pauseOnHover className="[--duration:25s]">
                {secondRow.map((img, index) => (
                    <ImageCard key={index} img={img} />
                ))}
            </Marquee>

            {/* Fade kiri */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent" />

            {/* Fade kanan */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent" />
        </div>
    );
}