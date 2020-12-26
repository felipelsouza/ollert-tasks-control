# OLLERT API

## ENDPOINTS

### Authentication

- Register
  Method: `POST`
  Route: `/auth/register`
  <br>
- Login
  Method: `POST`
  Route: `/auth/login`
  <br>

### User

- Index
  Method: `GET`
  Route: `/users/:user_id`
  <br>
- Update
  Method: `PUT`
  Route: `/users/:user_id`
  <br>
- Destroy
  Method: `DELETE`
  Route: `/users/:user_id`
  <br>

### Projects

- Store
  Method: `POST`
  Route: `/users/:user_id/projects`
  <br>
- Index All
  Method: `GET`
  Route: `/users/:user_id/projects`
  <br>
- Index One
  Method: `GET`
  Route: `/users/:user_id/projects/:project_id`
  <br>
- Update
  Method: `PUT`
  Route: `/users/:user_id/projects/:project_id`
  <br>
- Destroy
  Method: `DELETE`
  Route: `/users/:user_id/projects/:project_id`
  <br>

### Tasks

- Store
  Method: `POST`
  Route: `/users/:user_id/projects/:project_id/tasks`
  <br>
- Index All
  Method: `GET`
  Route: `/users/:user_id/projects/:project_id/tasks`
  <br>
- Index One
  Method: `GET`
  Route: `/users/:user_id/projects/:project_id/tasks/:task_id`
  <br>
- Update
  Method: `PUT`
  Route: `/users/:user_id/projects/:project_id/tasks/:task_id`
  <br>
- Destroy
  Method: `DELETE`
  Route: `/users/:user_id/projects/:project_id/tasks/:task_id`
  <br>
