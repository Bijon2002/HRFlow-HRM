const fs = require('fs');

async function testPythonService() {
  try {
    const formData = new FormData();
    const buffer = fs.readFileSync('test.pdf');
    const blob = new Blob([buffer], { type: 'application/pdf' });
    formData.append('file', blob, 'test.pdf');

    console.log('Sending request to Python service...');
    const response = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      body: formData
    });

    console.log('Response status:', response.status);
    const text = await response.text();
    console.log('Response body:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

// Create a dummy pdf
fs.writeFileSync('test.pdf', '%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n4 0 obj\n<< /Length 53 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(This is a test CV for John Doe) Tj\nET\nendstream\nendobj\n5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000224 00000 n \n0000000327 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n415\n%%EOF');

testPythonService();
