import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EDIT = () => {
  const navget = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    notation: "",
    description: "",
  });

  const handleChange = (e, type) => {
    switch (type) {
      case "name":
        setError("");
        setFormData({ ...formData, name: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Name Is Empty");
        }
        break;
      case "notation":
        setError("");
        setFormData({ ...formData, notation: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Notation Is Empty");
        }
        break;
      case "description":
        setError("");
        setFormData({ ...formData, description: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Description Is Empty");
        }
        break;
    }
  };

  useEffect(() => {
    if (
      formData.name !== "" &&
      formData.notation !== "" &&
      formData.description !== ""
    ) {
      fetch("http://localhost/react-project/back-end/edit.php")
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError("Validation Failed!! Try Again");
          } else {
            setMsg("Algorithm Fetched successfully!! Redirecting...");
          }
        })
        .catch((err) => {
          setError(err);
          console.log("Error:", err);
        });
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name !== "" &&
      formData.notation !== "" &&
      formData.description !== ""
    ) {
      fetch("http://localhost/react-project/back-end/post.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError("Validation Failed!! Try Again");
          } else {
            setMsg("Algorithm Added successfully!! Redirecting...");
            setTimeout(() => {
              navget("/");
            }, 3000);
          }
        })
        .catch((err) => {
          setError(err);
          console.log("Error:", err);
        });
    } else {
      e.preventDefault();
      setError("All field are required");
    }
  };
  return (
    <div className="add__div">
      {msg !== "" ? (
        <span className="success">{msg}</span>
      ) : (
        <span className="error">{error}</span>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul className="add__ul">
          <li>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter alg Name"
              onChange={(e) => handleChange(e, "name")}
            />
          </li>
          <li>
            <label htmlFor="notation">Notation:</label>
            <input
              type="text"
              name="notation"
              id="notation"
              value={formData.notation}
              placeholder="Enter Alg Notation"
              onChange={(e) => handleChange(e, "notation")}
            />
          </li>
          <li>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              name="description"
              id="description"
              value={formData.description}
              placeholder="Enter Alg description"
              onChange={(e) => handleChange(e, "description")}
            />
          </li>
          <button type="submit" className="add__submit">
            Add Algorithm
          </button>
        </ul>
      </form>
    </div>
  );
};

export default EDIT;
