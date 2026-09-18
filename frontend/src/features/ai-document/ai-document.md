# 1. What happens when you select a file?

Your HTML has:

```tsx
<input type="file" />
```

When you click it, the **browser's file picker** opens.

You select:

```text
company-policy.pdf
```

The browser gives your JavaScript a `File` object.

Conceptually:

```text
Computer
   │
   │ user selects PDF
   ▼
Browser
   │
   ▼
File object
```

The browser does **not automatically upload it**.

That's important.

Selecting a file and uploading a file are two different things.

---

# 2. What is a `File` object?

When you do:

```tsx
const file = event.target.files?.[0];
```

`file` is a browser `File` object.

It contains information such as:

```text
file.name
file.size
file.type
file.lastModified
```

For example:

```text
name:
company-policy.pdf

size:
245760 bytes

type:
application/pdf
```

It also contains the actual file data.

So when we write:

```tsx
const [selectedFile, setSelectedFile] = useState<File | null>(null);
```

we are keeping that selected file available in our React component.

---

# 3. Is the actual PDF stored in React state?

This is a subtle but important point.

When you do:

```tsx
setSelectedFile(file);
```

you're not converting the PDF into a JavaScript string.

You're keeping a reference to the browser's `File` object.

Think:

```text
React state
   │
   ▼
File object
   │
   ├── name
   ├── size
   ├── type
   └── file data
```

The browser manages the underlying file data.

You don't need to do:

```text
PDF → Base64 → state
```

for a normal upload.

---

# 4. How do we validate it?

Before uploading, we can inspect the `File` object.

For example:

```tsx
file.type;
```

gives:

```text
application/pdf
```

Then:

```tsx
file.size;
```

might give:

```text
245760
```

That's **bytes**.

So we can check:

```text
Is type allowed?
Is size allowed?
```

For our project:

```text
Allowed:
application/pdf
text/plain

Maximum:
10 MB
```

This happens entirely in the frontend.

But remember:

**Frontend validation is for user experience.**

We will validate again on the backend.

---

# 5. How do we actually send the file?

This is the biggest new concept.

With Task 1 we did something like:

```text
JavaScript object
       ↓
JSON.stringify()
       ↓
fetch()
```

For a file, we use:

```text
File
 ↓
FormData
 ↓
fetch()
```

Example:

```tsx
const formData = new FormData();

formData.append("file", selectedFile);
```

Now `formData` contains:

```text
file
 └── company-policy.pdf
```

---

# 6. What is FormData?

Think of `FormData` as a **package/container for form fields that will be sent through HTTP**.

It can contain:

```text
text fields
+
files
```

For example:

```tsx
const formData = new FormData();

formData.append("file", selectedFile);
formData.append("title", "Company Policy");
```

Now the request contains:

```text
file  → company-policy.pdf
title → Company Policy
```

For our first version, we only need:

```tsx
formData.append("file", selectedFile);
```

---

# 7. What does the HTTP request look like?

With Task 1, you had:

```http
POST /api/ai-text
Content-Type: application/json
```

and:

```json
{
  "text": "Hello",
  "operation": "summarize"
}
```

For files, the browser sends:

```http
POST /api/documents
Content-Type: multipart/form-data; boundary=...
```

The body contains the file.

You don't manually create this multipart body.

When you do:

```tsx
fetch(url, {
  method: "POST",
  body: formData,
});
```

the browser handles the multipart formatting.

---

# 8. Why don't we set `Content-Type` ourselves?

This is important.

Don't do:

```tsx
headers: {
  "Content-Type": "multipart/form-data",
}
```

When using `FormData`, the browser needs to add a **boundary**.

Conceptually:

```text
multipart/form-data
       +
boundary
       +
file data
```

The browser creates the correct header automatically.

So we simply do:

```tsx
fetch(url, {
  method: "POST",
  body: formData,
});
```

---

# 9. What does our frontend flow look like?

Now you can understand exactly what your `page.tsx` is doing.

```text
<input type="file">
        │
        ▼
onChange
        │
        ▼
File object
        │
        ├── file.name
        ├── file.type
        └── file.size
        │
        ▼
Frontend validation
        │
        ▼
React state
        │
        ▼
User clicks Process
        │
        ▼
FormData
        │
        ▼
formData.append("file", file)
        │
        ▼
fetch()
        │
        ▼
multipart/form-data
        │
        ▼
Backend
```

---

# 10. What happens to the file before the backend receives it?

This is worth understanding.

Suppose you select:

```text
resume.pdf
```

At selection:

```text
resume.pdf
     ↓
Browser
     ↓
File object
```

At upload:

```text
File object
     ↓
FormData
     ↓
HTTP request
     ↓
Internet/network
     ↓
Backend
```

So the file travels from the browser to the backend as part of the HTTP request.

---

# 11. Where is the file physically during this process?

For our current application:

```text
Your computer
     ↓
Browser
     ↓
File object
     ↓
HTTP request
     ↓
Backend memory/temp storage
```

It is **not automatically uploaded to your database**.

It is **not automatically uploaded to S3**.

It is **not automatically saved permanently**.

Those are separate things that we would implement ourselves.

---

# 12. What will the backend receive?

This is where our next lesson begins.

Normal JSON:

```text
req.body
```

File upload:

```text
req.file
```

But Express doesn't automatically give us `req.file`.

That's why we'll use **Multer**.

The eventual flow is:

```text
Browser
   ↓
FormData
   ↓
multipart/form-data
   ↓
Multer
   ↓
req.file
   ↓
Controller
```

Multer takes the multipart request and gives your Express application an easy-to-use file object.

---

# 13. Why do we have validation on both sides?

Imagine someone doesn't use your React UI.

They could manually send:

```text
POST /api/documents
```

with:

```text
malicious-file.exe
```

Your frontend validation never ran.

Therefore:

```text
Frontend
   ↓
Validation
   ↓
Good UX

Backend
   ↓
Validation
   ↓
Actual security/control
```

Both are necessary.

---

# 14. One more thing: File vs FileReader

You might see another browser API called:

```text
FileReader
```

Don't confuse it with uploading.

`File`:

> Represents the selected file.

`FileReader`:

> Reads the contents of the file inside the browser.

For our PDF upload, we **don't need FileReader**.

We're doing:

```text
File
 ↓
FormData
 ↓
Backend
```

The backend will read/extract the PDF.

If we wanted to preview a text file directly in the browser, then `FileReader` could be useful.

---

# 15. So your frontend code now makes sense

This:

```tsx
const file = event.target.files?.[0];
```

means:

> Give me the file the user selected.

This:

```tsx
setSelectedFile(file);
```

means:

> Keep that File object in React state.

This:

```tsx
const formData = new FormData();
```

means:

> Create a multipart form container.

This:

```tsx
formData.append("file", selectedFile);
```

means:

> Put the selected file into that container under the field name `file`.

And:

```tsx
fetch(url, {
  method: "POST",
  body: formData,
});
```

means:

> Send the file to my backend as a multipart HTTP request.

That's the complete frontend file-upload concept.

---
