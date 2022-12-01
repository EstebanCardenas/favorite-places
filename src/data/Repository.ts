import PlacesDB from './database/PlacesDB';
import Place, { MapLocation } from './models/Place';
import ReverseGeocodingService from './service/ReverseGeocoding';

export default class Repository {
  private geocodingService = new ReverseGeocodingService();
  private placesDB = new PlacesDB();

  async reverseGeocode(location: MapLocation): Promise<string> {
    const address = await this.geocodingService.reverseGeocode(location);
    return address;
  }

  insertPlace(place: Place) {
    this.placesDB.insertPlace(place);
  }

  async deletePlace(placeId: string): Promise<boolean> {
    try {
      const success = await this.placesDB.removePlace(placeId);
      return success;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getPlaces(): Promise<Place[]> {
    return await this.placesDB.getPlaces();
  }

  async getPlace(id: string): Promise<Place> {
    return await this.placesDB.getPlace(id);
  }
}