import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { deleteUser, getUsers } from '../../api/apiHandler'
import { Link } from 'react-router-dom'

const UserList = () => {
  const queryClient = useQueryClient()
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['userList'],
    queryFn: getUsers,
  })

  console.log(data)

  const { mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // console.log('Delete Successfully')
      queryClient.invalidateQueries({ queryKey: ['userList'] })
    },
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th colSpan='2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((users, i) => {
            const { id, name, email } = users
            return (
              <tr key={id}>
                <th scope='row'>{i + 1}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <button className='btn btn-info' onClick={() => mutate(id)}>
                    Delete
                  </button>
                </td>
                <td>
                  <Link className='btn btn-danger' to={`/update/${id}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default UserList
