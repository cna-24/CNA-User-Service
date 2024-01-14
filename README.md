```
bun install
bun run dev
```

```
open http://localhost:3000
```

To test login functionality: 
curl -X POST http://localhost:3000/users/login -H "Content-Type: application/json" -d '{"username": "admin", "password": "password"}'