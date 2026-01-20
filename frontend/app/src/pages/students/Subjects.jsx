// Importing React and required hooks from react
import React, { useState, useEffect } from 'react';

// Functional component named Subjects
const Subjects = () => {

  // useState hook to store list of subjects
  // subjectList → current state value
  // setSubjectList → function to update the state
  const [subjectList, setSubjectList] = useState([]);

  // useEffect runs after the component renders
  // Empty dependency array [] means this will run ONLY ONCE (componentDidMount)
  useEffect(() => {

    // Simulated fetched data (as if coming from API/backend)
    const fetchedData = [
      { id: 101, course: 'PG-DAC', date: '01-02-2025', subject: 'Core Java' },
      { id: 102, course: 'PG-DAC', date: '02-03-2025', subject: 'C++ Programming' },
      { id: 103, course: 'PG-DAC', date: '04-03-2025', subject: 'Python' },
      { id: 104, course: 'PG-DAC', date: '20-07-2025', subject: 'Advance Java' },
    ];

    // Updating state with fetched data
    // This triggers a re-render of the component
    setSubjectList(fetchedData);

  }, []);

  // JSX returned by the component
  return (
    <div className="card card-custom p-4">
      
      {/* Card heading */}
      <h5 className="mb-4 fw-bold">Enrolled Subjects</h5>

      {/* Makes table scrollable on small screens */}
      <div className="table-responsive">

        <table className="table table-custom table-hover align-middle">

          {/* Table header */}
          <thead className="table-light">
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">COURSE</th>
              <th className="text-center">START DATE</th>
              <th className="text-center">SUBJECT NAME</th>
            </tr>
          </thead>

          <tbody>

            {/* Looping through subjectList using map */}
            {subjectList.map((s, index) => (
              
              // Each row must have a unique key (React requirement)
              <tr key={s.id}>
                
                {/* Displaying serial number using index */}
                <td className="text-center">{index + 1}</td>

                {/* Course displayed inside a badge */}
                <td className="text-center">
                  <span className="badge bg-light text-dark border">
                    {s.course}
                  </span>
                </td>

                {/* Subject start date */}
                <td className="text-center text-muted">{s.date}</td>

                {/* Subject name styled in bold and primary color */}
                <td className="text-center fw-semibold text-primary">
                  {s.subject}
                </td>
              </tr>
            ))}

            {/* Conditional rendering:
                If subjectList is empty, show this message */}
            {subjectList.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted py-3">
                  No subjects enrolled.
                </td>
              </tr>
            )}

          </tbody>
        </table>
      </div>
    </div>
  );
};

// Exporting component so it can be used in other files
export default Subjects;
