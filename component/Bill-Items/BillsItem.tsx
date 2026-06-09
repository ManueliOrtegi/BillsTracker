"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Props {
  onDelete: (bill: Bill) => void;
  onEdit: (bill: Bill) => void;
  onAdd: (billName: string) => void;
  AlertType: (alertType: "success" | "danger" | "warning" | "info") => void;
  refreshKey: number;
}
//#region Interface
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

export interface CutOff {
  Month: string;
  Cut_off: string;
}

//#endregion

const months = [
  "Select Month",
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

const BillsItems = ({
  onDelete,
  onEdit,
  onAdd,
  AlertType,
  refreshKey,
}: Props) => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [cut_off, setCut_off] = useState<CutOff[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("Select Month");
  const [selectedCutOff, setSelectedCutOff] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadCutOff = async () => {
      const { data, error } = await supabase
        .from("BillItems")
        .select(`Month, Cut_off`)
        .eq("Month", selectedMonth)
        .order("Cut_off");

      if (error) {
        console.error(error);
        return;
      }

      const distinctCutOffs = [...new Set(data?.map((x) => x.Cut_off) ?? [])];

      setCut_off([
        { Month: "", Cut_off: "" },
        ...distinctCutOffs.map((cutOff) => ({
          Month: selectedMonth,
          Cut_off: cutOff,
        })),
      ]);
    };
    loadCutOff();
  }, [selectedMonth]);

  useEffect(() => {
    const loadBills = async () => {
      let query = supabase
        .from("BillItems")
        .select("*")
        .eq("Month", selectedMonth);

      if (selectedCutOff !== "") {
        query = query.eq("Cut_off", selectedCutOff).order("CreatedDate");
      }
      const { data, error } = await query;

      if (error) {
        console.error(error);
        return;
      }

      setBills(data ?? []);
    };

    loadBills();
  }, [selectedMonth, selectedCutOff, refreshKey]);

  const filteredBills = bills.filter(
    (bill) =>
      bill.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.Category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            onAdd("");
            AlertType("info");
          }}
        >
          + Add Item
        </button>

        <div className="d-flex gap-2">
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

          <select
            className="form-select"
            value={selectedCutOff}
            onChange={(e) => setSelectedCutOff(e.target.value)}
          >
            {cut_off.map((cutoff) => (
              <option key={cutoff.Cut_off} value={cutoff.Cut_off}>
                {cutoff.Cut_off}
              </option>
            ))}
          </select>

          <input
            type="text"
            className="form-control"
            placeholder="Search Bill Name or Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Month</th>
                <th>Cut Off</th>
                <th>Bill Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-3">
                    No bills found
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill) => (
                  <tr key={bill.id}>
                    <td>{bill.Month}</td>
                    <td>{bill.Cut_off}</td>
                    <td>{bill.Name}</td>
                    <td>{bill.Category}</td>
                    <td>{bill.Amount.toFixed(2)}</td>
                    <td>{bill.DueDate}</td>
                    <td>
                      <span
                        className={`badge ${
                          bill.Status === "Paid" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {bill.Status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => {
                          onEdit(bill);
                          // AlertType("success");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          onDelete(bill);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BillsItems;
