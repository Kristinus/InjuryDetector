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
        console.log(JSON.stringify(body.responses));
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
