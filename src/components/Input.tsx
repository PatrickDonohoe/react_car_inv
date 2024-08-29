import { TextField } from '@mui/material';
import { ChangeEventHandler, forwardRef } from 'react';

interface InputType {
    name: string,
    placeholder?: string,
    value?: string,
    onChange?: ChangeEventHandler
}

const Input = forwardRef (( props: InputType, ref) => {
  return (
    <TextField
        variant='outlined'
        margin='normal'
        inputRef={ref}
        fullWidth
        type='text'
        {...props}
    >
    </TextField>
  )
})

export default Input
