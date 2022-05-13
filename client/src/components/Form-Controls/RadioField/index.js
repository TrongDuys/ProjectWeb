import { Radio } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

RadioField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function RadioField(props) {
  const { form, name } = props;
  return (
    <Controller
      rules={{ required: true }}
      control={form.control}
      defaultValue="Nhà nông"
      name={name}
      render={({ name, onBlur, onChange, value }) => {
        return (
          <RadioGroup row name={name} value={value} onBlur={onBlur} onChange={onChange}>
            <FormControlLabel value="Nhà nông" control={<Radio />} label="Nhà nông" />
            <FormControlLabel value="Chuyên gia nông nghiệp" control={<Radio />} label="Chuyên gia nông nghiệp" />
            <FormControlLabel value="Chuyên gia công nghệ" control={<Radio />} label="Chuyên gia công nghệ" />
          </RadioGroup>
        );
      }}
    />
  );
}

export default RadioField;
