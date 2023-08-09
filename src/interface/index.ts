import {
  ControllerFieldState,
  ControllerRenderProps,
  UseFormStateReturn,
} from 'react-hook-form';

interface ReactFormProps {
  field: ControllerRenderProps<any, any>;
  formState: UseFormStateReturn<any>;
  fieldState: ControllerFieldState;
}

export type { ReactFormProps };
