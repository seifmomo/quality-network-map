/* ===========================================================
   Quality Network — content
   Transcribed from the Quality Network mind map
   root: Quality > Network / Data
   =========================================================== */

const COMPANY = {
  brand: 'Quality',
  legal: 'Egyptian Engineering Projects Co.',
  branch: 'Network / Data',
  intro: 'The complete range we supply under Quality Network, and the distributor behind each brand.',
  phone: '(+202) 22602665',
  email: 'quality@qualityegypt.com',
  address: '13 El Obour Buildings, Salah Salem St., Cairo, Egypt',
  logo: 'https://qualityegypt.com/wp-content/uploads/2022/09/QLogoW.png',
  site: 'https://qualityegypt.com/'
};

const MINDMAP = [
  {
    id: 'active',
    no: '01',
    title: 'Active / WiFi',
    note: 'Core and access switching, wireless access points, routers, firewalls and PoE.',
    brands: [
      {b: 'Huawei', with: ['Redingtone', 'Metra', 'Mantrac']},
      {b: 'Cisco', with: ['Metra', 'Mantrac']},
      {b: 'Aruba', with: ['Metra', 'IngramMicro']},
      {b: 'D-Link', with: []},
      {b: 'TP-Link', with: []}
    ]
  },
  {
    id: 'industrial',
    no: '02',
    title: 'Industrial SW',
    note: 'Network management, monitoring and configuration platforms.',
    brands: [
      {b: 'Planet', with: ['Pro-Vid']},
      {b: 'Antaira', with: ['El Con Novd']},
      {b: 'TrendNet', with: ['Silicon 21']},
      {b: 'Huawei', with: ['Intepris / E-Kit']}
    ]
  },
  {
    id: 'passive',
    no: '03',
    title: 'Passive',
    note: 'Structured cabling, pathways, patching, labelling, testing and certification.',
    brands: [
      {b: 'El Sweedy', with: []},
      {b: 'Legrand', with: ['Universe']},
      {b: 'Leviton', with: ['Innovate Hub']},
      {b: 'Premium Line', with: ['Oasis Distribution']},
      {b: 'Panduit', with: ['Universe']},
      {b: 'Datwyler', with: ['Sky Group']},
      {b: 'Pro Link', with: ['Brand Connection']},
      {b: 'CommScope', with: ['Silicon 21', 'Middle East']},
      {b: 'Black Stone', with: ['Start']}
    ]
  },
  {
    id: 'rack',
    no: '04',
    title: 'Rack',
    note: 'Racks, enclosures, power distribution, UPS and data room containment.',
    brands: [
      {b: 'ACS', with: []},
      {b: 'Pro-Rack', with: ['Brand Connection']},
      {b: 'Black Stone', with: ['Start']},
      {b: 'Mirsan', with: ['Universe']},
      {b: 'ESTAP', with: ['Universe']}
    ]
  },
  {
    id: 'phone',
    no: '05',
    title: 'IP Telephone',
    note: 'IP PBX, handsets, call management and voice over data.',
    brands: [
      {b: 'Alcatel', with: ['Smart Technology']},
      {b: 'Mitel', with: ['Spec Egypt']},
      {b: 'Grand Steem', with: ['Brand Connection']},
      {b: 'Avaya', with: ['Smart Technology', 'Aura-Tech.net']}
    ]
  }
];

/* Brand names that have an official free SVG (Simple Icons) */
const LOGO = {huawei: 'huawei', cisco: 'cisco', 'tp-link': 'tplink'};

/* Every distinct supply partner, with the branches it serves */
const SUPPLY = (() => {
  const names = [...new Set(MINDMAP.flatMap(c => c.brands.flatMap(x => x.with)))].sort((a, b) => a.localeCompare(b));
  return names.map(p => ({
    p,
    for: MINDMAP.filter(c => c.brands.some(x => x.with.includes(p))).map(c => c.title)
  }));
})();