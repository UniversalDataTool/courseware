import React from "react"
import { Grid, Button, styled, Box, colors } from "@material-ui/core"
import Header from "../Header"
import Footer from "../Footer"
import CenteredContent from "../CenteredContent"

const Container = styled("div")({
  backgroundColor: colors.grey[100],
  minHeight: "100vh",
  boxSizing: "border-box",
  position: "relative",
  paddingBottom: 100,
})

export const PageContainer = ({ children, selectedTab }) => {
  return (
    <Container>
      <Header />
      {/* <CenteredContent>asd</CenteredContent> */}
      {children}
      <Footer />
    </Container>
  )
}

export default PageContainer
