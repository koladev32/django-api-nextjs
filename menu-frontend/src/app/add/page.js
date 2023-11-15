"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
async function createMenu(data) {
  const res = await fetch("http://127.0.0.1:8000/api/menu/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create data");
  }

  return res.json();
}

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onFinish = (event) => {
    setIsLoading(true);
    event.preventDefault();
    createMenu(formData)
      .then(() => {
        router.replace("/?action=add");
      })
      .catch((reason) => {
        setError("An error occured");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  });

  return (
    <form onSubmit={onFinish}>
      <div className="form-item">
        <label htmlFor="name">Name</label>
        <input
          required
          name="name"
          value={formData.name}
          onChange={(event) =>
            setFormData({
              ...formData,
              name: event.target.value,
            })
          }
        />
      </div>
      <div className="form-item">
        <label htmlFor="price">Price</label>
        <input
          required
          type="number"
          name="price"
          value={formData.price}
          onChange={(event) =>
            setFormData({
              ...formData,
              price: event.target.value,
            })
          }
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div>
        <button
          disabled={isLoading}
          className="add-button"
          type="submit"
          name="price"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Page;
