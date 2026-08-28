import { asset } from './asset';
// Data and pure helpers, ported verbatim from the HTML design prototype.

export const INITIAL_STATE = {
    route: 'landing', polId: null, promiseId: null, tip: null, aboutTab: 'project',
    grp: 'All', fStatus: [], fCats: [], sort: 'recent', q: '',
    petFilter: 'all', following: {}, shared: false, showData: false,
    anModal: null, anStage: 'form', anKind: 'New evidence', anText: '', anSrc: '', anFiles: [],
    anEmail: '', anName: '', anCaptcha: false, anShared: '', followers: {},
    subVal: '', subDone: false,
    searchOpen: false, sq: '',
    heroIdx: 0, heroAuto: true,
    lb: null
  };

export const ORDER = ['completed','inprogress','inconclusive','unstarted','behind','stalled'];
export const LAB = { completed:'Completed', inprogress:'In Progress', inconclusive:'Inconclusive', unstarted:'Unstarted', behind:'Behind Schedule', stalled:'Stalled' };
export const DEFS = {
    completed: 'The promise has been fulfilled fully or in substantial part, backed by verifiable public evidence.',
    inprogress: 'Concrete, documented action is underway: budgets allocated, works started or bills tabled.',
    inconclusive: 'The starting status for every promise: not enough public evidence yet to judge movement either way.',
    unstarted: 'No verifiable action has been taken on the promise since it was made.',
    behind: "Action began but has slipped against the promise's own stated timelines: funding, opposition or shifted priorities.",
    stalled: 'Progress has stopped altogether, through administrative inaction, funding collapse or lack of legislative support.'
  };

export function statusPalette(mode) {
    mode = mode || 'traffic-light';
    if (mode === 'two-pole') return { completed:'#0b3fd6', inprogress:'#4fb4e0', inconclusive:'#5f6368', unstarted:'#c6cad0', behind:'#e08d0b', stalled:'#e02f3e' };
    return { completed:'#0b57ff', inprogress:'#79c9ee', inconclusive:'#7a7d82', unstarted:'#dcdfe3', behind:'#f5a623', stalled:'#f4525f' };
  }
export function statusPaletteText() {
    // legible-on-white companions to pal(); fills keep the reference hues, label text uses these
    return { completed:'#0b57ff', inprogress:'#1a6f96', inconclusive:'#5f6368', unstarted:'#63676d', behind:'#8a5300', stalled:'#c8102e' };
  }
export function statusPaletteDark(mode) {
    mode = mode || 'traffic-light';
    if (mode === 'two-pole') return { completed:'#5b8dff', inprogress:'#8ed3ef', inconclusive:'#a9adb4', unstarted:'#dfe2e6', behind:'#ffbe4d', stalled:'#ff7d87' };
    return { completed:'#4f8bff', inprogress:'#9fdcf7', inconclusive:'#a9adb4', unstarted:'#e5e7ea', behind:'#ffbe4d', stalled:'#ff7d87' };
  }

export const POLS = [
    { id:'ruto', n:'William Ruto', init:'WR', photo:asset('assets/pol-ruto.png'), role:'President', grp:'President', region:'Republic of Kenya', party:'UDA · Kenya Kwanza', since:'Sep 2022', term:'2022–2027', upd:'Jun 28, 2026', key:'r2' },
    { id:'sakaja', n:'Johnson Sakaja', init:'JS', photo:asset('assets/pol-sakaja.webp'), role:'Governor', grp:'Governors', region:'Nairobi City County', party:'UDA', since:'Aug 2022', term:'2022–2027', upd:'Jun 21, 2026', key:'s1' },
    { id:'waiguru', n:'Anne Waiguru', init:'AW', photo:asset('assets/pol-waiguru.png'), role:'Governor', grp:'Governors', region:'Kirinyaga County', party:'UDA', since:'Aug 2017', term:'2022–2027 · 2nd term', upd:'May 30, 2026', key:'w2' },
    { id:'wanga', n:'Gladys Wanga', init:'GW', photo:asset('assets/pol-wanga.jpg'), role:'Governor', grp:'Governors', region:'Homa Bay County', party:'ODM', since:'Aug 2022', term:'2022–2027', upd:'Jun 09, 2026', key:'h1' },
    { id:'olekina', n:'Ledama Olekina', init:'LO', photo:asset('assets/pol-olekina.webp'), role:'Senator', grp:'Senators', region:'Narok County', party:'ODM', since:'Aug 2017', term:'2022–2027 · 2nd term', upd:'Apr 18, 2026', key:'o1' },
    { id:'cheruiyot', n:'Aaron Cheruiyot', init:'AC', photo:asset('assets/pol-cheruiyot.webp'), role:'Senator', grp:'Senators', region:'Kericho County', party:'UDA', since:'Aug 2017', term:'2022–2027 · 2nd term', upd:'May 12, 2026', key:'c1' },
    { id:'ichungwah', n:"Kimani Ichung'wah", init:'KI', photo:asset('assets/pol-ichungwah.jpg'), role:'MP · Majority Leader', grp:'MPs', region:'Kikuyu Constituency', party:'UDA', since:'Aug 2017', term:'2022–2027 · 2nd term', upd:'Jun 02, 2026', key:'i1' },
    { id:'passaris', n:'Esther Passaris', init:'EP', photo:asset('assets/pol-passaris.png'), role:'Woman Representative', grp:'MPs', region:'Nairobi City County', party:'ODM', since:'Aug 2017', term:'2022–2027 · 2nd term', upd:'May 25, 2026', key:'e2' }
  ];

export const PROMS = [
    { id:'r1', pol:'ruto', t:'Establish the Hustler Fund with KSh 50 billion a year for small traders', cat:'Economy', st:'completed', made:'Jun 30, 2022', dl:'Dec 2022', chg:'Feb 14, 2023', rev:'Mar 12, 2026',
      ex:'A KSh 50 billion-a-year financial inclusion fund offering low-interest mobile credit to traders locked out of formal finance.',
      ev:[
        { d:'Sep 13, 2022', t:'Promise captured from the Kenya Kwanza manifesto and repeated in the inauguration address. Rated Inconclusive by default pending verifiable action.', s:'Kenya Kwanza Manifesto, p.9', to:'inconclusive' },
        { d:'Nov 30, 2022', t:'The Financial Inclusion Fund launches nationally with a KSh 50 billion allocation. First loans are disbursed through mobile money the same evening.', s:'The Star', to:'inprogress' },
        { d:'Feb 14, 2023', t:'Treasury confirms 17.2 million registered borrowers and KSh 20.6 billion disbursed in the first 75 days. The panel rates the establishment pledge Completed.', s:'PesaCheck', to:'completed' },
        { d:'Mar 12, 2026', t:'Default rates near 60% raise sustainability questions, but the fund remains active and funded. Status unchanged; flagged for annual review.', s:'Daily Nation', to:null }
      ],
      rel:[ { s:'PesaCheck', d:'Mar 2023', t:'Fact-check: Has the Hustler Fund really reached 17 million Kenyans?' }, { s:'The Star', d:'Feb 2026', t:'Hustler Fund defaults near 60%: what the numbers show' } ] },
    { id:'r2', pol:'ruto', t:'Build 250,000 affordable housing units every year', cat:'Housing', st:'behind', made:'Jun 30, 2022', dl:'Sep 2027', chg:'Jan 20, 2026', rev:'Jan 20, 2026',
      ex:'An annual pipeline of 250,000 affordable units, financed through a mandatory housing levy on formal payslips.',
      why:"The housing levy touches every formal payslip in Kenya, making this the administration's most audited pledge.",
      ev:[
        { d:'Mar 06, 2023', t:'Groundbreaking at multiple county sites; first affordable units advertised for off-plan booking.', s:'Daily Nation', to:'inprogress' },
        { d:'Mar 19, 2024', t:'The Affordable Housing Act is signed, anchoring a 1.5% levy on gross salary after courts struck down the first attempt.', s:'The Star', to:null },
        { d:'Jan 20, 2026', t:'State reporting shows roughly 140,000 units under construction cumulatively since 2022, far off the promised 250,000-a-year pace. Rating moved to Behind Schedule.', s:'PesaCheck', to:'behind' }
      ],
      rel:[ { s:'PesaCheck', d:'Jan 2026', t:'Housing levy: where the money has gone' }, { s:'Daily Nation', d:'Sep 2025', t:'Inside the affordable housing pipeline' } ] },
    { id:'r3', pol:'ruto', t:'Deliver universal health coverage through a new social health insurance scheme', cat:'Health', st:'behind', made:'Jun 30, 2022', dl:'Dec 2025', chg:'Apr 02, 2026', rev:'Apr 02, 2026',
      ex:'Replace NHIF with a Social Health Insurance Fund so every Kenyan can access care without catastrophic costs.',
      ev:[
        { d:'Oct 01, 2024', t:'SHIF goes live, replacing the 57-year-old NHIF. Registration tops 12 million in the first quarter.', s:'The Star', to:'inprogress' },
        { d:'Apr 02, 2026', t:'Claims backlogs push private hospitals to suspend SHIF cover in several counties; the December 2025 full-coverage milestone is missed. Rated Behind Schedule.', s:'PesaCheck', to:'behind' }
      ],
      rel:[ { s:'PesaCheck', d:'Apr 2026', t:'SHIF claims backlog: what hospitals are owed' }, { s:'The Star', d:'Oct 2024', t:'From NHIF to SHIF: a rocky first month' } ] },
    { id:'r4', pol:'ruto', t:'Halve the cost of fertiliser for smallholder farmers', cat:'Agriculture', st:'completed', made:'Sep 13, 2022', dl:'Dec 2022', chg:'Jul 28, 2023', rev:'Jul 28, 2023',
      ex:'Cut a 50kg bag from about KSh 6,500 to KSh 2,500 through a national e-voucher subsidy programme.',
      ev:[
        { d:'Oct 10, 2022', t:'Subsidised fertiliser at KSh 3,500 per bag begins moving through NCPB depots ahead of the short rains.', s:'Daily Nation', to:'inprogress' },
        { d:'Jul 28, 2023', t:'E-voucher registration verified; the subsidised price reaches KSh 2,500 as pledged. Rated Completed.', s:'PesaCheck', to:'completed' }
      ],
      rel:[ { s:'PesaCheck', d:'Jul 2023', t:'Did subsidised fertiliser actually reach farmers?' } ] },
    { id:'r5', pol:'ruto', t:'Recruit 116,000 additional teachers within two years', cat:'Education', st:'inprogress', made:'Jun 30, 2022', dl:'Dec 2024', chg:'Sep 15, 2024', rev:'Feb 10, 2026',
      ex:"Close the public-school staffing gap with the largest teacher recruitment drive in Kenya's history.", ev:[], rel:[] },
    { id:'r6', pol:'ruto', t:'Bring down the cost of living within the first 100 days', cat:'Economy', st:'stalled', made:'Aug 09, 2022', dl:'Dec 2022', chg:'Jun 30, 2023', rev:'Jun 30, 2023',
      ex:'An explicit campaign pledge to lower the price of basic goods, starting with maize flour, within 100 days of taking office.',
      ev:[
        { d:'Dec 21, 2022', t:'The 100-day mark passes with consumption subsidies withdrawn and unga prices higher than at inauguration.', s:'Piga Firimbi', to:'behind' },
        { d:'Jun 30, 2023', t:'No active programme targets the pledge; officials now describe it as a long-term production goal. Rated Stalled.', s:'PesaCheck', to:'stalled' }
      ],
      rel:[ { s:'Piga Firimbi', d:'Jan 2023', t:'The 100-day cost-of-living scorecard' } ] },
    { id:'r7', pol:'ruto', t:'Charter a National Open University to widen access to degrees', cat:'Education', st:'completed', made:'Jun 30, 2022', dl:null, chg:'Sep 05, 2023', rev:'Sep 05, 2023',
      ex:'A fully accredited open university offering low-cost online degrees to students missing placement.',
      ev:[ { d:'Aug 31, 2023', t:'The Open University of Kenya is chartered at Konza Technopolis; the first cohort is admitted the following month. Rated Completed.', s:'Daily Nation', to:'completed' } ],
      rel:[ { s:'Daily Nation', d:'Sep 2023', t:'Open University admits its first cohort' } ] },
    { id:'r8', pol:'ruto', t:'Lay 100,000km of national fibre-optic backbone', cat:'Infrastructure', st:'inprogress', made:'Jun 30, 2022', dl:'Sep 2027', chg:'Nov 12, 2024', rev:'Nov 12, 2024',
      ex:'Extend last-mile connectivity with 100,000km of new fibre, digital hubs in every ward and public Wi-Fi.', ev:[], rel:[] },
    { id:'r9', pol:'ruto', t:'Operationalise the Judiciary Fund and expand the bench', cat:'Governance', st:'completed', made:'Sep 13, 2022', dl:null, chg:'Mar 03, 2023', rev:'Mar 03, 2023',
      ex:'Guarantee judicial financial independence and appoint more judges to clear case backlogs.', ev:[], rel:[] },
    { id:'r10', pol:'ruto', t:'End extrajudicial killings and enforced disappearances', cat:'Security', st:'inconclusive', made:'Sep 13, 2022', dl:null, chg:'Sep 13, 2022', rev:'May 20, 2026',
      ex:'Disband rogue police units and guarantee accountability for deaths in custody.', ev:[], rel:[] },
    { id:'r11', pol:'ruto', t:'Open one million overseas jobs through labour-mobility deals', cat:'Economy', st:'inprogress', made:'Aug 09, 2022', dl:'Sep 2027', chg:'Oct 30, 2025', rev:'Oct 30, 2025',
      ex:'Bilateral agreements to place Kenyan workers abroad, with stronger protections than past schemes.', ev:[], rel:[] },
    { id:'r12', pol:'ruto', t:'Privatise at least 35 state-owned enterprises', cat:'Economy', st:'stalled', made:'Oct 27, 2023', dl:'Dec 2025', chg:'Sep 24, 2024', rev:'Sep 24, 2024',
      ex:'Sell down non-strategic parastatals to cut Treasury bailouts, starting with listed offers on the NSE.', ev:[], rel:[] },
    { id:'r13', pol:'ruto', t:'Build aggregation and industrial parks in all 47 counties', cat:'Devolution', st:'inprogress', made:'Jun 30, 2022', dl:'Sep 2027', chg:'Aug 14, 2025', rev:'Aug 14, 2025',
      ex:'Joint county–national industrial parks to move value-addition closer to the farm gate.', ev:[], rel:[] },
    { id:'r14', pol:'ruto', t:'Guarantee minimum livestock prices through an offtake programme', cat:'Agriculture', st:'unstarted', made:'Aug 09, 2022', dl:null, chg:'Aug 09, 2022', rev:'Jan 15, 2026',
      ex:'A standing offtake scheme to stabilise prices for pastoralist households in arid counties.', ev:[], rel:[] },

    { id:'r15', pol:'ruto', t:'Build a fully equipped TVET institution in the remaining 52 constituencies within the first two years', cat:'Education', st:'behind', made:'Jun 30, 2022', dl:'Sep 2024', chg:'Sep 13, 2024', rev:'Aug 12, 2026',
      img:'photo-1503676260728-1c00da094a0b',
      ex:'A fully equipped technical and vocational institution in each of the 52 constituencies that had none, built and equipped within two years of taking office.',
      why:'The two-year deadline expired in September 2024. Available records account for 15 institutions under construction and two stalled, leaving roughly 35 of the 52 unaccounted for.',
      ev:[
        { d:'Jun 30, 2022', t:'The UDA / Kenya Kwanza manifesto and Education Charter commit to building a fully equipped TVET institution in the remaining 52 constituencies within the first two years.', s:'UDA 2022 Manifesto', to:null },
        { d:'Nov 15, 2022', t:'The Parliamentary Budget Office costs the commitment at KSh40 million per institution, or KSh2.08 billion over two years, presented as a costing rather than an appropriation.', s:'Parliamentary Budget Office', to:null },
        { d:'Jul 01, 2023', t:'FY2023/24 opens with KSh1.05 billion allocated to Construction of 52 TVETs – BETA and 15 first-phase constituencies named.', s:'Open Budget Kenya', to:'inprogress' },
        { d:'Sep 13, 2024', t:'The two-year deadline falls with no record of completed institutions. Rated Behind Schedule.', s:'PesaCheck', to:'behind' },
        { d:'Sep 30, 2025', t:'The Ministry of Education TVET Sub-Sector Report records 12 first-phase projects ongoing at 21% completion and lists Kangundo and Kibwezi West as stalled, with implementation periods running to June 2027.', s:'Ministry of Education', to:null },
        { d:'Jun 26, 2026', t:'The National Assembly Budget Committee recommends a KSh460 million reduction from second-phase construction of the 52 institutions.', s:'National Assembly Budget Committee', to:null },
        { d:'Aug 12, 2026', t:'Review of Open Budget Kenya and Ministry of Education records accounts for 15 institutions under construction and two stalled, leaving approximately 35 unaccounted for. Rating held at Behind Schedule.', s:'PesaCheck', to:'behind' }
      ],
      rel:[
        { s:'PesaCheck', d:'Aug 2026', t:'Counting the 52 TVETs: what the budget records actually show' },
        { s:'Ministry of Education', d:'Sep 2025', t:'TVET Sub-Sector Report FY2026/27–FY2028/29' }
      ],
      body:[
        { h:'What is the promise?', blocks:[
          { k:'p', t:'The United Democratic Alliance (UDA) / Kenya Kwanza 2022 manifesto and Education Charter promised to:' },
          { k:'q', t:'build a fully equipped TVET institution in the remaining 52 constituencies within the first two years.' },
          { k:'p', t:'The commitment has three measurable components: establishing institutions in the 52 constituencies that lacked them, fully equipping them, and completing the work within two years.' },
          { k:'src', pub:'UDA 2022 Manifesto', d:'Jun 2022', t:'UDA / Kenya Kwanza 2022 Manifesto', u:'https://www.kenyakwanza.com/manifesto' }
        ] },
        { h:'Who made the promise?', blocks:[
          { k:'p', t:'The promise was made by William Ruto, then presidential candidate and leader of the Kenya Kwanza Alliance, in the UDA 2022 manifesto and Kenya Kwanza Education Charter. Ruto was elected president in August 2022 and assumed office on 13 September 2022.' }
        ] },
        { h:'Which area does the promise cover?', blocks:[
          { k:'p', t:'Education, specifically Technical and Vocational Education and Training (TVET).' },
          { k:'p', t:'The geographical component covers the 52 constituencies that lacked TVET institutions when the commitment was made.' }
        ] },
        { h:'Deadline for promise implementation', blocks:[
          { k:'p', t:'The manifesto set a deadline of within the first two years of the administration.' },
          { k:'p', t:'With President Ruto taking office on 13 September 2022, the commitment was due by September 2024. The deadline has therefore passed by nearly two years.' }
        ] },
        { h:'What datasets are linked to this promise?', blocks:[
          { k:'p', t:'The main documents and datasets for assessing the promise include:' },
          { k:'ul', items:[
            { t:'UDA 2022 Manifesto / Kenya Kwanza Education Charter – the original commitment.' },
            { t:'Budget Policy Statements and Programme-Based Budgets – translate the commitment into government programmes and funding.' },
            { t:'Education Sector / TVET Sub-Sector Reports – provide targets, expenditure and implementation updates.' },
            { t:'Auditor-General’s reports – provide independent audit findings on government expenditure and projects.' },
            { t:'National Assembly budget and committee reports – provide parliamentary oversight of funding and implementation.' }
          ] }
        ] },
        { h:'What was/is the total budget allocation? How much has been used?', blocks:[
          { k:'p', t:'The Kenya Kwanza administration pledged to establish and fully equip TVET institutions in the remaining 52 constituencies within its first two years in office. With President Ruto assuming office on 13 September 2022, the two-year deadline fell on 13 September 2024. The programme, however, continued beyond this deadline.' },
          { k:'p', t:'The government\'s Fourth Medium Term Plan National Indicator Handbook 2023–2027 subsequently incorporated the programme as a priority project, with the output defined as TVET institutions constructed and equipped in 52 constituencies. It set a target of 26 institutions in FY2023/24 and another 26 in FY2024/25, giving a cumulative target of 52.' },
          { k:'src', pub:'The National Treasury and Economic Planning', d:'2023', t:'Fourth Medium Term Plan National Indicator Handbook 2023–2027, p. 145.', u:'https://www.treasury.go.ke' },
          { k:'p', t:'The Parliamentary Budget Office (PBO) also assessed the financial implications of the commitment in November 2022. It estimated the cost of constructing a TVET institution at KSh40 million and calculated that building and equipping TVETs in the remaining 52 constituencies would require KSh1.04 billion in each of the first two years, or KSh2.08 billion over two years. The PBO presented this as a costing based on its assumptions, rather than as an amount already appropriated in the national budget.' },
          { k:'src', pub:'Parliamentary Budget Office', d:'Nov 2022', t:'Parliamentary Budget Office, Assessment of the Cost Implications of the Bottom-Up Economic Transformation Plan 2022–2027, p. 25–26, paragraph 67 and Table 17.', u:'https://www.parliament.go.ke/the-national-assembly/parliamentary-budget-office' },
          { k:'fy', rows:[
            { fy:'FY2023/24', alloc:'KSh 1.05bn', target:'15 TVETs named for the first phase; 100% completion listed as the 2023 target.' },
            { fy:'FY2024/25', alloc:'KSh 920m', target:'16 TVETs named; phased targets of 36% in 2024, 70% in 2025, 100% in 2026.' },
            { fy:'FY2025/26', alloc:'KSh 664.22m', target:'13 TVETs targeted, not named. KSh 460m recommended for reduction by the Budget Committee.' },
            { fy:'FY2026/27', alloc:'KSh 366.42m', target:'Year began July 2026; too little time elapsed to assess implementation.' }
          ] }
        ] },
        { h:'FY2023/24', blocks:[
          { k:'p', t:'The Open Budget Kenya project record for the Construction of 52 TVETs – BETA lists an allocation of KSh1.05 billion and identifies 15 TVETs for the first phase:' },
          { k:'names', label:'First-phase constituencies · FY2023/24', items:[{ t:'Matungu' }, { t:'Kibwezi West', flag:'stalled' }, { t:'Kiambaa' }, { t:'Kangundo', flag:'stalled' }, { t:'Sigowet/Soin' }, { t:'Mwingi West' }, { t:'Kilifi South' }, { t:'Nyali' }, { t:'Muhoroni' }, { t:'Kibra' }, { t:'Kwanza' }, { t:'Wajir West' }, { t:'Subukia' }, { t:'Narok North' }, { t:'Kajiado South' }] },
          { k:'p', t:'The project record lists 100% completion as the target for 2023. This was a project target and does not, by itself, establish that the TVETs were completed.' },
          { k:'src', pub:'Open Budget Kenya', d:'FY2023/24', t:'Open Budget Kenya, Construction of 52 TVETs – BETA, FY2023/24 project record, Allocation and Key Performance Indicators', u:'https://openbudgetkenya.org' },
          { k:'sh', t:'Implementation status of the first-phase TVETs' },
          { k:'p', t:'The Ministry of Education\'s TVET Sub-Sector Report for FY2026/27–FY2028/29, published in September 2025, provides a later project-level update. It lists the first-phase projects under the infrastructure development programme, with Matungu, Kiambaa, Sigowet/Soin, Mwingi West, Kilifi South, Nyali, Muhoroni, Kibra, Kwanza, Wajir West, Subukia and Narok North recorded as ongoing at 21% completion. Kangundo and Kibwezi West are listed as stalled. The projects have implementation periods running from July 2023 to June 2027.' },
          { k:'src', pub:'Ministry of Education', d:'Sep 2025', t:'Ministry of Education, TVET Sub-Sector Report for FY2026/27–FY2028/29, pp. 43–44, project implementation table.', u:'https://www.education.go.ke' },
          { k:'imgs', label:'First-phase site documentation', items:[
            { id:'tvet-p1-site', img:'photo-1541888946425-d81bb19240f5', cap:'Construction at one of the 15 constituencies named in the FY2023/24 record, recorded at 21% completion.' },
            { id:'tvet-stalled', img:'photo-1503387762-592deb58ef4e', cap:'Kangundo or Kibwezi West, the two projects the Ministry report lists as stalled.' }
          ] }
        ] },
        { h:'FY2024/25', blocks:[
          { k:'p', t:'The FY2024/25 project record shows a further allocation of KSh920 million to the Construction of 52 TVETs – BETA programme. It identifies 16 TVETs for this phase:' },
          { k:'names', label:'Second-phase constituencies · FY2024/25', items:[{ t:'Kibwezi East' }, { t:'Jomvu' }, { t:'Daadab' }, { t:'Banissa' }, { t:'Kitui West' }, { t:'Kathiani' }, { t:'Turkana South' }, { t:'Juja' }, { t:'Nakuru Town West' }, { t:'Lurambi' }, { t:'Gem' }, { t:'Kisumu East' }, { t:'Dhiwa' }, { t:'Bonchari' }, { t:'Embakasi Central' }, { t:'Fafi' }] },
          { k:'p', t:'The project record sets a phased completion target of 36% in 2024, 70% in 2025 and 100% in 2026 for each of the 16 institutions.' },
          { k:'src', pub:'Open Budget Kenya', d:'FY2024/25', t:'Open Budget Kenya, Construction of 52 TVETs – BETA, FY2024/25 project record, Allocation and Key Performance Indicators', u:'https://openbudgetkenya.org' },
          { k:'p', t:'The Ministry of Education report provides a broader implementation update for the TVET infrastructure programme. It records projects that commenced in 2024, including Webuye East TVC, Kitui East TVET and Molo/Elburgon TVC, as ongoing. It does not, however, provide an project-by-project status table that clearly maps each of the 16 institutions in the Open Budget Kenya FY2024/25 record to a completion percentage.' },
          { k:'src', pub:'Ministry of Education', d:'Sep 2025', t:'Ministry of Education, TVET Sub-Sector Report for FY2026/27–FY2028/29, p. 44.', u:'https://www.education.go.ke' },
          { k:'imgs', label:'Second-phase site documentation', items:[
            { id:'tvet-p2-site', img:'photo-1504307651254-35680f356dfd', cap:'One of the 16 constituencies named in the FY2024/25 record, or Webuye East, Kitui East or Molo/Elburgon, which commenced in 2024.' }
          ] }
        ] },
        { h:'FY2025/26', blocks:[
          { k:'p', t:'For FY2025/26, Open Budget Kenya records an initial allocation of KSh664.22 million for the Construction of 52 TVETs – BETA project. The project record sets a target of 13 TVETs constructed in 2025, with no additional construction target specified for 2026 or 2027 in that particular record. The project record does not name the 13 TVETs targeted under this year\'s allocation.' },
          { k:'src', pub:'Open Budget Kenya', d:'FY2025/26', t:'Open Budget Kenya, Construction of 52 TVETs – BETA, FY2025/26 project record, Allocation and Key Performance Indicators', u:'https://openbudgetkenya.org' },
          { k:'p', t:'The allocation was subsequently subject to a parliamentary budget reduction. The National Assembly\'s Budget Committee recommended a KSh460 million reduction specifically from construction of the 52 institutions under the second phase. The same recommendation included a separate KSh10 million reduction from Eldoret Cooperative College, making the total development reduction in the vote KSh470 million. (Page 95.)' },
          { k:'p', t:'The parliamentary record establishes that KSh460 million was recommended for reduction from the second phase of the 52-TVET construction programme. It does not, by itself, establish the final amount ultimately spent or the completion level of the 13 TVETs targeted in the Open Budget record.' },
          { k:'src', pub:'National Assembly Budget Committee', d:'Jun 2026', t:'National Assembly, Report of the Budget and Appropriations Committee, p. 95.', u:'https://www.parliament.go.ke' },
          { k:'p', t:'The Ministry of Education\'s September 2025 TVET Sub-Sector Report provides implementation information up to FY2024/25 and therefore does not provide a full-year assessment of the FY2025/26 target of 13 TVETs.' }
        ] },
        { h:'FY2026/27', blocks:[
          { k:'p', t:'For FY2026/27, Open Budget Kenya records an allocation of KSh366.42 million for the Construction of 52 TVETs – BETA project. The financial year began in July 2026, and the budget was passed in June 2026. With only a limited period having elapsed since the allocation, there is insufficient time to reliably assess implementation or determine whether the allocation has translated into physical progress.' },
          { k:'src', pub:'Open Budget Kenya', d:'FY2026/27', t:'Open Budget Kenya, Construction of 52 TVETs – BETA, FY2026/27 project record, Allocation and Key Performance Indicators', u:'https://openbudgetkenya.org' }
        ] },
        { h:'What does the Auditor-General’s report show?', blocks:[
          { k:'p', t:'No dedicated Auditor-General report has been located that audits the full set of 52 BETA projects in isolation and certifies their completion. The available audit evidence does not establish that the 52-institution commitment has been completed. Auditor-General reports on TVET infrastructure, not necessarily the 52 promised, have identified implementation problems, including delayed projects and concerns about the quality of some construction works.' },
          { k:'p', t:'Auditor-General reports from 2023 onwards have documented recurring implementation problems across the wider TVET infrastructure. Under the State Department for Technical Vocational Education and Training, stalled or delayed projects totalled approximately KSh 154.52 million, of which about KSh 123.23 million had already been paid. These included:' },
          { k:'ul', items:[
            { t:'Stalled construction of Chepararia Technical Training Institute (contract sum approximately KSh 48.47 million; payments of about KSh 26.6–26.7 million). (Page 104).' },
            { t:'Delayed construction of the proposed Ngeria Technical and Vocational College (contract sum about KSh 46.99 million; payments around KSh 39.57 million) (Page 103)' },
            { t:'Delayed construction of Mt. Elgon Technical and Vocational College (contract sum KSh 59.06 million; payments KSh 57.04 million). (Page 103)' }
          ] },
          { k:'p', t:'These examples illustrate recurring patterns documented across Auditor-General reports on TVET infrastructure: projects running far beyond contracted periods, high proportions of contract sums paid while works remain incomplete or abandoned.' },
          { k:'imgs', label:'Audited works', items:[
            { id:'tvet-audit-works', img:'photo-1590959651373-a3db0f38a961', cap:'Chepararia, Ngeria or Mt. Elgon, where the Auditor-General records high proportions of contract sums paid against incomplete or abandoned works.' }
          ] },
          { k:'src', pub:'Office of the Auditor-General', d:'2023–2025', t:'Office of the Auditor-General, reports on the State Department for Technical Vocational Education and Training, pp. 103–104.', u:'https://www.oagkenya.go.ke' }
        ] },
        { h:'What are the indicators related to the promise?', blocks:[
          { k:'p', t:'Several indicators can be used to measure implementation.' },
          { k:'dl', items:[
            { k:'Baseline', v:'The government identified 52 constituencies without TVET institutions when the promise was made.' },
            { k:'Construction', v:'By early-mid 2026, reports indicated that a minority of the 52 institutions (approximately 15-17) were under construction, while a substantial majority had not yet begun construction.' },
            { k:'Completion', v:'Government budget documents show targets for completing a number of the institutions, but available records do not demonstrate that all 52 had been completed.' },
            { k:'Equipment', v:'The promise specifically requires institutions to be fully equipped. Government reports show that equipment procurement and installation have continued under various programmes, but there is no evidence that all 52 institutions had been fully equipped.' },
            { k:'Operational status', v:'The Ministry of Education’s sector reports indicate that some TVET institutions were operational while others remained at various stages of completion. However, these figures cover the wider TVET sector and cannot be used to claim that a corresponding number of the 52 promised institutions are operational.' },
            { k:'Funding', v:'Government budget documents show funding was made, but it seems the allocations were insufficient to complete the 52 TVETs.' }
          ] },
          { k:'imgs', label:'Equipment indicator', items:[
            { id:'tvet-equipment', img:'photo-1581094794329-c8112a89af12', cap:'Workshop fit-out or equipment delivery, against the requirement that every institution be fully equipped.' }
          ] }
        ] },
        { h:'Images, photographs and other evidence', blocks:[
          { k:'links', items:[
            { t:'President Ruto on TVET rollout (July 2024)', u:'https://x.com/WilliamsRuto/status/1817840159217356871' },
            { t:'President Ruto on TVET rollout (October 2025)', u:'https://x.com/WilliamsRuto/status/1984570529073021251' }
          ] },
          { k:'p', t:'Getting more photos/evidence was challenging as the 52 constituencies have not been explicitly outlined.' }
        ] },
        { h:'What is the current progress?', blocks:[
          { k:'tally', label:'Of the 52 institutions promised', items:[
            { n:'15', l:'Under construction' },
            { n:'2', l:'Stalled' },
            { n:'35', l:'Unaccounted for' }
          ] },
          { k:'p', t:'The promise has not been fully fulfilled, but there is evidence of ongoing implementation. The two-year deadline expired in September 2024. By 2026, available project-level details from Open Budget Kenya and the Ministry of Education’s TVET Sub-Sector Report for FY2026/27–FY2028/29 support the following breakdown of the 52 promised institutions. Open Budget Kenya’s FY2023/24 record names the 15 first-phase projects, while the Ministry report records 12 of them; Matungu, Kiambaa, Sigowet/Soin, Mwingi West, Kilifi South, Nyali, Muhoroni, Kibra, Kwanza, Wajir West, Subukia and Narok North as ongoing at 21 per cent completion, and identifies Kangundo and Kibwezi West as stalled.' },
          { k:'p', t:'The same Ministry report further notes three additional institutions that commenced in 2024; Webuye East, Kitui East, and Molo/Elburgon as ongoing. Taken together, these sources account for 15 institutions under construction and two stalled, leaving approximately 35 of the original 52 still unaccounted for in the available documentation, with no clear confirmation that construction has begun. Because the promise required all 52 institutions to be fully equipped within two years, the available evidence does not support a finding of completion.' }
        ] }
      ] },

    { id:'s1', pol:'sakaja', t:'Serve a free school meal daily to every public primary learner', cat:'Education', st:'completed', made:'Aug 05, 2022', dl:'Dec 2023', chg:'Jan 15, 2024', rev:'Aug 26, 2024',
      ex:"'Dishi na County' central kitchens feeding every public primary and ECDE learner in Nairobi.",
      why:'A meal a day is the single strongest school-attendance lever Nairobi has, and the flagship of this governorship.',
      ev:[
        { d:'Aug 25, 2023', t:'Dishi na County launches with 10 central kitchens serving about 250,000 learners a day.', s:'The Star', to:'inprogress' },
        { d:'Jan 15, 2024', t:'Coverage verified across all sub-counties; enrolment rises are attributed to the programme. Rated Completed.', s:'PesaCheck', to:'completed' },
        { d:'Aug 26, 2024', t:'The programme marks one year at 316,000 daily meals; parents contribute a KSh 5 top-up per meal.', s:'Daily Nation', to:null }
      ],
      rel:[ { s:'The Star', d:'Aug 2024', t:'Dishi na County: a year of school meals in numbers' } ] },
    { id:'s2', pol:'sakaja', t:'Build 20 modern markets for Nairobi traders', cat:'Economy', st:'inprogress', made:'Aug 05, 2022', dl:'Sep 2027', chg:'Jul 08, 2025', rev:'Jul 08, 2025',
      ex:'Twenty modern markets to give traders permanent, dignified workspaces.', ev:[], rel:[] },
    { id:'s3', pol:'sakaja', t:'Move long-distance matatu termini out of the CBD', cat:'Transport', st:'stalled', made:'Sep 21, 2022', dl:'Jan 2023', chg:'Jan 30, 2024', rev:'Jan 30, 2024',
      ex:'Decongest central Nairobi by relocating long-distance PSV termini to Green Park and peripheral stages.',
      ev:[
        { d:'Sep 21, 2022', t:'A two-week relocation notice is issued to long-distance PSV saccos.', s:'Daily Nation', to:'inprogress' },
        { d:'Jan 30, 2024', t:'After repeated postponements and court challenges, the relocation is indefinitely on hold. Rated Stalled.', s:'The Star', to:'stalled' }
      ],
      rel:[ { s:'Daily Nation', d:'Jan 2024', t:'CBD matatu ban shelved again' } ] },
    { id:'s4', pol:'sakaja', t:'Digitise all county services and revenue collection', cat:'Governance', st:'inprogress', made:'Aug 05, 2022', dl:'Dec 2024', chg:'Feb 20, 2025', rev:'Feb 20, 2025',
      ex:'Move county payments onto a single digital till to seal revenue leaks.', ev:[], rel:[] },
    { id:'s5', pol:'sakaja', t:'Green Nairobi: plant one million trees and reclaim parks', cat:'Environment', st:'inconclusive', made:'Aug 05, 2022', dl:null, chg:'Aug 05, 2022', rev:'Mar 30, 2026',
      ex:'A city-wide greening drive to restore public parks and expand tree cover.', ev:[], rel:[] },
    { id:'s6', pol:'sakaja', t:'License and light up a 24-hour economy', cat:'Economy', st:'behind', made:'Aug 05, 2022', dl:'Dec 2023', chg:'Nov 11, 2025', rev:'Nov 11, 2025',
      ex:'Night-shift licensing, street lighting and security for round-the-clock trade.', ev:[], rel:[] },
    { id:'s7', pol:'sakaja', t:'Provide free Wi-Fi in major markets and bus stops', cat:'Infrastructure', st:'unstarted', made:'Aug 05, 2022', dl:null, chg:'Aug 05, 2022', rev:'Feb 02, 2026',
      ex:'Public connectivity for traders and commuters at high-footfall county sites.', ev:[], rel:[] },
    { id:'s8', pol:'sakaja', t:'Designate legal hawking zones with trader IDs', cat:'Economy', st:'behind', made:'Sep 30, 2022', dl:'Jun 2023', chg:'Oct 18, 2025', rev:'Oct 18, 2025',
      ex:'End daily cat-and-mouse with askaris by giving hawkers designated zones and identification.', ev:[], rel:[] },

    { id:'w1', pol:'waiguru', t:'Expand Wezesha Kirinyaga to 30,000 traders and farmers', cat:'Economy', st:'inprogress', made:'Aug 20, 2022', dl:'Sep 2027', chg:'May 30, 2026', rev:'May 30, 2026',
      ex:'Scale the county empowerment programme with credit and equipment for small enterprises.', ev:[], rel:[] },
    { id:'w2', pol:'waiguru', t:'Commission a county tomato-processing plant', cat:'Agriculture', st:'behind', made:'Aug 20, 2022', dl:'Dec 2024', chg:'Apr 12, 2026', rev:'Apr 12, 2026',
      ex:'A processing line to absorb gluts from the county that grows most of Kenya\'s tomatoes.',
      why:"Kirinyaga grows over half of Kenya's tomatoes; processing is the difference between gluts and incomes.",
      ev:[
        { d:'Aug 20, 2022', t:'Promise captured from the county manifesto. Rated Inconclusive by default pending verifiable action.', s:'Kirinyaga County manifesto', to:'inconclusive' },
        { d:'Nov 14, 2023', t:'The county assembly approves an allocation for the processing line and a site is identified at Sagana.', s:'Kirinyaga County Assembly records', to:'inprogress' },
        { d:'Apr 12, 2026', t:'Site works remain incomplete more than a year past the December 2024 target, with no commissioning date set. Rating moved to Behind Schedule.', s:'PesaCheck field visit', to:'behind' }
      ], rel:[] },
    { id:'w3', pol:'waiguru', t:'Provide a daily meal in every public ECDE centre', cat:'Education', st:'completed', made:'Aug 20, 2022', dl:'Dec 2023', chg:'Feb 06, 2024', rev:'Feb 06, 2024',
      ex:'County-funded feeding for every early-childhood learner.', ev:[], rel:[] },
    { id:'w4', pol:'waiguru', t:'Connect 20,000 new households to piped water', cat:'Water', st:'inprogress', made:'Aug 20, 2022', dl:'Sep 2027', chg:'Jan 22, 2026', rev:'Jan 22, 2026',
      ex:'Extend county water schemes to under-served wards.', ev:[], rel:[] },
    { id:'w5', pol:'waiguru', t:'Build boda-boda shades and a county rider licensing scheme', cat:'Transport', st:'unstarted', made:'Aug 20, 2022', dl:null, chg:'Aug 20, 2022', rev:'Dec 10, 2025',
      ex:'Organised stages, shades and identification for the county\'s riders.', ev:[], rel:[] },

    { id:'h1', pol:'wanga', t:'Commission the Homa Bay fish processing plant', cat:'Economy', st:'inprogress', made:'Aug 25, 2022', dl:'Dec 2025', chg:'Jun 09, 2026', rev:'Jun 09, 2026',
      ex:'Value-addition for the lake economy that employs a third of the county.',
      why:'The lake economy employs a third of the county; value-addition has been promised for a decade.', ev:[], rel:[] },
    { id:'h2', pol:'wanga', t:'Employ all ECDE teachers on permanent terms', cat:'Education', st:'completed', made:'Aug 25, 2022', dl:'Dec 2023', chg:'Nov 28, 2023', rev:'Nov 28, 2023',
      ex:'Move early-childhood teachers from casual contracts to permanent county terms.', ev:[], rel:[] },
    { id:'h3', pol:'wanga', t:'Deliver a clean, planned Homa Bay town', cat:'Environment', st:'completed', made:'Aug 25, 2022', dl:'Dec 2023', chg:'Jun 14, 2024', rev:'Jun 14, 2024',
      ex:'Waste management, street lighting and market order for the county capital.', ev:[], rel:[] },
    { id:'h4', pol:'wanga', t:'Open 500km of rural access roads', cat:'Infrastructure', st:'behind', made:'Aug 25, 2022', dl:'Dec 2024', chg:'Mar 17, 2026', rev:'Mar 17, 2026',
      ex:'Grade and murram farm-to-market roads across all sub-counties.', ev:[], rel:[] },
    { id:'h5', pol:'wanga', t:'Enrol 50,000 vulnerable households on health cover', cat:'Health', st:'inconclusive', made:'Aug 25, 2022', dl:null, chg:'Aug 25, 2022', rev:'Feb 25, 2026',
      ex:'County-paid insurance for households that cannot afford contributions.', ev:[], rel:[] },

    { id:'o1', pol:'olekina', t:'Force full transparency on Maasai Mara revenue', cat:'Devolution', st:'stalled', made:'Sep 08, 2022', dl:'Dec 2023', chg:'Nov 05, 2025', rev:'Nov 05, 2025',
      ex:'Public, audited accounts for the reserve that funds a fifth of Narok\'s budget.',
      why:"Mara receipts fund a fifth of Narok's budget, yet audits lag years behind.", ev:[], rel:[] },
    { id:'o2', pol:'olekina', t:'Publish every county bursary shilling', cat:'Education', st:'inprogress', made:'Sep 08, 2022', dl:null, chg:'Apr 18, 2026', rev:'Apr 18, 2026',
      ex:'Named, ward-level bursary lists so families can verify allocations.', ev:[], rel:[] },
    { id:'o3', pol:'olekina', t:'Table a Maa community land-rights protection bill', cat:'Governance', st:'unstarted', made:'Sep 08, 2022', dl:null, chg:'Sep 08, 2022', rev:'Jan 30, 2026',
      ex:'Statutory protection against irregular alienation of community land.', ev:[], rel:[] },
    { id:'o4', pol:'olekina', t:'Publish quarterly scorecards on county spending', cat:'Governance', st:'inprogress', made:'Sep 08, 2022', dl:null, chg:'Oct 02, 2025', rev:'Oct 02, 2025',
      ex:'A standing public record of how Narok executes its budget.', ev:[], rel:[] },
    { id:'o5', pol:'olekina', t:'Audit stalled county water projects', cat:'Water', st:'inconclusive', made:'Sep 08, 2022', dl:null, chg:'Sep 08, 2022', rev:'Dec 18, 2025',
      ex:'A full census of incomplete water works and who was paid for them.', ev:[], rel:[] },

    { id:'c1', pol:'cheruiyot', t:'Drive tea-sector reforms guaranteeing farmer bonuses', cat:'Agriculture', st:'inprogress', made:'Sep 08, 2022', dl:null, chg:'May 12, 2026', rev:'May 12, 2026',
      ex:'Legislative reform so factories publish payments and farmers see guaranteed bonuses.',
      why:"Tea pays Kericho's bills; bonus reform touches every household in the county.", ev:[], rel:[] },
    { id:'c2', pol:'cheruiyot', t:'Consolidate bursaries into one transparent fund', cat:'Education', st:'inprogress', made:'Sep 08, 2022', dl:null, chg:'Feb 14, 2026', rev:'Feb 14, 2026',
      ex:'Merge overlapping bursary kitties into a single auditable fund.', ev:[], rel:[] },
    { id:'c3', pol:'cheruiyot', t:'Audit idle equipment at Kericho referral hospital', cat:'Health', st:'inconclusive', made:'Sep 08, 2022', dl:null, chg:'Sep 08, 2022', rev:'Nov 20, 2025',
      ex:'Establish what leased medical equipment sits unused and why.', ev:[], rel:[] },
    { id:'c4', pol:'cheruiyot', t:'Secure tarmacking of the Kericho–Sigowet road', cat:'Infrastructure', st:'unstarted', made:'Sep 08, 2022', dl:null, chg:'Sep 08, 2022', rev:'Oct 15, 2025',
      ex:'National-government funding for the county\'s most-petitioned road link.', ev:[], rel:[] },
    { id:'c5', pol:'cheruiyot', t:'Hold quarterly public accountability barazas', cat:'Governance', st:'completed', made:'Sep 08, 2022', dl:'Dec 2022', chg:'Jun 20, 2023', rev:'Jun 20, 2023',
      ex:'Open-air sessions where residents question the senator on the record.', ev:[], rel:[] },

    { id:'i1', pol:'ichungwah', t:'Publish NG-CDF projects and bursaries on a public portal', cat:'Governance', st:'inprogress', made:'Aug 15, 2022', dl:'Dec 2023', chg:'Jun 02, 2026', rev:'Jun 02, 2026',
      ex:'Every constituency project and bursary listed, dated and costed online.',
      why:'NG-CDF is the most direct public money in the constituency, and the least visible.',
      ev:[
        { d:'Aug 15, 2022', t:'Promise captured from the campaign pledge on constituency transparency. Rated Inconclusive by default pending verifiable action.', s:'Campaign pledge, Kikuyu Constituency', to:'inconclusive' },
        { d:'Feb 08, 2024', t:'A constituency portal goes live listing bursary beneficiaries for two financial years.', s:'NG-CDF Kikuyu portal', to:'inprogress' },
        { d:'Jun 02, 2026', t:'Project listings are published but costs are missing for most entries, leaving the pledge partly met.', s:'PesaCheck review', to:null }
      ], rel:[] },
    { id:'i2', pol:'ichungwah', t:'Expand TVET capacity with two new technical institutes', cat:'Education', st:'completed', made:'Aug 15, 2022', dl:'Dec 2024', chg:'Sep 09, 2024', rev:'Sep 09, 2024',
      ex:'Two new technical training institutes for Kikuyu youth.', ev:[], rel:[] },
    { id:'i3', pol:'ichungwah', t:'Upgrade Kikuyu and Kinoo markets', cat:'Economy', st:'behind', made:'Aug 15, 2022', dl:'Dec 2023', chg:'Aug 21, 2025', rev:'Aug 21, 2025',
      ex:'Modern stalls, sanitation and lighting for the constituency\'s two main markets.', ev:[], rel:[] },
    { id:'i4', pol:'ichungwah', t:'Grade and murram 120km of constituency roads', cat:'Infrastructure', st:'inprogress', made:'Aug 15, 2022', dl:'Sep 2027', chg:'Mar 05, 2026', rev:'Mar 05, 2026',
      ex:'All-weather access for feeder roads across the constituency.', ev:[], rel:[] },
    { id:'i5', pol:'ichungwah', t:'Guarantee 1,000 youth internship placements a year', cat:'Economy', st:'unstarted', made:'Aug 15, 2022', dl:null, chg:'Aug 15, 2022', rev:'Jan 12, 2026',
      ex:'Paid placements with employers operating in and around the constituency.', ev:[], rel:[] },

    { id:'e1', pol:'passaris', t:'Disburse NGAAF grants to 5,000 women and youth groups', cat:'Economy', st:'inprogress', made:'Aug 18, 2022', dl:'Sep 2027', chg:'Apr 28, 2026', rev:'Apr 28, 2026',
      ex:'Affirmative-action grants reaching registered groups in every sub-county.', ev:[], rel:[] },
    { id:'e2', pol:'passaris', t:'Supply free sanitary towels in all public schools', cat:'Health', st:'completed', made:'Aug 18, 2022', dl:'Dec 2023', chg:'Oct 10, 2023', rev:'Oct 10, 2023',
      ex:'A guaranteed county-wide supply so no girl misses class for lack of pads.',
      why:'Period poverty keeps Nairobi girls out of class a week every month.', ev:[], rel:[] },
    { id:'e3', pol:'passaris', t:'Open a 24-hour SGBV rescue centre in Nairobi', cat:'Security', st:'behind', made:'Aug 18, 2022', dl:'Dec 2024', chg:'Feb 19, 2026', rev:'Feb 19, 2026',
      ex:'A staffed refuge with legal and medical support for survivors.', ev:[], rel:[] },
    { id:'e4', pol:'passaris', t:'Champion county-wide school feeding', cat:'Education', st:'inconclusive', made:'Aug 18, 2022', dl:null, chg:'Aug 18, 2022', rev:'Mar 08, 2026',
      ex:'Legislative and budget advocacy to entrench feeding beyond one administration.', ev:[], rel:[] },
    { id:'e5', pol:'passaris', t:'Revive street lighting on all major Nairobi corridors', cat:'Infrastructure', st:'stalled', made:'Aug 18, 2022', dl:'Dec 2023', chg:'Sep 02, 2025', rev:'Sep 02, 2025',
      ex:'Working lights on every major corridor as a women\'s-safety guarantee.', ev:[], rel:[] }
  ];

export const PETS = [
    { id:'pt1', pid:'r3', t:'Publish the full list of SHIF-empanelled hospitals', open:true, sig:3412, goal:5000, by:'Started Feb 2026 · Wanjiru M., Nairobi', link:'Universal health coverage',
      ex:'Patients are being turned away with no public register of which hospitals honour SHIF cover. Demand publication of the empanelment list and its monthly updates.' },
    { id:'pt2', pid:'r1', t:'Release quarterly Hustler Fund default and recovery data', open:true, sig:2148, goal:5000, by:'Started Nov 2025 · Otieno K., Kisumu', link:'Hustler Fund',
      ex:'KSh 60 billion disbursed, repayment unclear. Require Treasury to publish fund performance every quarter.' },
    { id:'pt3', pid:'s3', t:'Resume public consultation on CBD matatu relocation', open:true, sig:866, goal:2500, by:'Started Mar 2026 · Njeri W., Nairobi',  link:'Matatu termini relocation',
      ex:'The relocation stalled without a hearing. Reopen structured consultations with saccos, traders and commuters.' },
    { id:'pt4', pid:'r2', t:'Audit affordable housing levy collections and allocations', open:false, sig:5000, goal:5000, by:'Closed Mar 2026 · Response received', link:'Affordable housing',
      ex:'Delivered to the Auditor-General with 5,000 signatures; a special audit was gazetted in March 2026.' }
  ];

export const MONTHS = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };
export function P(str) { if (!str) return null; const parts = str.replace(',', '').split(' '); const y = parseInt(parts[parts.length - 1], 10); const m = MONTHS[parts[0]] ?? 0; return y + m / 12; }
export const TS = 2022 + 8 / 12;
export const TE = 2027 + 8 / 12;
export const NOW = 2026.5;
export function X(k) { const c = Math.min(Math.max(k, TS), TE); return Math.round(((c - TS) / (TE - TS)) * 1000) / 10; }


export function promsOf(id) { return PROMS.filter(p => p.pol === id); }
export const SRC_URL = {
    'PesaCheck': 'https://pesacheck.org', 'PesaCheck review': 'https://pesacheck.org',
    'PesaCheck field visit': 'https://pesacheck.org', 'Piga Firimbi': 'https://pigafirimbi.org',
    'The Star': 'https://www.the-star.co.ke', 'Daily Nation': 'https://nation.africa',
    'Kenya Kwanza Manifesto, p.9': 'https://www.kenyakwanza.com/manifesto',
    'Kirinyaga County manifesto': 'https://kirinyaga.go.ke',
    'Kirinyaga County Assembly records': 'https://kirinyagaassembly.go.ke',
    'NG-CDF Kikuyu portal': 'https://ngcdf.go.ke/constituency/kikuyu',
    'Campaign pledge, Kikuyu Constituency': 'https://www.parliament.go.ke',
    'UDA 2022 Manifesto': 'https://www.kenyakwanza.com/manifesto',
    'Open Budget Kenya': 'https://openbudgetkenya.org',
    'Ministry of Education': 'https://www.education.go.ke',
    'Parliamentary Budget Office': 'https://www.parliament.go.ke/the-national-assembly/parliamentary-budget-office',
    'National Assembly Budget Committee': 'https://www.parliament.go.ke',
    'The National Treasury and Economic Planning': 'https://www.treasury.go.ke',
    'Office of the Auditor-General': 'https://www.oagkenya.go.ke'
  };
export function srcUrl(s) { return SRC_URL[s] || null; }
export const CAT_C = {
    Health: '#C2185B', Education: '#6A3FB5', Devolution: '#8E3A8E', Governance: '#3F51B5',
    Transport: '#1F6FA8', Water: '#0E7490', Environment: '#0F7B6C', Agriculture: '#4C7A1E',
    Economy: '#8A6A0B', Housing: '#B0561A', Infrastructure: '#7A5C3E', Security: '#8E2323'
  };
export function catC(c) { return CAT_C[c] || '#5f6368'; }
export const CAT_IMG = {
    Infrastructure: 'photo-1541888946425-d81bb19240f5', Housing: 'photo-1541888946425-d81bb19240f5',
    Devolution: 'photo-1541888946425-d81bb19240f5', Water: 'photo-1541888946425-d81bb19240f5',
    Health: 'photo-1516549655169-df83a0774514', Education: 'photo-1577896851231-70ef18881754',
    Economy: 'photo-1595079676339-1534801ad6cf', Agriculture: 'photo-1500382017468-9049fed747ef',
    Environment: 'photo-1497435334941-8c899ee9e8e9', Transport: 'photo-1544620347-c4fd4a3d5957',
    Governance: 'photo-1519389950473-47ba0277781c'
  };
export function heroSet() {
    const rich = PROMS.filter(p => p.ev && p.ev.length > 0);
    const seen = {}, out = [];
    ['r3', 's1', 'w2', 'i1'].forEach(id => {
      const p = rich.find(x => x.id === id);
      if (p && !seen[p.pol]) { seen[p.pol] = 1; out.push(p); }
    });
    rich.forEach(p => { if (out.length < 4 && !seen[p.pol]) { seen[p.pol] = 1; out.push(p); } });
    return out.length ? out : [PROMS[0]];
  }



export function searchHits(q) {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return PROMS.filter(p => {
      const pol = POLS.find(x => x.id === p.pol);
      return (p.t + ' ' + (p.ex || '') + ' ' + p.cat + ' ' + (pol ? pol.n + ' ' + pol.role + ' ' + pol.region : '')).toLowerCase().includes(s);
    });
  }
export function clip(s, n) {
    if (!s || s.length <= n) return s || '';
    const cut = s.slice(0, n);
    return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '') + '…';
  }
export function imgFor(p) {
    const id = (p && p.img) || CAT_IMG[p && p.cat] || 'photo-1604212561359-0c3824ac0539';
    return 'https://images.unsplash.com/' + id + '?w=1400&q=80';
  }
export function counts(list) { const c = {}; ORDER.forEach(k => c[k] = 0); list.forEach(p => c[p.st]++); return c; }
export function segsFor(list, pal) {
    const c = counts(list); const t = list.length || 1;
    return ORDER.filter(k => c[k] > 0).map(k => ({ w: (c[k] / t * 100).toFixed(2) + '%', color: pal[k] }));
  }
export function short(d) { if (!d) return ''; const p = d.replace(',', '').split(' '); return p.length === 3 ? p[0] + ' ' + p[2] : d; }
