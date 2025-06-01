import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { FaTrash } from 'react-icons/fa'; // Importing the delete icon
import { toast } from 'react-toastify';
const CreateResult = () => {
  const [results, setResults] = useState([
    { studentName: '', class: '', parentPhoneNumber: '', parentEmail: '', subjects: [{ subject: '', marks: '' }] },
  ]);
  const [fileName, setFileName] = useState('Results'); // State for the file name

  // Handle input changes for fields
  const handleInputChange = (index, event, fieldName, subjectIndex) => {
    const values = [...results];
    if (fieldName === 'subjects') {
      values[index].subjects[subjectIndex][event.target.name] = event.target.value;
    } else {
      values[index][fieldName] = event.target.value;
    }
    setResults(values);
  };

  // Add a new row for another student
  const handleAddRow = () => {
    setResults([...results, { studentName: '', class: '', parentPhoneNumber: '', parentEmail: '', subjects: [{ subject: '', marks: '' }] }]);
  };

  // Add a new subject to a student's record
  const handleAddSubject = (index) => {
    const values = [...results];
    values[index].subjects.push({ subject: '', marks: '' });
    setResults(values);
  };

  // Delete a subject
  const handleDeleteSubject = (index, subjectIndex) => {
    const values = [...results];
    values[index].subjects.splice(subjectIndex, 1);
    setResults(values);
  };

  // Delete a row
  const handleDeleteRow = (index) => {
    const values = [...results];
    values.splice(index, 1);
    setResults(values);
  };

  const isValid = () => {
    return results.every((result) => 
      result.studentName.trim() !== '' &&
      result.class.trim() !== '' &&
      /^[0-9]{10}$/.test(result.parentPhoneNumber) && // Validate 10-digit phone number
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.parentEmail) && // Validate email
      result.subjects.length > 0 &&
      result.subjects.every((subject) => 
        subject.subject.trim() !== '' &&
        subject.marks !== '' &&
        !isNaN(subject.marks) &&
        subject.marks >= 0 &&
        subject.marks <= 100
      )
    );
  };
  // Download the Excel file
  const handleDownload = () => {
    if (!isValid()) {
      toast.error("Please fill all required fields correctly before downloading.");
      return;
    }
    const formattedResults = results.map((result) => {
      const subjectColumns = result.subjects.reduce((acc, subject) => {
        if (subject.subject && subject.marks) {
          acc[`${subject.subject}_Score`] = subject.marks;
        }
        return acc;
      }, {});

      return {
        Student_Name: result.studentName,
        Class: result.class,
        Parent_Phone_Number: result.parentPhoneNumber,
        Parent_Email: result.parentEmail,
        ...subjectColumns,
      };
    });

    const ws = XLSX.utils.json_to_sheet(formattedResults);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Results');
    XLSX.writeFile(wb, `${fileName}.xlsx`); // Use the fileName state

    // Reset the form fields after download
    setResults([{ studentName: '', class: '', parentPhoneNumber: '', parentEmail: '', subjects: [{ subject: '', marks: '' }] }]);
    setFileName('Results'); // Reset file name after download
  };

  // Check if all subjects are filled
  const isSubjectsValid = () => {
    return results.every((result) => result.subjects.every((subject) => subject.subject && subject.marks));
  };

  return (
    <div>
      <h1 className='text-center text-2xl p-3 font-mono font-bold'>Create Result</h1>

      {/* Input for custom file name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Enter Excel File Name</label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter file name"
        />
      </div>

      <table className="w-full">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Parent Phone Number</th>
            <th>Parent Email</th>
            <th>Subjects</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className="bg-white shadow-inner hover:shadow-xl rounded-lg">
              <td>
                <input
                  type="text"
                  name="studentName"
                  value={result.studentName}
                  onChange={(e) => handleInputChange(index, e, 'studentName')}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="class"
                  value={result.class}
                  onChange={(e) => handleInputChange(index, e, 'class')}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="parentPhoneNumber"
                  value={result.parentPhoneNumber}
                  onChange={(e) => handleInputChange(index, e, 'parentPhoneNumber')}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td>
                <input
                  type="email"
                  name="parentEmail"
                  value={result.parentEmail}
                  onChange={(e) => handleInputChange(index, e, 'parentEmail')}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className='flex flex-col'>
                {result.subjects.map((subject, subjectIndex) => (
                  <div key={subjectIndex} className="flex items-center mb-2">
                    <input
                      type="text"
                      name="subject"
                      value={subject.subject}
                      placeholder={`Subject ${subjectIndex + 1}`}
                      onChange={(e) => handleInputChange(index, e, 'subjects', subjectIndex)}
                      className="w-full p-2 border rounded"
                    />
                    <button
                      onClick={() => handleDeleteSubject(index, subjectIndex)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => handleAddSubject(index)}
                  className="mt-2 bg-black text-white py-1 px-3 rounded-lg hover:shadow-lg"
                >
                  Add Subject
                </button>
              </td>
              <td>
                {result.subjects.map((subject, subjectIndex) => (
                  <div key={subjectIndex}>
                    <input
                      type="number"
                      name="marks"
                      max={100}
                      min={0}
                      value={subject.marks}
                      placeholder={`Marks for Subject ${subjectIndex + 1}`}
                      onChange={(e) => handleInputChange(index, e, 'subjects', subjectIndex)}
                      className="w-full p-2 border rounded"
                      style={{
                        WebkitAppearance: 'none', // Removes default styles in Safari/Chrome
                        MozAppearance: 'textfield', // Removes default styles in Firefox
                        appearance: 'none', // General removal for modern browsers
                      }}
                    />
                  </div>
                ))}
              </td>
              <td>
                <button
                  onClick={() => handleDeleteRow(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button 
        onClick={handleAddRow} 
        className="mt-4 bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-inner hover:shadow-lg transform transition duration-150 ease-in-out active:scale-95"
      >
        Add Row
      </button>

      <button 
        onClick={handleDownload} 
        className="ml-4 mt-4 bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-inner hover:shadow-lg transform transition duration-150 ease-in-out active:scale-95"
        disabled={!isSubjectsValid()}
      >
        Download Excel
      </button>
    </div>
  );
};

export default CreateResult;
