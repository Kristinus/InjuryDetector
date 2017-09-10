import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    CameraRoll,
    Dimensions,
    Button,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import { Constants } from 'expo';

export class InfoScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.injury,
    });
    render() {
        return (
            <View></View>
        );
    }
}

export class BurnScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.injury,
    });
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Burn{"\n"}</Text>
                <Text>
                    First, remove injured area away from sources of danger to prevent further damage.{"\n"}{"\n"}
                    Thermal burns: Run cool or lukewarm water over burned area for 10-20 minutes. Do not use ice.{"\n"}{"\n"}
                    Electrical burns: Check breathing and heartbeat patterns. If there is irregular or a lack of breathing or heartbeats, call EMS.{"\n"}{"\n"}
                    Chemical burns: Determine which chemical caused the burn. Call your local Poison Control Centre.
                </Text>
            </View>
        );
    }
}

export class CutScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.injury,
    });
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Cuts{"\n"}</Text>
                <Text>
                    If cut is severe, blood is spurting out, or bleeding is not stopped after 10 minutes, call EMS.{"\n"}
                    First, stop bleeding by applying pressure to affected area. Ensure to use a clean item to stop the blood.{"\n"}
                    Once bleeding has stopped, clean the affected area with warm water and general soap. Apply an antibiotic ointment to reduce chance of infection.{"\n"}
                    Apply a bandage over the cut.
                </Text>
            </View>
        );
    }
}

export class BruiseScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.injury,
    });
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Bruises{"\n"}</Text>
                <Text>
                    Apply ice or cold pack over affected area immediately to reduce or minimize swelling.{"\n"}
                    Elevate affected area above heart to reduce swelling.{"\n"}
                    Gently massage affected area to increase flow. Do not massage bruised area if it causes pain.
                </Text>
            </View>
        );
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
        paddingLeft: 20,
        paddingRight: 15,
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
    }
});