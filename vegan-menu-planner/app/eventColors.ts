export const eventColorMap: Record<string, { primary: string; accent: string; light: string; gradient: string; bgImage: string }> = {
  'Thanksgiving Dinner': {
    primary: '#ea580c',
    accent: '#d97706',
    light: '#fed7aa',
    gradient: 'from-orange-50 to-amber-100',
    bgImage: 'https://images.unsplash.com/photo-1574672280315-33708c4a0c3e?w=1200&h=400&fit=crop'
  },
  'Afterwork Buffet': {
    primary: '#2563eb',
    accent: '#4f46e5',
    light: '#bfdbfe',
    gradient: 'from-blue-50 to-indigo-100',
    bgImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=400&fit=crop'
  },
  'Christmas Dinner': {
    primary: '#dc2626',
    accent: '#15803d',
    light: '#fecaca',
    gradient: 'from-red-50 to-green-100',
    bgImage: 'https://images.unsplash.com/photo-1512474932049-78ac69ede12c?w=1200&h=400&fit=crop'
  },
  'Wedding Reception': {
    primary: '#db2777',
    accent: '#e11d48',
    light: '#fbcfe8',
    gradient: 'from-pink-50 to-rose-100',
    bgImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&h=400&fit=crop'
  },
  'Corporate Lunch': {
    primary: '#475569',
    accent: '#374151',
    light: '#cbd5e1',
    gradient: 'from-slate-50 to-gray-100',
    bgImage: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=400&fit=crop'
  },
  'Other': {
    primary: '#059669',
    accent: '#16a34a',
    light: '#a7f3d0',
    gradient: 'from-green-50 to-emerald-100',
    bgImage: 'https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=1200&h=400&fit=crop'
  }
};

export function getEventColors(eventType: string) {
  return eventColorMap[eventType] || eventColorMap['Other'];
}
