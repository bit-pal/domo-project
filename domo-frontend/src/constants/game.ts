export interface Profession {
  id: number;
  name: string;
  efficiency: number;
  base_income: number;
  min_level: number;
  max_level: number;
  cost: number;
}

export interface Tool {
  id: number;
  name: string;
  cost: number;
}

export const PROFESSIONS: Profession[] = [
  { id: 1, name: "Miner", efficiency: 1, base_income: 100, min_level: 1, max_level: 10, cost: 100 },
  { id: 2, name: "Developer", efficiency: 1.2, base_income: 120, min_level: 2, max_level: 12, cost: 150 },
  { id: 3, name: "Designer", efficiency: 1.1, base_income: 110, min_level: 1, max_level: 11, cost: 120 },
  { id: 4, name: "Content Creator", efficiency: 1.15, base_income: 115, min_level: 2, max_level: 12, cost: 130 },
  { id: 5, name: "Community Manager", efficiency: 1.05, base_income: 105, min_level: 1, max_level: 10, cost: 110 },
  { id: 6, name: "Trader", efficiency: 1.25, base_income: 125, min_level: 3, max_level: 15, cost: 200 },
  { id: 7, name: "NFT Artist", efficiency: 1.2, base_income: 120, min_level: 2, max_level: 12, cost: 160 },
  { id: 8, name: "Blockchain Developer", efficiency: 1.3, base_income: 130, min_level: 4, max_level: 16, cost: 250 },
  { id: 9, name: "DeFi Specialist", efficiency: 1.35, base_income: 135, min_level: 5, max_level: 18, cost: 300 },
  { id: 10, name: "DAO Manager", efficiency: 1.4, base_income: 140, min_level: 6, max_level: 20, cost: 350 }
];

export const TOOLS: Tool[] = [
  { id: 1, name: "Desktop PC", cost: 0 },
  { id: 2, name: "3D printer", cost: 0 },
  { id: 3, name: "DJ controller: DJ", cost: 0 },
  { id: 4, name: "Raspberry Pi", cost: 0 },
  { id: 5, name: "VR headset", cost: 0 },
  { id: 6, name: "*Meme library", cost: 0 },
  { id: 7, name: "SHA256 ASIC: Miner", cost: 0 },
  { id: 8, name: "Gaming laptop", cost: 0 },
  { id: 9, name: "Graphics tablet", cost: 0 },
  { id: 10, name: "Voice recorder", cost: 0 },
  { id: 11, name: "Drone", cost: 0 },
  { id: 12, name: "DSLR camera", cost: 0 },
  { id: 13, name: "Game console", cost: 0 },
  { id: 14, name: "Switch + router", cost: 0 },
  { id: 15, name: "*Ring microphone", cost: 0 },
  { id: 16, name: "Miniature stove", cost: 0 },
  { id: 17, name: "Microphone with pop filter", cost: 0 },
  { id: 18, name: "Monitors with charts", cost: 0 },
  { id: 19, name: "Laptop with terminal", cost: 0 },
  { id: 20, name: "Magic 8-ball", cost: 0 },
  { id: 21, name: "Retro console", cost: 0 },
  { id: 22, name: "Smartphone: Blogger", cost: 0 },
  { id: 23, name: "Debug terminal", cost: 0 },
  { id: 24, name: "Grower", cost: 0 },
  { id: 25, name: "Robot terrarium", cost: 0 },
  { id: 26, name: "AI terminal", cost: 0 },
  { id: 27, name: "DAO terminal", cost: 0 },
  { id: 28, name: "Web3 blockchain terminal", cost: 0 },
  { id: 29, name: "GPU farm", cost: 0 },
  { id: 30, name: "Tripod with lamp", cost: 0 },
  { id: 31, name: "Electronic mixer", cost: 0 }
]; 