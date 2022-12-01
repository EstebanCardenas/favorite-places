import type {MapLocation} from '../models/Place';

export default class ReverseGeocodingService {
  private baseUrl = 'https://nominatim.openstreetmap.org/reverse';

  async reverseGeocode(location: MapLocation): Promise<string> {
    const url = `${this.baseUrl}?lat=${location.latitude}&lon=${location.longitude}&format=jsonv2`;
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json.display_name as string;
    } else {
      throw Error('Failed to reverse geocode location');
    }
  }
}
