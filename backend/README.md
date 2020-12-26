# OLLERT API

## ENDPOINTS

### Authentication

- Register
  <br>
  Method: `POST`
  Route: `/auth/register`
  <br>
- Login
  <br>
  Method: `POST`
  Route: `/auth/login`
  <br>

### User

- Index
  <br>
  Method: `GET`
  Route: `/users/:user_id`
  <br>
- Update
  <br>
  Method: `PUT`
  Route: `/users/:user_id`
  <br>
- Destroy
  <br>
  Method: `DELETE`
  Route: `/users/:user_id`
  <br>

### Projects

- Store
  <br>
  Method: `POST`
  Route: `/users/:user_id/projects`
  <br>
- Index All
  <br>
  Method: `GET`
  Route: `/users/:user_id/projects`
  <br>
- Index One
  <br>
  Method: `GET`
  Route: `/users/:user_id/projects/:project_id`
  <br>
- Update
  <br>
  Method: `PUT`
  Route: `/users/:user_id/projects/:project_id`
  <br>
- Destroy
  <br>
  Method: `DELETE`
  Route: `/users/:user_id/projects/:project_id`
  <br>

### Tasks

- Store
  <br>
  Method: `POST`
  Route: `/users/:user_id/projects/:project_id/tasks`
  <br>
- Index All
  <br>
  Method: `GET`
  Route: `/users/:user_id/projects/:project_id/tasks`
  <br>
- Index One
  <br>
  Method: `GET`
  Route: `/users/:user_id/projects/:project_id/tasks/:task_id`
  <br>
- Update
  <br>
  Method: `PUT`
  Route: `/users/:user_id/projects/:project_id/tasks/:task_id`
  <br>
- Destroy
  <br>
  Method: `DELETE`
  Route: `/users/:user_id/projects/:project_id/tasks/:task_id`
  <br>
