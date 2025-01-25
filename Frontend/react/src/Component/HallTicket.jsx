import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import './HallTicket.css';
import arunai from '../assets/Arunai.png';

const HallTicket = ({ Name, Reg_No, Department, Year, DOB, photoURL }) => {
  const hallTicketRef = useRef(null);

  const handleDownload = () => {
    if (hallTicketRef.current) {
      toPng(hallTicketRef.current, {
        cacheBust: true,
        useCORS: true,
        width: 800,
        height: hallTicketRef.current.offsetHeight,
      })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'Hall_Ticket.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Failed to generate image', err);
        });
    }
  };

  console.log("Props received in HallTicket:", { Name, Reg_No, Department, Year, DOB, photoURL });

  return (
    <div>
      <div ref={hallTicketRef} className="hall-ticket">
        <div className="header">
          <img src={arunai} alt="College Logo" />
          <h2>Arunai Engineering College (Autonomous)</h2>
          <p>Velu Nagar, Thiruvannamalai - 606603</p>
          <h3>End Semester Examinations - Nov/Dec-24</h3>
          <h4>Hall Ticket</h4>
        </div>
        <div className="photo">
          {photoURL ? <img src={`http://localhost:2300${photoURL}`} alt="Student Photo" /> : 'Photo'}
        </div>
        <table className="info-table">
          <tbody>
            <tr>
              <th>Register Number:</th>
              <td>{Reg_No}</td>
            </tr>
            <tr>
              <th>Name:</th>
              <td>{Name}</td>
            </tr>
            <tr>
              <th>DOB:</th>
              <td>{DOB}</td>
            </tr>
            <tr>
              <th>Current Semester:</th>
              <td>{Year}</td>
            </tr>
            <tr>
              <th>Department:</th>
              <td>{Department}</td>
            </tr>
            <tr>
              <th>Examination Centre:</th>
              <td>Arunai Engineering College</td>
            </tr>
          </tbody>
        </table>
        <table className="subjects-table">
          <thead>
            <tr>
              <th>Sem</th>
              <th>Sub Code</th>
              <th>Subject Title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5</td>
              <td>CS3991</td>
              <td>Computer Networks</td>
            </tr>
            <tr>
              <td>5</td>
              <td>CS3501</td>
              <td>Data Warehousing</td>
            </tr>
            <tr>
              <td>5</td>
              <td>CS3511</td>
              <td>Cloud Computing</td>
            </tr>
            <tr>
              <td>5</td>
              <td>CS3534</td>
              <td>Cryptography and Cyber Security</td>
            </tr>
            <tr>
              <td>5</td>
              <td>MX3004</td>
              <td>Disaster Risk Reduction</td>
            </tr>
            <tr>
              <td>5</td>
              <td>SB8007</td>
              <td>Sales Force Developer</td>
            </tr>
          </tbody>
        </table>
        <p className="note">Note: This hall ticket is valid only if the candidate's admission is approved...</p>
        <div className="signatures">
          <div>
            <span>Signature of the Candidate</span>
          </div>
          <div>
            <span>Signature of the Principal</span>
          </div>
          <div>
            <span>Controller of Examinations</span>
          </div>
        </div>
      </div>
      <button onClick={handleDownload} className="download-button bg-black p-4 mt-5 mb-10 text-white">
        Download as Image
      </button>
    </div>
  );
};

export default HallTicket;
