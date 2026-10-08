// Cloudinary image optimization utility

export const optimizeCloudinaryImage = (
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'avif';
  } = {}
) => {
  const { width, height, quality = 80, format = 'auto' } = options;

  // Si no es URL de Cloudinary, retornar original
  if (!url.includes('cloudinary.com')) return url;

  const transformations = [
    format !== 'auto' && `f_${format}`,
    quality && `q_${quality}`,
    width && `w_${width}`,
    height && `h_${height}`,
    'c_limit', // Maintain aspect ratio
    'dpr_auto', // Automatic device pixel ratio
  ]
    .filter(Boolean)
    .join(',');

  // Insertar transformaciones después de /upload/
  return url.replace('/upload/', `/upload/${transformations}/`);
};

// Local image optimization config
export const getImageProps = (
  src: string,
  alt: string,
  options: {
    width: number;
    height: number;
    priority?: boolean;
  }
) => ({
  src,
  alt,
  width: options.width,
  height: options.height,
  loading: options.priority ? ('eager' as const) : ('lazy' as const),
  decoding: 'async' as const,
  ...(options.priority && { fetchPriority: 'high' as const }),
});
