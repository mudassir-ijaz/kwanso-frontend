import React, { useEffect, useState } from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import Checkbox from "@material-ui/core/Checkbox"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogTitle from "@material-ui/core/DialogTitle"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import axios from "axios"
import decode from "jwt-decode"
import { listTasks, deleteBulk } from "../../apis/endpoints"
import styled from "styled-components"

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

export default function MediaControlCard() {
  const [checked, setChecked] = React.useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteTask, setDeleteTask] = React.useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const handleClose = () => {
    setDeleteTask(false)
  }

  const fetchData = async () => {
    setLoading(true)

    var data = {}
    const token = localStorage.getItem("jwt")
    const decoded = decode(token)
    data.user_id = decoded._id

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    }

    await axios
      .get(`${listTasks}/${data.user_id}`, { headers: headers })
      .then((response) => {
        setTasks(response.data.tasks)
        setLoading(false)
      })
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleDeleteTask = () => {
    setDeleteTask(true)
  }

  const callDelete = async () => {
    setLoading(true)

    const task_ids = checked.map((check) => check._id)
    const token = localStorage.getItem("jwt")

    const headers = {
      "Content-Type": "application/json",
      Authorization: token,
    }

    await axios
      .put(deleteBulk, { task_ids }, { headers: headers })
      .then((response) => {
        setDeleteTask(false)
        setLoading(false)
        fetchData()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <RegisteredWrapper>
      <Heading>List of Tasks</Heading>
      <FormWrapper>
        <StyledForm>
          <Grid spacing={2}>
            <Grid item xs={6} md={12} lg={12}>
              {loading ? (
                <Heading>Loading</Heading>
              ) : (
                <List dense>
                  {tasks.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value._id}`
                    return (
                      <ListItem key={value._id} button>
                        <ListItemText
                          id={labelId}
                          primary={`Task: ${value.name}`}
                        />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })}
                </List>
              )}

              {tasks.length === 0 ? (
                <Heading>You have no task in DB </Heading>
              ) : undefined}
            </Grid>

            <Grid item xs={6} md={12} lg={12}>
              {deleteTask ? (
                <Dialog
                  open={deleteTask}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    Do you want to delete all selected tasks?
                  </DialogTitle>

                  <DialogActions>
                    <Button
                      onClick={handleClose}
                      variant="contained"
                      disabled={loading}
                      color="secondary"
                    >
                      No
                    </Button>
                    <Button
                      onClick={callDelete}
                      variant="contained"
                      color="primary"
                      disabled={loading}
                      autoFocus
                    >
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              ) : undefined}
            </Grid>

            <Grid item xs={6} md={12} lg={12}>
              {checked.length > 0 && tasks.length > 0 ? (
                <StyledButton
                  variant="contained"
                  color="primary"
                  onClick={handleDeleteTask}
                >
                  Delete
                </StyledButton>
              ) : undefined}
            </Grid>
          </Grid>
        </StyledForm>
      </FormWrapper>
    </RegisteredWrapper>
  )
}
