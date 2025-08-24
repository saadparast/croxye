import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Leaf, 
  Factory, 
  Package, 
  Microscope,
  ZoomIn,
  RotateCcw
} from 'lucide-react';

const ProductImageTabs = ({ product, className = "" }) => {
  const [activeTab, setActiveTab] = useState('farming');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const tabs = [
    {
      id: 'farming',
      label: 'Farming',
      icon: Leaf,
      description: 'Raw Materials & Cultivation',
      color: 'bg-green-500'
    },
    {
      id: 'processing',
      label: 'Processing', 
      icon: Factory,
      description: 'Manufacturing Process',
      color: 'bg-blue-500'
    },
    {
      id: 'final',
      label: 'Final Product',
      icon: Package,
      description: 'Export Ready Product',
      color: 'bg-orange-500'
    },
    {
      id: 'extra',
      label: 'Quality Testing',
      icon: Microscope,
      description: 'Lab Testing & Certification',
      color: 'bg-purple-500'
    }
  ];

  const currentImage = product.images?.[activeTab];
  const fallbackImage = product.image;

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setImageLoading(true);
    setImageError(false);
    setIsZoomed(false);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-orange-500 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Image Display */}
      <Card className="overflow-hidden">
        <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Loading State */}
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                <p className="text-sm text-gray-500">Loading image...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="flex flex-col items-center space-y-2 text-center p-4">
                <Camera className="w-16 h-16 text-gray-300" />
                <p className="text-sm text-gray-500">Image not available</p>
                <button
                  onClick={() => handleTabChange(activeTab)}
                  className="text-orange-500 hover:text-orange-600 text-sm flex items-center space-x-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retry</span>
                </button>
              </div>
            </div>
          )}

          {/* Main Image */}
          {currentImage && !imageError && (
            <div 
              className={`relative h-full cursor-pointer group ${
                isZoomed ? 'overflow-visible' : 'overflow-hidden'
              }`}
              onClick={handleImageClick}
            >
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                className={`w-full h-full object-cover transition-all duration-300 ${
                  isZoomed 
                    ? 'transform scale-150 cursor-zoom-out' 
                    : 'cursor-zoom-in group-hover:scale-110'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
              
              {/* Zoom Indicator */}
              <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Image Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className={`${tabs.find(t => t.id === activeTab)?.color} text-white mb-2`}>
                      {tabs.find(t => t.id === activeTab)?.description}
                    </Badge>
                    <p className="text-white text-sm">
                      {currentImage.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Fallback to original image if images object is not available */}
          {!currentImage && !imageError && fallbackImage && (
            <div className="relative h-full">
              <img
                src={fallbackImage}
                alt={product.name}
                className="w-full h-full object-cover"
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <Badge className="bg-gray-500 text-white mb-2">
                  Product Image
                </Badge>
                <p className="text-white text-sm">
                  {product.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Image Navigation Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              activeTab === tab.id
                ? tab.color
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`View ${tab.label} image`}
          />
        ))}
      </div>

      {/* Accessibility Description */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Current View:</strong> {tabs.find(t => t.id === activeTab)?.description}
        </p>
        {currentImage && (
          <p className="text-xs text-gray-500 mt-1">
            {currentImage.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductImageTabs;