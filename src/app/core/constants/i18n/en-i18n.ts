import { ITranslate } from './i-translate';

export const EnI18n: ITranslate = {
  'fin-core': {
    actions: {
      loading: 'Loading...',
      save: 'Save',
    },
    appName: 'Fin App',
    auth: {
      confirmYourPassword: 'Confirm Your password',
      email: 'Email',
      erros: {
        passwordMinLength: 'The password must have at least 5 characters',
        passwordMustHasLowercase:
          'The password must contain a lowercase letter',
        passwordMustHasNumber: 'The password must contain a number',
        passwordMustHasSpecial: 'The password must contain a special character',
        passwordMustHasUppercase:
          'The password must contain an uppercase letter',
        passwordsMustBeEquals: 'Passwords must be the same',
      },
      pages: {
        createAccount: {
          subtitle: 'Preencha os dados abaixo para começar',
          title: 'Criar sua conta',
        },
        login: {
          createAccount: 'Create account',
          forgetPassword: 'Forgot your password?',
          loginWithGoogle: 'Continue with Google',
          singIn: 'Sign in',
          subtitle: 'Log in to your account',
          thereIsNoAccount: "Don't have an account?",
          title: 'Welcome back!',
        },
        resetPassword: {
          resetPassword: 'Reset your password',
          subtitle: 'Type your new password and confirm it',
          title: 'Reset password',
        },
        sendResetEmail: {
          comeBackLogin: 'Back to login',
          sendLink: 'Send link',
          subtitle: 'Enter your email to receive the recovery link',
          title: 'Forgot your password?',
        },
      },
      password: 'Password',
    },
    connectors: {
      or: 'or',
    },
    errors: {
      email: 'Invalid email',
      maxLength: 'Maximum of {{maxLength}} characters',
      minLength: 'Minimum of {{minLength}} characters',
      pattern: 'Invalid format',
      required: 'This field is required',
    },
  },
};
