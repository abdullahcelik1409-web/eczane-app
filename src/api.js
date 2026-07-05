import { API_URL, API_KEY } from './config';

export async function fetchPharmacies(city) {
  const response = await fetch(`${API_URL}?il=${city}`, {
    method: 'GET',
    headers: {
      authorization: API_KEY,
      'content-type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error('API yanıtında hata');
  }

  return data.result.map((item) => {
    let lat = null;
    let lng = null;

    if (item.loc) {
      const parts = item.loc.split(',');
      if (parts.length === 2) {
        lat = parseFloat(parts[0].trim());
        lng = parseFloat(parts[1].trim());
      }
    }

    return {
      name: item.name || '',
      district: item.dist || '',
      address: item.address || '',
      phone: item.phone || '',
      city: city,
      lat,
      lng,
    };
  });
}
