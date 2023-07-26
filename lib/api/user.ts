export async function ensureUserExists() {
  const res = await fetch('/api/user', {
    method: 'PUT',
    body: JSON.stringify({
      initData: window.Telegram.WebApp.initData,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function updateTonAddress(address: string | null) {
  const res = await fetch('/api/user', {
    method: 'PATCH',
    body: JSON.stringify({
      initData: window.Telegram.WebApp.initData,
      tonAddress: address,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
