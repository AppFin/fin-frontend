import { ITranslate } from './i-translate';

export const PtI18n: ITranslate = {
  'fin-core': {
    appName: 'App Fin',
    connectors: {
      or: 'ou',
    },
    auth: {
      confirmYourPassword: 'Confirme sua senha',
      email: 'E-mail',
      pages: {
        login: {
          createAccount: 'Criar conta',
          forgetPassword: 'Esqueceu sua senha?',
          loginWithGoogle: 'Continuar com o Google',
          singIn: 'Entrar',
          subtitle: 'Bem-vindo de volta!',
          thereIsNoAccount: 'Não tem uma conta?',
          title: 'Entre na sua conta',
        },
        resetPassword: {
          resetPassword: 'Redefinir sua senha',
          subtitle: 'Informe confirme sua nova senha',
          title: 'Redefinir senha',
        },
        sendResetEmail: {
          comeBackLogin: 'Voltar para o login',
          sendLink: 'Enviar link',
          subtitle: 'Digite seu email para receber o link de recuperação',
          title: 'Esqueceu sua senha?',
        },
      },
      password: 'Senha',
    },
    actions: {
      loading: 'Carregando...',
      save: 'Salvar',
    },
    errors: {
      email: 'Email inválido',
      maxLength: 'Máximo de {{maxLength}} caracteres',
      minLength: 'Mínimo de {{minLength}} caracteres',
      pattern: 'Formato inválido',
      required: 'Este campo é obrigatório',
    },
  },
};
