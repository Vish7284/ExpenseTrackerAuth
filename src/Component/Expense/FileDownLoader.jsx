import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FileDownloader = () => {
const data = useSelector(state => state.expenses.expenses)

  const makeCsv = (data) => {
    // Transform data into an array of arrays
    const transformedData = data.map((obj) => Object.values(obj));
    console.log(transformedData);

    // Convert array of arrays into CSV string
    return transformedData.map((row) => row.join(",")).join("\n");
  };

  const handleCsvDownload = () => {
    const csvData = makeCsv(data);
    const blob = new Blob([csvData], { type: "text/plain" });
    const downloadLink = document.getElementById("download-link");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.setAttribute("download", "data.csv");
    // Simulate click to trigger download
    downloadLink.click();
  };

  return (
    <>
      <span  onClick={handleCsvDownload} className="flex justify-end">
        <Link to="#" className ="bg-lime-300 hover:bg-lime-600 rounded-full p-4">Download File</Link>
      </span>
      <a id="download-link" ></a>
      {/* Hidden anchor tag for download */}
    </>
  );
};

export default FileDownloader;
