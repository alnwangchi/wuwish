import React from 'react';
import { Input } from 'antd';
import { ReactFormProps } from '@/interface';

const { TextArea } = Input;

enum InputType {
  Input = 'input',
  Textarea = 'textarea',
}

interface InputFieldProps extends ReactFormProps {
  label: string;
  required?: boolean;
  type?: string;
}

const InputField = ({
  label,
  required = true,
  type = InputType.Input,
  ...props
}: InputFieldProps) => {
  const { field, formState } = props;
  return (
    <div className='mb-4'>
      <label
        className={`${required ? 'labelText-required' : ''} ${'labelText'}`}
      >
        {label}
      </label>
      {type === InputType.Textarea ? (
        <TextArea rows={4} className='py-2' />
      ) : (
        <Input {...field} className='py-2' />
      )}
      {formState?.errors?.[field.name] && (
        <p className={'errorInput'}>{label}是必填欄位</p>
      )}
    </div>
  );
};

export default InputField;
