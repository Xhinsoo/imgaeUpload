# imgaeUpload

multer is a node.js middleware for parsing/handling multipart/form-data which is primarily used for uploading files. It adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form, the file or files obj contains the files uploaded via the form.

--make form enctype  ="multipart/form-data" in your form.

Multer methods
upload.single for single files
upload.array + multiple class added in form input for multiple files. These are added to req.file upon using multer middleware
Non files are added to req.body


TLDR: Multer parses information from form and adds file and body to request.