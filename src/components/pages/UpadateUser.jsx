import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { getUserById, updateUser } from '../../api/apiHandler'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUser = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isLoading, isPending, isError, data, error } = useQuery({
    queryKey: ['userList', id],
    queryFn: () => getUserById(id),
  })

  // console.log(data)

  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
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

  if (isLoading) return 'loading...'
  if (isError) return `Error: ${error.message}`

  const onSubmit = (data) => mutate({ id, ...data })

  return (
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
          placeholder={data?.name}
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
          placeholder={data?.email}
          {...register('email', { required: true })}
        />
        {errors.email && <span>This field is required</span>}
      </div>
      <button type='submit' class='btn btn-primary'>
        Update
      </button>
    </form>
  )
}

export default UpdateUser
