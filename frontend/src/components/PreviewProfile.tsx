import { DriverWithVandC } from "../types/datatypes";
import { useNavigate } from "react-router-dom";

const PreviewProfile = ({
  selectedEntry,
}: {
  selectedEntry: DriverWithVandC;
}) => {
  const navigate = useNavigate();
  const handleViewProfile = () => {
    if (!selectedEntry) return;
    navigate(`/view-profile/${selectedEntry.id}`);
  };

  const handleSendNotification = () => {
    if (!selectedEntry) return;
    navigate(`/send-notif/${selectedEntry.id}`);
  };

  return (
    <div className="items-center p-6">
      <div className="text-left font-syke-light text-textgreen mb-5">
        <h1 className="text-4xl font-syke-bold">Driver Details</h1>
        <div>Driver's key data.</div>
      </div>
      <form className="space-y-[2rem]">
        <div className="flex w-full">
          <div className="flex-1">
            <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
              Last Name
            </h1>
            <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
              {selectedEntry.last_name || "- N/A -"}
            </h1>
          </div>
          <div className="flex-1">
            <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
              First Name
            </h1>
            <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
              {selectedEntry.first_name || "- N/A -"}
            </h1>
          </div>
        </div>

        <div className="flex w-full">
          <div className="flex-2 w-3/12">
            <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
              Sex
            </h1>
            <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
              {selectedEntry.sex || "- N/A -"}
            </h1>
          </div>
          <div className="flex-2 w-5/12">
            <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
              Date of Birth
            </h1>
            <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
              {selectedEntry.date_of_birth || "MM/DD/YY"}
            </h1>
          </div>
          <div className="flex-2 w-4/12">
            <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
              Driver Type
            </h1>
            <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
              {selectedEntry.driver_type || "- N/A -"}
            </h1>
          </div>
        </div>

        <div className="w-full">
          <div className="flex">
            <div className="flex-1">
              <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
                License Number
              </h1>
              <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
                {selectedEntry.license_number || "- N/A -"}
              </h1>
            </div>
            <div className="flex-1">
              <h1 className="text-white font-syke-light lg:text-lg md:text-xs sm:text-sm xs:text-xs text-2xs">
                License Expiration Date
              </h1>
              <h1 className="text-textgreen font-syke-medium lg:text-xl md:text-xs sm:text-lg xs:text-sm text-xs">
                {selectedEntry.license_expiration_date || "- N/A -"}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-row-reverse">
          <button
            onClick={handleSendNotification}
            className="p-2 px-4 w-2/6 ml-4 lg:text-md md:text-xs sm:text-sm xs:text-xs text-2xs bg-buttongreen active:bg-colorhover transition-colors rounded-sm text-white font-syke-bold">
            Notify
          </button>
          <button
            onClick={handleViewProfile}
            className="p-2 px-4 w-2/6 lg:text-md md:text-xs sm:text-sm xs:text-xs text-2xs bg-buttongreen active:bg-colorhover transition-colors rounded-sm text-white font-syke-bold">
            View Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreviewProfile;
