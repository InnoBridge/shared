type LatLng = {
    lat: number;
    lng: number;
};

interface Address {
  placeId: string;           // place_id (for Google Places)
  name?: string;             // place name / establishment name (use instead of formatted address)
  city?: string;             // locality / postal_town
  province?: string;         // full name British Columbia
  country?: string;          // ISO alpha-2 (e.g. "CA") - preferred
  postalCode?: string;       // postal_code
  location?: LatLng;         // lat/lng
};

export {
    Address,
    LatLng
};