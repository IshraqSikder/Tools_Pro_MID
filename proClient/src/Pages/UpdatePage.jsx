import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    // Fetch the patient data by ID and populate the form
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/get-patient/${id}`
        );
        if (data) {
          // Set form values
          setValue("patientName", data.patientName);
          setValue("age", data.age);
          setValue("symptoms", data.symptoms);
          setValue("diagnosis", data.diagnosis);
          setValue("prescription", data.prescription);
        }
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
      }
    };

    fetchPatient();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/update-patient/${id}`,
        data
      );
      if (response.data.success) {
        alert("Patient updated successfully!");
        navigate("/patientlist"); // Navigate back to patient list
      }
    } catch (error) {
      console.error("Failed to update patient:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[500px]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Update Patient
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Patient Name</label>
            <input
              {...register("patientName")}
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter patient name"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Age</label>
            <input
              {...register("age")}
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter patient age"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Symptoms</label>
            <textarea
              {...register("symptoms")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter symptoms"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Diagnosis</label>
            <textarea
              {...register("diagnosis")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter diagnosis"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Prescription</label>
            <textarea
              {...register("prescription")}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter prescription"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition duration-300">
            Update Patient
          </button>
        </form>
      </div>
    </div>
  );

};

export default UpdatePage;
