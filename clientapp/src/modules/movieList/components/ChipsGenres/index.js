import React from 'react'
import PropTypes from 'prop-types'
import { Autocomplete, Checkbox, TextField } from '@mui/material'
import { useFormikContext } from 'formik'

import { Genres } from '../../../../Enums'

const ChipsGenres = ({ selectedGenres }) => {
  const { setFieldValue } = useFormikContext()

  return (
    <Autocomplete
      multiple
      options={Genres}
      getOptionLabel={option => option.name}
      disableCloseOnSelect
      renderInput={(props) => <TextField {...props} label='Genres' />}
      renderOption={((props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            checked={selected}
          />
          {option.name}
        </li>
      ))}
      value={selectedGenres}
      isOptionEqualToValue={((option, value) => option.name === value.name)}
      onChange={((event, value) => setFieldValue('genres', value))}
    />
  )
}

ChipsGenres.propTypes = {
  selectedGenres: PropTypes.array.isRequired,
}

export default ChipsGenres
