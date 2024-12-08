const color = {
  white: '#ffffff',
  black: '#2b2b2b',

  gray50: '#f2f2f2',
  gray100: '#e8e8e8',
  gray200: '#d1d1d1',
  gray300: '#bababa',
  gray400: '#a3a3a3',
  gray500: '#8c8c8c',

  // black
  black50: '#f2f2f2',
  black100: '#e8e8e8',
  black200: '#d1d1d1',
  black300: '#bababa',
  black400: '#a3a3a3',
  black500: '#8c8c8c',
  black600: '#757575',
  black700: '#5e5e5e',
  black800: '#474747',
  black900: '#303030',

  // mint
  mint50: '#ecf2f0',
  mint100: '#c7ddd5',
  mint200: '#acd8cd',
  mint300: '#84d8c3',
  mint400: '#57d4b5',
  mint500: '#1ccca3',
  mint600: '#16af8b',
  mint700: '#108c6f',
  mint800: '#1d7e5b',
  mint900: '#215643',

  //green
  green50: '#eef9eb',
  green100: '#dff6db',
  green200: '#bfecb6',
  green300: '#9fe392',
  green400: '#80d96e',
  green500: '#5fd048',
  green600: '#48ba2f',
  green700: '#3a9627',
  green800: '#2b711e',
  green900: '#1d4d13',

  //prussian
  prussian50: '#e9effc',
  prussian100: '#d6e2fa',
  prussian200: '#adc7f5',
  prussian300: '#84aaf0',
  prussian400: '#5c8deb',
  prussian500: '#3271e6',
  prussian600: '#195ad0',
  prussian700: '#1548a8',
  prussian800: '#10377f',
  prussian900: '#0b2656',

  //purpleblue
  purpleblue50: '#ede8fd',
  purpleblue100: '#ddd6fb',
  purpleblue200: '#c5b4ff',
  purpleblue300: '#a288ff',
  purpleblue400: '#7e5cf5',
  purpleblue500: '#4a21e2',
  purpleblue600: '#3711c1',
  purpleblue700: '#21009e',
  purpleblue800: '#210b75',
  purpleblue900: '#1a0a58',

  //red
  red50: '#ffeaec',
  red100: '#ffd9dd',
  red200: '#ffb4bb',
  red300: '#ff808c',
  red400: '#ff4154',
  red500: '#ff003d',
  red600: '#da0017',
  red700: '#a50011',
  red800: '#82030f',
  red900: '#5c000a',

  //pink
  pink50: '#ffecf1',
  pink100: '#ffd2de',
  pink200: '#ff9fb9',
  pink300: '#ff87a7',
  pink400: '#ff608b',
  pink500: '#ff003d',
  pink600: '#ef246d',
  pink700: '#d6145a',
  pink800: '#b10c47',
  pink900: '#830a36',

  //orange
  orange50: '#ffefe7',
  orange100: '#fee1d4',
  orange200: '#fdc3a9',
  orange300: '#fca67e',
  orange400: '#fb7c3b',
  orange500: '#f96b31',
  orange600: '#e55420',
  orange700: '#b94318',
  orange800: '#8b3310',
  orange900: '#5f2309',

  //yellow
  yellow50: '#ffffe6',
  yellow100: '#fffed1',
  yellow200: '#fffea3',
  yellow300: '#fffd75',
  yellow400: '#fffc47',
  yellow500: '#fffb18',
  yellow600: '#ebe201',
  yellow700: '#d6c100',
  yellow800: '#baa700',
  yellow900: '#9d8d00',
} as const

const zIndex = {
  tooltip: 1,
  backdrop: 2,
  modal: 3,
  toast: 4,
} as const

export const theme = { color, zIndex }
