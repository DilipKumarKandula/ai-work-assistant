# Upload flow — operation by operation

We'll use your actual file:

```text
Dilip-resume.pdf
```

## 1. Browser creates a `File`

Your code:

```ts
const file = event.target.files?.[0];
```

### Operation

`event.target.files` is a `FileList`.

```text
event.target.files
        ↓
FileList
        ↓
[0]
        ↓
File
```

So:

```ts
file;
```

now points to:

```text
Dilip-resume.pdf
```

The important properties are:

```ts
file.name;
file.size;
file.type;
```

At this point:

```text
FILE DATA
   │
   ▼
File object
```

**No upload has happened yet.**

---

# 2. `setSelectedFile(file)`

```ts
setSelectedFile(file);
```

### Operation

React stores the `File` object in state.

```text
File object
     ↓
selectedFile
```

Still no network request.

---

# 3. `FormData()`

This is one of the important new commands:

```ts
const formData = new FormData();
```

### Operation

Creates an empty multipart form container.

Initially:

```text
formData
└── empty
```

Nothing has been added yet.

---

# 4. `formData.append()`

```ts
formData.append("file", selectedFile);
```

This is the **actual operation that puts the file into the upload payload**.

Before:

```text
FormData
└── empty
```

After:

```text
FormData
└── file
     └── Dilip-resume.pdf
```

The first argument:

```ts
"file";
```

is the **field name**.

The second:

```ts
selectedFile;
```

is the actual File object.

So:

```ts
append("file", selectedFile);
```

means:

> Add this file to the multipart form under the field name `file`.

---

# 5. `fetch()` with FormData

```ts
fetch(url, {
  method: "POST",
  body: formData,
});
```

The important new part is:

```ts
body: formData;
```

The browser takes the FormData and creates the HTTP multipart body.

So the data changes from:

```text
FormData object
```

to:

```text
HTTP request body
```

Conceptually:

```text
FormData
   ↓
browser serializes it
   ↓
multipart/form-data
   ↓
network
```

You don't manually convert the file into bytes here.

The browser handles the transmission.

---

# 6. Backend receives multipart data

Now Express receives:

```text
HTTP request
```

But the request body isn't JSON.

It's:

```text
multipart/form-data
```

This is why our normal:

```ts
express.json();
```

isn't enough to give us the uploaded file.

---

# 7. `upload.single("file")`

This is the **main upload-specific middleware command**.

```ts
upload.single("file");
```

Think of it as:

> Find one uploaded file whose multipart field name is `"file"` and process it.

The `"file"` comes from:

```ts
formData.append("file", selectedFile);
```

So they connect:

```text
Frontend
────────────────────────

append("file", file)
          │
          │
          ▼
      HTTP request
          │
          │
          ▼
Backend
────────────────────────

upload.single("file")
```

---

# 8. What does `single()` actually do?

`single()` tells Multer:

```text
I expect ONE file
under the field "file".
```

It then reads the multipart stream.

Conceptually:

```text
multipart request
        │
        ▼
      Multer
        │
        ├── field name
        ├── filename
        ├── MIME type
        ├── file size
        └── file contents
```

Then it creates:

```ts
req.file;
```

---

# 9. `memoryStorage()`

We configured:

```ts
multer.memoryStorage();
```

This controls **where Multer puts the uploaded file contents**.

With memory storage:

```text
multipart request
       ↓
Multer
       ↓
memory
       ↓
req.file.buffer
```

The important operation is:

```text
file contents
      ↓
Buffer
```

It does **not** create:

```text
uploads/Dilip-resume.pdf
```

on your disk.

That's because we chose memory storage.

---

# 10. `req.file.buffer`

Now we reach another new operation.

```ts
file.buffer;
```

This is the actual binary contents of the uploaded PDF.

Think:

```text
Dilip-resume.pdf
       ↓
raw binary bytes
       ↓
Buffer
```

So:

```ts
req.file.buffer;
```

is what we eventually give to the PDF parser.

---

# 11. `fileFilter`

We also have:

```ts
fileFilter: (_req, file, callback) => {
```

This operation happens **while Multer is receiving the file**.

It gives us:

```ts
file.mimetype;
file.originalname;
```

Then we make a decision.

For example:

```ts
if (!allowedTypes.includes(file.mimetype)) {
    return callback(new Error(...));
}
```

The flow is:

```text
Incoming file
      ↓
Multer
      ↓
fileFilter
      ↓
       ┌───────────────┐
       │ Allowed?      │
       └──────┬────────┘
          YES │ NO
              │
        ▼     │     ▼
      accept  │   reject
        │
        ▼
     req.file
```

This is specifically **upload validation**.

---

# 12. `limits.fileSize`

We configured:

```ts
limits: {
  fileSize: 10 * 1024 * 1024,
}
```

The operation is:

```text
Incoming file
      ↓
Multer counts bytes
      ↓
Is size <= 10 MB?
      ↓
 YES        NO
  ↓          ↓
continue    reject
```

So this is another upload-specific operation you haven't worked with before.

---

# 13. `path.extname()`

In our service we added:

```ts
const extension = path.extname(file.originalname).toLowerCase();
```

This is not reading the file contents.

It reads the **filename**.

For:

```text
Dilip-resume.pdf
```

we get:

```text
.pdf
```

So:

```ts
path.extname("Dilip-resume.pdf");
```

returns:

```text
".pdf"
```

We use that to help determine what kind of document we're processing.

---

# 14. `PDFParse`

Now we reach the actual document operation.

```ts
const parser = new PDFParse({
  data: file.buffer,
});
```

The important part:

```ts
data: file.buffer;
```

means:

> Give the PDF parser the raw bytes of this uploaded PDF.

So:

```text
req.file.buffer
       ↓
PDFParse
```

---

# 15. `parser.getText()`

This is the **actual extraction command**:

```ts
const pdfData = await parser.getText();
```

This is completely different from Multer.

Multer's job:

```text
HTTP upload
    ↓
file
```

PDFParse's job:

```text
PDF binary data
       ↓
understand PDF structure
       ↓
extract text
```

So:

```ts
await parser.getText();
```

is the command that actually reads the PDF content.

---

# 16. `pdfData.text`

After:

```ts
const pdfData = await parser.getText();
```

we get a result object.

We then access:

```ts
pdfData.text;
```

That gives:

```text
"Kandula Dilip Kumar
+91 9182967315
..."
```

So:

```text
PDF Buffer
   ↓
getText()
   ↓
pdfData
   ↓
pdfData.text
```

---

# 17. `Buffer.toString()` for TXT

For TXT we don't need PDFParse.

We have:

```ts
file.buffer.toString("utf-8");
```

Operation:

```text
TXT Buffer
    ↓
decode bytes using UTF-8
    ↓
JavaScript string
```

So:

```text
PDF
 ↓
PDFParse
 ↓
text

TXT
 ↓
Buffer.toString("utf-8")
 ↓
text
```

---

# 18. `trim()`

We use:

```ts
pdfData.text.trim();
```

This is just cleaning the resulting string.

Example:

```text
"   Hello world   "
```

becomes:

```text
"Hello world"
```

It doesn't perform document extraction.

---

# 19. `parser.destroy()`

We use:

```ts
await parser.destroy();
```

This is cleanup.

We created a parser:

```ts
const parser = new PDFParse(...)
```

After we're finished:

```ts
await parser.destroy();
```

releases resources associated with the parser.

So:

```text
create parser
      ↓
get text
      ↓
destroy parser
```

---

# 20. `processDocument(req.file)`

Controller:

```ts
const result = await processDocument(req.file);
```

This is simply passing the file object from the HTTP layer to the document-processing layer.

```text
req.file
   ↓
processDocument()
```

Inside the service:

```text
req.file
   ↓
buffer
   ↓
identify type
   ↓
parse
   ↓
extract
```

---

# The complete operation map

This is probably the diagram you were looking for:

```text
USER SELECTS PDF
       │
       ▼
event.target.files[0]
       │
       │ operation:
       │ get selected File object
       ▼
File
       │
       ▼
setSelectedFile(file)
       │
       │ operation:
       │ store File in React state
       ▼
selectedFile
       │
       │ user clicks Process
       ▼
new FormData()
       │
       │ operation:
       │ create multipart container
       ▼
formData.append("file", selectedFile)
       │
       │ operation:
       │ add File to upload payload
       ▼
fetch(..., { body: formData })
       │
       │ operation:
       │ send multipart HTTP request
       ▼
Express
       │
       ▼
upload.single("file")
       │
       │ operation:
       │ parse multipart upload
       ▼
fileFilter
       │
       │ operation:
       │ accept/reject uploaded file
       ▼
memoryStorage()
       │
       │ operation:
       │ keep file contents in memory
       ▼
req.file
       │
       ▼
req.file.buffer
       │
       │ operation:
       │ access raw binary contents
       ▼
processDocument()
       │
       ▼
path.extname()
       │
       │ operation:
       │ determine extension
       ▼
.pdf ?
       │
       ▼
new PDFParse({ data: buffer })
       │
       │ operation:
       │ give PDF bytes to parser
       ▼
parser.getText()
       │
       │ operation:
       │ READ PDF + EXTRACT TEXT
       ▼
pdfData.text
       │
       ▼
return {
   document: metadata,
   text: extractedText
}
       │
       ▼
Controller
       │
       ▼
res.json(...)
       │
       ▼
Frontend
       │
       ▼
Display extracted text
```

## The key new commands you actually need to learn

You already know the rest of the Express architecture. For **file uploads**, concentrate on these:

| Command/API                | What operation does it perform?          |
| -------------------------- | ---------------------------------------- |
| `event.target.files[0]`    | Gets selected file from browser          |
| `new FormData()`           | Creates multipart form container         |
| `formData.append()`        | Adds file to upload payload              |
| `body: formData`           | Sends multipart data through `fetch`     |
| `multer()`                 | Creates upload middleware                |
| `upload.single("file")`    | Receives one file from multipart request |
| `memoryStorage()`          | Keeps uploaded bytes in memory           |
| `file.buffer`              | Gives raw binary file contents           |
| `fileFilter`               | Accept/reject upload                     |
| `limits.fileSize`          | Restrict upload size                     |
| `path.extname()`           | Gets file extension from filename        |
| `new PDFParse({data})`     | Creates parser for PDF bytes             |
| `parser.getText()`         | **Extracts text from PDF**               |
| `buffer.toString("utf-8")` | Converts TXT bytes into text             |
| `parser.destroy()`         | Cleans up parser resources               |

**That's the part you should practice.** You don't need to relearn route → middleware → controller → service. Your gap is specifically **what happens to a file and what operations are performed on it at each stage**.
