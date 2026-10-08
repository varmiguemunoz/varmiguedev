import { useState } from "react";

const OptimizedVideo = ({videoId}: {videoId: string}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xl bg-black h-[300px]">
      <div className="relative aspect-video w-full">
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="group absolute inset-0 w-full h-[300px] flex items-center justify-center focus:outline-none"
            aria-label="Play video"
          >
            {/* Thumbnail de alta resolución optimizado */}
            <img 
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt="Trading Methodology Preview"
              className="absolute inset-0 w-full h-[300px] object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            
            {/* Overlay gradiente para mejorar lectura del botón */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />

            {/* Botón de Play Customizado */}
            <div className="w-20 h-20 rounded-full bg-primary backdrop-blur-sm flex items-center justify-center relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <div
                className="w-0 h-0 border-t-[12px] border-t-primary border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"
              />
            </div>
          </button>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-[300px]"
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