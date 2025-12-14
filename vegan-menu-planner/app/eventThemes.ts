export interface EventTheme {
  name: string;
  gradient: string;
  primaryColor: string;
  accentColor: string;
  image: string;
}

export const eventThemes: Record<string, EventTheme> = {
  'Thanksgiving Dinner': {
    name: 'Thanksgiving Dinner',
    gradient: 'from-orange-50 to-amber-100',
    primaryColor: 'orange-600',
    accentColor: 'amber-600',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=1200&h=400&fit=crop'
  },
  'Afterwork Buffet': {
    name: 'Afterwork Buffet',
    gradient: 'from-blue-50 to-indigo-100',
    primaryColor: 'blue-600',
    accentColor: 'indigo-600',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&h=400&fit=crop'
  },
  'Christmas Dinner': {
    name: 'Christmas Dinner',
    gradient: 'from-red-50 to-green-100',
    primaryColor: 'red-600',
    accentColor: 'green-700',
    image: 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?w=1200&h=400&fit=crop'
  },
  'Wedding Reception': {
    name: 'Wedding Reception',
    gradient: 'from-pink-50 to-rose-100',
    primaryColor: 'pink-600',
    accentColor: 'rose-600',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=400&fit=crop'
  },
  'Corporate Lunch': {
    name: 'Corporate Lunch',
    gradient: 'from-slate-50 to-gray-100',
    primaryColor: 'slate-600',
    accentColor: 'gray-700',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=400&fit=crop'
  },
  'Other': {
    name: 'Other',
    gradient: 'from-green-50 to-emerald-100',
    primaryColor: 'emerald-600',
    accentColor: 'green-600',
    image: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=1200&h=400&fit=crop'
  }
};

export function getEventTheme(eventType: string): EventTheme {
  return eventThemes[eventType] || eventThemes['Other'];
}

export function getGradientClass(eventType: string): string {
  const theme = getEventTheme(eventType);
  return `bg-gradient-to-br ${theme.gradient}`;
}

export function getPrimaryColorClass(eventType: string, variant: 'bg' | 'text' | 'border' | 'ring' = 'bg'): string {
  const theme = getEventTheme(eventType);
  return `${variant}-${theme.primaryColor}`;
}

export function getAccentColorClass(eventType: string, variant: 'bg' | 'text' | 'border' = 'bg'): string {
  const theme = getEventTheme(eventType);
  return `${variant}-${theme.accentColor}`;
}
