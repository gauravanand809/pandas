import React, { useState } from 'react';
import styles from '@/styles/form.module.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    country: 'australia',
    subject: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission here
    console.log(formData);
  };

  return (
    <div>
      <h1>Contact Details</h1>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            value={formData.firstname}
            onChange={handleChange}
            className={styles.input}
          />

          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
            value={formData.lastname}
            onChange={handleChange}
            className={styles.input}
          />

          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
          </select>

          <label htmlFor="subject">Subject</label>
          <textarea
            id="subject"
            name="subject"
            placeholder="Write something.."
            style={{ height: '200px' }}
            value={formData.subject}
            onChange={handleChange}
            className={styles.textarea}
          ></textarea>

          <input type="submit" value="Submit" className={styles.submitButton} />
        </form>
      </div>
    </div>
  );
};

export default Contacts;
