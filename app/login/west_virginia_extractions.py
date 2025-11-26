import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

# Set up Selenium WebDriver (ensure you have ChromeDriver installed and in PATH)
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode (no browser UI)
driver = webdriver.Chrome(options=chrome_options)

# Data structure to collect vendor info
data = []

# Example 1: eVA Vendor Search (public access, summary listings)
eva_url = "https://eva.virginia.gov/pages/eva-vendor-listings.htm"
driver.get(eva_url)
time.sleep(5)  # Wait for page elements to load

# Example extraction logic — you will likely need to adjust selectors for your exact targets!
# Loop through entries on the vendor listing page
vendors = driver.find_elements(By.CSS_SELECTOR, 'div.vendor-row')  # Update as appropriate

for vendor in vendors:
    company_name = vendor.find_element(By.CSS_SELECTOR, 'span.vendor-name').text
    address = vendor.find_element(By.CSS_SELECTOR, 'span.vendor-address').text
    email = vendor.find_element(By.CSS_SELECTOR, 'a.vendor-email').get_attribute('href').replace('mailto:', '')
    phone = vendor.find_element(By.CSS_SELECTOR, 'span.vendor-phone').text
    website = vendor.find_element(By.CSS_SELECTOR, 'a.vendor-website').get_attribute('href')
    contact_person = ''  # Not always available on summary, may require profile click
    contact_phone = ''
    contact_email = ''
    # Optional: Click into detail pages here for contact person info if needed

    data.append({
        "Company Name": company_name,
        "Address": address,
        "Email": email,
        "Phone Number": phone,
        "Website": website,
        "Company Contact": contact_person,
        "Contact's Phone": contact_phone,
        "Contact's Email": contact_email
    })

# Example 2: Add more targets (county, university, agency directories)
# driver.get("https://www.somevirginiaagency.gov/vendors") and repeat selector/extraction as above

# Convert data to DataFrame and save to Excel
df = pd.DataFrame(data)
df.to_excel("virginia_vendors.xlsx", index=False)

driver.quit()
print("Data extraction complete. File saved as virginia_vendors.xlsx")
