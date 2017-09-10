import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    CameraRoll,
    Dimensions,
    Button,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import { Constants } from 'expo';

import {
    BruiseScreen,
    BurnScreen,
    CutScreen,
} from './InfoScreen';

console.log(typeof (CutScreen));

class HomeScreen extends React.Component {
    state = {
        image: null,
        uploading: false,
    	desc: null,
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        title="Take a pic"
                        onPress={this._onTake}
                    />
                    <Button
                        title="Pick a pic"
                        onPress={this._onPick}
                    />
                    <Button
                        title="Test new page"
                        onPress={() => navigate('Burn', { navigate })}
                    />
                </View>
                <View>
                  {this.state.desc ? <Text>{this.state.desc}</Text> : null}

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
      console.log(uri);
            uploadResponse = await uploadImageAsync(uri);
            uploadResult = await uploadResponse.json();
            this.setState({ image: uploadResult.location });
            this.getJSON(this.state.image);
        }
    }

  getJSON = async (uri) => {
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
        var _desc = '';
        const request = await fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB97a-l-FZyGXWiOBwze-EhGHIPxQazeNc', object);
        const result = await request.json();
        const info = result.responses[0].webDetection.webEntities;
        for (var i = 0; i < info.length; i++) {
            _desc += ", " + info[i].description;
        }
        this.setState({ desc: _desc });

    }
}

const MainNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    Burn: { screen: BurnScreen },
    Cut: { screen: CutScreen },
    Bruise: { screen: BruiseScreen },
});

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MainNavigator style={{ width: Dimensions.get('window').width }} />
            </View>
        );
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
        paddingTop: Constants.statusBarHeight,
    },
});