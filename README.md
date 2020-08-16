# Universal Data Tool Courseware

Dataset annotators often need extensive instructions to understand how to label
or annotate a dataset. Universal Data Tool Courseware allows you to quickly create
training for annotators with dataset-specific instructions and exercises. You can
use it online at [courses.universaldatatool.com](https://courses.universaldatatool.com).

> The [Universal Data Tool](https://github.com/UniversalDataTool/universal-data-tool) (UDT) is an
> open-source web or downloadable tool for labeling data for usage in machine
> learning or data processing systems.

## Getting Started with Development

Before you get started with development, you might want to take a quick glance
at the [\*.udt.json format](https://github.com/UniversalDataTool/udt-format) and
the [training proposal](https://github.com/UniversalDataTool/udt-format/blob/master/proposals/training.md), the latter is the main data structure used for representing courses.

This is a [Create React App](https://github.com/facebook/create-react-app)-based
project that runs on [Vercel](https://vercel.com). To run it locally, run the
following commands:

```bash
# Make sure you have vercel installed
# npm install -g vercel

# If you don't have postgres running
# docker run -d --net host -e POSTGRES_HOST_AUTH_METHOD=trust postgres:12

yarn install
vc dev
```

### Pages

| Page URL                                   | Description                                  |
| ------------------------------------------ | -------------------------------------------- |
| `/`                                        | Landing Page                                 |
| `/create`                                  | Create Course / Upload UDT File              |
| `/course/[course_id]`                      | Take a course                                |
| `/course/[course_id]/edit?editKey=XXX`     | Edit a course                                |
| `/course/[course_id]/students?editKey=XXX` | View students that have completed the course |

### Endpoints

The following endpoints are used for accessing data.

| Endpoint                               | Description                                     | Parameters                             |
| -------------------------------------- | ----------------------------------------------- | -------------------------------------- |
| `GET /api/course/[course_id]`          | Get JSON for a course                           |                                        |
| `PUT /api/course/[course_id]`          | Update course                                   | `{ dataset }` `Authorization: editKey` |
| `POST /api/course`                     | Create new course                               | `{ dataset }`                          |
| `POST /api/course/[course_id]/submit`  | Finish the course (submit results)              | `{ contact_info }`                     |
| `GET /api/course/[course_id]/students` | Get the students that have completed the course | `Authorization: editKey`               |

### Environment Variables

No environment variables are required for running the app in development mode if
you're using the default postgres configuration.

| Var Name          | Description       |
| ----------------- | ----------------- |
| POSTGRES_HOST     | Postgres Host     |
| POSTGRES_PASS     | Postgres Password |
| POSTGRES_DATABASE | Postgres Database |
| POSTGRES_USER     | Postgres User     |
