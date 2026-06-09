"use client";
import { supabase } from "@/lib/supabase";

import { useState } from "react";
import BillsItem from "@/component/Bill-Items/BillsItem";
import Alert from "@/component/Shared/Alert";
import BillsModal from "@/component/Bill-Items/BillsModal";
import DeleteConfirmModal from "@/component/QuestionAlert";

//#region Bill properties
export interface Bill {
  id: string;
  Month: string;
  Cut_off: string;
  UserId: string;
  Name: string;
  Category: string;
  Amount: number;
  DueDate: string;
  Status: string;
  CreatedDate: string;
}
//#endregion

export default function BillsPage() {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<
    "success" | "danger" | "warning" | "info"
  >("success");
  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div>
      {alertMessage && (
        <Alert
          type={alertType}
          message={alertMessage}
          onClose={() => setAlertMessage("")}
        />
      )}
      <BillsItem
        refreshKey={refreshKey}
        onDelete={(bill) => {
          setSelectedBill(bill);
          setShowDeleteModal(true);
        }}
        onEdit={(bill) => {
          console.log("Received bill:", bill);
          setSelectedBill(bill);
          setShowModal(true);
        }}
        AlertType={(alertType) => {
          setAlertType(alertType);
        }}
        onAdd={() => setShowModal(true)}
      />

      {showModal && (
        <BillsModal
          onClose={() => setShowModal(false)}
          onSave={(billName) => {
            setAlertMessage(`${billName} added successfully!`);
            setShowModal(false);
            setRefreshKey((prev) => prev + 1);
          }}
          AlertType={(alertType) => {
            setAlertType(alertType);
          }}
          bill={selectedBill}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          itemName={selectedBill?.Name ?? ""}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            if (!selectedBill) return;

            const { error } = await supabase
              .from("BillItems")
              .delete()
              .eq("id", selectedBill.id);

            if (error) {
              console.error(error);
              setAlertType("danger");
              setAlertMessage("Failed to delete bill.");
              return;
            }

            setAlertType("success");
            setAlertMessage(`${selectedBill.Name} deleted successfully!`);

            setShowDeleteModal(false);
            setSelectedBill(null);
            setRefreshKey((prev) => prev + 1);
          }}
        />
      )}
    </div>
  );
}
