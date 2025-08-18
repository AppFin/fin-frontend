import { ITranslate } from './i-translate';

export const EnI18n: ITranslate = {
  'fin-core': {
    appName: 'Fin App',
    connectors: {
      or: 'or',
    },
    auth: {
      email: 'Email',
      pages: {
        login: {
          createAccount: 'Create account',
          forgetPassword: 'Forgot your password?',
          loginWithGoogle: 'Continue with Google',
          singIn: 'Sign in',
          subtitle: 'Log in to your account',
          thereIsNoAccount: "Don't have an account?",
          title: 'Welcome back!',
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
    actions: {
      loading: 'Loading...',
      save: 'Save',
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
