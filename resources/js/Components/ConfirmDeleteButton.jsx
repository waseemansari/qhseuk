import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { router } from "@inertiajs/react";
import { showNotification } from "./Notification"; // adjust path if needed
import { Trash } from "lucide-react";

export default function ConfirmDeleteButton({ id, routeName, title = "Delete" }) {
  // console.log('routeName',routeName);
  
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FA5252",
      cancelButtonColor: "#FA5252",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      backdrop: true,
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route(`${routeName}.destroy`, id), {
          preserveScroll: true,
          onSuccess: () => {
            showNotification("Item deleted successfully!", "success", 3000);
          },
          onError: () => {
            showNotification("Failed to delete item!", "error", 3000);
          },
        });
      }
    });
  };

  return (
    
     <button
    className="dropdown-item d-flex align-items-center"
     onClick={handleDelete}
    >
    <Trash size={16} className="dropdown-icon text-danger me-2" />
    {title}
    </button>
  );
}
