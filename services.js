function toggleMenu() {
  let headMenu = document.getElementById("h-menu");
  let hamIcon = document.getElementById("hamburger-icon");
  headMenu.classList.toggle("hidden");
  hamIcon.src = headMenu.classList.contains("hidden")
    ? "images/icon-hamburger.svg"
    : "images/icon-close.svg";
}

function formSubmit(e) {
  e.preventDefault();
  const popup = document.getElementById("popup");
  const originalUrl = document.getElementById("original-url");
  popup.style.display = "flex";
  let url = e.target[0].value;
  originalUrl.innerText = url;
  shortenLink(url);
  e.target[0].value = "";
}

async function shortenLink(url) {
  const loader = document.getElementById("popup-loader");
  const shortenedUrl = document.getElementById("shortened-url");
  const urlContainer = document.getElementsByClassName("url-response-container")
  const errorDiv = document.getElementById("error-container");
  const errorText = document.getElementById("error-text");
  const serviceURL = "https://url-shortener-service.p.rapidapi.com/shorten";
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": "ede8ba226fmsh99a9922b27e0a5cp12788bjsn42a057f84635",
      "x-rapidapi-host": "url-shortener-service.p.rapidapi.com",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      url,
    }),
  };

  try {
    urlContainer[0].style.display = "none";
    errorDiv.style.display = "none";
    loader.style.display = "flex";
    const response = await fetch(serviceURL, options);
    const result = await response.json();
    console.log(result)
    if(result.error) {
      throw new Error(result.error);
    }
    shortenedUrl.innerText = result.result_url;
    urlContainer[0].style.display = "flex";
    loader.style.display = "none";
  } catch (error) {
    console.error(error);
    loader.style.display = "none";
    urlContainer[0].style.display = "none";
    errorDiv.style.display = "flex";
    errorText.innerText = error.message? error.message : error;
  }
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
}

function copytoClipboard() {
  const shortenedUrl = document.getElementById("shortened-url");
  navigator.clipboard.writeText(shortenedUrl.innerText);
}
