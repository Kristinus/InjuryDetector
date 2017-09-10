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
        const { goBack } = this.props.navigation;
        return (
            <Button
                title="Go back"
                onPress={() => goBack()}
            />
        );
    }
}

export class BurnScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.injury,
    });
    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>
                    First, remove injured area away from sources of danger to prevent further damage.
                    Thermal burns: Run cool or lukewarm water over burned area for 10-20 minutes. Do not use ice.
                    Electrical burns: Check breathing and heartbeat patterns. If there is irregular or a lack of breathing or heartbeats, call EMS.
                    Chemical burns: Determine which chemical caused the burn. Call your local Poison Control Centre.
                </Text>
                <Button
                    title="Go back"
                    onPress={() => goBack()}
                />
            </View>
        );
    }
}

export class CutScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.injury,
    });
    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>
                    <b>If cut is severe, blood is spurting out, or bleeding is not stopped after 10 minutes, call EMS.</b>
                    First, stop bleeding by applying pressure to affected area. Ensure to use a clean item to stop the blood.
                    Once bleeding has stopped, clean the affected area with warm water and general soap. Apply an antibiotic ointment to reduce chance of infection.
                    Apply a bandage over the cut.
                </Text>
                <Button
                    title="Go back"
                    onPress={() => goBack()}
                />
            </View>
        );
    }
}

export class BruiseScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.injury,
    });
    render() {
        const { goBack } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>
                    Apply ice or cold pack over affected area immediately to reduce or minimize swelling.
                    Elevate affected area above heart to reduce swelling.
                    Gently massage affected area to increase flow. Do not massage bruised area if it causes pain.
                </Text>
                <Button
                    title="Go back"
                    onPress={() => goBack()}
                />
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
        paddingTop: Constants.statusBarHeight,
    },
});