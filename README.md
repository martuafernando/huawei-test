# huawei-test

## Requirements

- Frontend:
  - NodeJs v20.17.0
  - NPM 10.8.2
- Backend: NodeJs v20.17.0
  - NodeJs v20.17.0
  - NPM 10.8.2
- Automation
  - Python3 3.10.12
  - bash

## Getting Started

### Backend

To run backend application, you can follow these steps:

1. Clone the repository

```bash
git clone https://github.com/martuafernando/huawei-test.git
cd huawei-test
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

1. Run the server

```bash
npm run start-backend
```

### Frontend

To run frontend application, you can follow these steps:

1. Clone the repository (skip if you have cloned it before)

```bash
git clone https://github.com/martuafernando/huawei-test.git
cd huawei-test
```

2. Install dependencies (skip if you have intalled it before)

```bash
npm install
```

3. Build the app

```bash
npm run build-frontend
```

4. Start the app

```bash
npm run start-frontend
```

### Automation Script

To set up the automation for data collection (via cron job), follow these steps:

1. Clone the repository (skip if you have cloned it before)

```bash
git clone https://github.com/martuafernando/huawei-test.git
cd huawei-test
```

2. Install dependencies

```bash
pip install -r requirements.txt
```

3. Create target directory and change the permission

```bash
  sudo mkdir -p /home/cron
  sudo chmod 777 /home/cron
```

4. Add cron script via cron.sh

```bash
  bash ./automation/cron.sh
```

## Endpoints

### 1. **Get All Non Archived Notes**
Retrieve all notes.

#### **Request**
- **URL:** `/v1/notes`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Body:** None

#### **Response**
```json
{
  "status": "success",
  "message": "Note retrieved",
  "data": [
    {
      "id": 0,
      "title": "Catatan Baru",
      "body": "Tulisan Catatan Baru",
      "owner": 0,
      "archived": false,
      "createdAt": "2024-12-26T04:19:57.161Z"
    },
  ]
}
```

### 2. **Get All Archived Notes**
Retrieve all notes.

#### **Request**
- **URL:** `/v1/notes/archived`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Body:** None

#### **Response**
```json
{
  "status": "success",
  "message": "Note retrieved",
  "data": [
    {
      "id": 0,
      "title": "Catatan Baru",
      "body": "Tulisan Catatan Baru",
      "owner": 0,
      "archived": true,
      "createdAt": "2024-12-26T04:19:57.161Z"
    },
  ]
}
```

### 3. **Get Note by ID**
Retrieve a specific note by its ID.

#### **Request**
- **URL:** `/v1/notes/{id}`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Body:** None

#### **Response**
```json
{
  "status": "success",
  "message": "Note retrieved",
  "data": {
    "id": 0,
    "title": "Catatan Baru",
    "body": "Tulisan Catatan Baru",
    "owner": 0,
    "archived": false,
    "createdAt": "2024-12-26T04:19:57.161Z"
  }
}
```

#### **Error Response**
If the note with the given ID does not exist:
```json
{
  "status": "fail",
  "message": "Note not found"
}
```


### 4. **Create a Note**
Add a new note.

#### **Request**
- **URL:** `/v1/notes`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <accessToken>`
- **Body:** 
```json
{
  "title": "Hello, Notes!",
  "body": "My new notes.",
}
```

#### **Response**
```json
{
  "status": "success",
  "message": "Note Created",
  "data": {
    "id": 2,
    "title": "Hello, Notes!",
    "body": "My new notes.",
    "owner": 0,
    "archived": false,
    "createdAt": "2024-12-26T04:57:34.269Z"
  }
}
```

#### **Error Response**
If the required fields are missing:
```json
{
  "status": "fail",
  "message": "title and body must exists"
}
```

### 5. **Delete a Note**
Delete an existing note by its ID.

#### **Request**
- **URL:** `/v1/notes/{id}`
- **Method:** `DELETE`
- **Headers:** None
- **Body:** None

#### **Response**
```json
{
  "status": "success",
  "message": "Note deleted",
  "data": {
    "id": 0,
    "title": "Catatan Baru",
    "body": "Tulisan Catatan Baru",
    "owner": 0,
    "archived": false,
    "createdAt": "2024-12-26T04:19:57.161Z"
  }
}
```

### 6. **Archive a Note**
Archive an existing note by its ID.

#### **Request**
- **URL:** `/v1/notes/{id}/archive`
- **Method:** `POST`
- **Headers:** None
- **Body:** None

#### **Response**
```json
{
  "status": "success",
  "message": "Note archived",
  "data": {
    "id": 0,
    "title": "Catatan Baru",
    "body": "Tulisan Catatan Baru",
    "owner": 0,
    "archived": true,
    "createdAt": "2024-12-26T04:19:57.161Z"
  }
}
```

### 7. **Unarchive a Note**
Unarchive an existing note by its ID.

#### **Request**
- **URL:** `/v1/notes/{id}/unarchive`
- **Method:** `POST`
- **Headers:** None
- **Body:** None

#### **Response**
```json
{
  "status": "success",
  "message": "Note unarchived",
  "data": {
    "id": 0,
    "title": "Catatan Baru",
    "body": "Tulisan Catatan Baru",
    "owner": 0,
    "archived": true,
    "createdAt": "2024-12-26T04:19:57.161Z"
  }
}
```

#### **Error Response**
If the note with the given ID does not exist:
```json
{
  "status": "fail",
  "message": "Note not found"
}
```

### 8. **Register a User**
Add a new user.

#### **Request**
- **URL:** `/v1/users/register`
- **Method:** `POST`
- **Headers:** None
- **Body:** 
```json
{
  "name": "testing",
  "email": "testing@gmail.com",
  "password": "testing"
}
```

#### **Response**
```json
{
  "status": "success",
  "message": "User Created"
}
```

#### **Error Response**
If the required fields are missing:
```json
{
    "status": "fail",
    "message": "User has been Created"
}
```

### 9. **Login**
Add a new user.

#### **Request**
- **URL:** `/v1/users/login`
- **Method:** `POST`
- **Headers:** None
- **Body:** 
```json
{
  "email": "testing@gmail.com",
  "password": "testing"
}
```

#### **Response**
```json
{
  "status": "success",
  "message": "User logged successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNzM1MTg5MDQ3LCJleHAiOjE3MzUxOTA4NDd9.evCLSRwamixHqFfiY4D3N-llUqZUwoOmzZMic9nu9-c"
  }
}
```

#### **Error Response**
If the required fields are missing:
```json
{
    "status": "fail",
    "message": "Email / password incorrect"
}
```

If the user is not registered:
```json
{
  "status": "fail",
  "message": "User has not registered"
}
```

## Common Error Response
For invalid methods or routes:
```json
{
  "status": "error",
  "message": "not found"
}