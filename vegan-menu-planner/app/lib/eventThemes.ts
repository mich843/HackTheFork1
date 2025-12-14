export interface EventTheme {
  name: string;
  gradient: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  cardBg: string;
  textColor: string;
  menuDataFile: string;
  icon: string;
  description: string;
  imageGradient: string;
}

export const eventThemes: Record<string, EventTheme> = {
  'Thanksgiving Dinner': {
    name: 'Thanksgiving Dinner',
    gradient: 'from-orange-50 via-amber-50 to-yellow-50',
    primaryColor: 'orange-600',
    secondaryColor: 'amber-600',
    accentColor: 'yellow-600',
    cardBg: 'bg-gradient-to-br from-orange-100 to-amber-100',
    textColor: 'text-orange-900',
    menuDataFile: 'thanksgiving-menus.json',
    icon: '🦃',
    description: 'Traditional harvest celebration with family and friends',
    imageGradient: 'from-orange-400 to-amber-500'
  },
  'Afterwork Buffet': {
    name: 'Afterwork Buffet',
    gradient: 'from-blue-50 via-indigo-50 to-purple-50',
    primaryColor: 'blue-600',
    secondaryColor: 'indigo-600',
    accentColor: 'purple-600',
    cardBg: 'bg-gradient-to-br from-blue-100 to-indigo-100',
    textColor: 'text-blue-900',
    menuDataFile: 'afterwork-menus.json',
    icon: '🍷',
    description: 'Casual networking and socializing after work',
    imageGradient: 'from-blue-400 to-indigo-500'
  },
  'Christmas Dinner': {
    name: 'Christmas Dinner',
    gradient: 'from-red-50 via-green-50 to-emerald-50',
    primaryColor: 'red-600',
    secondaryColor: 'green-600',
    accentColor: 'emerald-600',
    cardBg: 'bg-gradient-to-br from-red-100 to-green-100',
    textColor: 'text-red-900',
    menuDataFile: 'christmas-menus.json',
    icon: '🎄',
    description: 'Festive holiday celebration with loved ones',
    imageGradient: 'from-red-400 to-green-500'
  },
  'Wedding Reception': {
    name: 'Wedding Reception',
    gradient: 'from-pink-50 via-rose-50 to-purple-50',
    primaryColor: 'pink-600',
    secondaryColor: 'rose-600',
    accentColor: 'purple-600',
    cardBg: 'bg-gradient-to-br from-pink-100 to-rose-100',
    textColor: 'text-pink-900',
    menuDataFile: 'wedding-menus.json',
    icon: '💒',
    description: 'Elegant celebration of love and commitment',
    imageGradient: 'from-pink-400 to-rose-500'
  },
  'Corporate Lunch': {
    name: 'Corporate Lunch',
    gradient: 'from-slate-50 via-gray-50 to-zinc-50',
    primaryColor: 'slate-600',
    secondaryColor: 'gray-600',
    accentColor: 'zinc-600',
    cardBg: 'bg-gradient-to-br from-slate-100 to-gray-100',
    textColor: 'text-slate-900',
    menuDataFile: 'corporate-menus.json',
    icon: '💼',
    description: 'Professional business meeting or team lunch',
    imageGradient: 'from-slate-400 to-gray-500'
  },
  'Other': {
    name: 'Other',
    gradient: 'from-green-50 to-emerald-100',
    primaryColor: 'emerald-600',
    secondaryColor: 'green-600',
    accentColor: 'teal-600',
    cardBg: 'bg-gradient-to-br from-green-100 to-emerald-100',
    textColor: 'text-emerald-900',
    menuDataFile: 'other-menus.json',
    icon: '🌱',
    description: 'Custom event or special occasion',
    imageGradient: 'from-green-400 to-emerald-500'
  }
};

export function getEventTheme(eventType: string): EventTheme {
  return eventThemes[eventType] || eventThemes['Other'];
}

export const menuImageGradients = [
  'from-emerald-400 to-teal-500',
  'from-blue-400 to-cyan-500',
  'from-purple-400 to-pink-500',
  'from-orange-400 to-red-500',
  'from-yellow-400 to-orange-500',
  'from-green-400 to-lime-500',
  'from-indigo-400 to-purple-500',
  'from-rose-400 to-pink-500'
];

export function getMenuImageGradient(index: number): string {
  return menuImageGradients[index % menuImageGradients.length];
}
