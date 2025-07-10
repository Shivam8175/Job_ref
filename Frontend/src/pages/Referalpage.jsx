import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const ReferralForm = () => {
  const [file, setFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Full name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits")
      .required("Phone number is required"),
    jobTitle: Yup.string()
      .required("Job title is required")
      .min(3, "Job title must be at least 3 characters"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      jobTitle: "",
      resume: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        setSubmitStatus(null);
        setErrorMessage("");

        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });
        if (file) {
          formData.append("resume", file);
        }

        const response = await axios.post(
          "http://localhost:2013/candidates/addcandidate",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.data && response.data.success) {
          setSubmitStatus("success");
          formik.resetForm();
          setFile(null);
        } else {
          setSubmitStatus("error");
          setErrorMessage(
            response.data.message || "Submission failed. Please try again."
          );
        }
      } catch (error) {
        setSubmitStatus("error");
        if (error.response) {
          setErrorMessage(
            error.response.data.message ||
              `Server error: ${error.response.status}`
          );
        } else if (error.request) {
          setErrorMessage("Network error. Please check your connection.");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        e.target.value = "";
        return;
      }
      setFile(selectedFile);
      formik.setFieldValue("resume", selectedFile);
    } else {
      alert("Please upload a PDF file only");
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Refer a Candidate
          </h1>
          <p className="text-lg text-gray-600">
            Help us find the best talent by referring qualified candidates
          </p>
        </div>

        {submitStatus === "success" && (
          <div className="mb-8 rounded-md bg-green-50 p-4">
            <div className="flex items-center">
              <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
              <h3 className="text-sm font-medium text-green-800">
                Successfully submitted!
              </h3>
            </div>
            <p className="mt-2 text-sm text-green-700">
              Thank you for your referral. We'll review the candidate shortly.
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setSubmitStatus(null)}
                className="rounded-md bg-green-50 text-sm font-medium text-green-800 hover:bg-green-100 focus:outline-none"
              >
                Refer another candidate
              </button>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-8 rounded-md bg-red-50 p-4">
            <div className="flex">
              <XCircleIcon className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Submission failed
                </h3>
                <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setSubmitStatus(null)}
                className="rounded-md bg-red-50 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {!submitStatus && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <form
              onSubmit={formik.handleSubmit}
              className="px-6 py-5 space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g. John Doe"
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. john@example.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="10-digit phone"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.jobTitle}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g. Frontend Developer"
                />
                {formik.touched.jobTitle && formik.errors.jobTitle && (
                  <p className="mt-2 text-sm text-red-600">
                    {formik.errors.jobTitle}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Resume (PDF)
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    formik.isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {formik.isSubmitting ? "Submitting..." : "Submit Referral"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralForm;
