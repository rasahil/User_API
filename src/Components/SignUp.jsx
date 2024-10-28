import {
  Input,
  Button,
  Typography,
  Radio,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-full w-full scale-105"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function SignUp() {
   // Country-State-City mapping data
   const locationData = {
    "United States": {
      states: ["California", "Texas", "New York"],
      cities: {
        California: ["Los Angeles", "San Francisco", "San Diego"],
        Texas: ["Houston", "Dallas", "Austin"],
        "New York": ["New York City", "Buffalo", "Rochester"],
      },
    },
    Canada: {
      states: ["Ontario", "Quebec", "British Columbia"],
      cities: {
        Ontario: ["Toronto", "Ottawa", "Hamilton"],
        Quebec: ["Montreal", "Quebec City", "Laval"],
        "British Columbia": ["Vancouver", "Victoria", "Surrey"],
      },
    },
    "United Kingdom": {
      states: ["England", "Scotland", "Wales"],
      cities: {
        England: ["London", "Manchester", "Birmingham"],
        Scotland: ["Edinburgh", "Glasgow", "Aberdeen"],
        Wales: ["Cardiff", "Swansea", "Newport"],
      },
    },
    Australia: {
      states: ["New South Wales", "Victoria", "Queensland"],
      cities: {
        "New South Wales": ["Sydney", "Newcastle", "Wollongong"],
        Victoria: ["Melbourne", "Geelong", "Ballarat"],
        Queensland: ["Brisbane", "Gold Coast", "Cairns"],
      },
    },
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",  
    gender: "",
    dateOfBirth: "",
    address: "",
    country: "",
    state: "",
    city: "",
    pinCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:4000/data/regi_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.log("Failed to submit data. Status code:", response.status);
        throw new Error("Failed to submit data");
      }

      const data = await response.json();
      console.log("Response from server: ", data);
      // Handle success (e.g., show success message)
        // Trigger success toast
        toast.success("Data successfully submitted!", {
          position: "top-right",
          autoClose: 3000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show error message)
       
      // Trigger error toast
      toast.error("Failed to submit data", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
       {/* ToastContainer is required to show notifications */}
       <ToastContainer />
      <div className="p-6 border border-t-0 rounded-md border-s-2 border-b-2 border-e-0 mt-2 shadow shadow-amber-50">
        <Typography variant="h4" color="white">
          Sign Up
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <section className="text-white">
              <Typography>First Name</Typography>
              <Input
                className="w-full text-center text-white"
                placeholder="First Name"
                type="text"
                color="white"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="standard"
                required
              />
            </section>
            <section className="text-white">
              <Typography>Last Name</Typography>
              <Input
                className="w-full text-center text-white"
                placeholder="Last Name"
                type="text"
                name="lastName"
                color="white"
                value={formData.lastName}
                onChange={handleChange}
                variant="standard"
                required
              />
            </section>
            <section className="text-white">
              <Typography>Email</Typography>
              <Input
                className="w-full text-center text-white"
                placeholder="test@gmail.com"
                type="email"
                color="white"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="standard"
                required
              />
            </section>
            <section className="text-white">
              <Typography>Phone Number</Typography>
              <Input
                maxLength={10}
                className="w-full text-center text-white"
                placeholder="**********"
                type="text"
                color="white"
                name="mobile"  // Changed to match backend
                value={formData.mobile}  // Changed to match backend
                onChange={handleChange}
                variant="standard"
                required
              />
            </section>
            <section className="flex flex-col mx-auto text-white">
              <Typography>Gender</Typography>
              <div className="flex gap-4">
                <Radio
                  name="gender"
                  value="Male"
                  color="white"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  ripple={false}
                  icon={<Icon />}
                  className="border-gray-900/10 bg-white p-0"
                  label={
                    <Typography className="font-normal text-white">
                      Male
                    </Typography>
                  }
                />
                <Radio
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  ripple={false}
                  color="white"
                  icon={<Icon />}
                  className="border-gray-900/10 bg-white p-0"
                  label={
                    <Typography className="font-normal text-white">
                      Female
                    </Typography>
                  }
                />
              </div>
            </section>
            <section className="text-white">
              <Typography>Date of Birth</Typography>
              <Input
                className="w-full text-center text-white"
                placeholder="YYYY-MM-DD"
                type="date"
                color="white"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                variant="standard"
                required
              />
            </section>
            <section className="text-white col-span-full">
              <Typography>Address</Typography>
              <Textarea
                variant="standard"
                
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full text-center text-white"
                placeholder="Enter your address"
              />
            </section>

            {/* Country Dropdown */}
          <section className="text-white">
            <Typography>Country</Typography>
            <Select
              variant="static"
              name="country"
              value={formData.country}
              onChange={(value) => handleSelectChange("country", value)}
              className="text-white"
              label="Select Country"
            >
              <Option value="United States">United States</Option>
              <Option value="Canada">Canada</Option>
              <Option value="United Kingdom">United Kingdom</Option>
              <Option value="Australia">Australia</Option>
            </Select>
          </section>

          {/* State Dropdown (Conditional based on selected Country) */}
          {formData.country && (
            <section className="text-white">
              <Typography>State</Typography>
              <Select
                variant="static"
                name="state"
                value={formData.state}
                onChange={(value) => handleSelectChange("state", value)}
                className="text-white"
                label="Select State"
              >
                {locationData[formData.country].states.map((state) => (
                  <Option key={state} value={state}>
                    {state}
                  </Option>
                ))}
              </Select>
            </section>
          )}

          {/* City Dropdown (Conditional based on selected State) */}
          {formData.state && (
            <section className="text-white">
              <Typography>City</Typography>
              <Select
                variant="static"
                name="city"
                value={formData.city}
                onChange={(value) => handleSelectChange("city", value)}
                className="text-white"
                label="Select City"
              >
                {locationData[formData.country].cities[formData.state].map(
                  (city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  )
                )}
              </Select>
            </section>
          )}
            <section className="text-white">
              <Typography>PIN Code</Typography>
              <Input
                className="w-full text-center text-white"
                placeholder="Enter PIN Code"
                type="text"
                color="white"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                variant="standard"
                required
              />
            </section>
          </div>

          <Button
            type="submit"
            className="mt-6 bg-white text-black hover:bg-slate-400"
          >
            Register
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-primary">
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
