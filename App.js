import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  CameraRoll
} from 'react-native';
// import {
//   Vision} from './node_modules/@google-cloud/vision';

export default class App extends React.Component {
  state = {
    image: null,
    uploading: false,
    desc: '',
  };
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
        <View>
          <Text>
            {this.state.desc}
            </Text>
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
      uploadResponse = await uploadImageAsync(uri);
      uploadResult = await uploadResponse.json();
      this.setState({ image: uploadResult.location });
      this.getJSON(this.state.image);
    }
  }

  _onTake = async () => {
    const {
      cancelled,
      uri,
    } = await Expo.ImagePicker.launchCameraAsync();
    if (!cancelled) {
      uploadResponse = await uploadImageAsync(uri);
      uploadResult = await uploadResponse.json();
      this.setState({ image: uploadResult.location });
      this.getJSON(this.state.image);
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
                imageUri: uri
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
        this.state.desc = JSON.stringify(body.responses[0].webDetection.webEntities);
        console.log(JSON.stringify(body.responses[0].webDetection.webEntities));
      }).catch(function (err) {
        console.log(err);
      });
  }
}

async function uploadImageAsync(uri) {
  let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  console.log(uri);
  return fetch(apiUrl, options);
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
