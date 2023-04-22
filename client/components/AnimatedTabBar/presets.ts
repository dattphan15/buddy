import MaterialTabBar, {
  MaterialTabBarConfig,
  MaterialTabBarItemConfig,
} from './MaterialTabBar';

const Presets = {
  material: {
    component: MaterialTabBar,
    $c: undefined as any as MaterialTabBarConfig,
    $t: undefined as any as MaterialTabBarItemConfig,
  },
};

export type PresetEnum = keyof typeof Presets;

export default Presets;