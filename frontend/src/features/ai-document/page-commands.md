### `page.tsx` — file-related operations

| Code                                               | Purpose                                                                              |
| -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `event.target.files?.[0]`                          | Gets the first file selected by the user from the browser file input.                |
| `File`                                             | Browser object representing the selected file. Gives us `name`, `size`, `type`, etc. |
| `file.name`                                        | Gets the original filename.                                                          |
| `file.type`                                        | Gets the browser-reported MIME type.                                                 |
| `file.size`                                        | Gets the file size in bytes.                                                         |
| `new FormData()`                                   | Creates a container specifically for sending form/file data to the backend.          |
| `formData.append("file", selectedFile)`            | Adds the actual selected file into that FormData under the field name `file`.        |
| `accept=".pdf,.txt,..."`                           | Tells the browser which file types the file picker should allow/select.              |
| `fileInputRef.current.value = ""`                  | Clears the browser's file input after removing/invalidating a file.                  |
| `file.size > MAX_FILE_SIZE`                        | Checks whether the uploaded file is larger than 10 MB.                               |
| `ALLOWED_FILE_TYPES.includes(file.type)`           | Checks whether the file's MIME type is one of our allowed types.                     |
| `processDocument(selectedFile, controller.signal)` | Sends the selected file to our frontend API service for uploading to the backend.    |
| `AbortController()`                                | Creates a controller that can cancel the ongoing upload/request.                     |
| `controller.abort()`                               | Cancels the request when our 60-second timeout is reached.                           |

### The actual file operation in this page

The important sequence is:

```text
User selects PDF
      ↓
event.target.files[0]
      ↓
File object
      ↓
validate file.size / file.type
      ↓
selectedFile
      ↓
processDocument(selectedFile)
      ↓
[service creates FormData + appends file]
      ↓
HTTP upload
```

this `page.tsx` **does not read the PDF contents itself**.
