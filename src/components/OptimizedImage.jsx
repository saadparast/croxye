import { useState, useRef, useEffect } from 'react';
import { Camera, Loader2, RotateCcw } from 'lucide-react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  fallbackSrc,
  lazy = true,
  zoomOnHover = true,
  showLoader = true,
  quality = 80,
  ...props
}) => {
  const [loading, setLoading] = useState(lazy);
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(!lazy);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          setLoading(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  // Optimize image URL with quality and sizing parameters
  const optimizeImageUrl = (url, width = 800, height = 600) => {
    if (!url) return '';
    
    // For Unsplash images, add optimization parameters
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?w=${width}&h=${height}&fit=crop&crop=center&auto=format&q=${quality}`;
    }
    
    // For other images, return as-is
    return url;
  };

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
    setImageLoaded(false);
  };

  const handleRetry = () => {
    setError(false);
    setLoading(true);
  };

  const optimizedSrc = optimizeImageUrl(src);
  const optimizedFallback = fallbackSrc ? optimizeImageUrl(fallbackSrc) : null;

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}
      {...props}
    >
      {/* Loading State */}
      {loading && showLoader && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-100">
          <div className="flex flex-col items-center space-y-2 text-center p-4">
            <Camera className="w-16 h-16 text-gray-300" />
            <p className="text-sm text-gray-500">Image not available</p>
            <button
              onClick={handleRetry}
              className="text-orange-500 hover:text-orange-600 text-sm flex items-center space-x-1 bg-white px-3 py-1 rounded-full shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Image */}
      {inView && !error && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-all duration-300 ${
            zoomOnHover ? 'hover:scale-110' : ''
          } ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading={lazy ? 'lazy' : 'eager'}
          onLoad={handleImageLoad}
          onError={() => {
            // Try fallback image if main image fails
            if (optimizedFallback && optimizedSrc !== optimizedFallback) {
              const img = new Image();
              img.onload = handleImageLoad;
              img.onerror = handleImageError;
              img.src = optimizedFallback;
            } else {
              handleImageError();
            }
          }}
        />
      )}

      {/* Progressive Enhancement: WebP Support */}
      {inView && !error && (
        <picture className="hidden">
          {/* WebP version for modern browsers */}
          <source 
            srcSet={optimizedSrc.replace(/\.(jpg|jpeg|png)/, '.webp')} 
            type="image/webp" 
          />
          {/* Fallback for older browsers */}
          <img 
            src={optimizedSrc} 
            alt={alt}
            style={{ display: 'none' }}
          />
        </picture>
      )}

      {/* Accessibility: Alt text for screen readers */}
      {!inView && (
        <div className="sr-only">
          {alt}
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;