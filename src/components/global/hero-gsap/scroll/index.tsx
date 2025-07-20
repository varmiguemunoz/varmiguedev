import React from 'react';

export default function Scroll() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
      <div className="flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-sm font-medium">Scroll to explore</span>
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-current">
          <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-current" />
        </div>
      </div>
    </div>
  );
}
