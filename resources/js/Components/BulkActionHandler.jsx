import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { showNotification } from "@/Components/Notification";

export default function BulkActionHandler({ data, title }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [bulkAction, setBulkAction] = useState("");

  // 🔹 Select / Deselect single checkbox
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // 🔹 Select / Deselect all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = data.data.map((row) => row.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  // 🔹 Bulk action handler
  const handleBulkAction = () => {
    if (bulkAction === "3" && selectedIds.length > 0) {
        if (confirm(`Delete ${selectedIds.length} selected records?`)) {
            router.post(
            route(`${title.toLowerCase()}.bulkDelete`),
                { ids: selectedIds },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                    showNotification("Item deleted successfully!", "success", 3000);
                    setSelectedIds([]);
                    },
                }
            );
        }
    }
    if (bulkAction === "2" && selectedIds.length > 0) {
        router.post(route('student.enrollElearning'),
            { ids: selectedIds },
            {
                preserveScroll: true,
                onSuccess: () => {
                showNotification("Students Enrolled successfully!", "success", 3000);
                setSelectedIds([]);
                },
            }
            );
    }
  };

  return {
    selectedIds,
    handleCheckboxChange,
    handleSelectAll,
    bulkAction,
    setBulkAction,
    handleBulkAction,
  };
}
