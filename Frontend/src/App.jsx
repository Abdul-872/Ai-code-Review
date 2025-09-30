import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "prismjs/components/prism-javascript";
import "./App.css";

function App() {
  const [code, setcode] = useState(`function sum(){
  return 1 + 1;
}`);
  const [review, setReview] = useState("");

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      // Set loading state
      setReview("🔄 Reviewing your code...");
      
      // Determine API URL based on environment
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
      
      const response = await axios.post(`${API_URL}/ai/get-review`, {
        code,
      });
      
      // Handle the new API response format
      if (response.data.success) {
        setReview(response.data.review);
      } else {
        setReview(`❌ Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error while reviewing code:", error);
      
      let errorMessage = "❌ Failed to get review from server";
      
      if (error.response) {
        // Server responded with error status
        const errorData = error.response.data;
        if (errorData && errorData.error) {
          errorMessage = `❌ ${errorData.error}`;
        } else {
          errorMessage = `❌ Server error: ${error.response.status}`;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "❌ No response from server. Please check if the server is running.";
      } else {
        // Something else happened
        errorMessage = `❌ Request error: ${error.message}`;
      }
      
      setReview(errorMessage);
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(newCode) => setcode(newCode)}
            highlight={(code) =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 20,
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100%",
              width: "100%",
              backgroundColor: "#2d2d2d",
              color: "#fff",
            }}
          />
        </div>
        <div onClick={reviewCode} className="review">
          review
        </div>
      </div>
      <div className="right">
        {/* ✅ Correct usage of Markdown */}
        <Markdown rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
      </div>
    </main>
  );
}

export default App;