import React, { useState } from 'react';
import { Input } from 'antd';
import { ReactFormProps } from '@/interface';
const { Password } = Input;
enum InputType {
  Input = 'input',
  Password = 'password'
}

interface InputFieldProps extends ReactFormProps {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}

const InputField = ({
  label,
  required = true,
  type = InputType.Input,
  placeholder = '',
  ...props
}: InputFieldProps) => {
  const { field, formState } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="mb-4">
      <label className={`${required ? 'labelText-required' : ''} ${'labelText'}`}>{label}</label>
      {type === InputType.Password ? (
        <Password
          {...field}
          className="py-2"
          placeholder={placeholder}
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
        />
      ) : (
        <Input {...field} className="py-2" placeholder={placeholder} />
      )}

      {formState?.errors?.[field.name] && <p className={'errorInput'}>{label}是必填欄位</p>}
    </div>
  );
};

export default InputField;
