'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function VendorsPage() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [sortBy, setSortBy] = useState('vendorName')
  const [order, setOrder] = useState('asc')
  const [search, setSearch] = useState('')
  const [bankName, setBankName] = useState('')
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [formData, setFormData] = useState({
    vendorName: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: '',
  })

  const fetchVendors = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/api/vendors`, {
        params: {
          page,
          limit,
          sortBy,
          order,
          bankName,
          vendorName: search,
        },
      })
      setVendors(res.data.vendors || [])
    } catch (err) {
      console.error('Fetch error:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchVendors()
  }, [page, limit, sortBy, order, search, bankName])

  const handleRowClick = async (vendorId) => {
    try {
      const res = await axios.get(`/api/vendors/${vendorId}`)
      console.log(res.data)
      setSelectedVendor(res.data)
      setFormData({
        vendorName: res.data.vendorName || '',
        bankAccountNo: res.data.bankAccountNo || '',
        bankName: res.data.bankName || '',
        addressLine1: res.data.addressLine1 || '',
        addressLine2: res.data.addressLine2 || '',
        city: res.data.city || '',
        country: res.data.country || '',
        zipCode: res.data.zipCode || '',
      })
    } catch (err) {
      console.error('Error fetching vendor:', err)
    }
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/vendors/${selectedVendor._id}`, formData)
      setSelectedVendor(null)
      fetchVendors()
    } catch (err) {
      console.error('Update failed:', err)
      alert('Failed to update vendor')
    }
  }

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this vendor?')
    if (!confirmDelete) return
    try {
      await axios.delete(`/api/vendors/${selectedVendor._id}`)
      setSelectedVendor(null)
      fetchVendors()
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete vendor')
    }
  }

  return (
    <div className="p-6">
      
      <h1 className="text-2xl font-bold mb-4">Vendor List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search vendor..."
        className="border px-4 py-2 mb-2 rounded w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search Bank Name..."
        className="border px-4 py-2 mb-4 rounded w-full max-w-md"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />

      {/* Sorting */}
      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium">Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border rounded px-2 py-1">
          <option value="vendorName">Vendor Name</option>
          <option value="bankName">Bank Name</option>
          <option value="createdAt">Created At</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)} className="border rounded px-2 py-1">
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
      </div>

      {/* Vendor Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Vendor Name</th>
              <th className="px-4 py-2">Bank Name</th>
              <th className="px-4 py-2">Account No</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v._id} className="border-t cursor-pointer hover:bg-gray-50" onClick={() => handleRowClick(v._id)}>
                <td className="px-4 py-2">{v.vendorName}</td>
                <td className="px-4 py-2">{v.bankName}</td>
                <td className="px-4 py-2">{v.bankAccountNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="mt-6 flex gap-4 items-center">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} className="px-3 py-1 bg-gray-200 rounded">
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="px-3 py-1 bg-gray-200 rounded">
          Next
        </button>
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="ml-4 px-2 py-1 border rounded">
          {[5, 10, 15].map((l) => (
            <option key={l} value={l}>
              Show {l}
            </option>
          ))}
        </select>
      </div>

      {/* Vendor Details Modal */}
      {selectedVendor && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">Vendor Details</h2>
            <p className="mb-4 text-gray-700 text-sm"><strong>ID:</strong> {selectedVendor._id}</p>

            {/* Form Fields */}
            {['vendorName', 'bankAccountNo', 'bankName', 'addressLine1', 'addressLine2', 'city', 'country', 'zipCode'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field}
                value={formData[field]}
                onChange={handleFormChange}
                className="border mb-2 p-2 w-full"
              />
            ))}

            <div className="flex justify-end mt-4 gap-2">
              <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              <button onClick={() => setSelectedVendor(null)} className="bg-gray-300 px-4 py-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
