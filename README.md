# SHIELD RCA Analyzer HTML Application

An interactive HTML-based tool for conducting Root Cause Analysis (RCA) using the **SHIELD (Safety Human Incident & Error Learning Database)** methodology. This application guides users through the SHIELD layers to systematically analyze incidents, identify contributing factors, and facilitate learning from safety events. It's designed for easy integration into SharePoint Online or other web environments.

This application is part of the [RCAS Repository](https://github.com/complianceGJL/RCAS).

---

## Preview

**(You MUST replace this placeholder with an actual screenshot of your application. Create an `assets` folder inside this `shield-rca-analyzer` directory, upload your image (e.g., `shield_app_screenshot.png`) there, and ensure the path below is correct.)**

![SHIELD RCA App Screenshot Placeholder](assets/shield_app_screenshot.png)
*Fig. 1: Main interface of the SHIELD RCA Application.*

---

## Table of Contents

*   [Features](#features)
*   [Technology Stack](#technology-stack)
*   [Live Demo](#live-demo)
*   [SharePoint Integration Guide](#sharepoint-integration-guide)
*   [How to Use the SHIELD Application](#how-to-use-the-shield-application)
*   [File Structure (within `shield-rca-analyzer`)](#file-structure-within-shield-rca-analyzer)
*   [Contributing](#contributing)
*   [License](#license)
*   [Contact](#contact)

---

## Features

*   **SHIELD Methodology Framework**: Structured analysis based on the four SHIELD layers:
    *   Acts Layer
    *   Preconditions Layer
    *   Operational Leadership Layer
    *   Organizational Influences Layer
*   **Incident Description**: Clearly define the incident being analyzed.
*   **Dynamic Factor Addition**: Easily add multiple contributing factors to each SHIELD layer.
*   **Real-time Analysis Visualization**: See a structured summary of your entered factors.
*   **Data Export**: Export the complete analysis data as a JSON file for record-keeping or further processing.
*   **Report Generation**: Generate a simple text-based report of the analysis.
*   **Lightweight & Standalone**: Runs entirely in the browser with no external dependencies.
*   **Single File Application**: Easy to deploy and manage.

---

## Technology Stack

*   **HTML5**: For the basic structure and content.
*   **CSS3**: For styling and presentation (inline within the HTML).
*   **Vanilla JavaScript (ES6+)**: For interactivity and application logic.

---

## Live Demo

You can try the application live here, hosted on GitHub Pages.
**(This URL assumes your main HTML file for the SHIELD app is named `SHIELD-RCA.html` and is located directly within this `shield-rca-analyzer` folder. If it's `index.html`, remove `SHIELD-RCA.html` from the end of the URL.)**

➡️ **[SHIELD RCA App Live Demo](https://complianceGJL.github.io/RCAS/shield-rca-analyzer/SHIELD-RCA.html)**

*(Ensure GitHub Pages is configured for the `RCAS` repository to serve from the `main` branch.)*

---

## SharePoint Integration Guide

This application, being a single HTML file, can be easily embedded into SharePoint Online modern pages.

**Steps to Integrate (using GitHub Pages):**

1.  **Get the GitHub Pages URL**:
    *   The live URL for this SHIELD app is: `https://complianceGJL.github.io/RCAS/shield-rca-analyzer/SHIELD-RCA.html` (Adjust if your HTML filename is different, e.g., `index.html`).

2.  **Navigate to Your SharePoint Page**:
    *   Open the SharePoint Online modern page where you want to embed the application.

3.  **Edit the SharePoint Page**:
    *   Click the "Edit" button.

4.  **Add the Embed Web Part**:
    *   Click the `+` icon to add a new web part and select the "Embed" web part.

5.  **Configure the Embed Web Part**:
    *   In the property pane, paste the full GitHub Pages URL of your `SHIELD-RCA.html` file (from Step 1).

6.  **Save and Publish**:
    *   Republish your SharePoint page.

**Alternative SharePoint Integration (Direct Upload within RCAS structure):**
If you are working with SharePoint in a way that it can access the raw files from your GitHub repository (less common for direct embedding than GitHub Pages), you would still point to the specific HTML file. However, GitHub Pages is the recommended method for live, browser-renderable hosting for embedding.

**Troubleshooting SharePoint Integration:**
*   **"Embedding content from this website isn't allowed"**: Your SharePoint admin may need to add `complianceGJL.github.io` to the HTML Field Security settings.
*   **Content Not Displaying**: Ensure the URL is correct and uses `https://`. Check the browser's developer console for errors. Verify the GitHub Pages deployment for the `RCAS` repository is active and the path to the SHIELD app's HTML file is correct.

---

## How to Use the SHIELD Application

1.  **Access the Application**: Open the application via its GitHub Pages URL or by opening the HTML file directly in a browser if working locally.

2.  **Describe the Incident**:
    *   In the "Incident Details" section, type a clear description of the incident you are analyzing in the text area.

3.  **Analyze SHIELD Layers**:
    *   For each of the four SHIELD layers displayed (Acts, Preconditions, Operational Leadership, Organizational Influences):
        *   Click the "Add Contributing Factor" button associated with that layer.
        *   A prompt will appear asking you to enter a factor. Type the identified factor and click "OK".
        *   The factor will be added and displayed under that layer.
        *   Repeat this to add multiple factors to each layer as needed.

4.  **Review Analysis Visualization**:
    *   The "Analysis Visualization" section will automatically update to show a structured summary of all the factors you've entered across the different layers.

5.  **Export Analysis (JSON)**:
    *   Click the "Export Analysis" button.
    *   This will generate a JSON file (e.g., `shield-analysis.json`) containing all your entered data and prompt you to save it.

6.  **Generate Report (Text)**:
    *   Click the "Generate Report" button.
    *   This will generate a simple text file (e.g., `shield-report.txt`) summarizing the incident description and the factors listed under each SHIELD layer. You will be prompted to save this file.

---

## File Structure (within `shield-rca-analyzer`)

This assumes this README.md is located within the `shield-rca-analyzer` folder.


---

## Contributing

Contributions to the `RCAS` repository, including this SHIELD RCA tool, are welcome!

1.  Fork the main repository: [https://github.com/complianceGJL/RCAS/fork](https://github.com/complianceGJL/RCAS/fork)
2.  Create a new branch for your changes (`git checkout -b feature/ShieldEnhancement`).
3.  Make your modifications to the files within the `shield-rca-analyzer` directory.
4.  Commit your changes (`git commit -m 'Add ShieldEnhancement'`).
5.  Push to the branch (`git push origin feature/ShieldEnhancement`).
6.  Open a Pull Request against the `main` branch of `complianceGJL/RCAS`.

Alternatively, you can open an issue in the main `RCAS` repository: [https://github.com/complianceGJL/RCAS/issues](https://github.com/complianceGJL/RCAS/issues)

---

## License

This project is part of the `RCAS` repository. Refer to the `LICENSE` file in the root of the `RCAS` repository for licensing terms. If no `LICENSE` file exists there, assume this specific tool is provided as is, and you are free to use, modify, and distribute it.

*(It's good practice to have a `LICENSE` file in the root of your `RCAS` repository.)*

---

## Contact

Created by: **complianceGJL**

If you have any questions or want to provide feedback regarding this SHIELD RCA tool, please open an issue in the `RCAS` GitHub repository: [https://github.com/complianceGJL/RCAS/issues](https://github.com/complianceGJL/RCAS/issues)
