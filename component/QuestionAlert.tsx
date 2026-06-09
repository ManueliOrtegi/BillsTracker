"use client";

interface Props {
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({ itemName, onConfirm, onCancel }: Props) => {
  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>

            <button type="button" className="btn-close" onClick={onCancel} />
          </div>

          <div className="modal-body">
            <p>
              Do you really want to delete <strong>{itemName}</strong>?
            </p>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              No
            </button>

            <button className="btn btn-danger" onClick={onConfirm}>
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
