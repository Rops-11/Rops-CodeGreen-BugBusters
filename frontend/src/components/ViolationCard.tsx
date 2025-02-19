import { useDeleteViolation } from "../hooks/violation-hooks/useDeleteViolation";
import { useState, useRef, useEffect } from "react";
import { Violation } from "../types/datatypes";
import { useEditViolation } from "../hooks/violation-hooks/useEditViolation";
import useUpdateStatus from "../hooks/useUpdateStatus";
import useAuth from "../hooks/context-hooks/useAuth";
import { AuthContextType } from "../types/user.types";

const ViolationCard = ({ violation }: { violation: Violation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedViolation, setEditedViolation] = useState<Violation>(violation);
  const { deleteViolation } = useDeleteViolation();
  const { updateViolation } = useEditViolation();
  const { handleUpdateStatus } = useUpdateStatus();
  const { auth }: AuthContextType = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const date = new Date(violation.violation_date!);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedViolation((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteViolation = () => {
    deleteViolation(violation.id!);
    setIsMenuOpen(false);
  };

  const handleEditButton = () => {
    if (isEditing) {
      handleEditViolation();
    } else {
      setIsEditing(true);
    }
  };

  const handleStatusClick = async () => {
    if (auth?.isAdmin) {
      await handleUpdateStatus(violation.id!);
    }
  };

  const handleEditViolation = () => {
    updateViolation(editedViolation);
    setIsEditing(false);
    setIsMenuOpen(false);
  };

  const handleCancelEdit = () => {
    if (isEditing) {
      setIsEditing(false);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-b-2 border-t-2 border-t-transparent border-b-inputfield space-y-[10px] relative">
      <div className="space-y-3 p-3">
        <div className="flex space-x-4">
          <div className="flex-1">
            <h1 className="text-white font-syke-light lg:text-lg md:text-md text-sm">
              Violation
            </h1>
            {isEditing ? (
              <input
                type="text"
                name="violation_type"
                value={editedViolation.violation_type}
                onChange={handleInputChange}
                className="text-input"
              />
            ) : (
              <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-lg text-md">
                {violation.violation_type || "- N/A -"}
              </h1>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-white font-syke-light lg:text-lg md:text-md text-sm">
              Date of Violation
            </h1>
            {isEditing ? (
              <input
                type="date"
                name="violation_date"
                value={editedViolation.violation_date}
                onChange={handleInputChange}
                className="date-input"
              />
            ) : (
              <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-lg text-md">
                {violation.violation_date
                  ? `${year}/${month}/${day}`
                  : "- N/A -"}
              </h1>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <h1 className="text-white font-syke">Description</h1>
            {isEditing ? (
              <input
                type="text"
                name="description"
                value={editedViolation.description}
                onChange={handleInputChange}
                className="text-input"
              />
            ) : (
              <h1 className="text-textgreen font-syke lg:text-lg md:text-md text-sm lg:w-lg md:w-md w-sm break-normal">
                {violation.description || "- N/A -"}
              </h1>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-white font-syke-light lg:text-lg md:text-md text-sm">
              Status
            </h1>
            <span
              onClick={handleStatusClick}
              className="text-textgreen hover:text-blue-200 hover:cursor-pointer font-syke-medium lg:text-xl md:text-lg text-md"
            >
              {violation.paid_status ? "Paid" : "Unpaid"}
            </span>
          </div>
        </div>
      </div>

      <div
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20"
        ref={dropdownRef}
      >
        <button
          className="text-white px-2 py-1 rounded-full hover:bg-lime-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="lg:text-2xl md:text-lg text-md">⋮</span>
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              onClick={handleEditButton}
            >
              {isEditing ? "Update" : "Edit"}
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-500"
              onClick={isEditing ? handleCancelEdit : handleDeleteViolation}
            >
              {isEditing ? "Cancel" : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViolationCard;
