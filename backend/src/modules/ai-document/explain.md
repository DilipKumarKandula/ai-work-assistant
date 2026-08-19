> **How does Express receive that file?**

---

# 1. What happens when the request reaches Express?

Our frontend sends:

```text
POST /api/documents
Content-Type: multipart/form-data
        ↓
        ↓
      Express
```

But Express's normal JSON parser:

```ts
app.use(express.json());
```

is designed for JSON requests.

It doesn't automatically turn a multipart upload into:

```ts
req.file;
```

That's why we need a multipart parser.

We're going to use **Multer**.

---

# 2. What is Multer?

Multer is middleware that understands:

```text
multipart/form-data
```

Its job is basically:

```text
HTTP multipart request
        ↓
      Multer
        ↓
extract uploaded file
        ↓
req.file
```

So instead of manually decoding the multipart request, Multer does it for us.

---

# 3. How does our backend flow change?

Before Task 3, your architecture was approximately:

```text
POST request
     ↓
Route
     ↓
Controller
     ↓
Service
```

For a document upload:

```text
POST /api/documents
        ↓
      Route
        ↓
      Multer
        ↓
    req.file
        ↓
   Controller
        ↓
     Service
        ↓
  Text extraction
```

Multer sits **between the route and controller**.

---

# 4. Why does Multer know which field is the file?

Remember our frontend:

```ts
formData.append("file", selectedFile);
```

We named the field:

```text
file
```

On the backend we'll say:

```ts
upload.single("file");
```

The `"file"` must match.

Think:

```text
FRONTEND                         BACKEND

"file"       ────────────────►   "file"
```

If frontend sends:

```ts
formData.append("document", selectedFile);
```

but backend expects:

```ts
upload.single("file");
```

they don't match.

So the backend won't find the file where we're expecting it.

---

# 5. What does `single()` mean?

This:

```ts
upload.single("file");
```

means:

> This request is expected to contain **one uploaded file** under the field name `file`.

For example:

```text
FormData
├── file → company-policy.pdf
```

If we wanted multiple files, Multer provides other methods such as:

```text
upload.array(...)
```

But we don't need that now.

We're starting with:

**one document per request.**

---

# 6. Where does the uploaded file go?

This is where an important decision comes in.

Multer can store the uploaded file temporarily in different ways.

For our learning project, we'll use:

```ts
multer.memoryStorage();
```

That means:

```text
Browser
   ↓
PDF
   ↓
HTTP request
   ↓
Multer
   ↓
Memory buffer
   ↓
req.file
```

The file is available as a `Buffer`.

---

# 7. What is a Buffer?

This is another new Node.js concept.

A PDF is binary data.

Computers ultimately represent that data as bytes.

Node.js uses a `Buffer` to work with raw binary data.

Conceptually:

```text
PDF
 ↓
bytes
 ↓
Buffer
```

Multer gives us something like:

```ts
req.file.buffer;
```

So:

```text
req.file
├── originalname
├── mimetype
├── size
└── buffer
```

For example:

```text
name:
company-policy.pdf

type:
application/pdf

size:
245760

buffer:
<binary data>
```

We can give that buffer to a PDF parser.

---

# 8. Why are we using memory storage?

Because Task 3 is teaching:

```text
upload
 ↓
receive
 ↓
extract text
```

We don't need permanent file storage yet.

So:

```text
Multer
 ↓
Memory
 ↓
PDF parser
 ↓
Extract text
```

is enough.

Later, in a real production application, we could do:

```text
Multer
 ↓
S3
 ↓
Permanent original PDF
```

But that's a separate concern.

---

# 9. What does our route look like?

Conceptually:

```ts
router.post("/documents", upload.single("file"), processDocumentController);
```

Read this from left to right:

```text
POST /documents
      ↓
upload.single("file")
      ↓
processDocumentController
```

The request reaches the route.

Multer processes it.

Then the controller runs.

---

# 10. What does the controller receive?

After Multer has processed the request:

```ts
req.file;
```

contains the uploaded file.

So the controller can do:

```ts
if (!req.file) {
  // no file uploaded
}
```

Then:

```ts
const file = req.file;
```

Now we can pass it to our service:

```text
Controller
    ↓
req.file
    ↓
Document Service
```

---

# 11. Why shouldn't the controller extract the PDF?

Because we've already learned the separation pattern in Tasks 1 and 2.

Controller:

> Handles HTTP.

Service:

> Handles application/business processing.

So:

```text
Controller
──────────
Receive request
Check file exists
Call service
Send response
```

while:

```text
Service
────────
Determine file type
Extract text
Prepare metadata
Return processed document
```

That keeps our architecture consistent.

---

# 12. Where does validation happen?

There are actually multiple levels now.

### Frontend

```text
Is it PDF/TXT?
Is it ≤ 10 MB?
```

### Multer

We can enforce:

```text
Maximum upload size
Allowed MIME types
```

### Controller/service

We can check:

```text
Was a file actually received?
Can the document be processed?
Was readable text extracted?
```

So the complete flow is:

```text
                FILE
                  │
                  ▼
          Frontend validation
                  │
                  ▼
             HTTP upload
                  │
                  ▼
                Multer
           ┌──────┴──────┐
           │             │
       file size      file type
           │             │
           └──────┬──────┘
                  ▼
              req.file
                  │
                  ▼
             Controller
                  │
                  ▼
               Service
                  │
                  ▼
            Text extraction
```

---

# 13. What happens with a PDF?

Suppose:

```text
company-policy.pdf
```

gets uploaded.

Multer gives us:

```text
req.file.buffer
```

Then our document service sends that buffer to the PDF parser:

```text
Buffer
   ↓
PDF parser
   ↓
PDF information
   ├── text
   └── page count
```

We can then create:

```text
Document result
├── name
├── type
├── size
├── pageCount
└── text
```

---

# 14. What happens with TXT?

TXT is much simpler.

We already have:

```text
req.file.buffer
```

We can convert the bytes into text:

```text
Buffer
 ↓
UTF-8
 ↓
String
```

So:

```text
PDF → PDF parser → text

TXT → Buffer → UTF-8 string
```

The service can hide these differences from the controller.

---

# 15. The complete Task 3 flow

Now you can see the entire feature:

```text
                         USER
                           │
                           ▼
                    Select PDF/TXT
                           │
                           ▼
                       File object
                           │
                           ▼
                 Frontend validation
                           │
                           ▼
                        FormData
                           │
                           ▼
                         fetch()
                           │
                           ▼
                  multipart/form-data
                           │
                           ▼
                        EXPRESS
                           │
                           ▼
                         MULTER
                           │
                           ▼
                       req.file
                           │
                           ▼
                      CONTROLLER
                           │
                           ▼
                        SERVICE
                           │
                    ┌──────┴──────┐
                    ▼             ▼
                   PDF            TXT
                    │             │
               PDF parser       Buffer
                    │             │
                    └──────┬──────┘
                           ▼
                     Extracted text
                           +
                     Document metadata
                           │
                           ▼
                    Controller response
                           │
                           ▼
                         JSON
                           │
                           ▼
                      Frontend
                           │
                           ▼
                 Display result
```

That is the architecture we're about to implement.

### One important production distinction

Our current implementation will use:

```text
Multer memoryStorage
```

so the original PDF is **not permanently stored**.

Later, when we want a real persistent AI knowledge system:

```text
Upload
   ↓
Multer
   ↓
S3/Object Storage ─── Original PDF
   │
   ▼
Extract text
   ↓
Database ─────────── Metadata
   │
   ▼
Chunk
   ↓
Embedding
   ↓
Vector DB
```
