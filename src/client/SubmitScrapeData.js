const form = document.getElementById("form");
form.addEventListener("submit", async event => {
  event.preventDefault();
  const response = await fetch("/scrape", {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    xhrFields: {
      responseType: 'blob'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      link: document.getElementById("link").value,
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,

    })
  })
  .then(async response => {
    const url = window.URL.createObjectURL(await response.blob());
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // the filename you want
    a.download = `${document.getElementById("title").value}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    form.reset();
  })
})
