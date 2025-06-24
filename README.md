# PDF2PPT.AI

A modern, responsive web application built with React and Tailwind CSS for converting PDF documents to PowerPoint presentations. This project provides a complete frontend scaffold ready for backend integration.

## 🚀 Features

- **Modern UI/UX**: Clean, minimal design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **File Upload**: Drag-and-drop interface with file validation
- **Progress Tracking**: Real-time conversion progress with status updates
- **State Management**: Zustand for efficient global state management
- **Type Safety**: Built with modern JavaScript and proper prop validation

## 🛠️ Tech Stack

- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Routing**: React Router DOM for navigation
- **State Management**: Zustand for global state
- **Build Tool**: Vite for fast development and building

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Main layout with navigation
│   ├── Card.jsx        # Card component variants
│   ├── Button.jsx      # Button component with variants
│   ├── Input.jsx       # Input component
│   ├── Progress.jsx    # Progress bar component
│   └── FileDropzone.jsx # File upload component
├── pages/              # Route-based pages
│   ├── Home.jsx        # Landing page
│   ├── Upload.jsx      # File upload page
│   ├── Progress.jsx    # Conversion progress page
│   └── Download.jsx    # Download results page
├── hooks/              # Custom React hooks
│   ├── useTheme.jsx    # Theme management
│   ├── useConversionStore.js # Global state management
│   ├── useUpload.js    # File upload logic
│   └── useConvert.js   # Conversion status logic
├── services/           # API client modules
│   └── api.js          # API endpoints and utilities
├── styles/             # Global CSS and Tailwind config
│   └── index.css       # Global styles and Tailwind imports
├── utils/              # Utility functions
│   └── cn.js           # Class name utility
├── App.jsx             # Main app component
└── main.jsx            # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd pdf-to-pptx-converter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Backend Integration

This frontend is designed to work with a REST API. Update the API endpoints in `src/services/api.js`:

### Required Endpoints

1. **POST /api/upload**
   - Upload PDF file
   - Returns: `{ uploadId: string }`

2. **GET /api/status/:uploadId**
   - Check conversion status
   - Returns: `{ status: 'processing' | 'completed' | 'error', progress: number, downloadUrl?: string }`

3. **GET /api/result/:uploadId**
   - Get conversion result
   - Returns: `{ downloadUrl: string, filename: string, fileSize: number }`

4. **GET /api/download/:uploadId**
   - Download converted file
   - Returns: File stream

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🎨 Design System

### Colors

The project uses a comprehensive color system with semantic naming:

- **Primary**: Blue tones for main actions
- **Secondary**: Gray tones for text and backgrounds  
- **Accent**: Purple tones for highlights
- **Success**: Green tones for success states
- **Warning**: Yellow tones for warnings
- **Error**: Red tones for errors

### Components

All components follow consistent design patterns:

- **Rounded corners**: 2xl (16px) for cards, xl (12px) for buttons
- **Spacing**: 8px grid system
- **Typography**: Inter font with proper line heights
- **Shadows**: Subtle shadows for depth
- **Animations**: Smooth transitions and micro-interactions

## 🌙 Theme Support

The application supports both light and dark themes:

- Automatic system preference detection
- Manual theme toggle
- Persistent theme preference in localStorage
- Smooth theme transitions

## 📱 Responsive Design

Breakpoints follow Tailwind CSS defaults:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🔄 State Management

Global state is managed with Zustand:

```javascript
// Example usage
const { file, setFile, progress, setProgress } = useConversionStore()
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables if needed

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons
- [Zustand](https://github.com/pmndrs/zustand) for state management

---

**Ready for backend integration!** 🎉

This frontend provides all the necessary interfaces and state management for your backend team to integrate with. The API service layer is abstracted and ready to be connected to your actual backend endpoints.
