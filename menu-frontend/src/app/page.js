"use client";

import { useEffect, useState } from "react";

async function getData() {
  const res = await fetch("http://127.0.0.1:8000/api/menu/");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const MenuItem = ({ id, name, price, onEdit, onDelete }) => {
  return (
    <div className="menu-item" data-id={id}>
      <div className="menu-item-info">
        <div className="menu-item-name">{name}</div>
        <div className="menu-item-price">${price.toFixed(2)}</div>
      </div>
      <div className="menu-item-actions">
        <button className="edit-button" onClick={() => onEdit(id)}>
          Edit
        </button>
        <button className="delete-button" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default function Page() {
  const [menuItems, setMenuItems] = useState(null);

  useEffect(
    () => async () => {
      const data = await getData();
      if (data) {
        setMenuItems(data);
      }
    },
    []
  );

  const handleDelete = (id) => {
    // Logic to delete the menu item
    console.log("Delete item with id:", id);
    setMenuItems((items) => items.filter((item) => item.id !== id));
  };

  console.log(menuItems);

  return (
    <main className="menu-container">
      {!!menuItems ? (
        menuItems.map((item) => (
          <MenuItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            onEdit={undefined}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p>Loading</p>
      )}
    </main>
  );
}
