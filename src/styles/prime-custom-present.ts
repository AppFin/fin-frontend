import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const PrimeCustomPreset = definePreset(Aura, {
    semantic: {
    primary: {
      50: '#e8f2f1',
      100: '#c6dfdc',
      200: '#a0cac5',
      300: '#7ab5ae',
      400: '#5ea59c',
      500: '#19554d',
      600: '#164e46',
      700: '#12443d',
      800: '#0f3b34',
      900: '#0a2b25',
      950: '#051611'
    },
    secondary: {
      50: '#f2fef8',
      100: '#dffced',
      200: '#cafae1',
      300: '#b4f8d4',
      400: '#a4f6cb',
      500: '#6fffaa',
      600: '#67ff9e',
      700: '#5cff94',
      800: '#52ff8a',
      900: '#40ff79',
      950: '#2ee066'
    },
    colorScheme: {
      light: {
        primary: {
          color: '#19554d',
          contrastColor: '#ffffff',
          hoverColor: '#164e46',
          activeColor: '#12443d'
        },
        highlight: {
          background: '#e8f2f1',
          focusBackground: '#c6dfdc',
          color: '#19554d',
          focusColor: '#164e46'
        },
        surface: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
          950: '#0f0f0f'
        },
        content: {
          color: '#212121',
          hoverColor: '#19554d',
          activeColor: '#164e46'
        }
      },
      dark: {
        primary: {
          color: '#5ea59c',
          contrastColor: '#000000',
          hoverColor: '#7ab5ae',
          activeColor: '#a0cac5'
        },
        highlight: {
          background: '#0a2b25',
          focusBackground: '#12443d',
          color: '#5ea59c',
          focusColor: '#7ab5ae'
        },
        surface: {
          0: '#0f0f0f',
          50: '#171717',
          100: '#262626',
          200: '#404040',
          300: '#525252',
          400: '#737373',
          500: '#a3a3a3',
          600: '#d4d4d4',
          700: '#e5e5e5',
          800: '#f5f5f5',
          900: '#fafafa',
          950: '#ffffff'
        },
        content: {
          color: '#f5f5f5',
          hoverColor: '#5ea59c',
          activeColor: '#7ab5ae'
        }
      }
    }
  },
  components: {
    button: {
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '#19554d',
              hoverBackground: '#164e46',
              activeBackground: '#12443d',
              borderColor: '#19554d',
              hoverBorderColor: '#164e46',
              activeBorderColor: '#12443d',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            },
            secondary: {
              background: '#177e89',
              hoverBackground: '#147681',
              activeBackground: '#116b76',
              borderColor: '#177e89',
              hoverBorderColor: '#147681',
              activeBorderColor: '#116b76',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            },
            success: {
              background: '#6fffaa',
              hoverBackground: '#5cff94',
              activeBackground: '#52ff8a',
              borderColor: '#6fffaa',
              hoverBorderColor: '#5cff94',
              activeBorderColor: '#52ff8a',
              color: '#000000',
              hoverColor: '#000000',
              activeColor: '#000000'
            },
            warn: {
              background: '#ff9914',
              hoverBackground: '#ff8f12',
              activeBackground: '#ff820f',
              borderColor: '#ff9914',
              hoverBorderColor: '#ff8f12',
              activeBorderColor: '#ff820f',
              color: '#000000',
              hoverColor: '#000000',
              activeColor: '#ffffff'
            },
            danger: {
              background: '#f21b3f',
              hoverBackground: '#f01839',
              activeBackground: '#ed1431',
              borderColor: '#f21b3f',
              hoverBorderColor: '#f01839',
              activeBorderColor: '#ed1431',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            }
          }
        },
        dark: {
          root: {
            primary: {
              background: '#5ea59c',
              hoverBackground: '#7ab5ae',
              activeBackground: '#a0cac5',
              borderColor: '#5ea59c',
              hoverBorderColor: '#7ab5ae',
              activeBorderColor: '#a0cac5',
              color: '#000000',
              hoverColor: '#000000',
              activeColor: '#000000'
            },
            secondary: {
              background: '#58b1b8',
              hoverBackground: '#76bfc5',
              activeBackground: '#9dd1d6',
              borderColor: '#58b1b8',
              hoverBorderColor: '#76bfc5',
              activeBorderColor: '#9dd1d6',
              color: '#000000',
              hoverColor: '#000000',
              activeColor: '#000000'
            },
            success: {
              background: '#6fffaa',
              hoverBackground: '#5cff94',
              activeBackground: '#52ff8a',
              borderColor: '#6fffaa',
              hoverBorderColor: '#5cff94',
              activeBorderColor: '#52ff8a',
              color: '#000000',
              hoverColor: '#000000',
              activeColor: '#000000'
            },
            warn: {
              background: '#ff9914',
              hoverBackground: '#ff8f12',
              activeBackground: '#ff820f',
              borderColor: '#ff9914',
              hoverBorderColor: '#ff8f12',
              activeBorderColor: '#ff820f',
              color: '#000000',
              hoverColor: '#000000',
              activeColor: '#000000'
            },
            danger: {
              background: '#f21b3f',
              hoverBackground: '#f01839',
              activeBackground: '#ed1431',
              borderColor: '#f21b3f',
              hoverBorderColor: '#f01839',
              activeBorderColor: '#ed1431',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff'
            }
          }
        }
      }
    },
    card: {
      colorScheme: {
        light: {
          root: {
            background: '#ffffff',
            color: '#212121'
          },
          subtitle: {
            color: '#616161'
          }
        },
        dark: {
          root: {
            background: '#262626',
            color: '#f5f5f5'
          },
          subtitle: {
            color: '#a3a3a3'
          }
        }
      }
    },
    panel: {
      colorScheme: {
        light: {
          root: {
            background: '#ffffff',
            borderColor: '#e0e0e0',
            color: '#212121'
          },
          header: {
            background: '#f5f5f5',
            borderColor: '#e0e0e0',
            color: '#19554d'
          }
        },
        dark: {
          root: {
            background: '#262626',
            borderColor: '#404040',
            color: '#f5f5f5'
          },
          header: {
            background: '#171717',
            borderColor: '#404040',
            color: '#5ea59c'
          }
        }
      }
    },
    inputtext: {
      colorScheme: {
        light: {
          root: {
            background: '#ffffff',
            disabledBackground: '#f5f5f5',
            filledBackground: '#f5f5f5',
            filledHoverBackground: '#eeeeee',
            filledFocusBackground: '#ffffff',
            borderColor: '#bdbdbd',
            hoverBorderColor: '#19554d',
            focusBorderColor: '#19554d',
            invalidBorderColor: '#f21b3f',
            color: '#212121',
            disabledColor: '#9e9e9e',
            placeholderColor: '#757575'
          }
        },
        dark: {
          root: {
            background: '#262626',
            disabledBackground: '#171717',
            filledBackground: '#171717',
            filledHoverBackground: '#404040',
            filledFocusBackground: '#262626',
            borderColor: '#525252',
            hoverBorderColor: '#5ea59c',
            focusBorderColor: '#5ea59c',
            invalidBorderColor: '#f21b3f',
            color: '#f5f5f5',
            disabledColor: '#737373',
            placeholderColor: '#a3a3a3'
          }
        }
      }
    },
    dropdown: {
      colorScheme: {
        light: {
          root: {
            background: '#ffffff',
            disabledBackground: '#f5f5f5',
            borderColor: '#bdbdbd',
            hoverBorderColor: '#19554d',
            focusBorderColor: '#19554d',
            invalidBorderColor: '#f21b3f',
            color: '#212121',
            disabledColor: '#9e9e9e',
            placeholderColor: '#757575'
          },
          dropdown: {
            width: '2.5rem',
            color: '#757575'
          },
          overlay: {
            background: '#ffffff',
            borderColor: '#e0e0e0',
            borderRadius: '0.375rem',
            color: '#212121',
            shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          },
          list: {
            padding: '0.25rem 0',
            gap: '2px'
          },
          option: {
            focusBackground: '#e8f2f1',
            selectedBackground: '#19554d',
            selectedFocusBackground: '#164e46',
            color: '#212121',
            focusColor: '#19554d',
            selectedColor: '#ffffff',
            selectedFocusColor: '#ffffff',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.25rem'
          }
        },
        dark: {
          root: {
            background: '#262626',
            disabledBackground: '#171717',
            borderColor: '#525252',
            hoverBorderColor: '#5ea59c',
            focusBorderColor: '#5ea59c',
            invalidBorderColor: '#f21b3f',
            color: '#f5f5f5',
            disabledColor: '#737373',
            placeholderColor: '#a3a3a3'
          },
          dropdown: {
            width: '2.5rem',
            color: '#a3a3a3'
          },
          overlay: {
            background: '#262626',
            borderColor: '#404040',
            borderRadius: '0.375rem',
            color: '#f5f5f5',
            shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.1)'
          },
          list: {
            padding: '0.25rem 0',
            gap: '2px'
          },
          option: {
            focusBackground: '#0a2b25',
            selectedBackground: '#5ea59c',
            selectedFocusBackground: '#7ab5ae',
            color: '#f5f5f5',
            focusColor: '#5ea59c',
            selectedColor: '#000000',
            selectedFocusColor: '#000000',
            padding: '0.5rem 0.75rem',
            borderRadius: '0.25rem'
          }
        }
      }
    }
  }
});