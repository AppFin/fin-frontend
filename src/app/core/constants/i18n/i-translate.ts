export interface ITranslate {
  'fin-core': {
    actions: {
      loading: string;
      save: string;
    };
    appName: string;
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
          title: string;
        };
        sendResetEmail: {
          comeBackLogin: string;
          sendLink: string;
          subtitle: string;
          title: string;
        };
      };
      password: string;
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
  };
}
