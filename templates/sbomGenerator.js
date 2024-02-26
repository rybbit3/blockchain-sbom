async function generateSBOM() {
  const fileInput = document.getElementById('fileInput');
  const sbomOutput = document.getElementById('sbomOutput');
  
  if (!fileInput.files.length) {
      alert('Please select a file.');
      return;
  }

  const file = fileInput.files[0];
  const hash = await calculateFileHash(file);
  const sbom = {
      files: [{
          filename: file.name,
          size: file.size,
          hash: hash
      }]
  };

  sbomOutput.textContent = JSON.stringify(sbom, null, 4);
}

async function calculateFileHash(file) {
  const buffer = await file.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
}
