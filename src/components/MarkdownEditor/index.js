import React from "react"
import ReactMde from "react-mde"
import "react-mde/lib/styles/css/react-mde-all.css"

export const MarkdownEditor = ({ value, onChange }) => {
  return <ReactMde disablePreview value={value} onChange={onChange} />
}

export default MarkdownEditor
