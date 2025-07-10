import { Link } from "react-router-dom";
import { UserGroupIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import { CandidateContext } from "../context/CandidateContext";
import { useContext } from "react";

export const Dashboard = () => {
  const { candidates } = useContext(CandidateContext);

  const stats = {
    total: candidates.length,
    pending: candidates.filter((c) => c.status === "Pending").length,
    hired: candidates.filter((c) => c.status === "Hired").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Candidate Referral System
          </h1>
          <p className="text-gray-600">
            Manage your candidate referrals efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/referral-form"
            className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-indigo-100 rounded-full mb-4 group-hover:bg-indigo-200 transition-colors">
                <DocumentPlusIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Refer a Candidate
              </h3>
              <p className="text-sm text-gray-500">
                Submit a new candidate referral
              </p>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="group bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 bg-indigo-100 rounded-full mb-4 group-hover:bg-indigo-200 transition-colors">
                <UserGroupIcon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                View Candidates
              </h3>
              <p className="text-sm text-gray-500">Manage existing referrals</p>
            </div>
          </Link>
        </div>

        <div className="mt-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Quick Stats
          </h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-2xl font-bold text-indigo-600">
                {stats.total}
              </p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">
                {stats.pending}
              </p>
              <p className="text-xs text-gray-500">Pending</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">{stats.hired}</p>
              <p className="text-xs text-gray-500">Hired</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
