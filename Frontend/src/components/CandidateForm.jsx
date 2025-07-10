import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone number must be 10-15 digits")
    .required("Phone number is required"),
  jobTitle: Yup.string().required("Job title is required"),
});

export default function CandidateForm({ onSubmit }) {
  const [resumeFile, setResumeFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      jobTitle: "",
      resume: null,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("jobTitle", values.jobTitle);
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const result = await onSubmit(formData);
      if (result.success) {
        resetForm();
        setResumeFile(null);
      }
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      e.target.value = "";
      alert("Please upload a PDF file only");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        {formik.touched.name && formik.errors.name ? (
          <p className="mt-2 text-sm text-red-600">{formik.errors.name}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <p className="mt-2 text-sm text-red-600">{formik.errors.phone}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="jobTitle"
          className="block text-sm font-medium text-gray-700"
        >
          Job Title
        </label>
        <input
          id="jobTitle"
          name="jobTitle"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.jobTitle}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
        {formik.touched.jobTitle && formik.errors.jobTitle ? (
          <p className="mt-2 text-sm text-red-600">{formik.errors.jobTitle}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="resume"
          className="block text-sm font-medium text-gray-700"
        >
          Resume (PDF only)
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? "Submitting..." : "Refer Candidate"}
        </button>
      </div>
    </form>
  );
}
