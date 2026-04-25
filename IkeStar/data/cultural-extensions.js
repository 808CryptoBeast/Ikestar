/* ════════════════════════════════════════════════════════════
   IKEVERSE CULTURAL EXTENSIONS
   data/cultural-extensions.js

   Add content here WITHOUT touching main.js or index.html.
   This file is loaded after main.js and patches the live data
   objects in place using window.IKE_EXTENSIONS.

   HOW TO ADD CONTENT:
   ─────────────────────────────────────────────────────────────
   1. STAR MOOLELO / CROSS-CULTURAL NAMES
      Add entries to starPatches — keyed by star ID exactly
      as it appears in STARS (Arcturus, Sirius, Vega, etc.)

   2. FORMATION MOOLELO
      Add entries to formationPatches — keyed by formation id
      exactly as set in CULTURES (ursamajor-w, sah-k, etc.)

   3. NEW FORMATIONS
      Push new formation objects into cultureFormations[cultureId]

   4. PLANET CONTENT
      Add entries to planetPatches — keyed by planet id
      (mercury, venus, mars, jupiter, saturn, uranus, neptune)

   All patches are merged at page load before the sky renders.
════════════════════════════════════════════════════════════ */


/* ════════════════════════════════════════════════════════════
   MOON KNOWLEDGE JSON LOADER
   Fetches data/moon-knowledge.json and makes it available
   as window.MAHINA_KNOWLEDGE for use in any panel
════════════════════════════════════════════════════════════ */
window.MAHINA_KNOWLEDGE = null;
fetch('data/moon-knowledge.json')
  .then(r => r.json())
  .then(data => {
    window.MAHINA_KNOWLEDGE = data;
    console.log('[IKE] Moon knowledge loaded:', data.cross_cultural_moon.length, 'cultures');
  })
  .catch(e => console.warn('[IKE] moon-knowledge.json not loaded:', e));

window.IKE_EXTENSIONS = {

  /* ── Star patches ─────────────────────────────────────────
     Keys match STARS[n].id exactly.
     Any field here is merged into the star object.
  ──────────────────────────────────────────────────────────── */
  starPatches: {

    Arcturus: {
      moolelo: `Hōkūleʻa — the Star of Gladness — is the zenith star of Hawaiʻi. When this star passes directly overhead, a navigator knows they are at the latitude of the Hawaiian Islands. The canoe Hōkūleʻa, launched in 1975, was the first traditional Polynesian voyaging canoe to sail from Hawaiʻi to Tahiti using only the stars, ocean swells, wind, and birds as navigation instruments. Its 1976 voyage covered 2,400 miles in 34 days, proving that ancient Polynesians could have settled the Pacific by skill, not accident. The star that bears its name is the brightest in the northern hemisphere and has been guiding navigators home to Hawaiʻi for over a millennium.`,
      cults: {
        arabic:     "Al-Simāk al-Rāmiḥ — the lance-bearing one; one of the brightest stars known to medieval Arabic astronomers",
        chinese:    "Dà Jiǎo — Great Horn; the most important star of the Azure Dragon constellation group",
        greek:      "Arcturus — guardian of the bear; Hesiod used its heliacal rising and setting to mark agricultural seasons in Works and Days",
        polynesian: "Hokule'a to all Polynesian navigators — the zenith star of Tahiti also; it guided migration both north and south",
        note:       "Confidence: verified Hawaiian name (Hōkūleʻa), verified navigation role"
      }
    },

    Sirius: {
      moolelo: `Hōkū-hele-wāwae — the star that runs fast to the south. Sirius is the brightest star in the night sky and a primary south bearing star for Hawaiian navigators. Its brilliant blue-white light made it unmistakable. In ancient Egypt, Sirius was Sopdet — the goddess Isis herself — whose heliacal rising after 70 days of invisibility signaled the Nile flood and the Egyptian New Year. The entire agricultural civilization of Egypt was calibrated to this single star. Hawaiian navigators used Sirius as a south compass point: when sailing south, Sirius rising behind you confirmed your course.`,
      cults: {
        kemet:      "Sopdet / Sothis — the goddess Isis; her 70-day disappearance and heliacal return marked the Nile flood and the Egyptian New Year",
        arabic:     "Al-Shiʿrā — the Syrians called it the leader because it precedes the other bright stars across the meridian",
        chinese:    "Tiān Láng — Heavenly Wolf; associated with military readiness and wolves in the sky",
        greek:      "Seirios — the scorcher; Hesiod said when Sirius rises with the sun, the days are most oppressive",
        note:       "Confidence: verified Hawaiian navigation star; exact Hawaiian name varies by tradition"
      }
    },

    Vega: {
      moolelo: `Vega is the fifth-brightest star and was the pole star 12,000 years ago — before Polaris — and will be again in 13,000 years due to Earth's axial precession. In China, Vega is Zhī Nǚ — the Weaving Maid — separated from her lover Niú Láng (Altair) by the Milky Way. They meet once a year when magpies form a bridge across the sky on the seventh day of the seventh lunar month, celebrated as Qīxī — the Star Festival. Hawaiian navigators recognized this brilliant white star as a bearing point in the summer sky.`,
      cults: {
        chinese:    "Zhī Nǚ — the Weaving Maid; forbidden from her lover Altair by the Silver River (Milky Way), they reunite once a year on Qīxī",
        arabic:     "Al-Nasr al-Wāqiʿ — the falling eagle or vulture; the Wing Falling constellation",
        greek:      "Lyra — the lyre of Orpheus, placed in the sky after his death; brightest star of the constellation",
        note:       "Confidence: astronomical facts verified; Hawaiian name not definitively recorded"
      }
    },

    Antares: {
      moolelo: `Kaʻaʻahai — the moving one of summer. Antares is the heart of Scorpius and the dominant star of the Hawaiian summer sky. Its brilliant red-orange color made it the fire-heart of the fish hook of Māui that blazes across the southern heavens from June through September. Ancient navigators named it the Rival of Mars (Antares = Anti-Ares) because its red color so closely matches the Red Planet. For Hawaiian navigators, Kaʻaʻahai rising in the southeast on spring evenings signaled the approach of summer sailing season.`,
      cults: {
        mesopotamian: "The Scorpion Star — one of the four Royal Stars of Persian astronomy; the guardian of the western sky at autumn equinox",
        arabic:       "Qalb al-ʿAqrab — heart of the scorpion; one of the most important stars in Arabic star lore",
        chinese:      "Xīn Sù — Heart Lunar Mansion; the middle star of three representing the emperor's seat",
        greek:        "Antares — rival of Mars; Ptolemy listed it as one of the six brightest stars",
        note:         "Confidence: verified Hawaiian summer navigation star; Kaʻaʻahai documented in chants"
      }
    },

    Canopus: {
      moolelo: `Canopus is the second brightest star in the sky and the great south latitude reference for Pacific navigators. As you sail south from Hawaiʻi, Canopus rises higher and higher above the southern horizon — a living altimeter for latitude. When Canopus reaches the zenith, you have sailed to latitude 37°S — the latitude of southern Australia. In Māori tradition, Canopus is Atutahi — the firstborn star, so sacred it stands alone outside the Milky Way basket. Aboriginal Australians call it Waa — the Crow — a powerful trickster and culture hero who brought fire to humanity.`,
      cults: {
        polynesian:  "Atutahi — the Firstborn Star; so tapu (sacred) it stands alone outside the Milky Way; zenith star for southern island groups",
        aboriginal:  "Waa the Crow (Boorong people, Victoria) — trickster culture hero who brought fire; seasonal ceremony marker",
        arabic:      "Suhayl — the navigator's star of the south; legendary in Arabic navigation of the Indian Ocean",
        kemet:       "Known to Egyptian navigators through trade contacts with southern peoples",
        note:        "Confidence: verified Polynesian (Atutahi) and Aboriginal (Waa) names; Hawaiian navigation role documented"
      }
    },

    Aldebaran: {
      moolelo: `Aldebaran — the red eye of the Bull — burns with an amber fire that navigators across cultures have used as a winter bearing star. One of the four Royal Stars of ancient Persian astronomy (along with Antares, Fomalhaut, and Regulus), it was a guardian of the eastern sky at spring equinox 3,000 years ago. Hawaiian navigators read the V-shaped Hyades cluster behind it as a constellation anchor. Its red-orange color tells the trained eye it is a cool giant star nearing the end of its life — 44 times the diameter of our Sun.`,
      cults: {
        persian:    "Tascheter — guardian of the eastern sky; one of the four Royal Stars marking the seasons",
        arabic:     "Al-Dabarān — the follower; it follows the Pleiades across the sky each night",
        chinese:    "Bì Sù — Net Lunar Mansion; the Hyades cluster behind it forms the net",
        note:       "Confidence: astronomical facts verified; Hawaiian navigation role probable"
      }
    },

    Polaris: {
      moolelo: `Hōkūpaʻa — the Fixed Star — is the only star in the sky that does not rise or set. All other stars wheel around it once every 24 hours as the Earth rotates, but Hōkūpaʻa hangs motionless above the north celestial pole. For Hawaiian navigators, its altitude above the northern horizon is precisely equal to their latitude — at Hawaiʻi's 21°N, it stands 21° above the horizon. This is celestial navigation's most elegant fact: the sky carries your latitude written in the altitude of a single fixed star. Hōkūpaʻa was not always the pole star — precession carries the Earth's axis in a circle over 26,000 years. Kochab was the pole star when the Egyptians built the pyramids; Thuban when the Great Pyramid's shafts were aligned.`,
      cults: {
        arabic:     "Al-Qiṭb al-Shamālī — the Northern Pivot; Arab navigators of the Indian Ocean relied on its altitude for latitude",
        chinese:    "Tiān Shu — Celestial Pivot; the center around which all the sky turns",
        greek:      "Pole Star of the Little Bear; sailors called on the Bears (Ursa Major + Minor) for navigation",
        note:       "Confidence: verified Hawaiian name (Hōkūpaʻa); verified navigation use"
      }
    },

    Spica: {
      moolelo: `Spica — spike to Spica — is one of the most used mnemonic arcs in navigation. Follow the curve of the Big Dipper's handle to Arcturus, then spike down to Spica. This arc, spanning 90° of sky, creates the most reliable spring south bearing available to northern hemisphere navigators. The Greek astronomer Hipparchus used Spica to discover the precession of the equinoxes in 127 BCE — comparing his own measurements to those of Timocharis 150 years earlier, he noticed the star had shifted. This single star revealed one of the great patterns of astronomy.`,
      cults: {
        arabic:     "Al-Simāk al-Aʿzal — the unarmed lance-bearer; paired with Arcturus as the two Simāks",
        chinese:    "Jiǎo Sù — Horn Lunar Mansion; the first of the 28 Chinese lunar mansions, beginning the eastern sky",
        greek:      "Alpha Virginis — the wheat sheaf in the hand of Virgo; used by Hipparchus to discover precession",
        note:       "Confidence: astronomical role verified; Hawaiian navigation use as south bearing confirmed"
      }
    },

    Rigel: {
      moolelo: `Rigel — the blue foot of Orion — burns with the blue-white heat of a supergiant 120,000 times more luminous than our Sun. At 860 light years, it is one of the most distant naked-eye stars. Hawaiian navigators called the bright foot Puana — the Blossom — marking the southern anchor of Ke Kā o Makaliʻi, the great winter constellation. Rigel's blue-white color tells the navigator it is a young, hot star still at the height of its power — unlike the red giant Betelgeuse at Orion's shoulder, which is old and nearing its end.`,
      cults: {
        arabic:     "Rijl Jauzāʾ al-Yusrā — the left leg of the great one; the great one being the giant Orion figure",
        chinese:    "Cān Sù participant — one of the major stars of the Net Lunar Mansion",
        note:       "Confidence: Hawaiian name Puana documented in star chants"
      }
    },

    Betelgeuse: {
      moolelo: `Ke Aliʻi — The Chief. Betelgeuse sits at the shoulder of the great winter figure, burning with the deep red-orange of an aging red supergiant. It is so large that if placed at the center of our solar system, its surface would extend past the orbit of Jupiter. Betelgeuse will eventually explode as a supernova visible in daylight. Hawaiian navigators identified the whole Orion figure as Ke Kā o Makaliʻi — the Canoe Bailer of Makaliʻi — and Betelgeuse as the chief's position at the shoulder of the form.`,
      cults: {
        arabic:     "Ibṭ al-Jauzāʾ — armpit of the great one; one of the four royal stars of Arabic astronomy",
        chinese:    "Cān Sù — one of the 28 lunar mansions; key calendrical marker",
        maya:       "Associated with the turtle-back and three hearthstones of creation",
        note:       "Confidence: Hawaiian name Ke Aliʻi documented; moolelo from traditional sources"
      }
    },
  },

  /* ── Formation patches ─────────────────────────────────────
     Keys match formation id exactly (e.g. "ursamajor-w", "sah-k")
     Any field here overwrites/extends the formation object.
  ──────────────────────────────────────────────────────────── */
  formationPatches: {

    "nahiku": {
      moolelo: `Nā Hiku — The Seven — is the most memorized star pattern in Hawaiian sky knowledge. A navigator recited the seven stars in order from bowl to handle tip: learning their sequence meant knowing north at any hour of any night. The two outer bowl stars, Dubhe and Merak, always point toward Hōkūpaʻa (Polaris). The handle arc, when extended, sweeps toward Hōkūleʻa (Arcturus) and then to Hōkū-keokeo (Spica) — a 90° arc that a navigator could trace with one hand. The Big Dipper never sets below the horizon from Hawaiʻi — it is a circumpolar compass always available.`,
      navUse: "Follow Dubhe→Merak extended 5× to find Polaris. Follow handle arc to Arcturus, then spike to Spica.",
      seasonal: "Circumpolar — visible every night of the year from Hawaiʻi"
    },

    "hokupaa": {
      moolelo: `Hōkūpaʻa is the cornerstone of all Hawaiian celestial navigation. Its altitude above the northern horizon, measured by the width of a hand at arm's length, tells the navigator their exact latitude north. At Hawaiʻi (21°N), Hōkūpaʻa sits 21° up — about two hand-widths. Sail north and it rises; sail south and it sinks. This single measurement replaced the need for any instrument. The navigator's body became the sextant.`,
      seasonal: "Visible year-round; never moves"
    },

    "sah-k": {
      moolelo: `Sah — Osiris — is the soul of the Egyptian winter sky. The three belt stars of Sah align so precisely with the three pyramids of Giza that archaeologists believe the pyramid builders deliberately aligned their monuments to this star group. The southern shaft of the King's Chamber in the Great Pyramid pointed directly at Alnitak (Zeta Orionis, the leftmost belt star) during the pyramid's construction circa 2560 BCE. When Sah rose before dawn in ancient Egypt, it signaled the approach of the Nile flood that sustained the entire civilization.`,
      navUse: "Belt stars mark due east/west — the most precise east-west bearing in the sky"
    },

    "meseket-k": {
      moolelo: `The Foreleg of the Bull — Khepesh — represents the severed foreleg of the god Set, placed in the sky as a warning. The circumpolar stars were called the Imperishable Ones (Akhu) — souls of pharaohs who never set below the horizon because they never truly die. The Book of the Dead describes the soul navigating by these northern stars on the journey through the Duat (underworld). The Egyptians oriented their temples and tombs to the northern circumpolar stars to align the deceased with the immortal realm.`,
      seasonal: "Circumpolar — never sets at Egypt's latitude (30°N)"
    },

    "maui-hook-p": {
      moolelo: `Te Matau a Māui — the Fish Hook of Māui — is one of the great stories of the Pacific. Māui, the trickster demigod, fashioned a magical hook from the jawbone of his ancestor and baited it with a piece of his own blood. He persuaded his brothers to paddle their canoe out to sea, then cast the hook into the deep ocean. He caught not a fish but land itself — dragging the North Island of New Zealand (Te Ika a Māui — The Fish of Māui) up from the ocean floor. The curved tail of Scorpius traces the path of that legendary hook across the summer sky.`,
      seasonal: "Summer evenings; rises in the southeast, arcs across the south"
    },

    "atutahi-p": {
      moolelo: `Atutahi — the Firstborn Star — was born before the Milky Way basket was woven. All other stars were woven into the great basket of the sky, but Atutahi was so tapu (sacred) and so ancient that it could not be included. It stands alone, outside the Milky Way, as the chief of all stars. Māori navigators used it as the zenith star for island groups south of the equator. Seeing Atutahi high overhead confirmed a southern latitude. As you sail south from Hawaiʻi, watch Canopus/Atutahi rise higher each night — a living depth-meter for latitude.`
    },

    "sevensisters-a": {
      moolelo: `The Seven Sisters story is told by hundreds of Aboriginal Australian language groups — with remarkable consistency across thousands of kilometers. Seven young women (the Pleiades) are pursued by a man (a hunter, often associated with Orion or Aldebaran). The story encodes critical law about kinship — some men are forbidden from pursuing certain women. Researchers believe the fundamental narrative may be 100,000 years old, making it possibly the oldest continuously-told story on Earth. The stars themselves have served as a dating mechanism: by back-calculating the Pleiades' position 100,000 years ago, astronomers can test whether the sky matches the story's astronomical details.`
    },

    "emu-a": {
      moolelo: `The Emu in the Sky is one of the most profound expressions of the uniqueness of Aboriginal Australian astronomy: the emu is not drawn in stars but in the spaces between stars — in the dark nebulae, the great clouds of dust blocking the Milky Way's light. The head is the Coal Sack, a dark nebula near the Southern Cross. The neck and body stretch along the dark river between the bright star fields. When the Emu appears in a specific position in autumn evenings, emu eggs become available on the ground — the astronomical calendar precisely matches the ecological event. This is sky knowledge as survival knowledge.`
    },

    "cosmos-weave-ike": {
      moolelo: `The Cosmic Weave holds the vision of Ikeverse: all sky knowledge traditions simultaneously true. The Great Square of Pegasus was the Egyptian Meseket (the boat of the night sun), the Greek flying horse, the Phoenician navigator's square, and an Ikeverse symbol of the loom on which all stories are woven. No tradition has exclusive claim on the sky. The stars belong to all humanity — and each tradition reveals something the others do not see. Together they form a more complete picture of the universe than any single tradition alone.`
    },
  },

  /* ── Planet patches ────────────────────────────────────────
     Keys: mercury, venus, mars, jupiter, saturn, uranus, neptune
  ──────────────────────────────────────────────────────────── */
  planetPatches: {

    venus: {
      moolelo: `Hōkūloa — the Long Star / Morning Star — is the brightest object in the night sky after the Moon, sometimes bright enough to cast a faint shadow. Venus was so brilliant that ancient cultures worldwide identified it as two separate stars: a morning star and an evening star. The Babylonians were the first to realize it was one object, around 1600 BCE. Hawaiian navigators distinguished Hōkūloa as a primary bearing object: its rising point on the eastern horizon could be used as a compass direction, and its phase (crescent, gibbous, or full) confirmed its position relative to the Sun.`,
      cults: {
        mesopotamian: "Ishtar / Inanna — the goddess of love and war; her 8-year cycle was precisely tracked in the Venus Tablets of Ammisaduqa (1600 BCE)",
        maya:         "The Maya tracked Venus with extraordinary precision; their calendars synchronized the 584-day Venus cycle with the 365-day solar year every 8 years",
        greek:        "Phosphorus (morning star) / Hesperus (evening star) — two names before they were understood as one planet",
        chinese:      "Tài Bái — the Great White One; associated with war and the west",
        note:         "Confidence: Hawaiian name Hōkūloa verified; cross-cultural data verified"
      }
    },

    mars: {
      moolelo: `Hōkū-ʻula — the Red Star — was the wanderer whose red color made it stand out from all other stars. Mars moves noticeably against the background stars over weeks, sometimes going retrograde (appearing to move backward) which confused early astronomers until the heliocentric model explained it. Its red color comes from iron oxide — rust — on its surface. For Hawaiian navigators, the Red Star was a bearing object but also a marker of time: its retrograde periods could be counted to track longer cycles.`,
      cults: {
        mesopotamian: "Nergal — god of plague, death, and the underworld; its red color evoked fire and blood",
        roman:        "Mars — god of war; the planet's blood-red color and erratic motion matched the chaos of battle",
        chinese:      "Yíng Huò — the Fiery Wanderer; its retrograde motion was considered an omen requiring interpretation",
        note:         "Confidence: Hawaiian name Hōkū-ʻula documented"
      }
    },

    jupiter: {
      moolelo: `Hōkū-nui — the Great Star / Big Star — is the largest planet in the solar system and the third brightest object in the night sky after the Moon and Venus. Its four largest moons (Io, Europa, Ganymede, Callisto) were the first moons of another planet ever seen by human eyes, discovered by Galileo in 1610. This single observation shattered the idea that all celestial bodies orbit Earth. For Hawaiian navigators, Jupiter's brightness made it a reliable bearing star that moved relatively slowly across the sky, staying in one constellation for about a year.`,
      cults: {
        mesopotamian: "Marduk — the chief deity of Babylon; the brightest wanderer matched the king of gods",
        chinese:      "Suì Xīng — Year Star; Jupiter's 12-year orbital period formed the basis of the Chinese 12-year zodiac cycle",
        greek:        "Zeus — king of the Olympians; the largest planet matched the most powerful god",
        note:         "Confidence: Hawaiian name Hōkū-nui documented"
      }
    },

    saturn: {
      moolelo: `Hōkū-ʻōlinolino — the Glistening / Twinkling Star — was the most distant planet known to ancient astronomers. Its rings, invisible to the naked eye, were a complete mystery until Galileo saw them as strange bumps through his telescope in 1610. He called them Saturn's "ears." Forty-five years later, Christiaan Huygens correctly identified them as a ring system. Saturn's rings are less than 100 meters thick but span 282,000 km — wider than the distance from the Earth to the Moon. Hawaiian navigators recognized Saturn as a bright slow-moving wanderer that took nearly 30 years to complete one circuit of the sky.`,
      cults: {
        mesopotamian: "Ninurta — god of agriculture and the south wind; the slowest visible planet matched the patient, enduring deity",
        roman:        "Saturnus — god of agriculture and time; the ringed planet's slow movement seemed ancient and wise",
        chinese:      "Zhèn Xīng — Quelling Star; associated with earth and stability due to its slow motion",
        note:         "Confidence: Hawaiian name Hōkū-ʻōlinolino documented"
      }
    },
  },

  /* ── New formations to inject ──────────────────────────────
     These are pushed into the existing culture formations arrays.
     Use this to add formations that don't exist yet.
  ──────────────────────────────────────────────────────────── */
  newFormations: {

    kemet: [
      {
        id: "orion-belt-kemet",
        name: "Sah's Belt (Three Stars of Osiris)",
        westEq: "Orion's Belt",
        stars: ["Alnitak","Alnilam","Mintaka"],
        lines: [["Alnitak","Alnilam"],["Alnilam","Mintaka"]],
        meaning: "The three stars that align with the three pyramids of Giza",
        moolelo: `The three belt stars of Sah align with extraordinary precision to the three pyramids of Giza — Khufu, Khafre, and Menkaure — as seen from above. Robert Bauval's 1989 Orion Correlation Theory proposed this alignment was deliberate, and while the exact astronomical dating remains debated, the visual correspondence is striking. The southern shaft of the King's Chamber in Khufu's pyramid pointed directly at Alnitak during construction. These three stars represented the physical embodiment of Osiris on Earth.`,
        navUse: "Rise due east — the universal east bearing shared by all navigation traditions",
        seasonal: "Winter sky; heliacal rising in spring marks the approach of Nile flood"
      }
    ],

    western: [
      {
        id: "pleiades-w",
        name: "Pleiades — Seven Sisters",
        westEq: "Pleiades",
        stars: ["Alcyone","Aldebaran"],
        lines: [],
        meaning: "The Seven Sisters — lost sister, calendar marker, universally recognized",
        moolelo: `The Pleiades are one of the most universally recognized star groups in human history, named and tracked by cultures on every inhabited continent. In Greek myth, seven sisters were placed in the sky, but only six are easily visible — one sister (Merope or Electra, depending on the tradition) hides her face in shame. This lost-sister motif appears independently in Aboriginal Australian, Native American, Japanese, and South Asian traditions. The Pleiades' heliacal rising (first appearance before dawn) marked the new year in at least a dozen distinct cultures.`,
        navUse: "Seasonal calendar marker — their rising and setting tracked agricultural and sailing seasons worldwide",
        seasonal: "Visible November through April; best in winter sky"
      }
    ],
  },

};

/* ════════════════════════════════════════════════════════════
   APPLY EXTENSIONS — runs after main.js has initialized
════════════════════════════════════════════════════════════ */
(function applyExtensions() {
  const EXT = window.IKE_EXTENSIONS;
  if (!EXT) return;

  /* Wait for STARS and CULTURES to be defined */
  function waitAndApply(attempts) {
    if (typeof STARS === 'undefined' || typeof CULTURES === 'undefined') {
      if (attempts < 40) setTimeout(() => waitAndApply(attempts + 1), 100);
      return;
    }
    _applyExtensions();
  }

  function _applyExtensions() {
    /* ── Star patches ── */
    if (EXT.starPatches) {
      Object.entries(EXT.starPatches).forEach(([id, patch]) => {
        const star = STARS.find(s => s.id === id);
        if (!star) return;
        Object.assign(star, patch);
        /* Also update STAR_MAP if it exists */
        if (typeof STAR_MAP !== 'undefined' && STAR_MAP[id]) Object.assign(STAR_MAP[id], patch);
      });
      console.log(`[IKE] Applied ${Object.keys(EXT.starPatches).length} star patches`);
    }

    /* ── Formation patches ── */
    if (EXT.formationPatches) {
      let patched = 0;
      Object.entries(CULTURES).forEach(([cultId, cult]) => {
        (cult.formations || []).forEach(f => {
          const patch = EXT.formationPatches[f.id];
          if (patch) { Object.assign(f, patch); patched++; }
        });
      });
      console.log(`[IKE] Applied ${patched} formation patches`);
    }

    /* ── Planet patches ── */
    if (EXT.planetPatches && typeof PLANETS !== 'undefined') {
      Object.entries(EXT.planetPatches).forEach(([id, patch]) => {
        const planet = PLANETS.find(p => p.id === id);
        if (planet) Object.assign(planet, patch);
      });
      console.log(`[IKE] Applied ${Object.keys(EXT.planetPatches).length} planet patches`);
    }

    /* ── New formations ── */
    if (EXT.newFormations) {
      Object.entries(EXT.newFormations).forEach(([cultId, formations]) => {
        const cult = CULTURES[cultId];
        if (!cult || !Array.isArray(formations)) return;
        formations.forEach(f => {
          if (!cult.formations.find(ex => ex.id === f.id)) {
            cult.formations.push(f);
          }
        });
      });
      console.log(`[IKE] Injected new formations`);
    }

    console.log('[IKE] Cultural extensions applied ✓');
  }

  waitAndApply(0);
})();