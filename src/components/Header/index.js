import React from "react"
import { Typography, colors, Box, Button, styled } from "@material-ui/core"

import GitHubButton from "react-github-btn"

const Container = styled("div")({
  display: "flex",
  backgroundColor: colors.blue[700],
  color: "#fff",
  padding: 16,
})
const Title = styled(Button)({
  fontSize: 18,
  color: "#fff",
  textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
})
const StyledButton = styled(Button)({
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.2)",
})

export const Header = () => {
  return (
    <Container display="flex" alignItems="center">
      <Title href="/courses">Universal Data Tool Courses</Title>
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Box margin={1}>
          <StyledButton variant="outlined" href="/app">
            Universal Data Tool App
          </StyledButton>
        </Box>
        <Box margin={1}>
          <GitHubButton
            href="https://github.com/UniversalDataTool/courseware"
            data-size="large"
            data-show-count="true"
            aria-label="Star universaldatatool/courseware on GitHub"
          >
            Star
          </GitHubButton>
        </Box>
      </Box>
    </Container>
  )
}

export default Header
