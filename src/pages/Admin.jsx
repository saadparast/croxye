import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductImageTabs from '@/components/ProductImageTabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X as Cancel, 
  Upload,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Star,
  Package,
  Shield,
  MapPin,
  Settings,
  Users,
  BarChart3,
  FileText
} from 'lucide-react';
import productsData from '../data/products.json';

const Admin = () => {
  const [products, setProducts] = useState(productsData.products);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [showPreview, setShowPreview] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [stats, setStats] = useState({});

  // Calculate statistics
  useEffect(() => {
    const totalProducts = products.length;
    const featuredProducts = products.filter(p => p.featured).length;
    const premiumProducts = products.filter(p => p.premium).length;
    const categories = [...new Set(products.map(p => p.category))].length;
    
    setStats({
      totalProducts,
      featuredProducts,
      premiumProducts,
      categories,
      avgMinOrder: '500 kg' // This would be calculated from actual data
    });
  }, [products]);

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p));
    } else {
      // Add new product
      const newId = Math.max(...products.map(p => p.id)) + 1;
      setProducts([...products, { ...productData, id: newId }]);
    }
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleImageUpload = (productId, imageType, file) => {
    // In a real implementation, this would upload to a cloud service
    console.log(`Uploading ${imageType} image for product ${productId}:`, file);
    
    // Simulate image upload
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setProducts(products.map(p => 
        p.id === productId 
          ? {
              ...p,
              images: {
                ...p.images,
                [imageType]: {
                  ...p.images?.[imageType],
                  url: imageUrl
                }
              }
            }
          : p
      ));
    };
    reader.readAsDataURL(file);
  };

  const AdminStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured Products</p>
              <p className="text-3xl font-bold text-gray-900">{stats.featuredProducts}</p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Premium Products</p>
              <p className="text-3xl font-bold text-gray-900">{stats.premiumProducts}</p>
            </div>
            <Shield className="w-8 h-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-3xl font-bold text-gray-900">{stats.categories}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState(product || {
      name: '',
      description: '',
      category: 'Spices',
      price: 'On Request',
      featured: false,
      premium: false,
      specifications: {
        origin: '',
        minOrder: '',
        packaging: '',
        certification: ''
      },
      images: {
        farming: { url: '', alt: '', description: '' },
        processing: { url: '', alt: '', description: '' },
        final: { url: '', alt: '', description: '' },
        extra: { url: '', alt: '', description: '' }
      }
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category || 'Spices'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {productsData.categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={3}
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input
                  type="text"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Origin</label>
                <input
                  type="text"
                  value={formData.specifications?.origin || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    specifications: { ...formData.specifications, origin: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700">Featured Product</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.premium || false}
                  onChange={(e) => setFormData({ ...formData, premium: e.target.checked })}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Premium Product</span>
              </label>
            </div>

            {/* Image URLs */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Product Images</h4>
              {['farming', 'processing', 'final', 'extra'].map((imageType) => (
                <div key={imageType} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                      {imageType} Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.images?.[imageType]?.url || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        images: {
                          ...formData.images,
                          [imageType]: {
                            ...formData.images?.[imageType],
                            url: e.target.value
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder={`Enter ${imageType} image URL`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alt Text
                    </label>
                    <input
                      type="text"
                      value={formData.images?.[imageType]?.alt || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        images: {
                          ...formData.images,
                          [imageType]: {
                            ...formData.images?.[imageType],
                            alt: e.target.value
                          }
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Describe the image"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-3">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save Product
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <Cancel className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              {formData.name && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setPreviewProduct(formData);
                    setShowPreview(true);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    );
  };

  const ProductList = () => (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                  {product.images?.farming?.url ? (
                    <img 
                      src={product.images.farming.url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <Badge variant="secondary">{product.category}</Badge>
                    {product.featured && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {product.premium && (
                      <Badge className="bg-purple-500 text-white">Premium</Badge>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-1">{product.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Origin: {product.specifications?.origin || 'N/A'}</span>
                    <span>Min Order: {product.specifications?.minOrder || 'N/A'}</span>
                    <span>Price: {product.price}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPreviewProduct(product);
                    setShowPreview(true);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingProduct(product)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">
                <Users className="w-4 h-4 mr-1" />
                Admin Panel
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {[
                { id: 'products', label: 'Products', icon: Package },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Stats */}
        <AdminStats />

        {/* Content */}
        {activeTab === 'products' && (
          <div>
            {!editingProduct && (
              <div className="mb-6">
                <Button onClick={() => setEditingProduct({})}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
              </div>
            )}

            {editingProduct && (
              <ProductForm
                product={editingProduct.id ? editingProduct : null}
                onSave={handleSaveProduct}
                onCancel={() => setEditingProduct(null)}
              />
            )}

            <ProductList />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="text-center py-16">
            <BarChart3 className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">Analytics Dashboard</p>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="text-center py-16">
            <Settings className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">Settings Panel</p>
            <p className="text-gray-400">Coming soon...</p>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && previewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Product Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <EyeOff className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ProductImageTabs product={previewProduct} />
                </div>
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{previewProduct.name}</h2>
                    <p className="text-gray-600 mt-2">{previewProduct.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge>{previewProduct.category}</Badge>
                    {previewProduct.featured && (
                      <Badge className="bg-yellow-500 text-white">Featured</Badge>
                    )}
                    {previewProduct.premium && (
                      <Badge className="bg-purple-500 text-white">Premium</Badge>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {previewProduct.price}
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

export default Admin;