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

    try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(input)}?fullText=false`);
        if (!res.ok) throw new Error('Country not found.');
    
        const data = await res.json();
    
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No country data found.');
        }
    
        let output = '';
    
        data.forEach((country, index) => {
          const flag = country.flags?.svg || '';
          const name = country.name?.common || 'N/A';
          const capital = country.capital?.[0] || 'N/A';
          const currency = country.currencies ? Object.values(country.currencies)[0]?.name : 'N/A';
          const population = country.population?.toLocaleString() || 'N/A';
          const region = country.region || 'N/A';
          const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
          const timezones = country.timezones?.join(', ') || 'N/A';
          const mapLink = country.maps?.googleMaps || '#';
    
          output += `
            <div class="country-card">
              <img src="${flag}" alt="Flag of ${name}" class="flag" />
              <div class="country-data">
                <strong>Country:</strong> ${name}<br />
                <strong>Capital:</strong> ${capital}<br />
                <strong>Currency:</strong> ${currency}<br />
                <strong>Population:</strong> ${population}<br />
                <strong>Region:</strong> ${region}<br />
                <strong>Languages:</strong> ${languages}<br />
                <strong>Timezones:</strong> ${timezones}<br />
                <strong>Google Maps:</strong> <a href="${mapLink}" target="_blank">View on Map</a>
              </div>
            </div>
            ${index < data.length - 1 ? '<hr />' : ''}
          `;
        });
    
        resultDiv.innerHTML = output;
      } catch (error) {
        resultDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
      } finally {
        loading.style.display = 'none';
      }
    }
    
    
  