import { ITranslate } from './i-translate';

export const EsI18n: ITranslate = {
  finCore: {
    actions: {
      loading: 'Cargando...',
      save: 'Guardar',
      toggleToLightMode: 'Cambiar a modo claro',
      toggleToDarkMode: 'Cambiar a modo oscuro',
      search: 'Buscar (Ctrl + K)',
      open: 'Abrir',
      close: 'Cerrar',
      changeOrder: 'Cambiar orden',
      pin: 'Anclar',
      unpin: 'Desanclar',
      searching: 'Buscando',
      loadMore: 'Cargar más',
      noResults: 'Sin resultados',
      tryDifferentTerms: 'Prueba con otros términos',
      startTyping: 'Empieza a escribir',
      creating: 'Creando',

    },
    appName: 'Fin App',
    layout: {
      notifications: 'Notificaciones',
      xNotifications: '({{notificationCount}}) notificaciones',
      settings: 'Configuración',
      exit: 'Salir',
      termsAndPolicies: 'Términos y políticas',
      admin: 'Administrador',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
      pinnedMenus: 'Menús fijados',
      unpinnedMenus: 'Menús no fijados',
      empty: 'Vacío',
    },
    auth: {
      confirmYourPassword: 'Confirma tu contraseña',
      email: 'Correo electrónico',
      erros: {
        passwordMinLength: 'La contraseña debe tener al menos 5 caracteres',
        passwordMustHasLowercase:
          'La contraseña debe contener una letra minúscula',
        passwordMustHasNumber: 'La contraseña debe contener un número',
        passwordMustHasSpecial:
          'La contraseña debe contener un carácter especial',
        passwordMustHasUppercase:
          'La contraseña debe contener una letra mayúscula',
        passwordsMustBeEquals: 'Las contraseñas deben ser iguales',
      },
      pages: {
        createAccount: {
          subtitle: 'Completa la información a continuación para comenzar',
          title: 'Crea tu cuenta',
          steps: {
            credentials: {
              invalidCode: 'El código no es válido',
              resendConde: 'Reenviar código',
              title: 'Credenciales',
              typeCodeSentOnEmail: 'Introduce el código enviado a tu correo',
              resendCode: 'Reenviar código',
              youCanResendCodeIn: 'Puedes reenviar el código en {{resendIn}}',
            },
            personal: {
              displayName: '¿Cómo quieres que te llamen?',
              firstName: 'Nombre',
              lastName: 'Apellido',
              title: 'Tú',
            },
            finished: {
              goToFin: 'Ir a Fin',
              title: '¡Listo!',
            },
          },
          next: 'Siguiente',
        },
        login: {
          createAccount: 'Crear cuenta',
          forgetPassword: '¿Olvidaste tu contraseña?',
          loginWithGoogle: 'Continuar con Google',
          singIn: 'Iniciar sesión',
          subtitle: 'Accede a tu cuenta',
          thereIsNoAccount: '¿No tienes una cuenta?',
          title: '¡Bienvenido de nuevo!',
        },
        resetPassword: {
          resetPassword: 'Restablecer tu contraseña',
          subtitle: 'Escribe tu nueva contraseña y confírmala',
          title: 'Restablecer contraseña',
          success: '¡Éxito!',
        },
        sendResetEmail: {
          emailSent:
            'Te hemos enviado un correo si tu dirección existe en nuestro sistema',
          sendLink: 'Enviar enlace',
          subtitle:
            'Introduce tu correo para recibir el enlace de recuperación',
          title: '¿Olvidaste tu contraseña?',
        },
      },
      comeBackLogin: 'Volver al inicio de sesión',
      password: 'Contraseña',
      talkWithSupport: 'Hablar con el Soporte',
    },
    connectors: {
      or: 'o',
    },
    errors: {
      email: 'Correo electrónico inválido',
      maxLength: 'Máximo de {{maxLength}} caracteres',
      minLength: 'Mínimo de {{minLength}} caracteres',
      pattern: 'Formato inválido',
      required: 'Este campo es obligatorio',
    },
    sharedComponents: {
      grid: {
        noData: 'No hay datos para mostrar',
        reload: 'Recargar',
      },
    },
    features: {
      menus: {
        name: 'Nombre',
        frotRoute: 'Ruta del front',
        color: 'Color',
        icon: 'Ícono',
        keyWord: 'Palabra clave',
        onlyForAdmin: 'Solo para administrador',
        leftTop: 'Superior izquierda',
        position: 'Posición',
        hide: 'Esconder'
      },
    },
  },
};
