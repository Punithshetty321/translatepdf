

This project is a full-stack solution to ingest, translate, and extract structured data from Tamil-language real estate PDFs. It uses OCR + translation to stream English results **page by page**, and lists transactions in a searchable table.

---

##  Features

- Upload Tamil-language real estate PDFs
-  Extracts one page at a time using in-memory OCR
- Translates Tamil → English using Google Translate API
-  Displays translations per-page as they stream in
-  Extracts and lists structured transaction fields:
  - Document Number
  - Buyer/Seller Names
  - Survey Number
  - Dates & Values
- ⚡ Fast: Streams results instead of waiting for full file

---

---

## 🧑 How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/Punithshetty321/translatepdf
# start backend 
- cd backend
- npm run dev


# now in new terminal open the folder 
- npm run dev 
to start the frontend