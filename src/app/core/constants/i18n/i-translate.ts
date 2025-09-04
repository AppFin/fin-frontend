export interface ITranslate {
  finCore: {
    actions: {
      loading: string;
      save: string;
      toggleToLightMode: string;
      toggleToDarkMode: string;
      search: string;
      open: string;
      close: string;
    };
    appName: string;
    layout: {
      notifications: string;
      xNotifications: string;
      settings: string;
      exit: string;
      termsAndPolicies: string;
      admin: string;
      openMenu: string;
      closeMenu: string;
    };
    auth: {
      confirmYourPassword: string;
      email: string;
      erros: {
        passwordMinLength: string;
        passwordMustHasLowercase: string;
        passwordMustHasNumber: string;
        passwordMustHasSpecial: string;
        passwordMustHasUppercase: string;
        passwordsMustBeEquals: string;
      };
      pages: {
        createAccount: {
          steps: {
            credentials: {
              invalidCode: string;
              resendConde: string;
              title: string;
              typeCodeSentOnEmail: string;
              resendCode: string;
              youCanResendCodeIn: string;
            };
            personal: {
              displayName: string;
              firstName: string;
              lastName: string;
              title: string;
            };
            finished: {
              title: string;
              goToFin: string;
            };
          };
          next: string;
          subtitle: string;
          title: string;
        };
        login: {
          createAccount: string;
          forgetPassword: string;
          loginWithGoogle: string;
          singIn: string;
          subtitle: string;
          thereIsNoAccount: string;
          title: string;
        };
        resetPassword: {
          resetPassword: string;
          subtitle: string;
          success: string;
          title: string;
        };
        sendResetEmail: {
          emailSent: string;
          sendLink: string;
          subtitle: string;
          title: string;
        };
      };
      comeBackLogin: string;
      password: string;
      talkWithSupport: string;
    };
    connectors: {
      or: string;
    };
    errors: {
      email: string;
      maxLength: string;
      minLength: string;
      pattern: string;
      required: string;
    };
    sharedComponents: {
      grid: {
        noData: string;
        reload: string;
      };
    };
  };
}
