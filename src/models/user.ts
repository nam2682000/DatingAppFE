import type { InterestResponse } from "./interest";
// Define a type for GeoJsonPoint and GeoJson2DCoordinates if necessary

export interface Role {
    id: string;
    roleName: string;
  }
  
  interface Coordinates {
    values: number[]; // longitude, latitude (based on the GeoJSON format)
    x: number;       // Longitude
    y: number;       // Latitude
  }
  
  interface Location {
    coordinates: Coordinates;
    type: number; // GeoJSON point type
    boundingBox?: any;
    coordinateReferenceSystem?: any;
    extraMembers?: any;
  }
  
export interface UserProfileResponse {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    gender: string;
    role: Role;
    dateOfBirth: string;   // ISO date string
    location: Location | null;  // Location with GeoJSON format
    lastActive: string;    // ISO date string
    profilePicture?: string | null;  // Optional profile picture path
    bio: string | null;    // Optional user bio
    interests: InterestResponse[];   // Array of interest ids or names
  }

export interface UserProfileRequest {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
    profilePicture?: string | null; // Path to profile picture
    bio?: string | null; // Personal description
    interests?: string[] | null;
    longitude?: number | null;
    latitude?: number | null;
}

export interface UserMessageResponse {
  username: string;           // Required
  firstname: string;          // Required
  lastname: string;           // Required
  gender: string;             // Required
  lastActive?: Date | null;   // Optional (nullable in C#)
  profilePicture?: string | null; // Optional (nullable in C#), path to profile picture
}