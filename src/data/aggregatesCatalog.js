// Źródło: Cennik_agregaty_Bergson_2026-10.xlsx (arkusz „Cennik”), ceny detaliczne brutto
// obowiązujące od 10.2026. Wszystkie modele wyciszone, chłodzone cieczą, 400/230 V, 50 Hz.
// Sufiks -ST w nazwie modelu = wersja z alternatorem Stamford (ten sam silnik i ta sama
// moc co wersja bazowa, inny — droższy — alternator). SZR (ATS) jest opcją dla każdego
// modelu, nie wyposażeniem standardowym.

const RAW = [
  { model: 'BM20C', kw: 20, engine: 'Cummins', engineModel: '4B3.9-G2', kwPrp: 24.0, kvaPrp: 30.0, kwEsp: 27.0, kvaEsp: 33.8, alternator: 'PDL-184F', controller: 'SmartGen 6120', length: 1950, width: 900, height: 1200, weight: 780, priceGross: 46900 },
  { model: 'BM20R', kw: 20, engine: 'Ricardo', engineModel: '495D', kwPrp: 24.0, kvaPrp: 30.0, kwEsp: 27.0, kvaEsp: 33.8, alternator: 'PDL-184F', controller: 'SmartGen 6120', length: 1950, width: 900, height: 1100, weight: 780, priceGross: 28900 },
  { model: 'BM20W', kw: 20, engine: 'Weichai', engineModel: 'WP2.3D25E200', kwPrp: 24.0, kvaPrp: 30.0, kwEsp: 27.0, kvaEsp: 33.8, alternator: 'PDL-184F', controller: 'SmartGen 6120', length: 1950, width: 900, height: 1200, weight: 780, priceGross: 32900 },
  { model: 'BM25C', kw: 25, engine: 'Cummins', engineModel: '4B3.9-G12', kwPrp: 27.0, kvaPrp: 33.8, kwEsp: 30.0, kvaEsp: 37.5, alternator: 'PDL-184G1', controller: 'SmartGen 6120', length: 2100, width: 950, height: 1250, weight: 800, priceGross: 47900 },
  { model: 'BM25P', kw: 25, engine: 'Perkins', engineModel: '1103A-33G', kwPrp: 28.0, kvaPrp: 35.0, kwEsp: 31.0, kvaEsp: 38.8, alternator: 'PDL-184G1', controller: 'SmartGen 6120', length: 2100, width: 950, height: 1250, weight: 800, priceGross: 57900 },
  { model: 'BM25R', kw: 25, engine: 'Ricardo', engineModel: '4100D', kwPrp: 30.0, kvaPrp: 37.5, kwEsp: 33.0, kvaEsp: 41.3, alternator: 'PDL-184G', controller: 'SmartGen 6120', length: 2100, width: 900, height: 1100, weight: 800, priceGross: 32900 },
  { model: 'BM25W', kw: 25, engine: 'Weichai', engineModel: 'WP2.3D33E200', kwPrp: 30.0, kvaPrp: 37.5, kwEsp: 33.0, kvaEsp: 41.3, alternator: 'PDL-184G1', controller: 'SmartGen 6120', length: 2100, width: 950, height: 1250, weight: 800, priceGross: 34900 },
  { model: 'BM30C', kw: 30, engine: 'Cummins', engineModel: '4BT3.9-G2', kwPrp: 36.0, kvaPrp: 45.0, kwEsp: 40.0, kvaEsp: 50.0, alternator: 'PDL-184H', controller: 'SmartGen 6120', length: 2100, width: 950, height: 1250, weight: 850, priceGross: 48900 },
  { model: 'BM30R', kw: 30, engine: 'Ricardo', engineModel: '4100ZD', kwPrp: 42.0, kvaPrp: 52.5, kwEsp: 46.0, kvaEsp: 57.5, alternator: 'PDL-184H', controller: 'SmartGen 6120', length: 2100, width: 900, height: 1100, weight: 850, priceGross: 36900 },
  { model: 'BM30W', kw: 30, engine: 'Weichai', engineModel: 'WP2.3D40E200', kwPrp: 36.0, kvaPrp: 45.0, kwEsp: 40.0, kvaEsp: 50.0, alternator: 'PDL-184H', controller: 'SmartGen 6120', length: 2100, width: 950, height: 1250, weight: 850, priceGross: 38900 },
  { model: 'BM40C', kw: 40, engine: 'Cummins', engineModel: '4BTA3.9-G2', kwPrp: 50.0, kvaPrp: 62.5, kwEsp: 55.0, kvaEsp: 68.8, alternator: 'PDL-224D', controller: 'SmartGen 6120', length: 2300, width: 900, height: 1200, weight: 950, priceGross: 54900 },
  { model: 'BM40P', kw: 40, engine: 'Perkins', engineModel: '1103A-33TG1', kwPrp: 42.0, kvaPrp: 52.5, kwEsp: 46.0, kvaEsp: 57.5, alternator: 'PDL-224D', controller: 'SmartGen 6120', length: 2200, width: 1000, height: 1300, weight: 850, priceGross: 64900 },
  { model: 'BM40R', kw: 40, engine: 'Ricardo', engineModel: 'ZH4105ZD', kwPrp: 48.0, kvaPrp: 60.0, kwEsp: 53.0, kvaEsp: 66.3, alternator: 'PDL-224D', controller: 'SmartGen 6120', length: 2300, width: 900, height: 1200, weight: 980, priceGross: 39900 },
  { model: 'BM40W', kw: 40, engine: 'Weichai', engineModel: 'WP2.3D48E200', kwPrp: 44.0, kvaPrp: 55.0, kwEsp: 48.0, kvaEsp: 60.0, alternator: 'PDL-224D', controller: 'SmartGen 6120', length: 2100, width: 950, height: 1250, weight: 850, priceGross: 42900 },
  { model: 'BM50C', kw: 50, engine: 'Cummins', engineModel: '4BTA3.9-G2', kwPrp: 58.0, kvaPrp: 72.5, kwEsp: 64.0, kvaEsp: 80.0, alternator: 'PDL-224E', controller: 'SmartGen 6120', length: 2400, width: 1000, height: 1300, weight: 1250, priceGross: 59900 },
  { model: 'BM50P', kw: 50, engine: 'Perkins', engineModel: '1104A-44TG1', kwPrp: 60.0, kvaPrp: 75.0, kwEsp: 66.0, kvaEsp: 82.5, alternator: 'PDL-224E', controller: 'SmartGen 6120', length: 2400, width: 1000, height: 1300, weight: 1250, priceGross: 69900 },
  { model: 'BM50R', kw: 50, engine: 'Ricardo', engineModel: 'R4105ZD', kwPrp: 56.0, kvaPrp: 70.0, kwEsp: 62.0, kvaEsp: 77.5, alternator: 'PDL-224E', controller: 'SmartGen 6120', length: 2300, width: 1000, height: 1200, weight: 1250, priceGross: 45900 },
  { model: 'BM50W', kw: 50, engine: 'Weichai', engineModel: 'WP4.1D66E200', kwPrp: 60.0, kvaPrp: 75.0, kwEsp: 66.0, kvaEsp: 82.5, alternator: 'PDL-224E', controller: 'SmartGen 6120', length: 2400, width: 1000, height: 1300, weight: 1250, priceGross: 48900 },
  { model: 'BM60C', kw: 60, engine: 'Cummins', engineModel: '4BTA3.9-G11', kwPrp: 70.0, kvaPrp: 87.5, kwEsp: 80.0, kvaEsp: 100.0, alternator: 'PDL-224G', controller: 'SmartGen 6120', length: 2500, width: 1100, height: 1350, weight: 1300, priceGross: 61900 },
  { model: 'BM60R', kw: 60, engine: 'Ricardo', engineModel: 'R4105AZLD', kwPrp: 72.0, kvaPrp: 90.0, kwEsp: 80.0, kvaEsp: 100.0, alternator: 'PDL-224F', controller: 'SmartGen 6120', length: 2500, width: 1100, height: 1350, weight: 1300, priceGross: 47900 },
  { model: 'BM60W', kw: 60, engine: 'Weichai', engineModel: 'WP4.1D80E200', kwPrp: 72.0, kvaPrp: 90.0, kwEsp: 80.0, kvaEsp: 100.0, alternator: 'PDL-224G', controller: 'SmartGen 6120', length: 2500, width: 1100, height: 1350, weight: 1300, priceGross: 57900 },
  { model: 'BM64P', kw: 64, engine: 'Perkins', engineModel: '1104A-44TG2', kwPrp: 73.0, kvaPrp: 91.3, kwEsp: 80.0, kvaEsp: 100.0, alternator: 'PDL-224G', controller: 'SmartGen 6120', length: 2500, width: 1100, height: 1350, weight: 1300, priceGross: 75900 },
  { model: 'BM80C', kw: 80, engine: 'Cummins', engineModel: '6BT5.9-G2', kwPrp: 86.0, kvaPrp: 107.5, kwEsp: 92.0, kvaEsp: 115.0, alternator: 'PDL-224H', controller: 'SmartGen 6120', length: 2800, width: 1100, height: 1600, weight: 1550, priceGross: 68900 },
  { model: 'BM80P', kw: 80, engine: 'Perkins', engineModel: '1104C-44TAG2', kwPrp: 93.0, kvaPrp: 116.3, kwEsp: 103.0, kvaEsp: 128.8, alternator: 'PDL-274C', controller: 'SmartGen 6120', length: 2800, width: 1100, height: 1600, weight: 1550, priceGross: 92900 },
  { model: 'BM80R', kw: 80, engine: 'Ricardo', engineModel: '6105AZD', kwPrp: 100.0, kvaPrp: 125.0, kwEsp: 110.0, kvaEsp: 137.5, alternator: 'PDL-224H', controller: 'SmartGen 6120', length: 3000, width: 1100, height: 1600, weight: 1550, priceGross: 58900 },
  { model: 'BM80W', kw: 80, engine: 'Weichai', engineModel: 'WP4.1D113E200', kwPrp: 96.0, kvaPrp: 120.0, kwEsp: 113.0, kvaEsp: 141.3, alternator: 'PDL-224H', controller: 'SmartGen 6120', length: 2800, width: 1100, height: 1600, weight: 1550, priceGross: 66900 },
  { model: 'BM100C', kw: 100, engine: 'Cummins', engineModel: '6BTA5.9-G2', kwPrp: 106.0, kvaPrp: 132.5, kwEsp: 116.0, kvaEsp: 145.0, alternator: 'PDL-274D', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1600, priceGross: 99900 },
  { model: 'BM100R', kw: 100, engine: 'Ricardo', engineModel: '6105AZLD', kwPrp: 120.0, kvaPrp: 150.0, kwEsp: 132.0, kvaEsp: 165.0, alternator: 'PDL-274D', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1600, priceGross: 84900 },
  { model: 'BM100W', kw: 100, engine: 'Weichai', engineModel: 'WP6D132E200', kwPrp: 120.0, kvaPrp: 150.0, kwEsp: 132.0, kvaEsp: 165.0, alternator: 'PDL-274D', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1600, priceGross: 89900 },
  { model: 'BM108P', kw: 108, engine: 'Perkins', engineModel: '1106A-70TG1', kwPrp: 127.0, kvaPrp: 158.8, kwEsp: 139.0, kvaEsp: 173.8, alternator: 'PDL-274D', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1600, priceGross: 129900 },
  { model: 'BM120C', kw: 120, engine: 'Cummins', engineModel: '6BTAA5.9-G2', kwPrp: 120.0, kvaPrp: 150.0, kwEsp: 130.0, kvaEsp: 162.5, alternator: 'PDL-274E', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1600, priceGross: 109900 },
  { model: 'BM120P', kw: 120, engine: 'Perkins', engineModel: '1106A-70TAG2', kwPrp: 139.0, kvaPrp: 173.8, kwEsp: 153.0, kvaEsp: 191.3, alternator: 'PDL-274E', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1600, priceGross: 139900 },
  { model: 'BM120R', kw: 120, engine: 'Ricardo', engineModel: '6105IZLD', kwPrp: 120.0, kvaPrp: 150.0, kwEsp: 132.0, kvaEsp: 165.0, alternator: 'PDL-274E', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1600, priceGross: 94900 },
  { model: 'BM120W', kw: 120, engine: 'Weichai', engineModel: 'WP6D152E200', kwPrp: 138.0, kvaPrp: 172.5, kwEsp: 152.0, kvaEsp: 190.0, alternator: 'PDL-274E', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1600, priceGross: 99900 },
  { model: 'BM144P', kw: 144, engine: 'Perkins', engineModel: '1106A-70TAG3', kwPrp: 168.0, kvaPrp: 210.0, kwEsp: 185.0, kvaEsp: 231.3, alternator: 'PDL-274G', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1750, priceGross: 154900 },
  { model: 'BM150C', kw: 150, engine: 'Cummins', engineModel: '6CTA8.3-G2', kwPrp: 163.0, kvaPrp: 203.8, kwEsp: 180.0, kvaEsp: 225.0, alternator: 'PDL-274G', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1600, priceGross: 124900 },
  { model: 'BM150C-ST', kw: 150, engine: 'Cummins', engineModel: '6CTA8.3-G2', kwPrp: 163.0, kvaPrp: 203.8, kwEsp: 180.0, kvaEsp: 225.0, alternator: 'Stamford UCI 274G', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1750, priceGross: 137900 },
  { model: 'BM150P-ST', kw: 150, engine: 'Perkins', engineModel: '1106A-70TAG3', kwPrp: 168.0, kvaPrp: 210.0, kwEsp: 185.0, kvaEsp: 231.3, alternator: 'Stamford UCI 274G', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1750, priceGross: 167900 },
  { model: 'BM150R', kw: 150, engine: 'Ricardo', engineModel: 'KXD185E215', kwPrp: 185.0, kvaPrp: 231.3, kwEsp: 200.0, kvaEsp: 250.0, alternator: 'PDL-274G', controller: 'SmartGen 6120', length: 3200, width: 1300, height: 1700, weight: 2250, priceGross: 104900 },
  { model: 'BM150R-ST', kw: 150, engine: 'Ricardo', engineModel: 'KXD185E215', kwPrp: 185.0, kvaPrp: 231.3, kwEsp: 200.0, kvaEsp: 250.0, alternator: 'Stamford UCI 274G', controller: 'SmartGen 6120', length: 3200, width: 1300, height: 1700, weight: 1750, priceGross: 117900 },
  { model: 'BM150W', kw: 150, engine: 'Weichai', engineModel: 'WP6D167E200', kwPrp: 152.0, kvaPrp: 190.0, kwEsp: 167.0, kvaEsp: 208.8, alternator: 'PDL-274G', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1600, priceGross: 109900 },
  { model: 'BM150W-ST', kw: 150, engine: 'Weichai', engineModel: 'WP6D167E200', kwPrp: 152.0, kvaPrp: 190.0, kwEsp: 167.0, kvaEsp: 208.8, alternator: 'Stamford UCI 274G', controller: 'SmartGen 6120', length: 3000, width: 1150, height: 1600, weight: 1750, priceGross: 122900 },
  { model: 'BM160C', kw: 160, engine: 'Cummins', engineModel: '6CTAA8.3-G2', kwPrp: 183.0, kvaPrp: 228.8, kwEsp: 203.0, kvaEsp: 253.8, alternator: 'PDL-274H', controller: 'SmartGen 6120', length: 3200, width: 1300, height: 1700, weight: 2250, priceGross: 139900 },
  { model: 'BM160P', kw: 160, engine: 'Perkins', engineModel: '1106A-70TAG4', kwPrp: 183.0, kvaPrp: 228.8, kwEsp: 202.0, kvaEsp: 252.5, alternator: 'PDL-274H', controller: 'SmartGen 6120', length: 3200, width: 1300, height: 1700, weight: 2250, priceGross: 169900 },
  { model: 'BM160W', kw: 160, engine: 'Weichai', engineModel: 'WP10D200E200', kwPrp: 185.0, kvaPrp: 231.3, kwEsp: 200.0, kvaEsp: 250.0, alternator: 'PDL-274H', controller: 'SmartGen 6120', length: 3200, width: 1300, height: 1700, weight: 2250, priceGross: 119900 },
  { model: 'BM200C', kw: 200, engine: 'Cummins', engineModel: '6LTAA8.9-G2', kwPrp: 220.0, kvaPrp: 275.0, kwEsp: 240.0, kvaEsp: 300.0, alternator: 'PDL-274K', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2500, priceGross: 154900 },
  { model: 'BM200C-ST', kw: 200, engine: 'Cummins', engineModel: '6LTAA8.9-G2', kwPrp: 220.0, kvaPrp: 275.0, kwEsp: 240.0, kvaEsp: 300.0, alternator: 'Stamford UCDI 274K', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2500, priceGross: 167900 },
  { model: 'BM200P', kw: 200, engine: 'Perkins', engineModel: '1206A-E70TTAG3', kwPrp: 226.0, kvaPrp: 282.5, kwEsp: 248.0, kvaEsp: 310.0, alternator: 'PDL-274K', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2500, priceGross: 199900 },
  { model: 'BM200P-ST', kw: 200, engine: 'Perkins', engineModel: '1206A-E70TTAG3', kwPrp: 226.0, kvaPrp: 282.5, kwEsp: 248.0, kvaEsp: 310.0, alternator: 'Stamford UCDI 274K', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2500, priceGross: 212900 },
  { model: 'BM200S', kw: 200, engine: 'Steyr', engineModel: 'WP10ZLD', kwPrp: 235.0, kvaPrp: 293.8, kwEsp: 258.0, kvaEsp: 322.5, alternator: 'PDL-274K', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2500, priceGross: 124900 },
  { model: 'BM200S-ST', kw: 200, engine: 'Steyr', engineModel: 'WP10ZLD', kwPrp: 235.0, kvaPrp: 293.8, kwEsp: 258.0, kvaEsp: 322.5, alternator: 'Stamford UCDI 274K', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2500, priceGross: 137900 },
  { model: 'BM200W', kw: 200, engine: 'Weichai', engineModel: 'WP10D238E200', kwPrp: 216.0, kvaPrp: 270.0, kwEsp: 238.0, kvaEsp: 297.5, alternator: 'PDL-274K', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2500, priceGross: 129900 },
  { model: 'BM200W-ST', kw: 200, engine: 'Weichai', engineModel: 'WP10D238E200', kwPrp: 216.0, kvaPrp: 270.0, kwEsp: 238.0, kvaEsp: 297.5, alternator: 'Stamford UCDI 274K', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2500, priceGross: 142900 },
  { model: 'BM250C', kw: 250, engine: 'Cummins', engineModel: '6LTAA9.5-G1', kwPrp: 290.0, kvaPrp: 362.5, kwEsp: 320.0, kvaEsp: 400.0, alternator: 'PDL-314D', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2750, priceGross: 179900 },
  { model: 'BM250C-ST', kw: 250, engine: 'Cummins', engineModel: '6LTAA9.5-G1', kwPrp: 290.0, kvaPrp: 362.5, kwEsp: 320.0, kvaEsp: 400.0, alternator: 'Stamford S4L1D-D4', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2750, priceGross: 192900 },
  { model: 'BM250P', kw: 250, engine: 'Perkins', engineModel: '1706A-E93TAG1', kwPrp: 276.0, kvaPrp: 345.0, kwEsp: 304.0, kvaEsp: 380.0, alternator: 'PDL-314D', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2750, priceGross: 259900 },
  { model: 'BM250P-ST', kw: 250, engine: 'Perkins', engineModel: '1706A-E93TAG1', kwPrp: 276.0, kvaPrp: 345.0, kwEsp: 304.0, kvaEsp: 380.0, alternator: 'Stamford S4L1D-D4', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2750, priceGross: 272900 },
  { model: 'BM250S', kw: 250, engine: 'Steyr', engineModel: 'WP618ZLD', kwPrp: 280.0, kvaPrp: 350.0, kwEsp: 308.0, kvaEsp: 385.0, alternator: 'PDL-314D', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2750, priceGross: 149900 },
  { model: 'BM250S-ST', kw: 250, engine: 'Steyr', engineModel: 'WP618ZLD', kwPrp: 280.0, kvaPrp: 350.0, kwEsp: 308.0, kvaEsp: 385.0, alternator: 'Stamford S4L1D-D4', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2750, priceGross: 162900 },
  { model: 'BM250W', kw: 250, engine: 'Weichai', engineModel: 'WP10D320E200', kwPrp: 290.0, kvaPrp: 362.5, kwEsp: 320.0, kvaEsp: 400.0, alternator: 'PDL-314D', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2750, priceGross: 154900 },
  { model: 'BM250W-ST', kw: 250, engine: 'Weichai', engineModel: 'WP10D320E200', kwPrp: 290.0, kvaPrp: 362.5, kwEsp: 320.0, kvaEsp: 400.0, alternator: 'Stamford S4L1D-D4', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 2750, priceGross: 167900 },
  { model: 'BM300C', kw: 300, engine: 'Cummins', engineModel: '6LTAA8.9-G2', kwPrp: 340.0, kvaPrp: 425.0, kwEsp: 380.0, kvaEsp: 475.0, alternator: 'PDL-314G', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 3500, priceGross: 219900 },
  { model: 'BM300C-ST', kw: 300, engine: 'Cummins', engineModel: '6LTAA8.9-G2', kwPrp: 340.0, kvaPrp: 425.0, kwEsp: 380.0, kvaEsp: 475.0, alternator: 'Stamford S4L1D-E4', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 3500, priceGross: 232900 },
  { model: 'BM300P', kw: 300, engine: 'Perkins', engineModel: '1706A-E93TAG2', kwPrp: 311.0, kvaPrp: 388.8, kwEsp: 342.5, kvaEsp: 428.1, alternator: 'PDL-314G', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 3500, priceGross: 279900 },
  { model: 'BM300P-ST', kw: 300, engine: 'Perkins', engineModel: '1706A-E93TAG2', kwPrp: 311.0, kvaPrp: 388.8, kwEsp: 342.5, kvaEsp: 428.1, alternator: 'Stamford S4L1D-E4', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 3500, priceGross: 292900 },
  { model: 'BM300S', kw: 300, engine: 'Steyr', engineModel: 'WP12ZLD', kwPrp: 340.0, kvaPrp: 425.0, kwEsp: 380.0, kvaEsp: 475.0, alternator: 'PDL-314G', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 3200, priceGross: 169900 },
  { model: 'BM300S-ST', kw: 300, engine: 'Steyr', engineModel: 'WP12ZLD', kwPrp: 340.0, kvaPrp: 425.0, kwEsp: 380.0, kvaEsp: 475.0, alternator: 'Stamford S4L1D-E4', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 3200, priceGross: 182900 },
  { model: 'BM300W', kw: 300, engine: 'Weichai', engineModel: 'WP12D353E200', kwPrp: 320.0, kvaPrp: 400.0, kwEsp: 353.0, kvaEsp: 441.3, alternator: 'PDL-314G', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 3500, priceGross: 174900 },
  { model: 'BM300W-ST', kw: 300, engine: 'Weichai', engineModel: 'WP12D353E200', kwPrp: 320.0, kvaPrp: 400.0, kwEsp: 353.0, kvaEsp: 441.3, alternator: 'Stamford S4L1D-E4', controller: 'SmartGen 6120', length: 3600, width: 1300, height: 1900, weight: 3500, priceGross: 187900 },
]

export const POWER_BANDS = [
  { id: 'p1', label: '20–40 kW', min: 20, max: 40 },
  { id: 'p2', label: '50–80 kW', min: 41, max: 80 },
  { id: 'p3', label: '100–160 kW', min: 81, max: 160 },
  { id: 'p4', label: '200–300 kW', min: 161, max: Infinity },
]

export const ENGINE_BRANDS = ['Ricardo', 'Weichai', 'Cummins', 'Perkins', 'Steyr']

export const AGGREGATES_CATALOG = RAW.map((r) => {
  const id = r.model.toLowerCase()

  return {
    id,
    name: r.model,
    engine: r.engine,
    engineModel: r.engineModel,
    alternator: r.alternator,
    stamfordAlternator: r.alternator.toLowerCase().startsWith('stamford'),
    controller: r.controller,
    kw: r.kw,
    kva: `${r.kvaPrp.toLocaleString('pl-PL', { maximumFractionDigits: 1 })} kVA`,
    kwEsp: r.kwEsp,
    kvaEsp: r.kvaEsp,
    dimensions: `${r.length} × ${r.width} × ${r.height} mm`,
    weight: r.weight,
    priceGross: r.priceGross,
    band: POWER_BANDS.find((b) => r.kw >= b.min && r.kw <= b.max).id,
    image: `/images/optimized/aggregates/${id}.webp`,
  }
})

export const MIN_KW = Math.min(...RAW.map((r) => r.kw))
export const MAX_KW = Math.max(...RAW.map((r) => r.kw))

// Rata orientacyjna: 10% wpłaty własnej + 1% opłaty, 60 mies., mnożnik 1.18 — jak w LeasingCalculatorSection.
export const VAT = 1.23
export function monthlyLeaseNet(priceGross) {
  return ((priceGross / VAT) * 0.89 * 1.18) / 60
}
