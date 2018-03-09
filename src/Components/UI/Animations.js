import { Easing, Animated, Platform } from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

export const transitionSlideLeft = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;

            const thisSceneIndex = scene.index;
            const width = layout.initWidth;

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            });

            return { transform: [ { translateX } ] }
        },
    }
};
//
export const transitionSlideTop = () => ({
    transitionSpec: {
        duration: 750,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;
        const height = layout.initHeight;

        const translateY = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateY }] }
    },
});
//
export const transitionPress = () => {
    return {
        // Define scene interpolation, eq. custom transition
        transitionSpec: {
            duration: 750,
            easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
            timing: Animated.timing,
        },
        screenInterpolator: (sceneProps) => {
            const {position, scene} = sceneProps;
            const {index} = scene;

            const inputRange = [index - 1, index, index + 1];
            const outputRange = [.8, 1, 1];
            const opacity = position.interpolate({
                inputRange,
                outputRange,
            });

            const scaleY = position.interpolate({
                inputRange,
                outputRange,
            });

            return {
                opacity,
                transform: [
                    {scaleY}
                ]
            };
        }
    }
};
//

export const transitionTest = () => {
    return {
        screenInterpolator: (sceneProps) => {
            const { position, layout, scene, index, scenes } = sceneProps;

            const thisSceneIndex = scene.index;
            const height = layout.initHeight;
            const width = layout.initWidth;

            // We can access our navigation params on the scene's 'route' property
            let thisSceneParams = scene.route.params || {};

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0]
            });

            const translateY = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [height, 0, 0]
            });

            const opacity = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
                outputRange: [0, 1, 1],
            });

            const scale = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [4, 1, 1]
            });

            const slideFromRight = { transform: [{ translateX }] };
            const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] };
            const slideInFromBottom = { transform: [{ translateY }] };

            if (thisSceneParams.plain) return slideFromRight;
            else if (index < 5) return slideInFromBottom;
            else return scaleWithOpacity
        }
    };
};
const screenInterpolator = sceneProps => {
    const { position, layout, scene, index, scenes } = sceneProps

    const thisSceneIndex = scene.index
    const height = layout.initHeight
    const width = layout.initWidth

    // We can access our navigation params on the scene's 'route' property
    var thisSceneParams = scene.route.params || {}

    const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
    })

    const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
    })

    const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1],
    })

    const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
    })

    const slideFromRight = { transform: [{ translateX }] }
    const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
    const slideInFromBottom = { transform: [{ translateY }] }

    if (thisSceneParams.plain) return slideFromRight
    else if (index < 5) return slideInFromBottom
    else return scaleWithOpacity
}