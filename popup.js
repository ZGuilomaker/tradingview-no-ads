document.addEventListener('DOMContentLoaded', async () => {
  const countElement = document.getElementById('blocked-count');

  // Pede ao armazenamento da extensão o valor de 'blockedCount'.
  const result = await chrome.storage.local.get(['blockedCount']);
  
  // Se o valor existir, exibe. Se não, exibe 0.
  const count = result.blockedCount || 0;
  
  countElement.textContent = count;
});