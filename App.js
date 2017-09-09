import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  CameraRoll
} from 'react-native';

export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onTake}>
            <Text>Take a pic!!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPick}>
            <Text>Get pic!!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.getDetails}>
            <Text>Get Details!!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onPick = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchImageLibraryAsync();
    if (!cancelled) {
      this.getJSON(uri);
    }
  }

  _onTake = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchCameraAsync();
    if (!cancelled) {
      this.getJSON(uri);
    }
  }

  getJSON(uri) {
    console.log(uri);
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
              source: {
                imageUri:
                "http://www.skincareorg.com/wp-content/uploads/2017/02/How-to-Stop-a-Burn-from-Hurting.jpg"
              }
            },
            features: [
              {
                type: "WEB_DETECTION",
                maxResults: 5
              }
            ]
          }
        ]
      })
    };
    console.log(object);
    fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB97a-l-FZyGXWiOBwze-EhGHIPxQazeNc', object)
      .then(function (response) {
        return response.json()
      }).then(function (body) {
        console.log(JSON.stringify(body.responses[0].webDetection.webEntities));
      }).catch(function (err) {
        console.log(err);
      });
  }

  getDetails(uri) {
  //   // Imports the Google Cloud client library
    // Vision = require('@google-cloud/vision');

  //   // Instantiates a client
    // const vision = Vision();
    // console.log("TET");

  //   // The name of the image file to annotate
  //   const fileName = uri;

  //   // Prepare the request object
  //   const request = {
  //     source: {
  //       filename: fileName
  //     }
  //   };

  //   // Performs label detection on the image file
  //   vision.labelDetection(request)
  //     .then((results) => {
  //       const labels = results[0].labelAnnotations;

  //       console.log('Labels:');
  //       labels.forEach((label) => console.log(label.description));
  //     })
  //     .catch((err) => {
  //       console.error('ERROR:', err);
  //     });
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    margin: 5,
    backgroundColor: '#ddd',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
