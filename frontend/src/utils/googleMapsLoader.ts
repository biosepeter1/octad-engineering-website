// Google Maps Loader Utility
// Prevents multiple loading of Google Maps API and handles loading state

interface GoogleMapsLoaderOptions {
  apiKey: string;
  libraries?: string[];
  language?: string;
  region?: string;
}

class GoogleMapsLoader {
  private static instance: GoogleMapsLoader;
  private loadPromise: Promise<void> | null = null;
  private isLoaded = false;
  private isLoading = false;

  private constructor() {}

  public static getInstance(): GoogleMapsLoader {
    if (!GoogleMapsLoader.instance) {
      GoogleMapsLoader.instance = new GoogleMapsLoader();
    }
    return GoogleMapsLoader.instance;
  }

  public async load(options: GoogleMapsLoaderOptions): Promise<void> {
    // If already loaded, return immediately
    if (this.isLoaded && window.google && window.google.maps) {
      return Promise.resolve();
    }

    // If currently loading, return the existing promise
    if (this.isLoading && this.loadPromise) {
      return this.loadPromise;
    }

    // Check if script is already in DOM
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript && window.google && window.google.maps) {
      this.isLoaded = true;
      return Promise.resolve();
    }

    // Create new loading promise
    this.isLoading = true;
    this.loadPromise = new Promise((resolve, reject) => {
      // Create script element
      const script = document.createElement('script');
      
      // Build URL with parameters
      const params = new URLSearchParams({
        key: options.apiKey,
        libraries: (options.libraries || ['places']).join(','),
        v: 'weekly'
      });

      if (options.language) {
        params.set('language', options.language);
      }

      if (options.region) {
        params.set('region', options.region);
      }

      script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
      script.async = true;
      script.defer = true;

      // Handle successful load
      script.onload = () => {
        this.isLoaded = true;
        this.isLoading = false;
        resolve();
      };

      // Handle load error
      script.onerror = (error) => {
        this.isLoading = false;
        this.loadPromise = null;
        reject(new Error('Failed to load Google Maps API'));
      };

      // Append to head
      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  public isGoogleMapsLoaded(): boolean {
    return this.isLoaded && window.google && window.google.maps;
  }

  public reset(): void {
    this.isLoaded = false;
    this.isLoading = false;
    this.loadPromise = null;
  }
}

export default GoogleMapsLoader;