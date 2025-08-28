import { ITranslate } from './i-translate';

export const EnI18n: ITranslate = {
  finCore: {
    actions: {
      loading: 'Loading...',
      save: 'Save',
      toggleToLightMode: 'Toggle to light mode',
      toggleToDarkMode: 'Toggle to dark mode',
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
          subtitle: 'Fill in the information below to get started',
          title: 'Create your account',
          steps: {
            credentials: {
              invalidCode: 'Code is invalid',
              resendConde: 'Resend code',
              title: 'Credentials',
              typeCodeSentOnEmail: 'Enter the code sent to your email',
              resendCode: 'Resend code',
              youCanResendCodeIn: 'You can resend the code in {{resendIn}}',
            },
            personal: {
              displayName: 'How would you like to be called?',
              firstName: 'First name',
              lastName: 'Last name',
              title: 'You',
            },
            finished: {
              goToFin: 'Go to Fin',
              title: 'Done!',
            },
          },
          next: 'Next',
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
          success: 'Success!',
        },
        sendResetEmail: {
          emailSent:
            'We’ve sent you an email if your address exists in our system',
          sendLink: 'Send link',
          subtitle: 'Enter your email to receive the recovery link',
          title: 'Forgot your password?',
        },
      },
      comeBackLogin: 'Back to login',
      talkWithSupport: 'Talk with support',
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
    sharedComponents: {
      grid: {
        noData: 'No data to display',
        reload: 'Reload',
      },
    },
  },
};
