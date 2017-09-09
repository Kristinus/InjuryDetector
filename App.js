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
  url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB97a-l-FZyGXWiOBwze-EhGHIPxQazeNc';
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this._onTake}>
          <Text>Take a pic!!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.getJSON}>
          <Text>Get JSON!!</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onTake = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchCameraAsync();
    if (!cancelled) {
      fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB97a-l-FZyGXWiOBwze-EhGHIPxQazeNc	', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          "requests": [
            {
              "image": {
                "source": {
                  "imageUri":
                  "http://www.skincareorg.com/wp-content/uploads/2017/02/How-to-Stop-a-Burn-from-Hurting.jpg"
                }
              },
              "features": [
                {
                  "type": "WEB_DETECTION",
                  "maxResults": 5
                }
              ]
            }
          ]
        }
      })
        .then(function (response) {
          return response.json()
        }).then(function (body) {
          console.log(body);
        });
    }
  }

  getJSON = async () => {
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
    console.log("");
    fetch(url, object)
      .then(function (response) {
        return response.json()
      }).then(function (body) {
        console.log(body);
      }).catch(function (err) {
        console.log(err);
      });
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
