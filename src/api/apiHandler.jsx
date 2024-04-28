import { axiosInstance } from './axiosInstance'
import { endPoints } from './endPoints'

export const getUsers = async () => {
  let { data } = await axiosInstance.get(`${endPoints.users}`)
  return data
}

export const getUserById = async (id) => {
  let { data } = await axiosInstance.get(`${endPoints.users}/${id}`)
  return data
}

export const deleteUser = async (id) => {
  // console.log(id);
  return await axiosInstance.delete(`${endPoints.deleteUser(id)}`)
}

export const addUser = async (data) => {
  let newUser = await axiosInstance.post(`${endPoints.users}`, data)
  return newUser
}
export const updateUser = async (data) => {
  // console.log(data)
  let updateUser = await axiosInstance.put(
    `${endPoints.updateUser(data?.id)}`,
    data
  )
  return updateUser
}
