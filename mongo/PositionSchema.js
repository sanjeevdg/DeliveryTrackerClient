const PositionSchema = {
    name: 'Position',
    properties: {
        _id: 'objectId',
        latitude: 'double?',
        longitude: 'double?',
        timestamp: 'date?',
        realm_id: 'string?', 
    },
    primaryKey: '_id',
};

// should be userId or add any static for test project.
/*

{
  "title": "Position",
  "bsonType": "object",
  "properties": {
    "_id": {
      "bsonType": "objectId"
    },
    "name": {
      "bsonType": "string"
    },
    "latitude": {
      "bsonType": "double"
    },
    "longitude": {
      "bsonType": "double"
    },
    "timestamp": {
      "bsonType": "date"
    },
    "realm_id": {
      "bsonType": "string"
    }
  },
  "required": [
    "latitude",
    "longitude"
  ]
}


*/

export default PositionSchema;