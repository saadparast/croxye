# Croxy Exim - Premium Indian Exports Product Catalog

A modern, feature-rich product catalog for Croxy Exim showcasing premium Indian agricultural products with dynamic image galleries, advanced search/filtering, and admin management capabilities.

## 🚀 Live Demo

- **Production URL**: [Coming Soon]
- **Development URL**: https://3000-irk6rvwvoq349jg96gd74-6532622b.e2b.dev
- **Admin Panel**: `/admin` route for product management

## ✨ Features

### 🖼️ Dynamic Image Tabs
- **4 Image Categories per Product**:
  - 🌱 **Farming**: Raw ingredients and cultivation scenes
  - 🏭 **Processing**: Manufacturing and packing processes  
  - 📦 **Final Product**: Export-ready packaged products
  - 🔬 **Quality Testing**: Lab testing and certifications

### 🔍 Enhanced Search & Filter
- **Real-time Search**: Instant results as you type
- **Smart Suggestions**: Auto-complete with product names and categories
- **Advanced Filters**: 
  - Category filtering (Spices, Makhana, Moringa Powder, Agriculture, etc.)
  - Featured products toggle
  - Premium products toggle
  - Multiple sorting options
- **Mobile Responsive**: Optimized for all devices

### 🎨 Modern UI/UX
- **Image Optimization**: Lazy loading with hover zoom effects
- **Smooth Transitions**: CSS animations and micro-interactions
- **Accessibility**: WCAG compliant with proper alt text and keyboard navigation
- **Grid/List Views**: Toggle between different product layouts
- **Product Preview**: Quick preview modal without page navigation

### 👨‍💼 Admin Panel
- **Product Management**: Add, edit, delete products
- **Image Upload System**: Manage product images by category
- **Real-time Preview**: Preview products before publishing
- **Statistics Dashboard**: Track product counts and categories
- **Batch Operations**: Bulk product management

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Touch Interactions**: Swipe gestures and touch-friendly UI
- **Progressive Web App Ready**: Fast loading and offline capabilities

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0 + Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7 with custom components
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Routing**: React Router DOM 7.6.1
- **Form Handling**: React Hook Form + Zod validation
- **Development**: ESLint + Hot Module Replacement

## 📁 Project Structure

```
croxy-exim-website/
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   ├── ProductImageTabs.jsx   # Dynamic image tab component
│   │   ├── EnhancedSearchFilter.jsx # Advanced search and filtering
│   │   ├── OptimizedImage.jsx     # Lazy loading image component
│   │   └── ...
│   ├── pages/
│   │   ├── Products.jsx           # Main product catalog page
│   │   ├── ProductDetail.jsx      # Individual product details
│   │   ├── Admin.jsx              # Admin management panel
│   │   └── ...
│   ├── assets/
│   │   └── products/              # Product images organized by ID
│   │       ├── 1/                 # Product ID 1
│   │       │   ├── farming.jpg
│   │       │   ├── processing.jpg
│   │       │   ├── final.jpg
│   │       │   └── extra.jpg
│   │       └── ...
│   ├── data/
│   │   └── products.json          # Product data with image metadata
│   └── lib/
│       └── utils.js               # Utility functions
├── dist/                          # Production build output
├── public/                        # Static assets
└── ...
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v14.0.0 or higher
- **npm** v6.0.0 or higher
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/saadparast/croxye.git
   cd croxye
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - Admin panel: `http://localhost:3000/admin`

### Production Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

3. **Deploy to hosting platform**
   - Upload `dist/` folder to your web server
   - Or deploy to Vercel/Netlify/GitHub Pages

## 🎯 Product Management

### Adding New Products

#### Method 1: Using Admin Panel (Recommended)
1. Navigate to `/admin` in your browser
2. Click "Add New Product"
3. Fill in product details:
   - Name, description, category
   - Specifications (origin, packaging, certifications)
   - Image URLs for all 4 categories
   - Features (featured/premium toggles)
4. Preview and save

#### Method 2: Manual JSON Editing
Edit `src/data/products.json`:

```json
{
  "id": 26,
  "name": "Your Product Name",
  "description": "Detailed product description",
  "category": "Spices",
  "price": "On Request",
  "featured": false,
  "premium": false,
  "images": {
    "farming": {
      "url": "https://example.com/farming-image.jpg",
      "alt": "Descriptive alt text for farming image",
      "description": "Context about the farming process"
    },
    "processing": {
      "url": "https://example.com/processing-image.jpg", 
      "alt": "Descriptive alt text for processing image",
      "description": "Context about the processing method"
    },
    "final": {
      "url": "https://example.com/final-product.jpg",
      "alt": "Descriptive alt text for final product",
      "description": "Context about the final packaged product"
    },
    "extra": {
      "url": "https://example.com/quality-testing.jpg",
      "alt": "Descriptive alt text for quality testing",
      "description": "Context about quality assurance process"
    }
  },
  "specifications": {
    "origin": "State, India",
    "minOrder": "500 kg",
    "packaging": "25kg/50kg bags",
    "certification": "ISO, FSSAI, Organic"
  }
}
```

### Image Guidelines

#### 📸 Image Specifications
- **Resolution**: 800x600px minimum
- **Format**: JPG/PNG (WebP preferred for better performance)
- **Quality**: High-resolution, professional photography
- **Watermark-free**: Use royalty-free images from:
  - [Unsplash](https://unsplash.com)
  - [Pexels](https://pexels.com) 
  - [Pixabay](https://pixabay.com)

#### 🗂️ Image Categories

1. **Farming Images**
   - Raw crops in fields
   - Harvesting scenes
   - Farm landscapes
   - Agricultural equipment

2. **Processing Images** 
   - Manufacturing facilities
   - Cleaning and sorting
   - Packaging operations
   - Quality control processes

3. **Final Product Images**
   - Packaged products
   - Export-ready containers
   - Branded packaging
   - Professional product shots

4. **Quality Testing Images**
   - Laboratory testing
   - Certification processes
   - Quality equipment
   - Analysis procedures

## 🔧 Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production  
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Using PM2 for Production

```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start npm --name "croxy-app" -- run dev

# Monitor logs
pm2 logs croxy-app --nostream

# Stop application
pm2 stop croxy-app
```

### Environment Variables

Create `.env` file for environment-specific settings:

```env
VITE_API_BASE_URL=https://api.croxye.com
VITE_ADMIN_PASSWORD=your_admin_password
VITE_ANALYTICS_ID=your_analytics_id
```

## 🎨 Customization

### Styling
- **Tailwind Config**: Modify `tailwind.config.js`
- **Custom CSS**: Add to `src/App.css`
- **Component Styles**: Inline classes with Tailwind

### Branding
- **Colors**: Update Tailwind color palette
- **Logo**: Replace in `public/` folder
- **Fonts**: Add to `index.html` and Tailwind config

### Features
- **Search Logic**: Modify `EnhancedSearchFilter.jsx`
- **Image Handling**: Update `ProductImageTabs.jsx`
- **Admin Functions**: Extend `Admin.jsx`

## 📈 Performance

### Optimization Features
- **Lazy Loading**: Images load only when needed
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Automatic image compression
- **Caching**: Service worker ready

### Performance Monitoring
- **Lighthouse Score**: Aim for 90+ in all categories
- **Core Web Vitals**: Monitor LCP, FID, CLS
- **Bundle Analysis**: Use `npm run build --analyze`

## 🔒 Security

- **Input Validation**: Zod schema validation
- **XSS Protection**: Sanitized user inputs
- **HTTPS Only**: Enforce secure connections
- **Content Security Policy**: Implemented headers

## 🐛 Troubleshooting

### Common Issues

1. **Permission Denied for Vite**
   ```bash
   chmod +x node_modules/.bin/vite
   find node_modules/.bin -type f -exec chmod +x {} \;
   ```

2. **Dependency Conflicts**
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

3. **Build Errors**
   ```bash
   npm run lint
   npm run build -- --verbose
   ```

### Performance Issues
- Check image sizes and formats
- Monitor network requests in DevTools
- Use React DevTools Profiler

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Development Guidelines
- Follow React best practices
- Use TypeScript for new features
- Write tests for critical functionality
- Maintain accessibility standards
- Document new components

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**SAAD PARAST** - [GitHub](https://github.com/saadparast)

## 🙏 Acknowledgments

- **Design Inspiration**: Modern e-commerce platforms
- **Image Sources**: Unsplash, Pexels community
- **UI Components**: Radix UI and Tailwind CSS teams
- **Icons**: Lucide React icon library

---

## 📞 Support

For support and inquiries:
- **Email**: support@croxye.com
- **Website**: [Coming Soon]
- **GitHub Issues**: [Create an issue](https://github.com/saadparast/croxye/issues)

---

Made with ❤️ for premium Indian exports