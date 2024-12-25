async function shortenURL() {
  const url = document.getElementById("url").value;
  const customAlias = document.getElementById("customAlias").value;
  if (!url) {
      alert("Please enter a URL");
      return;
  }

  try {
      let apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
      if (customAlias) {
          apiUrl += `&alias=${encodeURIComponent(customAlias)}`;
      }

      const response = await fetch(apiUrl);
      if (response.ok) {
          const data = await response.text();
          const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;
          document.getElementById('result').innerHTML = `
              Shortened URL: <a href="${data}" target="_blank">${data}</a>
              <button class="copy-button" onclick="copyToClipboard('${data}')">Copy <i class="fa fa-copy"></i></button>
              <div>
                  <img src="${qrCodeUrl}" alt="QR Code">
              </div>
              <div>
                  <button class="copy-button" onclick="showAnalytics('${data}')">Show Analytics</button>
              </div>
          `;
      } else {
          document.getElementById('result').innerHTML = "Error: Unable to shorten URL";
      }
  } catch (error) {
      document.getElementById('result').innerHTML = "Error: Unable to shorten URL";
  }
}

function copyToClipboard(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Shortened URL copied to clipboard");
}

function showAnalytics(shortUrl) {
  // Mock implementation of link analytics
  alert(`Analytics for ${shortUrl}:\n- Clicks: 123\n- Created: 2023-10-01\n- Last Accessed: 2023-10-10`);
}
