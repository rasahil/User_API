import { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [captchaInput, setCaptchaInput] = useState(""); // State for captcha input
  const navigate = useNavigate();

  // Initialize captcha when the component mounts
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.email || !formData.password) {
      setError("Please fill in both fields.");
      return;
    }

    // Validate captcha before submitting
    if (!validateCaptcha(captchaInput)) {
      setError("Captcha does not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/data/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setError(null); // Clear any error
        localStorage.setItem("token", data.token); // Save token to localStorage
        navigate("/profile"); // Redirect to profile after successful login
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center mt-2">
      <Card
        className="border border-s-2 border-b-2 border-t-0 border-e-0 rounded p-5"
        color="transparent"
        shadow={false}
      >
        <Typography color="white" className="mt-1 font-normal">
          Welcome Back! Enter your details to Sign In.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="white" className="-mb-3">
              Your Email
            </Typography>
            <Input
              required
              size="lg"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@mail.com"
              className="!border-t-white-200 focus:!border-t-gray-900 text-white text-center"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="white" className="-mb-3">
              Password
            </Typography>
            <Input
              required
              type="password"
              size="lg"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="!border-t-white-200 focus:!border-t-gray-900 text-white text-center"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          {/* Captcha Integration */}
          <div className="container flex justify-center">
            <div className="form-group">
              <div className="text-center mt-3">
                <LoadCanvasTemplate />
              </div>

              <div className="col mt-3">
                <Input
                  placeholder="Enter Captcha Value"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  name="captchaInput"
                  type="text"
                  className="form-control text-white text-center"
                />
              </div>
            </div>
          </div>

          {error && (
            <Typography color="red" className="mt-2 text-center font-normal">
              {error}
            </Typography>
          )}
          <Button type="submit" className="mt-6" fullWidth>
            Login
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

export default SignIn;
