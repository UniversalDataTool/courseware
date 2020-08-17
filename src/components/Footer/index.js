import React from "react"
import { Grid, Button, styled, Box, colors } from "@material-ui/core"
const Link = styled("a")({ color: colors.blue[700], textDecoration: "none" })
const Container = styled("div")({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  paddingBottom: 50,
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  "& > *": {
    margin: 8,
  },
})
const Text = styled("div")({
  color: colors.grey[600],
})

export const Footer = () => {
  return (
    <Container>
      <Link href="/app/legal">Terms of Service</Link>
      <Link href="https://github.com/UniversalDataTool/universal-data-tool#contributors-">
        Thanks to our Contributors
      </Link>
      <Link href="https://github.com/UniversalDataTool/universal-data-tool">
        Support this work by leaving a star
      </Link>
    </Container>
  )
}

export default Footer
