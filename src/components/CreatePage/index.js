import React, { useCallback, useState } from "react"
import { styled, colors, Box, CircularProgress } from "@material-ui/core"
import PageContainer from "../PageContainer"
import CenteredContent from "../CenteredContent"
import { useDropzone } from "react-dropzone"

const MainContent = styled("div")({
  "& p": {
    fontSize: 18,
    lineHeight: 1.5,
  },
})
const DropContainer = styled("div")({
  border: `2px dotted ${colors.grey[500]}`,
  padding: 100,
  textAlign: "center",
  fontWeight: "bold",
  marginTop: 10,
  backgroundColor: "#fff",
  color: colors.grey[700],
})
const Link = styled("a")({ color: colors.blue[700], textDecoration: "none" })

export const CreatePage = () => {
  const [error, setError] = useState()
  const [createdCourse, setCreatedCourse] = useState()
  const [loading, setLoading] = useState()
  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true)
    const jsonContent = await new Promise((resolve, reject) => {
      var reader = new FileReader()
      reader.onload = function (e) {
        var contents = e.target.result
        try {
          resolve(JSON.parse(contents))
        } catch (e) {
          reject("error parsing json")
        }
      }
      reader.readAsText(acceptedFiles[0])
    }).catch((e) => {
      setLoading(false)
      setError(e.toString())
    })

    const response = await fetch("/courses/api/course", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataset: jsonContent,
      }),
    }).then((r) => r.json())

    window.location.href = `/courses/course/${response.course_id}/edit?edit_key=${response.edit_key}`
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  })
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
            <Link href="#">cats photos</Link>. These are in the{" "}
            <Link href="https://github.com/UniversalDataTool/udt-format">
              udt.json format
            </Link>
            , it's really simple, well-documented format!
          </p>
        </MainContent>
        {error && <Box color="#f00">{error}</Box>}
        <Box marginTop={8}>
          {!loading ? (
            <DropContainer {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>
                  Drag 'n' drop a dataset file here, or click to select the file
                  <br />
                  <br />
                  Your file should be in the udt.json format. <br />
                  <p style={{ opacity: 0.5 }}>
                    (this is what the Universal Data Tool gives you)
                  </p>
                </p>
              )}
            </DropContainer>
          ) : (
            <DropContainer>
              <CircularProgress size={20} />
            </DropContainer>
          )}
        </Box>
      </CenteredContent>
    </PageContainer>
  )
}

export default CreatePage
