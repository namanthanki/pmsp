import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { email } = useParams();

  const [formData, setFormData] = useState({
    otp: "",
  });

  const verify = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, otp: formData.otp }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      toast.error(error.error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    verify();
  };
  return (
    <div className="container">
      <div className="otp-container">
        <form className="otp-form" onSubmit={handleSubmit}>
          <h1>Verify OTP</h1>
          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="OTP"
            value={formData.otp}
            onChange={handleInputChange}
          />
          <input type="submit" value="VERIFY" />
        </form>
        <div className="gif-container"></div>
      </div>
    </div>
  );
};

export default VerifyOTP;
