import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom'
import Register from './components/pages/Register'
import UserList from './components/pages/UserList'
import Header from './components/layouts/Header'
import UpdateUser from './components/pages/UpadateUser'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [
      {
        path: '/',
        element: <Register />,
      },
      {
        path: 'list',
        element: <UserList />,
      },
      {
        path: 'update/:id',
        element: <UpdateUser />,
      }
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
