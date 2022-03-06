import Realm from 'realm';
import PositionSchema  from './PositionSchema';


// place your RealmApp ID here



// can implement inBuilt JWT, Google, Facebook, Apple Authentication Flow.
 // LoggingIn as Anonymous User. 


getRealm = async () => {

const app = new Realm.App({ id: "application-1-snahx", timeout: 10000 });

const credentials = Realm.Credentials.anonymous();
  // loggedIn as anonymous user
  const loggedInUser = await app.logIn(credentials);
  
  // MongoDB RealmConfiguration
  /*
  sync: {
      user: app.currentUser, // loggedIn User
      partitionValue: "621c4fbefd42ccd238ce7421", // should be userId(Unique) so it can manage particular user related documents in DB by userId
    }
, // add multiple schemas, comma seperated.
    */
  const configuration = {
    schema: [PositionSchema]    
  };
//606330ec76a88d04f5781bc5

  return Realm.open(configuration);
}


export default getRealm;