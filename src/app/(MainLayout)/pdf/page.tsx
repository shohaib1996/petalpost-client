"use client"
import React, { useRef } from "react";
import { jsPDF } from "jspdf";

const PDFGenerator: React.FC = () => {
  // Use a ref to target the content you want to convert to PDF
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const doc = new jsPDF();

    // Check if pdfRef.current is not null before processing
    if (pdfRef.current) {
      const content = pdfRef.current.innerHTML; // Get the HTML content
      const img = pdfRef.current.querySelector("img") as HTMLImageElement; // Get the image element

      // Add text to PDF
      doc.text("Your content goes here.", 10, 10); // You can customize this part to include more text

      // If there's an image, add it to the PDF
      if (img) {
        const imgSrc = img.src;

        // Load the image
        doc.addImage(imgSrc, "PNG", 10, 20, 180, 50); // Adjust position and size as needed
      }

      doc.save("page.pdf");
    }
  };

  return (
    <div>
      <div ref={pdfRef} className="mt-24">
        Your content goes here.
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Hello_Web_Series_%28Wordmark%29_Logo.png/1200px-Hello_Web_Series_%28Wordmark%29_Logo.png" alt="" />
      </div>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default PDFGenerator;


