"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Fetches a menu item by ID.
 * @param {number} id The ID of the menu item to retrieve.
 */
async function getMenu(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/menu/${id}/`);
  if (!res.ok) {
    throw new Error("Failed to retrieve menu");
  }
  return res.json();
}

/**
 * Updates a menu item by ID.
 * @param {number} id The ID of the menu item to update.
 * @param {Object} data The updated data for the menu item.
 */
async function updateMenu(id, data) {
  const res = await fetch(`http://127.0.0.1:8000/api/menu/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update menu");
  }
  return res.json();
}

const Page = ({ params }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handles form submission.
   * @param {Event} event The form submission event.
   */
  const onFinish = (event) => {
    event.preventDefault();
    setIsLoading(true);
    updateMenu(params.menuId, formData)
      .then(() => {
        router.replace("/?action=update");
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

  // Fetch menu item data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMenu(params.menuId);
        setFormData({ name: data.name, price: data.price });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [params.menuId]);

  return (
    <form onSubmit={onFinish}>
      <div className="form-item">
        <label htmlFor="name">Name</label>
        <input
          required
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div className="form-item">
        <label htmlFor="price">Price</label>
        <input
          required
          type="number"
          name="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
