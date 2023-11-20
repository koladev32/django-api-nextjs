"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Sends a POST request to create a new menu item.
 * @param {Object} data The menu item data to be sent.
 */
async function createMenu(data) {
  const res = await fetch("http://127.0.0.1:8000/api/menu/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles the form submission.
   * @param {Event} event The form submission event.
   */
  const onFinish = (event) => {
    event.preventDefault();
    setIsLoading(true);
    createMenu(formData)
      .then(() => {
        // Navigate to the main page with a query parameter indicating success
        router.replace("/?action=add");
      })
      .catch(() => {
        setError("An error occurred");
        setIsLoading(false);
      });
  };

  // Cleanup effect for resetting loading state
  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return (
    <form onSubmit={onFinish}>
      <div className="form-item">
        <label htmlFor="name">Name</label>
        <input
          required
          name="name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
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
            setFormData({ ...formData, price: event.target.value })
          }
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <div>
        <button disabled={isLoading} className="add-button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Page;
