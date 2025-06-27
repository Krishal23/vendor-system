'use client';

import { useEffect, useState ,useCallback} from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Tooltip
} from '@mui/material';
import { Delete, Edit, Close, Visibility, Add } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import AddVendorForm from './AddVendorForm'

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState('vendorName');
  const [order, setOrder] = useState('asc');
  const [search, setSearch] = useState('');
  const [bankName, setBankName] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);


  const fetchVendors = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/vendors`, {
        params: { page, limit, sortBy, order, bankName, vendorName: search }
      });
      setVendors(res.data.vendors || []);
    } catch (err) {
      toast.error('Failed to fetch vendors');
    }
    setLoading(false);
  }, [page, limit, sortBy, order, bankName, search]);

  useEffect(() => { fetchVendors(); }, [page, limit, sortBy, order, search, bankName, fetchVendors]);

  const handleRowClick = async (vendorId) => {
    try {
      const res = await axios.get(`/api/vendors/${vendorId}`);
      setSelectedVendor(res.data);
      setFormData(res.data);
      setEditMode(false);
    } catch (err) {
      toast.error('Failed to load vendor details');
    }
  };

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/vendors/${selectedVendor._id}`, formData);
      toast.success('Vendor updated successfully');
      setSelectedVendor(null);
      fetchVendors();
    } catch (err) {
      toast.error('Failed to update vendor');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this vendor?')) return;
    try {
      await axios.delete(`/api/vendors/${selectedVendor._id}`);
      toast.success('Vendor deleted');
      setSelectedVendor(null);
      fetchVendors();
    } catch (err) {
      toast.error('Failed to delete vendor');
    }
  };

  const editableFields = ['vendorName', 'bankAccountNo', 'bankName', 'addressLine1', 'addressLine2', 'city', 'country', 'zipCode'];

  return (
    <Box p={4} sx={{ minHeight: '100vh', background: 'linear-gradient(to right, rgba(30,30,30,0.8), rgba(50,50,50,0.9))', backdropFilter: 'blur(10px)', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ color: '#90caf9' }}>Vendors List</Typography>
          <Button startIcon={<Add />} onClick={() => setAddDialogOpen(true)} variant="outlined" sx={{ color: '#90caf9', borderColor: '#90caf9' }}>Add Vendor</Button>
        </Box>
      </motion.div>

      <Box display="flex" gap={2} mb={4} flexWrap="wrap" justifyContent="center">
        {/* <TextField label="Search Vendor" value={search} onChange={(e) => setSearch(e.target.value)} fullWidth variant="outlined" sx={{ maxWidth: 250, input: { color: '#fff' }, '& .MuiInputLabel-root': { color: '#90caf9' }, '& fieldset': { borderColor: '#90caf9' } }} /> */}
        {/* <TextField label="Search Bank" value={bankName} onChange={(e) => setBankName(e.target.value)} fullWidth variant="outlined" sx={{ maxWidth: 250, input: { color: '#fff' }, '& .MuiInputLabel-root': { color: '#90caf9' }, '& fieldset': { borderColor: '#90caf9' } }} /> */}
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} variant="outlined" sx={{ color: '#fff', minWidth: 150, '& fieldset': { borderColor: '#90caf9' } }}>
          <MenuItem value="vendorName">Vendor Name</MenuItem>
          <MenuItem value="bankName">Bank Name</MenuItem>
          <MenuItem value="createdAt">Created At</MenuItem>
        </Select>
        <Select value={order} onChange={(e) => setOrder(e.target.value)} variant="outlined" sx={{ color: '#fff', minWidth: 100, '& fieldset': { borderColor: '#90caf9' } }}>
          <MenuItem value="asc">ASC</MenuItem>
          <MenuItem value="desc">DESC</MenuItem>
        </Select>
      </Box>

      {loading ? <CircularProgress sx={{ color: '#90caf9' }} /> : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Table sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 3, overflow: 'hidden' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#90caf9' }}>Vendor Name</TableCell>
                <TableCell sx={{ color: '#90caf9' }}>Bank Name</TableCell>
                <TableCell sx={{ color: '#90caf9' }}>Account No</TableCell>
                <TableCell sx={{ color: '#90caf9' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vendors.map((v) => (
                <TableRow key={v._id} hover sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' } }}>
                  <TableCell sx={{ color: '#eee' }}>{v.vendorName}</TableCell>
                  <TableCell sx={{ color: '#eee' }}>{v.bankName}</TableCell>
                  <TableCell sx={{ color: '#eee' }}>{v.bankAccountNo}</TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton onClick={() => handleRowClick(v._id)}>
                        <Visibility sx={{ color: '#90caf9' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}

      <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#1e1e1e', color: '#90caf9' }}>Add New Vendor</DialogTitle>
        <DialogContent sx={{ bgcolor: '#121212' }}>
          <AddVendorForm onClose={() => setAddDialogOpen(false)} onSuccess={fetchVendors} />
        </DialogContent>
      </Dialog>

      <Box mt={4} display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} sx={{ color: '#fff', borderColor: '#90caf9' }} variant="outlined">Prev</Button>
        <Typography sx={{ color: '#90caf9' }}>Page {page}</Typography>
        <Button onClick={() => setPage((p) => p + 1)} sx={{ color: '#fff', borderColor: '#90caf9' }} variant="outlined">Next</Button>
        <Select value={limit} onChange={(e) => setLimit(Number(e.target.value))} variant="outlined" sx={{ color: '#fff', '& fieldset': { borderColor: '#90caf9' } }}>
          {[5, 10, 15].map((l) => <MenuItem key={l} value={l}>Show {l}</MenuItem>)}
        </Select>
      </Box>

      <Dialog open={!!selectedVendor} onClose={() => setSelectedVendor(null)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ bgcolor: '#1e1e1e', color: '#90caf9' }}>
          Vendor Details
          <IconButton onClick={() => setSelectedVendor(null)} sx={{ position: 'absolute', right: 8, top: 8, color: '#90caf9' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#121212' }}>
          <Typography mb={2} variant="body2" sx={{ color: '#aaa' }}>Vendor ID: {selectedVendor?._id}</Typography>
          {editableFields.map((field) => (
            <TextField
              key={field}
              fullWidth
              label={field}
              name={field}
              value={formData[field] || ''}
              onChange={handleFormChange}
              margin="dense"
              disabled={!editMode}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#ccc'
                },
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: '#ccc !important',
                  opacity: 1,
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: editMode ? '#90caf9' : '#555'
                  }
                },
                '& .MuiInputLabel-root': {
                  color: '#90caf9'
                }
              }}
            />
          ))}
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#121212' }}>
          {!editMode ? (
            <>
              <Button onClick={() => setEditMode(true)} startIcon={<Edit />} variant="contained" color="primary">Edit</Button>
              <Button onClick={handleDelete} color="error" startIcon={<Delete />}>Delete</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setEditMode(false)} variant="outlined" sx={{ color: '#90caf9', borderColor: '#90caf9' }}>Cancel</Button>
              <Button onClick={handleUpdate} variant="contained" startIcon={<Edit />} color="primary">Save</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
