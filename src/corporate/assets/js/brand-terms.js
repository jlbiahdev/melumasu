(() => {
  const terms = ['NZUANE', 'ROMBONE', 'BIDI', 'CRA', 'FEMMEKMR2035', 'KISSINE', 'ADV'];
  const quickCheck = /nzuane|rombone|bidi|cra|femmekmr2035|kissine|adv/i;
  const termRegex = new RegExp(`\\b(${terms.join('|')})\\b`, 'gi');

  const excludedTags = new Set([
    'SCRIPT',
    'STYLE',
    'NOSCRIPT',
    'TITLE',
    'META',
    'LINK',
    'CODE',
    'PRE',
    'TEXTAREA'
  ]);

  const titleLikeSelector = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    '.section-title', '.policy-title', '.logo-mark', '.hero-title',
    '.entity-name', '.pillar-title', '.chart-title', '.chart-subtitle',
    '.kpi-label', '.source-tag', '.brand-tag', '.pub-title', '.pub-type',
    '.board-role', '.board-role-org', '.board-name',
    '[class*="title"]', '[class*="Title"]',
    '[class*="name"]', '[class*="Name"]',
    '[class*="label"]', '[class*="Label"]',
    '[class*="heading"]', '[class*="Heading"]'
  ].join(', ');

  const shouldSkipNode = (textNode) => {
    const parent = textNode.parentElement;
    if (!parent) return true;
    if (excludedTags.has(parent.tagName)) return true;
    if (parent.closest(titleLikeSelector)) return true;
    if (parent.closest('a')) return true;
    if (parent.closest('.term-key')) return true;
    return false;
  };

  const formatTerms = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.nodeValue || !quickCheck.test(node.nodeValue)) continue;
      textNodes.push(node);
    }

    textNodes.forEach((textNode) => {
      if (shouldSkipNode(textNode)) return;

      const text = textNode.nodeValue;
      let hasMatch = false;
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;

      text.replace(termRegex, (match, _group, offset) => {
        hasMatch = true;

        if (offset > lastIndex) {
          fragment.appendChild(document.createTextNode(text.slice(lastIndex, offset)));
        }

        const strong = document.createElement('strong');
        strong.className = 'term-key';
        strong.textContent = match.toUpperCase();
        fragment.appendChild(strong);

        lastIndex = offset + match.length;
        return match;
      });

      if (!hasMatch) return;

      if (lastIndex < text.length) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
      }

      textNode.parentNode.replaceChild(fragment, textNode);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', formatTerms);
  } else {
    formatTerms();
  }
})();