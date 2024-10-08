// Define a type for GeoJsonPoint and GeoJson2DCoordinates if necessary
export interface GeoJson2DCoordinates {
    type: 'Point'; // Assuming it is a Point type
    coordinates: [number, number]; // Assuming it's an array of [longitude, latitude]
}

export interface GeoJsonPoint<T> {
    type: string; // e.g., "Point"
    coordinates: T;
}

export interface UserProfileRequest {
    username: string; // Required
    firstname: string; // Required
    lastname: string; // Required
    email: string; // Required
    dateOfBirth: string; // Required
    gender: string; // Required
    location?: GeoJsonPoint<GeoJson2DCoordinates>; // Optional
    profilePicture?: string; // Optional - path to the profile picture
    bio?: string; // Optional - personal description
    interests?: string[]; // Optional - list of interests
    latitude?: number; // Optional
    longitude?: number; // Optional
}