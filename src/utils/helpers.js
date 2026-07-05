export function extractDistricts(pharmacies) {
  const set = new Set();
  pharmacies.forEach((p) => {
    if (p.district) {
      const formatted = p.district.charAt(0) + p.district.slice(1).toLowerCase();
      set.add(formatted);
    }
  });
  return ['Tümü', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'tr'))];
}

export function filterPharmacies(pharmacies, query, selectedDistrict) {
  let result = pharmacies;

  if (selectedDistrict && selectedDistrict !== 'Tümü') {
    result = result.filter(
      (p) => p.district && p.district.toLowerCase() === selectedDistrict.toLowerCase()
    );
  }

  if (query && query.trim()) {
    const q = query.trim().toLowerCase();
    result = result.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.district && p.district.toLowerCase().includes(q)) ||
        (p.address && p.address.toLowerCase().includes(q))
    );
  }

  return result;
}

export function formatPhone(phone) {
  if (!phone) return '';
  return phone.replace(/\s+/g, '').replace(/^0/, '+90');
}

export function getMapUrl(pharmacy) {
  const parts = [];

  if (pharmacy.name) {
    parts.push(pharmacy.name);
  }

  if (pharmacy.address) {
    parts.push(pharmacy.address);
  }

  if (pharmacy.district) {
    parts.push(pharmacy.district);
  }

  if (pharmacy.city) {
    parts.push(pharmacy.city);
  }

  if (parts.length > 0) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parts.join(', '))}`;
  }

  return null;
}
