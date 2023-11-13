// List of phishing websites
var phishingSites = ["badwebsite.com", "anotherbadwebsite.com"];

// Function to get the domain from a URL
function getDomainFromUrl(url) {
    var urlObj = new URL(url);
    return urlObj.hostname;
}

// Function to check if a URL is a phishing site
function checkIfPhishingSite(url) {
    var urlDomain = getDomainFromUrl(url);
    return phishingSites.includes(urlDomain);
}

// Event listener for web requests
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var url = details.url;
    var isPhishingSite = checkIfPhishingSite(url);
    if (isPhishingSite) {
      return {cancel: true};
    }
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);
