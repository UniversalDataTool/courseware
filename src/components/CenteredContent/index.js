import React from "react"
import { styled } from "@material-ui/core"
import { Box } from "@material-ui/core"

const ContentContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexGrow: 1,
}))
const Content = styled(Box)(({ theme }) => ({
  width: "calc(100% - 32px)",
  maxWidth: 1000,
}))

export const CenteredContent = ({ children, contentStyle }) => {
  return (
    <ContentContainer>
      <Content style={contentStyle}>{children}</Content>
    </ContentContainer>
  )
}

export default CenteredContent
