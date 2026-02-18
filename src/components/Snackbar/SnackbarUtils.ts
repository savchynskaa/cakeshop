'use client';
import { useSnackbar, VariantType, ProviderContext } from 'notistack';

let useSnackbarRef: ProviderContext;
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

const config = (message: string, variant: VariantType = 'default') => {
  useSnackbarRef.enqueueSnackbar(message, { variant });
};

export const snackService = {
  success: (message?: string) => {
    config(message ? message : 'Успіх', 'success');
  },
  warning: (message: string) => {
    config(message, 'warning');
  },
  info: (message: string) => {
    config(message, 'info');
  },
  error: (message?: string) => {
    config(message ? message : 'Схоже щось пішло не так, спробуйте пізніше', 'error');
  }
};
