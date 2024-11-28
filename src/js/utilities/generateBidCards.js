import { readListings } from '../model/listings/readListings';

export async function generateBidCards() {
  try {
    const listings = await readListings();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
