export type Skill = {
  slug: string;
  name: string;
  summary: string;
  whyItMatters: string;
  howToImprove: string[];
  weeklyPlan: string[];
  video: {
    youtubeId: string;
    title: string;
  };
};

export type Sport = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  image: string;
  imageAlt: string;
  skills: Skill[];
};

export const sports: Sport[] = [
  {
    slug: "hockey",
    name: "Hockey",
    tagline: "Edges, engine, hands, and decisions under pressure.",
    description:
      "Elite hockey players win with skating first, then layer strength, puck control, and hockey sense. Train these four pillars and every shift gets faster and cleaner.",
    accent: "#3ec7ff",
    image:
      "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Hockey player skating with the puck",
    skills: [
      {
        slug: "skating",
        name: "Skating",
        summary:
          "Your edges are your engine. Strong skating creates separation, recovers defense, and turns average plays into scoring chances.",
        whyItMatters:
          "Most games are won between the dots and along the walls. Players who own inside and outside edges can escape pressure, close gaps, and finish plays at game speed.",
        howToImprove: [
          "Practice edge holds daily: inside circles, outside circles, and power pulls at a controlled pace before adding speed.",
          "Film your stride once a week. Look for knee bend, full extension, and a quiet upper body.",
          "Add transition work—forward to backward, mohawks, and stops—so you can change direction without losing ice.",
          "Finish every skating session with game-speed reps: escapes from the corner, blue-line gap closes, and net-front pivots.",
        ],
        weeklyPlan: [
          "2 edge-quality sessions (20–25 min)",
          "1 transition and stopping session",
          "1 game-speed skating circuit after practice",
        ],
        video: {
          youtubeId: "pp0Y3BDDp4A",
          title: "Edge Work Drills — Level 1 to 100",
        },
      },
      {
        slug: "strength-and-athleticism",
        name: "Strength and Athleticism",
        summary:
          "Hockey strength is about powerful hips, stable core, and resilient legs that survive board battles and late-period shifts.",
        whyItMatters:
          "Stronger athletes win puck battles, absorb contact, and keep skating quality high when fatigue hits. Athleticism turns technique into dominance.",
        howToImprove: [
          "Build lower-body power with squats, Romanian deadlifts, lateral lunges, and sled pushes twice a week.",
          "Train single-leg balance and hip control—Bulgarian splits, lateral bounds, and skate jumps.",
          "Add rotational core work so you can shoot, protect the puck, and win body position.",
          "Include short acceleration work (10–20 yards) and mobility for hips and ankles so strength shows up on ice.",
        ],
        weeklyPlan: [
          "2 full-body strength sessions",
          "1 power / plyometric session",
          "Daily 8-minute hip and ankle mobility",
        ],
        video: {
          youtubeId: "eB6RBnIKbus",
          title: "Hockey Dryland Strength Training",
        },
      },
      {
        slug: "puck-skills",
        name: "Puck Skills",
        summary:
          "Hands that stay quiet under pressure. Soft receptions, deceptive stickhandling, and release variety separate shooters from finishers.",
        whyItMatters:
          "Great skaters still need to make plays in traffic. Puck skills let you collect bad passes, beat the first defender, and create a clean shooting window.",
        howToImprove: [
          "Do 10–15 minutes of daily stickhandling: wide soft touches, tight toe drags, and head-up patterns.",
          "Practice receiving passes in motion—forehand, backhand, and off the boards—before you shoot.",
          "Build a release toolkit: snap, wrist, and quick one-timers from different foot positions.",
          "Train under constraints: small spaces, active sticks, and timed reps so skills transfer to games.",
        ],
        weeklyPlan: [
          "Daily 12-minute stickhandle block",
          "2 passing/receiving sessions",
          "2 shooting sessions with intentional footwork",
        ],
        video: {
          youtubeId: "9HPGL1A2oZ0",
          title: "Hockey Stickhandling and Puck Skill Drills",
        },
      },
      {
        slug: "iq",
        name: "IQ",
        summary:
          "Hockey IQ is anticipation: reading pressure, supporting the puck, and choosing the next play before you get the puck.",
        whyItMatters:
          "Smart players look faster than they are. Good decisions reduce turnovers, create odd-man rushes, and keep your team structured without the puck.",
        howToImprove: [
          "Watch one full period weekly with a notebook: mark F1/F2/F3 roles, gap control, and support angles.",
          "Before every shift, set one defensive and one offensive cue (for example: “early stick on entry” and “net-front first”).",
          "Practice exit and entry options in small-area games so decisions become automatic.",
          "Ask coaches for one film clip after each game focused on your decision, not just the result.",
        ],
        weeklyPlan: [
          "1 film study session (20–30 min)",
          "2 small-area games with decision goals",
          "Post-game reflection: 3 good reads, 1 fix",
        ],
        video: {
          youtubeId: "xyRm_WmSh_w",
          title: "Hockey IQ and Systems Thinking",
        },
      },
    ],
  },
  {
    slug: "baseball",
    name: "Baseball",
    tagline: "See it, hit it, throw it hard, and think one pitch ahead.",
    description:
      "Baseball rewards precision. These four skills cover the bat, the arm, the athletic engine, and the mental game that wins counts and innings.",
    accent: "#ef4444",
    image:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Baseball batter waiting for a pitch",
    skills: [
      {
        slug: "hitting",
        name: "Hitting",
        summary:
          "Consistent hitters control posture, timing, and barrel path—then hunt pitches they can drive.",
        whyItMatters:
          "Hitting is the hardest skill in sports. A repeatable swing and smart pitch selection raise average, power, and confidence in every at-bat.",
        howToImprove: [
          "Build a daily tee and front-toss routine focused on balance, stride timing, and barrel through the zone.",
          "Track pitch recognition: take notes on what you swing at early vs. late in counts.",
          "Use intent rounds—line drives, opposite field, and pull-side—so your swing stays adaptable.",
          "Film swings weekly from the side and open side to check head stillness and hip-shoulder separation.",
        ],
        weeklyPlan: [
          "4 short barrel-path sessions (15–20 min)",
          "2 live or machine BP rounds with a plan",
          "1 film + pitch-selection review",
        ],
        video: {
          youtubeId: "keVyBnlHqCo",
          title: "Baseball Hitting Mechanics Tutorial",
        },
      },
      {
        slug: "throwing",
        name: "Throwing",
        summary:
          "Clean arm action, strong lower half, and accurate footwork turn raw arm strength into outs.",
        whyItMatters:
          "Whether you pitch or play the field, throws that are on time and on target win games. Mechanics protect your arm and raise velocity with less stress.",
        howToImprove: [
          "Warm up with long-toss progressions and band work before max-effort throws.",
          "Groove lower-half sequencing: stride direction, hip rotation, and front-side firmness.",
          "Practice position-specific footwork—double plays, crow hops, catcher transfers—every week.",
          "Keep an arm-care plan: scap strength, rotator cuff, and recovery days after high-volume throwing.",
        ],
        weeklyPlan: [
          "3 structured throwing sessions",
          "2 arm-care / scap sessions",
          "1 accuracy circuit (targets + game transfers)",
        ],
        video: {
          youtubeId: "NIgBj2JhEEM",
          title: "Baseball Throwing Mechanics",
        },
      },
      {
        slug: "strength-and-explosiveness",
        name: "Strength and Explosiveness",
        summary:
          "Baseball power comes from ground force and fast hips—not just bigger arms.",
        whyItMatters:
          "Explosiveness shows up in exit velocity, first-step range, and pitching force. Strong athletes recover better across a long season.",
        howToImprove: [
          "Train trap bar deadlifts, rear-foot elevated splits, and rotational med-ball throws.",
          "Add sprint starts and lateral first-step drills for infield/outfield range.",
          "Use jump variations (broad, bound, rotational) that transfer to swinging and throwing.",
          "Prioritize mobility in hips and T-spine so power can travel through the kinetic chain.",
        ],
        weeklyPlan: [
          "2 strength sessions",
          "1 speed / plyometric session",
          "Mobility finisher after every lift",
        ],
        video: {
          youtubeId: "icUZHrYMaNI",
          title: "Baseball Explosiveness Training",
        },
      },
      {
        slug: "iq",
        name: "IQ",
        summary:
          "Baseball IQ is situational awareness: knowing the count, the runner, the defense, and the next pitch.",
        whyItMatters:
          "Smart players manufacture runs and prevent them. IQ turns physical tools into winning baseball decisions.",
        howToImprove: [
          "Study count leverage: what pitchers throw when ahead vs. behind.",
          "Before each at-bat, set a plan—hunt zone early, expand late only with two strikes.",
          "On defense, pre-pitch: know where to throw and how the lineup hits.",
          "Review one inning of film weekly focused on decisions, not just outcomes.",
        ],
        weeklyPlan: [
          "1 situational IQ whiteboard session",
          "Pre-pitch checklist every defensive rep",
          "Weekly film of 5 at-bats or 1 defensive inning",
        ],
        video: {
          youtubeId: "_3yNSErprac",
          title: "Baseball Situational IQ",
        },
      },
    ],
  },
  {
    slug: "soccer",
    name: "Soccer",
    tagline: "Touch, tempo, vision, and decisions that unlock the game.",
    description:
      "Modern soccer rewards players who can manipulate the ball, explode into space, scan constantly, and choose the right action under pressure.",
    accent: "#22c55e",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Soccer player dribbling on a green pitch",
    skills: [
      {
        slug: "ball-mastery",
        name: "Ball Mastery",
        summary:
          "First touch and close control are the foundation for everything else on the pitch.",
        whyItMatters:
          "If the ball sticks to your feet, you can play faster, escape pressure, and create advantages in tight spaces.",
        howToImprove: [
          "Do 10 minutes of daily sole rolls, inside-outside touches, V-pulls, and L-turns with both feet.",
          "Add wall passes and receive-on-the-move so first touch sets your next action.",
          "Practice turns under pressure—Cruyff, inside cut, outside escape—at game tempo.",
          "Finish mastery work with a small-sided constraint (one-touch, weak foot only) to force transfer.",
        ],
        weeklyPlan: [
          "Daily 10-minute mastery block",
          "3 receiving/turning sessions",
          "2 small-sided games with a touch goal",
        ],
        video: {
          youtubeId: "uBgZvWDG9yA",
          title: "Soccer Ball Mastery Drills",
        },
      },
      {
        slug: "speed-and-agility",
        name: "Speed and Agility",
        summary:
          "Soccer speed is multi-directional: acceleration, deceleration, and sharp cuts with the ball nearby.",
        whyItMatters:
          "Beating a defender to a loose ball or arriving first into the box changes games. Agility keeps you effective for 90 minutes.",
        howToImprove: [
          "Train short accelerations (5–20 meters) and curved runs that mimic attacking patterns.",
          "Use ladder, hurdle, and cone COD work tied to a soccer action—receive, turn, explode.",
          "Practice deceleration: plant, drop center of mass, and re-accelerate the other way.",
          "Include ball-carrying speed so athleticism connects to dribbling and pressing.",
        ],
        weeklyPlan: [
          "2 speed sessions",
          "1 agility / COD session",
          "1 ball-speed circuit",
        ],
        video: {
          youtubeId: "9Mh8tPajqWM",
          title: "Soccer Speed and Agility Ladder Drills",
        },
      },
      {
        slug: "scanning-and-vision",
        name: "Scanning and Vision",
        summary:
          "Scanning before you receive is how elite players play with time they create themselves.",
        whyItMatters:
          "Players who check shoulders see presses early, find free teammates, and avoid turnovers that start counters.",
        howToImprove: [
          "Count scans in training: look before the pass arrives, then play.",
          "Use color/number callouts while juggling or receiving to force eyes up.",
          "In rondo, set a rule: no touch until you have checked both sides.",
          "Watch your own film and mark every moment you receive blind vs. after a scan.",
        ],
        weeklyPlan: [
          "Scanning cue in every technical session",
          "2 rondo games with scan rules",
          "1 film clip review on receiving habits",
        ],
        video: {
          youtubeId: "rhSxSFtyw0A",
          title: "Soccer Scanning and Vision Training",
        },
      },
      {
        slug: "iq",
        name: "IQ",
        summary:
          "Soccer IQ is knowing when to keep, when to progress, and when to reset the attack.",
        whyItMatters:
          "Technical players without IQ force plays. High-IQ players raise the whole team’s tempo and shape.",
        howToImprove: [
          "Study positional responsibilities in and out of possession for your role.",
          "After each match, list three decisions you would change and why.",
          "Play small-sided games with constraints that reward switch of play and third-man runs.",
          "Learn pressing triggers: when to jump, when to hold, and how to cover.",
        ],
        weeklyPlan: [
          "1 tactics / film session",
          "2 constraint-based small-sided games",
          "Match reflection journal",
        ],
        video: {
          youtubeId: "IM9BdqJWerM",
          title: "Soccer Game IQ and Decision Making",
        },
      },
    ],
  },
  {
    slug: "football",
    name: "Football",
    tagline: "Power the body, sharpen the mind, tackle clean, and own the ball.",
    description:
      "Football excellence stacks athletic power with scheme knowledge, reliable tackling, and position-specific ball skills.",
    accent: "#f59e0b",
    image:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "American football helmet on the field",
    skills: [
      {
        slug: "strength-speed-and-power",
        name: "Strength, Speed, and Power",
        summary:
          "Football is a collision sport won by athletes who can produce force fast and repeatedly.",
        whyItMatters:
          "Speed creates separation. Power wins trenches and open-field contact. Strength keeps you healthy across a season.",
        howToImprove: [
          "Train squat, hinge, press, and pull patterns with progressive overload.",
          "Sprint weekly with full recovery—acceleration and max velocity both matter.",
          "Add med-ball throws, jumps, and resisted sprints for power transfer.",
          "Recover intentionally: sleep, hydration, and soft-tissue work after high contact days.",
        ],
        weeklyPlan: [
          "3 strength sessions",
          "2 speed sessions",
          "1 power / plyometric session",
        ],
        video: {
          youtubeId: "U6BYa2CYd2o",
          title: "Football Combine Speed and Power Training",
        },
      },
      {
        slug: "iq",
        name: "IQ",
        summary:
          "Football IQ is recognizing formations, keys, and adjustments before the snap and after the play starts.",
        whyItMatters:
          "The right call beats the wrong athletic guess. Scheme knowledge multiplies every physical tool you have.",
        howToImprove: [
          "Master your playbook install—alignments, assignments, and checks—before adding extras.",
          "Watch opponent film for tendencies: formation tells, motion habits, and down-and-distance patterns.",
          "Quiz yourself: if the ball is snapped now, what is my first three steps?",
          "Communicate loudly in practice so IQ becomes team-wide, not private.",
        ],
        weeklyPlan: [
          "Daily 15-minute install / call review",
          "2 film sessions",
          "1 walkthrough with verbal checks",
        ],
        video: {
          youtubeId: "_T9lWFdBCrY",
          title: "Football IQ Film Study",
        },
      },
      {
        slug: "position-and-tackling-technique",
        name: "Position and Tackling Technique",
        summary:
          "Safe, effective tackling starts with angles, leverage, and finishing through contact—not launching.",
        whyItMatters:
          "Missed tackles give up explosives. Sound technique protects teammates, wins field position, and keeps you in the game.",
        howToImprove: [
          "Drill near-foot, near-shoulder fit and head-up contact every week.",
          "Practice pursuit angles and breakdown before contact so you don’t overshoot.",
          "Use bag and partner progressions before live tackling.",
          "Study form-tackle film of yourself—track footwork into contact, not just the wrap.",
        ],
        weeklyPlan: [
          "2 technique tackling sessions",
          "1 pursuit / angle day",
          "Weekly form checklist with a coach or teammate",
        ],
        video: {
          youtubeId: "_JvV3GgYqUE",
          title: "Football Tackling Technique Fundamentals",
        },
      },
      {
        slug: "ball-skills",
        name: "Ball Skills",
        summary:
          "Catching, securing, throwing, and ball security are position tools every football player needs.",
        whyItMatters:
          "Offense scores with clean hands and vision. Defense creates turnovers with punch, strip, and interception habits.",
        howToImprove: [
          "Receivers and backs: high-rep route stems, tracking deep balls, and contested catch work.",
          "Quarterbacks: footwork to throw, progression reads, and rapid catch-to-throw drills.",
          "All skill players: ball security through contact—high and tight, three points of pressure.",
          "Defensive backs/linebackers: tip drills, interception finishes, and strip timing.",
        ],
        weeklyPlan: [
          "3 position ball-skill sessions",
          "Daily ball-security reps in contact circuits",
          "1 contested / turnover circuit",
        ],
        video: {
          youtubeId: "x8a0BEfuhxs",
          title: "Football Ball Skills Training",
        },
      },
    ],
  },
  {
    slug: "lacrosse",
    name: "Lacrosse",
    tagline: "Stick, dodge, think, and move like an athlete.",
    description:
      "Lacrosse blends stick craft with athletic footwork. Train these four skills to dominate ground balls, finishing, and decision-making.",
    accent: "#a3e635",
    image:
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Athletes training on a sports field",
    skills: [
      {
        slug: "stick-skills",
        name: "Stick Skills",
        summary:
          "Cradling, passing, and catching with both hands are non-negotiable for every lacrosse athlete.",
        whyItMatters:
          "Strong stick work lets you play under pressure, switch hands, and keep possession when the ride or slide arrives.",
        howToImprove: [
          "Wall-ball daily: quick sticks, catch-and-cradle, weak-hand emphasis.",
          "Practice freestyle cradling while jogging and changing direction.",
          "Add partner passing on the move—over the shoulder, bounce, and skip passes.",
          "Film your hands: soft top hand, controlled bottom hand, and eyes up.",
        ],
        weeklyPlan: [
          "Daily 15-minute wall-ball",
          "3 on-field passing sessions",
          "Weak-hand focus every other day",
        ],
        video: {
          youtubeId: "GpP5_tyHQLA",
          title: "Lacrosse Stick Skills Drills",
        },
      },
      {
        slug: "dodging-shooting-ground-balls",
        name: "Dodging, Shooting, Ground Balls",
        summary:
          "The scoring triad: beat a defender, finish on the run, and win the 50/50s that start possessions.",
        whyItMatters:
          "Most goals come from won ground balls and decisive dodges into a high-percentage shot. These skills create offense.",
        howToImprove: [
          "Build a dodge menu: split, roll, face—each with a clear exit to shoot or feed.",
          "Shoot on the run from multiple angles; prioritize accuracy before power.",
          "Treat every ground ball as a sprint: approach, box out, and get two hands on it.",
          "Compete in GB drills and 1v1 dodge live reps weekly.",
        ],
        weeklyPlan: [
          "2 dodge sessions",
          "2 shooting sessions",
          "2 competitive ground-ball battles",
        ],
        video: {
          youtubeId: "GHBGvr-iMuo",
          title: "Lacrosse Ground Balls and Shooting",
        },
      },
      {
        slug: "iq",
        name: "IQ",
        summary:
          "Lacrosse IQ means reading slides, spacing the offense, and knowing when to dodge vs. move the ball.",
        whyItMatters:
          "Helter-skelter play turns into turnovers. High-IQ players create 2v1s and help defense before help arrives.",
        howToImprove: [
          "Learn slide packages and offensive clears for your team system.",
          "Watch film for early cues: adjacent defenders, crease help, and skip-lane openings.",
          "In practice, call out slides and cuts so recognition becomes verbal and visual.",
          "Set a possession rule: two extra passes after a dodge draws help.",
        ],
        weeklyPlan: [
          "1 film / tactics session",
          "Walkthrough of slides and clears",
          "Game reflection: 3 reads to keep",
        ],
        video: {
          youtubeId: "X7ZwwwqASnc",
          title: "Lacrosse IQ Concepts",
        },
      },
      {
        slug: "footwork-and-athleticism",
        name: "Footwork and Athleticism",
        summary:
          "Footwork drives dodges, defense, and recovery. Athleticism keeps stick skills available at full speed.",
        whyItMatters:
          "A sticky stick with slow feet gets ridden off. Athletic footwork creates angles for both offense and defense.",
        howToImprove: [
          "Train shuffle-to-sprint, drop-step, and mirror drills for defense.",
          "Add plyometrics and change-of-direction that mimic dodge plants.",
          "Strengthen hips, calves, and core for balanced athletic posture.",
          "Do stick-in-hand footwork so coordination transfers to games.",
        ],
        weeklyPlan: [
          "2 footwork sessions with stick",
          "2 athletic development sessions",
          "Mobility for hips and ankles daily",
        ],
        video: {
          youtubeId: "c5cgd8zjUuU",
          title: "Lacrosse Footwork and Athleticism",
        },
      },
    ],
  },
  {
    slug: "golf",
    name: "Golf",
    tagline: "Own the swing, strike it pure, score around the greens, manage the course.",
    description:
      "Golf improvement is process-driven. These four skills cover the full game from tee to green—and the decisions that lower scores.",
    accent: "#14b8a6",
    image:
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Golfer swinging on a fairway",
    skills: [
      {
        slug: "swing-mechanics",
        name: "Swing Mechanics",
        summary:
          "A reliable swing sequence—setup, turn, transition, and finish—creates repeatable contact.",
        whyItMatters:
          "Mechanics that hold under pressure mean fewer big misses and more fairways and greens in regulation.",
        howToImprove: [
          "Lock in setup basics: grip, posture, alignment, and ball position for each club.",
          "Train the backswing turn and weight shift with slow-motion reps before speeding up.",
          "Use alignment sticks and mirror checks to keep plane and path honest.",
          "Work with one swing feel at a time—don’t stack five swing thoughts.",
        ],
        weeklyPlan: [
          "2 technical range sessions",
          "Daily 10 slow-motion swings at home",
          "1 video check of setup and finish",
        ],
        video: {
          youtubeId: "me5gjIUe1Ks",
          title: "Golf Swing Mechanics Basics",
        },
      },
      {
        slug: "ball-striking",
        name: "Ball Striking",
        summary:
          "Ball striking is centered contact and controlling low point—especially with irons and wedges.",
        whyItMatters:
          "Pure strikes control distance and spin. Better contact immediately drops scores even before the swing looks perfect.",
        howToImprove: [
          "Practice half-swings that brush the turf after the ball.",
          "Use impact tape or foot spray to map strike location on the face.",
          "Hit to specific carry numbers, not just “flush feels.”",
          "Mix clubs every few balls so you learn real distance control.",
        ],
        weeklyPlan: [
          "2 ball-striking range sessions",
          "1 distance-control ladder with wedges",
          "Track centered contact percentage",
        ],
        video: {
          youtubeId: "qdRSOKvjNZU",
          title: "Golf Iron Ball Striking",
        },
      },
      {
        slug: "putting-and-chipping",
        name: "Putting and Chipping",
        summary:
          "Short game is where scores are saved. Speed control and predictable contact beat fancy technique.",
        whyItMatters:
          "Most strokes happen inside 100 yards. Strong putting and chipping turn bogeys into pars and pars into birdie looks.",
        howToImprove: [
          "Build a putting routine: read, aim, stroke, hold finish.",
          "Practice lag putting to a 3-foot circle before short make drills.",
          "Chip with one stock shot first—landing spot focus—then add loft options.",
          "Play up-and-down games from different lies every practice.",
        ],
        weeklyPlan: [
          "3 short-game sessions",
          "Daily 10-minute putting speed work",
          "1 pressure make drill (make 10 from 4–6 ft)",
        ],
        video: {
          youtubeId: "DLbq1SQA_6k",
          title: "Golf Putting and Chipping Fundamentals",
        },
      },
      {
        slug: "course-management",
        name: "Course Management",
        summary:
          "Course management is choosing targets, clubs, and misses that fit your game—not the highlight reel.",
        whyItMatters:
          "Smart golf eliminates blow-up holes. Strategy multiplies every technical skill you train.",
        howToImprove: [
          "Pick conservative centers of greens when pins are tucked.",
          "Know your real stock distances—not your best-ever carry.",
          "Plan the hole backward: where do you want to approach from?",
          "After rounds, mark decisions that cost strokes, not just bad swings.",
        ],
        weeklyPlan: [
          "Pre-round target plan for each hole",
          "Post-round decision journal",
          "1 practice round focused only on strategy",
        ],
        video: {
          youtubeId: "b5Qh9QHv1d0",
          title: "Golf Course Management Strategy",
        },
      },
    ],
  },
  {
    slug: "basketball",
    name: "Basketball",
    tagline: "Handle, explode, read the floor, and move without the ball.",
    description:
      "Basketball growth stacks ball skills with athleticism, decision-making, and intelligent off-ball movement that creates easy offense.",
    accent: "#fb923c",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Basketball going through a hoop",
    skills: [
      {
        slug: "ball-skills",
        name: "Ball Skills",
        summary:
          "Handles, passing, and finishing with both hands let you pressure the defense every possession.",
        whyItMatters:
          "Strong ball skills create advantages off the dribble and keep turnovers down against pressure.",
        howToImprove: [
          "Daily pound dribbles, two-ball work, and change-of-pace moves with eyes up.",
          "Practice live reads off a chair or defender—don’t script every move.",
          "Finish through contact at the rim with both hands and multiple angles.",
          "Add weak-hand form finishing and pocket passing under fatigue.",
        ],
        weeklyPlan: [
          "Daily 15-minute handle block",
          "3 finishing sessions",
          "2 live 1v1 decision drills",
        ],
        video: {
          youtubeId: "kRtctFcZaCI",
          title: "Basketball Ball Handling Drills",
        },
      },
      {
        slug: "athleticism",
        name: "Athleticism",
        summary:
          "Vertical force, lateral quickness, and conditioning that holds up in the fourth quarter.",
        whyItMatters:
          "Athleticism wins rebounds, contests shots, and lets skill show up late when games are decided.",
        howToImprove: [
          "Train jumps, bounds, and approach work for vertical power.",
          "Add lateral slides, closeouts, and short accelerations for defense.",
          "Build strength in legs, hips, and core to protect landings.",
          "Condition with basketball-specific intervals, not only long runs.",
        ],
        weeklyPlan: [
          "2 athletic development sessions",
          "2 strength sessions",
          "1 conditioning circuit tied to court work",
        ],
        video: {
          youtubeId: "5bvqJ1G6hV8",
          title: "Basketball Athleticism and Vertical Training",
        },
      },
      {
        slug: "iq",
        name: "IQ",
        summary:
          "Basketball IQ is reading help, timing advantages, and knowing the right pass one beat early.",
        whyItMatters:
          "High-IQ players raise teammates. They take good shots, make early hits, and defend with anticipation.",
        howToImprove: [
          "Study spacing and help principles for your offense and defense.",
          "Watch film of your decision tree: drive, kick, pull-up, or reset.",
          "Play advantage games (2v1, 3v2) to train early reads.",
          "Communicate coverages and switches every possession in practice.",
        ],
        weeklyPlan: [
          "1 film session",
          "2 advantage-read games",
          "Daily verbal coverage cues in scrimmage",
        ],
        video: {
          youtubeId: "j16FCb3BbDs",
          title: "Basketball IQ and Decision Making",
        },
      },
      {
        slug: "off-ball-movement",
        name: "Off Ball Movement",
        summary:
          "Cutting, screening, relocating, and spacing turn teammates’ gravity into open looks.",
        whyItMatters:
          "Most points come from players who move without the ball. Great movers are always open or getting someone else open.",
        howToImprove: [
          "Practice basket cuts, backdoor reads, and flare relocations after every pass.",
          "Learn to set and use screens—angle, contact, and sprint out of the screen.",
          "Space intentionally: if a teammate drives, lift or sink on purpose.",
          "Film yourself away from the ball for a full quarter and grade activity.",
        ],
        weeklyPlan: [
          "2 cutting/screening sessions",
          "Spacing rules in every scrimmage",
          "1 off-ball film review",
        ],
        video: {
          youtubeId: "aQdfHAlyPKI",
          title: "Basketball Off-Ball Movement and Cutting",
        },
      },
    ],
  },
];

export function getSport(slug: string) {
  return sports.find((sport) => sport.slug === slug);
}

export function getSkill(sportSlug: string, skillSlug: string) {
  const sport = getSport(sportSlug);
  if (!sport) return undefined;
  const skill = sport.skills.find((item) => item.slug === skillSlug);
  if (!skill) return undefined;
  return { sport, skill };
}
