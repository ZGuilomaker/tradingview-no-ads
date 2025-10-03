// Usamos uma função async para poder usar 'await' e deixar o código mais limpo.
const hideAndCountAd = async () => {
  const adSelector = '#charting-ad';
  const adElement = document.querySelector(adSelector);

  // 1. Verifica se o anúncio existe E se ele ainda não foi contado por nós.
  //    A marca 'data-ad-blocked' evita contar o mesmo anúncio várias vezes.
  if (adElement && !adElement.dataset.adBlocked) {
    
    // 2. Marca o anúncio como bloqueado para não contar de novo.
    adElement.dataset.adBlocked = 'true';
    
    // 3. Pega o valor atual do contador no armazenamento da extensão.
    const result = await chrome.storage.local.get(['blockedCount']);
    const currentCount = result.blockedCount || 0;
    
    // 4. Incrementa o contador.
    const newCount = currentCount + 1;
    
    // 5. Salva o novo valor no armazenamento.
    await chrome.storage.local.set({ blockedCount: newCount });
    
    console.log(`Anúncio bloqueado! Total: ${newCount}`);
    
    // 6. Oculta o anúncio (esta parte é opcional se o CSS já estiver fazendo, mas é uma garantia).
    adElement.style.display = 'none';
  }
};

// Roda a verificação continuamente para pegar anúncios carregados dinamicamente.
setInterval(hideAndCountAd, 1000);