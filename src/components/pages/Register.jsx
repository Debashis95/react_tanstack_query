import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { addUser } from '../../api/apiHandler'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      console.log('Add successfully')
      queryClient.invalidateQueries({ queryKey: ['userList'] })
      navigate('/list')
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
  })
  const onSubmit = (data) => mutate(data)

  return (
    <>
      <h2>User Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class='mb-3'>
          <label for='exampleInputName' class='form-label'>
            Name
          </label>
          <input
            type='text'
            name='name'
            class='form-control'
            id='exampleInputName'
            aria-describedby='nameHelp'
            {...register('name', { required: true, minLength: 5 })}
          />
          {errors.name && <span>This field is required</span> && (
            <span>Min length 5</span>
          )}
        </div>
        <div class='mb-3'>
          <label for='exampleInputEmail1' class='form-label'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            class='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            {...register('email', { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <button type='submit' class='btn btn-primary'>
          Submit
        </button>
      </form>
    </>
  )
}

export default Register
