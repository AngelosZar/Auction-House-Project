import { API_READ_LISTINGS } from '../../utilities/constants';

export async function filterByTag(tag, status = 'active') {
  try {
    // /auction/listings?_tag=my_tag&_active=true
    if (!tag) throw new Error('You need to provide a tag');
    const queryParams = new URLSearchParams({
      _tag: tag.toLowerCase(),
      _active: status.toString(),
    });
    // https://v2.api.noroff.dev/auction/listings?_tag=laptop&_active=true
    // const response = fetch(' https://v2.api.noroff.dev/auction/listings?_tag=laptop&_active=true', {

    const response = await fetch(`${API_READ_LISTINGS}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // if (!response.ok) {
    //   console.log(response);
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    console.error('Failed to filter listings');
  }
}
// https://v2.api.noroff.dev/auction/listings/listings?_tag=electronics&_active=false
