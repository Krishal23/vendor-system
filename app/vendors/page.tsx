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

  const fetchVendors = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/api/vendors`, {
        params: {
          page,
          limit,
          sortBy,
          order,
          search,
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
  }, [page, limit, sortBy, order, search])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Vendor List</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search vendor..."
        className="border px-4 py-2 mb-4 rounded w-full max-w-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
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
              <tr key={v._id} className="border-t">
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
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded"
        >
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
    </div>
  )
}
