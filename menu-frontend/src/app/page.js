"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const params = useSearchParams();

  const [displaySuccessMessage, setDisplaySuccessMessage] = useState({
    show: false,
    type: "", // either add or edit
  });

  useEffect(
    () => async () => {
      const data = await getData();
      if (data) {
        setMenuItems(data);
      }
    },
    [],
  );

  useEffect(() => {
    if (!!params.get("action")) {
      setDisplaySuccessMessage({
        type: "add",
        show: true,
      });
      router.replace("/");
    }
  }, [params, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (displaySuccessMessage.show) {
        setDisplaySuccessMessage({
          show: false,
          type: "",
        });
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [displaySuccessMessage.show]);

  const handleDelete = (id) => {
    // Logic to delete the menu item
    console.log("Delete item with id:", id);
    setMenuItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <button className="add-button" onClick={() => router.push("/add")}>
        Add
      </button>
      {displaySuccessMessage.show && (
        <p className="success-message">
          {displaySuccessMessage.type === "add" ? "Added a" : "Modified a"} menu
        </p>
      )}
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
    </div>
  );
}
