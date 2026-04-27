export type SocialPost = {
  name: string;
  text: string;
};

export type RideRate = {
  label: string;
  price: string;
};

export type Venue = {
  id: string;
  name: string;
  city: string;
  address: string;
  image: string | null; // null = use placeholder
  lineWait: {
    minutes: number;
    asOf: string;
  };
  rideRates: RideRate[];
  posts: SocialPost[];
};

export const venues: Venue[] = [
  {
    id: "billy-jacks",
    name: "Billy Jacks",
    city: "Harrisonburg, VA",
    address: "161 S Main St, Harrisonburg, VA",
    image: "jacks",
    lineWait: { minutes: 18.3, asOf: "11:30pm on 03/14/26" },
    rideRates: [
      { label: "Short Ride (less than 4 miles)", price: "$13.60" },
      { label: "Medium Ride (4–8 miles)", price: "$21.30" },
    ],
    posts: [
      { name: "Ben Watson", text: "Sticky Nuggs are a must get after a few drinks!!" },
      { name: "Anonymous", text: "Best college bar in Harrisonburg" },
      { name: "Jon Mercer", text: "Great atmosphere tonight — packed but worth it every time." },
      { name: "Anonymous", text: "This place never disappoints, especially on game nights." },
      { name: "Sam Delaney", text: "Staff was super friendly and the wings were on point." },
      { name: "Lauren P.", text: "Playlist was amazing tonight, vibes were immaculate." },
      { name: "Anonymous", text: "Best spot downtown if you're trying to meet new people." },
      { name: "Matt Rivers", text: "The line moved faster than expected — definitely coming back." },
    ],
  },
  {
    id: "golden-pony",
    name: "The Golden Pony",
    city: "Harrisonburg, VA",
    address: "140 S Main St, Harrisonburg, VA",
    image: "golden-pony",
    lineWait: { minutes: 12.0, asOf: "11:30pm on 03/14/26" },
    rideRates: [
      { label: "Short Ride (less than 4 miles)", price: "$11.40" },
      { label: "Medium Ride (4–8 miles)", price: "$19.80" },
    ],
    posts: [
      { name: "Kayla R.", text: "Love the vibe at Golden Pony, always a good time." },
      { name: "Anonymous", text: "Great cocktails, a bit crowded but worth it." },
      { name: "Tyler M.", text: "The DJ was fire tonight, couldn't leave early if I wanted to." },
      { name: "Anonymous", text: "Staff is incredibly friendly and keeps things moving." },
      { name: "Jess T.", text: "Discovered this spot last weekend — already coming back." },
    ],
  },
  {
    id: "jack-browns",
    name: "Jack Brown's Beer & Burger Joint",
    city: "Harrisonburg, VA",
    address: "165 S Main St, Harrisonburg, VA",
    image: null,
    lineWait: { minutes: 5.5, asOf: "11:30pm on 03/14/26" },
    rideRates: [
      { label: "Short Ride (less than 4 miles)", price: "$12.00" },
      { label: "Medium Ride (4–8 miles)", price: "$20.50" },
    ],
    posts: [
      { name: "Devon L.", text: "The burgers here are unreal, even after midnight." },
      { name: "Anonymous", text: "Short wait tonight, walked right in." },
      { name: "Mia C.", text: "Craft beer selection is top tier — had the local IPA." },
      { name: "Anonymous", text: "Solid spot, good prices, no complaints." },
      { name: "Ryan K.", text: "Perfect stop mid-crawl to refuel before the next bar." },
    ],
  },
  {
    id: "local-chop",
    name: "Local Chop & Grill House",
    city: "Harrisonburg, VA",
    address: "59 W Elizabeth St, Harrisonburg, VA",
    image: null,
    lineWait: { minutes: 8.0, asOf: "11:30pm on 03/14/26" },
    rideRates: [
      { label: "Short Ride (less than 4 miles)", price: "$13.20" },
      { label: "Medium Ride (4–8 miles)", price: "$21.00" },
    ],
    posts: [
      { name: "Chris B.", text: "Best steakhouse bar vibe in Harrisonburg, hands down." },
      { name: "Anonymous", text: "The cocktail menu is awesome, really creative stuff." },
      { name: "Sophia W.", text: "Not too packed on a Friday, got a table pretty fast." },
      { name: "Anonymous", text: "Happy hour deal is incredible, get here early." },
      { name: "Liam H.", text: "Food and drinks both slap. Will be back for sure." },
    ],
  },
  {
    id: "rocktown-kitchen",
    name: "Rocktown Kitchen",
    city: "Harrisonburg, VA",
    address: "207 S Liberty St, Harrisonburg, VA",
    image: null,
    lineWait: { minutes: 3.0, asOf: "11:30pm on 03/14/26" },
    rideRates: [
      { label: "Short Ride (less than 4 miles)", price: "$11.80" },
      { label: "Medium Ride (4–8 miles)", price: "$19.50" },
    ],
    posts: [
      { name: "Emma S.", text: "Great for late night eats, kitchen stays open late." },
      { name: "Anonymous", text: "The bar staff remembers your order — love that." },
      { name: "Noah P.", text: "Chill atmosphere, perfect for a low-key night out." },
      { name: "Anonymous", text: "Best mac and cheese in town, no debate." },
      { name: "Olivia F.", text: "Took some friends here for the first time, they loved it!" },
    ],
  },
  {
    id: "rubys-lounge",
    name: "Ruby's Lounge",
    city: "Harrisonburg, VA",
    address: "Harrisonburg, VA",
    image: null,
    lineWait: { minutes: 7.5, asOf: "11:30pm on 03/14/26" },
    rideRates: [
      { label: "Short Ride (less than 4 miles)", price: "$12.80" },
      { label: "Medium Ride (4–8 miles)", price: "$20.90" },
    ],
    posts: [
      { name: "Caitlin M.", text: "Best lounge vibe in the city — great lighting, great drinks." },
      { name: "Anonymous", text: "Came here on a whim and stayed for three hours. Worth it." },
      { name: "Derek W.", text: "Ruby's never disappoints on a Saturday night." },
      { name: "Anonymous", text: "Bartenders are fast even when it's packed." },
      { name: "Priya S.", text: "Love this spot for a more chill night out." },
    ],
  },
  {
    id: "rubys-arcade",
    name: "Ruby's Arcade",
    city: "Harrisonburg, VA",
    address: "Harrisonburg, VA",
    image: null,
    lineWait: { minutes: 10.2, asOf: "11:30pm on 03/14/26" },
    rideRates: [
      { label: "Short Ride (less than 4 miles)", price: "$12.80" },
      { label: "Medium Ride (4–8 miles)", price: "$20.90" },
    ],
    posts: [
      { name: "Jake F.", text: "Arcade games AND drinks?? This place is elite." },
      { name: "Anonymous", text: "Skee-ball and a cold beer — what more do you need." },
      { name: "Tara N.", text: "Super fun for a group, way better than a regular bar." },
      { name: "Anonymous", text: "Lines can get long on weekends but it moves fast." },
      { name: "Marcus B.", text: "Lowkey the most fun I've had on a Friday in a long time." },
    ],
  },
  {
    id: "magnolias",
    name: "Magnolias",
    city: "Harrisonburg, VA",
    address: "Harrisonburg, VA",
    image: null,
    lineWait: { minutes: 6.0, asOf: "11:30pm on 03/14/26" },
    rideRates: [
      { label: "Short Ride (less than 4 miles)", price: "$13.00" },
      { label: "Medium Ride (4–8 miles)", price: "$21.10" },
    ],
    posts: [
      { name: "Hannah G.", text: "Such a classy spot — love coming here for a real night out." },
      { name: "Anonymous", text: "The cocktails here are genuinely impressive." },
      { name: "Sean T.", text: "Great for a date night or a group, works either way." },
      { name: "Anonymous", text: "Patio was beautiful on a warm night." },
      { name: "Alicia R.", text: "Friendly staff and a killer drink menu — always a yes." },
    ],
  },
  {
    id: "jimmy-madisons",
    name: "Jimmy Madison's",
    city: "Harrisonburg, VA",
    address: "Harrisonburg, VA",
    image: null,
    lineWait: { minutes: 14.0, asOf: "11:30pm on 03/14/26" },
    rideRates: [
      { label: "Short Ride (less than 4 miles)", price: "$13.40" },
      { label: "Medium Ride (4–8 miles)", price: "$21.50" },
    ],
    posts: [
      { name: "Tyler B.", text: "Jimmy's is a Harrisonburg staple — always good times." },
      { name: "Anonymous", text: "Best outdoor bar scene in the area, hands down." },
      { name: "Natalie K.", text: "Gets packed fast but the energy is unmatched." },
      { name: "Anonymous", text: "Great drink specials on weekends, highly recommend." },
      { name: "Connor J.", text: "Never had a bad night at Jimmy Madison's." },
    ],
  },
];

export function searchVenues(query: string): Venue[] {
  const q = query.toLowerCase().trim();
  if (!q) return venues;
  return venues.filter(
    (v) =>
      v.name.toLowerCase().includes(q) ||
      v.city.toLowerCase().includes(q) ||
      v.address.toLowerCase().includes(q)
  );
}
