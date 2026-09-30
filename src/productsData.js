export const productsData = [
  {
    id: 1,
    name: "BladeBook Pro",
    category: "Laptops",
    price: 159999,
    image: "/bladebook.jpg",
    rating: 4.9,
    tag: "Flagship",
    description: "The ultimate developer and creator laptop. Powered by our custom chip, featuring a breathtaking 16-inch 120Hz mini-LED display and premium titanium alloy body.",
    colors: ["#1e293b", "#e2e8f0"],
    colorNames: ["Titanium Slate", "Titanium Silver"],
    options: [
      { name: "16GB RAM / 512GB SSD", priceModifier: 0 },
      { name: "32GB RAM / 1TB SSD", priceModifier: 25000 },
      { name: "64GB RAM / 2TB SSD", priceModifier: 60000 }
    ],
    specs: {
      "Processor": "Nexus M4 Ultra Octa-Core",
      "Graphics": "Integrated 40-Core GPU",
      "Memory": "Up to 64GB LPDDR5X",
      "Storage": "Up to 2TB PCIe 4.0 NVMe",
      "Display": "16.2\" Liquid Retina XDR (3456 x 2234), 120Hz",
      "Battery": "100 Wh (Up to 22 hours)",
      "Weight": "1.6 kg"
    },
    reviews: [
      { name: "Sarah K.", rating: 5, date: "2026-07-15", text: "This laptop is an absolute beast! The battery life easily lasts me through two full days of coding and compiling without plugging in. Worth every Rupee." },
      { name: "David M.", rating: 4, date: "2026-07-28", text: "Incredibly fast and premium build. The keyboard feels fantastic. Performance speaks for itself." }
    ]
  },
  {
    id: 2,
    name: "Nebula Flip 5G",
    category: "Mobile",
    price: 89999,
    image: "/nebula_flip.jpg",
    rating: 4.7,
    tag: "Foldable",
    description: "Redefining the smartphone experience. A pocket-sized powerhouse with a folding display, dynamic outer cover widgets, and a professional 200MP camera system.",
    colors: ["#581c87", "#0f172a", "#f472b6"],
    colorNames: ["Nebula Purple", "Obsidian Black", "Cosmic Pink"],
    options: [
      { name: "256GB Storage", priceModifier: 0 },
      { name: "512GB Storage", priceModifier: 12000 }
    ],
    specs: {
      "Processor": "Snapdragon 8 Gen 5 Elite",
      "Main Display": "6.9\" Dynamic AMOLED 2X, 120Hz Folding",
      "Cover Display": "3.4\" Super AMOLED, 60Hz",
      "Rear Camera": "200MP Wide + 50MP Ultra-Wide + 12MP Telephoto",
      "Front Camera": "32MP Selfie Camera",
      "Battery": "4400 mAh with 45W Fast Charging",
      "Weight": "185g"
    },
    reviews: [
      { name: "Elena R.", rating: 5, date: "2026-07-20", text: "The fold is barely visible and the phone is so compact in my pocket. The outer screen is super useful for quick notifications and taking selfies." }
    ]
  },
  {
    id: 3,
    name: "AeroWatch Active",
    category: "Wearables",
    price: 29999,
    image: "/aerowatch.jpg",
    rating: 4.8,
    tag: "New Arrival",
    description: "Your health, refined. AeroWatch tracks your vitals in real time using medical-grade sensors, encased in an aerospace titanium mesh strap with multi-day battery life.",
    colors: ["#1e293b", "#06b6d4", "#e11d48"],
    colorNames: ["Charcoal Mesh", "Cyan Active", "Crimson Sport"],
    options: [
      { name: "Standard Edition", priceModifier: 0 },
      { name: "LTE Cellular Edition", priceModifier: 7000 }
    ],
    specs: {
      "Material": "Aerospace-grade Titanium & Sapphire Glass",
      "Sensors": "ECG, SpO2, Heart Rate, Skin Temp, Sleep Tracker",
      "Water Resistance": "IP68 & 5ATM (up to 50m)",
      "Battery Life": "Up to 7 days (Smart Mode) / 24h (Always-On)",
      "Compatibility": "iOS & Android Companion Apps",
      "Weight": "42g (without strap)"
    },
    reviews: [
      { name: "Marcus T.", rating: 5, date: "2026-07-10", text: "Best fitness watch I've owned. The titanium strap looks extremely elegant, I wear it to formal events and gym workouts. Tracking is highly accurate." }
    ]
  },
  {
    id: 4,
    name: "HoloSound Studio",
    category: "Audio",
    price: 39999,
    image: "/holosound.jpg",
    rating: 4.9,
    tag: "Best Seller",
    description: "Unrivaled audiophile immersion. Featuring precision-crafted Walnut earcups, planar magnetic drivers, and hybrid ANC that blocks out the entire world.",
    colors: ["#7c2d12", "#0f172a"],
    colorNames: ["Walnut Classic", "Obsidian Black"],
    options: [
      { name: "Wired Planar", priceModifier: 0 },
      { name: "Wireless Hybrid ANC", priceModifier: 8000 }
    ],
    specs: {
      "Driver Type": "Planar Magnetic (50mm)",
      "Frequency Response": "5 Hz - 48 kHz",
      "Active Noise Cancelling": "Adaptive Hybrid ANC (Up to 45dB reduction)",
      "Connectivity": "Bluetooth 5.4 / 3.5mm Jack / USB-C Audio",
      "Battery Life": "Up to 50 hours (ANC Off) / 38 hours (ANC On)",
      "Weight": "320g"
    },
    reviews: [
      { name: "Julian V.", rating: 5, date: "2026-07-02", text: "The spatial staging on these is wider than any closed-back headphones I've tried. Walnut cups look breathtaking in person." }
    ]
  },
  {
    id: 5,
    name: "OmniReality V3",
    category: "Wearables",
    price: 109999,
    image: "/omnireality.jpg",
    rating: 4.6,
    tag: "Limited Edition",
    description: "Step into the next dimension. The OmniReality V3 offers dual 8K micro-OLED displays, advanced pass-through mixed reality, and fully integrated hand/eye-tracking.",
    colors: ["#0f172a"],
    colorNames: ["Obsidian Silver"],
    options: [
      { name: "128GB Standalone", priceModifier: 0 },
      { name: "256GB Creator Bundle", priceModifier: 18000 },
      { name: "512GB Ultra Developer", priceModifier: 35000 }
    ],
    specs: {
      "Display": "Dual Micro-OLED 8K (4K per eye), 90Hz/120Hz",
      "Field of View": "110 degrees",
      "Tracking": "6 DoF, Hand tracking, Eye tracking, Face tracking",
      "Passthrough": "Dual 16MP ultra-low latency color cameras",
      "Audio": "Integrated spatial 3D surround sound",
      "Weight": "450g"
    },
    reviews: [
      { name: "Aria L.", rating: 4, date: "2026-07-22", text: "The pass-through mixed reality is near perfect. Virtual screens look crisp enough to read fine code text. Headstrap is comfortable but a bit heavy after 2 hours." }
    ]
  },
  {
    id: 6,
    name: "PulseDeck Ultra 2",
    category: "Gaming",
    price: 64999,
    image: "/pulsedeck.jpg",
    rating: 4.9,
    tag: "Gaming Beast",
    description: "The ultimate handheld PC console. Features a 7-inch 144Hz HDR OLED display, custom AMD Ryzen Z2 Extreme processor, Hall Effect anti-drift analog sticks, and customizable RGB grips.",
    colors: ["#0f172a", "#06b6d4", "#c084fc"],
    colorNames: ["Cyber Stealth Black", "Neon Cyan", "Ultraviolet Purple"],
    options: [
      { name: "512GB NVMe SSD (16GB RAM)", priceModifier: 0 },
      { name: "1TB NVMe SSD (24GB RAM)", priceModifier: 12000 },
      { name: "2TB Pro Bundle with Dock", priceModifier: 24000 }
    ],
    specs: {
      "Processor": "AMD Ryzen Z2 Extreme 8C/16T, RDNA 3.5 Graphics",
      "Memory": "Up to 24GB LPDDR5X (7500 MT/s)",
      "Display": "7.0\" OLED HDR (1920x1080), 144Hz, 1000 nits peak",
      "Controls": "Hall Effect Joysticks & Triggers, Dual Trackpads, Gyro 6-Axis",
      "Storage": "Up to 2TB M.2 2230 PCIe 4.0 NVMe + MicroSD UHS-II",
      "Battery": "55 Wh (Up to 8 hours gaming)",
      "Weight": "610g"
    },
    reviews: [
      { name: "Rohan D.", rating: 5, date: "2026-08-01", text: "Plays Cyberpunk 2077 and AAA titles smoothly at 60+ FPS on high settings. The Hall Effect sticks feel ultra precise with zero stick drift." },
      { name: "Kunal S.", rating: 5, date: "2026-08-12", text: "The 144Hz OLED screen is unbelievable. Blacks are pure, colors pop, and the grip ergonomics are super comfortable for long sessions." }
    ]
  },
  {
    id: 7,
    name: "SkyDrone Apex 8K",
    category: "Drones",
    price: 124999,
    image: "/skydrone.jpg",
    rating: 4.8,
    tag: "8K Cinema",
    description: "Cinema-grade aerial intelligence. Equipped with a 3-axis stabilized 8K Hasselblad camera, 360-degree omnidirectional LiDAR obstacle avoidance, and 45 minutes of whisper-quiet flight time.",
    colors: ["#1e293b", "#e2e8f0"],
    colorNames: ["Carbon Black", "Aerospace White"],
    options: [
      { name: "Standard Fly More Kit", priceModifier: 0 },
      { name: "Cinematic Master Kit (3 Batteries + Pro Controller)", priceModifier: 28000 }
    ],
    specs: {
      "Camera": "8K Hasselblad 1-inch CMOS Sensor, RAW & 10-bit D-Log",
      "Flight Time": "Up to 45 minutes per battery",
      "Range": "20 km O4+ Ultra HD Video Transmission",
      "Obstacle Avoidance": "360° Omnidirectional LiDAR & Night Vision Vision Sensors",
      "Max Speed": "76 km/h (Sport Mode)",
      "Wind Resistance": "Level 6 (12 m/s)",
      "Weight": "595g"
    },
    reviews: [
      { name: "Vikram N.", rating: 5, date: "2026-07-29", text: "Shot an entire commercial video with this drone in 8K. The footage is crystal clear and LiDAR obstacle avoidance handled dense trees effortlessly." }
    ]
  },
  {
    id: 8,
    name: "AuraRing Horizon",
    category: "Wearables",
    price: 24999,
    image: "/auraring.jpg",
    rating: 4.9,
    tag: "Titanium Smart",
    description: "Discreet luxury meets clinical biometric tracking. Made of grade-5 aerospace titanium with seamless sapphire sensors monitoring circadian rhythm, sleep architecture, ECG, and stress.",
    colors: ["#94a3b8", "#1e293b", "#fbbf24"],
    colorNames: ["Titanium Silver", "Stealth Midnight", "18K Gold Inlay"],
    options: [
      { name: "Standard Finish (US 7-12)", priceModifier: 0 },
      { name: "Diamond-Like Carbon (DLC) Finish", priceModifier: 5000 }
    ],
    specs: {
      "Material": "Aerospace Grade 5 Titanium with Sapphire Inner Shell",
      "Sensors": "Optical PPG Heart Rate, Red/IR SpO2, Skin Temp, 3D Accelerometer",
      "Water Resistance": "100m (10 ATM Waterproof for swimming & diving)",
      "Battery Life": "Up to 8 days on a single 30-minute wireless charge",
      "Connectivity": "Bluetooth Low Energy 5.4 with encrypted syncing",
      "Weight": "Under 4 grams"
    },
    reviews: [
      { name: "Ananya M.", rating: 5, date: "2026-08-05", text: "Replaced my bulky smart watch with AuraRing. I don't feel it on my finger at all and the sleep analytics are astonishingly detailed." },
      { name: "Pooja V.", rating: 5, date: "2026-08-14", text: "The battery genuinely lasts over a week. The titanium finish has not scratched even once during weight training." }
    ]
  },
  {
    id: 9,
    name: "CyberBeam Lumina 4K",
    category: "Gadgets",
    price: 189999,
    image: "/cyberbeam.jpg",
    rating: 4.7,
    tag: "Tri-Laser",
    description: "Transform any wall into a 150-inch cinema. Ultra Short Throw pure RGB tri-laser technology delivering 3,500 ANSI lumens, Dolby Vision, and integrated 60W Harman Kardon acoustic soundbar.",
    colors: ["#0f172a", "#334155"],
    colorNames: ["Obsidian Slate", "Granite Grey"],
    options: [
      { name: "Projector Unit", priceModifier: 0 },
      { name: "Bundle with 120\" Ambient Light Rejecting Screen", priceModifier: 45000 }
    ],
    specs: {
      "Resolution": "True 4K UHD (3840 x 2160) with Dolby Vision & HDR10+",
      "Light Source": "ALPD 5.0 Triple Laser (3,500 ANSI Lumens)",
      "Throw Ratio": "0.19:1 Ultra Short Throw (150\" at only 20cm distance)",
      "Audio": "60W Harman Kardon Spatial Soundbar with Dolby Atmos",
      "Smart OS": "Google TV with native Netflix 4K certification & Wi-Fi 7",
      "Lifespan": "30,000+ Hours (Over 10 years of heavy use)"
    },
    reviews: [
      { name: "Aditya P.", rating: 5, date: "2026-07-18", text: "Turned our living room into a private IMAX cinema. The picture is super bright even during daylight hours with curtains open." }
    ]
  },
  {
    id: 10,
    name: "SoundSphere Spatial 360",
    category: "Audio",
    price: 34999,
    image: "/soundsphere.jpg",
    rating: 4.8,
    tag: "Audiophile",
    description: "Sculptural acoustics with levitating visualizer. Features 120W room-filling 360-degree high-resolution sound, active room acoustic calibration, and real-time ferrofluid holographic lighting.",
    colors: ["#0f172a", "#f1f5f9"],
    colorNames: ["Cosmic Onyx", "Lunar White"],
    options: [
      { name: "Single Sphere Speaker", priceModifier: 0 },
      { name: "Stereo Pair Duo (240W Room Setup)", priceModifier: 29000 }
    ],
    specs: {
      "Acoustic Power": "120W RMS (Dual Subwoofers + 4 Silk Dome Tweeters)",
      "Frequency Range": "28 Hz - 40 kHz Hi-Res Wireless Certified",
      "Spatial Audio": "Dolby Atmos & Sony 360 Reality Audio support",
      "Visualizer": "Ferrofluid Magnetic Core with dynamic RGB Spectrum Glow",
      "Connectivity": "Wi-Fi 7, AirPlay 2, Spotify Connect, Bluetooth 5.4, Optical, AUX",
      "Weight": "3.8 kg"
    },
    reviews: [
      { name: "Sameer T.", rating: 5, date: "2026-08-08", text: "The ferrofluid dancing to the bass beats inside the glass sphere is mesmerizing! The bass is deep, rich, and clean without distortion." }
    ]
  },
  {
    id: 11,
    name: "VoltMatrix Pro 240W",
    category: "Gadgets",
    price: 14999,
    image: "/voltmatrix.jpg",
    rating: 4.9,
    tag: "GaN Fast Charge",
    description: "The supreme charging command center. Transparent cyberpunk aesthetic packing 240W total output across 3x USB-C PD 3.1 ports, 1x USB-A port, with a real-time full color IPS telemetry screen.",
    colors: ["#0f172a"],
    colorNames: ["Cyberpunk Clear"],
    options: [
      { name: "240W Desktop Power Station", priceModifier: 0 },
      { name: "Bundle with 240W 2m Braided Silicone Cables (x3)", priceModifier: 2500 }
    ],
    specs: {
      "Total Power Output": "240W GaN III Fast Charging (PD 3.1 / PPS / QC 5.0)",
      "Single Port Max": "Up to 140W on USB-C1 (Charges BladeBook Pro to 50% in 25 mins)",
      "Display": "1.3\" IPS Color LCD showing Voltage, Amperage, Wattage per port",
      "Safety Protections": "Nexus ActiveShield 3.0 (Over-temp, Surge, Short-circuit protection)",
      "Ports": "3x USB-C (140W / 100W / 65W) + 1x USB-A (22.5W)",
      "Dimensions": "115 x 68 x 38 mm (Compact Travel Size)"
    },
    reviews: [
      { name: "Arjun B.", rating: 5, date: "2026-08-11", text: "Charges my laptop, tablet, phone, and watch simultaneously at full speed without heating up. The real-time wattage display is extremely handy." }
    ]
  },
  {
    id: 12,
    name: "Nexus Apex PC Workstation",
    category: "Computers",
    price: 249999,
    image: "/apexdesktop.jpg",
    rating: 5.0,
    tag: "Liquid Cooled PC",
    description: "Uncompromised computing titan. Hand-built with custom hardline liquid cooling, Intel Core Ultra 9 / AMD Ryzen 9 9950X, NVIDIA GeForce RTX 5090 (32GB VRAM), and high-airflow infinity mirror chassis.",
    colors: ["#0f172a", "#f8fafc"],
    colorNames: ["Obsidian Cyber Black", "Pure Titanium White"],
    options: [
      { name: "RTX 5080 16GB / 64GB DDR5 / 2TB Gen5 SSD", priceModifier: 0 },
      { name: "RTX 5090 32GB / 128GB DDR5 / 4TB Gen5 SSD", priceModifier: 95000 },
      { name: "Dual RTX 5090 AI Studio Edition / 192GB RAM", priceModifier: 260000 }
    ],
    specs: {
      "Processor": "AMD Ryzen 9 9950X3D (16-Core / 32-Thread, 5.7GHz Boost)",
      "Graphics Card": "NVIDIA GeForce RTX 5090 32GB GDDR7",
      "Memory": "Up to 192GB DDR5-6400MHz RGB",
      "Cooling": "Custom 360mm Triple-Rad AIO with Infinity OLED Pump Display",
      "Power Supply": "1200W ATX 3.1 80-Plus Platinum Fully Modular",
      "Motherboard": "X870E Ultra Wi-Fi 7 with PCIe 5.0 Support"
    },
    reviews: [
      { name: "Devansh G.", rating: 5, date: "2026-08-15", text: "Renders complex Blender 3D scenes and compiles massive codebases in seconds. Silent even under full GPU load!" }
    ]
  },
  {
    id: 13,
    name: "Nexus AirBook 14 Ultralight",
    category: "Laptops",
    price: 99999,
    image: "/airbook.jpg",
    rating: 4.8,
    tag: "Ultralight",
    description: "Impossibly thin at 10.9mm and feather-light at 1.05 kg. Crafted from magnesium-lithium alloy with a vibrant 14-inch 2.8K OLED screen and all-day 24-hour battery endurance.",
    colors: ["#334155", "#94a3b8", "#f43f5e"],
    colorNames: ["Space Grey", "Silver Mist", "Rose Quartz"],
    options: [
      { name: "16GB LPDDR5X / 512GB SSD", priceModifier: 0 },
      { name: "32GB LPDDR5X / 1TB SSD", priceModifier: 18000 }
    ],
    specs: {
      "Processor": "Nexus M4 Slim Neural Engine (Fanless Architecture)",
      "Display": "14.0\" 2.8K OLED (2880 x 1800), 120Hz VRR, 600 nits",
      "Battery": "70 Wh (Up to 24 hours video playback)",
      "Thickness & Weight": "10.9 mm thin, 1.05 kg",
      "Ports": "2x Thunderbolt 5 / USB-C, MagCharge Fast Port, 3.5mm Audio"
    },
    reviews: [
      { name: "Tanya S.", rating: 5, date: "2026-08-16", text: "I carry it around all day in my handbag and barely feel any weight. The fanless design means absolute zero noise." }
    ]
  },
  {
    id: 14,
    name: "Nexus Quantum Ultra 5G",
    category: "Mobile",
    price: 119999,
    image: "/quantumphone.jpg",
    rating: 4.9,
    tag: "200MP Camera",
    description: "The apex of mobile technology. Grade-5 titanium chassis with a 6.8\" Quad HD+ 144Hz AMOLED screen, 200MP 1-inch sensor with periscope 100x Space Zoom, and satellite two-way communication.",
    colors: ["#0f172a", "#38bdf8", "#ec4899"],
    colorNames: ["Titanium Phantom", "Nebula Sky", "Aurora Sunset"],
    options: [
      { name: "256GB Storage / 12GB RAM", priceModifier: 0 },
      { name: "512GB Storage / 16GB RAM", priceModifier: 15000 },
      { name: "1TB Ceramic Special Edition", priceModifier: 32000 }
    ],
    specs: {
      "Processor": "Snapdragon 8 Gen 5 Elite (3nm)",
      "Display": "6.8\" 2K+ Dynamic AMOLED (3200 x 1440), 1-144Hz LTPO",
      "Camera": "200MP Main + 50MP 5x Periscope + 50MP Ultra-Wide + LiDAR",
      "Battery & Charging": "5,500 mAh Silicon-Carbon with 100W Fast Wired + 50W Wireless",
      "Durability": "IP69 Water & Dust Ingress Resistant + Armor Glass"
    },
    reviews: [
      { name: "Kavita J.", rating: 5, date: "2026-08-18", text: "The camera is unmatched, especially in low-light night mode. Battery easily lasts 1.5 days on heavy 5G usage." }
    ]
  },
  {
    id: 15,
    name: "Nexus Vision Pro 77\" 8K OLED TV",
    category: "Smart Home",
    price: 289999,
    image: "/visiontv.jpg",
    rating: 4.9,
    tag: "8K Cinema TV",
    description: "Breathtaking home theater immersion. 77-inch self-lit 8K OLED evo panel with AI Alpha 11 Neural Processor, Dolby Vision IQ, 144Hz gaming response, and built-in Ambilight 360 glow.",
    colors: ["#0f172a"],
    colorNames: ["Zero-Gap Gallery Black"],
    options: [
      { name: "65-Inch 8K Model", priceModifier: -60000 },
      { name: "77-Inch 8K Model (Standard)", priceModifier: 0 },
      { name: "85-Inch 8K Ultra Masterpiece", priceModifier: 110000 }
    ],
    specs: {
      "Display Panel": "77\" 8K UHD OLED evo (7680 x 4320), 144Hz, Perfect Black",
      "Processor": "Nexus AI Neural Engine Gen 4 with 8K Real-Time Upscaling",
      "HDR Standards": "Dolby Vision IQ, HDR10+ Adaptive, Filmmaker Mode",
      "Gaming Features": "4x HDMI 2.1 (48Gbps), G-Sync, FreeSync Premium, 0.1ms",
      "Audio": "80W 4.2.2 Channel Dolby Atmos Sound System"
    },
    reviews: [
      { name: "Rajesh V.", rating: 5, date: "2026-08-04", text: "Watching 4K and 8K movies on this panel is pure magic. The infinite contrast and color accuracy are astonishing." }
    ]
  },
  {
    id: 16,
    name: "Nexus FrostAir Dual Inverter Smart AC",
    category: "Appliances",
    price: 54999,
    image: "/frostac.jpg",
    rating: 4.8,
    tag: "AI Climate AC",
    description: "Next-gen intelligent cooling and air purification. Features 1.5 Ton 5-Star Dual Inverter compressor, HEPA PM2.5 air purifier, voice control, and Rapid Cool down to 18°C in under 60 seconds.",
    colors: ["#f8fafc", "#1e293b"],
    colorNames: ["Polar White Glass", "Stealth Charcoal Black"],
    options: [
      { name: "1.5 Ton 5-Star (Rooms up to 180 sq.ft)", priceModifier: 0 },
      { name: "2.0 Ton 5-Star Heavy Duty (Up to 260 sq.ft)", priceModifier: 14000 }
    ],
    specs: {
      "Cooling Capacity": "1.5 Ton / 5200W (Expandable AI Inverter 40% - 110%)",
      "Energy Rating": "5-Star BEE Certified (ISEER 5.4 - Ultra Energy Saving)",
      "Air Quality": "Integrated PM0.1 HEPA Filter + UV-C Nanoe Air Sterilizer",
      "Noise Level": "19 dB Ultra-Quiet Sleep Mode",
      "Smart Control": "Wi-Fi IoT App, Google Home, Alexa & AI Room Temperature Sensor"
    },
    reviews: [
      { name: "Deepak C.", rating: 5, date: "2026-08-10", text: "Cools the entire bedroom in minutes even in 45°C summer heat. Our electricity bill reduced by almost 35% compared to our older AC." }
    ]
  },
  {
    id: 17,
    name: "Nexus ThermalWave Smart PTC Heater",
    category: "Appliances",
    price: 12999,
    image: "/thermalheater.jpg",
    rating: 4.7,
    tag: "PTC Ceramic",
    description: "Rapid, whisper-quiet whole-room warmth. 2000W positive temperature coefficient (PTC) ceramic heating element with 90° wide oscillation, smart digital thermostat, and tip-over auto safety shutoff.",
    colors: ["#0f172a", "#ffffff"],
    colorNames: ["Obsidian Slate", "Ceramic White"],
    options: [
      { name: "Standard 2000W Tower", priceModifier: 0 },
      { name: "Pro Edition with Humidifier & Remote", priceModifier: 3500 }
    ],
    specs: {
      "Heating Tech": "2000W Advanced PTC Ceramic Fast Heating (Heat in 2 secs)",
      "Coverage": "Up to 300 sq.ft with 90-degree Wide Angle Vortex Oscillation",
      "Thermostat": "Digital Smart Sensor maintains constant 15°C - 35°C",
      "Safety": "V0 Flame-Retardant Material, Overheat Sensor & 45° Tip-Over Shutoff",
      "Timer & Controls": "1-12 Hour Sleep Timer with LED Night Ambient Mode"
    },
    reviews: [
      { name: "Neha K.", rating: 5, date: "2026-08-17", text: "Instant warmth within 2 seconds of turning it on. Doesn't dry out the air or cause throat irritation. Great safety features with pets at home." }
    ]
  },
  {
    id: 18,
    name: "Nexus Vortex 7.1 Pro Gaming Headset",
    category: "Audio",
    price: 18999,
    image: "/vortexheadset.jpg",
    rating: 4.8,
    tag: "Spatial 7.1",
    description: "Pro-esports audio fidelity. 53mm biocellulose drivers with true 7.1 spatial surround sound, broadcast-grade detachable AI noise-filtering boom microphone, and ultra-plush memory foam ear cushions.",
    colors: ["#0f172a", "#ffffff"],
    colorNames: ["Cyber Black RGB", "Arctic Frost RGB"],
    options: [
      { name: "Wired USB / 3.5mm Edition", priceModifier: 0 },
      { name: "Dual Wireless 2.4GHz Ultra-Low Latency + Bluetooth", priceModifier: 5000 }
    ],
    specs: {
      "Drivers": "53mm Custom Biocellulose Drivers with Neodymium Magnets",
      "Surround Audio": "THX Spatial Audio 7.1 with pinpoint directional tracking",
      "Microphone": "Detachable 9.7mm Cardioid Mic with AI ENC Background Noise Filter",
      "Connectivity": "2.4GHz Wireless (1ms Latency) / Bluetooth 5.4 / 3.5mm",
      "Battery": "Up to 70 hours continuous gaming battery life"
    },
    reviews: [
      { name: "Varun R.", rating: 5, date: "2026-08-09", text: "Footsteps in Valorant and CS2 are pinpoint accurate. The mic clarity sounds like a dedicated desktop studio microphone!" }
    ]
  },
  {
    id: 19,
    name: "Nexus AeroPods Pro 2 ANC Earbuds",
    category: "Audio",
    price: 16999,
    image: "/aeropods.jpg",
    rating: 4.9,
    tag: "Hybrid ANC",
    description: "Pure sonic tranquility. Industry-leading 48dB Adaptive Hybrid Noise Cancellation, dual dynamic acoustic drivers with LDAC Hi-Res Audio, 3D spatial head-tracking, and 42-hour battery life with wireless charging case.",
    colors: ["#f8fafc", "#0f172a"],
    colorNames: ["Glossy Glacier White", "Matte Midnight Black"],
    options: [
      { name: "Standard Wireless Charging Case", priceModifier: 0 },
      { name: "MagSafe & Qi2 Fast Charge Case Bundle", priceModifier: 2000 }
    ],
    specs: {
      "Noise Cancellation": "Up to 48dB Active Hybrid ANC + Adaptive Transparency",
      "Audio Codecs": "LDAC, AAC, SBC, LC3 Lossless Audio Certified",
      "Drivers": "11mm Liquid Crystal Polymer Woofer + 6mm Micro-Tweeter",
      "Battery Life": "10 hours (Earbuds) + 32 hours (Case) = 42 hours total",
      "Water Resistance": "IP55 Sweat and Rain Resistant"
    },
    reviews: [
      { name: "Sneha G.", rating: 5, date: "2026-08-13", text: "The noise cancellation completely blocks out metro and flight noise. Bass is punchy and vocals are sparkling clear. Best earbuds I have used!" }
    ]
  }
];
