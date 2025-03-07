import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./style.css";

const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [errors, setError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((input) => ({
      ...input,
      [name]: value,
    }));
    console.log(input, "register input");
  };

  const handleOnClick = () => {
    setVisible((isVisible) => !isVisible);
    console.log("Cick");
  };

  const isValid = (value) => {
    const handleError = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email validation
    const alphabetRegex = /^[a-zA-Z]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!value?.username) {
      handleError.username = "Please Enter username";
    } else if (!alphabetRegex.test(value?.username)) {
      handleError.username = "please enter valid username";
    }
    if (!value?.email) {
      handleError.email = "please Enter email";
    } else if (!emailRegex.test(value?.email)) {
      handleError.email = "please enter valid email";
    }

    if (!value?.password) {
      handleError.password = "Please Enter password";
    } else if (!passwordRegex.test(value?.password)) {
      handleError.password = "please enter valid password";
    }
    setError(handleError);
    console.log(Object.keys(handleError), "errors OBject");
    return Object.keys(handleError).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const validation = isValid(input);
    if (validation) {
      console.log(input, "input");
      const userData = JSON.parse(localStorage.getItem("users")) || [];
      const userExist = userData.some(
        (users) =>
          users.username === input.username || users.email === input.email
      );
      if (userExist) {
        alert("User already exists!");
      } else {
        userData.push(input);
        localStorage.setItem("users", JSON.stringify(userData));
        alert("Sign up successful!");
        navigate("/login");
        setInput({});
      }
      // setError({})
    }
  };
  return (
    <>
      <div className="container:lg bg-transparent  flex justify-center mt-32">
        <form onSubmit={handleSubmit}>
          <h1 className="text-white font-semibold my-4 text-center">Sign up</h1>
          <p className="text-white font-thin my-4 mb-14 text-center">
            Please fill the details and create an account
          </p>
          <div className="my-4">
            <input
              type="text"
              name="username"
              value={input?.username || ""}
              placeholder="username"
              className={
                errors?.username
                  ? "bg-white bg-opacity-75 w-96 p-3 rounded-lg font-semibold text-lg border-2 border-solid border-red-700"
                  : "bg-white bg-opacity-75 w-96 p-3 rounded-lg font-semibold text-lg"
              }
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors?.username && (
              <div className="text-red-700">{errors?.username}</div>
            )}
          </div>

          <div className="my-4">
            <input
              type="email"
              name="email"
              value={input?.email || ""}
              placeholder="email"
              className={
                errors?.email
                  ? "bg-white bg-opacity-75 w-96 p-3 rounded-lg font-semibold text-lg border-2 border-solid border-red-700"
                  : "bg-white bg-opacity-75 w-96 p-3 rounded-lg font-semibold text-lg"
              }
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errors?.email && (
              <div className="text-red-700">{errors?.email}</div>
            )}
          </div>

          <div className="my-4 relative">
            <input
              type={isVisible ? "text" : "password"}
              name="password"
              value={input?.password || ""}
              placeholder="password"
              className={
                errors?.password
                  ? "bg-white bg-opacity-75 w-96 p-3 rounded-lg font-semibold text-lg border-2 border-solid border-red-700"
                  : "bg-white bg-opacity-75 w-96 p-3 rounded-lg font-semibold text-lg"
              }
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <i
              className={
                isVisible
                  ? "fa-solid fa-eye absolute right-4 top-4 cursor-pointer"
                  : "fa-solid fa-eye-slash absolute right-4 top-5 cursor-pointer"
              }
              onClick={handleOnClick}
            ></i>
            {errors?.password && (
              <div className="text-red-700">{errors?.password}</div>
            )}
          </div>
          <div className="my-12">
            <button
              type="submit"
              className="w-96 bg-slate-800 bg-opacity-90 text-white"
            >
              Submit
            </button>
          </div>

          <div className="mt-12">
            <p className="text-white">
              Already have an account?{" "}
              <a
                href=""
                className="text-white font-thin"
                onClick={() => navigate("/login")}
              >
                {" "}
                Login!
              </a>
            </p>
          </div>
          <div className="mt-5">
            <p className="text-white">
              <a
                href=""
                className="text-white font-thin"
                onClick={() => navigate("/")}
              >
                {" "}
                Back to Home Page
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
export default Register;
