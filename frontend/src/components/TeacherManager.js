import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const TeacherManager = () => {
  const [teachers, setTeachers] = useState([]);
  const [teacherName, setTeacherName] = useState('');
  const [isSubstitute, setIsSubstitute] = useState(false);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://44.202.2.2:8080/api/teachers');
      setTeachers(response.data);
      setStatus(`Loaded ${response.data.length} teachers`);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setStatus('Error loading teachers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teacherName.trim()) {
      setStatus('Please enter a teacher name');
      return;
    }
    
    try {
      setIsLoading(true);
      setStatus('Adding teacher...');
      
      const response = await axios.post('http://44.202.2.2:8080/api/teachers', {
        name: teacherName,
        isSubstitute
      });
      
      // Add to the top of the list
      setTeachers([response.data, ...teachers]);
      
      setTeacherName('');
      setIsSubstitute(false);
      setStatus(`Added "${response.data.name}" at ${moment().format('h:mm a')}`);
    } catch (error) {
      console.error("Error adding teacher:", error);
      setStatus('Error adding teacher');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
        Teacher Management System
      </h1>
      
      {/* Add Teacher Form */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '25px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#3498db', marginBottom: '20px' }}>
          Add New Teacher
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Teacher Name
            </label>
            <input 
              type="text" 
              value={teacherName} 
              onChange={(e) => setTeacherName(e.target.value)} 
              placeholder="Enter teacher's name"
              style={{ 
                width: '100%', 
                padding: '12px 15px', 
                border: '1px solid #ced4da', 
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                checked={isSubstitute} 
                onChange={(e) => setIsSubstitute(e.target.checked)} 
                style={{ 
                  marginRight: '10px',
                  width: '18px',
                  height: '18px',
                  accentColor: isSubstitute ? '#e53935' : '#43a047'
                }}
              />
              <span style={{ fontWeight: '600', color: isSubstitute ? '#e53935' : '#43a047' }}>
                Substitute Teacher
              </span>
            </label>
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              padding: '14px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? (
              <>
                <span style={{ marginRight: '10px' }}>⏳</span> Adding...
              </>
            ) : (
              'Add Teacher'
            )}
          </button>
        </form>
      </div>
      
      {/* Status Message */}
      {status && (
        <div style={{ 
          padding: '15px', 
          marginBottom: '25px', 
          backgroundColor: '#e8f4f8', 
          borderRadius: '8px',
          borderLeft: '4px solid #3498db',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ marginRight: '10px' }}>ℹ️</span>
          {status}
        </div>
      )}
      
      {/* Teacher List */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '25px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#3498db', marginBottom: '20px' }}>
          Teacher List
        </h2>
        
        {teachers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6c757d' }}>
            <p>No teachers found. Add a teacher to get started.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Type</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(teacher => (
                  <tr key={teacher.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '15px' }}>{teacher.name}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        // FIX: Use teacher.substitute instead of teacher.isSubstitute
                        backgroundColor: teacher.substitute ? '#ffebee' : '#e8f5e9',
                        color: teacher.substitute ? '#e53935' : '#43a047',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}>
                        {teacher.substitute ? 'Substitute' : 'Regular'}
                      </span>
                    </td>
                    <td style={{ padding: '15px', color: '#6c757d' }}>
                      {moment(teacher.createdAt).format('MMM D, YYYY h:mm a')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div style={{ marginTop: '30px', textAlign: 'center', color: '#6c757d', fontSize: '14px' }}>
        <p>Teacher Management System • {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default TeacherManager;