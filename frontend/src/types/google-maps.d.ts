declare global {
  interface Window {
    google: typeof google
  }

  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: HTMLElement, opts?: MapOptions)
        setZoom(zoom: number): void
        getZoom(): number
        setCenter(latLng: LatLng | LatLngLiteral): void
        getCenter(): LatLng
      }

      class Marker {
        constructor(opts?: MarkerOptions)
        setPosition(latLng: LatLng | LatLngLiteral): void
        setMap(map: Map | null): void
        addListener(eventName: string, handler: Function): void
      }

      class InfoWindow {
        constructor(opts?: InfoWindowOptions)
        open(map?: Map, anchor?: Marker): void
        close(): void
        setContent(content: string | Element): void
      }

      class Size {
        constructor(width: number, height: number, widthUnit?: string, heightUnit?: string)
      }

      class Point {
        constructor(x: number, y: number)
      }

      interface MapOptions {
        center?: LatLng | LatLngLiteral
        zoom?: number
        mapTypeId?: MapTypeId
        styles?: MapTypeStyle[]
        disableDefaultUI?: boolean
        zoomControl?: boolean
        mapTypeControl?: boolean
        scaleControl?: boolean
        streetViewControl?: boolean
        rotateControl?: boolean
        fullscreenControl?: boolean
      }

      interface MarkerOptions {
        position?: LatLng | LatLngLiteral
        map?: Map
        title?: string
        label?: string | MarkerLabel
        icon?: string | Icon | Symbol
        draggable?: boolean
        clickable?: boolean
        cursor?: string
        opacity?: number
        visible?: boolean
        zIndex?: number
      }

      interface InfoWindowOptions {
        content?: string | Element
        disableAutoPan?: boolean
        maxWidth?: number
        pixelOffset?: Size
        position?: LatLng | LatLngLiteral
        zIndex?: number
      }

      interface Icon {
        url: string
        size?: Size
        origin?: Point
        anchor?: Point
        scaledSize?: Size
        labelOrigin?: Point
      }

      interface MarkerLabel {
        text: string
        color?: string
        fontFamily?: string
        fontSize?: string
        fontWeight?: string
      }

      interface LatLngLiteral {
        lat: number
        lng: number
      }

      class LatLng {
        constructor(lat: number, lng: number, noWrap?: boolean)
        lat(): number
        lng(): number
      }

      interface MapTypeStyle {
        elementType?: string
        featureType?: string
        stylers?: MapTypeStyler[]
      }

      interface MapTypeStyler {
        color?: string
        gamma?: number
        hue?: string
        invert_lightness?: boolean
        lightness?: number
        saturation?: number
        visibility?: string
        weight?: number
      }

      enum MapTypeId {
        HYBRID = 'hybrid',
        ROADMAP = 'roadmap',
        SATELLITE = 'satellite',
        TERRAIN = 'terrain'
      }

      interface Symbol {
        anchor?: Point
        fillColor?: string
        fillOpacity?: number
        path?: string | SymbolPath
        rotation?: number
        scale?: number
        strokeColor?: string
        strokeOpacity?: number
        strokeWeight?: number
      }

      enum SymbolPath {
        BACKWARD_CLOSED_ARROW = 'BACKWARD_CLOSED_ARROW',
        BACKWARD_OPEN_ARROW = 'BACKWARD_OPEN_ARROW',
        CIRCLE = 'CIRCLE',
        FORWARD_CLOSED_ARROW = 'FORWARD_CLOSED_ARROW',
        FORWARD_OPEN_ARROW = 'FORWARD_OPEN_ARROW'
      }
    }
  }
}

export {}