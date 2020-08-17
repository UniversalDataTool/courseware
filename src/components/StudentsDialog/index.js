import React from "react"
import SimpleDialog from "universal-data-tool/components/SimpleDialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import moment from "moment"

export const StudentsDialog = ({ open, onClose, students }) => {
  return (
    <SimpleDialog title="Passing Students" open={open} onClose={onClose}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Completed</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.email}>
              <TableCell component="th" scope="row">
                {student.email}
              </TableCell>
              <TableCell align="right">{student.contact_info.name}</TableCell>
              <TableCell align="right">
                {moment(student.created_at).fromNow()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SimpleDialog>
  )
}

export default StudentsDialog
