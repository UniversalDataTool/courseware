import React from "react"
import Theme from "universal-data-tool/components/Theme"
import { RecoilRoot } from "recoil"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import CoursePage from "./components/CoursePage"
import CreatePage from "./components/CreatePage"
import EditCoursePage from "./components/EditCoursePage"

function App() {
  return (
    <Theme>
      <RecoilRoot>
        <Router>
          <Switch>
            <Route exact path={["/courses", "/"]}>
              <LandingPage />
            </Route>
            <Route exact path="/courses/create">
              <CreatePage />
            </Route>
            <Route exact path="/courses/course/:course_id">
              <CoursePage />
            </Route>
            <Route exact path="/courses/course/:course_id/edit">
              <EditCoursePage />
            </Route>
          </Switch>
        </Router>
      </RecoilRoot>
    </Theme>
  )
}

export default App
