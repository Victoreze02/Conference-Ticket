import { useState, useEffect } from "react";

export default function ConferenceTicketGenerator() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: ""
  });
  const [errors, setErrors] = useState({});
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("ticketForm"));
    if (savedData) setFormData(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("ticketForm", JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.avatar || !/^https?:\/\//.test(formData.avatar))
      newErrors.avatar = "Valid image URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setTicket(formData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Conference Ticket Generator</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">Full Name: </label> 
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div> <br />
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Avatar URL</label>
          <input
            type="url"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Generate Ticket
        </button>
      </form>
      {ticket && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-bold">Conference Ticket</h3>
          <img src={ticket.avatar} alt="Avatar" className="w-20 h-20 rounded-full mx-auto mt-2" />
          <p className="mt-2 font-medium">{ticket.fullName}</p>
          <p className="text-gray-600">{ticket.email}</p>
        </div>
      )}
    </div>
  );
}
