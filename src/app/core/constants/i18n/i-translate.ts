export interface ITranslate {
  finCore: {
    actions: {
      cancel: string;
      changeOrder: string;
      close: string;
      confirmation: string;
      creating: string;
      delete: string;
      edit: string;
      editing: string;
      editingName: string;
      loadMore: string;
      active: string;
      inactive: string;
      loading: string;
      new: string;
      noResults: string;
      ok: string;
      open: string;
      pin: string;
      save: string;
      search: string;
      searching: string;
      startTyping: string;
      toggleToDarkMode: string;
      toggleToLightMode: string;
      tryDifferentTerms: string;
      unpin: string;
    };
    appName: string;
    auth: {
      comeBackLogin: string;
      confirmYourPassword: string;
      email: string;
      erros: {
        cantCreateUser: string;
        differentGoogleAccountLinked: string;
        doNotHasPassword: string;
        emailAlreadyInUse: string;
        emailNotFound: string;
        errorOnCreateUser: string;
        errorOnResend: string;
        errorOnValidEmail: string;
        expiredToken: string;
        inactivatedUser: string;
        invalidPassword: string;
        invalidRefreshToken: string;
        invalidToken: string;
        loginError: string;
        maxAttemptsReached: string;
        notSamePassword: string;
        passwordMinLength: string;
        passwordMustHasLowercase: string;
        passwordMustHasNumber: string;
        passwordMustHasSpecial: string;
        passwordMustHasUppercase: string;
        passwordsMustBeEquals: string;
        resetPasswordError: string;
        sendResetError: string;
        title: string;
      };
      pages: {
        createAccount: {
          next: string;
          steps: {
            credentials: {
              invalidCode: string;
              resendCode: string;
              resendConde: string;
              title: string;
              typeCodeSentOnEmail: string;
              youCanResendCodeIn: string;
            };
            finished: {
              goToFin: string;
              title: string;
            };
            personal: {
              displayName: string;
              firstName: string;
              lastName: string;
              title: string;
            };
          };
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
      password: string;
      talkWithSupport: string;
    };
    connectors: {
      or: string;
    };
    errors: {
      email: string;
      forbidden: string;
      googleLoginError: string;
      internalError: string;
      maxLength: string;
      minLength: string;
      pattern: string;
      required: string;
      serverError: string;
    };
    features: {
      financialInstitutions: {
        code: string;
        bankName: string;
        codeAndType: string;
        codeHelp: string;
        bankNameAndCode: string;
        colorHelp: string;
        iconHelp: string;
        list: {
          title: string;
        };
        name: string;
        nameHelp: string;
        title: string;
        type: string;
      };
      titleCategory: {
        deleteMessage: string;
        name: string;
        title: string;
        type: {
          both: string;
          expense: string;
          income: string;
          title: string;
        };
      };
      menus: {
        frontRoute: string;
        hide: string;
        keyWord: string;
        leftTop: string;
        name: string;
        onlyForAdmin: string;
        position: string;
        showOnSideNav: string;
        title: string;
      };
      notifications: {
        continuous: string;
        htmlBody: string;
        link: string;
        severity: {
          error: string;
          info: string;
          default: string;
          success: string;
          title: string;
          warning: string;
        };
        startToDelivery: string;
        stopToDelivery: string;
        textBody: string;
        title: string;
        users: string;
        ways: {
          email: string;
          message: string;
          push: string;
          snack: string;
          title: string;
        };
      };
      shared: {
        name: string;
        icon: string;
        color: string;
        inactivatedFilter: {
          activated: string;
          inactivated: string;
          title: string;
        };
      };
    };
    grid: {
      confirmDelete: string;
    };
    layout: {
      admin: string;
      clearNotifications: string;
      closeMenu: string;
      empty: string;
      exit: string;
      noNotifications: string;
      notifications: string;
      openMenu: string;
      pinnedMenus: string;
      settings: string;
      termsAndPolicies: string;
      unpinnedMenus: string;
      xNotifications: string;
    };
    sharedComponents: {
      grid: {
        noData: string;
        reload: string;
      };
    };
  };
}
