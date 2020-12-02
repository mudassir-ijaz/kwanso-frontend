import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import FormInput from "../../components/Input"
import axios from "axios"
import MuiAlert from "@material-ui/lab/Alert"
import styled from "styled-components"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { login } from "../../apis/endpoints.js"

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required").min(5),
})

const RegisteredWrapper = styled.div`
  padding: 10px;
  text-align: center;
`
const FormWrapper = styled.div`
  padding: 10px;
`

const Heading = styled.h1`
  color: palevioletred;
`

const StyledButton = styled(Button)`
  margin-top: 30px;
  background: ${(props) => (props.primary ? "white" : "palevioletred")};
  color: ${(props) => (props.primary ? "palevioletred" : "white")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

function Login(props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorString, setErrorString] = useState("")

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  })
  const { handleSubmit, errors } = methods

  const onSubmit = async (data) => {
    setLoading(true)
    await axios
      .post(login, data)
      .then((response) => {
        if (response.status === 401) {
          setLoading(false)
          alert("Invalid Email/Password")
        } else {
          setLoading(false)
          localStorage.setItem("jwt", response.data.jwt)
          props.history.push("/dashboard")
        }
      })
      .catch((error) => {
        setError(true)
        setErrorString(error.message)
      })
  }

  function Alert(props) {
    return <MuiAlert elevation={3} variant="filled" {...props} />
  }

  return (
    <RegisteredWrapper>
      <Heading>Login</Heading>

      <FormWrapper>
        <FormProvider {...methods}>
          <StyledForm>
            <Grid spacing={2}>
              <Grid item xs={6} md={12} lg={12}>
                <Snackbar open={error} autoHideDuration={1000}>
                  <Alert severity="error">{errorString}</Alert>
                </Snackbar>
              </Grid>
              <Grid item xs={6} md={12} lg={12}>
                <FormInput
                  name="email"
                  label="Email"
                  required={true}
                  errorobj={errors}
                />
              </Grid>
              <Grid item xs={6} md={12} lg={12}>
                <FormInput
                  name="password"
                  label="Password"
                  required={true}
                  errorobj={errors}
                />
              </Grid>
            </Grid>
          </StyledForm>
        </FormProvider>
        <StyledButton
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </StyledButton>
      </FormWrapper>
    </RegisteredWrapper>
  )
}

export default Login