import { ShadowStyleIOS } from 'react-native';

export type ExtendedColors = {
  orange: string;
  background: string;
  redPink: string;
  green: string;
  blackGrey: string;
  grey: string;
  whiteGrey: string;
  white: string;
  black: string;
};

export const LIGHT_COLORS: ExtendedColors = {
  orange: '#FB8A22',
  background: '#FFF8F1',
  redPink: '#E73253',
  green: '#85BC39',
  blackGrey: '#454545',
  grey: '#484646b3',
  whiteGrey: '#DEDEDE',
  white: '#FFFFFF',
  black: '#000000',
};

export const DARK_COLORS: ExtendedColors = {
  orange: '#D97706',
  background: '#1D232A',
  redPink: '#E73253',
  green: '#36D399',
  blackGrey: '#676D78',
  grey: '#A6ADBA',
  whiteGrey: '#DEDEDE',
  white: '#FFFFFF',
  black: '#000000',
};

export type ShadowStyle = ShadowStyleIOS & {
  elevation?: number;
};

export const SHADOW_BLACK_COLOR = LIGHT_COLORS.black;
export const SHADOW_WHITE_COLOR = LIGHT_COLORS.white;
export const SHADOW_ORANGE_COLOR = LIGHT_COLORS.orange;
export type ShadowDepth = '0' | '4' | '8' | '12' | '16';
export const SHADOW_PROPS: Record<ShadowDepth, Omit<ShadowStyle, 'shadowColor'>> = {
  0: {
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  4: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  8: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  12: {
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  16: {
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
};
const createShadowStyle = (depth: ShadowDepth, color: string): ShadowStyle => {
  return {
    shadowColor: color,
    ...SHADOW_PROPS[depth],
  };
};

export const STYLES = {
  LINE_HEIGHT: {
    LINE_HEIGHT_11: (fs: number) => 1.1 * fs,
    LINE_HEIGHT_14: (fs: number) => 1.4 * fs,
    LINE_HEIGHT_16: (fs: number) => 1.6 * fs,
  },
  ICON_SIZE: {
    ICON_SIZE_24: 24,
    ICON_SIZE_36: 36,
  },
  FONT_SIZE: {
    FONT_SIZE_12: 12,
    FONT_SIZE_14: 14,
    FONT_SIZE_16: 16,
    FONT_SIZE_18: 18,
    FONT_SIZE_24: 24,
    FONT_SIZE_30: 30,
    FONT_SIZE_36: 36,
  },
  MARGIN: {
    MARGIN_4: 4,
    MARGIN_8: 8,
    MARGIN_16: 16,
    MARGIN_24: 24,
    MARGIN_32: 32,
    MARGIN_48: 48,
    MARGIN_64: 64,
  },
  GAP: {
    GAP_4: 4,
    GAP_8: 8,
    GAP_16: 16,
    GAP_24: 24,
    GAP_32: 32,
    GAP_48: 48,
    GAP_64: 64,
  },
  PADDING: {
    PADDING_4: 4,
    PADDING_8: 8,
    PADDING_16: 16,
    PADDING_24: 24,
    PADDING_32: 32,
    PADDING_48: 48,
    PADDING_64: 64,
  },
  RADIUS: {
    RADIUS_10: 10,
    RADIUS_20: 20,
    RADIUS_30: 30,
    RADIUS_40: 40,
    RADIUS_50: 50,
    RADIUS_60: 60,
  },
  SHADOW: {
    NO_SHADOW: createShadowStyle('0', SHADOW_BLACK_COLOR),
    SHADOW_BLACK_4: createShadowStyle('4', SHADOW_BLACK_COLOR),
    SHADOW_BLACK_8: createShadowStyle('8', SHADOW_BLACK_COLOR),
    SHADOW_BLACK_12: createShadowStyle('12', SHADOW_BLACK_COLOR),
    SHADOW_BLACK_16: createShadowStyle('16', SHADOW_BLACK_COLOR),
    SHADOW_WHITE_4: createShadowStyle('4', SHADOW_WHITE_COLOR),
    SHADOW_WHITE_8: createShadowStyle('8', SHADOW_WHITE_COLOR),
    SHADOW_WHITE_12: createShadowStyle('12', SHADOW_WHITE_COLOR),
    SHADOW_WHITE_16: createShadowStyle('16', SHADOW_WHITE_COLOR),
    SHADOW_ORANGE_4: createShadowStyle('4', SHADOW_ORANGE_COLOR),
    SHADOW_ORANGE_8: createShadowStyle('8', SHADOW_ORANGE_COLOR),
    SHADOW_ORANGE_12: createShadowStyle('12', SHADOW_ORANGE_COLOR),
    SHADOW_ORANGE_16: createShadowStyle('16', SHADOW_ORANGE_COLOR),
  },
  DURATION: {
    DURATION_500: 500,
    DURATION_1000: 500,
    DURATION_1500: 500,
    DURATION_2000: 500,
  },
} as const;

export type MarginType = keyof typeof STYLES.MARGIN;
export type GapType = keyof typeof STYLES.GAP;
export type PaddingType = keyof typeof STYLES.PADDING;
export type RadiusType = keyof typeof STYLES.RADIUS;
export type ShadowType = keyof typeof STYLES.SHADOW;

export const I18N = {
  'English': {},
  'Vietnamese': {},
} as const;

export const LANGUAGE_LIST = Object.keys(I18N) as Array<Language>;
export type Language = keyof typeof I18N;
