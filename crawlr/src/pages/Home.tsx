import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import crawlrLogo from "@assets/crawlrlogo_1774529941987.png";
import jacksImg from "@assets/jacks_1774529969284.png";
import goldenPonyImg from "@assets/Screenshot_2026-04-15_at_4.25.58_PM_1776285099411.png";
import { venues, searchVenues, type Venue, type SocialPost } from "@/data/venues";

type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    setOpen(items[0]?.id ?? null);
  }, [items]);

  return (
    <div className="border border-gray-200 divide-y divide-gray-200 bg-white">
      {items.map((item) => (
        <div key={item.id}>
          <button
            className="w-full text-left px-4 py-3 font-medium text-black flex items-center justify-between hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === item.id ? null : item.id)}
            data-testid={`accordion-button-${item.id}`}
          >
            <span>{item.title}</span>
            <span className="text-gray-500 text-sm">{open === item.id ? "▲" : "▼"}</span>
          </button>
          {open === item.id && (
            <div className="px-4 py-3 bg-white" data-testid={`accordion-content-${item.id}`}>
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const venueImages: Record<string, string> = {
  jacks: jacksImg,
  "golden-pony": goldenPonyImg,
};

function VenueImage({ venue }: { venue: Venue }) {
  const src = venue.image ? venueImages[venue.image] : null;
  if (src) {
    return (
      <img
        src={src}
        alt={venue.name}
        className="w-full object-cover"
        style={{ maxHeight: "356px" }}
      />
    );
  }
  return (
    <div className="w-full bg-zinc-800 flex items-center justify-center" style={{ height: "280px" }}>
      <div className="text-center text-zinc-400">
        <div className="text-5xl mb-3">🍺</div>
        <div className="text-lg font-semibold">{venue.name}</div>
        <div className="text-sm text-zinc-500">{venue.address}</div>
      </div>
    </div>
  );
}

function getLineWaitItems(
  venue: Venue,
  waitForm: { arrival: string; entrance: string },
  setWaitForm: React.Dispatch<React.SetStateAction<{ arrival: string; entrance: string }>>,
  waitSubmitted: boolean,
  setWaitSubmitted: React.Dispatch<React.SetStateAction<boolean>>
): AccordionItem[] {
  return [
    {
      id: `line-wait-${venue.id}`,
      title: "Line Wait",
      content: (
        <div>
          <p className="text-2xl font-bold text-black mb-1">{venue.lineWait.minutes} Minutes</p>
          <p className="text-sm text-gray-600">Average reported wait as of {venue.lineWait.asOf}</p>
        </div>
      ),
    },
    {
      id: `report-wait-${venue.id}`,
      title: "Report Your Wait Time",
      content: (
        <div className="space-y-2">
          <p className="text-black">
            Arrival Time:{" "}
            <input
              type="text"
              value={waitForm.arrival}
              onChange={(e) => setWaitForm((f) => ({ ...f, arrival: e.target.value }))}
              className="border border-gray-300 rounded px-2 py-1 ml-2 text-black"
              placeholder="e.g. 11:00pm"
              data-testid="input-arrival-time"
            />
          </p>
          <p className="text-black">
            Entrance Time:{" "}
            <input
              type="text"
              value={waitForm.entrance}
              onChange={(e) => setWaitForm((f) => ({ ...f, entrance: e.target.value }))}
              className="border border-gray-300 rounded px-2 py-1 ml-2 text-black"
              placeholder="e.g. 11:20pm"
              data-testid="input-entrance-time"
            />
          </p>
          <button
            onClick={() => {
              if (waitForm.arrival && waitForm.entrance) {
                setWaitSubmitted(true);
                setWaitForm({ arrival: "", entrance: "" });
                setTimeout(() => setWaitSubmitted(false), 3000);
              }
            }}
            className="mt-2 bg-[#F2D02F] text-black font-medium px-4 py-1 rounded hover:opacity-80 transition-opacity"
            data-testid="button-submit-wait"
          >
            {waitSubmitted ? "Thanks!" : "Submit"}
          </button>
        </div>
      ),
    },
  ];
}

function getRideItems(venue: Venue): AccordionItem[] {
  return venue.rideRates.map((rate, i) => ({
    id: `ride-${venue.id}-${i}`,
    title: rate.label,
    content: (
      <div>
        <p className="text-2xl font-bold text-black mb-1">{rate.price}</p>
        <p className="text-sm text-gray-600">Average reported rate as of {venue.lineWait.asOf}</p>
      </div>
    ),
  }));
}

export default function Home() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Venue[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<Venue>(venues[0]);
  const [localPosts, setLocalPosts] = useState<SocialPost[]>(venues[0].posts);
  const [postText, setPostText] = useState("");
  const [waitForm, setWaitForm] = useState({ arrival: "", entrance: "" });
  const [waitSubmitted, setWaitSubmitted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalPosts(selectedVenue.posts);
  }, [selectedVenue]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    setSuggestions(val.trim().length > 0 ? searchVenues(val) : []);
  }

  function handleSelectVenue(venue: Venue) {
    setSelectedVenue(venue);
    setQuery(venue.name);
    setSuggestions([]);
    setWaitForm({ arrival: "", entrance: "" });
    setWaitSubmitted(false);
  }

  function handlePostSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!postText.trim()) return;
    setLocalPosts([{ name: "You", text: postText }, ...localPosts]);
    setPostText("");
  }

  const lineWaitItems = getLineWaitItems(selectedVenue, waitForm, setWaitForm, waitSubmitted, setWaitSubmitted);
  const rideItems = getRideItems(selectedVenue);

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-[#F2D02F] px-4 py-3 flex items-center">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer bg-transparent border-none p-0"
          data-testid="link-home"
        >
          <img src={crawlrLogo} alt="Crawlr logo" className="h-8 w-auto" />
        </button>
        <div className="ml-auto flex items-center gap-6">
          <a href="#" className="text-black no-underline font-medium text-lg hover:opacity-70 transition-opacity" data-testid="link-profile">Profile</a>
          <a href="#" className="text-black no-underline font-medium text-lg hover:opacity-70 transition-opacity" data-testid="link-friends">Friends</a>
          <a href="#" className="text-black no-underline font-medium text-lg hover:opacity-70 transition-opacity" data-testid="link-events">Events</a>
        </div>
      </nav>

      {/* Start Your Crawl */}
      <div className="bg-black pt-28 pb-4 px-6">
        <p className="font-funkydori text-[#F2D02F] m-0 text-center leading-none" style={{ fontSize: "150px" }}>
          Start Your Crawl
        </p>
      </div>

      {/* Search */}
      <div className="bg-black px-6 pt-4 pb-12 flex justify-center">
        <div ref={searchRef} className="relative">
          <p className="text-white text-lg flex items-center gap-2 m-0">
            Search:{" "}
            <span className="relative">
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                onFocus={() => setSuggestions(query.trim().length > 0 ? searchVenues(query) : venues)}
                placeholder="Billy Jacks, Golden Pony..."
                className="border border-zinc-600 rounded bg-zinc-900 text-white px-3 py-1 ml-2 w-64"
                data-testid="input-search"
              />
              {suggestions.length > 0 && (
                <ul className="absolute left-2 top-full mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                  {suggestions.map((v) => (
                    <li key={v.id}>
                      <button
                        className="w-full text-left px-4 py-3 hover:bg-[#F2D02F] hover:text-black text-black transition-colors border-b border-gray-100 last:border-0"
                        onClick={() => handleSelectVenue(v)}
                        data-testid={`suggestion-${v.id}`}
                      >
                        <div className="font-semibold text-sm">{v.name}</div>
                        <div className="text-xs text-gray-500">{v.city}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </span>
          </p>
        </div>
      </div>

      {/* Two-column card layout */}
      <div className="px-6 pb-10 flex flex-col md:flex-row gap-6">

        {/* LEFT CARD — venue details */}
        <div className="flex-1 flex flex-col">

          {/* Venue name header — directly connected to image below */}
          <div className="bg-[#F2D02F] rounded-t-[18px] px-6 pt-2 pb-0">
            <h1 className="font-funkydori text-black m-0" style={{ fontSize: "40px" }} data-testid="venue-name">
              {selectedVenue.name}
            </h1>
          </div>

          {/* Venue image — no gap, sits flush under header */}
          <VenueImage venue={selectedVenue} />

          {/* Accordions row — flush under image */}
          <div className="flex flex-col md:flex-row">
            <div className="flex-1">
              <Accordion key={`line-${selectedVenue.id}`} items={lineWaitItems} />
            </div>
            <div className="flex-1">
              <Accordion key={`ride-${selectedVenue.id}`} items={rideItems} />
            </div>
          </div>

          {/* Gap before feed card */}
          <div className="mt-6" />

          {/* Social feed card — header flush to content */}
          <div className="flex flex-col">
            <div className="bg-[#F2D02F] rounded-t-[18px] px-6 pt-2 pb-0">
              <h1 className="font-funkydori text-black m-0" style={{ fontSize: "40px" }}>What People Are Saying</h1>
            </div>
            <div
              className="bg-white rounded-b-[18px] max-h-72 overflow-y-auto divide-y divide-gray-300"
              data-testid="feed-container"
            >
              {localPosts.map((post, i) => (
                <div key={i} className="px-6 py-4" data-testid={`feed-post-${i}`}>
                  <p className="font-bold text-black m-0">{post.name}</p>
                  <p className="text-black m-0">{post.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Post form */}
          <form onSubmit={handlePostSubmit} className="mt-3 flex gap-2">
            <input
              type="text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={`Share your experience at ${selectedVenue.name}...`}
              className="flex-1 border border-zinc-600 rounded bg-zinc-900 text-white px-3 py-2"
              data-testid="input-post"
            />
            <button
              type="submit"
              className="bg-[#F2D02F] text-black font-medium px-4 py-2 rounded hover:opacity-80 transition-opacity"
              data-testid="button-post"
            >
              Post
            </button>
          </form>
        </div>

        {/* RIGHT CARD — city + map */}
        <div className="w-full md:w-80 shrink-0 flex flex-col">
          {/* City header — directly connected to map below */}
          <div className="bg-[#F2D02F] rounded-t-[18px] px-6 pt-2 pb-0">
            <h1 className="font-funkydori text-black m-0" style={{ fontSize: "40px" }} data-testid="venue-city">
              Your City
            </h1>
          </div>
          {/* Map — flush under city header, rounded bottom */}
          <div className="rounded-b-[18px] overflow-hidden flex-1" style={{ minHeight: "560px" }}>
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1u416hvTtRgD575FIMtlkEI4mRvgLjr8&ehbc=2E312F&noprof=1"
              width="100%"
              height="100%"
              title="Crawlr Map"
              className="w-full h-full border-0"
              style={{ minHeight: "560px" }}
              data-testid="map-iframe"
            />
          </div>
        </div>

      </div>

      <footer className="bg-black h-4" />
    </div>
  );
}
