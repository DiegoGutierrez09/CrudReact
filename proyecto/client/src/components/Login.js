import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { login } from '../api/index';



export default function TaskForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({
      ...user,
      [name]: value
    })
  }
  const onSubmit = () => {
    setLoading(true)
    login(user).then((res) => {
      setTimeout(() => {
        navigate('/home')
      }, 2000)
      setLoading(false)
    })
  }

  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{
          backgroundColor: '#1e272e', padding: '1rem'
        }}>
          <Typography variant='5' textAlign='center' color='white'>
            Login User
          </Typography>
          <CardContent>
            <form>
              <TextField
                variant='filled'
                label='Write your email'
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}

                onChange={handleChange}
                name='email'
                value={user.email}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <TextField
                variant='filled'
                label='Password'
                placeholder='Write your password'
                type='password'
                sx={{
                  display: 'block',
                  margin: '.5rem 0'
                }}
                onChange={handleChange}
                name='password'
                value={user.password}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'white' } }}
              />
              <Button variant='contained' color='primary' onClick={onSubmit}>
                {loading ? <CircularProgress
                  color='inherit' size={24}
                /> : 'Sing In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
