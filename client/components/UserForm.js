import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function UserInputForm({childToParent}) {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Initialize history


  const [numCourse, setNumCourses] = useState(2);

  const handleaddCourse = () => {
    setNumCourses(numCourse + 1);
  }

  const handleremoveCourse = () => {
    if (numCourse > 1) {
        setNumCourses(numCourse - 1);
    }
  };

  const onSubmit = async (data) => {
    // Make a fetch request to your API with the user's data
    try {
      const response = await fetch("http://127.0.0.1:5000/api", {
        method: "POST",
        headers: {
            //'Accept': 'application/json, text/plain, */*',
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "POST",
          },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Handle the API response data as needed
        console.log('API response:', responseData);
        childToParent(responseData);
        navigate('/calendar')
      } else {
        console.error('API request failed');
      }
    } catch (error) {
      console.error('API request error', error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '300px',
        margin: '0 auto',
        marginTop: '40px'
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="resetDatabase"
        control={control}
        defaultValue=""
        rules={{ required: 'Reset Database is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Reset Database"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '16px' }}
            error={Boolean(errors.resetDatabase)}
            helperText={errors.resetDatabase && errors.resetDatabase.message}
          />
        )}
      />
      <Controller
        name="year"
        control={control}
        defaultValue=""
        rules={{ required: 'Year is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Year"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '16px' }}
            error={Boolean(errors.year)}
            helperText={errors.year && errors.year.message}
          />
        )}
      />
      <Controller
        name="quarter"
        control={control}
        defaultValue=""
        rules={{ required: 'Quarter is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Quarter"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '16px' }}
            error={Boolean(errors.quarter)}
            helperText={errors.quarter && errors.quarter.message}
          />
        )}
      />
{/*        <Controller
        name="Course #1"
        control={control}
        defaultValue=""
        rules={{ required: 'Class is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Course"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '16px' }}
            error={Boolean(errors.class)}
            helperText={errors.class && errors.quarter.class}
          />
        )}
      />
        <Controller
        name="Course #2"
        control={control}
        defaultValue=""
        rules={{ required: 'Class is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Course"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '16px' }}
            error={Boolean(errors.class)}
            helperText={errors.class && errors.quarter.class}
          />
        )}
      />  */}

      {[...Array(numCourse)].map((e, index) =>
      <Controller
          //key={index}
          name={`Course #${index}`} // Use dynamic field names
          control={control}
          defaultValue=""
          rules={{ required: `Course ${index + 1} is required` }}
          render={({ field }) => (
            <TextField
            {...field}
            label="Course"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '16px' }}
            error={Boolean(errors.class)}
            helperText={errors.class && errors.quarter.class}
          />
          )}
        />
      )}

      <Button onClick={handleaddCourse}>
        Add Course
      </Button>
      <Button onClick={handleremoveCourse}>
        Remove Course
      </Button>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Box>
  );
}

export default UserInputForm;
