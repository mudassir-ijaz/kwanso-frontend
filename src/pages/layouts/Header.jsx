//importing
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import decode from "jwt-decode"
import styled from "styled-components"
import { Button, Typography, Toolbar, AppBar } from "@material-ui/core"
import { ExitToApp as ExitToAppIcon } from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton"
import HomeIcon from "@material-ui/icons/Home"
import Authorization from "../../utils/Authorization"

const StyledIconButton = styled(IconButton)`
  margin-right: 16;
  margin-left: -12;
`

const StyledSection = styled.section`
  margin-left: auto;
  margin-right: -12;
`

const StyledAppBar = styled(AppBar)`
  background: papayawhip;
  color: palevioletred;
`

const StyledEmail = styled.div`
  padding-top: 20;
`

const Header = () => {
  const [email, setEmail] = useState("")
  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (token) {
      const decoded = decode(token)
      setEmail(decoded.email)
    }
  }, [])

  const logOut = (e) => {
    e.preventDefault()
    localStorage.removeItem("jwt")
    window.location = "/"
  }

  const guestLink = (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledIconButton aria-label="Menu" color="inherit">
          <HomeIcon />
        </StyledIconButton>
        <Typography variant="title" color="inherit">
          Kwanso Task App
        </Typography>

        <StyledSection>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </StyledSection>
      </Toolbar>
    </StyledAppBar>
  )

  const authLink = (
    <StyledAppBar position="static">
      <Toolbar>
        <StyledIconButton aria-label="Menu" color="inherit">
          <HomeIcon />
        </StyledIconButton>
        <Typography variant="title" color="inherit">
          {Authorization.isUser() ? email : null}{" "}
        </Typography>

        <StyledSection>
          <Button
            color="inherit"
            component={Link}
            to="/"
            style={{ float: "right" }}
            onClick={logOut}
          >
            Logout <ExitToAppIcon />
          </Button>
        </StyledSection>
      </Toolbar>
    </StyledAppBar>
  )

  return <div>{localStorage.getItem("jwt") ? authLink : guestLink}</div>
}

export default Header
