import React from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/verify.css";

const baseLink = process.env.REACT_APP_API_URL || "http://localhost:3000";

const Verify = () => {
  const { token } = useParams();
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(true);

  const verify = async () => {
    try {
      const response = await axios.patch(
        `${baseLink}/client/accounts/verify/${token}`
      );
      setMessage(response.data);
    } catch (e) {
      console.log(e.message);
      if (e.message === "Request failed with status code 208")
        setMessage("Email has been verified already");
      if (e.message === "Request failed with status code 401") {
        setError("Invalid Token or Token expired");
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    verify();
  }, [token]);

  if (loading) return <div className="verify-loader">Loading...</div>;
  if (error)
    return (
      <div className="error">
        <span className="closebtn">×</span>
        <strong>Invalid verification link</strong>
      </div>
    );
  if (message) return <div className="success">{message}</div>;
  else
    return (
      <div className="error">
        <span className="closebtn">×</span>
        <strong>
          Some errors occurred. Please retry by clicking the link provided in
          the mail
        </strong>
      </div>
    );
};

export default Verify;
