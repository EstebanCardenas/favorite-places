export type MapLocation = {
  longitude: number;
  latitude: number;
}

class Place {
  id: string;
  title: string;
  imageUrl: string;
  address: string;
  location: MapLocation;

  constructor(
    title: string,
    imageUrl: string,
    address: string,
    location: MapLocation,
    id?: string,
  ) {
    this.id = id ?? new Date().getTime().toString();
    this.title = title;
    this.imageUrl = imageUrl;
    this.address = address;
    this.location = location;
  }

  toJson(): {
    id: string;
    title: string;
    imageUrl: string;
    address: string;
    location: MapLocation;
  } {
    return {
      id: this.id,
      title: this.title,
      imageUrl: this.imageUrl,
      address: this.address,
      location: this.location,
    };
  }
}

export default Place;
