import { useState } from "react";
import { useContext } from "react";
import { CandidateContext } from "../context/CandidateContext";

export default function CandidateCard({ candidate }) {
  const { updateStatus } = useContext(CandidateContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus !== candidate.status) {
      setIsUpdating(true);
      await updateStatus(candidate._id, newStatus);
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {candidate.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{candidate.jobTitle}</p>
          </div>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full status-${candidate.status.toLowerCase()}`}
          >
            {candidate.status}
          </span>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span> {candidate.email}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Phone:</span> {candidate.phone}
          </p>
          {candidate.resumeUrl && (
            <a
              href={candidate.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center mt-2 text-sm text-primary-600 hover:text-primary-800"
            >
              View Resume
            </a>
          )}
        </div>
        <div className="mt-4">
          <label htmlFor="status" className="sr-only">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={candidate.status}
            onChange={handleStatusChange}
            disabled={isUpdating}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Hired">Hired</option>
          </select>
        </div>
      </div>
    </div>
  );
}
