"""Browser checks for the running app. Requires Playwright Python and Chromium.

Run: python3 tests/browser_smoke.py (MEDINTERNA_BASE_URL optional).
Screenshots are written to /tmp, not the checkout.
"""
import os
import urllib.request
from playwright.sync_api import sync_playwright, expect

base = os.environ.get('MEDINTERNA_BASE_URL', 'http://127.0.0.1:3000')
with urllib.request.urlopen(base) as response:
    assert response.status == 200
    assert "frame-ancestors 'none'" in response.headers['Content-Security-Policy']

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium', headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(base)
    expect(page.get_by_role('heading', name='De la clasificación al manejo.')).to_be_visible()
    page.screenshot(path='/tmp/medinterna-desktop.png', full_page=True)
    page.get_by_role('button', name='Cargar ejemplo ficticio').click()
    expect(page.locator('#results')).to_contain_text('3 resultados fuera de intervalo')
    expect(page.locator('#results')).to_contain_text('Hipopotasemia moderada')
    expect(page.locator('#results')).to_contain_text('Hipopotasemia e hipomagnesemia simultáneas')
    expect(page.locator('#results')).to_contain_text('257.6')
    page.locator('#results [data-protocol="hypokalemia"]').click()
    expect(page.get_by_role('heading', name='Hipopotasemia', exact=True)).to_be_visible()
    expect(page.locator('.algorithm')).to_contain_text('Nunca administrar KCl concentrado en bolo')
    page.locator('.citation').first.click()
    expect(page.locator('#source-dialog')).to_be_visible()
    expect(page.locator('#source-dialog')).to_contain_text('Cotejo directo del texto')
    page.keyboard.press('Escape')
    expect(page.locator('#source-dialog')).not_to_be_visible()
    page.get_by_role('button', name='Todos los protocolos').click()
    page.get_by_role('button', name='Potasio', exact=True).click()
    expect(page.locator('.protocol-card')).to_have_count(2)
    page.get_by_role('searchbox', name='Buscar protocolos').fill('salbutamol')
    expect(page.locator('.protocol-card')).to_have_count(1)
    expect(page.locator('.protocol-card')).to_contain_text('Hiperpotasemia')
    page.locator('.protocol-card').click()
    expect(page.locator('.algorithm')).to_contain_text('360 min')
    page.emulate_media(media='print')
    page.pdf(path='/tmp/medinterna-hyperkalemia.pdf', format='A4', print_background=True)
    page.emulate_media(media='screen')
    page.get_by_role('button', name='Evaluación inicial').click()
    expect(page.locator('#sodium')).to_have_value('126')
    page.get_by_role('button', name='Limpiar', exact=True).click()
    page.locator('#potassium').fill('6,5')
    page.get_by_role('button', name='Evaluar resultados').click()
    expect(page.locator('#results')).to_contain_text('Hiperpotasemia grave')
    page.locator('#potassium').fill('6.5 mmol/L')
    expect(page.locator('#results .result-card')).to_have_count(0)
    page.get_by_role('button', name='Evaluar resultados').click()
    expect(page.locator('#form-error')).to_contain_text('número válido')
    page.get_by_role('button', name='Limpiar', exact=True).click()
    page.get_by_role('checkbox', name='Cambios en ECG o arritmia').check()
    page.get_by_role('button', name='Evaluar resultados').click()
    expect(page.locator('#results')).to_contain_text('Sin electrolitos')
    expect(page.locator('#results .notice.high')).to_contain_text('valoración urgente')
    page.get_by_role('button', name='Bibliografía', exact=True).click()
    page.get_by_role('button', name='Evaluación inicial').click()
    expect(page.locator('#results')).to_contain_text('Sin electrolitos')
    expect(page.locator('#results .notice.high')).to_contain_text('valoración urgente')
    page.get_by_role('button', name='Limpiar', exact=True).click()
    page.locator('#sodium').fill('160')
    page.locator('.additional-labs summary').click()
    page.locator('#weight').fill('70')
    page.locator('#glucose').fill('90')
    page.locator('#bun').fill('14')
    page.locator('#measuredOsm').fill('330')
    page.get_by_role('button', name='Evaluar resultados').click()
    expect(page.locator('.calculator-card')).to_contain_text('5.00')
    expect(page.locator('.calculator-card')).to_contain_text('330.0')
    expect(page.locator('.calculator-card')).to_contain_text('0.0')
    page.get_by_role('button', name='Bibliografía', exact=True).click()
    expect(page.locator('.reference-card')).to_have_count(15)
    expect(page.locator('.evidence-note')).to_contain_text('2025–2026')
    assert page.evaluate('localStorage.length') == 0
    assert page.evaluate('sessionStorage.length') == 0
    page.set_viewport_size({'width': 390, 'height': 844})
    for route in ['evaluation', 'protocols', 'references', 'hyponatremia']:
        page.goto(base + '/#' + route)
        assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth'), route
    page.goto(base)
    page.screenshot(path='/tmp/medinterna-mobile.png', full_page=True)
    assert not errors, errors
    browser.close()
print('Browser smoke: desktop/mobile, evaluation, calculations, filters, references, print and no persistent storage passed.')
