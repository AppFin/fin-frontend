import { ITranslate } from './i-translate';

export const PtBrI18n: ITranslate = {
  finCore: {
    actions: {
      loading: 'Carregando...',
      save: 'Salvar',
      toggleToLightMode: 'Mudar para modo claro',
      toggleToDarkMode: 'Mudar para modo escuro',
      search: 'Pesquisar (Ctrl + K)',
    },
    appName: 'App Fin',
    layout: {
      notifications: 'Notificações',
      xNotifications: '({{notificationCount}})  notificações',
      settings: 'Configurações',
      exit: 'Sair',
      termsAndPolicies: 'Termos e políticas',
      admin: 'Administrador',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
    },
    auth: {
      confirmYourPassword: 'Confirme sua senha',
      email: 'E-mail',
      erros: {
        passwordMinLength: 'A senha deve ter no mínimo 5 caracteres',
        passwordMustHasLowercase: 'A senha deve conter uma letra minúscula',
        passwordMustHasNumber: 'A senha deve conter um número',
        passwordMustHasSpecial: 'A senha deve conter um caractere especial',
        passwordMustHasUppercase: 'A senha deve conter uma letra maiúscula',
        passwordsMustBeEquals: 'As senhas devem ser iguais',
      },
      pages: {
        createAccount: {
          subtitle: 'Preencha os dados abaixo para começar',
          title: 'Criar sua conta',
          steps: {
            credentials: {
              invalidCode: 'Código é obrigatório',
              resendConde: 'Reenviar código',
              title: 'Credenciais',
              typeCodeSentOnEmail: 'Digite o código enviado no seu e-mail',
              resendCode: 'Reenviar código',
              youCanResendCodeIn: 'Você pode reenviar o código em {{resendIn}}',
            },
            personal: {
              displayName: 'Como quer ser chamado?',
              firstName: 'Primeiro nome',
              lastName: 'Segundo nome',
              title: 'Você',
            },
            finished: {
              goToFin: 'Acessar o Fin!',
              title: 'Pronto!',
            },
          },
          next: 'Próximo',
        },
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
          success: 'Sucesso!',
        },
        sendResetEmail: {
          emailSent:
            'Se o e-email existir na plataforma ele  foi enviado agora',
          sendLink: 'Enviar link',
          subtitle: 'Digite seu email para receber o link de recuperação',
          title: 'Esqueceu sua senha?',
        },
      },
      comeBackLogin: 'Voltar para o login',
      talkWithSupport: 'Falar com o Suporte',
      password: 'Senha',
    },
    connectors: {
      or: 'ou',
    },
    errors: {
      email: 'Email inválido',
      maxLength: 'Máximo de {{maxLength}} caracteres',
      minLength: 'Mínimo de {{minLength}} caracteres',
      pattern: 'Formato inválido',
      required: 'Este campo é obrigatório',
    },
    sharedComponents: {
      grid: {
        noData: 'Nenhum item para visualizar',
        reload: 'Recarregar',
      },
    },
  },
};
