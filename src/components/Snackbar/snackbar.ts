import { colors, styled } from '@mui/material';
import { MaterialDesignContent } from 'notistack';
import { colors as customColors } from '../../utils/colors';

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    fontSize: '16px',
    backgroundColor: customColors.second
  },
  '&.notistack-MuiContent-error': {
    fontSize: '16px',
    backgroundColor: colors.red[900]
  },
  '&.notistack-MuiContent-info': {
    fontSize: '16px',
    backgroundColor: customColors.second
  },
  '&.notistack-MuiContent-warning': {
    fontSize: '16px',
    backgroundColor: colors.deepOrange[200]
  }
}));
