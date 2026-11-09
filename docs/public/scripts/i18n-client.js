/**
 * Design Grimoar — Engine de Tradução e Internacionalização Client-Side
 * Suporta alternância fluida entre Português do Brasil (pt-BR) e Inglês (en)
 */

(function () {
  const STORAGE_KEY = 'grimoar-lang';

  // Obter idioma ativo
  function getActiveLang() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'pt-BR') return stored;
      // Detecção de preferência do navegador se não houver preferência salva
      const navLang = navigator.language || navigator.userLanguage || '';
      return navLang.toLowerCase().startsWith('en') ? 'en' : 'pt-BR';
    } catch (e) {
      return 'pt-BR';
    }
  }

  // Obter slug da página atual
  function getCurrentSlug() {
    const metaSlug = document.querySelector('meta[name="grimoar-slug"]');
    if (metaSlug && metaSlug.content) return metaSlug.content.trim();
    const pathname = window.location.pathname.replace(/\/$/, '');
    const parts = pathname.split('/');
    return parts[parts.length - 1] || '';
  }

  // Dicionário completo de UI, cabeçalhos e verbetes
  const I18N = window.GRIMOAR_I18N || {};

  function translateUI(lang) {
    const isEn = lang === 'en';

    // 1. Elementos com data-i18n (Texto / HTML)
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (!el.hasAttribute('data-original-text')) {
        el.setAttribute('data-original-text', el.innerHTML);
      }

      if (!isEn) {
        el.innerHTML = el.getAttribute('data-original-text');
        return;
      }

      if (I18N.ui && I18N.ui[key] && I18N.ui[key]['en']) {
        let translation = I18N.ui[key]['en'];
        const count = el.getAttribute('data-i18n-count');
        if (count !== null) {
          translation = translation.replace('{count}', count);
        }
        el.innerHTML = translation;
      }
    });

    // 2. Elementos com data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (!el.hasAttribute('data-original-placeholder')) {
        el.setAttribute('data-original-placeholder', el.getAttribute('placeholder') || '');
      }

      if (!isEn) {
        el.setAttribute('placeholder', el.getAttribute('data-original-placeholder'));
        return;
      }

      if (I18N.ui && I18N.ui[key] && I18N.ui[key]['en']) {
        el.setAttribute('placeholder', I18N.ui[key]['en']);
      }
    });

    // 3. Elementos com data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      const key = el.getAttribute('data-i18n-title');
      if (!el.hasAttribute('data-original-title')) {
        el.setAttribute('data-original-title', el.getAttribute('title') || '');
      }

      if (!isEn) {
        el.setAttribute('title', el.getAttribute('data-original-title'));
        return;
      }

      if (I18N.ui && I18N.ui[key] && I18N.ui[key]['en']) {
        el.setAttribute('title', I18N.ui[key]['en']);
      }
    });

    // 4. Elementos com data-i18n-aria
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (!el.hasAttribute('data-original-aria')) {
        el.setAttribute('data-original-aria', el.getAttribute('aria-label') || '');
      }

      if (!isEn) {
        el.setAttribute('aria-label', el.getAttribute('data-original-aria'));
        return;
      }

      if (I18N.ui && I18N.ui[key] && I18N.ui[key]['en']) {
        el.setAttribute('aria-label', I18N.ui[key]['en']);
      }
    });

    // 5. Tradução de Cabeçalhos em .notion-content (H1, H2, H3)
    document.querySelectorAll('.notion-content h1, .notion-content h2, .notion-content h3').forEach((heading) => {
      if (!heading.hasAttribute('data-original-heading')) {
        heading.setAttribute('data-original-heading', heading.textContent.trim());
      }

      const orig = heading.getAttribute('data-original-heading');
      if (!isEn) {
        heading.textContent = orig;
        return;
      }

      if (I18N.headings) {
        for (const [ptText, enText] of Object.entries(I18N.headings)) {
          if (orig.includes(ptText) || orig === ptText) {
            heading.textContent = orig.replace(ptText, enText);
            break;
          }
        }
      }
    });

    // 6. Tooltips de WikiLinks não resolvidos
    document.querySelectorAll('.notion-wikilink-unresolved').forEach((link) => {
      if (!link.hasAttribute('data-original-tooltip')) {
        link.setAttribute('data-original-tooltip', link.getAttribute('title') || 'Conceito em catalogação');
      }
      link.setAttribute('title', isEn ? 'Concept being cataloged' : link.getAttribute('data-original-tooltip'));
    });

    // 7. Seção de Backlinks (Mencionado em)
    const backlinksTitle = document.querySelector('.notion-backlinks-title');
    if (backlinksTitle) {
      if (!backlinksTitle.hasAttribute('data-original-text')) {
        backlinksTitle.setAttribute('data-original-text', backlinksTitle.textContent.trim());
      }
      const orig = backlinksTitle.getAttribute('data-original-text');
      const match = orig.match(/\((\d+)\)/);
      const count = match ? match[1] : '';
      backlinksTitle.textContent = isEn ? `Mentioned in (${count})` : orig;
    }

    // 8. Tradução de Conteúdo do Verbete (Se houver tradução curada para o slug atual)
    const currentSlug = getCurrentSlug();
    const verbeteData = I18N.verbetes ? I18N.verbetes[currentSlug] : null;

    if (verbeteData) {
      // Traduz o Callout de Resumo/Síntese
      const calloutBody = document.querySelector('[data-pagefind-meta="summary"] .notion-callout-body');
      if (calloutBody) {
        if (!calloutBody.hasAttribute('data-original-summary')) {
          calloutBody.setAttribute('data-original-summary', calloutBody.innerHTML);
        }
        if (isEn && verbeteData.summary) {
          calloutBody.innerHTML = `<strong>Conceptual Synthesis:</strong> ${verbeteData.summary}`;
        } else {
          calloutBody.innerHTML = calloutBody.getAttribute('data-original-summary');
        }
      }

      // Traduz as seções dentro de .notion-content
      const contentContainer = document.querySelector('.notion-content');
      if (contentContainer && verbeteData.sections) {
        if (!contentContainer.hasAttribute('data-original-content')) {
          contentContainer.setAttribute('data-original-content', contentContainer.innerHTML);
        }

        if (!isEn) {
          contentContainer.innerHTML = contentContainer.getAttribute('data-original-content');
        } else {
          // Substituição cirúrgica das seções
          const headings = contentContainer.querySelectorAll('h1');
          headings.forEach((h1) => {
            const headingText = h1.textContent || '';
            const match = headingText.match(/^(\d+)\./);
            if (match) {
              const secNum = match[1];
              const translatedSectionHtml = verbeteData.sections[secNum];
              if (translatedSectionHtml) {
                // Coleta todos os nós irmãos até o próximo h1
                let next = h1.nextElementSibling;
                const nodesToRemove = [];
                while (next && next.tagName !== 'H1') {
                  nodesToRemove.push(next);
                  next = next.nextElementSibling;
                }
                nodesToRemove.forEach((n) => n.remove());

                // Insere o HTML traduzido após o h1
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = translatedSectionHtml;
                while (tempDiv.firstChild) {
                  h1.parentNode.insertBefore(tempDiv.firstChild, next);
                }
              }
            }
          });
        }
      }
    }
  }

  // Atualizar botões de idioma na UI
  function updateLanguageButtons(lang) {
    const label = document.getElementById('language-label');
    if (label) {
      label.textContent = lang === 'en' ? 'EN' : 'PT-BR';
    }

    document.querySelectorAll('.notion-language-option').forEach((opt) => {
      const optLang = opt.getAttribute('data-lang');
      const isActive = optLang === lang;
      opt.classList.toggle('active', isActive);
      opt.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const toggle = document.getElementById('language-toggle');
    if (toggle) {
      toggle.setAttribute('title', lang === 'en' ? 'Switch language' : 'Alternar idioma');
      toggle.setAttribute('aria-label', lang === 'en' ? 'Selected language: English' : 'Idioma selecionado: Português');
    }
  }

  // API pública global
  window.GrimoarLanguage = {
    get: getActiveLang,
    set: function (lang) {
      const valid = lang === 'en' ? 'en' : 'pt-BR';
      try {
        localStorage.setItem(STORAGE_KEY, valid);
      } catch (e) {}

      document.documentElement.lang = valid === 'en' ? 'en' : 'pt-BR';
      document.documentElement.setAttribute('data-lang', valid);

      updateLanguageButtons(valid);
      translateUI(valid);

      document.dispatchEvent(new CustomEvent('grimoar:language-change', { detail: { lang: valid } }));
    },
    toggle: function () {
      const current = getActiveLang();
      this.set(current === 'en' ? 'pt-BR' : 'en');
    },
  };

  // Inicialização no DOM
  document.addEventListener('DOMContentLoaded', () => {
    const active = getActiveLang();
    document.documentElement.lang = active === 'en' ? 'en' : 'pt-BR';
    document.documentElement.setAttribute('data-lang', active);
    updateLanguageButtons(active);
    if (active === 'en') {
      translateUI('en');
    }

    // Configuração do dropdown de idiomas
    const toggleBtn = document.getElementById('language-toggle');
    const dropdown = document.getElementById('language-dropdown');

    if (toggleBtn && dropdown) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !dropdown.hasAttribute('hidden');
        if (isOpen) {
          dropdown.setAttribute('hidden', '');
          toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
          dropdown.removeAttribute('hidden');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      });

      // Fechar ao clicar fora
      document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.setAttribute('hidden', '');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Fechar ao pressionar Esc
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !dropdown.hasAttribute('hidden')) {
          dropdown.setAttribute('hidden', '');
          toggleBtn.setAttribute('aria-expanded', 'false');
          toggleBtn.focus();
        }
      });

      // Seleção de opções
      dropdown.querySelectorAll('.notion-language-option').forEach((btn) => {
        btn.addEventListener('click', () => {
          const lang = btn.getAttribute('data-lang');
          window.GrimoarLanguage.set(lang);
          dropdown.setAttribute('hidden', '');
          toggleBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  });
})();
