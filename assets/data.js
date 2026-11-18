/* ===========================================================
   Quality Network — content (single source of truth)
   Transcribed from the Quality Network mind map
   =========================================================== */

const COMPANY = {
  brand: 'Quality',
  legal: 'Egyptian Engineering Projects Co.',
  branch: 'Network / Data',
  phone: '(+202) 22602665',
  tel: '+20222602665',
  email: 'quality@qualityegypt.com',
  address: '13 El Obour Buildings, Salah Salem St., Cairo, Egypt',
  site: 'https://qualityegypt.com/'
};

const AUTHOR = {
  name: 'Seif Eldin',
  github: 'https://github.com/seifmomo',
  linkedin: 'https://www.linkedin.com/in/seif-said-a9441b366'
};

/* The 9 tabs of the site */
const TABS = [
  {id: 'home',      file: 'index.html',     label: 'Home',           sub: 'Quality Network'},
  {id: 'projects',  file: 'projects.html',  label: 'Landmarks',      sub: '13 sites'},
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
    blurb: 'The switching layer — from access ports at the desk to the core in the comms room, plus the wireless that carries it.',
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
    blurb: 'The software that keeps the network honest — management, monitoring, controller platforms and licences.',
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
    blurb: 'Everything that carries the signal — copper and fibre cabling, pathways, patching and the certificates that prove it.',
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
    blurb: 'Where the kit actually lives — racks, power, cooling and the room that holds them.',
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
    blurb: 'Voice on the same network as data — PBX, handsets, call management and voice over data.',
    brands: [
      {b: 'Alcatel', with: ['Smart Technology']},
      {b: 'Mitel', with: ['Spec Egypt']},
      {b: 'Grand Steem', with: ['Brand Connection']},
      {b: 'Avaya', with: ['Smart Technology', 'Aura-Tech.net']}
    ]
  }
];

/* ===========================================================
   LANDMARK PROJECTS
   The sites behind the network — transcribed from the
   Infrastructure Projects mind map (four hubs, 13 sites).
   =========================================================== */

const PROJECT_HUBS = [
  {
    id: 'government', no: '01', name: 'Government & Presidential', ar: 'الحكومة والرئاسية',
    color: '#1D6FA5',
    blurb: 'The addresses where the state works — a presidential palace, the Arab League, an embassy programme and a judicial authority. Security, sovereignty and uptime are the brief.'
  },
  {
    id: 'venues', no: '02', name: 'Stadiums & Venues', ar: 'الاستادات والملاعب',
    color: '#12855B',
    blurb: 'A 20,000-seat indoor hall and two conference halls on New Cairo’s main axis. Event-day traffic arrives all at once — ticketing, broadcast, operations and thousands of devices.'
  },
  {
    id: 'realestate', no: '03', name: 'Real Estate Developments', ar: 'التطوير العقاري',
    color: '#7A4A9E',
    blurb: 'A GPON tower, a 500-acre community, a Montaza hotel and a 63-acre compound — fibre, Wi-Fi and voice across the places people live, stay and work.'
  },
  {
    id: 'medical', no: '04', name: 'Medical Facilities', ar: 'المنشآت الطبية',
    color: '#B23A48',
    blurb: 'Cardiology, laparoscopy and a specialist facility — clinical environments where the passive and active layers carry imaging, records and voice, and downtime is not an option.'
  }
];

const PROJECTS = [
  /* ---------------- Government & Presidential ---------------- */
  {
    id: 'presidential-palace', hub: 'government', no: '01',
    name: 'Presidential Palace', ar: 'قصر الرئاسة',
    place: 'Heliopolis, Cairo', city: 'Cairo',
    photo: 'img/projects/presidential-palace.jpg',
    scope: ['Active', 'Passive'],
    brands: ['Cisco', 'Nexans'],
    summary: 'The official workplace of the Egyptian Presidency, in a 1910 palace at the heart of Heliopolis.',
    detail: 'Al-Ittihadiya Palace — the Heliopolis Palace — was built as the Heliopolis Palace Hotel between 1908 and 1910, designed by Ernest Jaspar, and became the presidential seat in the 1980s. A Cisco active layer and a Nexans passive plant serve a working palace where heritage fabric and modern connectivity share the same walls.',
    facts: ['Built 1908–1910 · presidential seat since the 1980s', 'Active: Cisco', 'Passive: Nexans']
  },
  {
    id: 'arab-league', hub: 'government', no: '02',
    name: 'Arab League', ar: 'جامعة الدول العربية',
    place: 'Tahrir Square, Cairo', city: 'Cairo',
    photo: 'img/projects/arab-league.jpg',
    scope: ['Active'],
    brands: ['Cisco'],
    summary: 'The headquarters of the Arab League on Tahrir Square — a modernist landmark at the centre of Cairo.',
    detail: 'Built between 1958 and 1960 to the design of the Egyptian architect Mahmoud Riad, the Arab League headquarters has hosted the institution’s summits since 1964. Cisco switching carries the building’s data backbone, in a diplomatic setting where the network is part of the institution itself.',
    facts: ['Built 1958–1960 · architect Mahmoud Riad', 'On Tahrir Square, Downtown Cairo', 'Active: Cisco']
  },
  {
    id: 'capitals-embassies', hub: 'government', no: '03',
    name: 'The Capitals’ Embassies', ar: 'السفارات',
    place: 'New Administrative Capital', city: 'New Administrative Capital',
    photo: 'img/projects/capitals-embassies.jpg',
    scope: ['Active', 'WiFi'],
    brands: ['Huawei'],
    summary: 'A diplomatic quarter for the new capital — and one of the largest access rollouts on the map.',
    detail: 'The New Administrative Capital’s diplomatic district is planned across some 1,500 feddans, with embassies moving their headquarters into the new city. Huawei active equipment carries the programme: 50 aggregation switches, 275 access switches and 300 wireless access points, delivered as one consistent layer.',
    facts: ['50 aggregation switches', '275 access switches', '300 wireless access points', 'Active + WiFi: Huawei'],
    metrics: [['50', 'aggregation switches'], ['275', 'access switches'], ['300', 'wireless APs']]
  },
  {
    id: 'state-lawsuits', hub: 'government', no: '04',
    name: 'State Lawsuits Authority', ar: 'قضايا الدولة',
    place: 'New Cairo', city: 'New Cairo',
    photo: 'img/projects/state-lawsuits.jpg',
    scope: ['Active', 'IP Telephony'],
    brands: ['Cisco', 'Alcatel-Lucent'],
    summary: 'A new judicial headquarters in New Cairo, built around a connected workplace.',
    detail: 'The Authority’s new headquarters was built on a 5,775 m² plot with a basement, ground floor and three upper floors, at a cost of EGP 150 million. Cisco active switching and an Alcatel-Lucent IP telephony layer serve the building — data and voice on the same infrastructure.',
    facts: ['5,775 m² · basement + ground + 3 floors', 'Active: Cisco', 'IP Telephony: Alcatel-Lucent']
  },

  /* ---------------- Stadiums & Venues ---------------- */
  {
    id: 'cairo-stadium-hall', hub: 'venues', no: '05',
    name: 'Cairo Stadium Hall', ar: 'ستاد القاهرة — الصالة',
    place: 'Nasr City, Cairo', city: 'Cairo',
    photo: 'img/projects/cairo-stadium-hall.jpg',
    scope: ['Active'],
    brands: ['Aruba'],
    summary: 'The indoor hall at Cairo International Stadium — 20,000 seats and a handball fortress.',
    detail: 'The Cairo Stadium Indoor Halls Complex opened in 1991; its main hall is 120 metres across and 39.5 metres high, with capacity for 20,000 spectators and a place at the centre of Egyptian handball. Aruba core and access switches support the hall’s event-day network, where ticketing, broadcast and operations share the same infrastructure.',
    facts: ['Opened 1991 · 20,000 spectators', 'Main hall 120 m across · 39.5 m high', 'Active: Aruba core & access'],
    metrics: [['20,000', 'spectator seats'], ['120 m', 'main hall span'], ['1991', 'opened']]
  },
  {
    id: 'al-manara', hub: 'venues', no: '06',
    name: 'Al Manara 1 & 2', ar: 'المنارة ١ و٢',
    place: 'New Cairo', city: 'New Cairo',
    photo: 'img/projects/al-manara.jpg',
    scope: ['Active', 'Cabling'],
    brands: ['Cisco', 'CommScope'],
    summary: 'Two conference halls at Al Manara, the international conference centre on New Cairo’s main axis.',
    detail: 'Al Manara International Conference Center sits on El-Moshir Tantawy Axis in New Cairo, with a main theatre, exhibition space and a full events programme. Cisco active switching and CommScope structured cabling support the halls’ dense, event-driven traffic — delegates, broadcast, translation and operations.',
    facts: ['Conference & exhibition venue, New Cairo', 'Active: Cisco', 'Cabling: CommScope']
  },

  /* ---------------- Real Estate Developments ---------------- */
  {
    id: 'salam-tower', hub: 'realestate', no: '07',
    name: 'Salam Tower', ar: 'برج السلام',
    place: 'Cairo', city: 'Cairo',
    photo: 'img/projects/salam-tower.jpg',
    scope: ['Active', 'WiFi'],
    brands: ['Huawei'],
    summary: 'A residential tower served end-to-end on Huawei GPON.',
    detail: 'GPON from Huawei, managed through iMaster NMS, brings fibre into the building; Huawei Wi-Fi covers the shared spaces and apartments. One vendor, one management plane — the model for a residential tower where the network is part of the address.',
    facts: ['Access: Huawei GPON', 'Management: iMaster NMS', 'WiFi: Huawei']
  },
  {
    id: 'palm-hills', hub: 'realestate', no: '08',
    name: 'PHNC Palm Hills', ar: 'بالم هيلز',
    place: 'New Cairo', city: 'New Cairo',
    photo: 'img/projects/palm-hills.jpg',
    scope: ['Active', 'Passive', 'IP Telephony'],
    brands: ['Cisco', 'Aruba', 'Premium-Line', 'Alcatel-Lucent'],
    summary: 'Palm Hills New Cairo — around 500 acres of villas, townhouses and apartments on the Middle Ring Road.',
    detail: 'Palm Hills New Cairo (PHNC) is a mixed-use community in the Fifth Settlement, with residential and commercial space across roughly 500 acres. A Cisco data switch and an Aruba switching layer sit over a Premium-Line passive plant, with Alcatel-Lucent IP telephony completing the community’s core network.',
    facts: ['~500 acres · Fifth Settlement, New Cairo', 'Active: Cisco + Aruba', 'Passive: Premium-Line', 'IP Telephony: Alcatel-Lucent'],
    metrics: [['500', 'acres'], ['3', 'network layers'], ['4', 'technology brands']]
  },
  {
    id: 'nariman-hotel', hub: 'realestate', no: '09',
    name: 'Nariman Hotel, Alexandria', ar: 'فندق ناريمان — الإسكندرية',
    place: 'Montaza, Alexandria', city: 'Alexandria',
    photo: 'img/projects/nariman-hotel.jpg',
    scope: ['Active', 'WiFi'],
    brands: ['Huawei'],
    summary: 'The historic Nariman hotel in Montaza — now Rixos Montaza Alexandria — on the Mediterranean.',
    detail: 'Set in the Montaza district of Alexandria, beside the palace gardens and the Mediterranean, the hotel is now Rixos Montaza Alexandria. A full Huawei stack — core, master server, controllers and access points — gives guests and operations one wireless fabric across the resort.',
    facts: ['Montaza, Alexandria · Mediterranean', 'Active + WiFi: Huawei', 'Core · master server · controllers · APs']
  },
  {
    id: 'city-view', hub: 'realestate', no: '10',
    name: 'City View, 6 October', ar: 'سيتي فيو ٦ أكتوبر',
    place: '6th of October City', city: '6th of October',
    photo: 'img/projects/city-view.jpg',
    scope: ['Active', 'Passive'],
    brands: ['D-Link', 'Black Stone'],
    summary: 'A 63-acre residential compound on the Cairo–Alexandria Desert Road.',
    detail: 'City View is a 63-acre community in 6th of October City, with apartments, villas, twin houses and townhouses around landscaped grounds. A D-Link data switching layer and a Black Stone passive plant provide the shared network — a compact, direct-supply scope.',
    facts: ['63 acres · 6th of October City', 'Active: D-Link', 'Passive: Black Stone']
  },

  /* ---------------- Medical Facilities ---------------- */
  {
    id: 'heart-institute', hub: 'medical', no: '11',
    name: 'Heart Institute & Demerdash', ar: 'معهد القلب والدمرداش',
    place: 'Giza · Abbassia, Cairo', city: 'Giza',
    photo: 'img/projects/heart-institute.jpg',
    scope: ['Active', 'Passive'],
    brands: ['Cisco', 'Legrand'],
    summary: 'Cardiology at the National Heart Institute and the El Demerdash university-hospital campus.',
    detail: 'The National Heart Institute was founded in 1966 and is one of the region’s largest heart centres; El Demerdash is the founding hospital of Ain Shams University Hospitals, established in 1928. Across the two campuses, Cisco switching and a Legrand passive layer support a clinical environment where uptime is measured in patient outcomes, not minutes.',
    facts: ['National Heart Institute · founded 1966', 'El Demerdash · Ain Shams University Hospitals, 1928', 'Active: Cisco', 'Passive: Legrand']
  },
  {
    id: 'demerdash-laparoscopy', hub: 'medical', no: '12',
    name: 'Demerdash Laparoscopy', ar: 'الدمرداش — المناظير',
    place: 'Abbassia, Cairo', city: 'Cairo',
    photo: 'img/projects/demerdash-laparoscopy.jpg',
    scope: ['Active', 'Passive', 'IP Telephony'],
    brands: ['Huawei', 'Aruba', 'Legrand', 'Mitel'],
    summary: 'The laparoscopy unit at El Demerdash, part of Ain Shams University Hospitals.',
    detail: 'The endoscopy and laparoscopy units sit within the El Demerdash hospital campus in Abbassia. Huawei and Aruba switching, a Legrand passive layer and Mitel IP telephony serve a specialist surgical unit where imaging, records and voice move alongside the procedure.',
    facts: ['Ain Shams University Hospitals · Abbassia', 'Active: Huawei + Aruba', 'Passive: Legrand', 'IP Telephony: Mitel']
  },
  {
    id: 'ift', hub: 'medical', no: '13',
    name: 'IFT', ar: 'إي إف تي',
    place: 'Cairo', city: 'Cairo',
    photo: 'img/projects/ift-cabling.jpg',
    scope: ['Passive'],
    brands: ['Legrand'],
    summary: 'A specialist medical facility with a Legrand passive scope.',
    detail: 'The network map records a passive-only scope at IFT: structured cabling delivered on Legrand. The physical layer is the part nobody sees — and the part every clinical system depends on.',
    facts: ['Medical facility · Cairo', 'Passive: Legrand']
  }
];

/* Cities represented across the portfolio */
const PROJECT_CITIES = ['Cairo', 'New Cairo', 'New Administrative Capital', '6th of October', 'Giza', 'Alexandria'];

/* Brand logos shipped with the site (img/brands) */
const LOGO = {
  cisco: 'cisco.svg',
  huawei: 'huawei.svg',
  aruba: 'aruba.svg',
  'd-link': 'dlink.svg',
  commscope: 'commscope.png',
  legrand: 'legrand.svg',
  nexans: 'nexans.svg',
  'alcatel-lucent': 'alcatel-lucent.svg',
  mitel: 'mitel.svg',
  'premium-line': 'premium-line.png',
  'premium line': 'premium-line.png',
  'black stone': 'blackstone.svg',
  blackstone: 'blackstone.svg'
};

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