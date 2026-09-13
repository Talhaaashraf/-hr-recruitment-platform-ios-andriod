// Design tokens — single source of truth for all styling
// Edit here and changes propagate across the whole app.

export const Colors = {
  // Brand
  primary: '#1B6FEE',
  primaryLight: '#E8F0FD',
  primaryDark: '#1458C8',

  // Surfaces
  background: '#FFFFFF',
  surface: '#F7F8FA',
  surfaceAlt: '#F0F2F5',

  // Borders
  border: '#E8EAF0',
  borderStrong: '#C9CDD8',

  // Text
  textPrimary: '#0D0F14',
  textSecondary: '#4B5263',
  textMuted: '#8E95A3',
  textInverse: '#FFFFFF',

  // Status
  success: '#1A9E5C',
  successLight: '#E6F7EF',
  warning: '#E07C12',
  warningLight: '#FEF3E2',
  error: '#D93025',
  errorLight: '#FDECEA',
  info: '#1B6FEE',
  infoLight: '#E8F0FD',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export const Radius = {
  sm: 6,
  md: 12,
  lg: 20,
  full: 9999,
} as const;

export const Typography = {
  // Font sizes
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    '2xl': 28,
    '3xl': 34,
  },
  // Font weights
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
} as const;

export const Shadow = {
  none: {},
  sm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
} as const;
