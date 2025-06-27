
```markdown
# 📦 VendorX- Vendor Management System (VMS)

A full-stack web application for managing vendors, built with **Next.js App Router**, **MongoDB**, **Tailwind CSS**, and **MUI**. The system provides an intuitive UI and robust backend for CRUD operations, with plans for future enhancements like analytics, notifications, and role-based access.

---

## 🛠️ Tech Stack

| Layer         | Technology                        |
| ------------- | --------------------------------- |
| Frontend      | React 19, Next.js 15 (App Router) |
| Styling       | Tailwind CSS, MUI, Framer Motion  |
| Backend       | Node.js (via Next.js API Routes)  |
| Database      | MongoDB with Mongoose             |
| Auth          | next-auth                         |
| HTTP/State    | Axios, React hooks                |
| Notifications | React Hot Toast                   |
| Dev Tools     | ESLint, Cross-Env                 |

---

## ✨ Features

### ✅ Vendor CRUD

- Add, view, update, and delete vendors  
- Search vendors by **bank name** or **vendor name**  
- Sort and paginate vendors  

### ✅ Modals & Interaction

- Click a vendor row to view details in a modal  
- Edit/delete directly from the popup  

### ✅ Add Vendor Form

- Clean, validated input form  
- Integrated with backend APIs  

### ✅ Authentication

- Secure session-based login using `next-auth`  

### ✅ Responsive UI

- Built with Tailwind CSS + MUI components  
- Smooth transitions using Framer Motion  

---

## 🔌 API Endpoints

All endpoints are located under `/api/vendors`

| Method   | Endpoint           | Description                |
| -------- | ------------------ | -------------------------- |
| `GET`    | `/api/vendors`     | Fetch vendors (filterable) |
| `POST`   | `/api/vendors`     | Add new vendor             |
| `PUT`    | `/api/vendors/:id` | Update existing vendor     |
| `DELETE` | `/api/vendors/:id` | Delete vendor              |


## 🗂️ Project Structure


vendor-system/
├── app/
│   ├── layout.tsx          # Root layout (html, body)
│   ├── not-found.tsx       # Custom 404 page
│   ├── error.tsx           # Global error boundary
│   └── vendors/
│       ├── page.tsx        # Vendor list
│       └── [id]/edit.tsx   # Edit vendor
├── components/
│   ├── VendorTable.tsx
│   ├── VendorModal.tsx
│   └── AddVendorForm.tsx
├── pages/
│   └── _document.tsx       # Custom Html wrapper (only here!)
├── models/
│   └── Vendor.ts           # Mongoose schema
├── lib/
│   └── db.ts               # MongoDB connection logic
├── api/
│   └── vendors/
│       ├── index.ts        # GET & POST
│       └── [id].ts         # PUT & DELETE
├── styles/
│   └── globals.css
├── .env.local
├── tailwind.config.ts
├── next.config.js
└── package.json
```



## 🚀 Future Plans

- [ ] Role-based admin dashboard  
- [ ] Email notifications on CRUD  
- [ ] Activity logs for audit  
- [ ] Vendor data export (CSV/PDF)  
- [ ] Vendor analytics dashboard  
- [ ] Mobile-first layout / PWA support  

---

