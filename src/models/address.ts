type LatLng = {
    lat: number;
    lng: number;
};

// Derived from Google Places API, to save on Clerk for user registration
interface BaseAddress {
    placeId: string;           // place_id (for Google Places)
    name?: string;             // place name / establishment name (use instead of formatted address)
    unitNumber?: string;       // Unit, suite or apartment (subpremise)
    city?: string;             // locality / postal_town
    province?: string;         // full name British Columbia
    country?: string;          // ISO alpha-2 (e.g. "CA") - preferred
    postalCode?: string;       // postal_code
    location?: LatLng;         // lat/lng
};

// Backend storage representation of an address
interface Address extends BaseAddress {
    id: string;                // internal ID
    userId?: string;           // user ID (if associated with a user)
};

export {
    Address,
    LatLng
};