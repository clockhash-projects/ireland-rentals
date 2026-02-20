export interface Property {
  id: string;
  title: string;
  description?: string;
  property_type: string;
  rent_amount: number;
  address: string;
  city: string;
  state: string;
  zip_code: string;

  contact_phone?: string;
  contact_whatsapp?: string;

  owner_id: string;
  is_active: boolean;
  created_at: string;
}


export interface User {
  id: string;
  name: string;
  email: string;
}

export const COUNTY_DATA: Record<string, string[]> = {
  "Antrim": ["Belfast", "Antrim", "Ballymena", "Lisburn", "Larne", "Carrickfergus", "Bushmills", "Cushendall"],
  "Armagh": ["Armagh", "Craigavon", "Lurgan", "Portadown", "Newry", "Keady", "Crossmaglen"],
  "Carlow": ["Carlow", "Tullow", "Muine Bheag", "Leighlinbridge", "Borris", "Hacketstown"],
  "Cavan": ["Cavan", "Bailieborough", "Cootehill", "Kingscourt", "Belturbet", "Mullagh", "Virginia"],
  "Clare": ["Ennis", "Shannon", "Kilrush", "Ennistymon", "Tulla", "Killaloe", "Corofin", "Lahinch", "Lisdoonvarna"],
  "Cork": ["Cork City", "Ballincollig", "Carrigaline", "Cobh", "Mallow", "Midleton", "Youghal", "Bandon", "Kinsale", "Skibbereen", "Clonakilty", "Bantry", "Fermoy"],
  "Derry": ["Derry City", "Coleraine", "Limavady", "Magherafelt", "Portstewart", "Kilrea"],
  "Donegal": ["Letterkenny", "Buncrana", "Ballyshannon", "Donegal Town", "Lifford", "Bundoran", "Killybegs", "Gweedore"],
  "Down": ["Belfast", "Bangor", "Newtownards", "Downpatrick", "Banbridge", "Holywood", "Newcastle", "Warrenpoint"],
  "Dublin": ["Dublin City", "Tallaght", "Blanchardstown", "Clondalkin", "Lucan", "Swords", "Dún Laoghaire", "Balbriggan", "Malahide", "Skerries", "Lusk", "Rush"],
  "Fermanagh": ["Enniskillen", "Lisnaskea", "Irvinestown", "Belleek", "Derrygonnelly"],
  "Galway": ["Galway City", "Tuam", "Ballinasloe", "Loughrea", "Athenry", "Moycullen", "Clifden", "Gort", "Oranmore", "Oughterard", "Barna"],
  "Kerry": ["Tralee", "Killarney", "Listowel", "Kenmare", "Dingle", "Cahersiveen", "Killorglin", "Ballybunion"],
  "Kildare": ["Naas", "Newbridge", "Celbridge", "Leixlip", "Maynooth", "Athy", "Kildare Town", "Kilcock", "Clane", "Sallins"],
  "Kilkenny": ["Kilkenny City", "Callan", "Thomastown", "Graiguenamanagh", "Castlecomer", "Ballyragget"],
  "Laois": ["Portlaoise", "Portarlington", "Mountmellick", "Abbeyleix", "Mountrath", "Stradbally"],
  "Leitrim": ["Carrick-on-Shannon", "Manorhamilton", "Mohill", "Ballinamore", "Kinlough"],
  "Limerick": ["Limerick City", "Newcastle West", "Rathkeale", "Abbeyfeale", "Kilmallock", "Castleconnell", "Adare"],
  "Longford": ["Longford Town", "Edgeworthstown", "Granard", "Lanesborough", "Ballymahon"],
  "Louth": ["Dundalk", "Drogheda", "Ardee", "Dunleer", "Carlingford"],
  "Mayo": ["Castlebar", "Ballina", "Westport", "Claremorris", "Ballinrobe", "Belmullet", "Swinford", "Kiltimagh"],
  "Meath": ["Navan", "Trim", "Kells", "Ashbourne", "Dunboyne", "Ratoath", "Stamullen", "Oldcastle"],
  "Monaghan": ["Monaghan Town", "Carrickmacross", "Castleblayney", "Clones", "Ballybay"],
  "Offaly": ["Tullamore", "Edenderry", "Birr", "Clara", "Banagher", "Ferbane"],
  "Roscommon": ["Roscommon Town", "Boyle", "Castlerea", "Athlone", "Ballaghaderreen", "Strokestown"],
  "Sligo": ["Sligo Town", "Tubbercurry", "Ballymote", "Collooney", "Strandhill"],
  "Tipperary": ["Clonmel", "Nenagh", "Thurles", "Tipperary Town", "Cashel", "Roscrea", "Carrick-on-Suir", "Cahir", "Templemore"],
  "Tyrone": ["Omagh", "Cookstown", "Dungannon", "Strabane", "Coalisland", "Castlederg"],
  "Waterford": ["Waterford City", "Dungarvan", "Tramore", "Lismore", "Dunmore East", "Portlaw"],
  "Westmeath": ["Mullingar", "Athlone", "Moate", "Castlepollard", "Kilbeggan"],
  "Wexford": ["Wexford Town", "Enniscorthy", "New Ross", "Gorey", "Bunclody", "Rosslare"],
  "Wicklow": ["Bray", "Wicklow Town", "Arklow", "Greystones", "Blessington", "Enniskerry", "Rathdrum"]
};

export const IRISH_COUNTIES = Object.keys(COUNTY_DATA).sort();

export const PROPERTY_TYPES = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "room", label: "Room" },
] as const;

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Bright 2-Bed Apartment in City Centre",
    description:
      "Spacious 2-bedroom apartment in the heart of Dublin. Close to Luas, DART and all amenities. Fully furnished with modern kitchen and living area. Bills not included. Ideal for working professionals or a couple.",
    propertyType: "apartment",
    rent: 1800,
    city: "Dublin",
    area: "City Centre",
    address: "Grand Canal Dock, Dublin 2",
    phone: "+353851234567",
    whatsapp: "+353851234567",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    ],
    postedBy: "Rahul Sharma",
    postedAt: "2026-02-08",
  },
  {
    id: "2",
    title: "Cosy Room in Shared House",
    description:
      "Single room available in a friendly, clean shared house near UCC. All bills included. Shared kitchen, bathroom and living area. Great for students or young professionals. Vegetarian-friendly household.",
    propertyType: "room",
    rent: 750,
    city: "Cork",
    area: "Bishopstown",
    address: "Bishopstown Road, Cork",
    phone: "+353879876543",
    whatsapp: "+353879876543",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&h=400&fit=crop",
    ],
    postedBy: "Priya Patel",
    postedAt: "2026-02-07",
  },
  {
    id: "3",
    title: "3-Bed Semi-Detached House",
    description:
      "Beautiful 3-bedroom semi-detached house in a quiet estate. Garden, parking, and close to schools. Perfect for families. Unfurnished but appliances included. Available from March 1st.",
    propertyType: "house",
    rent: 2200,
    city: "Galway",
    area: "Knocknacarra",
    address: "Knocknacarra, Galway",
    phone: "+353861112233",
    whatsapp: "+353861112233",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
    ],
    postedBy: "Amit Kumar",
    postedAt: "2026-02-06",
  },
  {
    id: "4",
    title: "Modern Studio near IFSC",
    description:
      "Compact studio apartment ideal for a single professional. Walking distance to IFSC. Furnished with bed, desk, wardrobe, and kitchenette. Building has gym and concierge.",
    propertyType: "apartment",
    rent: 1500,
    city: "Dublin",
    area: "IFSC",
    address: "Mayor Street, Dublin 1",
    phone: "+353851239876",
    whatsapp: "+353851239876",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop",
    ],
    postedBy: "Sneha Reddy",
    postedAt: "2026-02-05",
  },
  {
    id: "5",
    title: "Double Room in Limerick",
    description:
      "Large double room in a modern apartment. Close to University of Limerick. Bills included. Shared with one other Indian professional. Clean, quiet, and well-maintained.",
    propertyType: "room",
    rent: 650,
    city: "Limerick",
    area: "Castletroy",
    address: "Castletroy, Limerick",
    phone: "+353871234000",
    whatsapp: "+353871234000",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    ],
    postedBy: "Vikram Singh",
    postedAt: "2026-02-04",
  },
  {
    id: "6",
    title: "Family Home with Garden in Swords",
    description:
      "Spacious 4-bed detached house in Swords. Large back garden, driveway parking for 2 cars. Close to Pavilions shopping centre and schools. Partially furnished. Long-term let preferred.",
    propertyType: "house",
    rent: 2500,
    city: "Dublin",
    area: "Swords",
    address: "Swords, Co. Dublin",
    phone: "+353859998877",
    whatsapp: "+353859998877",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    ],
    postedBy: "Deepak Nair",
    postedAt: "2026-02-03",
  },
  {
    id: "7",
    title: "1-Bed Apartment near Eyre Square",
    description:
      "Lovely 1-bedroom apartment just minutes from Eyre Square. Recently renovated with new kitchen and bathroom. Fully furnished. Perfect for a single professional or couple.",
    propertyType: "apartment",
    rent: 1350,
    city: "Galway",
    area: "City Centre",
    address: "Eyre Square, Galway",
    phone: "+353867776655",
    whatsapp: "+353867776655",
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop",
    ],
    postedBy: "Ananya Iyer",
    postedAt: "2026-02-02",
  },
  {
    id: "8",
    title: "Ensuite Room near Waterford IT",
    description:
      "Bright ensuite room in a 3-bed house share. Walking distance to WIT. Bills included. Indian-friendly household with shared cooking facilities.",
    propertyType: "room",
    rent: 600,
    city: "Waterford",
    area: "Ballybeg",
    address: "Ballybeg, Waterford",
    phone: "+353854443322",
    whatsapp: "+353854443322",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=400&fit=crop",
    ],
    postedBy: "Kiran Desai",
    postedAt: "2026-02-01",
  },
];

export function getProperties(filters?: {
  city?: string;
  propertyType?: string;
  minRent?: number;
  maxRent?: number;
  sortBy?: "latest" | "price-asc" | "price-desc";
}): Property[] {
  let results = [...MOCK_PROPERTIES];

  if (filters?.city) {
    results = results.filter((p) => p.city === filters.city);
  }
  if (filters?.propertyType) {
    results = results.filter((p) => p.propertyType === filters.propertyType);
  }
  if (filters?.minRent) {
    results = results.filter((p) => p.rent >= filters.minRent!);
  }
  if (filters?.maxRent) {
    results = results.filter((p) => p.rent <= filters.maxRent!);
  }

  if (filters?.sortBy === "price-asc") {
    results.sort((a, b) => a.rent - b.rent);
  } else if (filters?.sortBy === "price-desc") {
    results.sort((a, b) => b.rent - a.rent);
  } else {
    results.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }

  return results;
}

export function getPropertyById(id: string): Property | undefined {
  return MOCK_PROPERTIES.find((p) => p.id === id);
}
