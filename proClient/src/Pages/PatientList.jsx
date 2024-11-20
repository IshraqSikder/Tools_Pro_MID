import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/get-patient`);
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Delete patient by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete-patient/${id}`);
      setPatients(patients.filter((patient) => patient._id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Patient List
        </h1>
        {patients.length === 0 ? (
          <p>Loading patients...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-gray-800">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Age</th>
                  <th className="p-3 border">Symptoms</th>
                  <th className="p-3 border">Diagnosis</th>
                  <th className="p-3 border">Prescription</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={patient._id}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100 transition duration-200`}>
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{patient.patientName}</td>
                    <td className="p-3 border">{patient.age}</td>
                    <td className="p-3 border">{patient.symptoms}</td>
                    <td className="p-3 border">{patient.diagnosis}</td>
                    <td className="p-3 border">{patient.prescription}</td>
                    <td className="p-3 border space-x-2">
                      <Link
                        to={`/patient-update/${patient._id}`}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(patient._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

};

export default PatientList;
