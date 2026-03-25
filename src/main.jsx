import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

4. **Commit changes**

**👉 Fichier 6/8 — `api/chat.js`**

1. **"Add file" → "Create new file"**
2. Nom : `api/chat.js` (tape `api/` puis `chat.js`)
3. Copie-colle le contenu du **FICHIER-2** que je t'ai donné
4. **Commit changes**

**👉 Fichier 7/8 — `src/App.jsx`**

1. **"Add file" → "Create new file"**
2. Nom : `src/App.jsx`
3. Copie-colle le contenu du **FICHIER-3** que je t'ai donné (le plus gros fichier)
4. **Commit changes**

**👉 Fichier 8/8 — `.gitignore`**

1. **"Add file" → "Create new file"**
2. Nom : `.gitignore`
3. Copie-colle :
```
node_modules
dist
.env
.env.local
