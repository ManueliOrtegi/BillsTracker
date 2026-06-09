"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

//#region Interface
export interface Bill {
  id: string;
  Name: string;
  Description: string;
  Salary: number;
  TotalExpenses: number;
  RemainingBalance: number;
}
//#endregion

const Bills = () => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const loadBills = async () => {
      // Load from your view or RPC
      // Example only
      const { data, error } = await supabase.from("BillsSummary").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setBills(data || []);
    };
    loadBills();
  }, []);

  const handleView = (bill: Bill) => {
    console.log("View Bill", bill.id);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Bills</h3>

        <button type="button" className="btn btn-primary">
          + Add Bill
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th className="text-end">Salary</th>
                  <th className="text-end">Expenses</th>
                  <th className="text-end">Remaining</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bills.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-3">
                      No bills found
                    </td>
                  </tr>
                ) : (
                  bills.map((bill) => (
                    <tr key={bill.id}>
                      <td>{bill.Name}</td>

                      <td>{bill.Description}</td>

                      <td className="text-end">
                        {bill.Salary.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        })}
                      </td>

                      <td className="text-end">
                        {bill.TotalExpenses.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        })}
                      </td>

                      <td className="text-end">
                        <span
                          className={`fw-bold ${
                            bill.RemainingBalance < 0
                              ? "text-danger"
                              : "text-success"
                          }`}
                        >
                          {bill.RemainingBalance.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          })}
                        </span>
                      </td>

                      <td>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleView(bill)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;
