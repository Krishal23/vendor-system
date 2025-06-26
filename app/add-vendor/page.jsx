'use client';

import { useState } from 'react';

export default function AddVendorForm() {
  const [form, setForm] = useState({
    vendorName: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Something went wrong' });
      } else {
        setMessage({ type: 'success', text: 'Vendor added successfully!' });
        setForm({
          vendorName: '',
          bankAccountNo: '',
          bankName: '',
          addressLine1: '',
          addressLine2: '',
          city: '',
          country: '',
          zipCode: ''
        });
      }
    } catch (error) {
      console.error('Submit Error:', error);
      setMessage({ type: 'error', text: 'Error submitting form' });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Vendor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['vendorName', 'bankAccountNo', 'bankName', 'addressLine1', 'addressLine2', 'city', 'country', 'zipCode'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required={['vendorName', 'bankAccountNo', 'bankName'].includes(field)}
            />
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Submitting...' : 'Add Vendor'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-2 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
