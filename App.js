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

class HomeScreen extends React.Component {
    state = {
        image: null,
        uploading: false,
        injury: null,
        isLoading: false
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
                </View>
                <View>
                    {this.state.injury&&!this.state.isLoading ? <Text>{this.state.injury}</Text> : null}
                    {this.state.isLoading ? <Image source={require('./assets/icons/loading-circle.gif')}/> : null}
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
            this._onSend(uri);
        }
    }

    _onTake = async () => {
        const {
            cancelled,
            uri,
        } = await Expo.ImagePicker.launchCameraAsync();
        if (!cancelled) {
            this._onSend(uri);
        }
    }

    _onSend = async (uri) => {
        const { navigate } = this.props.navigation;
        await this.setState({isLoading: true});
        uploadResponse = await uploadImageAsync(uri);
        uploadResult = await uploadResponse.json();
        await this.setState({ image: uploadResult.location });
        await this.getJSON(this.state.image);
        await this.setState({isLoading: false});
        await navigate(this.state.injury, { navigate });
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
        this.filter(info);
    }

    //takes in unfiltered json array
    filter = async(json) => {
        var _desc = new Array(json.length);
        for (var i = 0; i < json.length; i++) {
            if(json[i].description === "Abrasion" || json[i].description === "Bruise") {
                this.setState({injury: "Bruise"});
                return;
            }
            else if(json[i].description === "Burn") {
                this.setState({injury: "Burn"});
                return;
            }
            else if(json[i].description === "Blood" || json[i].description === "Bleeding" || json[i].description === "Cut") {
                this.setState({injury: "Cut"});
                return;
            }
        }
        this.setState({injury: "No Injury Found"});
    }
}

const MainNavigator = StackNavigator({
    Home: { screen: HomeScreen },
    Burn: { screen: BurnScreen },
    Cut: { screen: CutScreen },
    Bruise: { screen: BruiseScreen },
    // Bleeding: { screen: BleedingScreen },
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