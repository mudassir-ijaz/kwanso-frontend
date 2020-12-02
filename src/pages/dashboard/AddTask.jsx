import React, { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import decode from "jwt-decode"
import styled from "styled-components"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import FormInput from "../../components/Input"
import axios from "axios"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { createTask } from "../../apis/endpoints.js"
const validationSchema = yup.object().shape({
  name: yup.string().required("Task is required").min(5),
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

function AddTask(props) {
  const [loading, setLoading] = useState(false)

  const methods = useForm({
    resolver: yupResolver(validationSchema),
  })
  const { handleSubmit, errors } = methods

  const onSubmit = async (data) => {
    setLoading(true)

    const token = localStorage.getItem("jwt")
    const decoded = decode(token)
    data.user_id = decoded._id
    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    }

    await axios
      .post(createTask, data, {
        headers: headers,
      })
      .then((response) => {
        setLoading(false)
        props.history.push("/list-tasks")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <RegisteredWrapper>
      <Heading>Add Task</Heading>
      <FormWrapper>
        <FormProvider {...methods}>
          <StyledForm>
            <Grid spacing={2}>
              <Grid item xs={6} md={12} lg={12}>
                <FormInput
                  name="name"
                  label="Task Name"
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
          Add
        </StyledButton>
      </FormWrapper>
    </RegisteredWrapper>
  )
}

export default AddTask
