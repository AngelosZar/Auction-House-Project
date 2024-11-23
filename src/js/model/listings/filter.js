import { API_READ_LISTINGS } from '../../utilities/constants';

// maybe rearrage the order of the parameters
export async function filterByTag(tag, status = 'active', offset = 1, limit = 12) {
  try {
    // /auction/listings?_tag=my_tag&_active=true
    if (!tag) throw new Error('You need to provide a tag');
    const page = Math.floor(offset / limit + 1);
    // errors;
    // :
    // Array(2)
    // 0
    // :
    // {message: 'Limit must be a number', code: 'invalid_type', path: Array(1)}
    // 1
    // :
    // {message: 'Page must be a number', code: 'invalid_type', path: Array(1)}
    // length
    // :
    // 2
    const queryParams = new URLSearchParams({
      _tag: tag.toLowerCase(),
      _active: status.toString(),
      limit: limit,
      page: offset,
    });

    // `${API_BASE}/auction/listings
    const response = await fetch(`${API_READ_LISTINGS}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    console.error('Failed to filter listings');
  }
}
// https://v2.api.noroff.dev/auction/listings/listings?_tag=electronics&_active=false
