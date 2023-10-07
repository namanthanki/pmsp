import { useState } from "react";

const VerifyOTP = () => {
  const [formData, setFormData] = useState({
    otp: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };
  return (
    <div className="container">
      <div className="otp-container">
        <form className="otp-form" onSubmit={handleSubmit}>
          <h1>Verify OTP</h1>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="OTP"
            value={formData.otp}
            onChange={handleInputChange}
          />
          <input type="submit" value="VERIFY" />
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
