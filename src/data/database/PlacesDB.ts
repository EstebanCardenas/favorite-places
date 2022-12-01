import * as SQLite from "expo-sqlite";
import Place from "../models/Place";

export default class PlacesDB {
  private db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = SQLite.openDatabase('places.db');
    this.db.transaction((tx) => {
      let statement = 'create table if not exists places (';
      statement += 'id text primary key not null, ';
      statement += 'title text, ';
      statement += 'imageUrl text, ';
      statement += 'address text, ';
      statement += 'location text);';
      tx.executeSql(
        statement
      );
    });
  }

  insertPlace(place: Place) {
    this.db.transaction((tx) => {
      const statement =
        'INSERT INTO places (id, title, imageUrl, address, location) VALUES (?,?,?,?,?)';
      tx.executeSql(
        statement, [
        place.id,
        place.title,
        place.imageUrl,
        place.address,
        JSON.stringify(place.location),
      ]);
    }, console.log);
  }

  getPlaces(): Promise<Place[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        const statement = 'select * from places';
        tx.executeSql(statement, [], (_, { rows }) => {
          const places = rows._array.map(item => new Place(
            item.title,
            item.imageUrl,
            item.address,
            JSON.parse(item.location),
            item.id,
          ));
          resolve(places);
        });
      }, reject);
    });
  }

  getPlace(id: string): Promise<Place> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM places WHERE id = ?',
          [id],
          (_, {rows}) => {
            const body = rows.item(0);
            if (body) {
              const place = new Place(
                body.title,
                body.imageUrl,
                body.address,
                JSON.parse(body.location),
                body.id,
              );
              resolve(place);
            } else {
              reject('No place with the given id was found.');
            }
          },
        );
      }, reject);
    });
  }

  removePlace(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM places WHERE id = ?;',
          [id],
          () => resolve(true),
        );
      }, reject);
    });
  }
}
