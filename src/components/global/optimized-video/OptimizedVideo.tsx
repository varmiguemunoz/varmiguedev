import { useState } from 'react';

const OptimizedVideo = ({ videoId }: { videoId: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-[300px] w-full overflow-hidden rounded-xl bg-black shadow-2xl">
      <div className="aspect-video relative w-full">
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 flex h-[300px] w-full items-center justify-center focus:outline-none"
            aria-label="Play video"
          >
            {/* Thumbnail de alta resolución optimizado */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="Trading Methodology Preview"
              className="absolute inset-0 h-[300px] w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
              loading="lazy"
            />

            {/* Overlay gradiente para mejorar lectura del botón */}
            <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />

            {/* Botón de Play Customizado */}
            <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <div className="ml-2 h-0 w-0 border-b-[12px] border-l-[20px] border-t-[12px] border-b-transparent border-l-white border-t-primary" />
            </div>
          </button>
        ) : (
          <iframe
            className="absolute inset-0 h-[300px] w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=21&rel=0`}
            title="Institutional Trading Methodology"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

export default OptimizedVideo;
