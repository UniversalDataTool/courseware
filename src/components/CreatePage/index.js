import React from "react"
import { styled, colors } from "@material-ui/core"
import PageContainer from "../PageContainer"
import CenteredContent from "../CenteredContent"

const MainContent = styled("div")({
  "& p": {
    fontSize: 18,
    lineHeight: 1.5,
  },
})
const Link = styled("a")({ color: colors.blue[700], textDecoration: "none" })

export const CreatePage = () => {
  return (
    <PageContainer>
      <CenteredContent>
        <MainContent>
          <h1>Create a Course</h1>
          <p>
            Upload your UDT dataset below to start creating a course. You'll be
            able to use this dataset to create easily create questions and show
            examples. We'll automatically prune your dataset to 100 samples or
            less before uploading.
          </p>
          <p>
            Forgot your dataset? Try using these{" "}
            <Link href="#">Elon Musk tweets</Link> or these{" "}
            <Link href="#">cats photos</Link>.
          </p>
        </MainContent>
      </CenteredContent>
    </PageContainer>
  )
}

export default CreatePage
