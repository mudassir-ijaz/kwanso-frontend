import React from "react"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"
import styled from "styled-components"

const WrapperDashboard = styled.div`
  text-align: center;
`

const Heading = styled.h1`
  color: palevioletred;
`

const StyledButton = styled(Button)`
  color: palevioletred;
  background: papayawhip;
  margin-right: 5px;
`

export default function Main() {
  return (
    <WrapperDashboard>
      <Heading>Landing page</Heading>
      <StyledButton color="inherit" component={Link} to="/login">
        Login
      </StyledButton>
      <StyledButton color="inherit" component={Link} to="/register">
        Regiser
      </StyledButton>
    </WrapperDashboard>
  )
}
