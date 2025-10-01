// Alternative Developer Watermark Styles for Biose Peter
// You can replace the current watermark in Footer.tsx with any of these designs

export const WatermarkStyle1 = () => (
  // Current Style - Professional with code icon
  <div className="bg-gray-950 border-t border-gray-800">
    <div className="container-custom py-4">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"/>
          </svg>
          <span>Crafted with precision by</span>
        </div>
        <div className="flex items-center space-x-1 font-medium text-gray-400">
          <span className="text-primary">Biose Peter</span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-500">Full-Stack Developer</span>
        </div>
      </div>
      <div className="text-center mt-1">
        <p className="text-xs text-gray-600">
          Building digital foundations as strong as steel structures
        </p>
      </div>
    </div>
  </div>
);

export const WatermarkStyle2 = () => (
  // Minimalist Style
  <div className="bg-black/50 border-t border-gray-800">
    <div className="container-custom py-3">
      <div className="text-center">
        <p className="text-xs text-gray-500">
          Developed by <span className="text-primary font-medium">Biose Peter</span> • Full-Stack Developer
        </p>
      </div>
    </div>
  </div>
);

export const WatermarkStyle3 = () => (
  // Construction Themed Style
  <div className="bg-gray-950 border-t border-gray-800">
    <div className="container-custom py-4">
      <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12L8 10L6 12L8 14L10 12Z M16 6L14 4L12 6L10 4L8 6L6 4L4 6V16L6 18H14L16 16V6Z"/>
        </svg>
        <span>Digital Architecture by</span>
        <span className="text-primary font-semibold">Biose Peter</span>
        <span>•</span>
        <span className="text-gray-600">Full-Stack Engineer</span>
      </div>
      <div className="text-center mt-1">
        <p className="text-xs text-gray-600 italic">
          "Constructing excellence in every line of code"
        </p>
      </div>
    </div>
  </div>
);

export const WatermarkStyle4 = () => (
  // Professional Badge Style
  <div className="bg-gray-950 border-t border-gray-800">
    <div className="container-custom py-4">
      <div className="flex items-center justify-center">
        <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Engineered by</span>
          <span className="text-sm font-bold text-primary">Biose Peter</span>
          <span className="text-xs text-gray-500">Full-Stack Developer</span>
        </div>
      </div>
    </div>
  </div>
);

export const WatermarkStyle5 = () => (
  // Tech-Focused Style
  <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 border-t border-gray-800">
    <div className="container-custom py-3">
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-primary rounded-full"></div>
            <div className="w-1 h-1 bg-secondary rounded-full"></div>
            <div className="w-1 h-1 bg-primary rounded-full"></div>
          </div>
          <span className="text-gray-500">Powered by</span>
          <span className="text-primary font-semibold tracking-wide">BIOSE PETER</span>
        </div>
        <div className="text-gray-600">⚡ Full-Stack Development</div>
      </div>
    </div>
  </div>
);

// Usage Instructions:
// 1. Choose your preferred style from the options above
// 2. Replace the current watermark section in Footer.tsx with your chosen style
// 3. Import this component if needed: import { WatermarkStyle1 } from './DeveloperWatermark'
// 4. Use it in Footer.tsx: <WatermarkStyle1 />

export default WatermarkStyle1;