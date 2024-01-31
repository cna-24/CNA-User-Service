# User Service API

The project uses **Bun**, which has an experimental build for Windows support.
<br>However, it is recommended to use the WSL (Windows Subsystem for Linux) implementation for a smoother experience.
<br>https://bun.sh/docs/installation

## Dev enviroment setup

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
  git clone https://github.com/ErikMansen/CNA-User-API.git
  ```
- SSH:
  ```bash
  git clone git@github.com:ErikMansen/CNA-User-API.git
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
  
### 6. Open in your favourite editor

- Visual Studio Code
  ```bash
  code .
  ```

## API Endpoints

### 1. Register

- **Endpoint:** `/register`
- **Method:** `POST`
- **Content-Type** `application/json`
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

