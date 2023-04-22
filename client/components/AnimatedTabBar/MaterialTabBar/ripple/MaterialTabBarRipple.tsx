import React, { memo, useMemo, useRef } from 'react';
import { LayoutRectangle, Dimensions, processColor } from 'react-native';
import Svg, { SvgProps, Circle } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import type { MaterialTabBarItemConfig } from '../types';
import { styles } from './styles';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface MaterialTabBarRippleProps {
  tabs: Array<MaterialTabBarItemConfig>;
  tabItemPositions: Array<LayoutRectangle>;
  selectedIndex: Animated.SharedValue<number>;
  width: number;
  height: number;
}

const SCREEN_WIDTH = Dimensions.get('screen').width;

const MaterialTabBarRippleComponent = ({
  selectedIndex,
  tabs,
  tabItemPositions,
  width = SCREEN_WIDTH,
  height = 0,
}: MaterialTabBarRippleProps) => {
  const svgRef = useRef<React.Component<SvgProps, any, any>>(null);
  const animatedColors = tabs.map(item => processColor(item.ripple.color));
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        width,
        height,
      },
    ],
    [width, height]
  );

  const animatedCircleStyle = useAnimatedStyle(() => {
    const tab = tabItemPositions[selectedIndex.value];
    const x = tab.x + tab.width / 2;
    const y = tab.y + tab.height / 2;
    const radius = width / 2 + Math.abs(width / 2 - x);

    const scale = interpolate(selectedIndex.value, [0, 1], [0, radius]);
    const color = animatedColors[selectedIndex.value];

    return {
      transform: [{ scale }],
      fill: color,
      r: scale,
      cy: y,
      cx: x,
    };
  });

  return (
    <Svg
      ref={svgRef}
      pointerEvents="none"
      width={width}
      height={height}
      style={containerStyle}
    >
      <AnimatedCircle pointerEvents="none" animatedProps={animatedCircleStyle} />
    </Svg>
  );
};

const MaterialTabBarRipple = memo(MaterialTabBarRippleComponent, isEqual);

export default MaterialTabBarRipple;
