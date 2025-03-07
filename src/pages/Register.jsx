import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ username: "", email: "", password: "" });
  const [isVisible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleOnClick = () => setVisible((prev) => !prev);

  const validateFields = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const alphabetRegex = /^[a-zA-Z]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!input.username) {
      newErrors.username = "Please enter your username";
    } else if (!alphabetRegex.test(input.username)) {
      newErrors.username = "Username should contain only letters";
    }

    if (!input.email) {
      newErrors.email = "Please enter your email";
    } else if (!emailRegex.test(input.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!input.password) {
      newErrors.password = "Please enter your password";
    } else if (!passwordRegex.test(input.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, and a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      const userData = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = userData.some(
        (user) =>
          user.username === input.username || user.email === input.email
      );

      if (userExists) {
        alert("User already exists!");
      } else {
        userData.push(input);
        localStorage.setItem("users", JSON.stringify(userData));
        alert("Sign-up successful!");
        navigate("/login");
        setInput({ username: "", email: "", password: "" });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-5xl font-semibold text-center text-white my-3">Sign Up</h1>
        <p className="font-thin text-white text-center mb-6">
          Please fill in the details to create an account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Input */}
          <div>
            <input
              type="text"
              name="username"
              value={input.username}
              placeholder="Username"
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              name="email"
              value={input.email}
              placeholder="Email"
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={isVisible ? "text" : "password"}
              name="password"
              value={input.password}
              placeholder="Password"
              className={`w-full p-3 border rounded-lg focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              onChange={handleChange}
            />
            <i
              className={`absolute right-4 top-4 text-gray-600 cursor-pointer ${
                isVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }`}
              onClick={handleOnClick}
            ></i>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Submit
          </button>

          {/* Login & Home Links */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => navigate("/login")}
              >
                Login here!
              </span>
            </p>
            <p className="text-gray-600 mt-3">
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Back to Home Page
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
