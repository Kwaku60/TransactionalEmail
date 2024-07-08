
import React, { useState } from 'react';
import axios from 'axios';
import './EmailForm.css';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    to: '',
    templateID: '',
    dynamicData: {
      recipient_name: '',
      notes: '',
    },
  });
  const [responseMsg, setResponseMsg] = useState('');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  //debugging
  axiosInstance.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
  });

  axiosInstance.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 2) { //if we've affected multiple fields
      setFormData((prevData) => ({
        ...prevData,
        dynamicData: {
          ...prevData.dynamicData,
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/send-email', formData);
      setResponseMsg(response.data.message);
    } catch (error) {
      setResponseMsg(`Failed to send email: ${error.response.data.message}`);
    }
  };

  return (
    <div className="email-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>To:</label>
          <input
            type="email"
            name="to"
            value={formData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Template:</label>
          <select name="templateID" value={formData.templateID} onChange={handleChange} required>
            <option value="">Choose a template</option>
            <option value="fsm1">Template 1</option>
            <option value="fms2">Template 2</option>
          </select>
        </div>
        <div>
          <label>Recipient Full Name:</label>
          <input
            type="text"
            name="dynamicData.recipient_name"
            value={formData.dynamicData.recipient_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Notes</label>
          <textarea
            name="dynamicData.notes"
            value={formData.dynamicData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
      {responseMsg && <p>{responseMsg}</p>}
    </div>
  );
};

export default EmailForm;
