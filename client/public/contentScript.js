// Log the HTML of the current page
chrome.runtime.sendMessage({
    action: "logHTML",
    html: document.documentElement.outerHTML,
    url: window.location.href
});

/*
function getProductInfo() {
  const getTextContent = (selector) => {
    const element = document.querySelector(selector);
    return element ? element.textContent.trim() : '';
  };

  const getListContent = (selector) => {
    const element = document.querySelector(selector);
    return element ? element.textContent.trim().split('|').map(item => item.trim()) : [];
  };

  const getWorksWithInfo = () => {
    const container = document.querySelector('.pd__crossref__list');
    if (!container) return [];

    const rows = container.querySelectorAll('.row');
    return Array.from(rows).map(row => ({
      brand: row.querySelector('.col-6.col-md-3').textContent.trim(),
      modelNumber: row.querySelector('.col-6.col-md-3.col-lg-2').textContent.trim(),
      description: row.querySelector('.col.col-md-6.col-lg-7').textContent.trim()
    }));
  };

  const getSymptoms = () => {
    const symptomsElement = document.querySelector('.col-md-6.mt-3:nth-of-type(1)');
    if (symptomsElement) {
      const symptomsText = symptomsElement.textContent.trim();
      const symptomsMatch = symptomsText.match(/This part fixes the following symptoms:(.*)/s);
      if (symptomsMatch) {
        return symptomsMatch[1].trim().split('|').map(item => item.trim());
      }
    }
    return [];
  };

  const getWorksWithProducts = () => {
    const worksWithElement = document.querySelector('.col-md-6.mt-3:nth-of-type(2)');
    if (worksWithElement) {
      const worksWithText = worksWithElement.textContent.trim();
      const worksWithMatch = worksWithText.match(/This part works with the following products:(.*)/s);
      if (worksWithMatch) {
        return worksWithMatch[1].trim();
      }
    }
    return '';
  };

  return {
    title: getTextContent('h1.title-lg[itemprop="name"]'),
    partSelectNumber: getTextContent('div.mt-3.mb-2 span[itemprop="productID"]'),
    manufacturerPartNumber: getTextContent('div.mb-2 span[itemprop="mpn"]'),
    manufacturer: getTextContent('span[itemprop="brand"] span[itemprop="name"]'),
    forBrands: getTextContent('span[itemprop="brand"] + span'),
    description: getTextContent('div[itemprop="description"]'),
    symptoms: getSymptoms(),
    worksWithProducts: getWorksWithProducts(),
    worksWithInfo: getWorksWithInfo(),
    replacedParts: getTextContent('.col-md-6.mt-3:nth-of-type(3) div[data-collapse-container]')
  };
}

try {
  const productInfo = getProductInfo();
  console.log(productInfo);
} catch (error) {
  console.error('Error retrieving product information:', error);
}
*/