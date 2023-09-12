// Function to display the top 10 countries by population
function updateContent(contentDiv, title, bar, count) {
  const titleContainer = contentDiv.querySelector(".title-container");
  const barContainer = contentDiv.querySelector(".bar-container");
  const countContainer = contentDiv.querySelector(".count-container");
  titleContainer.querySelector(".title").textContent = title;
  barContainer.querySelector(".bar").style.width = bar;
  barContainer.querySelector(".bar").style.height = "12px";
  countContainer.querySelector(".count").textContent = count;
  document.querySelector(".main").style.padding = "10px";
}
function updateNumberOfCountries(data) {
  const numElement = document.getElementById("cno");
  const numberOfCountries = data.length; // Get the number of countries from the API data
  numElement.textContent = numberOfCountries;
}

function displayPopulation() {
  fetch("https://restcountries.com/v3.1/all?fields=name,population")
    .then((response) => response.json())
    .then((data) => {
      updateNumberOfCountries(data); // Call the function to update the number of countries

      // Sort the countries by population in descending order
      data.sort((a, b) => b.population - a.population);

      // Get the top 10 countries
      const top10Countries = data.slice(0, 10);

      // Update the HTML content with the top 10 countries
      const contentDivs = document.querySelectorAll(".content");
      const messageSpan = document.getElementById("message");
      messageSpan.textContent = "10 Most Populated Countries in the World";

      top10Countries.forEach((country, index) => {
        const contentDiv = contentDivs[index];
        const title = country.name.common;
        const bar = `${(country.population / top10Countries[0].population) * 100
          }%`;
        const count = country.population.toLocaleString();

        updateContent(contentDiv, title, bar, count);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayLanguage() {
  fetch("https://restcountries.com/v3.1/all?fields=name,languages")
    .then((response) => response.json())
    .then((data) => {
      updateNumberOfCountries(data); // Call the function to update the number of countries

      // Create a map to store language usage counts
      const languageUsage = new Map();

      // Iterate through countries and count language usage
      data.forEach((country) => {
        if (country.languages) {
          for (const languageCode in country.languages) {
            const languageName = country.languages[languageCode];
            if (languageUsage.has(languageName)) {
              languageUsage.set(
                languageName,
                languageUsage.get(languageName) + 1
              );
            } else {
              languageUsage.set(languageName, 1);
            }
          }
        }
      });

      // Sort languages by usage count in descending order
      const sortedLanguages = Array.from(languageUsage.entries()).sort(
        (a, b) => b[1] - a[1]
      );

      // Get the top 10 languages
      const top10Languages = sortedLanguages.slice(0, 10);

      // Calculate the maximum usage count

      // Update the HTML content with the top 10 languages
      const contentDivs = document.querySelectorAll(".content");
      const messageSpan = document.getElementById("message");
      messageSpan.textContent = "10 Most Widely Spoken Languages in the World";

      const maxUsageCount = top10Languages[0][1];
      console.log(maxUsageCount);
      top10Languages.forEach((languageInfo, index) => {
        const contentDiv = contentDivs[index];
        const title = languageInfo[0];
        const usageCount = languageInfo[1];
        // Calculate the width of the bar based on usage count
        const barWidth = (usageCount / maxUsageCount) * 100 + "%";
        updateContent(contentDiv, title, barWidth, usageCount);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

