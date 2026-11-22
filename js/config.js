/* =========================================================================
   PYN VISUALS — SITE CONTENT
   -------------------------------------------------------------------------
   This is the main file to edit. Contact details, the logo, the inquiry
   form connection, services, and every portfolio item live here.
   Save the file and refresh the browser to see changes.
   ========================================================================= */

window.PYN = {
  /* ---------------------------------------------------------------------
     BUSINESS DETAILS (used in the header, footer, contact page, etc.)
     --------------------------------------------------------------------- */
  business: {
    name: "Pyn Visuals",
    city: "Kennewick",
    state: "WA",
    stateLong: "Washington",
    region: "Tri-Cities",
    phoneDisplay: "509-572-7469",
    phoneHref: "+15095727469", // used for tap-to-call / text links
    instagramUrl: "https://www.instagram.com/pynvisuals/",
    instagramHandle: "@pynvisuals",
  },

  /* ---------------------------------------------------------------------
     LOGO
     The ink-black "PV" mark, shown on the warm-white header as-is.
     pyn-visuals-logo-ink.png is your original logo with only the white
     background made transparent and trimmed (the original is kept next
     to it as pyn-visuals-logo-original.jpg). If you get a vector (SVG)
     version, drop it in assets/brand/ and change `src`.
     Set src to "" to show only the text wordmark.
     --------------------------------------------------------------------- */
  logo: {
    src: "assets/brand/pyn-visuals-logo-ink.png",
    alt: "", // decorative: the name is shown as text beside it
    height: 26, // display height in pixels in the header
  },

  /* ---------------------------------------------------------------------
     INQUIRY FORM CONNECTION
     The site has no backend, so the form needs a form service to actually
     deliver messages to your inbox. Until `endpoint` is set, the form
     validates entries but DOES NOT send anything — visitors are told that
     clearly and offered your phone/Instagram instead.

     Easiest setup (free tiers available):
       1. Create a form at https://formspree.io (or a similar service that
          accepts a standard POST and returns JSON, e.g. Basin or Getform).
       2. Point it at the email address you want inquiries sent to.
       3. Paste the form URL below, e.g. "https://formspree.io/f/abcdwxyz".
     See README.md for details.
     --------------------------------------------------------------------- */
  inquiryForm: {
    endpoint: "https://formspree.io/f/mvkabpql",
  },

  /* ---------------------------------------------------------------------
     REVIEW FORM CONNECTION
     The "Leave a review" form (reviews.html) emails each review to you.
     Leave endpoint "" to use the same Formspree form as inquiries
     (reviews arrive with the subject "New review: …"). Nothing is
     posted on the site automatically — see REVIEWS below.
     --------------------------------------------------------------------- */
  reviewForm: {
    endpoint: "",
  },

  /* ---------------------------------------------------------------------
     REVIEWS (shown in the scrolling panel on Home and the Reviews page)
     When a review you want to show arrives by email, copy it in here.
     Only add reviews where the person ticked "OK to show on the site".
     Newest first. Fields:
       name:    as they want it shown, e.g. "Jordan M."
       org:     team, club, school, or business ("" to leave out)
       project: what you shot, e.g. "Lacrosse game coverage" ("" to leave out)
       rating:  1 to 5
       date:    "YYYY-MM" (shown as "Nov 2026")
       text:    the review itself

     Example (copy, paste between the [ ], and fill in):
       {
         name: "Jordan M.",
         org: "Tri-Cities Lacrosse Club",
         project: "Tournament or event coverage",
         rating: 5,
         date: "2026-11",
         text: "Paste their review here.",
       },
     While this list is empty, the panel invites visitors to leave the first review.
     --------------------------------------------------------------------- */
  reviews: [
  ],

  /* ---------------------------------------------------------------------
     HOME HERO
     image: shown immediately (keep it a compressed JPG/WebP ~300–600 KB).
     video: optional short, muted background loop (MP4, ideally < 8 MB).
            Leave "" for image only. The video is skipped for visitors who
            prefer reduced motion or are on data saver.
     focus: which part of the image stays in frame when it's cropped
            ("left/right% top/bottom%"), e.g. "50% 50%" is the center.
     placeholder: true shows a "Placeholder image" tag.
     --------------------------------------------------------------------- */
  hero: {
    image: "assets/images/hero/hero.jpg",
    video: "",
    alt: "Side profile of a lacrosse player in a white helmet under glowing stadium lights at night.",
    focus: "62% 35%",
    placeholder: false,
  },

  /* ---------------------------------------------------------------------
     PROJECT TYPES (options in the inquiry form's "Project type" menu)
     --------------------------------------------------------------------- */
  projectTypes: [
    { value: "lacrosse-game", label: "Lacrosse game coverage" },
    { value: "tournament", label: "Tournament or event coverage" },
    { value: "sports-other", label: "Other sports coverage" },
    { value: "highlights", label: "Player or team highlights" },
    { value: "business-promo", label: "Business promotional content" },
    { value: "social-video", label: "Social media video" },
    { value: "custom", label: "Custom photo / video project" },
    { value: "not-sure", label: "Not sure yet" },
  ],

  /* ---------------------------------------------------------------------
     SERVICES
     `projectType` pre-selects that option when someone clicks
     "Inquire about this" on the Services page.
     Keep descriptions free of prices, guaranteed deliverables, or
     turnaround times unless you want to publish them.
     --------------------------------------------------------------------- */
  services: [
    {
      id: "sports-coverage",
      title: "Sports & lacrosse coverage",
      summary:
        "Photo and video at games, tournaments, and events, built around the plays that decide them.",
      description:
        "Lacrosse is the main focus, and the same approach carries to other sports. Coverage can be photo, video, or both, and is shaped around your schedule, the venue, and how you plan to use the content.",
      fitFor: [
        "Single games and full tournament weekends",
        "Teams, clubs, school programs, and event organizers",
        "Families and athletes who want the game captured well",
      ],
      projectType: "lacrosse-game",
      image: "assets/images/portfolio/lacrosse-shot-on-goal.jpg",
      imageAlt: "Lacrosse player in a white number 17 jersey shooting toward the goal as defenders in red close in.",
    },
    {
      id: "highlights",
      title: "Player & team highlights",
      summary:
        "Highlight content that shows what a player or team can do, cut for recruiting, recaps, or social.",
      description:
        "Highlight projects can come from footage shot at your games or be planned as a dedicated session. Format, length, and style are worked out with you during the inquiry.",
      fitFor: [
        "Athletes putting together recruiting material",
        "Season or tournament recaps for a team",
        "Content for team and club social channels",
      ],
      projectType: "highlights",
      image: "assets/images/portfolio/player-highlight-golden-hour-thumb.jpg",
      imageAlt: "Lacrosse players in red and white jerseys on the field under an evening sky.",
    },
    {
      id: "business-content",
      title: "Business promo & social content",
      summary:
        "Photo and short-form video that shows what your business does and who's behind it.",
      description:
        "Promotional photos, brand videos, and social-first clips for local businesses and organizations. Content is planned around where it will live, whether that's your website, ads, or social feeds.",
      fitFor: [
        "Local businesses in the Tri-Cities and beyond",
        "Vertical video for Instagram, TikTok, and Reels",
        "Photos for websites, menus, listings, and promotions",
      ],
      projectType: "business-promo",
      image: "assets/images/portfolio/business-detailing-at-work.jpg",
      imageAlt: "Two detailers in branded hoodies working on a red car in a driveway.",
    },
    {
      id: "custom",
      title: "Custom photo & video projects",
      summary:
        "Something that doesn't fit a box? Share the idea and it can be scoped together.",
      description:
        "Events, portraits, creative concepts, and other projects are all welcome. Describe what you have in mind and the details get worked out from there.",
      fitFor: [
        "Events and one-off shoots",
        "Creative and passion projects",
        "Ideas that mix photo and video",
      ],
      projectType: "custom",
      image: "assets/images/portfolio/multnomah-falls-thumb.jpg",
      imageAlt: "A person standing in front of Multnomah Falls.",
    },
  ],

  /* ---------------------------------------------------------------------
     PORTFOLIO FILTERS
     `value` must match a category used in portfolio items below,
     except "all" (everything) and "video" (any item with type "video").
     --------------------------------------------------------------------- */
  portfolioFilters: [
    { value: "all", label: "All" },
    { value: "sports", label: "Sports" },
    { value: "lacrosse", label: "Lacrosse" },
    { value: "business", label: "Business" },
    { value: "creative", label: "Creative" },
    { value: "video", label: "Video" },
  ],

  /* ---------------------------------------------------------------------
     PORTFOLIO ITEMS
     To add your own work:
       1. Put the image in assets/images/portfolio/ (JPG or WebP,
          ~2000px on the long edge, compressed to roughly 200–500 KB).
       2. Copy one of the items below and change the fields.
       3. Delete the placeholder items once you have real ones.

     Fields:
       type:        "photo" or "video"
       categories:  any of "sports", "lacrosse", "business" (or new ones —
                    add a matching filter above)
       src:         the image (for videos, this is the thumbnail)
       alt:         describe what's in the image, for screen readers
       aspect:      "landscape" (3:2), "tall" (2:3), "portrait" (4:5),
                    "wide" (16:9), "square" (1:1), or "vertical" (9:16)
                    — controls the tile shape
       ratio:       optional exact shape instead of aspect, e.g. "2000 / 1237"
       categories tip: the first category other than "sports" is shown as
                    the label (e.g. ["travel", "creative"] shows "Travel"
                    but appears under the Creative filter)
       featured:    true to show it in "Selected work" on the home page
       placeholder: true shows a "Placeholder" tag; remove for real work
       video:       for video items, ONE of:
                      { youtube: "https://youtu.be/VIDEO_ID" }
                      { vimeo: "https://vimeo.com/123456789" }
                      { mp4: "assets/video/my-clip.mp4" }
                    leave as {} to show a "video coming soon" message
     --------------------------------------------------------------------- */
  portfolio: [
    {
      id: "team-trophy",
      title: "Trophy night",
      type: "photo",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/lacrosse-team-trophy.jpg",
      alt: "A lacrosse team in white and green uniforms gathered on the field under stadium lights, one player holding a trophy.",
      aspect: "landscape",
      featured: true,
    },
    {
      id: "under-the-moon",
      title: "Under the moon",
      type: "photo",
      categories: ["sports", "football"],
      src: "assets/images/portfolio/football-under-the-moon.jpg",
      alt: "A football player in red stands on the field beneath a bright stadium light, with the moon in the night sky.",
      aspect: "tall",
    },
    {
      id: "summer-tournament-clip",
      title: "Summer tournament clip",
      type: "video",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/summer-tournament-clip-thumb.jpg",
      alt: "Video thumbnail: a lacrosse attacker in teal shooting on a goalie in orange.",
      aspect: "square",
      video: { mp4: "assets/video/summer-tournament-clip.mp4" },
      featured: true,
    },
    {
      id: "detailing-at-work",
      title: "Mobile detailing, on the job",
      type: "photo",
      categories: ["business"],
      src: "assets/images/portfolio/business-detailing-at-work.jpg",
      alt: "Two detailers in branded hoodies working on a red car in a driveway.",
      aspect: "landscape",
      featured: true,
    },
    {
      id: "shot-on-goal",
      title: "Shot on goal",
      type: "photo",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/lacrosse-shot-on-goal.jpg",
      alt: "Lacrosse player in a white number 17 jersey shooting toward the goal as defenders in red close in.",
      aspect: "tall",
    },
    {
      id: "sideline-focus",
      title: "Sideline focus",
      type: "photo",
      categories: ["sports", "football"],
      src: "assets/images/portfolio/football-sideline-focus.jpg",
      alt: "A football player in a red number 5 jersey adjusts his helmet strap in front of the stands.",
      aspect: "tall",
    },
    {
      id: "under-the-lights",
      title: "Under the lights",
      type: "photo",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/lacrosse-under-the-lights.jpg",
      alt: "Side profile of a lacrosse player in a white helmet under glowing stadium lights at night.",
      aspect: "landscape",
    },
    {
      id: "field-portrait",
      title: "Golden field portrait",
      type: "photo",
      categories: ["portraits", "creative"],
      src: "assets/images/portfolio/creative-field-portrait.jpg",
      alt: "A woman in a white dress holding a green jacket stands in a sunlit field of tall grass.",
      aspect: "portrait",
    },
    {
      id: "boise-btb",
      title: "Behind-the-back x2, Boise",
      type: "video",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/boise-lacrosse-btb-thumb.jpg",
      alt: "Video thumbnail: lacrosse players battling in front of the goal on a sunny day.",
      aspect: "wide",
      video: { mp4: "assets/video/boise-lacrosse-btb.mp4" },
    },
    {
      id: "walk-off-sunset",
      title: "Walk-off at sunset",
      type: "photo",
      categories: ["sports"],
      src: "assets/images/portfolio/sports-walk-off-sunset.jpg",
      alt: "Players in red walk across a track toward the low sun, their long shadows stretching behind them.",
      aspect: "landscape",
    },
    {
      id: "night-portrait",
      title: "Night game portrait",
      type: "photo",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/lacrosse-night-portrait.jpg",
      alt: "Lacrosse player in a dark jersey standing alone under the lights with his stick raised.",
      aspect: "tall",
    },
    {
      id: "detailing-crew",
      title: "Detailing crew portrait",
      type: "photo",
      categories: ["business"],
      src: "assets/images/portfolio/business-detailing-crew.jpg",
      alt: "A detailer seen from behind in a black branded hoodie, standing in a driveway beside a truck.",
      aspect: "tall",
    },
    {
      id: "lacrosse-in-the-pines",
      title: "Lacrosse in the pines",
      type: "photo",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/lacrosse-in-the-pines.jpg",
      alt: "A lacrosse player in a white helmet and gold shorts walks across the grass in front of tall pine trees.",
      aspect: "tall",
    },
    {
      id: "sixes-league-week-2",
      title: "Sixes League, week 2",
      type: "video",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/sixes-league-week-2-thumb.jpg",
      alt: "Video thumbnail: lacrosse players and a team tent on a sunny turf field.",
      aspect: "wide",
      video: { mp4: "assets/video/sixes-league-week-2.mp4" },
    },
    {
      id: "ball-carrier-bw",
      title: "Ball carrier",
      type: "photo",
      categories: ["sports", "football"],
      src: "assets/images/portfolio/football-ball-carrier-bw.jpg",
      alt: "Black-and-white photo of a football ball carrier cutting past a defender in front of a packed crowd.",
      aspect: "tall",
    },
    {
      id: "car-feature",
      title: "Car feature, golden hour",
      type: "photo",
      categories: ["automotive", "creative"],
      src: "assets/images/portfolio/creative-car-feature.jpg",
      alt: "Three-image layout of a white sedan driving on country roads through golden fields at sunset.",
      aspect: "portrait",
    },
    {
      id: "black-and-white",
      title: "Light beam",
      type: "photo",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/lacrosse-black-and-white.jpg",
      alt: "Black-and-white photo of a lacrosse player in a mesh pinnie, with a beam of light cutting across the dark sky.",
      aspect: "tall",
    },
    {
      id: "player-highlight-golden-hour",
      title: "Player highlight, golden hour",
      type: "video",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/player-highlight-golden-hour-thumb.jpg",
      alt: "Video thumbnail: lacrosse players in red and white jerseys on the field under an evening sky.",
      aspect: "wide",
      video: { mp4: "assets/video/player-highlight-golden-hour.mp4" },
    },
    {
      id: "detailing-social-post",
      title: "Detailing social post",
      type: "photo",
      categories: ["business"],
      src: "assets/images/portfolio/business-detailing-social-post.jpg",
      alt: "Social media collage of a detailing crew cleaning a red SUV, including a steam cleaner and branded hoodies.",
      aspect: "portrait",
    },
    {
      id: "number-53-bw",
      title: "Number 53",
      type: "photo",
      categories: ["sports", "football"],
      src: "assets/images/portfolio/football-number-53-bw.jpg",
      alt: "Black-and-white portrait of a football player in a number 53 jersey and helmet.",
      aspect: "tall",
    },
    {
      id: "motion-study",
      title: "Motion study",
      type: "photo",
      categories: ["sports", "football"],
      src: "assets/images/portfolio/football-motion-study.jpg",
      alt: "Black-and-white motion-blurred image of a football player sprinting.",
      ratio: "2000 / 1237",
    },
    {
      id: "cinematic-game-edit",
      title: "Cinematic game edit",
      type: "video",
      categories: ["sports", "lacrosse"],
      src: "assets/images/portfolio/cinematic-game-edit-thumb.jpg",
      alt: "Video thumbnail: a lacrosse player in a purple number 13 jersey in front of the goal.",
      aspect: "square",
      video: { mp4: "assets/video/cinematic-game-edit.mp4" },
    },
    {
      id: "golden-hour-silhouette",
      title: "Golden hour silhouette",
      type: "photo",
      categories: ["creative"],
      src: "assets/images/portfolio/creative-golden-hour-silhouette.jpg",
      alt: "A person in silhouette stands by a window as the setting sun glows through sheer curtains.",
      aspect: "tall",
    },
    {
      id: "city-light-trails",
      title: "City light trails",
      type: "photo",
      categories: ["travel", "creative"],
      src: "assets/images/portfolio/creative-city-light-trails.jpg",
      alt: "Long-exposure night photo of traffic light trails on a city street lined with palm trees and tall buildings.",
      aspect: "tall",
    },
    {
      id: "multnomah-falls",
      title: "Multnomah Falls",
      type: "video",
      categories: ["travel", "creative"],
      src: "assets/images/portfolio/multnomah-falls-thumb.jpg",
      alt: "Video thumbnail: a person standing in front of Multnomah Falls.",
      aspect: "wide",
      video: { mp4: "assets/video/multnomah-falls.mp4" },
    },
  ],
};
