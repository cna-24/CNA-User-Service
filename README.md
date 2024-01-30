<p>The project uses Bun, which has an experimental build for Windows support.<br> However, it is recommended to use the WSL (Windows Subsystem for Linux) implementation for a smoother experience.</p>
https://bun.sh/docs/installation

### 1. Install WSL:

<ul>
  <li>1. Open PowerShell</li>

  <li>2. Run the following command to install Ubuntu (other distributions can be specified with the -d flag):

```powershell
wsl --install
```

  </li>
</ul>

### 2. Install the Bun runtime

<ul>
  <li>1. Run the command:
    
   ```bash
   sudo apt install unzip && curl -fsSL https://bun.sh/install | bash
   ```
   </li>
   <li>2. Follow the instructions in the console</li>
</ul>

### 4. Clone the repository

<ul>
  <li> HTTPS:
    
  ```bash
  git clone https://github.com/ErikMansen/CNA-User-API.git
  ```
  
  </li>
  <li> SSH:
    
  ```bash
  git clone git@github.com:ErikMansen/CNA-User-API.git
  ```
  </li>
</ul>

### 5. Project setup

<ul>
  <li>1. Navigate into the root folder of the cloned repo</li>
  <li>2. Install Dependecies

```bash
bun i
```

  </li>
  <li>3. Create .env file

```.env
JWT_SECRET="YOUR_SECRET"
```

  </li>
</ul>

### 6. Open in your favourite editor

<ul>
  <li>Visual Studio Code</li>

```bash
code .
```

  <li>If promted to install something to open the project simply follow the instructions</li>
</ul>
