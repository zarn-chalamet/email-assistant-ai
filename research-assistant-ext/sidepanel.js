document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["researchNotes"], function (result) {
    if (result.researchNotes) {
      document.getElementById("notes").value = result.researchNotes;
    }
  });

  // summarize text
  document
    .getElementById("summarizeButton")
    .addEventListener("click", summarizeText);

  // note
  document
    .getElementById("saveNotesButton")
    .addEventListener("click", saveNotes);
});

async function summarizeText() {
  try {
    //get the selected text by the user from the browser
    const [currentTab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const [{ result: selectedText }] = await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      function: () => window.getSelection().toString(),
    });

    if (!selectedText) {
      showResultText("Please select some text first");
      return;
    }

    // fetch result from api
    const response = await fetch(
      "http://localhost:8080/api/resources/process",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: selectedText, operation: "summarize" }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const resultText = await response.text();
    showResultText(resultText.replace(/\n/g, "<br>"));
  } catch (error) {
    showResultText("Error: " + error.message);
  }
}

async function saveNotes() {
  const notes = document.getElementById("notes").value;
  chrome.storage.local.set({ researchNotes: notes }, function () {
    alert("Notes saved successfully");
  });
}

function showResultText(context) {
  document.getElementById(
    "results"
  ).innerHTML = `<div class="result-item"><div class="result-content">${context}</div></div>`;
}
