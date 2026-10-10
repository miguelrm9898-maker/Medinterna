"""Validate the exported document without a server or external requests.

The managed cloud browser blocks file:// navigation, so load the exact document
with set_content. This verifies the bundle; it does not claim a file:// test.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

export = Path(__file__).resolve().parent.parent / 'dist' / 'Medinterna.html'
assert export.is_file(), 'Run npm run export first.'
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width': 1280, 'height': 850})
    context.route('https://**/*', lambda route: route.abort())
    context.route('http://**/*', lambda route: route.abort())
    page = context.new_page()
    errors, external = [], []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('request', lambda request: external.append(request.url) if request.url.startswith(('http:', 'https:')) else None)
    page.set_content(export.read_text(encoding='utf-8'))
    expect(page.get_by_role('heading', name='De la clasificación al manejo.')).to_be_visible()
    page.screenshot(path='/tmp/Medinterna-vista.png')
    page.get_by_role('button', name='Cargar ejemplo ficticio').click()
    expect(page.locator('#results')).to_contain_text('3 resultados fuera de intervalo')
    expect(page.locator('#results')).to_contain_text('257.6')
    page.locator('#results [data-protocol="hypokalemia"]').click()
    expect(page.get_by_role('heading', name='Hipopotasemia', exact=True)).to_be_visible()
    page.locator('.citation').first.click()
    expect(page.locator('#source-dialog')).to_be_visible()
    page.keyboard.press('Escape')
    page.get_by_role('button', name='Todos los protocolos').click()
    expect(page.locator('.protocol-card')).to_have_count(10)
    page.get_by_role('button', name='Potasio', exact=True).click()
    expect(page.locator('.protocol-card')).to_have_count(2)
    page.get_by_role('searchbox', name='Buscar protocolos').fill('salbutamol')
    expect(page.locator('.protocol-card')).to_have_count(1)
    page.locator('.protocol-card').click()
    expect(page.locator('.algorithm')).to_contain_text('360 min')
    page.emulate_media(media='print')
    page.pdf(path='/tmp/Medinterna-protocolo-ejemplo.pdf', format='A4', print_background=True)
    page.emulate_media(media='screen')
    page.get_by_role('button', name='Bibliografía', exact=True).click()
    expect(page.locator('.reference-card')).to_have_count(15)
    expect(page.locator('.evidence-note')).to_contain_text('2025–2026')
    page.set_viewport_size({'width': 390, 'height': 844})
    for name in ['Evaluación inicial', 'Protocolos clínicos', 'Bibliografía']:
        page.get_by_role('button', name=name, exact=True).click()
        assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), name
    assert not errors, errors
    assert not external, external
    browser.close()
print('Portable HTML passed: embedded document, offline evaluation/calculations, navigation, filters, references, print, mobile; no external requests. Direct file:// navigation is blocked by cloud browser policy and was not validated.')
