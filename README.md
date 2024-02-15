# User Service API

## Table of Contents
1. [Dev Enviroment Setup](#dev)
2. [API Endpoints](#endpoints)
3. [User Endpoints](#user)

## Dev enviroment setup <a name="dev"></a>

The project uses **Bun**, which has an experimental build for Windows support.
<br>However, it is recommended to use the WSL (Windows Subsystem for Linux) implementation for a smoother experience.
<br>https://bun.sh/docs/installation

### 1. Install WSL:
- Open PowerShell
- Run the following command to install Ubuntu (other distributions can be specified with the `-d` flag):
  ```powershell
  wsl --install
  ```

### 2. Install the Bun runtime

- Run the command:
   ```bash
   sudo apt install unzip && curl -fsSL https://bun.sh/install | bash
   ```
- Follow the instructions in the console


### 3. Clone the repository

- HTTPS:
  ```bash
  git clone https://github.com/cna-24/CNA-User-Service.git
  ```
- SSH:
  ```bash
  git clone git@github.com/cna-24/CNA-User-Service.git
  ```

### 5. Project setup
- Navigate into the root folder of the cloned repo
- Install Dependecies
  ```bash
  bun i
  ```
- Create .env file
  ```.env
  JWT_SECRET="YOUR_SECRET"
  ```
  
### 6. Initialize Database

- run the following commands
  ```bash
  bun run db-gen
  bun run db-migrate
  ```

### 7. Open in your favourite editor

- Visual Studio Code
  ```bash
  code .
  ```

## API Endpoints

### 1. Register <a name="endpoints"></a>

- **Endpoint:** `/register`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Body Parameters:**
  - `username`: String (required, min 4 characters)
  - `password`: String (required, min 8 characters)
 
- **Example Request:**
  ```json
  {
    "username": "johndoe",
    "password": "password123",
  }
  ```

### 2. Login 

- **Endpoint:** `/login`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Body Parameters:**
  - `username`: String
  - `password`: String

- **Example Request:**
  ```json
  {
    "username": "johndoe",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "user JWT"
  }
  ```

###  3. User <a name="user"></a>
#### 3.1 Get all users

  **NOTE! Only a admin can get all the users!**
- **Endpoint:** `/user`
- **Method:** `GET`
- **Headers:**
  - `Authorization`: Bearer TOKEN
  
- **Example Request:**
  ```text
  url:port/user
  ```
- **Response:**
  ```json
  {
    "users": [
        {
            "id": 1,
            "username": "user1"
        },
        {
            "id": 2,
            "username": "user2"
        },
        {
            "id": 3,
            "username": "user3"
        },  
    ]
  }
  ```

#### 2. Get user with id
  **NOTE! Only a admin or the owner can get user information!**
- **Endpoint:** `/user/:id`
- **Method:** `GET`
- **URL Parameter:**
  - `id`: number (Int)
- **Headers:** 
  - `Authorization`: Bearer TOKEN

- **Example Request:**
  ```text
  url:port/user/1
  ```
- **Response:**
  ```json
  {
    "id": 1,
    "username": "johndoe"
  }
  ```
#### 3. Delete user
  **NOTE! Admin can delete any user!**
  **Owner can delete own user!**
- **Endpoint:** `/user/:id`
- **Method:** `DELETE`
- **URL Parameter:**
  - `id`: number (Int)
- **Headers:** 
  - `Authorization`: Bearer TOKEN

- **Example Request:**
  ```text
  url:port/user/1
  ```
- **Response:**
  ```json
  {
    "message": "Deleted user user1 successfully",
    "id": 1,
    "username": "user1"
  }
  ```

