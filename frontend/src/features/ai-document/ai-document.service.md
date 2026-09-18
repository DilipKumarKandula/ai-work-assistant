For this `ai-document.service.ts`:

### 1. `processDocument(file, signal)`

```ts
processDocument(selectedFile, controller.signal);
```

**Purpose:** Starts the document upload operation.

**Receives:**

```text
file   → selected File object
signal → AbortController signal
```

**Next:**

```text
File
 ↓
FormData
```

---

### 2. `new FormData()`

```ts
const formData = new FormData();
```

**Purpose:** Creates a container for sending the file through HTTP.

**Data:**

```text
Empty FormData
```

**Next:**

```text
FormData
 ↓
append file
```

---

### 3. `formData.append()`

```ts
formData.append("file", file);
```

**Purpose:** Adds the selected file to the FormData.

**Data:**

```text
file = Dilip-resume.pdf
```

**Result:**

```text
FormData
└── file → Dilip-resume.pdf
```

**Next:**

```text
FormData
 ↓
fetch()
```

---

### 4. `fetch()`

```ts
fetch(`${API_BASE_URL}/api/documents`, {
  method: "POST",
  body: formData,
  signal,
});
```

**Purpose:** Sends the FormData/file to the backend.

**Sends:**

```text
POST /api/documents

Body:
multipart/form-data
└── file → Dilip-resume.pdf
```

**Next:**

```text
Frontend
 ↓
Backend
```

---

### 5. `await fetch()`

```ts
const response = await fetch(...);
```

**Purpose:** Waits for the backend HTTP response.

**Data received:**

```text
HTTP Response
```

**Next:**

```text
response
 ↓
response.json()
```

---

### 6. `response.json()`

```ts
const data = await response.json();
```

**Purpose:** Reads the JSON response body and converts it into a JavaScript object.

**Backend response:**

```json
{
  "success": true,
  "document": {
    "name": "Dilip-resume.pdf",
    "type": "application/octet-stream",
    "size": 172189,
    "sizeInKB": "168.15",
    "pageCount": 2
  },
  "text": "Kandula Dilip Kumar..."
}
```

**Result:**

```text
data
├── success
├── document
└── text
```

---

### 7. `response.ok`

```ts
if (!response.ok)
```

**Purpose:** Checks whether the HTTP request succeeded.

```text
response.ok
     ↓
 ┌───┴────┐
true     false
 ↓         ↓
continue  throw error
```

---

### 8. `throw new Error()`

```ts
throw new Error(data.message || "Failed to process document");
```

**Purpose:** If backend returned an error, pass that error back to `page.tsx`.

```text
Backend error
 ↓
data.message
 ↓
throw Error
 ↓
page.tsx catch
```

---

### 9. `return data`

```ts
return data;
```

**Purpose:** Send the successful backend result back to the page.

```text
service
   ↓
return data
   ↓
page.tsx
   ↓
setResult(response)
   ↓
UI
```

---

## The commands you need to remember from this file

```text
new FormData()
→ creates file-upload container

formData.append("file", file)
→ puts the file into the container

fetch(..., body: formData)
→ sends the file to backend

await fetch()
→ waits for backend response

response.json()
→ converts response body into JS data

response.ok
→ checks HTTP success/failure

throw new Error()
→ sends failure to page's catch

return data
→ sends successful result back to page
```

And the **data movement** is:

```text
File
 ↓
FormData
 ↓
fetch()
 ↓
HTTP request
 ↓
Backend
 ↓
HTTP response
 ↓
response.json()
 ↓
data
 ↓
return data
 ↓
page.tsx
```
