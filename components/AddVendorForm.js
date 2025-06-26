'use client';

import { useEffect, useState } from 'react';
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

const AddVendorForm = ({ onClose, onSuccess }) => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Something went wrong');
      } else {
        toast.success('Vendor added successfully!');
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error('Error submitting form');
    }

    setLoading(false);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {Object.keys(form).map((field) => (
        <TextField
          key={field}
          fullWidth
          label={field.replace(/([A-Z])/g, ' $1')}
          name={field}
          value={form[field]}
          onChange={handleChange}
          margin="dense"
          required={['vendorName', 'bankAccountNo', 'bankName'].includes(field)}
          sx={{
            mt: 1,
            '& .MuiInputBase-input': {
              color: '#ccc'
            },
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: '#ccc !important',
              opacity: 1,
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#90caf9'
              }
            },
            '& .MuiInputLabel-root': {
              color: '#90caf9'
            }
          }}
        />
      ))}
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button onClick={onClose} sx={{ color: '#90caf9', borderColor: '#90caf9', mr: 1 }} variant="outlined">Cancel</Button>
        <Button type="submit" variant="contained" disabled={loading}>Add Vendor</Button>
      </Box>
    </motion.form>
  );
};

export default AddVendorForm;
