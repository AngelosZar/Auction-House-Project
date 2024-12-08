import { API_READ_LISTINGS } from '../../utilities/constants';

export async function filterByTag(tag, status = 'active', offset = 1, limit = 12) {
  try {
    if (!tag) throw new Error('You need to provide a tag');
    const page = Math.floor(offset / limit + 1);
    const queryParams = new URLSearchParams({
      _tag: tag.toLowerCase(),
      _active: status.toString(),
      limit: limit,
      page: offset,
    });

    const response = await fetch(`${API_READ_LISTINGS}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.errors?.[0]?.message || 'Failed to find a listing with this tag');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
