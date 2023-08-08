import React from 'react';
import style from './form.module.css';
import { Input } from 'antd';
import { ControllerProps } from 'react-hook-form';

type InputFieldProps = Pick<ControllerProps, 'render'> & {
  label: string;
  required: boolean;
};

const InputField = ({ label, required, ...props }: any) => {
  const { field, formState } = props;
  return (
    <div className='mb-4'>
      <label
        className={`${required ? style['labelText-required'] : ''} ${
          style['labelText']
        }`}
      >
        {label}
      </label>
      <Input {...props.field} className='py-2'/>
      {formState?.errors?.[field.name] && <p className={style['errorInput']}>{label}是必填欄位</p>}
    </div>
  );
};

export default InputField;
