import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Menu from './components/Navbar'
import { Container } from '@mui/material'
import TaskHome from './components/TaskHome';
import Login from './components/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<TaskForm />} />
          <Route path='/home' element={<TaskHome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/tasks/:id/edit' element={<TaskForm />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

