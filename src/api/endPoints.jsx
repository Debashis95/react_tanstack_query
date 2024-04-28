

export const baseURL = 'http://localhost:3000'

export const endPoints = {
  users: '/users',
  deleteUser(id) {
    return `${this.users}/${id}`
  },
  updateUser(id) {
    return `${this.users}/${id}`
  },
}
