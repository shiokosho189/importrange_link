chrome.action.onClicked.addListener(async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: onRun,
  });
});

function onRun() {
  try {
    const spanText = document.getElementById('t-formula-bar-input-container');
    const str = spanText.innerText;
    const regex = /IMPORTRANGE\(\"(.*?)\"\,\"/;
    const result = str.match(regex);
    var importrange_link = "";

    if(result[1].match("https://")){
      importrange_link = result[1];
    }else{
      importrange_link = 'https://docs.google.com/spreadsheets/d/' + result[1];
    }
    open(importrange_link);

  } catch (error) {
    alert('IMPORTRANGEのリンクを取得できませんでした');
  }
}
