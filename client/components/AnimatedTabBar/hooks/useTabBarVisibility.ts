import { useMemo, useEffect } from 'react';
import Animated, {
  onChange,
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { Easing } from '../utilities';

export const useTabBarVisibility = (shouldShowTabBar: boolean) => {
  const _shouldShowTabBar = useSharedValue(shouldShowTabBar ? 1 : 0);

  useEffect(() => {
    _shouldShowTabBar.value = shouldShowTabBar ? 1 : 0;
  }, [shouldShowTabBar]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(
            _shouldShowTabBar.value === 1 ? 0 : 100,
            {
              duration: 250,
              easing: Easing.linear,
            }
          ),
        },
      ],
    };
  }, []);

  return animatedStyle;
};
