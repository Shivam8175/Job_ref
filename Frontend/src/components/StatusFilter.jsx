import { useContext } from "react";
import { CandidateContext } from "../context/CandidateContext";

export default function StatusFilter() {
  const { filters, setFilters } = useContext(CandidateContext);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <div>
        <label htmlFor="jobTitleFilter" className="sr-only">
          Job Title
        </label>
        <input
          type="text"
          name="jobTitle"
          id="jobTitleFilter"
          placeholder="Filter by job title"
          value={filters.jobTitle}
          onChange={handleFilterChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="statusFilter" className="sr-only">
          Status
        </label>
        <select
          id="statusFilter"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
        </select>
      </div>
    </div>
  );
}
