import React from "react"
import { styled, colors, Button, Box } from "@material-ui/core"
import GitHubButton from "react-github-btn"
import {
  AddBox as AddBoxIcon,
  Panorama as PanoramaIcon,
} from "@material-ui/icons"

const RootContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})
const ContentContainer = styled("div")({
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  maxWidth: 1200,
})
const Header = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  backgroundColor: colors.blue[600],
  padding: 8,
  boxSizing: "border-box",
})
const HeaderButton = styled(Button)({
  color: "white",
  margin: 8,
  padding: 16,
  paddingLeft: 24,
  paddingRight: 24,
  "& .icon": {
    marginRight: 8,
    opacity: 0.8,
  },
})
const Hero = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  backgroundColor: colors.blue[500],
  padding: 16,
  color: "white",
  boxSizing: "border-box",
})
const HeroMain = styled("div")({
  fontSize: 48,
  fontWeight: "bold",
  paddingTop: 64,
  textShadow: "0px 1px 5px rgba(0,0,0,0.3)",
})
const HeroSub = styled("div")({
  paddingTop: 32,
  lineHeight: 1.5,
  fontSize: 24,
  textShadow: "0px 1px 3px rgba(0,0,0,0.2)",
})
const HeroButtons = styled("div")({
  display: "flex",
  paddingTop: 48,
  paddingBottom: 48,
})
const HeroTryButton = styled(Button)({
  color: "#fff",
  margin: 8,
  fontSize: 18,
  backgroundColor: colors.blue[900],
  "&:hover": {
    backgroundColor: colors.blue[900],
  },
})
const Section = styled("div")({
  display: "flex",
  padding: 16,
  paddingTop: 32,
  flexDirection: "column",
  "& p": {
    fontSize: 18,
    color: colors.grey[800],
    lineHeight: 1.5,
  },
})
const TryButton = styled(Button)({
  margin: 8,
  fontSize: 18,
})

const LandingPage = () => {
  return (
    <RootContainer>
      <Header id="about">
        <ContentContainer style={{ flexDirection: "row", flexGrow: 1 }}>
          <HeaderButton href="https://universaldatatool.com">
            Universal Data Tool
          </HeaderButton>
          <HeaderButton href="./create">
            <AddBoxIcon className="icon" />
            Create Course
          </HeaderButton>
          <HeaderButton href="./course/example">
            <PanoramaIcon className="icon" />
            Try Example Course
          </HeaderButton>
        </ContentContainer>
      </Header>
      <Hero>
        <ContentContainer>
          <HeroMain>Universal Data Tool Courseware</HeroMain>
          <HeroSub>
            Quickly create training for annotators with dataset-specific
            instructions and exercises.
          </HeroSub>
          <HeroButtons>
            <HeroTryButton href="./create" variant="contained">
              Create a Course
            </HeroTryButton>
            <HeroTryButton href="./course/example" variant="contained">
              Try an Example Course
            </HeroTryButton>
            <Box
              flexGrow={1}
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <GitHubButton
                href="https://github.com/UniversalDataTool/courseware"
                data-size="large"
                data-show-count="true"
                aria-label="Star universaldatatool/courseware on GitHub"
              >
                Star
              </GitHubButton>
            </Box>
          </HeroButtons>
        </ContentContainer>
      </Hero>
      <ContentContainer className="markdown-body">
        <Section className="markdown-body">
          <h1>Features</h1>
          <p>
            <ul>
              <li>
                Easy to use course editor, start a course in seconds, no sign up
                required
              </li>
              <li>Test annotators against real dataset data </li>
              <li>Supports text, document, video and image data</li>
              <li>
                Supports Named Entity Recognition, Image Segmentation,
                Classification, Forms, Video Segmentation
              </li>
              <li>Private Course URLs</li>
              <li>
                View anyone who has completed course with a special
                administrator link
              </li>
              <li>
                Programmatically query to see if user has completed course
              </li>
              <li>
                Free and open-source!{" "}
                <a
                  style={{ color: colors.blue[500] }}
                  href="https://github.com/UniversalDataTool/universal-data-tool"
                >
                  Consider giving us a star!
                </a>
              </li>
            </ul>
          </p>
          <h1>Why?</h1>
          <p>
            Dataset annotators often need extensive instructions to understand
            how to label or annotate a dataset. Universal Data Tool Courseware
            allows you to quickly create training for annotators with
            dataset-specific instructions and exercises.
          </p>
          <p>
            <b>
              With proper testing, exercises and explanations, a dataset
              annotator can be trained in minutes, no need for constant
              supervision, mentoring or retroactive rejection.
            </b>
          </p>
          <p>
            <TryButton href="./create" variant="contained" color="primary">
              Create a Course
            </TryButton>
            <TryButton
              href="./course/example"
              variant="contained"
              color="primary"
            >
              Try an Example Course
            </TryButton>
          </p>
        </Section>
      </ContentContainer>
    </RootContainer>
  )
}

export default LandingPage
