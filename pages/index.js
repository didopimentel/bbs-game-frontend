import * as React from 'react';
import { Container, Paper, TextField, Box, Button, Link, Tabs, Tab } from "@mui/material"
import styles from '../styles/Home.module.css';
import { useAuth } from "../contexts/auth";
import { useRouter } from "next/router";

export default function Home() {
  const [value, setValue] = React.useState(0);
  const [emailLogin, setEmailLogin] = React.useState('');
  const [passwordLogin, setPasswordLogin] = React.useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleEmailLoginChange = (e) => {
    setEmailLogin(e.target.value)
  };

  const handlePasswordLoginChange = (e) => {
    setPasswordLogin(e.target.value)
  };

  async function submitLogin(){
    try {
      await login(emailLogin, passwordLogin)
      router.push('/dashboard');
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <Container>
      
      <Container className={styles.container_login}>
        <Box className={styles.box_login_register_tabs}>
          <Tabs value={value} onChange={handleChange}>
            <Tab active label="Login"></Tab>
            <Tab label="Register"></Tab>
          </Tabs>
        </Box>
        <Paper elevation={3}>
          <Box component="form" className={styles.box_login}>
            {value === 0 && (
              <>
              <TextField required label="Email" type="email" onChange={handleEmailLoginChange}/>
              <TextField required label="Password" type="password" onChange={handlePasswordLoginChange}/>
              <div className={styles.box_login_button}>
                <Button variant="contained" onClick={submitLogin}>Login</Button>
                <Link href="#">Forgot password</Link>
              </div>  
              </>  
            )}
            {value === 1 && (
              <>
              <TextField required label="Email" type="email"/>
              <TextField required label="Password" type="password"/>
              <div className={styles.box_login_button}>
                <Button variant="contained">Register</Button>
              </div>  
              </>  
            )}
            
          </Box>
        </Paper>
      </Container>
    </Container>
  )
}
