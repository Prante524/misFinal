function handleKeyPress(event) {
    if (event.key === 'Enter') {
      searchCountry();
    }
  }
  
  async function searchCountry() {
    const input = document.getElementById('countryInput').value.trim();
    const resultDiv = document.getElementById('result');
    const loading = document.getElementById('loading');
    resultDiv.innerHTML = '';
    loading.style.display = 'block';
  
    if (!input) {
      alert('Please enter a country name.');
      loading.style.display = 'none';
      return;
    }
  