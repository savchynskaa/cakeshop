'use client';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { TaskAltRounded } from '@mui/icons-material';
import { StyledMaterialDesignContent } from './snackbar';
import { SnackbarUtilsConfigurator } from './SnackbarUtils';

type Props = {
  children: React.ReactNode;
};

export const SnackbarRegistry: React.FC<Props> = ({ children }) => {
  return (
    <SnackbarProvider
      autoHideDuration={3000}
      preventDuplicate
      Components={{
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
      }}
      iconVariant={{
        success: <TaskAltRounded sx={{ mr: 8 }} />
      }}
    >
      <SnackbarUtilsConfigurator />
      {children}
    </SnackbarProvider>
  );
};
