import { useTheme } from '../../context/ThemeContext';
import { ThemeTabBar } from '../../components/ThemeTabBar';

// ─── Palette ──────────────────────────────────────────────────────────────────
function usePalette(dark: boolean) {
  return dark ? {
    pageBg:         '#111111',
    containerBg:    '#1a1a1a',
    headerBg:       'linear-gradient(180deg, #001155 0%, #000033 100%)',
    navBg:          '#1a2a5a',
    navText:        '#aabbdd',
    nameColor:      '#dddddd',
    bodyText:       '#cccccc',
    mutedText:      '#888888',
    linkColor:      '#6699ff',
    sectionHdrLeft: '#1a3a6a',
    sectionHdrLeftText: '#ffffff',
    sectionHdrRight:'#883300',
    sectionHdrRightText: '#ffffff',
    row1:           '#1a1a2a',
    row2:           '#0d0d1d',
    cellBorder:     '#333355',
    contactBoxBg:   '#0d0d2a',
    contactBoxBorder:'#334477',
    interestLabel:  '#6699ff',
    onlineColor:    '#00cc44',
    urlBoxBg:       '#0d0d1a',
    urlBoxBorder:   '#334477',
    playerBg:       '#111122',
    playerText:     '#eeeeee',
    extNetworkBg:   '#0d0d1a',
    extNetworkBorder:'#334477',
    orangeAccent:   '#ff8833',
    commentBg:      '#111122',
    commentBorder:  '#334477',
    friendBorder:   '#334477',
    footerBg:       '#0a0a1a',
  } : {
    pageBg:         '#e8e8e8',
    containerBg:    '#ffffff',
    headerBg:       'linear-gradient(180deg, #1155cc 0%, #003399 100%)',
    navBg:          '#4b7bb5',
    navText:        '#ffffff',
    nameColor:      '#000000',
    bodyText:       '#000000',
    mutedText:      '#555555',
    linkColor:      '#0033cc',
    sectionHdrLeft: '#4b7bb5',
    sectionHdrLeftText: '#ffffff',
    sectionHdrRight:'#ff7400',
    sectionHdrRightText: '#000000',
    row1:           '#ffffff',
    row2:           '#d5e8f3',
    cellBorder:     '#aaaaaa',
    contactBoxBg:   '#ffffff',
    contactBoxBorder:'#999999',
    interestLabel:  '#0055aa',
    onlineColor:    '#ff6600',
    urlBoxBg:       '#f5f5f5',
    urlBoxBorder:   '#999999',
    playerBg:       '#353535',
    playerText:     '#ffffff',
    extNetworkBg:   '#ffffff',
    extNetworkBorder:'#000000',
    orangeAccent:   '#ff7400',
    commentBg:      '#fef3e2',
    commentBorder:  '#ddaa55',
    friendBorder:   '#999999',
    footerBg:       '#4b7bb5',
  };
}

const PROJECTS = [
  { name: 'Onix',        cat: 'Health AI',     url: 'https://onix.life',                    color: '#cc3344', initials: 'Ox' },
  { name: 'Soluna',      cat: 'Mental Health', url: 'https://solunaapp.com',                color: '#7733aa', initials: 'Sl' },
  { name: 'Wingman',     cat: 'Productivity',  url: 'https://wingman-3g7a.onrender.com/',  color: '#449933', initials: 'Wm' },
  { name: 'Woltspace',   cat: 'AI Infra',      url: 'https://woltspace.com',                color: '#885511', initials: 'Ws' },
  { name: 'Signal Desk', cat: 'Audio Tools',   url: 'https://signaldeskpro.com',            color: '#116677', initials: 'SD' },
  { name: 'Decathlon',   cat: 'E-Commerce',   url: 'https://www.decathlon.ca/en',           color: '#005580', initials: 'Dc' },
  { name: 'Hololabs',    cat: 'AR/VR',        url: 'https://hololabs.org/',                 color: '#660066', initials: 'Hl' },
  { name: 'Bandsintown', cat: 'Music Tech',   url: 'https://www.artist.bandsintown.com/',   color: '#883300', initials: 'Bt' },
  { name: 'Flashtract',  cat: 'Const. Tech',  url: 'https://flashtract.com/',               color: '#336600', initials: 'Ft' },
  { name: 'Estateably',  cat: 'LegalTech',    url: 'https://www.estateably.com/',           color: '#554400', initials: 'Es' },
];

const SERVICES = [
  {
    name: 'Sprint',     duration: '2–4 weeks',  color: '#cc3344', initials: 'SP',
    msg: 'A fixed engagement for one focused problem. Design audit, new feature fully specced, or a prototype ready for user testing. For teams that need to move fast on a specific decision.',
  },
  {
    name: 'Embedded',   duration: 'Ongoing',    color: '#3366aa', initials: 'EM',
    msg: "Senior design partner  -  strategy, execution, and the thing no one else will say out loud. For funded teams building at speed who need senior design leadership embedded in how they build.",
  },
  {
    name: 'Advisory',   duration: 'Monthly',    color: '#449933', initials: 'AV',
    msg: "Regular outside perspective. I review your product and your team's output. I ask the uncomfortable questions. For founders who need a trusted senior voice they're not getting from inside the company.",
  },
];

const INTERESTS = [
  ['General',     'AI product design, human-computer interaction, making AI outputs worth shipping, first-principles thinking, the intersection of velocity and craft'],
  ['Music',       "Had a record deal with Interscope. That's all I'll say."],
  ['Movies',      'Blade Runner (1982), 2049, anything about people who built things'],
  ['Television',  'Black Mirror (early seasons), Halt and Catch Fire, anything that explains why humans do the things they do'],
  ['Books',       'The Design of Everyday Things, Thinking Fast and Slow, anything about why humans make the decisions they make'],
  ['Heroes',      "Every engineer who said 'we can't do that' and then figured out how to do it anyway"],
  ['Groups',      'Product Designers and Builders, Founders Building in Public, Design Leaders Network'],
];

// ─── Contact icon items ───────────────────────────────────────────────────────
const CONTACT_ITEMS = [
  { icon: '✉', label: 'Send Message',      href: 'mailto:mike@flat7.design' },
  { icon: '↗', label: 'Forward to Friend', href: '#' },
  { icon: '👤', label: 'Add to Friends',   href: '#' },
  { icon: '★', label: 'Add to Favorites',  href: '#' },
  { icon: '💬', label: 'Instant Message',  href: '#' },
  { icon: '🚫', label: 'Block User',       href: '#' },
  { icon: '⊕', label: 'Add to Group',      href: '#' },
  { icon: '↑', label: 'Rank User',         href: '#' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function MySpacePage() {
  const { colorScheme, toggleColorScheme } = useTheme();
  const dark = colorScheme === 'dark';
  const p = usePalette(dark);

  const font = "Verdana, Geneva, Arial, sans-serif";
  const small: React.CSSProperties = { fontFamily: font, fontSize: '11px' };
  const link: React.CSSProperties = { color: p.linkColor, textDecoration: 'underline', cursor: 'pointer', fontFamily: font, fontSize: '11px' };
  const secHdrL: React.CSSProperties = { background: p.sectionHdrLeft, color: p.sectionHdrLeftText, fontFamily: font, fontSize: '11px', fontWeight: 'bold', padding: '3px 6px' };
  const secHdrR: React.CSSProperties = { background: p.sectionHdrRight, color: p.sectionHdrRightText, fontFamily: font, fontSize: '12px', fontWeight: 'bold', padding: '4px 8px' };
  const cell: React.CSSProperties = { fontFamily: font, fontSize: '11px', color: p.bodyText, padding: '5px 7px', verticalAlign: 'top', borderColor: p.cellBorder };

  return (
    <div style={{ background: p.pageBg, minHeight: '100vh', fontFamily: font }}>

      {/* ── Meta bar: theme switcher ──────────────────────────────────────── */}
      <div style={{ background: '#222222', borderBottom: '1px solid #444', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', ['--fg' as string]: '255 255 255' }}>
        <span style={{ fontFamily: font, fontSize: '10px', color: '#aaaaaa', flexShrink: 0 }}>SWITCH THEME:</span>
        <ThemeTabBar />
        <button
          onClick={toggleColorScheme}
          style={{ marginLeft: 'auto', flexShrink: 0, background: '#444', border: '1px solid #666', color: '#ddd', fontFamily: font, fontSize: '10px', padding: '3px 8px', cursor: 'pointer' }}
        >
          {dark ? '☀ Light' : '☾ Dark'}
        </button>
      </div>

      {/* ── Max-width wrapper ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1040px', margin: '0 auto', background: p.containerBg }}>

        {/* ── Top header ──────────────────────────────────────────────────── */}
        <div style={{ background: p.headerBg, padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: '"Arial Black", Impact, sans-serif', fontSize: '15px', color: '#ffffff', fontWeight: 'bold' }}>MySpace</span>
            <span style={{ color: '#aabbdd', fontSize: '11px', fontFamily: font }}>| Home</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#bbccee', fontSize: '11px', fontFamily: font }}>The Web</span>
            <input type="radio" defaultChecked={false} style={{ accentColor: '#aabbdd' }} />
            <span style={{ color: '#bbccee', fontSize: '11px', fontFamily: font }}>MySpace</span>
            <input type="radio" defaultChecked style={{ accentColor: '#aabbdd' }} />
            <input type="text" placeholder="Search" style={{ padding: '2px 6px', fontSize: '11px', fontFamily: font, width: '140px', border: '1px solid #99aacc', background: dark ? '#0d0d2a' : '#ffffff', color: dark ? '#cccccc' : '#000000' }} />
            <button style={{ background: '#4466aa', border: '1px outset #6688cc', color: '#ffffff', fontFamily: font, fontSize: '11px', padding: '2px 10px', cursor: 'pointer' }}>Search</button>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['Help', 'SignUp'].map((item, i) => (
              <span key={item}>
                <span style={{ ...link, color: '#aabbee' }}>{item}</span>
                {i === 0 && <span style={{ color: '#6677aa', margin: '0 2px' }}>|</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ── Nav bar ─────────────────────────────────────────────────────── */}
        <div style={{ background: p.navBg, padding: '4px 10px', display: 'flex', gap: '0', flexWrap: 'wrap', borderBottom: `1px solid ${dark ? '#334477' : '#3366aa'}` }}>
          {['Home', 'Browse', 'Search', 'Invite', 'Rank', 'Mail', 'Blog', 'Favorites', 'Forum', 'Groups', 'Events', 'Games', 'Music', 'Classifieds'].map((item, i, arr) => (
            <span key={item} style={{ fontFamily: font, fontSize: '11px', color: p.navText, padding: '2px 6px', whiteSpace: 'nowrap' }}>
              {item}{i < arr.length - 1 && <span style={{ color: dark ? '#445577' : '#88aacc', marginLeft: '6px' }}>|</span>}
            </span>
          ))}
        </div>

        {/* ── Main content area ────────────────────────────────────────────── */}
        <div style={{ padding: '10px' }}>

          {/* Profile name above columns */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: '"Arial Black", "Arial Bold", Arial, sans-serif', fontSize: '22px', fontWeight: '900', color: p.nameColor }}>
              Mike Jerugim
            </span>
            <span style={{ fontFamily: font, fontSize: '11px', color: p.mutedText }}>
              Product Designer and Builder
            </span>
          </div>

          {/* Two-column layout */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
            <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>

              {/* Photo + info */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${p.cellBorder}` }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', background: p.row1 }}>
                      {/* Photo placeholder */}
                      <div style={{ float: 'left', marginRight: '10px', marginBottom: '6px' }}>
                        <div style={{ width: '100px', height: '100px', background: dark ? '#223344' : '#ddeeff', border: `1px solid ${p.cellBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Arial Black", sans-serif', fontSize: '28px', fontWeight: 'bold', color: p.linkColor }}>
                          MJ
                        </div>
                        <div style={{ marginTop: '3px', textAlign: 'center' }}>
                          <span style={link}><small>View more pics</small></span>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: font, fontSize: '11px', color: dark ? '#aaaaaa' : '#555555', fontStyle: 'italic', marginBottom: '6px' }}>
                          "Sculpting outputs,<br />not accepting them."
                        </div>
                        <div style={{ fontFamily: font, fontSize: '11px', color: p.bodyText, lineHeight: '1.7' }}>
                          Male<br />
                          Age undisclosed<br />
                          US · Canada · EU
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', margin: '5px 0 2px' }}>
                          <span style={{ fontSize: '16px' }}>🟠</span>
                          <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 'bold', color: p.onlineColor }}>Online Now!</span>
                        </div>
                        <div style={{ fontFamily: font, fontSize: '11px', color: p.mutedText }}>
                          Last Login: Today
                        </div>
                      </div>
                      <div style={{ clear: 'both' }} />
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Contact box */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${p.contactBoxBorder}` }}>
                <thead>
                  <tr><th style={{ ...secHdrL, textAlign: 'left' }}>Contact Mike</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px', background: p.contactBoxBg }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px' }}>
                        {CONTACT_ITEMS.map(item => (
                          <a key={item.label} href={item.href} style={{ ...link, display: 'flex', alignItems: 'center', gap: '4px', padding: '2px', whiteSpace: 'nowrap', textDecoration: 'none' }}>
                            <span style={{ fontSize: '13px', lineHeight: 1 }}>{item.icon}</span>
                            <span style={{ textDecoration: 'underline', fontSize: '11px' }}>{item.label}</span>
                          </a>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* URL box */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${p.urlBoxBorder}` }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '5px 7px', background: p.urlBoxBg }}>
                      <div style={{ fontFamily: font, fontSize: '10px', color: p.mutedText, fontWeight: 'bold', marginBottom: '2px' }}>MySpace URL:</div>
                      <div style={{ fontFamily: font, fontSize: '10px', color: p.linkColor }}>https://flat7.design</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Music player */}
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ background: p.playerBg, padding: '6px 8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '36px', height: '36px', background: '#2a7a2a', border: '2px solid #44aa44', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}>
                          <span style={{ color: '#ffffff', fontSize: '16px', marginLeft: '2px' }}>▶</span>
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={{ fontFamily: font, fontSize: '11px', fontWeight: 'bold', color: p.playerText, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Unreleased Track
                          </div>
                          <div style={{ fontFamily: font, fontSize: '10px', color: '#aaaaaa' }}>
                            Interscope Records
                          </div>
                        </div>
                        <div style={{ fontFamily: font, fontSize: '9px', color: '#888888', textAlign: 'right', flexShrink: 0 }}>
                          +delete+<br />+view+
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Interests */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${p.cellBorder}` }}>
                <thead>
                  <tr><th colSpan={2} style={{ ...secHdrL, textAlign: 'left' }}>Mike's Interests</th></tr>
                </thead>
                <tbody>
                  {INTERESTS.map(([cat, val]) => (
                    <tr key={cat}>
                      <td style={{ ...cell, background: p.row2, fontWeight: 'bold', color: p.interestLabel, width: '72px', borderTop: `1px solid ${p.cellBorder}`, fontSize: '11px' }}>
                        {cat}
                      </td>
                      <td style={{ ...cell, background: dark ? '#0a1525' : '#eef5fb', borderTop: `1px solid ${p.cellBorder}`, lineHeight: '1.5' }}>
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── RIGHT COLUMN ────────────────────────────────────────────── */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>

              {/* Extended network box */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `3px solid ${p.extNetworkBorder}` }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', background: p.extNetworkBg, textAlign: 'center' }}>
                      <span style={{ fontFamily: '"Arial Black", Arial, sans-serif', fontSize: '20px', fontWeight: 'bold', color: p.bodyText }}>
                        Mike is in your extended network
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Latest update (blog equivalent) */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${p.cellBorder}` }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px', background: p.row1 }}>
                      <div style={{ fontFamily: font, fontSize: '11px', color: p.bodyText }}>
                        <strong>Mike's Latest Update</strong>&nbsp;
                        <a href="mailto:mike@flat7.design" style={link}>[Get in touch]</a>
                      </div>
                      <div style={{ fontFamily: font, fontSize: '11px', color: p.bodyText, marginTop: '4px' }}>
                        Currently available for new engagements. Embedded, Sprint, and Advisory arrangements. &nbsp;
                        <a href="mailto:mike@flat7.design" style={{ ...link, color: p.orangeAccent, fontWeight: 'bold' }}>(contact me)</a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Blurbs */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${p.cellBorder}` }}>
                <thead>
                  <tr><th colSpan={2} style={{ ...secHdrR, textAlign: 'left' }}>Mike's Blurbs</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2} style={{ ...cell, background: p.row1, lineHeight: '1.65', borderTop: `1px solid ${p.cellBorder}` }}>
                      <div style={{ fontWeight: 'bold', color: p.orangeAccent, marginBottom: '4px' }}>About me:</div>
                      <p style={{ margin: '0 0 8px 0' }}>
                        I've been designing products since before "AI" was the answer to every question. My work lives at the intersection of AI capability and human judgment  -  health intelligence platforms, legal AI tools, agentic infrastructure, and mental wellness apps across three continents.
                      </p>
                      <p style={{ margin: '0 0 8px 0' }}>
                        Before that: film post-production, a record deal with Interscope, a web studio, and a decade of shipping products from seed to hypergrowth.
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong><em>The AI space has a slop problem.</em></strong> Speed-to-market pressure pushes teams to accept whatever the model generates. Design isn't a layer you apply at the end. It's the difference between an output you settled for and one you sculpted.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ ...cell, background: p.row2, lineHeight: '1.65', borderTop: `1px solid ${p.cellBorder}` }}>
                      <div style={{ fontWeight: 'bold', color: p.orangeAccent, marginBottom: '4px' }}>Who I'd like to meet:</div>
                      Cross-functional teams of builders shipping at a velocity that was previously unimaginable. Product engineers who care about craft. Founders who've realised their AI product looks exactly like every other AI product and want to do something about it.
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Friend Space (Projects) */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${p.cellBorder}` }}>
                <thead>
                  <tr><th colSpan={4} style={{ ...secHdrR, textAlign: 'left' }}>Mike's Friend Space</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4} style={{ ...cell, background: p.row1, borderTop: `1px solid ${p.cellBorder}` }}>
                      <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 'bold', color: p.bodyText }}>
                        Mike has <span style={{ color: p.orangeAccent }}>{PROJECTS.length}</span> Projects.
                      </span>
                    </td>
                  </tr>
                  <tr>
                    {PROJECTS.slice(0, 4).map(proj => (
                      <td key={proj.name} style={{ ...cell, background: p.row2, textAlign: 'center', width: '25%', borderTop: `1px solid ${p.cellBorder}` }}>
                        <div>
                          {proj.url
                            ? <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                <div style={{ width: '80px', height: '80px', margin: '0 auto', background: proj.color, border: `1px solid ${p.friendBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Arial Black", sans-serif', fontSize: '22px', color: '#fff' }}>
                                  {proj.initials}
                                </div>
                                <div style={{ marginTop: '3px', ...link, textDecoration: 'none', fontWeight: 'bold', textAlign: 'center', display: 'block' }}>{proj.name}</div>
                              </a>
                            : <>
                                <div style={{ width: '80px', height: '80px', margin: '0 auto', background: proj.color, border: `1px solid ${p.friendBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Arial Black", sans-serif', fontSize: '22px', color: '#fff', opacity: 0.7 }}>
                                  {proj.initials}
                                </div>
                                <div style={{ marginTop: '3px', fontFamily: font, fontSize: '11px', fontWeight: 'bold', color: p.mutedText, textAlign: 'center' }}>{proj.name}</div>
                              </>
                          }
                          <div style={{ fontFamily: font, fontSize: '10px', color: p.mutedText }}>{proj.cat}</div>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {PROJECTS.slice(4).map(proj => (
                      <td key={proj.name} style={{ ...cell, background: p.row1, textAlign: 'center', width: '25%', borderTop: `1px solid ${p.cellBorder}` }}>
                        {proj.url
                          ? <a href={proj.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                              <div style={{ width: '80px', height: '80px', margin: '0 auto', background: proj.color, border: `1px solid ${p.friendBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Arial Black", sans-serif', fontSize: '22px', color: '#fff' }}>
                                {proj.initials}
                              </div>
                              <div style={{ marginTop: '3px', ...link, textDecoration: 'none', fontWeight: 'bold', textAlign: 'center', display: 'block' }}>{proj.name}</div>
                            </a>
                          : <>
                              <div style={{ width: '80px', height: '80px', margin: '0 auto', background: proj.color, border: `1px solid ${p.friendBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Arial Black", sans-serif', fontSize: '22px', color: '#fff', opacity: 0.7 }}>
                                {proj.initials}
                              </div>
                              <div style={{ marginTop: '3px', fontFamily: font, fontSize: '11px', fontWeight: 'bold', color: p.mutedText, textAlign: 'center' }}>{proj.name}</div>
                            </>
                        }
                        <div style={{ fontFamily: font, fontSize: '10px', color: p.mutedText }}>{proj.cat}</div>
                      </td>
                    ))}
                    {/* Empty padding cells */}
                    {Array.from({ length: 4 - PROJECTS.slice(4).length }).map((_, i) => (
                      <td key={`empty-${i}`} style={{ ...cell, background: p.row1, borderTop: `1px solid ${p.cellBorder}` }} />
                    ))}
                  </tr>
                  <tr>
                    <td colSpan={4} style={{ ...cell, background: p.row2, textAlign: 'right', borderTop: `1px solid ${p.cellBorder}` }}>
                      <a href="#" style={{ ...link, color: p.orangeAccent, fontWeight: 'bold' }}>View All of Mike's Projects</a>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Services as "Comments" */}
              <table style={{ width: '100%', borderCollapse: 'collapse', border: `1px solid ${p.cellBorder}` }}>
                <thead>
                  <tr>
                    <th style={{ ...secHdrR, textAlign: 'left' }}>Mike's Services</th>
                    <th style={{ ...secHdrR, textAlign: 'right' }}>
                      <a href="mailto:mike@flat7.design" style={{ ...link, color: dark ? '#ffcc88' : '#000000', fontSize: '11px' }}>Contact Mike</a>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={2} style={{ ...cell, background: p.row1, borderTop: `1px solid ${p.cellBorder}` }}>
                      Displaying <strong style={{ color: p.orangeAccent }}>3</strong> of <strong style={{ color: p.orangeAccent }}>3</strong> engagements available &nbsp;
                      <a href="mailto:mike@flat7.design" style={link}>(Inquire about availability)</a>
                    </td>
                  </tr>
                  {SERVICES.map((svc, i) => (
                    <tr key={svc.name}>
                      <td colSpan={2} style={{ background: i % 2 === 0 ? p.commentBg : p.row2, borderTop: `1px solid ${p.commentBorder}`, padding: '8px' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                          <div style={{ flexShrink: 0, textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', background: svc.color, border: `1px solid ${p.cellBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Arial Black", sans-serif', fontSize: '18px', color: '#fff' }}>
                              {svc.initials}
                            </div>
                            <div style={{ marginTop: '2px', fontFamily: font, fontSize: '10px', fontWeight: 'bold', color: p.linkColor }}>{svc.name}</div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', flexWrap: 'wrap', gap: '4px' }}>
                              <span style={{ fontFamily: font, fontSize: '11px', fontWeight: 'bold', color: p.bodyText }}>{svc.name}</span>
                              <span style={{ fontFamily: font, fontSize: '10px', color: p.mutedText }}>{svc.duration}</span>
                            </div>
                            <div style={{ fontFamily: font, fontSize: '11px', color: p.bodyText, lineHeight: '1.6', marginBottom: '6px' }}>{svc.msg}</div>
                            <a href="mailto:mike@flat7.design" style={{ ...link, fontWeight: 'bold', fontSize: '11px' }}>Inquire →</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────────── */}
        <div style={{ background: p.footerBg, borderTop: `1px solid ${dark ? '#334477' : '#3366aa'}`, padding: '6px 10px', textAlign: 'center' }}>
          <div style={{ fontFamily: font, fontSize: '10px', color: dark ? '#aabbdd' : '#ffffff', marginBottom: '3px' }}>
            {['Home', 'Browse', 'Search', 'Invite', 'Mail', 'Blog', 'Privacy', 'Safety Tips', 'Contact'].map((item, i, arr) => (
              <span key={item}>
                <span style={{ cursor: 'pointer', textDecoration: 'underline' }}>{item}</span>
                {i < arr.length - 1 && <span style={{ margin: '0 4px', opacity: 0.5 }}>|</span>}
              </span>
            ))}
          </div>
          <div style={{ fontFamily: font, fontSize: '10px', color: dark ? '#6677aa' : '#cce0ff' }}>
            © {new Date().getFullYear()} flat7.design · US · Canada · EU
          </div>
        </div>
      </div>
    </div>
  );
}
