// MUI
import { Button as MUIButton, ButtonProps } from '@mui/material';

type CustomProps = {
  text: string;
};

export const Button: React.FC<CustomProps & ButtonProps> = ({
  text,
  ...muiProps
}) => {
  return (
    <MUIButton {...muiProps} sx={{ textTransform: 'none' }}>
      {text}
    </MUIButton>
  );
};
