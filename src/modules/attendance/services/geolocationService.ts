/**
 * Enhanced Geolocation Service
 * Real geolocation functionality with office boundary checking
 */

import type { GeoLocation } from '../types';
import { ErrorCodes } from '../types';

// Office locations configuration
export interface OfficeLocation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
  timezone: string;
  isActive: boolean;
}

// Mock office locations - in real app, this would come from configuration
const OFFICE_LOCATIONS: OfficeLocation[] = [
  {
    id: 'main-office',
    name: 'Main Office',
    address: '123 Business District, Cairo, Egypt',
    latitude: 30.0444,
    longitude: 31.2357,
    radius: 100, // 100 meters
    timezone: 'Africa/Cairo',
    isActive: true
  },
  {
    id: 'branch-office',
    name: 'Branch Office',
    address: '456 New Capital, Cairo, Egypt',
    latitude: 30.0626,
    longitude: 31.2497,
    radius: 150, // 150 meters
    timezone: 'Africa/Cairo',
    isActive: true
  }
];

export class GeolocationService {
  private static instance: GeolocationService;
  private watchId: number | null = null;
  private currentPosition: GeoLocation | null = null;
  private positionCallbacks: ((position: GeoLocation) => void)[] = [];
  private errorCallbacks: ((error: string) => void)[] = [];

  private constructor() {}

  public static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService();
    }
    return GeolocationService.instance;
  }

  /**
   * Check if geolocation is supported
   */
  public isSupported(): boolean {
    return 'geolocation' in navigator;
  }

  /**
   * Get current position
   */
  public async getCurrentPosition(): Promise<GeoLocation> {
    if (!this.isSupported()) {
      throw new Error(ErrorCodes.GEOLOCATION_UNAVAILABLE);
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const geoLocation: GeoLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
          };
          
          this.currentPosition = geoLocation;
          resolve(geoLocation);
        },
        (error) => {
          let errorCode: string = ErrorCodes.GEOLOCATION_UNAVAILABLE;
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorCode = ErrorCodes.GEOLOCATION_DENIED;
              break;
            case error.POSITION_UNAVAILABLE:
              errorCode = ErrorCodes.GEOLOCATION_UNAVAILABLE;
              break;
            case error.TIMEOUT:
              errorCode = ErrorCodes.NETWORK_ERROR;
              break;
          }
          
          reject(new Error(errorCode));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000 // Cache for 1 minute
        }
      );
    });
  }

  /**
   * Start watching position changes
   */
  public startWatching(): Promise<void> {
    if (!this.isSupported()) {
      return Promise.reject(new Error(ErrorCodes.GEOLOCATION_UNAVAILABLE));
    }

    return new Promise((resolve, reject) => {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          const geoLocation: GeoLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date().toISOString()
          };
          
          this.currentPosition = geoLocation;
          this.positionCallbacks.forEach(callback => callback(geoLocation));
          resolve();
        },
        (error) => {
          const errorMessage = `Geolocation error: ${error.message}`;
          this.errorCallbacks.forEach(callback => callback(errorMessage));
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 30000
        }
      );
    });
  }

  /**
   * Stop watching position changes
   */
  public stopWatching(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  /**
   * Add position update callback
   */
  public onPositionUpdate(callback: (position: GeoLocation) => void): void {
    this.positionCallbacks.push(callback);
  }

  /**
   * Add error callback
   */
  public onError(callback: (error: string) => void): void {
    this.errorCallbacks.push(callback);
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  public calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  /**
   * Check if current position is within office boundaries
   */
  public async isWithinOfficeBoundaries(): Promise<{
    isWithin: boolean;
    office?: OfficeLocation;
    distance?: number;
    error?: string;
  }> {
    try {
      const position = await this.getCurrentPosition();
      
      for (const office of OFFICE_LOCATIONS) {
        if (!office.isActive) continue;
        
        const distance = this.calculateDistance(
          position.latitude,
          position.longitude,
          office.latitude,
          office.longitude
        );
        
        if (distance <= office.radius) {
          return {
            isWithin: true,
            office,
            distance
          };
        }
      }
      
      // Find nearest office
      const nearestOffice = OFFICE_LOCATIONS
        .filter(office => office.isActive)
        .map(office => ({
          office,
          distance: this.calculateDistance(
            position.latitude,
            position.longitude,
            office.latitude,
            office.longitude
          )
        }))
        .sort((a, b) => a.distance - b.distance)[0];
      
      return {
        isWithin: false,
        office: nearestOffice?.office,
        distance: nearestOffice?.distance
      };
    } catch (error) {
      return {
        isWithin: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get address from coordinates (reverse geocoding)
   */
  public async getAddressFromCoordinates(
    latitude: number,
    longitude: number
  ): Promise<string> {
    try {
      // In a real app, you would use a geocoding service like Google Maps API
      // For now, we'll return a mock address
      return `Address at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
    } catch (error) {
      return 'Unknown location';
    }
  }

  /**
   * Get office locations
   */
  public getOfficeLocations(): OfficeLocation[] {
    return OFFICE_LOCATIONS.filter(office => office.isActive);
  }

  /**
   * Add new office location
   */
  public addOfficeLocation(office: Omit<OfficeLocation, 'id'>): void {
    const newOffice: OfficeLocation = {
      ...office,
      id: `office-${Date.now()}`
    };
    OFFICE_LOCATIONS.push(newOffice);
  }

  /**
   * Update office location
   */
  public updateOfficeLocation(id: string, updates: Partial<OfficeLocation>): boolean {
    const index = OFFICE_LOCATIONS.findIndex(office => office.id === id);
    if (index !== -1) {
      OFFICE_LOCATIONS[index] = { ...OFFICE_LOCATIONS[index], ...updates };
      return true;
    }
    return false;
  }

  /**
   * Remove office location
   */
  public removeOfficeLocation(id: string): boolean {
    const index = OFFICE_LOCATIONS.findIndex(office => office.id === id);
    if (index !== -1) {
      OFFICE_LOCATIONS.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Get current cached position
   */
  public getCurrentCachedPosition(): GeoLocation | null {
    return this.currentPosition;
  }

  /**
   * Check if position is stale
   */
  public isPositionStale(position: GeoLocation, maxAgeMs: number = 300000): boolean {
    const age = Date.now() - new Date(position.timestamp).getTime();
    return age > maxAgeMs;
  }
}

// Singleton instance
export const geolocationService = GeolocationService.getInstance();

// Legacy function for backward compatibility
export const checkGeoLocation = (): boolean => {
  return Math.random() > 0.1; // 90% success rate for demo
};
