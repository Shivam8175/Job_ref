import { useState, useContext, useEffect } from "react";
import { CandidateContext } from "../context/CandidateContext";
import CandidateCard from "../components/CandidateCard";
import CandidateForm from "../components/CandidateForm";
import {
  ArrowPathIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChartBarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/solid";
import { debounce } from "lodash";

export default function DashboardPage() {
  const {
    candidates,
    loading,
    error,
    addCandidate,
    fetchCandidates,
    setFilters,
  } = useContext(CandidateContext);

  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    status: null,
    jobTitle: null,
  });

  const debouncedSearch = debounce((query) => {
    setFilters((prev) => ({ ...prev, search: query }));
  }, 300);

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery]);

  const handleSubmit = async (formData) => {
    const result = await addCandidate(formData);
    if (result.success) {
      setShowForm(false);
      fetchCandidates();
    }
    return result;
  };

  const handleStatusFilter = (status) => {
    const newStatus = activeFilters.status === status ? null : status;
    setActiveFilters((prev) => ({ ...prev, status: newStatus }));
    setFilters((prev) => ({ ...prev, status: newStatus }));
  };

  const handleJobTitleFilter = (title) => {
    const newTitle = activeFilters.jobTitle === title ? null : title;
    setActiveFilters((prev) => ({ ...prev, jobTitle: newTitle }));
    setFilters((prev) => ({ ...prev, jobTitle: newTitle }));
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setActiveFilters({ status: null, jobTitle: null });
    setFilters({ search: "", status: null, jobTitle: null });
  };

  const stats = {
    total: candidates.length,
    pending: candidates.filter((c) => c.status === "Pending").length,
    reviewed: candidates.filter((c) => c.status === "Reviewed").length,
    hired: candidates.filter((c) => c.status === "Hired").length,
  };

  const uniqueJobTitles = [...new Set(candidates.map((c) => c.jobTitle))];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Candidate Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track your candidate referrals
            </p>
          </div>
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={() => fetchCandidates()}
              className="inline-flex items-center px-3 sm:px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" />
              Refresh
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center px-3 sm:px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
              {showForm ? "Cancel" : "New Candidate"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<UserGroupIcon className="h-6 w-6 text-white" />}
            iconBg="bg-indigo-500"
            title="Total Candidates"
            value={stats.total}
          />
          <StatCard
            icon={<ChartBarIcon className="h-6 w-6 text-white" />}
            iconBg="bg-yellow-500"
            title="Pending"
            value={stats.pending}
            onClick={() => handleStatusFilter("Pending")}
            active={activeFilters.status === "Pending"}
          />
          <StatCard
            icon={<ChartBarIcon className="h-6 w-6 text-white" />}
            iconBg="bg-blue-500"
            title="Reviewed"
            value={stats.reviewed}
            onClick={() => handleStatusFilter("Reviewed")}
            active={activeFilters.status === "Reviewed"}
          />
          <StatCard
            icon={<ChartBarIcon className="h-6 w-6 text-white" />}
            iconBg="bg-green-500"
            title="Hired"
            value={stats.hired}
            onClick={() => handleStatusFilter("Hired")}
            active={activeFilters.status === "Hired"}
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-8 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Search & Filters
            </h3>
          </div>
          <div className="px-6 py-5 space-y-4">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search by name, email, or phone"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {(activeFilters.status ||
              activeFilters.jobTitle ||
              searchQuery) && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                {searchQuery && (
                  <FilterPill
                    label={`Search: "${searchQuery}"`}
                    onRemove={() => {
                      setSearchQuery("");
                      setFilters((prev) => ({ ...prev, search: "" }));
                    }}
                  />
                )}
                {activeFilters.status && (
                  <FilterPill
                    label={`Status: ${activeFilters.status}`}
                    onRemove={() => handleStatusFilter(activeFilters.status)}
                  />
                )}
                {activeFilters.jobTitle && (
                  <FilterPill
                    label={`Job: ${activeFilters.jobTitle}`}
                    onRemove={() =>
                      handleJobTitleFilter(activeFilters.jobTitle)
                    }
                  />
                )}
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center">
                <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Quick Filters:
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Status:</span>
                  {["Pending", "Reviewed", "Hired"].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusFilter(status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activeFilters.status === status
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {uniqueJobTitles.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Job Title:</span>
                    {uniqueJobTitles.slice(0, 3).map((title) => (
                      <button
                        key={title}
                        onClick={() => handleJobTitleFilter(title)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          activeFilters.jobTitle === title
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {title}
                      </button>
                    ))}
                    {uniqueJobTitles.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{uniqueJobTitles.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Refer a New Candidate
              </h3>
            </div>
            <div className="px-6 py-5">
              <CandidateForm onSubmit={handleSubmit} />
            </div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Candidate Referrals
            </h3>
            <div className="text-sm text-gray-500">
              Showing {candidates.length}{" "}
              {candidates.length === 1 ? "candidate" : "candidates"}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="rounded-md bg-red-50 p-4 mx-6 my-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <XMarkIcon className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : candidates.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <li key={candidate._id}>
                  <CandidateCard candidate={candidate} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState onAddCandidate={() => setShowForm(true)} />
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, iconBg, title, value, onClick, active }) {
  return (
    <div
      className={`bg-white overflow-hidden shadow rounded-lg cursor-pointer transition-all ${
        active ? "ring-2 ring-indigo-500" : ""
      }`}
      onClick={onClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${iconBg} rounded-md p-3`}>{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {value}
              </div>
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterPill({ label, onRemove }) {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
      {label}
      <button
        onClick={onRemove}
        className="ml-1.5 inline-flex items-center justify-center rounded-full h-4 w-4 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-900"
      >
        <XMarkIcon className="h-3 w-3" />
      </button>
    </div>
  );
}

function EmptyState({ onAddCandidate }) {
  return (
    <div className="text-center py-16">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">
        No candidates found
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Try adjusting your search or filter criteria
      </p>
      <div className="mt-6">
        <button
          type="button"
          onClick={onAddCandidate}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          New Candidate
        </button>
      </div>
    </div>
  );
}
