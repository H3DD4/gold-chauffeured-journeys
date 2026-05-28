export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  category: "Sedan" | "SUV" | "Limousine" | "Van";
  color: string;
  plate: string;
  city: string;
  capacity: number;
  pricePerHour: number;
  pricePerKm: number;
  rating: number;
  reviews: number;
  images: string[];
  features: string[];
  driverId: string;
  available: boolean;
  approved: boolean;
  ownerId: string;
};

export type Driver = {
  id: string;
  name: string;
  photo: string;
  phone: string;
  languages: string[];
  yearsExperience: number;
  rating: number;
  bio: string;
  licenseNumber: string;
  ownerId: string;
};

export type Booking = {
  id: string;
  reference: string;
  carId: string;
  clientName: string;
  clientEmail: string;
  date: string;
  time: string;
  pickup: string;
  destination: string;
  hours: number;
  totalPrice: number;
  status: "Pending" | "Confirmed" | "En Route" | "Completed" | "Cancelled";
  ownerId: string;
  createdAt: string;
};

const carImg = (id: number) => [
  `https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80&auto=format`,
  `https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80&auto=format`,
  `https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80&auto=format`,
  `https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&q=80&auto=format`,
  `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&auto=format`,
  `https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&q=80&auto=format`,
  `https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1600&q=80&auto=format`,
  `https://images.unsplash.com/photo-1617814086367-bcd1bdbf9a98?w=1600&q=80&auto=format`,
][id % 8];

const driverPhoto = (i: number) => [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=80&auto=format",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80&auto=format",
][i % 6];

export const drivers: Driver[] = [
  { id: "d1", name: "Marcus Beaumont", photo: driverPhoto(0), phone: "+33 6 12 34 56 78", languages: ["English", "French", "Italian"], yearsExperience: 12, rating: 4.9, bio: "Former diplomatic chauffeur with white-glove discretion.", licenseNumber: "FR-2014-88231", ownerId: "o1" },
  { id: "d2", name: "Elena Castellanos", photo: driverPhoto(1), phone: "+34 6 88 11 22 33", languages: ["Spanish", "English", "Portuguese"], yearsExperience: 8, rating: 4.8, bio: "Specialist in executive airport transfers across Europe.", licenseNumber: "ES-2017-44521", ownerId: "o1" },
  { id: "d3", name: "Hiroshi Tanaka", photo: driverPhoto(2), phone: "+81 90 1234 5678", languages: ["Japanese", "English"], yearsExperience: 15, rating: 5.0, bio: "Master of the art of silent, perfectly timed service.", licenseNumber: "JP-2010-99812", ownerId: "o1" },
  { id: "d4", name: "Sofia Romano", photo: driverPhoto(3), phone: "+39 333 666 9999", languages: ["Italian", "English", "French"], yearsExperience: 6, rating: 4.7, bio: "Wedding and gala specialist with impeccable timing.", licenseNumber: "IT-2019-22134", ownerId: "o2" },
  { id: "d5", name: "James Whitford", photo: driverPhoto(4), phone: "+44 7700 900123", languages: ["English"], yearsExperience: 20, rating: 4.95, bio: "Two decades behind the wheel for London's most discerning clients.", licenseNumber: "UK-2005-11223", ownerId: "o2" },
  { id: "d6", name: "Amara Diallo", photo: driverPhoto(5), phone: "+33 7 22 33 44 55", languages: ["French", "English", "Arabic"], yearsExperience: 9, rating: 4.85, bio: "Calm, attentive, and never late. Ever.", licenseNumber: "FR-2016-77810", ownerId: "o2" },
];

const cities = ["Paris", "London", "Milan", "Monaco", "Geneva", "Barcelona", "Vienna", "Tokyo"];
const makes = [
  { make: "Rolls-Royce", model: "Phantom VIII", cat: "Limousine" as const },
  { make: "Mercedes-Benz", model: "S-Class Maybach", cat: "Sedan" as const },
  { make: "Bentley", model: "Mulsanne", cat: "Limousine" as const },
  { make: "Range Rover", model: "Autobiography", cat: "SUV" as const },
  { make: "BMW", model: "7 Series", cat: "Sedan" as const },
  { make: "Cadillac", model: "Escalade ESV", cat: "SUV" as const },
  { make: "Mercedes-Benz", model: "V-Class Exclusive", cat: "Van" as const },
  { make: "Audi", model: "A8 L", cat: "Sedan" as const },
  { make: "Lexus", model: "LX 600", cat: "SUV" as const },
  { make: "Rolls-Royce", model: "Ghost", cat: "Limousine" as const },
  { make: "Mercedes-Benz", model: "Sprinter VIP", cat: "Van" as const },
  { make: "Bentley", model: "Bentayga", cat: "SUV" as const },
];

const features = ["Champagne Service", "WiFi", "Privacy Glass", "Leather Reclining Seats", "Climate Zones", "Bottled Water", "Phone Chargers", "Newspapers"];

export const cars: Car[] = makes.map((m, i) => ({
  id: `c${i + 1}`,
  make: m.make,
  model: m.model,
  year: 2022 + (i % 3),
  category: m.cat,
  color: ["Obsidian Black", "Pearl White", "Midnight Blue", "Champagne Gold"][i % 4],
  plate: `LX-${(1000 + i * 17).toString()}`,
  city: cities[i % cities.length],
  capacity: m.cat === "Van" ? 7 : m.cat === "SUV" ? 5 : 4,
  pricePerHour: 180 + (i % 6) * 40,
  pricePerKm: 3 + (i % 4),
  rating: 4.6 + (i % 5) * 0.08,
  reviews: 24 + i * 11,
  images: [carImg(i), carImg(i + 1), carImg(i + 2), carImg(i + 3)],
  features: features.slice(0, 4 + (i % 4)),
  driverId: drivers[i % drivers.length].id,
  available: i % 7 !== 3,
  approved: i !== 11,
  ownerId: i < 6 ? "o1" : "o2",
}));

export const bookings: Booking[] = [
  { id: "b1", reference: "ARV-9F2K1", carId: "c1", clientName: "Alexander Pemberton", clientEmail: "alex@example.com", date: "2026-06-14", time: "19:00", pickup: "Hotel Plaza Athénée, Paris", destination: "Opéra Garnier", hours: 4, totalPrice: 720, status: "Confirmed", ownerId: "o1", createdAt: "2026-05-20" },
  { id: "b2", reference: "ARV-3M7H9", carId: "c2", clientName: "Victoria Lin", clientEmail: "v.lin@example.com", date: "2026-06-15", time: "08:30", pickup: "LHR Terminal 5", destination: "The Savoy, London", hours: 2, totalPrice: 440, status: "En Route", ownerId: "o1", createdAt: "2026-05-22" },
  { id: "b3", reference: "ARV-1B8X4", carId: "c5", clientName: "Marco Rossi", clientEmail: "marco@example.com", date: "2026-05-10", time: "20:00", pickup: "Via Montenapoleone, Milan", destination: "La Scala", hours: 5, totalPrice: 1100, status: "Completed", ownerId: "o1", createdAt: "2026-04-30" },
  { id: "b4", reference: "ARV-7Q2L5", carId: "c4", clientName: "Isabella Chen", clientEmail: "i.chen@example.com", date: "2026-06-18", time: "14:00", pickup: "Casino Monte-Carlo", destination: "Nice Côte d'Azur Airport", hours: 3, totalPrice: 780, status: "Pending", ownerId: "o1", createdAt: "2026-05-25" },
  { id: "b5", reference: "ARV-5G9P2", carId: "c8", clientName: "Hartwell Group", clientEmail: "ops@hartwell.co", date: "2026-06-20", time: "18:00", pickup: "Geneva HQ", destination: "Hotel Beau-Rivage", hours: 6, totalPrice: 1560, status: "Confirmed", ownerId: "o2", createdAt: "2026-05-26" },
  { id: "b6", reference: "ARV-2D4N8", carId: "c10", clientName: "Penelope Hart", clientEmail: "p.hart@example.com", date: "2026-04-12", time: "16:00", pickup: "Claridge's, London", destination: "Royal Albert Hall", hours: 4, totalPrice: 960, status: "Completed", ownerId: "o2", createdAt: "2026-03-30" },
  { id: "b7", reference: "ARV-8K3R6", carId: "c3", clientName: "Yuki Yamada", clientEmail: "yuki@example.com", date: "2026-06-22", time: "11:00", pickup: "Tokyo Station", destination: "Ginza", hours: 3, totalPrice: 660, status: "Pending", ownerId: "o1", createdAt: "2026-05-27" },
  { id: "b8", reference: "ARV-4W7T1", carId: "c6", clientName: "Ralph Etienne", clientEmail: "ralph@example.com", date: "2026-03-08", time: "21:00", pickup: "Hotel de Crillon", destination: "Versailles Gala", hours: 7, totalPrice: 1820, status: "Cancelled", ownerId: "o1", createdAt: "2026-03-01" },
];

export const owners = [
  { id: "o1", name: "Atelier Noir Fleet", email: "fleet@ateliernoir.com", joined: "2023-08-12", status: "Active", city: "Paris" },
  { id: "o2", name: "Whitford Executive", email: "ops@whitford.co.uk", joined: "2024-02-04", status: "Active", city: "London" },
  { id: "o3", name: "Castellanos Holdings", email: "info@castellanos.es", joined: "2024-11-30", status: "Pending", city: "Barcelona" },
];

export const clients = [
  { id: "u1", name: "Alexander Pemberton", email: "alex@example.com", joined: "2024-03-12", bookings: 7, status: "Active", city: "Paris" },
  { id: "u2", name: "Victoria Lin", email: "v.lin@example.com", joined: "2024-05-22", bookings: 3, status: "Active", city: "London" },
  { id: "u3", name: "Marco Rossi", email: "marco@example.com", joined: "2023-11-08", bookings: 12, status: "Active", city: "Milan" },
  { id: "u4", name: "Isabella Chen", email: "i.chen@example.com", joined: "2025-01-04", bookings: 2, status: "Active", city: "Monaco" },
  { id: "u5", name: "Hartwell Group", email: "ops@hartwell.co", joined: "2023-09-18", bookings: 28, status: "VIP", city: "Geneva" },
  { id: "u6", name: "Penelope Hart", email: "p.hart@example.com", joined: "2024-07-30", bookings: 5, status: "Active", city: "London" },
  { id: "u7", name: "Yuki Yamada", email: "yuki@example.com", joined: "2025-02-14", bookings: 1, status: "New", city: "Tokyo" },
  { id: "u8", name: "Ralph Etienne", email: "ralph@example.com", joined: "2024-10-05", bookings: 4, status: "Suspended", city: "Paris" },
];

export const testimonials = [
  { id: 1, name: "Eleanor Ashworth", role: "Creative Director, Maison Vert", quote: "Arriving became part of the event. Marcus opened the door at the exact second I needed it.", photo: driverPhoto(3) },
  { id: 2, name: "Daniel Okonkwo", role: "CEO, Northbridge Capital", quote: "Three airports in two days. Not a single moment of friction. This is what service looks like.", photo: driverPhoto(1) },
  { id: 3, name: "Camille Reverdy", role: "Bride, Château de Vincy", quote: "The convoy was so beautifully timed our guests applauded as we arrived. Worth every euro.", photo: driverPhoto(2) },
];

export const revenueByMonth = [
  { month: "Jan", revenue: 24800, bookings: 32 },
  { month: "Feb", revenue: 28200, bookings: 38 },
  { month: "Mar", revenue: 31500, bookings: 41 },
  { month: "Apr", revenue: 38900, bookings: 52 },
  { month: "May", revenue: 47200, bookings: 64 },
  { month: "Jun", revenue: 58400, bookings: 78 },
];

export const platformGrowth = [
  { month: "Jan", users: 1240, owners: 38 },
  { month: "Feb", users: 1480, owners: 44 },
  { month: "Mar", users: 1820, owners: 51 },
  { month: "Apr", users: 2310, owners: 62 },
  { month: "May", users: 2890, owners: 71 },
  { month: "Jun", users: 3640, owners: 84 },
];

export const earningsBreakdown = [
  { name: "Sedan", value: 38, color: "#C9A84C" },
  { name: "Limousine", value: 28, color: "#E8C96A" },
  { name: "SUV", value: 22, color: "#8B7530" },
  { name: "Van", value: 12, color: "#5C4E20" },
];

export const getCar = (id: string) => cars.find(c => c.id === id);
export const getDriver = (id: string) => drivers.find(d => d.id === id);
export const getBooking = (id: string) => bookings.find(b => b.id === id);