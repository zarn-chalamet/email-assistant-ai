import axios from "axios";
import { useState } from "react";

function App() {
  const [tone, setTone] = useState("None");
  const [emailContent, setEmailContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailReply, setEmailReply] = useState("");

  const backend = import.meta.env.VITE_BACKEND_URL;

  const generateReplyEmail = async () => {
    setLoading(true);
    setEmailReply(""); // Clear previous reply
    try {
      const response = await axios.post(backend + "/api/email/generate", {
        emailContent,
        tone,
      });
      setEmailReply(response.data);
    } catch (error) {
      setError("Error while generating email reply!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailReply);
    alert("Copied to clipboard!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Email Reply Generator
        </h1>

        {/* Input Field */}
        <textarea
          placeholder="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
        ></textarea>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Dropdown for Tone Selection */}
        <div className="mt-4">
          <label className="text-sm text-gray-600 font-medium">
            Tone (Optional)
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
          >
            <option value="None">None</option>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Friendly">Friendly</option>
            <option value="Professional">Professional</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={generateReplyEmail}
          className={`w-full mt-6 py-2 rounded-lg ${
            loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          disabled={loading} // Button is disabled when loading is true
        >
          {loading ? "GENERATING REPLY" : "GENERATE REPLY"}
        </button>

        {/* Reply Email Box */}
        {emailReply && (
          <div className="mt-6 p-4 border border-gray-300 bg-gray-50 rounded-md relative">
            <h2 className="text-lg font-semibold text-gray-800">Generated Reply:</h2>
            <div className="mt-2 max-h-40 overflow-y-auto text-gray-700 whitespace-pre-wrap">
              {emailReply}
            </div>
            {/* Copy Button */}
            <button
              onClick={copyToClipboard}
              className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
