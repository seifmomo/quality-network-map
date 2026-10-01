/* ===========================================================
   Quality Network â€” content (single source of truth)
   Transcribed from the Quality Network mind map
   =========================================================== */

const COMPANY = {
  brand: 'Quality',
  legal: 'Egyptian Engineering Projects Co.',
  branch: 'Network / Data',
  logo: 'https://qualityegypt.com/wp-content/uploads/2022/09/QLogoW.png',
  phone: '(+202) 22602665',
  tel: '+20222602665',
  email: 'quality@qualityegypt.com',
  address: '13 El Obour Buildings, Salah Salem St., Cairo, Egypt',
  site: 'https://qualityegypt.com/'
};

/* The 9 tabs of the site */
const TABS = [
  {id: 'home',      file: 'index.html',     label: 'Home',           sub: 'Quality Network'},
  {id: 'active',    file: 'active.html',    label: 'Active / WiFi',  sub: '5 brands'},
  {id: 'industrial',file: 'industrial.html',label: 'Industrial SW',  sub: '4 brands'},
  {id: 'passive',   file: 'passive.html',   label: 'Passive',        sub: '9 brands'},
  {id: 'rack',      file: 'rack.html',      label: 'Rack',           sub: '5 brands'},
  {id: 'phone',     file: 'phone.html',     label: 'IP Telephone',   sub: '4 brands'},
  {id: 'supply',    file: 'supply.html',    label: 'Supply partners',sub: '18 partners'},
  {id: 'contact',   file: 'contact.html',   label: 'Contact',        sub: 'Cairo, Egypt'}
];

const MINDMAP = [
  {
    id: 'active', no: '01', title: 'Active / WiFi',
    note: 'Core and access switching, wireless access points, controllers, routers, firewalls and PoE.',
    blurb: 'The switching layer â€” from access ports at the desk to the core in the comms room, plus the wireless that carries it.',
    brands: [
      {b: 'Huawei', with: ['Redingtone', 'Metra', 'Mantrac']},
      {b: 'Cisco', with: ['Metra', 'Mantrac']},
      {b: 'Aruba', with: ['Metra', 'IngramMicro']},
      {b: 'D-Link', with: []},
      {b: 'TP-Link', with: []}
    ]
  },
  {
    id: 'industrial', no: '02', title: 'Industrial SW',
    note: 'Network management, monitoring and configuration platforms.',
    blurb: 'The software that keeps the network honest â€” management, monitoring, controller platforms and licences.',
    brands: [
      {b: 'Planet', with: ['Pro-Vid']},
      {b: 'Antaira', with: ['El Con Novd']},
      {b: 'TrendNet', with: ['Silicon 21']},
      {b: 'Huawei', with: ['Intepris / E-Kit']}
    ]
  },
  {
    id: 'passive', no: '03', title: 'Passive',
    note: 'Structured cabling, pathways, patching, labelling, testing and certification.',
    blurb: 'Everything that carries the signal â€” copper and fibre cabling, pathways, patching and the certificates that prove it.',
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
    id: 'rack', no: '04', title: 'Rack',
    note: 'Racks, enclosures, power distribution, UPS and data room containment.',
    blurb: 'Where the kit actually lives â€” racks, power, cooling and the room that holds them.',
    brands: [
      {b: 'ACS', with: []},
      {b: 'Pro-Rack', with: ['Brand Connection']},
      {b: 'Black Stone', with: ['Start']},
      {b: 'Mirsan', with: ['Universe']},
      {b: 'ESTAP', with: ['Universe']}
    ]
  },
  {
    id: 'phone', no: '05', title: 'IP Telephone',
    note: 'IP PBX, handsets, call management and voice over data.',
    blurb: 'Voice on the same network as data â€” PBX, handsets, call management and voice over data.',
    brands: [
      {b: 'Alcatel', with: ['Smart Technology']},
      {b: 'Mitel', with: ['Spec Egypt']},
      {b: 'Grand Steem', with: ['Brand Connection']},
      {b: 'Avaya', with: ['Smart Technology', 'Aura-Tech.net']}
    ]
  }
];

/* Brand names with an official free SVG (Simple Icons) */
const LOGO = {huawei: 'huawei', cisco: 'cisco', 'tp-link': 'tplink'};

/* Every distinct supply partner, with the branches it serves */
const SUPPLY = (() => {
  const names = [...new Set(MINDMAP.flatMap(c => c.brands.flatMap(x => x.with)))].sort((a, b) => a.localeCompare(b));
  return names.map(p => ({
    p,
    serves: MINDMAP.filter(c => c.brands.some(x => x.with.includes(p))),
    brands: MINDMAP.flatMap(c => c.brands.filter(x => x.with.includes(p)).map(x => x.b))
  }));
})();

const BRAND_COUNT = MINDMAP.reduce((n, c) => n + c.brands.length, 0);
const DIRECT = MINDMAP.flatMap(c => c.brands.filter(b => !b.with.length).map(b => b.b));
const BRANCH = id => MINDMAP.find(c => c.id === id);