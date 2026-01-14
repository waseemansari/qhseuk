import React from 'react';
import DatePickerLib from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker-custom.css';

export default function BeautifulDatePicker({ value, onChange, error }) {
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
 
  return (
    <>
      <label className="form-label fw-semibold">Date of Birth</label>
      <div className="input-group">
        <DatePickerLib
          selected={value ? new Date(value) : null}
          onChange={(date) => {
            if (date) {
              // Convert date to yyyy-mm-dd format for Laravel
              const formatted = date.toISOString().split('T')[0];
              onChange(formatted);
            } else {
              onChange('');
            }
          }}
          dateFormat="yyyy-MM-dd"
          maxDate={maxDate}
          placeholderText="Select your date of birth"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className="form-control"
        />
      </div>
      {error && <div className="text-danger mt-1">{error}</div>}
    </>
  );
}
