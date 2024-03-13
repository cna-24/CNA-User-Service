# User Service API

## Table of Contents

1. [Using the API](#host)
2. [How run the API](#host_self)
3. [Dev Enviroment Setup](#dev)
4. [API Endpoints](#endpoints)
    - [/register](#register)
    - [/login](#login)
    - [/user](#user)
5. [JWT](#JWT)

## Accessing the Hosted API <a name="host"></a>

**IMPORTANT:** Your CORS origin needs to be approved for the API to function correctly. 

- The API is available at: <a>https://cna-user-api.duckdns.org</a>

The server is configured to automatically check for updates in the Docker Hub repository. Whenever there's a push event to the main branch of this GitHub repository, a new container is automatically built and pushed to the Docker Hub repository, ensuring the API is always up to date.

### Documentation on the API
The usage of the API can be found later in this file, or you can use our swagger (openAPI) documentation
- Swagger in JSON format is available at: <a>https://cna-user-api.duckdns.org/swagger/doc</a>
- SwaggerUI is available at: <a>https://cna-user-api.duckdns.org/swagger/ui</a>


## How to run the API locally  <a name="host_self"></a>

You don't need to clone the entire project just the docker-compose.yaml file if you only want to use the API.

To run the API locally, first configure the `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` and `ADMIN_EMAIL` env variable in the docker-compose.yml file. If you wish to specify allowed CORS origins, set the `ALLOWED_ORIGINS` environment variable as well. After setting these variables, start the API by executing the following command:

```bash
docker-compose up -d
```

## Dev enviroment setup <a name="dev"></a>

The project uses **Bun**, which has an experimental build for Windows support.
<br>However, it is recommended to use the WSL (Windows Subsystem for Linux) implementation for a smoother experience.
<br>https://bun.sh/docs/installation

### 1. Install WSL:

-   Open PowerShellv
-   Run the following command to install Ubuntu (other distributions can be specified with the `-d` flag):
    ```powershell
    wsl --install
    ```

### 2. Install the Bun runtime

-   Run the command:
    ```bash
    sudo apt install unzip && curl -fsSL https://bun.sh/install | bash
    ```
-   Follow the instructions in the console

### 3. Clone the repository

-   HTTPS:
    ```bash
    git clone https://github.com/cna-24/CNA-User-Service.git
    ```
-   SSH:
    ```bash
    git clone git@github.com/cna-24/CNA-User-Service.git
    ```

### 5. Project setup

-   Navigate into the root folder of the cloned repo
-   Install Dependecies
    ```bash
    bun i
    ```
-   Create .env file
    ```.env
    JWT_SECRET="YOUR_SECRET"
    ```

### 6. Initialize Database

-   run the following commands
    ```bash
    bun run db-gen
    bun run db-migrate
    ```

### 7. Open in your favourite editor

-   Visual Studio Code
    ```bash
    code .
    ```

## API Endpoints <a name="endpoints"></a>

### 1. Register <a name="register"></a>

-   **Endpoint:** `/register`
-   **Method:** `POST`
-   **Content-Type:** `application/json`
-   **Body Parameters:**

    -   `username`: String (required, min 4 characters)
    -   `password`: String (required, min 8 characters)
    -   `email`: String

-   **Example Request:**
    ```json
    {
        "username": "johndoe",
        "password": "password123",
        "email": "blabla@gmail.com"
    }
    ```

### 2. Login <a name="login"></a>

-   **Endpoint:** `/login`
-   **Method:** `POST`
-   **Content-Type:** `application/json`
-   **Body Parameters:**

    -   `username`: String
    -   `password`: String

-   **Example Request:**
    ```json
    {
        "username": "johndoe",
        "password": "password123"
    }
    ```
-   **Response:**
    ```json
    {
        "message": "Login successful",
        "token": "user JWT"
    }
    ```

### 3. User <a name="user"></a>

#### 3.1 Get all users

**NOTE! Only a admin can get all the users!**

-   **Endpoint:** `/user`
-   **Method:** `GET`
-   **Headers:**
    -   `Authorization`: Bearer TOKEN
-   **Example Request:**
    ```text
    url:port/user
    ```
-   **Response:**
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
            }
        ]
    }
    ```

#### 3.2 Update/patch user

**NOTE! Only a admin or the owner can update information!**

-   **Endpoint:** `/user/:id`
-   **Method:** `Patch`
-   **URL Parameter:**
    -   `id`: number (Int)
-   **Headers:**

    -   `Authorization`: Bearer TOKEN
-   **Body Parameters:**

    -   `password`: String (required, min 8 characters)
    -   `email`: String
    -   `admin`: Boolean


-   **Example Request:**
    ```text
    url:port/user/1
    ```
    ```json
    {
        "email": "blabla@gmail.com",
        "password": "password",
        "admin": "False"
    }
    ```
    
-   **Response:**
    ```json
    {
       "message": "Updated Succesfully"
    }
    ```

#### 3.3 Get user with id 

**NOTE! Only a admin or the owner can get user information!**

-   **Endpoint:** `/user/:id`
-   **Method:** `GET`
-   **URL Parameter:**
    -   `id`: number (Int)
-   **Headers:**

    -   `Authorization`: Bearer TOKEN

-   **Example Request:**
    ```text
    url:port/user/1
    ```
-   **Response:**
    ```json
    {
        "id": 1,
        "username": "johndoe"
    }
    ```


#### 3.4 Delete user

**NOTE! Admin can delete any user!**
**Owner can delete own user!**

-   **Endpoint:** `/user/:id`
-   **Method:** `DELETE`
-   **URL Parameter:**
    -   `id`: number (Int)
-   **Headers:**

    -   `Authorization`: Bearer TOKEN

-   **Example Request:**
    ```text
    url:port/user/1
    ```
-   **Response:**
    ```json
    {
        "message": "Deleted user user1 successfully",
        "id": 1,
        "username": "user1"
    }
    ```

## 4. JWT <a name="JWT"></a>
**The returned JWT contains the following information**
- **user id:** `Int`
- **username:** `String`
- **email:** `String`
- **admin:** `Boolean`

    -   **Example information from a JWT:**
        ```json
        {
          "id": 1,
          "username": "johndoe",
          "email": "blabla@gmail.com",
          "admin": false
        }
         ```