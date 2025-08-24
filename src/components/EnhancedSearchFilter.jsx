import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  X,
  ArrowUpDown,
  Grid,
  List,
  SlidersHorizontal,
  CheckCircle,
  Star
} from 'lucide-react';

const EnhancedSearchFilter = ({ 
  products, 
  categories, 
  onFilteredResults,
  viewMode,
  setViewMode,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [showOnlyPremium, setShowOnlyPremium] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Generate search suggestions
  const allSearchTerms = useMemo(() => {
    const terms = new Set();
    products.forEach(product => {
      // Add product name words
      product.name.toLowerCase().split(' ').forEach(word => {
        if (word.length > 2) terms.add(word);
      });
      // Add category
      terms.add(product.category.toLowerCase());
      // Add origin
      if (product.specifications?.origin) {
        product.specifications.origin.toLowerCase().split(/[,\s]+/).forEach(word => {
          if (word.length > 2) terms.add(word);
        });
      }
    });
    return Array.from(terms);
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          (product.specifications?.origin && 
           product.specifications.origin.toLowerCase().includes(searchLower)) ||
          (product.specifications?.certification &&
           product.specifications.certification.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Featured filter
      if (showOnlyFeatured && !product.featured) {
        return false;
      }

      // Premium filter
      if (showOnlyPremium && !product.premium) {
        return false;
      }

      return true;
    });

    // Sort products
    const [sortField, sortOrder] = sortBy.split('-');
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'featured':
          comparison = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          break;
        case 'premium':
          comparison = (b.premium ? 1 : 0) - (a.premium ? 1 : 0);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [products, searchTerm, selectedCategories, showOnlyFeatured, showOnlyPremium, sortBy]);

  // Update suggestions based on search term
  useEffect(() => {
    if (searchTerm && searchTerm.length >= 2) {
      const suggestions = allSearchTerms
        .filter(term => term.includes(searchTerm.toLowerCase()) && term !== searchTerm.toLowerCase())
        .slice(0, 6);
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm, allSearchTerms]);

  // Notify parent of filtered results
  useEffect(() => {
    onFilteredResults(filteredAndSortedProducts);
  }, [filteredAndSortedProducts, onFilteredResults]);

  const handleCategoryToggle = (categoryName) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setShowOnlyFeatured(false);
    setShowOnlyPremium(false);
    setSortBy('name-asc');
  };

  const activeFiltersCount = 
    (searchTerm ? 1 : 0) +
    selectedCategories.length +
    (showOnlyFeatured ? 1 : 0) +
    (showOnlyPremium ? 1 : 0);

  return (
    <div className={`w-full ${className}`}>
      {/* Main Search Bar */}
      <div className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products by name, category, origin, or certification..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (
          <div className="absolute top-full left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
            {searchSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 capitalize border-b border-gray-100 last:border-b-0"
              >
                <Search className="w-4 h-4 inline mr-2 text-gray-400" />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Controls */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 flex-1">
              <Button
                variant={showAdvanced ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center space-x-1"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Advanced</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 bg-orange-500 text-white">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              <Button
                variant={showOnlyFeatured ? "default" : "outline"}
                size="sm"
                onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                className="flex items-center space-x-1"
              >
                <Star className="w-4 h-4" />
                <span>Featured</span>
              </Button>

              <Button
                variant={showOnlyPremium ? "default" : "outline"}
                size="sm"
                onClick={() => setShowOnlyPremium(!showOnlyPremium)}
                className="flex items-center space-x-1"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Premium</span>
              </Button>

              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center space-x-3">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="category-asc">Category (A-Z)</option>
                  <option value="category-desc">Category (Z-A)</option>
                  <option value="featured-desc">Featured First</option>
                  <option value="premium-desc">Premium First</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'}`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-600'}`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-4">
                {/* Category Filters */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.filter(cat => cat.name !== 'All').map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCategoryToggle(category.name)}
                        className="flex items-center space-x-1"
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-4 text-sm">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">
            Showing <span className="font-semibold">{filteredAndSortedProducts.length}</span> of{' '}
            <span className="font-semibold">{products.length}</span> products
          </span>
          {searchTerm && (
            <Badge variant="outline" className="flex items-center space-x-1">
              <Search className="w-3 h-3" />
              <span>"{searchTerm}"</span>
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">Filters applied:</span>
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          </div>
        )}
      </div>

      {/* Active Filter Tags */}
      {(selectedCategories.length > 0 || showOnlyFeatured || showOnlyPremium) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="flex items-center space-x-1 bg-orange-100 text-orange-700"
            >
              <span>{category}</span>
              <button
                onClick={() => handleCategoryToggle(category)}
                className="ml-1 hover:bg-orange-200 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {showOnlyFeatured && (
            <Badge variant="secondary" className="flex items-center space-x-1 bg-yellow-100 text-yellow-700">
              <Star className="w-3 h-3" />
              <span>Featured</span>
              <button
                onClick={() => setShowOnlyFeatured(false)}
                className="ml-1 hover:bg-yellow-200 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {showOnlyPremium && (
            <Badge variant="secondary" className="flex items-center space-x-1 bg-purple-100 text-purple-700">
              <CheckCircle className="w-3 h-3" />
              <span>Premium</span>
              <button
                onClick={() => setShowOnlyPremium(false)}
                className="ml-1 hover:bg-purple-200 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchFilter;