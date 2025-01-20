import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Temp = () => {
  const { id } = useParams();
  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop(); // Extract the file name from the URL
    link.click();
  };
  useEffect(() => {
    downloadFile(`https://finalwilll-84pu.vercel.app/${id}`);
  }, []);
  return <div>File Downloded</div>;
};

export default Temp;
