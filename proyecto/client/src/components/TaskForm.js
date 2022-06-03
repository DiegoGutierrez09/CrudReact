import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';



export default function TaskForm() {

  const [task, setTask] = useState({
    name: '',
    email: '',
    password: '',
    age:''
  })

  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (editing) {
      await fetch(`http://localhost:4000/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task)
      });
    } else {
      await fetch('http://localhost:4000/tasks', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
      });
    }
    setLoading(false)
    navigate('/home')
  };

  const handleChange = (e) =>
    setTask({ ...task, [e.target.name]: e.target.value });

  const loadTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${params.id}`)
    const data = await res.json()
    setTask({ name: data.name, email: data.email, password: data.password })
    setEditing(true)
  }
  useEffect(() => {
    if (params.id) {
      loadTask(params.id)
    }

  }, [params.id])

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{
          backgroundColor: '#1e272e', padding: '1rem'
        }}>
          <Typography variant='5' textAlign='center' color='white'>
            {
              editing ? "Edit User" : "Create User"
            }
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                variant='filled'
                label='Write your name'
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}

                onChange={handleChange}
                name='name'
                value={task.name}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField
                variant='filled'
                label='Write your email'
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}

                onChange={handleChange}
                name='email'
                value={task.email}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField
                variant='filled'
                label='Write your password'
                type='password'
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}

                onChange={handleChange}
                name='password'
                value={task.password}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField
                variant='filled'
                label='Write your age'
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}

                onChange={handleChange}
                name='age'
                value={task.age}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <Button variant='contained' color='primary' type='submit'>
                {loading ? <CircularProgress
                  color='inherit' size={24}
                /> : 'Save'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
