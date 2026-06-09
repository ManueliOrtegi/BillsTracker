"use client";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

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

interface Props {
  bill?: Bill | null;
  onClose: () => void;
  onSave: (billName: string) => void;
  AlertType: (alertType: "success" | "danger" | "warning" | "info") => void;
}

const cutoff = ["1st", "2nd"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const AddBillModal = ({ bill, onClose, onSave }: Props) => {
  const [cutOff, setCutOff] = useState(bill?.Cut_off ?? "");
  const [billName, setBillName] = useState(bill?.Name ?? "");
  const [category, setCategory] = useState(bill?.Category ?? "");
  const [amount, setAmount] = useState(bill?.Amount.toString() ?? "");
  const [dueDate, setDueDate] = useState(bill?.DueDate ?? "");
  const [status, setStatus] = useState(bill?.Status);

  const [selectedMonth, setSelectedMonth] = useState("January");

  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{bill ? "Edit Bill" : "Add Bill"}</h5>

            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {/* Month */}
            <div className="mb-3">
              <label className="form-label">Month</label>
              <select
                className="form-select"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            {/* Cut Off */}
            <div className="mb-3">
              <label className="form-label">Cut Off</label>
              <select
                className="form-select"
                value={cutOff}
                onChange={(e) => setCutOff(e.target.value)}
              >
                {cutoff.map((cutoff) => (
                  <option key={cutoff} value={cutoff}>
                    {cutoff}
                  </option>
                ))}
              </select>
            </div>

            {/* Bill Name */}
            <div className="mb-3">
              <label className="form-label">Bill Name</label>

              <input
                type="text"
                className="form-control"
                value={billName}
                onChange={(e) => setBillName(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>

              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Utilities</option>
                <option>Internet</option>
                <option>Rent</option>
                <option>Insurance</option>
                <option>Subscription</option>
                <option>Loan</option>
                <option>Others</option>
              </select>
            </div>

            {/* Amount */}
            <div className="mb-3">
              <label className="form-label">Amount</label>

              <input
                type="number"
                className="form-control"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            {/* Due Date */}
            <div className="mb-3">
              <label className="form-label">Due Date</label>

              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label">Status</label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Paid</option>
                <option>Unpaid</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={async () => {
                const { data, error } = bill
                  ? await supabase
                      .from("BillItems")
                      .update([
                        {
                          Name: billName,
                          Month: selectedMonth,
                          Cut_off: cutOff,
                          Category: category,
                          Amount: Number(amount),
                          DueDate: dueDate,
                          Status: status,
                          CreatedDate: new Date().toISOString().split("T")[0],
                        },
                      ])
                      .eq("id", bill.id)
                      .select()
                  : await supabase
                      .from("BillItems")
                      .insert([
                        {
                          Name: billName,
                          Month: selectedMonth,
                          Cut_off: cutOff,
                          Category: category,
                          Amount: Number(amount),
                          DueDate: dueDate,
                          Status: status,
                          CreatedDate: new Date().toISOString().split("T")[0],
                        },
                      ])
                      .select();

                console.log("Updated rows:", data);
                console.log("INSERT DATA:", data);
                console.log("INSERT ERROR:", error);

                if (!error) {
                  onSave(billName);
                }
              }}
            >
              {bill ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBillModal;
