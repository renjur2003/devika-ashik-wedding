export interface WeddingData {
  tagline: string;
  secondaryTagline: string;
  date: {
    gregorian: string;
    dayOfWeek: string;
    year: number;
    malayalam: string;
    muhurtham: string;
    isoDateTimeIST: string;
  };
  bride: {
    name: string;
    parents: string;
    grandparents: string;
    address: string;
    phone: string;
  };
  groom: {
    name: string;
    parents: string;
    address: string;
  };
  invitationMessage: string;
  invitationCardNote: string;
  sharingHappiness: string;
  venues: {
    thalikettu: {
      name: string;
      location: string;
      time: string;
      eventType: string;
      mapUrl: string;
    };
    celebration: {
      name: string;
      location: string;
      eventType: string;
      mapUrl: string;
    };
  };
  contact: {
    phone: string;
    phoneFormatted: string;
    whatsappNumber: string;
  };
  photos: {
    id: string;
    title: string;
    subtitle: string;
    chapter: string;
    path: string;
    description: string;
    aspectRatio: string;
  }[];
}

export const weddingData: WeddingData = {
  tagline: "A story that began in school, travelled across the miles, and now begins forever.",
  secondaryTagline: "Two hearts. One journey. A lifetime of love.",
  date: {
    gregorian: "26 December 2026",
    dayOfWeek: "Saturday",
    year: 2026,
    malayalam: "1202 Dhanu 11",
    muhurtham: "10:30 AM to 11:30 AM",
    // 26 Dec 2026 10:30 AM IST (UTC+5:30)
    isoDateTimeIST: "2026-12-26T10:30:00+05:30",
  },
  bride: {
    name: "Devika",
    parents: "Mrs. Sreeja Reji & Mr. Reji K.V.",
    grandparents: "Grand D/o K.K. Vimalasurendran (Late) & Tharabai Vimalasurendran (Late) and Kaliparambil Vasudevan (Late) & Mrs. Radha Vasudevan",
    address: "Karinjett House, Naduvilkara, Vadanappilly",
    phone: "9446039152",
  },
  groom: {
    name: "Ashik",
    parents: "Mrs. Sreedevi & Mr. Anishkumar",
    address: "Madambatt House, Puthenpeedika",
  },
  invitationMessage:
    "With the blessings of our families, we cordially invite you and your family to celebrate the wedding of Devika and Ashik.\n\nYour presence and blessings will make our special day even more memorable.",
  invitationCardNote: "Your presence and blessings mean the world to us.",
  sharingHappiness: "Sharing the happiness: Gopu",
  venues: {
    thalikettu: {
      name: "Sree Krishna Temple",
      location: "Guruvayur",
      time: "10:30 AM – 11:30 AM",
      eventType: "Thalikettu Ceremony",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Sree+Krishna+Temple+Guruvayur",
    },
    celebration: {
      name: "Celebration Convention Centre",
      location: "Anthikad",
      eventType: "Wedding Celebration",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Celebration+Convention+Centre+Anthikad",
    },
  },
  contact: {
    phone: "9446039152",
    phoneFormatted: "+91 94460 39152",
    whatsappNumber: "919446039152",
  },
  photos: [
    {
      id: "photo-01",
      title: "Devika & Ashik",
      subtitle: "The Romantic Portrait",
      chapter: "Forever Together",
      path: "/images/couple-01-black-outfits.png",
      description: "Warmly lit intimate romantic portrait in black outfits",
      aspectRatio: "aspect-[4/5]",
    },
    {
      id: "photo-02",
      title: "Together Again",
      subtitle: "A Festive Homecoming",
      chapter: "Chapter 03 – The Beautiful Present",
      path: "/images/couple-02-maroon-saree.png",
      description: "Cream kurta and maroon saree portrait – festive couple moment",
      aspectRatio: "aspect-[4/5]",
    },
    {
      id: "photo-03",
      title: "Shared Moments",
      subtitle: "Pure Togetherness",
      chapter: "Chapter 03 – Relationship Memories",
      path: "/images/couple-03-blue-saree.png",
      description: "White shirt and royal-blue saree portrait – elegant togetherness",
      aspectRatio: "aspect-[4/5]",
    },
    {
      id: "photo-04",
      title: "Under The Midnight Stars",
      subtitle: "Unspoken Bonds",
      chapter: "Chapter 03 – Emotional Memories",
      path: "/images/couple-04-night-candid.png",
      description: "Nighttime candid portrait – romantic memory",
      aspectRatio: "aspect-[4/5]",
    },
  ],
};

