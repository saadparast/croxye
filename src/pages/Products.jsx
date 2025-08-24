import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EnhancedSearchFilter from '@/components/EnhancedSearchFilter';
import ProductImageTabs from '@/components/ProductImageTabs';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Star, 
  Package, 
  Truck,
  Award,
  Mail,
  X,
  SlidersHorizontal,
  Grid,
  List,
  ArrowUpDown,
  Info,
  Globe,
  Leaf,
  Shield,
  ChevronDown,
  Eye
} from 'lucide-react';
import productsData from '../data/products.json';

const Products = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(productsData.products);
  const [showProductPreview, setShowProductPreview] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);

  // Get categories from products data
  const categories = useMemo(() => {
    const categoryCount = {};
    productsData.products.forEach(product => {
      categoryCount[product.category] = (categoryCount[product.category] || 0) + 1;
    });
    
    return [
      { name: 'All', icon: '📦', count: productsData.products.length },
      ...productsData.categories.map(cat => ({
        ...cat,
        count: categoryCount[cat.name] || 0
      }))
    ];
  }, []);

  // Handle filtered results from search component
  const handleFilteredResults = useCallback((filtered) => {
    setFilteredProducts(filtered);
  }, []);



  const handleInquiry = (product) => {
    setSelectedProduct(product);
    setShowInquiryModal(true);
  };

  const InquiryModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      company: '',
      country: '',
      quantity: '',
      message: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
      console.log('Inquiry submitted:', formData, selectedProduct);
      alert('Thank you for your inquiry! We will contact you within 24 hours.');
      setShowInquiryModal(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        country: '',
        quantity: '',
        message: ''
      });
    };

    if (!showInquiryModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Request Quote</h3>
              <button
                onClick={() => setShowInquiryModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {selectedProduct && (
              <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-lg text-gray-900">{selectedProduct.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{selectedProduct.category}</p>
                    <p className="text-sm text-gray-500 mt-2">Min. Order: {selectedProduct.specifications?.minOrder || 'Contact for details'}</p>
                  </div>
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedProduct.price}
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    placeholder="e.g., United States, UAE, Singapore"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Required *</label>
                  <input
                    type="text"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="e.g., 500 kg, 10 tons, 1 container"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Requirements</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Please specify any special requirements, certifications needed, packaging preferences, delivery timeline, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Quote Request
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowInquiryModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-orange-600 py-16">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("/images/spices-pattern.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Complete Product Catalog
          </h1>
          <p className="text-xl text-green-50 max-w-3xl mx-auto">
            Browse our complete collection of premium export-quality Indian agricultural products. 
            From spices to grains, Makhana to Moringa - all in one place. Prices on request.
          </p>
        </div>
      </section>

      {/* Enhanced Search and Filter Section */}
      <section className="sticky top-0 z-30 bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnhancedSearchFilter
            products={productsData.products}
            categories={categories}
            onFilteredResults={handleFilteredResults}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Premium Products</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of premium agricultural products, 
              representing the finest quality from India's diverse agricultural heritage.
            </p>
          </div>
          
          {/* Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {productsData.products
              .filter(product => product.featured)
              .slice(0, 6)
              .map((product) => (
                <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center" style={{display: 'none'}}>
                      <Package className="w-24 h-24 text-gray-300" />
                    </div>
                    <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
                      <span className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                      {product.premium && (
                        <span className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Premium
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-4 right-4 z-20">
                      <span className="bg-white/90 backdrop-blur-sm text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                        {product.price}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Origin: <span className="font-medium text-gray-700">{product.specifications?.origin || 'India'}</span></span>
                      <span className="text-gray-500">Min: <span className="font-medium text-gray-700">{product.specifications?.minOrder || 'Contact'}</span></span>
                    </div>
                    
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInquiry(product);
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    >
                      Request Quote
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Category Quick Access */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(1).map((category) => (
              <Card key={category.name} className="group hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setSelectedCategory(category.name)}>
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                    {category.count} Products
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Buttons */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`px-6 py-3 rounded-full font-medium transition-all flex items-center space-x-2 ${
                    selectedCategory === category.name
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                  <span className={`text-sm ${
                    selectedCategory === category.name ? 'text-orange-100' : 'text-gray-500'
                  }`}>
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div>
            {/* Products Display - Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1">
                    <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                      <img 
                        src={product.images?.farming?.url || product.image} 
                        alt={product.images?.farming?.alt || product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center" style={{display: 'none'}}>
                        <Package className="w-24 h-24 text-gray-300" />
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 z-20 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewProduct(product);
                            setShowProductPreview(true);
                          }}
                          className="bg-white/90 backdrop-blur-sm text-gray-700 p-2 rounded-full hover:bg-white"
                          title="Quick preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="absolute top-3 left-3 z-20 flex flex-col space-y-2">
                        <span className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                        {product.featured && (
                          <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </span>
                        )}
                        {product.premium && (
                          <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Premium
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 z-20">
                        <span className="bg-white/90 backdrop-blur-sm text-orange-600 px-3 py-1 rounded-full text-sm font-bold">
                          {product.price}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-5 space-y-4">
                      <div onClick={() => navigate(`/product/${product.id}`)}>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Origin:</span>
                          <span className="font-medium text-gray-700 text-xs">{product.specifications?.origin || 'India'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Min. Order:</span>
                          <span className="font-medium text-gray-700 text-xs">{product.specifications?.minOrder || 'Contact'}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInquiry(product);
                          }}
                          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                          size="sm"
                        >
                          Request Quote
                        </Button>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${product.id}`);
                          }}
                          variant="outline"
                          size="sm"
                        >
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Image */}
                        <div className="relative h-48 lg:h-32 lg:w-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-lg flex-shrink-0">
                          <img 
                            src={product.images?.farming?.url || product.image} 
                            alt={product.images?.farming?.alt || product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center" style={{display: 'none'}}>
                            <Package className="w-16 h-16 text-gray-300" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-3 py-1 rounded-full text-xs font-medium">
                                  {product.category}
                                </span>
                                {product.featured && (
                                  <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                                    <Star className="w-3 h-3 mr-1" />
                                    Featured
                                  </span>
                                )}
                                {product.premium && (
                                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                    Premium
                                  </span>
                                )}
                              </div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors cursor-pointer"
                                  onClick={() => navigate(`/product/${product.id}`)}
                              >
                                {product.name}
                              </h3>
                              <p className="text-gray-600 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <span className="text-2xl font-bold text-orange-600">
                                {product.price}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Origin:</span>
                              <p className="font-medium">{product.specifications?.origin || 'India'}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Min. Order:</span>
                              <p className="font-medium">{product.specifications?.minOrder || 'Contact'}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Packaging:</span>
                              <p className="font-medium">{product.specifications?.packaging || 'Various'}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Certification:</span>
                              <p className="font-medium">{product.specifications?.certification || 'Standard'}</p>
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => handleInquiry(product)}
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Request Quote
                            </Button>
                            <Button 
                              onClick={() => navigate(`/product/${product.id}`)}
                              variant="outline"
                            >
                              View Details
                            </Button>
                            <Button 
                              onClick={() => {
                                setPreviewProduct(product);
                                setShowProductPreview(true);
                              }}
                              variant="outline"
                              size="sm"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500 mb-2">No products found</p>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                <div className="space-x-3">
                  <Button asChild>
                    <Link to="/contact">Request Custom Product</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Custom Orders CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            We can source any agricultural product from India. Tell us your requirements!
          </p>
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
            <Link to="/contact">
              Request Custom Product
            </Link>
          </Button>
        </div>
      </section>

      <InquiryModal />
      
      {/* Product Preview Modal */}
      {showProductPreview && previewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Product Preview</h3>
                <button
                  onClick={() => setShowProductPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Tabs */}
                <div>
                  <ProductImageTabs product={previewProduct} />
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {previewProduct.category}
                      </span>
                      {previewProduct.featured && (
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                      {previewProduct.premium && (
                        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Premium
                        </span>
                      )}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{previewProduct.name}</h2>
                    <p className="text-lg text-gray-600 mb-6">{previewProduct.description}</p>
                  </div>

                  {/* Specifications */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Origin</p>
                        <p className="font-medium">{previewProduct.specifications?.origin || 'India'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Package className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Min. Order</p>
                        <p className="font-medium">{previewProduct.specifications?.minOrder || 'Contact'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Certification</p>
                        <p className="font-medium">{previewProduct.specifications?.certification || 'Standard'}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Packaging</p>
                        <p className="font-medium">{previewProduct.specifications?.packaging || 'Various'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Price</p>
                    <p className="text-3xl font-bold text-orange-600">{previewProduct.price}</p>
                    <p className="text-sm text-gray-500 mt-2">Contact for bulk pricing and custom packaging</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => {
                        setShowProductPreview(false);
                        handleInquiry(previewProduct);
                      }}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Request Quote
                    </Button>
                    <Button 
                      onClick={() => {
                        setShowProductPreview(false);
                        navigate(`/product/${previewProduct.id}`);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      View Full Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
