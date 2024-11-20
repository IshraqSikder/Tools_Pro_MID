import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { patientName, age, symptoms, diagnosis, prescription } = data;
    console.log(data);
    try {
      const patientInfo = {
        patientName,
        age,
        symptoms,
        diagnosis,
        prescription,
      };
      const { data } = await axios.post(
        `http://localhost:5000/add-patient`,
        patientInfo
      );
      console.log(data);
      if (data.acknowledged === true) {
        navigate("/patientlist");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-xl rounded-lg p-8 w-[500px]">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">
          Register Patient
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2">
              Patient Name
            </label>
            <input
              type="text"
              placeholder="Enter Patient Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("patientName", {
                required: "Patient Name is required",
              })}
            />
            {errors.patientName && (
              <small className="text-red-500">
                {errors.patientName.message}
              </small>
            )}
          </div>
          <div>
            <label
              htmlFor="age"
              className="block text-gray-700 font-medium mb-2">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter Patient Age"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("age", { required: "Age is required" })}
            />
            {errors.age && (
              <small className="text-red-500">{errors.age.message}</small>
            )}
          </div>
          <div>
            <label
              htmlFor="symptoms"
              className="block text-gray-700 font-medium mb-2">
              Symptoms
            </label>
            <textarea
              placeholder="Enter Symptoms"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("symptoms", { required: "Symptoms are required" })}
            />
            {errors.symptoms && (
              <small className="text-red-500">{errors.symptoms.message}</small>
            )}
          </div>
          <div>
            <label
              htmlFor="diagnosis"
              className="block text-gray-700 font-medium mb-2">
              Diagnosis
            </label>
            <textarea
              placeholder="Enter Diagnosis"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("diagnosis", { required: "Diagnosis is required" })}
            />
            {errors.diagnosis && (
              <small className="text-red-500">{errors.diagnosis.message}</small>
            )}
          </div>
          <div>
            <label
              htmlFor="prescription"
              className="block text-gray-700 font-medium mb-2">
              Prescription
            </label>
            <textarea
              placeholder="Enter Prescription"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("prescription", {
                required: "Prescription is required",
              })}
            />
            {errors.prescription && (
              <small className="text-red-500">
                {errors.prescription.message}
              </small>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300">
            Register Patient
          </button>
        </form>
      </div>
    </div>
  );

};

export default HomePage;
