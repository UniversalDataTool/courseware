import React from "react"
import { Box, Button, styled } from "@material-ui/core"
import { KeyboardArrowDown as KeyboardArrowDownIcon } from "@material-ui/icons"

const DropdownButton = styled(Button)({
  textTransform: "none",
})

export const Header = () => {
  return (
    <Box display="flex">
      <Box flexGrow={1} />
      {/* <DropdownButton>
        <div className="text">Some Person's Name</div>
        <KeyboardArrowDownIcon />
      </DropdownButton> */}
    </Box>
  )
}

export default Header
