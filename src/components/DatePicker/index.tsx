import * as React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DayJsUtils from '@date-io/dayjs';
import { Controller } from "react-hook-form";

interface DatePickerProps {
  name: string;
  label: string;
  placeholder?: string;
  control: any;
  error: string | undefined;
  format?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  error,
  control,
  name,
  label = '',
  placeholder = '',
  format = 'DD-MM-YYYY'
}) => {

  return (
    <MuiPickersUtilsProvider utils={DayJsUtils}>      
      <Controller
        render={(props) => (
          <KeyboardDatePicker
            fullWidth
            autoOk            
            error={!!error}
            inputVariant="outlined"
            variant="inline"
            format={format}
            label={label}
            helperText={error}
            defaultValue={null}
            {...props}
            onChange={(e) => props.onChange(e)}
          />
        )}        
        control={control}
        name={name}
        placeholder={placeholder}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DatePicker;

